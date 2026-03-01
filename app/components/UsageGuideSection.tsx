import { Link } from "react-router";

export default function UsageGuideSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl"></div>
        <div className="absolute -bottom-24 right-1/3 h-96 w-96 rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header elegante */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Nutzungsanleitung
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            Starte in <span className="text-indigo-600 dark:text-indigo-400">Minuten</span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-400 max-w-4xl mx-auto font-light">
            LingText ist fur Lernen im Flow gebaut. Folge diesen Schritten und du startest sofort mit Englisch.
          </p>
        </div>

        {/* Guide steps */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  📚 Erstelle deine Bibliothek
                  <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    Erster Schritt
                  </span>
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Von der Startseite aus kannst du einen neuen Text anlegen: Titel setzen, Inhalt einfugen oder eine <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">.txt</code>-Datei importieren. Falls du Audio hast, kannst du es per URL oder als lokale Datei anhangen.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    💡 <strong>Tip:</strong> Starte mit Texten, die dich wirklich interessieren. Motivation ist entscheidend fur effektives Lernen..
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  📖 Lies mit Übersetzung und TTS
                  <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    Aktives Lesen
                  </span>
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Offne den Reader und klicke auf ein Wort fur sofortige Ubersetzung. Du kannst auch ganze Phrasen markieren. Nutze das Sound-Symbol fur TTS und passe Stimme oder Tempo in den Einstellungen an.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    🎯 <strong>Ziel:</strong> Jede Seite in eine aktive Lerneinheit verwandeln, ohne den Lesefluss zu unterbrechen..
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  💾 Worter speichern und wiederholen
                  <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    Wortschatz
                  </span>
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Wenn ein Wort neu ist, markiere es als <em className="font-semibold text-indigo-600 dark:text-indigo-400">unbekannt</em>. Es wird in SQLite gespeichert, inklusive Ubersetzung und Spaced-Repetition-Daten. In <strong>/review</strong> wiederholst du mit SM-2 oder exportierst als CSV fur Anki.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    🔄 <strong>Spaced Repetition:</strong> Der SM-2-Algorithmus berechnet den optimalen Zeitpunkt fur jede Wiederholung..
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  💾 Daten exportieren
                  <span className="ml-3 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    Sicherung
                  </span>
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In der Bibliothek kannst du mit{" "}
                  <em className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Exportieren
                  </em>{" "}
                  und{" "}
                  <em className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Importieren
                  </em>{" "}
                  deine SQLite-Datenbank auf dem PC sichern oder von einem
                  anderen Gerat wiederherstellen. Deine Daten gehoren dir.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    🔒 <strong>Datenschutz:</strong> Alles wird lokal gespeichert. Die .sqlite-Datei ist portabel und standardisiert.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  ✨ Personliche Stories erzeugen
                  <span className="ml-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    Kontextpraxis
                  </span>
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In der Sektion <strong>Wörter</strong> kannst du bis zu{" "}
                  <em className="font-semibold text-indigo-600 dark:text-indigo-400">
                    20 Wörter
                  </em>{" "}
                  aus deinem Wortschatz auswählen und mit dem Generator
                  personalisierte Texte erstellen. Wähle den Typ (Kurzgeschichte,
                  Artikel, Gespräch usw.), ein Thema und das CEFR-Niveau
                  (A2-C2). Die KI erzeugt Texte mit deinen Wörtern in
                  <strong> bold</strong> und stärkt so das Lernen im Kontext.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    💡 <strong>Tip:</strong> Generierte Texte werden automatisch in deiner Bibliothek gespeichert. Du kannst sie mit allen Reader-Funktionen nutzen (Ubersetzung, TTS, Markierung). Das 20-Worter-Limit sorgt fur naturlichere Ergebnisse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional help section */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">❓</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Brauchst du Hilfe?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Sieh dir die komplette Dokumentation an oder tritt unserer Lerncommunity bei.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md">
                📖 Dokumentation ansehen
              </button>
              <Link
                to="/gemeinschaft"
                className="px-8 py-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                💬 Gemeinschaft
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
