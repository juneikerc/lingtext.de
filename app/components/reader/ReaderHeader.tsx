import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useTranslatorStore } from "~/context/translatorSelector";
import { TRANSLATORS } from "~/types";
import { getOpenRouterApiKey } from "~/services/db";
import { isChromeAIAvailable } from "~/utils/translate";
import ApiKeyConfig from "~/components/ApiKeyConfig";

interface ReaderHeaderProps {
  title: string;
}

export default function ReaderHeader({ title }: ReaderHeaderProps) {
  const { selected, setSelected } = useTranslatorStore();
  const [showApiKeyConfig, setShowApiKeyConfig] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const prevSelectedRef = useRef<TRANSLATORS | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    checkApiKey();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const prevY = lastScrollYRef.current;
      const delta = currentY - prevY;

      if (Math.abs(delta) < 6) return;

      if (currentY > 80 && delta > 0) {
        setIsHidden(true);
      } else if (delta < 0) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prevSelected = prevSelectedRef.current;
    prevSelectedRef.current = selected;

    // Only alert when the user explicitly switches to Chrome
    if (
      prevSelected !== null &&
      selected === TRANSLATORS.CHROME &&
      prevSelected !== TRANSLATORS.CHROME &&
      !isChromeAIAvailable()
    ) {
      alert(
        "Der native Chrome-Uebersetzer erfordert:\n" +
          "- Google Chrome auf dem Desktop\n" +
          "- Aktivierte Uebersetzungs-API im Browser\n\n" +
          "Wenn diese Voraussetzungen fehlen, kannst du den kostenlosen Uebersetzer (MyMemory) nutzen oder einen OpenRouter-API-Key fuer KI-Modelle hinterlegen."
      );
    }
  }, [selected]);

  async function checkApiKey() {
    const key = await getOpenRouterApiKey();
    setHasApiKey(!!key);
  }

  const needsApiKey =
    (selected === TRANSLATORS.MEDIUM || selected === TRANSLATORS.SMART) &&
    !hasApiKey;

  return (
    <>
      <div
        className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-20 transition-transform duration-200 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          {/* Compact first row - title and navigation */}
          <div className="flex items-center justify-between py-2 sm:py-3 min-w-0">
            <div className="flex items-center space-x-3 min-w-0">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="group shrink-0 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-300 font-medium transition-all duration-200"
              >
                <span className="text-sm group-hover:-translate-x-0.5 transition-transform duration-200">
                  ←
                </span>
                <span className="text-sm">Zurueck</span>
              </button>

              <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="flex-1 min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 truncate w-full">
                  {title || "Ohne Titel"}
                </h1>
              </div>
            </div>

            {/* Compact status indicator */}
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs font-medium">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>Bereit</span>
            </div>
          </div>

          {/* Compact second row - translator selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">🌐</span>
              </div>
              <strong className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Übersetzer:
              </strong>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
              <select
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm font-medium"
                value={selected}
                onChange={(e) => setSelected(e.target.value as TRANSLATORS)}
              >
                <option value={TRANSLATORS.CHROME}>⚡ Schnell | Basis</option>
                <option value={TRANSLATORS.MYMEMORY}>
                  🆓 Kostenlos (Weniger praezise) | MyMemory
                </option>
                <option value={TRANSLATORS.MEDIUM}>
                  🧠 Intelligenter | Mittel
                </option>
                <option value={TRANSLATORS.SMART}>
                  🚀 Sehr intelligent + teuer
                </option>
              </select>

              {/* Compact info for selected translator */}
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {selected === TRANSLATORS.CHROME && "Nativo"}
                {selected === TRANSLATORS.MYMEMORY && "Kostenlos"}
                {selected === TRANSLATORS.MEDIUM && "Optimierte KI"}
                {selected === TRANSLATORS.SMART && "Erweiterte KI"}
              </div>

              {/* API key config button */}
              <button
                onClick={() => setShowApiKeyConfig(true)}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                  needsApiKey
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                title="API-Key konfigurieren"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                {needsApiKey && <span>API Key</span>}
              </button>
            </div>
          </div>

          {/* Notice when API key is missing */}
          {needsApiKey && (
            <div className="pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl shadow-sm gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 dark:text-amber-100">
                      Konfiguration erforderlich
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                      Fuer Uebersetzer mit fortgeschrittener KI brauchst du
                      einen OpenRouter-Schluessel.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <a
                    href="https://github.com/juneikerc/lingtext.de/blob/main/open-router-key.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 rounded-lg transition-colors shadow-sm"
                  >
                    Wie bekomme ich ihn? (Tutorial)
                  </a>
                  <button
                    onClick={() => setShowApiKeyConfig(true)}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900/80 rounded-lg transition-colors border border-amber-200 dark:border-amber-800"
                  >
                    Jetzt konfigurieren
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showApiKeyConfig && (
        <ApiKeyConfig
          onClose={() => {
            setShowApiKeyConfig(false);
            checkApiKey();
          }}
        />
      )}
    </>
  );
}
