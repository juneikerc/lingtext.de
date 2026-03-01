import { useEffect, useRef, useState, useCallback } from "react";
import {
  getAllUnknownWords,
  getWord,
  putUnknownWord,
  deleteWord,
  getSettings,
  getAllPhrases,
  putPhrase,
  getPhrase,
} from "../services/db";
import { type AudioRef } from "../types";
import { normalizeWord, tokenize } from "../utils/tokenize";
import { speak } from "../utils/tts";
import { translateTerm } from "../utils/translate";
import { ensureReadPermission, pickAudioFile } from "../utils/fs";
import { getFileHandle, saveFileHandle } from "~/services/file-handles";

import AudioSection from "./reader/AudioSection";
import ReaderText from "./reader/ReaderText";
import MarkdownReaderText from "./reader/MarkdownReaderText";
import WordPopup from "./reader/WordPopup";
import SelectionPopup from "./reader/SelectionPopup";
import type {
  WordPopupState as PopupState,
  SelectionPopupState as SelPopupState,
} from "./reader/types";
import { useTranslatorStore } from "~/context/translatorSelector";

interface Props {
  text: {
    id: string;
    title: string;
    content: string;
    format?: "txt" | "markdown";
    audioRef?: AudioRef | null;
    audioUrl?: string | null;
  };
  variant?: "default" | "compact";
  showAudioSection?: boolean;
}

// Types moved to ./reader/types

const READER_COPY_HINTS = ["Klick zum Uebersetzen"] as const;
const MAX_SELECTION_TRANSLATE_WORDS = 20;

function stripReaderCopyHints(rawText: string): string {
  return READER_COPY_HINTS.reduce((text, hint) => {
    return text.replaceAll(hint, "");
  }, rawText);
}

function normalizeReaderSelectionText(rawText: string): string {
  return stripReaderCopyHints(rawText)
    .replace(/\u00a0/g, " ")
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeReaderCopiedText(rawText: string): string {
  return stripReaderCopyHints(rawText)
    .replace(/\u00a0/g, " ")
    .replace(/[\u200b-\u200d\ufeff]/g, "");
}

export default function Reader({
  text,
  variant = "default",
  showAudioSection = true,
}: Props) {
  const { selected } = useTranslatorStore();
  const isCompact = variant === "compact";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [unknownSet, setUnknownSet] = useState<Set<string>>(new Set());
  const [phrases, setPhrases] = useState<string[][]>([]);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [selPopup, setSelPopup] = useState<SelPopupState | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioAccessError, setAudioAccessError] = useState(false);
  const [isLocalFile, setIsLocalFile] = useState(false);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const phraseCacheRef = useRef<Map<string, string>>(new Map());

  // Detect local file and read metadata
  useEffect(() => {
    let mounted = true;

    async function loadAudio() {
      if (text?.audioRef?.type === "file") {
        setIsLocalFile(true);

        let handle = text.audioRef.fileHandle;

        // If no handle is present, try restoring from IndexedDB
        if (!handle) {
          try {
            const savedHandle = await getFileHandle(text.id);
            if (savedHandle && mounted) {
              handle = savedHandle;
              // Check permission
              const hasPermission = await ensureReadPermission(handle);
              if (hasPermission) {
                // Read file and create object URL
                const file = await handle.getFile();
                const url = URL.createObjectURL(file);
                setAudioUrl(url);
                setFileSize(file.size);
                setAudioAccessError(false);
                return;
              }
            }
          } catch (e) {
            console.warn("Error restoring file handle:", e);
          }
        }

        if (mounted) {
          // If we reached this point and we have the original handle (first load)
          if (text.audioRef.fileHandle) {
            setAudioAccessError(!text.audioUrl);
          } else {
            // If neither restored nor original handle exists
            setAudioAccessError(true);
          }
        }
      } else {
        if (mounted) {
          setIsLocalFile(false);
          setAudioAccessError(false);
          setFileSize(null);
        }
      }
    }

    loadAudio();

    return () => {
      mounted = false;
    };
  }, [text?.audioRef, text?.audioUrl, text?.id]);

  // Revoke audio URL when it changes or on unmount
  useEffect(() => {
    if (!audioUrl || audioUrl.startsWith("http")) return;
    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Revoke object URL provided by clientLoader on unmount/change
  useEffect(() => {
    const src = text.audioUrl;
    if (!src || src.startsWith("http")) return;
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [text.audioUrl]);

  // load unknown words
  useEffect(() => {
    refreshUnknowns();
    refreshPhrases();
  }, []);

  const refreshUnknowns = useCallback(async () => {
    const all = await getAllUnknownWords();
    setUnknownSet(new Set(all.map((w) => w.wordLower)));
  }, []);

  const refreshPhrases = useCallback(async () => {
    const all = await getAllPhrases();
    setPhrases(all.map((p) => p.parts));
  }, []);

  const myMemoryQuotaAlertedRef = useRef(false);
  const translateRequestIdRef = useRef(0);

  const onWordClick = useCallback(
    async (e: React.MouseEvent<HTMLSpanElement>) => {
      const target = e.currentTarget as HTMLSpanElement;
      if (!target?.dataset?.lower || !target?.dataset?.word) return;
      const rect = target.getBoundingClientRect();
      const el = containerRef.current;
      let x = rect.left + rect.width / 2;
      let y = rect.top;
      if (el) {
        const r = el.getBoundingClientRect();
        x -= r.left;
        y -= r.top;
      }
      const word = target.dataset.word!;
      const lower = target.dataset.lower!;

      const existing = await getWord(lower);

      if (existing) {
        setPopup({ x, y, word, lower, translation: existing.translation });
        return;
      }

      const requestId = ++translateRequestIdRef.current;
      setSelPopup(null);
      setPopup({ x, y, word, lower, translation: "", isLoading: true });

      const translation = await translateTerm(word, selected);
      if (requestId !== translateRequestIdRef.current) return;

      if (
        translation.error === "MYMEMORY_QUOTA_EXCEEDED" &&
        !myMemoryQuotaAlertedRef.current
      ) {
        myMemoryQuotaAlertedRef.current = true;
        alert(
          "Das taegliche Limit des kostenlosen Uebersetzers (MyMemory) wurde erreicht.\n\n" +
            "Tipp: Wechsle die Uebersetzungsmethode (Chrome, falls verfuegbar) " +
            "oder konfiguriere einen OpenRouter-API-Key, um weiter zu uebersetzen."
        );
      }

      setPopup({
        x,
        y,
        word,
        lower,
        translation: translation.translation,
        isLoading: false,
      });
    },
    [selected]
  );

  const relativePos = useCallback((x: number, y: number) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const r = el.getBoundingClientRect();
    return { x: x - r.left, y: y - r.top };
  }, []);

  const markUnknown = useCallback(
    async (lower: string, original: string, translation: string) => {
      const settings = await getSettings();
      await putUnknownWord({
        word: original,
        wordLower: lower,
        translation: translation,
        status: "unknown",
        addedAt: Date.now(),
        voice: {
          name: settings.tts.voiceName,
          lang: settings.tts.lang,
          rate: settings.tts.rate,
          pitch: settings.tts.pitch,
          volume: settings.tts.volume,
        },
      });
      setUnknownSet((prev) => new Set(prev).add(lower));
      setPopup(null);
    },
    []
  );

  const markKnown = useCallback(async (lower: string) => {
    await deleteWord(lower);
    setUnknownSet((prev) => {
      const n = new Set(prev);
      n.delete(lower);
      return n;
    });
    setPopup(null);
  }, []);

  const onSpeak = useCallback(async (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const settings = await getSettings();
    await speak(word, settings.tts);
  }, []);

  const clearPopups = useCallback(() => {
    translateRequestIdRef.current += 1;
    setPopup(null);
    setSelPopup(null);
  }, []);

  async function reauthorizeAudio() {
    const t = text;
    if (!t || !t.audioRef || t.audioRef.type !== "file") return;

    try {
      // Revoke previous object URL if needed
      if (audioUrl && !audioUrl.startsWith("http")) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      let file: File;

      // Check if fileHandle exists
      if (t.audioRef.fileHandle) {
        // FileHandle exists - try to request permission
        const hasPermission = await ensureReadPermission(t.audioRef.fileHandle);
        if (!hasPermission) {
          console.warn("Zugriff auf lokale Datei verweigert");
          setAudioAccessError(true);
          alert(
            "Zugriff verweigert. Versuche es erneut oder haenge das Audio in der Bibliothek neu an."
          );
          return;
        }
        file = await t.audioRef.fileHandle.getFile();
      } else {
        // FileHandle doesn't exist (wasn't persisted) - ask user to re-select file
        const newHandle = await pickAudioFile();
        if (!newHandle) {
          // User cancelled
          return;
        }
        file = await newHandle.getFile();

        // Save the new handle
        await saveFileHandle(t.id, newHandle);
      }

      // Validate audio file type
      const fileName = file.name.toLowerCase();
      const isAudioFile =
        file.type.startsWith("audio/") ||
        fileName.endsWith(".mp3") ||
        fileName.endsWith(".wav") ||
        fileName.endsWith(".m4a") ||
        fileName.endsWith(".aac") ||
        fileName.endsWith(".ogg") ||
        fileName.endsWith(".flac");

      if (!isAudioFile) {
        throw new Error(
          `Ungueltiger Dateityp: ${file.type || "unbekannt"}. Erlaubt sind nur Audiodateien (MP3, WAV, M4A, AAC, OGG, FLAC).`
        );
      }

      // Validate file size (warn if very large)
      const maxSize = 500 * 1024 * 1024; // 500MB
      if (file.size > maxSize) {
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const shouldContinue = confirm(
          `Die Datei ist sehr gross (${sizeMB}MB). Das kann zu Performance-Problemen fuehren. Moechtest du fortfahren?`
        );
        if (!shouldContinue) {
          setAudioAccessError(true);
          return;
        }
      }

      setFileSize(file.size);

      // Create object URL safely
      const url = URL.createObjectURL(file);

      setAudioUrl(url);
      setAudioAccessError(false);
    } catch (error) {
      console.error("Fehler beim Laden der lokalen Datei:", error);

      // Set error state
      setAudioAccessError(true);

      // Resolve user-facing message by error type
      let errorMessage = "Unbekannter Fehler beim Laden der Datei";

      if (error instanceof Error) {
        if (error.message.includes("NotAllowedError")) {
          errorMessage = "Zugriff auf die Datei verweigert";
        } else if (error.message.includes("NotFoundError")) {
          errorMessage = "Die Datei existiert nicht mehr oder wurde verschoben";
        } else if (error.message.includes("Dateityp")) {
          errorMessage = error.message;
        } else {
          errorMessage = `Fehler beim Laden der Datei: ${error.message}`;
        }
      }

      alert(`${errorMessage}. Haenge das Audio in der Bibliothek erneut an.`);
    }
  }

  async function handleMouseUp() {
    const sel = window.getSelection();

    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const parent = containerRef.current;
    if (!parent || !parent.contains(range.commonAncestorContainer)) return;

    const text = normalizeReaderSelectionText(sel.toString());

    if (!text) return;
    const rect = range.getBoundingClientRect();
    const { x, y } = relativePos(rect.left + rect.width / 2, rect.top);

    // Try phrase cache: DB first, then in-memory cache
    const parts = tokenize(text)
      .filter((t) => t.isWord)
      .map((t) => t.lower || normalizeWord(t.text))
      .filter((w) => w.length > 0);

    if (parts.length > MAX_SELECTION_TRANSLATE_WORDS) {
      translateRequestIdRef.current += 1;
      setPopup(null);
      setSelPopup(null);
      return;
    }

    if (parts.length >= 2) {
      const phraseLower = parts.join(" ");
      try {
        const existing = await getPhrase(phraseLower);
        if (existing && existing.translation) {
          setPopup(null);
          setSelPopup({ x, y, text, translation: existing.translation });
          return;
        }
        const cached = phraseCacheRef.current.get(phraseLower);
        if (cached) {
          setPopup(null);
          setSelPopup({ x, y, text, translation: cached });
          return;
        }
      } catch {}
    }

    const requestId = ++translateRequestIdRef.current;
    setPopup(null);
    setSelPopup({ x, y, text, translation: "", isLoading: true });

    const translation = await translateTerm(text, selected);
    if (requestId !== translateRequestIdRef.current) return;

    if (
      translation.error === "MYMEMORY_QUOTA_EXCEEDED" &&
      !myMemoryQuotaAlertedRef.current
    ) {
      myMemoryQuotaAlertedRef.current = true;
      alert(
        "Das taegliche Limit des kostenlosen Uebersetzers (MyMemory) wurde erreicht.\n\n" +
          "Tipp: Wechsle die Uebersetzungsmethode (Chrome, falls verfuegbar) " +
          "oder konfiguriere einen OpenRouter-API-Key, um weiter zu uebersetzen."
      );
    }

    // Store in-memory cache for multi-word phrases
    if (parts.length >= 2) {
      const phraseLower = parts.join(" ");
      phraseCacheRef.current.set(phraseLower, translation.translation);
    }
    setSelPopup({
      x,
      y,
      text,
      translation: translation.translation,
      isLoading: false,
    });
  }

  const onSavePhrase = useCallback(
    async (text: string, translation: string) => {
      const normalizedText = normalizeReaderSelectionText(text);
      const parts = tokenize(normalizedText)
        .filter((t) => t.isWord)
        .map((t) => t.lower || normalizeWord(t.text))
        .filter((w) => w.length > 0);

      if (parts.length < 2) {
        alert(
          "Waehle mindestens zwei Woerter aus, um eine zusammengesetzte Phrase zu speichern."
        );
        return;
      }

      const phraseLower = parts.join(" ");
      await putPhrase({
        phrase: normalizedText,
        phraseLower,
        translation,
        parts,
        addedAt: Date.now(),
      });

      // Update local phrase list for immediate highlighting
      setPhrases((prev) => [...prev, parts]);

      setSelPopup(null);
    },
    []
  );

  const onCopy = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    const sel = window.getSelection();
    const parent = containerRef.current;

    if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !parent) return;

    const range = sel.getRangeAt(0);
    if (!parent.contains(range.commonAncestorContainer)) return;

    const copiedText = sanitizeReaderCopiedText(sel.toString());
    if (!copiedText || !e.clipboardData) return;

    e.clipboardData.setData("text/plain", copiedText);
    e.preventDefault();
  }, []);

  return (
    <div
      className={
        isCompact
          ? "relative flex flex-col bg-transparent pb-2"
          : "relative flex flex-col flex-1 bg-gray-50 dark:bg-gray-900 pb-40 sm:pb-32"
      }
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onCopy={onCopy}
      onClick={(e) => {
        const t = e.target as HTMLElement;
        const sel = window.getSelection();
        // Keep popups open while user has active text selection
        if (!t.closest(`.word-token`) && (!sel || sel.isCollapsed)) {
          clearPopups();
        }
      }}
    >
      {text.format === "markdown" ? (
        <MarkdownReaderText
          content={text.content}
          unknownSet={unknownSet}
          phrases={phrases}
          onWordClick={onWordClick}
          showChrome={!isCompact}
          compact={isCompact}
        />
      ) : (
        <ReaderText
          content={text.content}
          unknownSet={unknownSet}
          phrases={phrases}
          onWordClick={onWordClick}
          showChrome={!isCompact}
          compact={isCompact}
        />
      )}

      {popup && (
        <WordPopup
          popup={popup}
          isUnknown={unknownSet.has(popup.lower)}
          onSpeak={onSpeak}
          onMarkKnown={markKnown}
          onMarkUnknown={markUnknown}
          onClose={() => setPopup(null)}
        />
      )}

      {selPopup && (
        <SelectionPopup
          selPopup={selPopup}
          onClose={() => setSelPopup(null)}
          onSavePhrase={onSavePhrase}
        />
      )}

      {showAudioSection ? (
        <AudioSection
          show={!!text.audioRef || !!text.audioUrl}
          src={audioUrl ?? text.audioUrl ?? undefined}
          showReauthorize={Boolean(
            text.audioRef?.type === "file" && audioAccessError
          )}
          onReauthorize={reauthorizeAudio}
          isLocalFile={isLocalFile}
          fileSize={fileSize}
        />
      ) : null}
    </div>
  );
}
