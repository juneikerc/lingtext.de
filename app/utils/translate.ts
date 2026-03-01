import { TRANSLATORS } from "../types";
import { getOpenRouterApiKey } from "../services/db";
import {
  APP_ORIGIN,
  SOURCE_LANGUAGE,
  TARGET_LANGUAGE,
} from "~/config/app-identity";

export async function translateWithMyMemory(
  term: string
): Promise<{ translation: string; error?: string }> {
  const sanitizedText = term.trim();
  if (!sanitizedText) {
    return { translation: "", error: "Invalid text content" };
  }

  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", sanitizedText);
    url.searchParams.set("langpair", `${SOURCE_LANGUAGE}|${TARGET_LANGUAGE}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error("MyMemory API error:", response.status);
      return { translation: "", error: "API_ERROR" };
    }

    const data = (await response.json()) as {
      responseData?: { translatedText?: string };
      responseStatus?: number | string;
      responseDetails?: string;
      quotaFinished?: boolean;
    };

    const responseStatus =
      data.responseStatus === undefined
        ? 200
        : Number.parseInt(String(data.responseStatus), 10);

    const responseDetails = String(data.responseDetails || "").toLowerCase();
    const looksLikeQuotaExceeded =
      data.quotaFinished === true ||
      responseDetails.includes("quota") ||
      (responseDetails.includes("limit") && responseDetails.includes("day"));

    if (looksLikeQuotaExceeded) {
      return { translation: "", error: "MYMEMORY_QUOTA_EXCEEDED" };
    }

    if (responseStatus !== 200) {
      console.error(
        "MyMemory API error:",
        responseStatus,
        data.responseDetails
      );
      return { translation: "", error: "API_ERROR" };
    }

    const translation = (data.responseData?.translatedText || "").trim();
    if (!translation) {
      return { translation: "", error: "INVALID_RESPONSE" };
    }

    return { translation };
  } catch (error) {
    console.error("MyMemory translation error:", error);
    return { translation: "", error: "NETWORK_ERROR" };
  }
}

export function isChromeAIAvailable(): boolean {
  const isChrome =
    navigator.userAgent.includes("Chrome") &&
    !navigator.userAgent.includes("Edg") &&
    !navigator.userAgent.includes("OPR");

  const hasTranslatorAPI = "Translator" in self;

  return isChrome && hasTranslatorAPI;
}

export async function translateFromChrome(
  term: string
): Promise<{ translation: string }> {
  if ("Translator" in self) {
    const translateWithChromeAPI = async () => {
      try {
        // @ts-expect-error Translator is a new Chrome API not in TS types yet
        const translator = await Translator.create({
          sourceLanguage: SOURCE_LANGUAGE,
          targetLanguage: TARGET_LANGUAGE,
        });
        const result = await translator.translate(term);
        return result;
      } catch (error) {
        console.error("Chrome Translation API error:", error);
        return "Translation failed.";
      }
    };

    return { translation: await translateWithChromeAPI() };
  } else {
    return { translation: "" };
  }
}

/**
 * Translate using OpenRouter API directly from the client
 * Requires user's own API key stored in the database
 */
export async function translateWithOpenRouter(
  term: string,
  model: string = TRANSLATORS.MEDIUM
): Promise<{ translation: string; error?: string }> {
  const apiKey = await getOpenRouterApiKey();

  if (!apiKey) {
    return {
      translation: "",
      error: "NO_API_KEY",
    };
  }

  const sanitizedText = term.trim().replace(/[<>"'&]/g, "");
  if (!sanitizedText) {
    return { translation: "", error: "Invalid text content" };
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": APP_ORIGIN,
          "X-Title": "LingText",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: `You are a machine that outputs strict JSON. You receive an English word and output its German translations grouped by grammatical category as a list of strings.
Rules:
1. Use only valid JSON.
2. Values must be arrays of strings.
3. Only include relevant categories.

some of the categories are: Noun, Verb, Adjective, Adverb, Pronoun, Preposition, Conjunction, Interjection, Phrase, Sentence.

EXAMPLES:

User: "run"
Assistant:
{
  "word": "run",
  "info": {
    "Verb": ["laufen", "rennen", "betreiben"],
    "Noun": ["Lauf", "Durchlauf", "Serie"]
  }
}

User: "fast"
Assistant:
{
  "word": "fast",
  "info": {
    "Adjective": ["schnell", "rasch"],
    "Adverb": ["schnell"],
    "Noun": ["Fasten"],
    "Verb": ["fasten"]
  }
}

User: "beautiful"
Assistant:
{
  "word": "beautiful",
  "info": {
    "Adjective": ["schön", "wunderschön", "hübsch"]
  }
}
          
translate this word to german: ${sanitizedText} (respond only with the translation no additional text)`,
            },
          ],
          max_tokens: 100,
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API error:", response.status, errorData);

      if (response.status === 401) {
        return { translation: "", error: "INVALID_API_KEY" };
      }
      if (response.status === 429) {
        return { translation: "", error: "RATE_LIMITED" };
      }
      return { translation: "", error: "API_ERROR" };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const translation = data.choices?.[0]?.message?.content?.trim();

    if (!translation) {
      return { translation: "", error: "No translation received" };
    }

    return {
      translation: translation.replaceAll("```", "").replace("json", "").trim(),
    };
  } catch (error) {
    console.error("OpenRouter translation error:", error);
    return { translation: "", error: "NETWORK_ERROR" };
  }
}

// Unified flow: use Chrome when selected and available; otherwise use OpenRouter with user's API key.
export async function translateTerm(
  term: string,
  selected: TRANSLATORS
): Promise<{ translation: string; error?: string }> {
  if (selected === TRANSLATORS.CHROME) {
    const local = await translateFromChrome(term);
    const value = (local.translation || "").trim();
    if (value && value !== "Translation failed.") return { translation: value };

    const free = await translateWithMyMemory(term);
    const freeValue = (free.translation || "").trim();
    if (freeValue) return { translation: freeValue };

    // Automatic fallback to default remote model if Chrome is unavailable or fails
    return translateWithOpenRouter(term, TRANSLATORS.MEDIUM);
  }

  if (selected === TRANSLATORS.MYMEMORY) {
    return translateWithMyMemory(term);
  }

  // Explicit remote-model selection via OpenRouter
  return translateWithOpenRouter(term, selected);
}
