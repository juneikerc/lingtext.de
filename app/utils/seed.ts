import { addText, putUnknownWord, getAllTexts } from "~/services/db";
import { SEED_STORAGE_KEY } from "~/config/app-identity";
import type { AudioRef, TextItem, WordEntry } from "~/types";
import { uid } from "~/utils/id";

const SEED_KEY = SEED_STORAGE_KEY;

function makeDefaultWords(): Array<Pick<WordEntry, "word" | "translation">> {
  return [
    { word: "mundane", translation: "alltäglich" },
    { word: "ache", translation: "Schmerz" },
    { word: "tilt", translation: "neigen" },
    { word: "earnest", translation: "ernsthaft" },
    { word: "incantation", translation: "Beschwörung" },
    { word: "ledger", translation: "Hauptbuch" },
    { word: "cathedral", translation: "Kathedrale" },
    { word: "cavity", translation: "Hohlraum" },
    { word: "intricate", translation: "kompliziert" },
    { word: "bead", translation: "Perle" },
  ];
}

export async function seedInitialDataOnce(): Promise<void> {
  if (typeof window === "undefined") return; // only client
  try {
    // Check if we already seeded AND if data actually exists
    const alreadySeeded = localStorage.getItem(SEED_KEY);
    if (alreadySeeded) {
      // Verify data actually exists (in case DB was reset)
      const existingTexts = await getAllTexts();
      if (existingTexts.length > 0) {
        return; // Data exists, no need to seed
      }
      // Data was lost, clear the flag and re-seed
      console.log("[Seed] Data was lost, re-seeding...");
      localStorage.removeItem(SEED_KEY);
    }

    // Fetch default text content from public
    const res = await fetch("/the_box_by_the_river.txt");
    if (!res.ok) return; // no seeding if missing
    const content = await res.text();

    const audioRef: AudioRef = {
      type: "url",
      url: "/the_box_by_the_river.mp3",
    };

    const textItem: TextItem = {
      id: uid(),
      title: "The Box by the River",
      content,
      createdAt: Date.now(),
      audioRef,
    };

    await addText(textItem);

    const words = makeDefaultWords();
    for (const w of words) {
      const entry: WordEntry = {
        word: w.word,
        wordLower: w.word.toLowerCase(),
        translation: w.translation,
        status: "unknown",
        addedAt: Date.now(),
      };
      await putUnknownWord(entry);
    }

    localStorage.setItem(SEED_KEY, String(Date.now()));
  } catch (err) {
    console.warn("Seed failed:", err);
  }
}
