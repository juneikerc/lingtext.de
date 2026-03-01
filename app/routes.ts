import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("texts/:id", "routes/texts/text.tsx"),
  route("words", "routes/words.tsx"),
  route("review", "routes/review.tsx"),
  route("kontakt", "routes/contact.tsx"),
  route("levels/:level", "routes/levels/level.tsx"),
  route("blog", "routes/blog/blogPage.tsx"),
  route("blog/:slug", "routes/blog/blog.tsx"),
  route("gemeinschaft", "routes/community.tsx"),
  route("1000-englische-saetze", "routes/english-phrases.tsx"),
  route("500-englische-woerter", "routes/english-words-500.tsx"),
  route("englisch-lernen-mit-liedern", "routes/songs/songs.tsx"),
  route("englisch-lernen-mit-liedern/:id", "routes/songs/song.tsx"),
  route("lernen-mit-language-island", "routes/language-island/islands.tsx"),
  route(
    "lernen-mit-language-island/:id",
    "routes/language-island/island.tsx"
  ),
] satisfies RouteConfig;
