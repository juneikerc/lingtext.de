export type AudioRef =
  | { type: "url"; url: string }
  | {
      type: "file";
      name: string; // persisted using FileSystem Access API handle
      fileHandle: FileSystemFileHandle;
    };

export interface TextItem {
  id: string;
  title: string;
  content: string;
  format?: "txt" | "markdown"; // Content format
  createdAt: number;
  audioRef?: AudioRef | null;
}

export type SongProvider = "youtube" | "spotify";

export interface SongItem {
  id: string;
  title: string;
  lyrics: string;
  provider: SongProvider;
  sourceUrl: string;
  embedUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface LanguageIslandItem {
  id: string;
  title: string;
  sentencesText: string;
  createdAt: number;
  updatedAt: number;
}

export interface VoiceParams {
  name?: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface SpacedRepetitionData {
  easeFactor: number; // Ease factor (default 2.5)
  interval: number; // Current interval in days
  repetitions: number; // Number of successful repetitions
  nextReview: number; // Timestamp of the next review
  reviewHistory: Array<{
    date: number; // Review timestamp
    quality: number; // Answer quality (0-5, where 5 is perfect)
    interval: number; // Interval used for that review
  }>;
}

export interface WordEntry {
  word: string;
  wordLower: string;
  translation: string;
  status: "unknown";
  addedAt: number;
  voice?: VoiceParams;
  // Spaced repetition algorithm data
  srData?: SpacedRepetitionData;
  // Optional flag indicating this item is a phrase in the review UI
  isPhrase?: boolean;
}

// Entity for composed phrases
export interface PhraseEntry {
  // Original phrase as selected by the user
  phrase: string;
  // Normalized lowercase key without punctuation, space-separated
  phraseLower: string;
  // Phrase translation
  translation: string;
  // Normalized component words in order
  parts: string[];
  // Creation timestamp
  addedAt: number;
  // Spaced repetition data for phrases
  srData?: SpacedRepetitionData;
}

export interface Settings {
  id: "preferences";
  tts: Required<Pick<VoiceParams, "lang" | "rate" | "pitch" | "volume">> & {
    voiceName?: string;
  };
}

export enum TRANSLATORS {
  CHROME = "chrome",
  MYMEMORY = "mymemory",
  MEDIUM = "google/gemini-2.5-flash-lite",
  SMART = "google/gemini-3-flash-preview",
}

export interface StoryConfig {
  wordLowerList: string[];
  textType: StoryType;
  customTheme?: string;
  minLength: number;
  level: Level;
  count: 1 | 2 | 3;
}

export type StoryType =
  | "short-story"
  | "article"
  | "conversation"
  | "blog-post"
  | "email";

export type Level = "A2" | "B1" | "B2" | "C1" | "C2";

export interface GeneratedStoryResult {
  title: string;
  content: string;
  wordCount: number;
}

export interface TextCollection {
  title: string;
  level: string;
  content: string;
  sound?: string;
}
