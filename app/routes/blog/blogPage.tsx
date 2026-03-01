import type { Route } from "../+types/blogPage";
import { allBlogs } from "~/lib/content/runtime";
import { Link } from "react-router";

export function loader() {
  return allBlogs;
}

export function meta() {
  return [
    {
      title:
        "Englisch-Lernblog: Strategien und Ressourcen | LingText",
    },
    {
      name: "description",
      content:
        "Verbessere dein Englisch mit LingText. Artikel zu Lernstrategien, Wortschatz im Kontext, praktischer Grammatik und klaren Tipps.",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://lingtext.de/blog`,
    },
  ];
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const blogs = loaderData;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-16 sm:py-24 border-b border-gray-200 dark:border-gray-800">
        {/* Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-sky-500/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
            Blog fur Englischlernen
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Entdecke Strategien, kostenlose Ressourcen und praktische Tipps, um dein Englischverstehen und deine Sprachflussigkeit gezielt zu verbessern.
          </p>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any) => (
              <article
                key={blog.slug}
                className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition duration-200"
              >
                <Link
                  to={`/blog/${blog.slug}`}
                  className="flex flex-col h-full p-6 sm:p-8"
                >
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {blog.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6">
                      {blog.metaDescription}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Mehr lesen
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Sections */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Warum dem LingText-Blog folgen?
            </h2>
            <div className="space-y-12">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Lernen mit realen Inhalten
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir glauben, dass der beste Weg zu Englisch über Immersion in relevante Inhalte führt. Unser Blog ergänzt das mit Guides zu Texten, Videos und KI-Tools fur schnelleres Lernen.
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Spaced-Repetition-Strategien
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Es geht nicht nur ums Lesen, sondern ums Behalten. Wir zeigen, wie du SM-2 auf deinen Alltagsschatz anwendest, damit neue Worter langfristig sitzen.
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Technologie und Linguistik
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Wir zeigen dir, wie Technologie dein starkster Partner auf dem Weg zur Sprachflussigkeit wird.
                </p>
              </div>
            </div>

            {/* Final CTA-like SEO block */}
            <div className="mt-20 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Bring dein Englisch aufs nachste Level
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                LingText ist nicht nur ein Blog, sondern ein komplettes Lernwerkzeug. Viele Lernende verbessern bereits Lese- und Horverstehen damit.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                Kostenlos starten
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} LingText. Dein Begleiter beim Sprachenlernen.
        </p>
      </footer>
    </main>
  );
}
