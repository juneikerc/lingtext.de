import { Link } from "react-router";
import type { Route } from "./+types/songs";
import SongsManualManager from "~/components/songs/SongsManualManager";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Englisch lernen mit Liedern | Lyrics + YouTube und Spotify | LingText",
    },
    {
      name: "description",
      content:
        "Lerne Englisch mit Liedern, indem du Lyrics und YouTube- oder Spotify-Links hinzufügst. Trainiere echtes Vokabular, Verstehen und Kontext-Ubersetzung mit LingText.",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  {
    rel: "canonical",
    href: "https://lingtext.de/englisch-lernen-mit-liedern",
  },
];

const HOW_TO_STEPS = [
  {
    title: "1. Englisches Lied hinzufugen",
    description:
      "Fuge Titel, Lyrics und einen YouTube- oder Spotify-Link ein, um deine personalisierte Ubung zu speichern.",
  },
  {
    title: "2. Interaktiven Reader offnen",
    description:
      "Offne den Song und spiele das eingebettete Audio ab, wahrend du parallel den kompletten Text liest.",
  },
  {
    title: "3. Ubersetzen und Vokabeln speichern",
    description:
      "Klicke auf Worter oder Phrasen, um sie zu ubersetzen und als aktives Wiederholungsmaterial zu speichern.",
  },
];

const BENEFITS = [
  {
    title: "Echtes, naturliches Englisch",
    description:
      "Lieder zeigen Strukturen, Wortschatz und Aussprache, die wirklich in echten Gesprachen vorkommen.",
  },
  {
    title: "Besseres Behalten durch Wiederholung",
    description:
      "Musik hilft dir, komplette Satze und grammatische Muster durch Rhythmus und Wiederholung besser zu behalten.",
  },
  {
    title: "Lernen im Kontext",
    description:
      "Du lernst nicht isolierte Worter, sondern verstehst Ausdrucke innerhalb einer Geschichte und Absicht.",
  },
  {
    title: "Einfacher Lernfluss",
    description:
      "Auf einem Bildschirm hast du Lyrics, eingebettetes Audio und Sofort-Ubersetzung fur reibungsloses Lernen.",
  },
];

const FAQS = [
  {
    question: "Welche Links konnen verwendet werden?",
    answer:
      "Das Tool akzeptiert gultige YouTube- und Spotify-Links. Das Format wird automatisch normalisiert, um Einbettung zu versuchen.",
  },
  {
    question: "Kann ich Lyrics jedes Niveaus verwenden?",
    answer:
      "Ja. Du kannst mit langsamen Liedern und haufigem Wortschatz beginnen und danach zu komplexeren Texten wechseln.",
  },
  {
    question: "Was mache ich, wenn ein Embed nicht abspielbar ist?",
    answer:
      "Manche Inhalte blockieren eingebettete Wiedergabe wegen Anbieter-Richtlinien. Offne dann die Originalquelle oder nutze einen anderen Link.",
  },
  {
    question: "Warum funktioniert Englischlernen mit Liedern?",
    answer:
      "Weil es verstandlichen Input, naturliche Wiederholung, Emotion und Kontext kombiniert. So verbesserst du Verstehen und Vokabular effizient.",
  },
];

export default function SongsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden py-16 px-4 md:py-24 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[18%] left-[12%] w-72 h-72 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[15%] right-[10%] w-72 h-72 bg-sky-500/10 dark:bg-sky-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Praktische Lernmethode mit Musik
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
            Englisch lernen mit Liedern: Lyrics, Kontext und echte Praxis
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Nutze englische Lieder, um Wortschatz, Verstehen und Aussprache zu
            verbessern: Lyrics einfugen, YouTube- oder Spotify-Link setzen und
            Kontext-Ubersetzung direkt im LingText-Reader uben.
          </p>

          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Dieses Tool ist dafur gemacht, mit Inhalten zu lernen, die du
            ohnehin magst, naturliche Wiederholung zu nutzen und jedes Lied in
            eine effektive Lerneinheit zu verwandeln.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#lied-manuell-hinzufuegen"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Mein erstes Lied hinzufugen
            </a>
            <a
              href="#faq-lieder"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Haufige Fragen
            </a>
          </div>
        </div>
      </section>

      <SongsManualManager />

      <section className="relative overflow-hidden py-16 sm:py-20 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              So nutzt du das Tool
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Deine Routine in 3 Schritten
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
              Folge diesem Ablauf und verwandle jedes Lied in eine fokussierte
              Lese- und Vokabeleinheit mit messbarem Fortschritt.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_STEPS.map((step) => (
              <article
                key={step.title}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6"
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

      <section className="relative overflow-hidden py-16 sm:py-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              Zentrale Vorteile
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Vorteile beim Lernen mit Songtexten
            </h2>
          </header>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6"
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

      <section className="relative overflow-hidden py-16 sm:py-20 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-5xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              Praktische Empfehlungen
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Welche Songs bringen dich schneller voran
            </h2>
          </header>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              Fur kontinuierlichen Fortschritt starte mit moderatem Tempo,
              wiederholten Phrasen und klarer Aussprache. So erkennst du
              Strukturen und haufige Ausdrucke leichter.
            </p>
            <p>
              Auf Basis- oder Mittelstufe eignen sich Pop, akustische Songs
              oder Balladen mit einfacher Erzahlstruktur. Fortgeschrittene
              konnen Rap, Indie oder metaphorische Lyrics nutzen.
            </p>
            <p>
              Entscheidend ist nicht die Anfangskomplexitat, sondern
              Konsequenz. Arbeite jeden Song in kurzen Zyklen: Horen, Lesen,
              Ubersetzen, Wortschatz wiederholen.
            </p>
          </div>
        </div>
      </section>

      <section
        id="faq-lieder"
        className="relative overflow-hidden py-16 sm:py-20 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="mx-auto max-w-5xl px-6">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Haufige Fragen zum Englischlernen mit Liedern
            </h2>
          </header>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-gray-900 dark:text-gray-100">
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

      <section className="relative overflow-hidden py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Mach aus deiner Lieblingsmusik eine Englischroutine
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Starte heute mit einem Song, den du schon kennst, und nutze ihn fur
            Lesen, Verstehen und Wortschatz in einem einzigen Lernfluss.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#lied-manuell-hinzufuegen"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Jetzt starten
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
