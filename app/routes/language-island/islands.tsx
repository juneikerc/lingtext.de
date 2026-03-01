import { Link } from "react-router";

import LanguageIslandsManualManager from "~/components/language-islands/LanguageIslandsManualManager";

import type { Route } from "./+types/islands";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Language Island fur Englisch | Lernen mit Satzen | LingText",
    },
    {
      name: "description",
      content:
        "Erstelle Language Islands mit realen Satzen und lerne Englisch mit Kontext-Ubersetzung und Audio pro Satz in LingText.",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  {
    rel: "canonical",
    href: "https://lingtext.de/lernen-mit-language-island",
  },
];

const HOW_TO_STEPS = [
  {
    title: "1. Insel mit klarem Ziel erstellen",
    description:
      "Wahle ein konkretes Thema wie Arbeit, Reisen, Interviews oder Alltag, um nutzbare Sprache fokussiert zu uben.",
  },
  {
    title: "2. Einen Satz pro Zeile schreiben",
    description:
      "Fuge deine englischen Satze in den Editor ein. Jede Zeile wird zu einer eigenen Ubungseinheit.",
  },
  {
    title: "3. Mit Ubersetzung und Audio lernen",
    description:
      "Offne die Insel und arbeite Satz fur Satz mit Inline-Ubersetzung und TTS, um Verstehen und Aussprache zu verbessern.",
  },
];

const BENEFITS = [
  {
    title: "Kontextnahes Lernen",
    description:
      "Du lernst genau die Satztypen, die du im Alltag brauchst, statt generischer Beispiele ohne Kontext.",
  },
  {
    title: "Messbarer Fortschritt in Blöcken",
    description:
      "Jeder Satz ist eine Mini-Aufgabe. Du erkennst schnell, welche Strukturen noch Ubung brauchen.",
  },
  {
    title: "Bessere Muster-Speicherung",
    description:
      "Durch Wiederholung ganzer Satze verinnerlichst du Grammatik und Kollokationen statt isolierter Worter.",
  },
  {
    title: "Einfacher, reibungsloser Ablauf",
    description:
      "Auf einem Bildschirm hast du Satze, Klick-Ubersetzung und TTS. Weniger Schritte, mehr effektive Praxis.",
  },
];

const FAQS = [
  {
    question: "Was ist eine Language Island genau?",
    answer:
      "Ein kurzes Set an Satzen in einem bestimmten Kontext. So trainierst du Sprache mit hohem Kommunikationswert fur reale Situationen.",
  },
  {
    question: "Wie viele Satze sollte eine Insel haben?",
    answer:
      "Starte mit 5 bis 15 Satzen. Wichtig ist, dass sie haufig, nutzlich und regelmassig wiederholbar sind.",
  },
  {
    question: "Kann ich eine Insel nach dem Speichern bearbeiten?",
    answer:
      "Ja. Titel und Satze lassen sich jederzeit in der Inselbibliothek bearbeiten.",
  },
  {
    question: "Kann ich damit auch Aussprache trainieren?",
    answer:
      "Ja. In jeder Insel kannst du pro Satz TTS-Audio abspielen und Rhythmus sowie Intonation uben.",
  },
];

export default function LanguageIslandsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-200 bg-white px-4 py-16 dark:border-gray-800 dark:bg-gray-950 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/5"></div>
          <div className="absolute bottom-[15%] right-[10%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/5"></div>
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
            Methode mit Mikro-Kontexten
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            Language Island: Englisch Satz fur Satz lernen
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
            Erstelle eigene Inseln mit Satzen aus realen Situationen und
            trainiere Verstehen, Ubersetzung und Aussprache in einem klaren
            Ablauf, der dir zu naturlicherem Sprechen hilft.
          </p>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Jeder Satz wird zu einer eigenen Ubungseinheit. Ideal, um haufige
            Strukturen zu festigen und schneller im funktionalen Englisch
            voranzukommen.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#insel-manuell-erstellen"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Meine erste Insel erstellen
            </a>
            <a
              href="#faq-language-island"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
            >
              FAQ ansehen
            </a>
          </div>
        </div>
      </section>

      <LanguageIslandsManualManager />

      <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              So nutzt du Language Island
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Lernroutine in 3 Schritten
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              Nutze einen kurzen, wiederholbaren Zyklus, um Satze in aktives
              Wissen und echte Sprachproduktion zu uberfuhren.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_TO_STEPS.map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-950 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              Zentrale Vorteile
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Warum Lernen mit Language Islands funktioniert
            </h2>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              Lernstrategie
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              So baust du hochwirksame Inseln
            </h2>
          </header>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Baue Inseln nach Situationen: sich vorstellen, um Hilfe bitten,
              verhandeln, ein Problem erklaren oder Small Talk fuhren. Klare
              Themen verbessern Behalten und Transfer.
            </p>
            <p>
              Halte Satze anfangs kurz und funktional. Erweitere danach mit
              Zeitformen, Hoflichkeitsnuancen und Konnektoren, ohne Klarheit zu
              verlieren.
            </p>
            <p>
              Wiederhole jede Insel in kurzen Zyklen: lesen, ubersetzen, horen,
              laut nachsprechen, am nachsten Tag wiederholen. Konstanz ist
              wichtiger als Menge.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/englisch-lernen-mit-liedern"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
            >
              Ich mochte auch mit Liedern uben
            </Link>
          </div>
        </div>
      </section>

      <section
        id="faq-language-island"
        className="relative overflow-hidden border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-950 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Haufige Fragen zu Language Islands
            </h2>
          </header>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <summary className="list-none cursor-pointer text-base font-semibold text-gray-900 dark:text-gray-100">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
