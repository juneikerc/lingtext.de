import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/song";
import Reader from "~/components/Reader";
import ReaderHeader from "~/components/reader/ReaderHeader";
import { getSong } from "~/services/db";
import { parseSongEmbed } from "~/utils/song-embed";

type YouTubePlayerState = -1 | 0 | 1 | 2 | 3 | 5;

interface YouTubePlayerInstance {
  destroy: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getPlayerState: () => YouTubePlayerState;
}

interface YouTubeNamespace {
  Player: new (
    elementId: string,
    options?: {
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: YouTubePlayerState }) => void;
      };
    }
  ) => YouTubePlayerInstance;
  PlayerState?: {
    PLAYING: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
    __lingtextYtApiPromise?: Promise<YouTubeNamespace>;
  }
}

const YOUTUBE_API_SRC = "https://www.youtube.com/iframe_api";

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable ||
    Boolean(target.closest("[contenteditable='true']"))
  );
}

function loadYouTubeIframeApi(): Promise<YouTubeNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API unavailable on server."));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (window.__lingtextYtApiPromise) {
    return window.__lingtextYtApiPromise;
  }

  window.__lingtextYtApiPromise = new Promise<YouTubeNamespace>(
    (resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (window.YT?.Player) {
          resolve(window.YT);
          return;
        }
        reject(new Error("YouTube API loaded but Player is missing."));
      };

      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${YOUTUBE_API_SRC}"]`
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = YOUTUBE_API_SRC;
        script.async = true;
        script.onerror = () =>
          reject(new Error("Failed to load YouTube iframe API."));
        document.head.append(script);
      }
    }
  ).catch((error) => {
    window.__lingtextYtApiPromise = undefined;
    throw error;
  });

  return window.__lingtextYtApiPromise;
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.song) {
    return [
      { title: "Lied nicht gefunden | LingText" },
      { name: "robots", content: "noindex" },
    ];
  }

  return [
    { title: `${loaderData.song.title} | Lieder | LingText` },
    {
      name: "description",
      content: "Lerne Englisch mit Liedern und kontextbezogener Uebersetzung.",
    },
    { name: "robots", content: "noindex" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const song = await getSong(params.id);
  document.title = song?.title || "Lied nicht gefunden";
  return { song: song ?? null };
}

export default function SongPage({ loaderData }: Route.ComponentProps) {
  const { song } = loaderData;
  const playerRootRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [isPlayerInView, setIsPlayerInView] = useState(true);
  const [isMiniPlayerHidden, setIsMiniPlayerHidden] = useState(false);

  const normalizedEmbed = song
    ? parseSongEmbed(song.embedUrl || song.sourceUrl)
    : null;
  const embedUrl = song
    ? normalizedEmbed && "error" in normalizedEmbed
      ? song.embedUrl
      : normalizedEmbed?.embedUrl || ""
    : "";
  const provider = song
    ? normalizedEmbed && "error" in normalizedEmbed
      ? song.provider
      : normalizedEmbed?.provider || null
    : null;
  const isSpotify = provider === "spotify";
  const canRenderEmbed = Boolean(embedUrl);
  let iframeSrc = embedUrl;

  if (provider === "youtube" && embedUrl) {
    try {
      const youtubeUrl = new URL(embedUrl);
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      if (origin) {
        youtubeUrl.searchParams.set("origin", origin);
        youtubeUrl.searchParams.set("widget_referrer", origin);
      }
      youtubeUrl.searchParams.set("enablejsapi", "1");
      iframeSrc = youtubeUrl.toString();
    } catch {
      iframeSrc = embedUrl;
    }
  }

  const youtubeIframeId = useMemo(() => {
    const safeId = (song?.id || "missing-song").replace(/[^a-zA-Z0-9_-]/g, "");
    return `song-youtube-player-${safeId}`;
  }, [song?.id]);

  const shouldFloatPlayer = canRenderEmbed && !isPlayerInView;
  const showFloatingPlayer = shouldFloatPlayer && !isMiniPlayerHidden;
  const showMiniPlayerRestore = shouldFloatPlayer && isMiniPlayerHidden;

  useEffect(() => {
    if (!canRenderEmbed) return;

    const target = playerRootRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlayerInView(
          entry.isIntersecting && entry.intersectionRatio >= 0.35
        );
      },
      {
        threshold: [0, 0.35, 1],
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [canRenderEmbed]);

  useEffect(() => {
    if (isPlayerInView) {
      setIsMiniPlayerHidden(false);
    }
  }, [isPlayerInView]);

  useEffect(() => {
    if (provider !== "youtube" || !canRenderEmbed || !iframeSrc) {
      playerRef.current?.destroy?.();
      playerRef.current = null;
      return;
    }

    let disposed = false;

    loadYouTubeIframeApi()
      .then((YT) => {
        if (disposed) return;
        if (!document.getElementById(youtubeIframeId)) return;

        const instance = new YT.Player(youtubeIframeId);
        playerRef.current = instance;
      })
      .catch((error) => {
        console.warn("YouTube-Steuerung konnte nicht initialisiert werden:", error);
      });

    return () => {
      disposed = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [provider, canRenderEmbed, iframeSrc, youtubeIframeId]);

  useEffect(() => {
    if (provider !== "youtube" || !canRenderEmbed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditableElement(event.target)) return;

      const player = playerRef.current;
      if (!player) return;

      const key = event.key.toLowerCase();
      if (!["j", "k", "l"].includes(key)) return;

      event.preventDefault();

      if (key === "j" || key === "l") {
        const currentTime = player.getCurrentTime?.() ?? 0;
        const seekOffset = key === "j" ? -5 : 5;
        const nextTime = Math.max(0, currentTime + seekOffset);
        player.seekTo(nextTime, true);
        return;
      }

      const playingState = window.YT?.PlayerState?.PLAYING ?? 1;
      const currentState = player.getPlayerState?.();
      if (currentState === playingState) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [provider, canRenderEmbed]);

  if (!song) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Lied nicht gefunden
          </h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Dieses Lied existiert nicht oder wurde entfernt.
          </p>
          <Link
            to="/englisch-lernen-mit-liedern"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
          >
            Zurueck zu Liedern
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <ReaderHeader title={song.title} />

      <section className="mx-auto mt-6 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {canRenderEmbed ? (
            <div
              ref={playerRootRef}
              className={
                isSpotify
                  ? "relative h-[352px] w-full"
                  : "relative aspect-video w-full"
              }
            >
              <div
                className={
                  showFloatingPlayer
                    ? isSpotify
                      ? "fixed bottom-3 left-3 right-3 z-40 h-[180px] overflow-hidden rounded-xl border border-gray-200 bg-black shadow-2xl dark:border-gray-700 sm:left-auto sm:right-6 sm:h-[220px] sm:w-[430px]"
                      : "fixed bottom-3 left-3 right-3 z-40 aspect-video overflow-hidden rounded-xl border border-gray-200 bg-black shadow-2xl dark:border-gray-700 sm:left-auto sm:right-6 sm:w-[430px]"
                    : "relative h-full w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
                }
              >
                {showFloatingPlayer && (
                  <button
                    type="button"
                    onClick={() => setIsMiniPlayerHidden(true)}
                    className="absolute right-2 top-2 z-10 rounded-lg border border-gray-300 bg-white/95 px-2 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
                    aria-label="Miniplayer ausblenden"
                  >
                    Ausblenden
                  </button>
                )}
                <iframe
                  id={provider === "youtube" ? youtubeIframeId : undefined}
                  src={iframeSrc}
                  title={`${song.title} embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow={
                    isSpotify
                      ? "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  }
                  allowFullScreen={!isSpotify}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-300">
              Das Embed konnte fuer diesen Link nicht erzeugt werden. Bearbeite
              das Lied bitte mit einer gueltigen YouTube- oder Spotify-URL.
            </div>
          )}
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            Originalquelle:{" "}
            <a
              href={song.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 underline underline-offset-2 transition-colors duration-200 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {song.sourceUrl}
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Wenn die Meldung{" "}
            <span className="font-semibold">“refused to connect”</span>{" "}
            erscheint, ist das Embed durch den Anbieter blockiert (z. B. bei
            manchen urheberrechtlich geschuetzten Videos). Nutze dann einen
            anderen Link oder oeffne die Originalquelle.
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {provider === "youtube"
              ? "Globale Tastaturkuerzel: J (-5s), K (Play/Pause), L (+5s)."
              : "Globale Tastaturkuerzel sind nur fuer YouTube-Videos verfuegbar."}
          </p>
        </div>
      </section>

      {showMiniPlayerRestore && (
        <button
          type="button"
          onClick={() => setIsMiniPlayerHidden(false)}
          className="fixed bottom-3 right-3 z-40 rounded-xl border border-gray-300 bg-white/95 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-900"
        >
          Player anzeigen
        </button>
      )}

      <section className={showFloatingPlayer ? "mt-6 pb-36 sm:pb-24" : "mt-6"}>
        <Reader
          text={{
            id: song.id,
            title: song.title,
            content: song.lyrics,
            format: "txt",
          }}
        />
      </section>
    </main>
  );
}
