export default function TechAndPrivacySection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Technologie & Datenschutz
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            Performance und{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Sicherheit
            </span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-400 max-w-4xl mx-auto font-light">
            Moderne Technik, die deine Privatsphare respektiert und dein Lernen
            beschleunigt.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                LingText
              </span>{" "}
              nutzt einen modernen Stack fur schnelle Entwicklung und stabile
              Produktion: React Router SSR, Vite, Tailwind und leichtgewichtigen
              Zustand mit Zustand.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              Wir arbeiten{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                local-first mit Datenhoheit
              </span>
              . Deine Texte, Audio-Daten und Vokabeln liegen lokal in SQLite im
              Browser. Bei Remote-Ubersetzung wird nur der ausgewahlte Begriff
              gesendet, nie dein kompletter Inhalt.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Moderne Architektur
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              React Router 7 mit SSR, Vite als Toolchain und Tailwind fur
              konsistente UI. Bei Bedarf wird OpenRouter fur Ubersetzungen
              angebunden.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                SSR fur bessere SEO
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Schnelles Reloading im Development
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Browsernahe APIs
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Deine Daten, deine Kontrolle
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              SQLite im Browser, Export und Import bei Bedarf, keine zentrale
              Datensammlung fur deine Bibliothek.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                SQLite WASM + OPFS
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Export/Import als .sqlite
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Portabel zwischen Geraeten
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">🎵</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Audio und Berechtigungen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Fur lokale Audiodateien fragt der Browser nach Rechten. Wenn
              Berechtigungen ablaufen, kannst du sie im Reader schnell erneut
              freigeben.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Intelligentes Rechte-Handling
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Automatische Speicherbereinigung
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Re-Autorisierung ohne Kontextverlust
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Optimierte Laufzeit
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Leichte Tokenisierung, performante Popups und gezieltes Lazy
              Loading halten die App wahrend des Lesens schnell und reaktionsstark.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Leichte und responsive UI
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Intelligentes Lazy Loading
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Wenige externe Abhangigkeiten
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Datenschutz zuerst
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              LingText wird mit dem klaren Ziel entwickelt, deine Daten zu
              schutzen und deine Privatsphare dauerhaft zu respektieren.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                💾 Lokales SQLite
              </span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                📤 Export auf PC
              </span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                🔄 Portabel
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
