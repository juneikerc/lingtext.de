import type { WordEntry, SpacedRepetitionData } from "~/types";

/**
 * Determines whether a word is ready for review.
 * If it has no SR data (new), it is considered ready.
 * If it has SR data, compare current time to nextReview.
 */
export function isWordReadyForReview(word: WordEntry): boolean {
  if (!word.srData) return true; // First time (new card)
  return Date.now() >= word.srData.nextReview;
}

/**
 * Formats remaining time until next review.
 */
export function formatTimeUntilReview(nextReview: number): string {
  const now = Date.now();
  const diff = nextReview - now;

  if (diff <= 0) return "Jetzt";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} Tag${days > 1 ? "e" : ""}`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else {
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return minutes > 0 ? `${minutes} min` : "< 1 min";
  }
}

/**
 * Calculates stats for words ready to review.
 * Useful for counters in the UI.
 */
export function calculateReadyWords(words: WordEntry[]) {
  const ready = words.filter(isWordReadyForReview);
  return {
    ready: ready.length,
    total: words.length,
    percentage:
      words.length > 0 ? Math.round((ready.length / words.length) * 100) : 0,
  };
}

/**
 * Improved SM-2 algorithm (Anki style).
 * @param currentData Current SR data (undefined if new card).
 * @param quality Answer quality: 0-5 (0=complete blackout, 3=pass, 5=perfect).
 */
export function calculateNextReview(
  currentData: SpacedRepetitionData | undefined,
  quality: number
): SpacedRepetitionData {
  const now = Date.now();

  // Default values for a new word
  if (!currentData) {
    // Low quality (<3): very soon; high quality: start at 1 day.
    const initialInterval = quality >= 3 ? 1 : 0.04; // 0.04 days ~= 1 hour

    return {
      easeFactor: 2.5,
      interval: initialInterval,
      repetitions: quality >= 3 ? 1 : 0,
      nextReview: now + initialInterval * 24 * 60 * 60 * 1000,
      reviewHistory: [{ date: now, quality, interval: initialInterval }],
    };
  }

  let { easeFactor, repetitions, interval } = currentData;

  if (quality >= 3) {
    // --- CORRECT ANSWER ---
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6; // Classic Anki jump (1 day -> 6 days)
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;

    // Adjust ease factor (standard SM-2 formula)
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q)*0.02))
    easeFactor =
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    // Keep minimum at 1.3 to avoid "review hell"
    if (easeFactor < 1.3) easeFactor = 1.3;
  } else {
    // --- INCORRECT ANSWER ---
    repetitions = 0;
    interval = 1; // Reset to 1 day
    // Note: strict Anki variants may reduce ease factor here,
    // but keeping it is usually less frustrating.
  }

  // Compute next review timestamp
  const nextReview = now + interval * 24 * 60 * 60 * 1000;

  // Keep only last 20 entries to avoid DB bloat
  const reviewHistory = [
    ...(currentData.reviewHistory || []),
    { date: now, quality, interval },
  ].slice(-20);

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview,
    reviewHistory,
  };
}
