import { useEffect, useState } from "react";
import { Link } from "react-router";

import ProseContent from "~/components/ProseContent";
import { formatSlug } from "~/helpers/formatSlug";
import { getLevelTextByLevel, getTextsByLevel } from "~/lib/content/runtime";
import { type TextCollection } from "~/types";
import { getVisitedCollectionTextIds } from "~/utils/visited-collection-texts";

import type { Route } from "../+types/level";

export function loader({ params }: Route.LoaderArgs) {
  const level = params.level;
  const levelText = getLevelTextByLevel(level ?? "");
  if (!levelText) {
    throw new Response("Not Found", { status: 404 });
  }
  const texts = getTextsByLevel(level ?? "") as TextCollection[];
  return { levelText, texts };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { levelText } = loaderData;
  return [
    {
      title: levelText.title,
    },
    {
      name: "description",
      content: levelText.metaDescription,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://lingtext.de/levels/${levelText.level.toLowerCase()}`,
    },
  ];
}

export default function Level({ loaderData }: Route.ComponentProps) {
  const texts = loaderData.texts;
  const levelText = loaderData.levelText;
  const [visitedTextIds, setVisitedTextIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisitedTextIds(getVisitedCollectionTextIds());
  }, []);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-24 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-sky-500/10 dark:bg-sky-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zur Startseite
            </a>
          </nav>

          <div className="inline-flex items-center px-3 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800">
            Niveau {levelText.level}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {levelText.mainHeading}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            {levelText.intro}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Texte dieses Niveaus
            </h2>
          </div>

          <div className="grid gap-6">
            {texts.map((text: TextCollection) => {
              const textId = formatSlug(text.title);
              const isVisited = visitedTextIds.has(textId);

              return (
                <Link
                  key={text.title}
                  to={`/texts/${textId}?source=collection`}
                  className={`group rounded-2xl border shadow-sm transition duration-200 overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-950 ${
                    isVisited
                      ? "bg-gray-100 border-gray-200 hover:border-gray-300 hover:shadow-md dark:bg-gray-900/70 dark:border-gray-800 dark:hover:border-gray-700"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700"
                  }`}
                  rel="nofollow"
                >
                  <div className="p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <h3
                          className={`text-xl font-bold transition-colors duration-200 ${
                            isVisited
                              ? "text-gray-800 group-hover:text-indigo-600 dark:text-gray-200 dark:group-hover:text-indigo-400"
                              : "text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400"
                          }`}
                        >
                          {text.title}
                        </h3>
                        {isVisited ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Besucht
                          </span>
                        ) : null}
                        {text.sound ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5L6 9H3v6h3l5 4V5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.5 8.5a5 5 0 010 7"
                              />
                            </svg>
                            Audio
                          </span>
                        ) : null}
                      </div>
                      <span
                        className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors duration-200 ${
                          isVisited
                            ? "bg-gray-200 text-gray-700 group-hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:group-hover:bg-gray-700"
                            : "bg-indigo-600 text-white group-hover:bg-indigo-700 dark:group-hover:bg-indigo-500"
                        }`}
                      >
                        Jetzt lesen
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProseContent html={levelText.html} />
        </div>
      </section>
    </>
  );
}
