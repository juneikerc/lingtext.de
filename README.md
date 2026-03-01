# LingText: Englisch durch Lesen lernen, mit Sofortuebersetzung, TTS und Spaced Repetition

[LingText](https://lingtext.de) ist eine Full-Stack-Webanwendung, die auf aktives Englischlernen durch Lesen ausgerichtet ist. Sie kombiniert eine Textbibliothek, Uebersetzung von Woertern oder markierten Textstellen ins Deutsche, Text-to-Speech (TTS), Vokabelverwaltung mit Spaced Repetition sowie Export/Import deiner SQLite-Datenbank.

Das Ziel ist, Wortschatz im Kontext aufzubauen und Reibung zu minimieren: Du klickst oder markierst Woerter waehrend des Lesens, hoerst die Aussprache, speicherst Unbekanntes und wiederholst es mit einem Spaced-Repetition-Algorithmus.

---

## Kernfunktionen

- **Lernzentriertes Lesen**: Bibliothek mit lokalen Texten oder URL-basierten Texten, inklusive optionalem Audio und Markdown-Unterstuetzung.
- **Sofortige Uebersetzung**: nutzt die lokale Chrome-Translation-API, falls verfuegbar; andernfalls automatischer Fallback auf ein Remote-Endpoint mit OpenRouter (API-Key erforderlich).
- **TTS (Text-to-Speech)**: spricht Woerter direkt ueber die Web Speech API und erlaubt Konfiguration von Stimme, Sprache und Geschwindigkeit.
- **Vokabelverwaltung**: markiere Woerter und Phrasen als unbekannt und speichere sie mit integrierter Spaced Repetition.
- **Lokale SQLite-Datenbank**: alle Daten liegen in SQLite WASM mit Persistenz in OPFS (Origin Private File System).
- **Daten exportieren/importieren**: lade deine `.sqlite`-Datenbank herunter oder importiere sie von einem anderen Geraet. Deine Daten bleiben unter deiner Kontrolle.
- **Spaced Repetition**: integrierter SM-2-Algorithmus fuer effiziente Wiederholung.
- **Story-Generator**: erstellt personalisierte Texte (Kurzgeschichten, Artikel, Dialoge, Blogposts, E-Mails) auf Basis deiner ausgewaehlten Woerter, mit CEFR-Level (A2-C2) und hervorgehobenen Zielwoertern fuer Lernen im Kontext.
- **Audio**: Wiedergabe von angehaengtem Audio (URL oder lokale Datei via File System Access API) mit Geschwindigkeitskontrolle.
- **SSR + HMR**: Server-Side Rendering mit React Router v7 und moderne DX mit Vite.

## Zielgruppe und Produktphilosophie

- **Gefuehrtes Selbstlernen**: fuer Lernende, die durch Lesen mit wenig technischem Aufwand Wortschatz aufbauen wollen.
- **Local-first mit Datenhoheit**: Texte, Audio und Woerter werden in SQLite im Browser (OPFS) gespeichert. Du kannst die komplette Datenbank als `.sqlite` exportieren.
- **Datenschutz standardmaessig**: beim Remote-Fallback wird nur der zu uebersetzende Begriff uebertragen, nicht dein kompletter Text oder gesamter Wortschatz.
- **Kosteneffizient**: lokale Faehigkeiten (Chrome Translator, TTS, SQLite WASM) werden priorisiert; Remote-Modelle nur bei Bedarf.

---

## Schneller Einstieg (Demo)

1. Erstelle oder importiere einen Text in der Bibliothek.
2. Oeffne den Reader und klicke auf ein Wort: Du siehst die Uebersetzung und kannst es als unbekannt markieren oder anhoeren.
3. Markiere einen Abschnitt, um ihn zu uebersetzen und mehrere Woerter gleichzeitig zu speichern.
4. Gehe zu "Woerter", um zu wiederholen, anzuhoeren und als CSV zu exportieren.
5. Generiere personalisierte Texte: Waehle bis zu 20 Woerter, einen Texttyp und ein CEFR-Level (A2-C2). Die KI erstellt Texte mit deinen Zielwoertern im Kontext.

---

## Technischer Stack

- **Framework**: `react-router` 7 (SSR) + `vite` 6 + `react` 19 + `tailwindcss` 4.
- **Global State**: `zustand` (`app/context/translatorSelector.ts`).
- **Datenbank**: SQLite WASM (`@sqlite.org/sqlite-wasm`) mit OPFS-Persistenz (`app/services/db.ts`).
- **TTS**: Web Speech API (`app/utils/tts.ts`).
- **Uebersetzung**: lokaler Chrome Translator (`app/utils/translate.ts`) plus Remote-Endpoint (`app/routes/translate.tsx`).
- **Backup/Restore**: File System Access API fuer Export/Import von `.sqlite`-Dateien.

---

## Projektstruktur (Auszug)

- `app/`
  - `components/`
    - `Reader.tsx`, `reader/` (Lese-UI, Popups, Audio)
    - `UnknownWordsSection.tsx` (Liste und Aktionen)
    - `StoryGenerator.tsx` (Modal fuer personalisierte Texte)
  - `routes/`
    - `home.tsx`, `texts/text.tsx`, `words.tsx`, `review.tsx`, `translate.tsx`
  - `services/`
    - `db.ts` (SQLite WASM mit OPFS)
  - `context/translatorSelector.ts` (zustand)
  - `utils/` (`translate.ts`, `tts.ts`, `tokenize.ts`, `anki.ts`, `fs.ts`, `scheduler.ts`, `spaced-repetition.ts`, `story-generator.ts`)
  - `public/` (Assets und Beispieltexte)
  - `workers/app.ts` (Cloudflare Worker mit COOP/COEP-Headern)

---

## Routen

- `/` -> `app/routes/home.tsx`: Startseite und Bibliothek (`app/components/Libary.tsx`) mit Datenbank-Export/Import.
- `/texts/:id` -> `app/routes/texts/text.tsx`: Reader, Audio und Uebersetzungs-Popups.
- `/words` -> Liste unbekannter Woerter mit Wiederholungsstatistiken.
- `/review` -> Wiederholungssitzung mit Spaced Repetition.
- `/translate/:text` -> JSON-Endpoint fuer Remote-Uebersetzung.

---

## Funktionaler Ablauf

1. **Bibliothek** (`app/components/Libary.tsx`)
   - Texte mit Titel und Inhalt (Plain Text oder Markdown) erstellen, `.txt` importieren, Audio per URL oder lokalem File anhaengen.
   - Persistenz in SQLite WASM (OPFS) via `addText()`.
   - Vollstaendigen Datenbank-Export/Import als `.sqlite`.
2. **Reader** (`app/components/Reader.tsx`)
   - Tokenisiert Text und unterstuetzt Klick/Selektion.
   - `WordPopup` und `SelectionPopup` nutzen `translateTerm()` mit automatischem Fallback.
   - Unbekannte Woerter markieren (`putUnknownWord`) und TTS pro Wort abspielen.
3. **Woerter** (`app/components/UnknownWordsSection.tsx`)
   - Listen, TTS, Loeschen und CSV-Export (`app/utils/anki.ts`).
   - Bis zu 20 Woerter auswaehlen und personalisierte Texte mit KI erzeugen (`StoryGenerator.tsx`).
4. **Story-Generator** (`app/components/StoryGenerator.tsx`, `app/utils/story-generator.ts`)
   - Bis zu 20 Woerter aus dem Wortschatz waehlen.
   - Texttyp auswaehlen (Kurzgeschichte, Artikel, Dialog, Blogpost, E-Mail).
   - Optionales Thema und CEFR-Level (A2-C2, Standard B1) festlegen.
   - 1-3 Texte als Batch erzeugen; Zielwoerter werden in **bold** markiert.
   - Texte werden als Markdown in die DB gespeichert und im Reader geoeffnet.
5. **Wiederholung** (`app/routes/review.tsx`)
   - Wiederholungssitzung mit SM-2-basiertem Algorithmus.
   - Konfigurierbares Tageslimit fuer neue Karten.

---

## Datenmodell (SQLite WASM)

SQLite-Datenbank im Browser-OPFS (`lingtext-de.sqlite3`):

- Tabelle `texts` (`id`, `title`, `content`, `format`, `created_at`, `audio_ref`).
- Tabelle `words` (`word_lower`, `word`, `translation`, `status`, `added_at`, `voice`, `sr_data`).
- Tabelle `phrases` (`phrase_lower`, `phrase`, `translation`, `parts`, `added_at`, `sr_data`).
- Tabelle `settings` (`key`, `value` - TTS und weitere Praeferenzen).
- Tabelle `stats` (`date`, `new_cards_studied` - taegliche Statistiken).

---

## Uebersetzung: lokal + remote (Fallback)

- **Lokal (Chrome)**: `translateFromChrome(term)` nutzt die `Translator`-API, sofern vorhanden.
- **Remote (OpenRouter)**: `translateRemote(term, model)` ruft `/translate/:term` auf.
- **Unified Flow**: `translateTerm(term, selected)` priorisiert Chrome und faellt bei ungueltigen Ergebnissen auf Remote zurueck.
- **API-Key**: setze `OPEN_ROUTER_API_KEY` in der Serverumgebung, um das Remote-Endpoint in Entwicklung und Produktion zu aktivieren.

---

## Lokales Audio, Berechtigungen und Re-Autorisierung

- Wenn Audio als lokale Datei (`FileSystemFileHandle`) angehaengt ist, versucht der Reader eine temporaere URL zu erzeugen.
- In `clientLoader` (`app/routes/texts/text.tsx`) wird ein `getFile()`-Fehler abgefangen und `audioUrl: null` geliefert, wenn Berechtigung fehlt.
- In `Reader` (`app/components/Reader.tsx`) erscheint bei `audioRef.type === 'file'` und fehlender `audioUrl` ein "Audio neu autorisieren"-Button (`ensureReadPermission()` in `app/utils/fs.ts`).
- `ObjectURL`s werden aufgeraeumt, um Memory-Leaks zu vermeiden.

---

## Installation und Ausfuehrung

Voraussetzungen: Node 20+ und ein moderner Browser. Fuer Remote-Uebersetzung wird ein OpenRouter-Key benoetigt.

1. Abhaengigkeiten installieren

```bash
npm install
```

2. Entwicklung (SSR mit HMR)

```bash
npm run dev
# http://localhost:5173
```

3. Produktion

```bash
# Erfordert Umgebungsvariable: OPEN_ROUTER_API_KEY
npm run build
npm run start
# Serviert ./build/server/index.js
```

4. Docker

```bash
docker build -t lingtext .
docker run -e OPEN_ROUTER_API_KEY=sk-... -p 3000:3000 lingtext
```

---

## Umgebungsvariablen

- `OPEN_ROUTER_API_KEY`: Key fuer `app/routes/translate.tsx`; wird nur serverseitig (SSR) verwendet.

---

## Barrierefreiheit und Datenschutz

- **Barrierefreiheit**: `aria-label` bei Icon-Buttons, Audiosteuerung, Kontrast im Dark Mode. Pruefung mit Lighthouse/Axe empfohlen.
- **Datenschutz**: Texte, Audio-Handles und Woerter liegen in SQLite WASM im Browser (OPFS). Remote-Uebersetzung sendet nur den zu uebersetzenden Begriff.
- **Datenhoheit**: die komplette Datenbank kann als `.sqlite` exportiert und auf andere Geraete migriert werden.

---

## Troubleshooting (FAQ)

- **Lokales Audio spielt nicht ab**
  - Nutze Chrome/Edge auf `localhost` oder HTTPS (Voraussetzung der File System Access API).
  - Bei "Audio neu autorisieren" klicken und Berechtigung vergeben. Falls noetig Datei in der Bibliothek erneut anhaengen.
- **Uebersetzung bleibt leer**
  - `OPEN_ROUTER_API_KEY` und Netzwerk pruefen. Chrome Translator ist evtl. nicht verfuegbar; ohne API-Key bleibt der Fallback leer.
- **Chrome Translator-Option fehlt**
  - Die `Translator`-API ist experimentell und nur in bestimmten Chrome-Versionen verfuegbar. Nutze in dem Fall Remote-Modelle.

---

## Roadmap

- ~~Unbekannte Woerter und Fortschritt pro Text~~ (implementiert)
- ~~Personalisierte Story-Generierung~~ (implementiert)
- Optionale Synchronisierung (self-hosted) fuer mehrere Geraete.
- EPUB/PDF-Import mit Textextraktion.
- Anki-Decks nach Text/Thema, inklusive Cloze-Karten.

---

## Mitwirken

1. Fork erstellen und Branch anlegen: `feat/mein-feature`.
2. `npm run dev` ausfuehren und bei Bedarf Tests/Checks ergaenzen.
3. PR mit Ziel und UX-Auswirkung einreichen.

---

## Lizenz

Noch offen. Wenn du ein bestimmtes Modell bevorzugst (MIT/BSD-3/Apache-2.0), erstelle bitte ein Issue.

---

## Hinweis

`package.json` enthaelt aktuell `"name": ""`. Du kannst es vor einer Veroeffentlichung z. B. auf `"lingtext"` setzen.

---

## Urspruengliches React-Router-Template

## Funktionen

- Server-Side Rendering
- Hot Module Replacement (HMR)
- Asset-Bundling und Optimierung
- Datenladen und Mutationen
- TypeScript standardmaessig
- TailwindCSS fuer Styling
- [React-Router-Dokumentation](https://reactrouter.com/)

## Erste Schritte

### Installation

Abhaengigkeiten installieren:

```bash
npm install
```

### Entwicklung

Entwicklungsserver mit HMR starten:

```bash
npm run dev
```

Die Anwendung ist unter `http://localhost:5173` erreichbar.

## Produktionsbuild

Produktionsbuild erstellen:

```bash
npm run build
```

## Bereitstellung

### Docker-Deployment

Mit Docker bauen und starten:

```bash
docker build -t my-app .

docker run -p 3000:3000 my-app
```

Die containerisierte Anwendung kann auf Plattformen wie diesen bereitgestellt werden:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Manuelles Deployment

Wenn du mit Node-Bereitstellungs-Workflows vertraut bist, ist der integrierte App-Server produktionsreif.

Stelle das Ergebnis von `npm run build` bereit:

```
├── package.json
├── package-lock.json (oder pnpm-lock.yaml oder bun.lockb)
├── build/
│   ├── client/    # Statische Assets
│   └── server/    # Serverseitiger Code
```

## Styling

Tailwind CSS ist als praktischer Startpunkt vorkonfiguriert. Du kannst auch jedes andere CSS-Framework verwenden.
