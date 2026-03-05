# So richtest du deinen OpenRouter-API-Key in LingText ein

LingText bietet drei Uebersetzungsoptionen, die dir beim Englischlernen
helfen. In dieser Anleitung erklaeren wir, warum wir OpenRouter empfehlen und
wie du es Schritt fuer Schritt einrichtest.

## Warum brauche ich einen API-Key?

### Der Chrome-Uebersetzer hat Einschraenkungen

Der native Chrome-Uebersetzer (Chrome AI) ist kostenlos und schnell, hat aber
zwei wichtige Nachteile:

1. **Er funktioniert nur auf dem Desktop** - Auf mobilen Geraeten und in nicht
   allen Browsern ist er nicht verfuegbar.
2. **Einfache Uebersetzungen** - Er liefert nur eine einzige woertliche
   Uebersetzung, ohne Kontext oder Varianten.

### OpenRouter bietet intelligente Uebersetzungen

Mit OpenRouter bekommst du:

- ✅ **Mehrere Bedeutungen** je nach Kontext
- ✅ **Beispiele fuer die Verwendung**, um ein Wort besser zu verstehen
- ✅ **Funktioniert auf jedem Geraet** mit modernem Browser
- ✅ **Fortschrittliche KI-Modelle** wie Gemini und Claude

### Dein API-Key ist sicher

**Wichtig**: Dein API-Key wird nur in deinem Browser gespeichert
(`localStorage`/`chrome.storage`). Er wird niemals an unsere Server gesendet.
Die Aufrufe an OpenRouter erfolgen direkt aus deinem Browser.

---

## Schritt 1: Ein Konto bei OpenRouter erstellen

1. Gehe zu [openrouter.ai](https://openrouter.ai)
2. Klicke auf **"Sign In"** (oben rechts)
3. Du kannst dich mit Google, GitHub oder per E-Mail registrieren

![OpenRouter Sign In](https://openrouter.ai/images/og-image.png)

---

## Schritt 2: Deinen API-Key holen

1. Wenn du eingeloggt bist, gehe zu
   [openrouter.ai/keys](https://openrouter.ai/keys)
2. Klicke auf **"Create Key"**
3. Gib ihm einen beschreibenden Namen wie "LingText"
4. Kopiere den generierten Key. Er beginnt mit `sk-or-...`

> ⚠️ **Bewahre diesen Key an einem sicheren Ort auf**. Er wird nur einmal
> angezeigt.

---

## Schritt 3: Guthaben hinzufuegen

OpenRouter arbeitet mit Prepaid-Guthaben. So laedst du es auf:

1. Gehe zu [openrouter.ai/credits](https://openrouter.ai/credits)
2. Klicke auf **"Add Credits"**
3. Waehle den Betrag aus, mindestens 5 USD
4. Schließe die Zahlung mit Karte ab

### Wie lange reicht das Guthaben?

Mit **5 USD** kannst du ungefaehr Folgendes machen:

| Modell            | Geschaetzte Uebersetzungen | Empfohlene Nutzung                  |
| ----------------- | -------------------------- | ----------------------------------- |
| Gemini Flash Lite | ~50,000+                   | Taeglicher Gebrauch, schnelle Uebersetzungen |
| Gemini 3.0        | ~5000                      | Wenn du mehr Praezision brauchst    |

**Empfehlung**: Nutze das mittlere Modell, also Gemini, fuer 95 % deiner
Uebersetzungen. Wechsle nur zu Gemini 3.0, wenn eine Uebersetzung keinen Sinn
ergibt oder du mehr Kontext brauchst.

---

## Schritt 4: In LingText einrichten

### In der Web-App

1. Oeffne [lingtext.de](https://lingtext.de)
2. Gehe zu einem beliebigen Text oder in den Reader
3. Klicke oben auf den Uebersetzer-Selector
4. Waehle **"🧠 Intelligent"** oder **"🚀 Very Intelligent"**
5. Fuege deinen API-Key in das angezeigte Feld ein
6. Fertig. Der Key wird automatisch gespeichert

### In der Chrome-Erweiterung

1. Klicke auf das LingText-Symbol in der Erweiterungsleiste
2. Waehle im Bereich **"Translator"** das gewuenschte Modell
3. Fuege deinen API-Key in das angezeigte Feld ein
4. Der Key wird gespeichert und mit der Web-App synchronisiert

---

## Verfuegbare Modelle

| Modell               | Geschwindigkeit | Qualitaet | Kosten pro Uebersetzung |
| -------------------- | --------------- | --------- | ----------------------- |
| ⚡ Chrome AI         | Sofort          | Einfach   | Kostenlos               |
| 🧠 Gemini Flash Lite | Schnell         | Gut       | ~$0.00001               |
| 🚀 Gemini 3.0 Flash  | Mittel          | Exzellent | ~$0.0003                |

### Welches solltest du waehlen?

- **Chrome AI**: Wenn du nur eine schnelle und einfache Uebersetzung brauchst
- **Gemini Flash Lite**: Fuer den taeglichen Gebrauch. Kontextbezogene
  Uebersetzungen zu fast keinen Kosten
- **Gemini 3.0 Flash**: Fuer schwierige Woerter, Redewendungen oder wenn dich
  Gemini nicht ueberzeugt

---

## Empfohlene Strategie

1. **Setze Gemini Flash Lite als Standard** - Es ist guenstig und reicht fuer
   95 % aller Faelle aus

2. **Wechsle nur bei Bedarf zu Gemini 3.0 Flash** - Wenn eine Uebersetzung
   keinen Sinn ergibt oder du mehr Beispiele brauchst

3. **Pruefe deinen Verbrauch monatlich** - Unter
   [openrouter.ai/activity](https://openrouter.ai/activity) kannst du sehen,
   wie viel du ausgegeben hast

4. **Lade nach, wenn du nur noch 1 USD uebrig hast** - So gehst du nie ganz
   ohne Guthaben aus

---

## Haeufige Fragen

### Ist es sicher, meinen API-Key einzutragen?

Ja. Dein Key wird lokal in deinem Browser gespeichert und geht nie ueber unsere
Server. Die Aufrufe an OpenRouter erfolgen direkt von deinem Geraet aus.

### Kann ich denselben Key in der Web-App und in der Erweiterung verwenden?

Ja. Wenn du die Erweiterung mit der Web-App synchronisierst, wird der API-Key
automatisch uebernommen.

### Was passiert, wenn mein Guthaben aufgebraucht ist?

LingText versucht dann, Chrome AI als Fallback zu verwenden. Wenn das nicht
verfuegbar ist, bekommst du eine Fehlermeldung mit dem Hinweis, Guthaben
nachzuladen.

### Kann ich stattdessen andere Anbieter wie OpenAI direkt nutzen?

Aktuell unterstuetzen wir nur OpenRouter. Es fungiert als Vermittler und gibt
dir mit einem einzigen API-Key Zugriff auf mehrere Modelle.

---

## Zusammenfassung

1. Erstelle ein Konto auf [openrouter.ai](https://openrouter.ai)
2. Erzeuge einen API-Key unter [openrouter.ai/keys](https://openrouter.ai/keys)
3. Lade Guthaben auf. 5 USD reichen bei normaler Nutzung mehrere Monate
4. Fuege den Key in LingText ein, egal ob Web-App oder Erweiterung
5. Nutze Gemini Flash Lite fuer den Alltag und Gemini 3.0 Flash fuer
   schwierige Faelle

Jetzt bist du bereit, mit intelligenten Uebersetzungen Englisch zu lernen! 🚀
