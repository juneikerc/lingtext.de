/**
 * Hook for synchronization with the Chrome extension.
 *
 * Flow:
 * 1. Extension sends LINGTEXT_EXTENSION_SYNC_REQUEST or LINGTEXT_SYNC_REQUEST.
 * 2. Web app reads extension data.
 * 3. Web app merges with local data (newer wins).
 * 4. Web app saves merged state and sends it back to extension.
 * 5. Extension replaces its cache with final state.
 */

import { useEffect, useCallback } from "react";
import { APP_DOMAIN } from "~/config/app-identity";
import {
  getAllUnknownWords,
  getAllPhrases,
  putUnknownWord,
  putPhrase,
  getOpenRouterApiKey,
} from "~/services/db";
import type { WordEntry, PhraseEntry } from "~/types";

interface ExtensionSyncData {
  words: WordEntry[];
  phrases: PhraseEntry[];
}

export function useExtensionSync() {
  const handleSync = useCallback(async (extensionData: ExtensionSyncData) => {
    console.log("[ExtensionSync] Starting sync with extension data:", {
      words: extensionData.words.length,
      phrases: extensionData.phrases.length,
    });

    try {
      // Read current web data
      const webWords = await getAllUnknownWords();
      const webPhrases = await getAllPhrases();
      const apiKey = await getOpenRouterApiKey();

      // Merge strategy: newer wins (based on addedAt)
      const wordMap = new Map<string, WordEntry>();

      // First add web words
      for (const word of webWords) {
        wordMap.set(word.wordLower, word);
      }

      // Then add/update with extension words (if newer)
      for (const word of extensionData.words) {
        const existing = wordMap.get(word.wordLower);
        if (!existing || word.addedAt > existing.addedAt) {
          wordMap.set(word.wordLower, word);
        }
      }

      const phraseMap = new Map<string, PhraseEntry>();

      // First add web phrases
      for (const phrase of webPhrases) {
        phraseMap.set(phrase.phraseLower, phrase);
      }

      // Then add/update with extension phrases (if newer)
      for (const phrase of extensionData.phrases) {
        const existing = phraseMap.get(phrase.phraseLower);
        if (!existing || phrase.addedAt > existing.addedAt) {
          phraseMap.set(phrase.phraseLower, phrase);
        }
      }

      const mergedWords = Array.from(wordMap.values());
      const mergedPhrases = Array.from(phraseMap.values());

      // Persist into web database
      for (const word of mergedWords) {
        await putUnknownWord(word);
      }
      for (const phrase of mergedPhrases) {
        await putPhrase(phrase);
      }

      console.log("[ExtensionSync] Merge complete:", {
        words: mergedWords.length,
        phrases: mergedPhrases.length,
      });

      // Send final state back to extension
      window.postMessage(
        {
          type: "LINGTEXT_SYNC_COMPLETE",
          payload: {
            words: mergedWords,
            phrases: mergedPhrases,
            apiKey: apiKey || undefined,
          },
        },
        "*"
      );
    } catch (error) {
      console.error("[ExtensionSync] Error during sync:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMessage = async (event: MessageEvent) => {
      // Only accept messages from same origin
      if (
        event.origin !== window.location.origin &&
        !event.origin.includes(APP_DOMAIN) &&
        !event.origin.includes("localhost")
      ) {
        return;
      }

      const { type, payload } = event.data || {};

      switch (type) {
        case "LINGTEXT_EXTENSION_READY":
          console.log("[ExtensionSync] Extension detected");
          break;

        case "LINGTEXT_EXTENSION_SYNC_REQUEST":
          // Extension requests sync (from popup)
          // First request data from extension
          window.postMessage({ type: "LINGTEXT_SYNC_REQUEST" }, "*");
          break;

        case "LINGTEXT_SYNC_RESPONSE":
          // Received extension data: perform merge
          if (payload) {
            await handleSync(payload as ExtensionSyncData);
          }
          break;

        case "LINGTEXT_EXTENSION_SYNCED":
          console.log("[ExtensionSync] Extension confirmed sync complete");
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    // Notify that the web app is ready to sync
    window.postMessage({ type: "LINGTEXT_WEB_READY" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleSync]);
}
