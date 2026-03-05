import { VISITED_COLLECTION_TEXTS_KEY } from "~/config/app-identity";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getVisitedCollectionTextIds(): Set<string> {
  if (!isBrowser()) return new Set();

  try {
    const raw = window.localStorage.getItem(VISITED_COLLECTION_TEXTS_KEY);
    if (!raw) return new Set();

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(
      parsed.filter((value): value is string => {
        return typeof value === "string" && value.length > 0;
      })
    );
  } catch {
    return new Set();
  }
}

export function markCollectionTextAsVisited(textId: string): boolean {
  if (!isBrowser() || !textId) return false;

  const visitedIds = getVisitedCollectionTextIds();
  if (visitedIds.has(textId)) return false;

  visitedIds.add(textId);
  window.localStorage.setItem(
    VISITED_COLLECTION_TEXTS_KEY,
    JSON.stringify([...visitedIds])
  );

  return true;
}
