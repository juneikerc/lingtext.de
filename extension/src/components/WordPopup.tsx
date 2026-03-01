/**
 * WordPopup - Popup de traducción para palabras
 * Adaptado de app/components/reader/WordPopup.tsx
 */

import type { WordPopupState } from "@/types";

interface WordPopupProps {
  popup: WordPopupState;
  isUnknown: boolean;
  onSpeak: (word: string) => void;
  onMarkKnown: (lower: string) => void;
  onMarkUnknown: (lower: string, original: string, translation: string) => void;
  onClose: () => void;
}

export default function WordPopup({
  popup,
  isUnknown,
  onSpeak,
  onMarkKnown,
  onMarkUnknown,
  onClose,
}: WordPopupProps) {
  // Detectar si la traducción es JSON estructurado
  const isJsonTranslation = popup.translation.startsWith("{");
  let parsedTranslation: { info?: Record<string, string[]> } | null = null;

  if (isJsonTranslation) {
    try {
      parsedTranslation = JSON.parse(popup.translation);
    } catch {
      // No es JSON válido
    }
  }

  return (
    <div
      className="lingtext-popup"
      style={{
        left: popup.x,
        top: popup.y,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="lingtext-popup-header">
        <div className="lingtext-popup-word">
          <span className="lingtext-popup-icon">📖</span>
          <strong>{popup.word}</strong>
        </div>
        <button
          className="lingtext-popup-speak"
          onClick={() => onSpeak(popup.word)}
        >
          🔊
        </button>
        <button className="lingtext-popup-close" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Translation */}
      <div className="lingtext-popup-body">
        <div className="lingtext-popup-label">🇩🇪 Übersetzung</div>
        <div className="lingtext-popup-translation">
          {parsedTranslation?.info ? (
            Object.entries(parsedTranslation.info).map(
              ([category, translations]) => (
                <div key={category} className="lingtext-popup-category">
                  <span className="lingtext-popup-category-name">
                    {category}:
                  </span>
                  <span>{(translations as string[]).join(", ")}</span>
                </div>
              )
            )
          ) : (
            <span>{popup.translation}</span>
          )}
        </div>

        {/* Status */}
        <div className="lingtext-popup-status">
          <span
            className={`lingtext-status-badge ${isUnknown ? "unknown" : "known"}`}
          >
            {isUnknown ? "🎯 Zu lernen" : "✅ Bekannt"}
          </span>
        </div>

        {/* Actions */}
        <div className="lingtext-popup-actions">
          {isUnknown ? (
            <button
              className="lingtext-btn lingtext-btn-known"
              onClick={() => onMarkKnown(popup.lower)}
            >
              ✅ Als bekannt markieren
            </button>
          ) : (
            <button
              className="lingtext-btn lingtext-btn-unknown"
              onClick={() =>
                onMarkUnknown(popup.lower, popup.word, popup.translation)
              }
            >
              🎓 Zum Wiederholen markieren
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
