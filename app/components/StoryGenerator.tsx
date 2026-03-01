import { useState } from "react";
import type { StoryConfig, WordEntry } from "../types";
import { generateMultipleStories } from "../utils/story-generator";
import { addText } from "../services/db";

interface StoryGeneratorProps {
  selectedWords: string[];
  words: WordEntry[];
  onClose: () => void;
  onSuccess?: () => void;
}

const TEXT_TYPE_OPTIONS: Array<{
  value: StoryConfig["textType"];
  label: string;
  description: string;
}> = [
  {
    value: "short-story",
    label: "Kurzgeschichte",
    description: "Fiktionale Erzahlung mit Figuren und Handlung",
  },
  {
    value: "article",
    label: "Artikel",
    description: "Informierender Text zu einem konkreten Thema",
  },
  {
    value: "conversation",
    label: "Gesprach",
    description: "Dialog zwischen zwei oder mehr Personen",
  },
  {
    value: "blog-post",
    label: "Blogbeitrag",
    description: "Meinungs- oder Erfahrungsbeitrag",
  },
  {
    value: "email",
    label: "Email",
    description: "Mensaje formal o informal",
  },
];

const LEVEL_OPTIONS: Array<{
  value: StoryConfig["level"];
  label: string;
  description: string;
}> = [
  { value: "A2", label: "A2", description: "Grundstufe" },
  { value: "B1", label: "B1", description: "Mittelstufe" },
  { value: "B2", label: "B2", description: "Mittelstufe-alto" },
  { value: "C1", label: "C1", description: "Fortgeschritten" },
  { value: "C2", label: "C2", description: "Sehr fortgeschritten" },
];

export default function StoryGenerator({
  selectedWords,
  words,
  onClose,
  onSuccess,
}: StoryGeneratorProps) {
  const [config, setConfig] = useState({
    textType: "short-story" as StoryConfig["textType"],
    customTheme: "",
    minLength: 400,
    level: "B1" as StoryConfig["level"],
    count: 1 as 1 | 2 | 3,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const selectedWordEntries = words.filter((w) =>
    selectedWords.includes(w.wordLower)
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress({ current: 0, total: config.count });
    setGeneratedTexts([]);

    try {
      const fullConfig: StoryConfig = {
        ...config,
        wordLowerList: selectedWords,
      };

      const results = await generateMultipleStories(
        fullConfig,
        (current, total) => {
          setProgress({ current, total });
        }
      );

      const textIds: string[] = [];

      for (const result of results) {
        const textItem = {
          id: crypto.randomUUID(),
          title: result.title,
          content: result.content,
          format: "markdown" as const,
          createdAt: Date.now(),
          audioRef: null,
        };

        await addText(textItem);
        textIds.push(textItem.id);
      }

      setGeneratedTexts(textIds);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unbekannter Fehler bei der Generierung"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewText = (id: string) => {
    onClose();
    onSuccess?.();
    window.location.href = `/texts/${id}`;
  };

  const handleReset = () => {
    setGeneratedTexts([]);
    setError(null);
  };

  if (generatedTexts.length > 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
              Stories erstellt!
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Es wurden erfolgreich {generatedTexts.length} Text(e) erstellt
            </p>
            <div className="space-y-2 mb-6">
              {generatedTexts.map((id, index) => (
                <button
                  key={id}
                  onClick={() => handleViewText(id)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📖</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      Story {index + 1}
                    </span>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    →
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Mehr generieren
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ✨ Story generieren
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
              Worter ausgewahlt ({selectedWords.length}):
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedWordEntries.map((w) => (
                <span
                  key={w.wordLower}
                  className="inline-flex items-center px-2 py-1 rounded bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-800 dark:text-red-300 mb-2">
                    {error === "NO_API_KEY"
                      ? "API-Key nicht konfiguriert"
                      : error === "INVALID_API_KEY"
                        ? "API-Key ungultig"
                        : error === "RATE_LIMITED"
                          ? "Limit erreicht"
                          : error === "NETWORK_ERROR"
                            ? "Verbindungsfehler"
                            : error === "API_ERROR"
                              ? "API-Fehler"
                              : "Unbekannter Fehler"}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error === "NO_API_KEY"
                      ? "Du musst deinen OpenRouter-API-Key konfigurieren, um Stories zu generieren. Gehe zur Startseite und trage ihn im API-Key-Bereich ein."
                      : error === "INVALID_API_KEY"
                        ? "Der konfigurierte API-Key ist ungultig. Bitte prufe ihn und kopiere ihn erneut."
                        : error === "RATE_LIMITED"
                          ? "Du hast das API-Anfragelimit erreicht. Bitte warte ein paar Minuten und versuche es erneut."
                          : error === "NETWORK_ERROR"
                            ? "Verbindung zum Server fehlgeschlagen. Bitte prufe deine Internetverbindung und versuche es erneut."
                            : error === "API_ERROR"
                              ? "Beim OpenRouter-Server ist ein Fehler aufgetreten. Bitte versuche es in wenigen Minuten erneut."
                              : "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es erneut."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="mb-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Text wird generiert {progress.current} de {progress.total}...
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Das kann einige Sekunden dauern
              </p>
            </div>
          )}

          {!isGenerating && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Texttyp
                </label>
                <div className="space-y-2">
                  {TEXT_TYPE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="textType"
                        value={option.value}
                        checked={config.textType === option.value}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            textType: e.target.value as StoryConfig["textType"],
                          })
                        }
                        className="mt-1 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {option.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Thema (optional)
                </label>
                <input
                  type="text"
                  value={config.customTheme}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      customTheme: e.target.value,
                    })
                  }
                  placeholder="z. B. Technik, Natur, Abenteuer..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Wenn du kein Thema angibst, entscheidet die KI.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimale Lange (Worter)
                </label>
                <input
                  type="number"
                  min={200}
                  max={2000}
                  step={50}
                  value={config.minLength}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      minLength: parseInt(e.target.value) || 400,
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Empfohlen: 400-800 Worter
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Nivel
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {LEVEL_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`relative cursor-pointer transition-all duration-200 ${
                        config.level === option.value
                          ? "scale-105"
                          : "hover:scale-105"
                      }`}
                    >
                      <input
                        type="radio"
                        name="level"
                        value={option.value}
                        checked={config.level === option.value}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            level: e.target.value as StoryConfig["level"],
                          })
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          config.level === option.value
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-400"
                        }`}
                      >
                        <p className="font-bold text-sm">{option.label}</p>
                        <p className="text-xs opacity-80 mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Anzahl der Texte
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((count) => (
                    <label
                      key={count}
                      className="relative cursor-pointer transition-all duration-200 group"
                    >
                      <input
                        type="radio"
                        name="count"
                        value={count}
                        checked={config.count === count}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            count: parseInt(e.target.value) as unknown as
                              | 1
                              | 2
                              | 3,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          config.count === count
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900"
                            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
                        }`}
                      >
                        <p className="font-bold text-lg">{count}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex-1 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  🚀 Generieren
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
