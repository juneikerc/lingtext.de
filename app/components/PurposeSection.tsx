import React from "react";

export default function PurposeSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Unsere Philosophie
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            Lerne{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              durch Lesen
            </span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-400 max-w-4xl mx-auto font-light">
            Der beste Weg zu dauerhaftem Wortschatz ist viel Lesen, im Kontext
            und mit moeglichst wenig Reibung
          </p>
        </div>

        {/* Main content */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                LingText
              </span>{" "}
              basiert auf einer einfachen Idee: Der beste Weg zu dauerhaftem
              Wortschatz ist viel Lesen, im Kontext und mit moeglichst wenig
              Reibung. Die App verkuerzt die Zeit zwischen dem Entdecken eines
              unbekannten Wortes und dem Verstehen, damit der Lesefluss ohne
              lange Unterbrechungen weitergeht.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              Der Reader bietet sofortige Uebersetzung von Woertern oder
              Fragmenten, Aussprache mit TTS, Speicherung von Begriffen und ein{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Spaced-Repetition-System
              </span>{" "}
              fuer optimales Wiederholen. In der Bibliothek kannst du eigene
              Texte hinzufuegen, Audio verlinken oder anhaengen und deinen
              Fortschritt organisieren. Alles mit einer{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                local‑first
              </span>
              Philosophie: Deine Daten liegen in einer SQLite-Datenbank in
              deinem Browser und koennen jederzeit auf den PC exportiert werden.
            </p>
          </div>
        </div>

        {/* Core features */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200 p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">📖</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Aktives Lesen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Verwandle jede Seite in eine Lerneinheit: Klicke ein Wort an,
              uebersetze es, hoere es an und fuege es deiner Wiederholungsliste
              hinzu, ohne den Faden zu verlieren.
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200 p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">💾</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Deine Daten, deine Kontrolle
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Alles wird in SQLite in deinem Browser gespeichert. Exportiere
              deine Datenbank jederzeit auf deinen PC und nimm sie auf ein
              anderes Geraet mit.
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-200 p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">🌱</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Spaced Repetition
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Integrierter SM-2-Algorithmus fuer Wiederholungen zum optimalen
              Zeitpunkt. Du kannst ausserdem CSV fuer Anki exportieren.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Bereit zu starten?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Schliesse dich Hunderten Lernenden an, die mit LingText bereits
              effektiver Englisch lernen
            </p>
            <a
              href="#levels"
              className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              🚀 Jetzt starten
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
