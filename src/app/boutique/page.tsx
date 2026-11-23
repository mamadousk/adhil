import type { Metadata } from "next";
import { Bell, ShoppingBag, Sparkles } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "La boutique Adhilix arrive bientôt. Découvrez le compte à rebours avant l'ouverture le 1er janvier.",
  alternates: { canonical: "/boutique" },
};

const TARGET_DATE = "2027-01-01T00:00:00+01:00";

const teasers = [
  {
    icon: ShoppingBag,
    title: "Sélection premium",
    description:
      "Sneakers, streetwear et pièces luxe sélectionnées avec le même niveau d'exigence Adhilix.",
  },
  {
    icon: Sparkles,
    title: "Drops & nouveautés",
    description:
      "Des produits recherchés, des éditions limitées et des arrivages pensés pour la RDC.",
  },
  {
    icon: Bell,
    title: "Soyez informé",
    description:
      "Contactez-nous sur WhatsApp pour être prévenu dès l'ouverture de la boutique.",
  },
];

export default function BoutiquePage() {
  return (
    <main className="relative overflow-hidden bg-bg-inverse pt-32 pb-24 text-fg-inverse md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-fade opacity-40" aria-hidden="true" />
      <div className="animate-drift absolute -top-24 left-[-10%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
      <div className="animate-drift-reverse absolute top-1/3 right-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="container-shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-inverse bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fg-inverse-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
            BOUTIQUE ADHILIX
          </div>

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl">
            La boutique arrive <span className="text-accent">bientôt.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-fg-inverse-muted sm:text-lg">
            Nous préparons une nouvelle expérience Adhilix. La boutique en ligne ouvre ses portes
            le <span className="font-semibold text-fg-inverse">1er janvier 2027</span>. En attendant,
            le compte à rebours est lancé.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <Countdown target={TARGET_DATE} />
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {teasers.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-line-inverse bg-white/[0.02] p-6 text-left transition hover:bg-white/[0.04]"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-inverse-muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SITE.whatsappLink(
              "Bonjour Adhilix, je souhaite être informé de l'ouverture de la boutique.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4" />
            Être informé sur WhatsApp
          </a>
          <a
            href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-7 py-4 text-sm font-semibold text-fg-inverse transition hover:bg-white/5"
          >
            Commander en attendant
          </a>
        </div>
      </div>
    </main>
  );
}
