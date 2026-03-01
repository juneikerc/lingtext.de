# LingText Chrome Extension (v0.2)

MV3-Erweiterung fuer YouTube mit interaktiven Untertiteln im CC-Stil (zeilenweise),
Wortuebersetzung und Synchronisierung mit LingText Web.

## Wichtigste Aenderungen in v0.2

- Vollstaendige Neuschreibung des YouTube-Content-Skripts.
- Neue Untertitel-Engine mit Cue-Stabilisierung (verhindert wortweises Anwachsen bei ASR).
- Neue visuelle Darstellung im Stil kompletter CC-Untertitelzeilen bei gleichzeitigem Wort-Klick.
- Neuer interner Message-Contract `LT2_*`.
- Neuer namespaceter Speicher `ltde_*`.
- Reset lokaler Daten bei Migration auf Schema v2.

## Architektur

```
extension/src/
  background/
    index.ts      # SW-Entrypoint + Origin-Sicherheit + Store-Bootstrap
    router.ts     # Message-Router LT2_*
    store.ts      # Persistenz v2 (chrome.storage.local)
  content/
    main.tsx                # Bootstrap YouTube-Overlay im Shadow DOM
    overlay-root.tsx        # Hauptzustand fuer UI/Aktionen
    caption-track-loader.ts # Laden englischer Tracks + API-Fallback
    caption-parser.ts       # json3/xml Parser
    cue-stabilizer.ts       # Cue-Merge/Stabilisierung
    subtitle-engine.ts      # Binaere Zeitsuche
    player-observer.ts      # SPA-videoId + Player-Rechteck
    native-cc.ts            # Native CC ausblenden/wiederherstellen
    bridge.ts               # Sync mit Web-App via postMessage
    youtube.tsx             # Entrypoint Content-Skript fuer YouTube
  components/
    SubtitleOverlay.tsx
    WordPopup.tsx
    SelectionPopup.tsx
  popup/
    Popup.tsx
```

## Interne Runtime-Messages

- `LT2_GET_WORDS`, `LT2_GET_WORD`, `LT2_PUT_WORD`, `LT2_DELETE_WORD`
- `LT2_GET_PHRASES`, `LT2_PUT_PHRASE`
- `LT2_GET_SETTINGS`, `LT2_SET_SETTINGS`
- `LT2_EXPORT_SYNC`, `LT2_IMPORT_SYNC`

## Storage-Keys v2

- `ltde_schema_version`
- `ltde_words`
- `ltde_phrases`
- `ltde_settings`
- `ltde_last_sync`

## Entwicklung

```bash
cd extension
npm run dev
npm run build
```

## Funktionale Hinweise

- Sprachrichtlinie fuer Captions: nur Englisch (`en*`).
- Falls Transcript fehlschlaegt, wird auf DOM-Captions zurueckgegriffen.
- Native CC werden nur ausgeblendet, wenn das Overlay Untertitel zeigt.
