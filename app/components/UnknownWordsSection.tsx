import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import type { WordEntry } from "~/types";
import type { DailyStats } from "~/services/db";
import { exportUnknownWordsCsv } from "~/utils/anki";
import { deleteWord, getSettings } from "~/services/db";
import { speak } from "~/utils/tts";
import {
  isWordReadyForReview,
  formatTimeUntilReview,
} from "~/utils/spaced-repetition";
import { isTranslationJson } from "~/helpers/isTranslationJson";
import StoryGenerator from "./StoryGenerator";

interface UnknownWordsSectionProps {
  words: WordEntry[];
  dailyStats: DailyStats; // <--- new prop
  onRemove: (wordLower: string) => void;
}

// Limit-Konfiguration (sollte mit dem Scheduler ubereinstimmen)
const DAILY_NEW_WORD_LIMIT = 7;
const MAX_WORDS_FOR_STORY = 20;

export default function UnknownWordsSection({
  words,
  dailyStats,
  onRemove,
}: UnknownWordsSectionProps) {
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [showStoryGenerator, setShowStoryGenerator] = useState(false);

  const toggleWordSelection = (wordLower: string) => {
    const newSelection = new Set(selectedWords);
    if (newSelection.has(wordLower)) {
      newSelection.delete(wordLower);
    } else if (newSelection.size < MAX_WORDS_FOR_STORY) {
      newSelection.add(wordLower);
    }
    setSelectedWords(newSelection);
  };

  const handleStoryGeneratorClose = () => {
    setShowStoryGenerator(false);
  };

  const handleStoryGeneratorSuccess = () => {
    setSelectedWords(new Set());
  };

  // Berechnung der heutigen Statistiken
  const stats = useMemo(() => {
    const now = Date.now();

    // 1. Fallige Wiederholungen (ohne Limit)
    const reviewsDue = words.filter(
      (w) => w.srData && w.srData.nextReview <= now
    ).length;

    // 2. Neue Worter (gesamt in DB)
    const totalNewWordsInDb = words.filter((w) => !w.srData).length;

    // 3. Verbleibendes Tageskontingent fur neue Worter
    // (Tageslimit - bereits heute gelernt)
    const newQuotaRemaining = Math.max(
      0,
      DAILY_NEW_WORD_LIMIT - dailyStats.newCardsStudied
    );

    // 4. Neue Worter fur heute (Minimum aus DB und Kontingent)
    const newCardsAvailableToday = Math.min(
      newQuotaRemaining,
      totalNewWordsInDb
    );

    // 5. Gesamtsumme fur die heutige Sitzung
    const totalDueToday = reviewsDue + newCardsAvailableToday;

    return {
      reviewsDue,
      newCardsAvailableToday,
      totalDueToday,
      totalCollection: words.length,
      newCardsDone: dailyStats.newCardsStudied,
    };
  }, [words, dailyStats]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl"></div>
          <div className="absolute -bottom-24 right-1/3 h-96 w-96 rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                <span className="text-lg">←</span>
                <span>Zuruck</span>
              </Link>

              <div className="flex items-center space-x-4">
                {/* Main review button */}
                <Link
                  to="/review"
                  className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                    stats.totalDueToday > 0
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400"
                  }`}
                  // Navigation deaktivieren, wenn nichts offen ist
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>{stats.totalDueToday > 0 ? "🚀" : "✅"}</span>
                    <span>Heute lernen ({stats.totalDueToday})</span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Deine{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Sammlung
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {stats.totalCollection === 0
                  ? "Deine Bibliothek ist leer. Lies Texte, um Worter hinzuzufugen!"
                  : stats.totalDueToday === 0
                    ? "Du hast alle heutigen Ziele erreicht!"
                    : `Du hast ${stats.reviewsDue} Wiederholungen offen und kannst heute noch ${stats.newCardsAvailableToday} neue Worter lernen.`}
              </p>
            </div>
          </div>

          {words.length === 0 ? (
            // Globaler Leerstatus
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 text-center">
              {/* ... (gleicher Inhalt wie oben) ... */}
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                <span>📖 Mehr Texte lesen</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* HEUTIGES STATISTIK-PANEL */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        Tagesziel
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Limit: {DAILY_NEW_WORD_LIMIT} neu/Tag
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Card 1: Wiederholungen */}
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 text-center">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {stats.reviewsDue}
                    </div>
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      Fallige Wiederholungen
                    </div>
                    <div className="text-xs text-amber-600/70 mt-1">
                      Hohe Prioritat
                    </div>
                  </div>

                  {/* Card 2: Neue verfugbar */}
                  <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {stats.newCardsAvailableToday}
                    </div>
                    <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                      Neue verfugbar
                    </div>
                    <div className="text-xs text-indigo-600/70 mt-1">
                      Heute erledigt: {stats.newCardsDone}/{DAILY_NEW_WORD_LIMIT}
                    </div>
                  </div>

                  {/* Card 3: Gesamtsammlung */}
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-center">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {stats.totalCollection}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Insgesamt gespeichert
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Datenbank
                    </div>
                  </div>
                </div>
              </div>

              {/* Schnellaktionen */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => exportUnknownWordsCsv()}
                  className="flex-1 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950"
                >
                  📥 CSV exportieren (Anki)
                </button>
                <button
                  onClick={() => setShowStoryGenerator(true)}
                  disabled={selectedWords.size === 0}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950 ${
                    selectedWords.size > 0
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  ✨ Story generieren ({selectedWords.size}/
                  {MAX_WORDS_FOR_STORY})
                </button>
              </div>

              {selectedWords.size > 0 && (
                <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 p-4">
                  <p className="text-sm text-indigo-800 dark:text-indigo-300">
                    💡 <span className="font-medium">Tip:</span> Maximal 20
                    Worter sind fur bessere Texte empfohlen. Wenn du mehr
                    nutzen willst, beende zuerst die aktuelle Generierung mit{" "}
                    {selectedWords.size} Wortern und wahle danach neue.
                  </p>
                </div>
              )}

              {/* Wortliste (mit Status) */}
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">
                    Dein Wortschatz
                  </h3>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                    Nach Datum sortiert
                  </span>
                </div>

                <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                  {words.map((word) => (
                    <div
                      key={word.wordLower}
                      className={`group p-6 transition-colors duration-200 ${
                        selectedWords.has(word.wordLower)
                          ? "bg-indigo-50/50 dark:bg-indigo-900/10"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedWords.has(word.wordLower)}
                            onChange={() => toggleWordSelection(word.wordLower)}
                            disabled={
                              !selectedWords.has(word.wordLower) &&
                              selectedWords.size >= MAX_WORDS_FOR_STORY
                            }
                            className={`w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
                              !selectedWords.has(word.wordLower) &&
                              selectedWords.size >= MAX_WORDS_FOR_STORY
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                {word.word}
                              </h4>
                              {/* Audio-Icon ... */}
                              <button
                                onClick={async () => {
                                  const s = await getSettings();
                                  await speak(word.word, s.tts);
                                }}
                                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950 rounded"
                              >
                                🔊
                              </button>
                            </div>
                            {isTranslationJson(word.translation) ? (
                              <div className="space-y-2 mb-3">
                                {(() => {
                                  const parsed = JSON.parse(word.translation);
                                  return Object.entries(parsed.info).map(
                                    ([category, translations]) => (
                                      <div key={category}>
                                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                          {category}
                                        </p>
                                        <p className="text-gray-900 dark:text-gray-100">
                                          {(translations as string[]).join(
                                            ", "
                                          )}
                                        </p>
                                      </div>
                                    )
                                  );
                                })()}
                              </div>
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                {word.translation}
                              </p>
                            )}

                            {/* Wortstatus */}
                            <div className="flex items-center space-x-4 text-xs md:text-sm">
                              {isWordReadyForReview(word) && word.srData ? (
                                <span className="text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                                  ⚠️ Wiederholung fallig
                                </span>
                              ) : !word.srData ? (
                                <span className="text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">
                                  ✨ Neu
                                </span>
                              ) : (
                                <span className="text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                                  ✅ Gelernt (Nachste:{" "}
                                  {formatTimeUntilReview(
                                    word.srData.nextReview
                                  )}
                                  )
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Einzelaktionen */}
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950"
                            onClick={async () => {
                              if (confirm("Loschen?")) {
                                await deleteWord(word.wordLower);
                                onRemove(word.wordLower);
                              }
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showStoryGenerator && (
        <StoryGenerator
          selectedWords={Array.from(selectedWords)}
          words={words}
          onClose={handleStoryGeneratorClose}
          onSuccess={handleStoryGeneratorSuccess}
        />
      )}
    </div>
  );
}
