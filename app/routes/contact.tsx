import type { Route } from "./+types/contact";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kontakt | LingText" },
    {
      name: "description",
      content:
        "Hast du Fragen zur Nutzung von LingText? Schreib mir und ich helfe dir, das Beste aus deinem Englischlernen herauszuholen.",
    },
  ];
}

export default function Contact() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-white dark:bg-gray-950">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-500/10 dark:bg-sky-400/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-400/3 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Immer erreichbar
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            <span className="text-indigo-600 dark:text-indigo-400">
              Lass uns sprechen
            </span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Sprachenlernen kann manchmal verwirrend sein. Wenn du Fragen zu LingText hast, helfe ich dir gern.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Welcome section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Wie kann ich dir helfen?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                Ich weiß, wie frustrierend es ist, trotz Motivation festzustecken. Deshalb gilt: Jede Frage ist legitim, auch wenn sie klein wirkt.
              </p>
              <p>
                Vielleicht weißt du nicht, wie man einen neuen Text hinzufugt, oder du willst besser verstehen, wie Spaced Repetition funktioniert. Vielleicht ladt Audio nicht richtig, oder du suchst einfach einen effizienteren Workflow. Schreib mir in jedem Fall.
              </p>
              <p>
                LingText ist ein Herzensprojekt, und dein Feedback hilft mir, es besser zu machen. Jede Frage zeigt mir, welche Teile klarer und intuitiver werden mussen.
              </p>
            </div>
          </div>

          {/* Contact card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Icono de correo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
              </div>

              {/* Contact info */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Schreib mir direkt
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ich beantworte alle E-Mails personlich, in der Regel in weniger als 24 Stunden.
                </p>
                <a
                  href="mailto:juneikerc@gmail.com"
                  className="inline-flex items-center gap-2 text-xl font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 rounded-md"
                >
                  juneikerc@gmail.com
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* About me section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Ein paar Worte uber mich
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                Ich bin <span className="font-semibold text-indigo-600 dark:text-indigo-400">Juneiker</span>, Webentwickler und die Person hinter LingText. Ich habe das Tool gebaut, weil ich selbst nach kostenlosen Lern-Apps gesucht habe, die Privatsphare respektieren und eigenes Material erlauben.
              </p>
              <p>
                Ich glaube fest an Lernen durch Lesen - so habe ich Englisch gelernt. Deshalb entstand LingText als <span className="font-semibold text-indigo-600 dark:text-indigo-400">local-first</span> App, bei der deine Daten dir gehoren und Lernen ohne Unterbrechungen funktioniert.
              </p>
              <p>
                Wenn du mehr uber meine Arbeit sehen willst, besuche meine Website:
              </p>
              <a
                href="https://juneikerc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                juneikerc.com
              </a>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Bevor du schreibst, hilft dir vielleicht das hier
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Wie fige ich einen neuen Text hinzu?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Auf der Startseite findest du in der Bibliothek den Button zum Hinzufugen von Texten. Du kannst Inhalt direkt einfugen oder eine .txt-Datei importieren.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Sind meine Daten sicher?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ja. Alles wird lokal im Browser mit SQLite gespeichert. An externe Server werden nur die zu ubersetzenden Worter gesendet.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Kann ich LingText mobil nutzen?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ja, die App ist responsiv. Einige Funktionen wie lokales Audio laufen auf Desktop-Chrome am besten.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Wie funktioniert Spaced Repetition?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  LingText nutzt den SM-2-Algorithmus. Als unbekannt markierte Worter erscheinen in Wiederholungen mit fur dein Gedachtnis optimierten Intervallen.
                </p>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center pt-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Noch Fragen? Dann schreib mir direkt.
            </p>
            <a
              href="mailto:juneikerc@gmail.com?subject=Frage%20zu%20LingText"
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                <path d="m21.854 2.147-10.94 10.939"></path>
              </svg>
              Schick mir eine E-Mail
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              juneikerc@gmail.com
            </p>
          </div>

          {/* Link de regreso */}
          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Zuruck zur Bibliothek
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
