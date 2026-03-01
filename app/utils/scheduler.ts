import {
  getAllUnknownWords,
  getAllPhrases,
  getDailyStats,
  type DailyStats,
} from "~/services/db";
import type { WordEntry, PhraseEntry } from "~/types";

// CONFIG: default daily limit for new cards (e.g. 15)
const DEFAULT_NEW_LIMIT = 7;

export async function generateSessionDeck(
  limitNew: number = DEFAULT_NEW_LIMIT
): Promise<{
  deck: WordEntry[];
  stats: DailyStats;
  limitReached: boolean;
}> {
  // 1. Load all content and daily stats
  const [words, phrases, dailyStats] = await Promise.all([
    getAllUnknownWords(),
    getAllPhrases(),
    getDailyStats(),
  ]);

  // Merge words and phrases into one list
  const allItems = [...words, ...phrases] as WordEntry[];
  const now = Date.now();

  // ---------------------------------------------------------
  // STEP A: REVIEWS (highest priority - unlimited)
  // Include all items whose review date is due
  // ---------------------------------------------------------
  const reviewsDue = allItems
    .filter((item) => item.srData && item.srData.nextReview <= now)
    .sort((a, b) => a.srData!.nextReview - b.srData!.nextReview); // Oldest first

  // ---------------------------------------------------------
  // STEP B: NEW CARDS (daily limited)
  // Items without srData
  // ---------------------------------------------------------
  const newItems = allItems.filter((item) => !item.srData);

  // Read how many new cards were already studied today
  const newCardsDoneToday = dailyStats.newCardsStudied;

  // Calculate remaining quota (e.g. 15 limit - 5 done = 10 left)
  const remainingSlots = Math.max(0, limitNew - newCardsDoneToday);

  // Take only as many as needed
  const newItemsToStudy = newItems.slice(0, remainingSlots);

  // ---------------------------------------------------------
  // STEP C: BUILD FINAL DECK
  // ---------------------------------------------------------

  // Option 1: classic order (reviews first, then new cards)
  const deck = [...reviewsDue, ...newItemsToStudy];

  /* Option 2: mixed order (if you prefer interleaving)
   const deck = [...reviewsDue, ...newItemsToStudy].sort(() => Math.random() - 0.5);
  */

  return {
    deck,
    stats: dailyStats,
    // True if there are more new items available but daily limit stopped us
    limitReached: remainingSlots === 0 && newItems.length > 0,
  };
}
