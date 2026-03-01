import type { Route } from "./+types/home";
import Library from "~/components/Libary";
import HeroSection from "~/components/HeroSection";
import LevelSelector from "~/components/LevelSelector";
import PurposeSection from "~/components/PurposeSection";
import UsageGuideSection from "~/components/UsageGuideSection";
import TechAndPrivacySection from "~/components/TechAndPrivacySection";
import ContactCTA from "~/components/ContactCTA";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kostenlose Alternative zu LingQ | LingText" },
    {
      name: "description",
      content:
        "LingText ist eine kostenlose Alternative zu LingQ, mit der du Englisch durch lokale Texte oder URLs lernst, inklusive Sofortuebersetzung, TTS und Wiederholung.",
    },
  ];
}

export const links: Route.LinksFunction = () => [
  {
    rel: "canonical",
    href: "https://lingtext.de",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <LevelSelector />
      <Library />
      <PurposeSection />
      <UsageGuideSection />
      <TechAndPrivacySection />
      <ContactCTA />
    </>
  );
}
