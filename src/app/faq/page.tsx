import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/lib/site";
import { FaqList } from "@/components/FaqList";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur le personal shopping, le fret aérien et le suivi de colis Adhilix entre l'Europe et la RDC.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">
            FAQ
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Questions fréquentes
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Tout ce qu&apos;il faut savoir avant de commander avec Adhilix. Une autre question ?
            Notre équipe vous répond sur WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={FAQS} />
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-bg-inverse p-8 text-fg-inverse sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">Vous avez encore une question ?</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-inverse-muted">
            Envoyez-nous un message, nous vous répondrons rapidement avec une réponse claire.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.whatsappLink("Bonjour Adhilix, j'ai une question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
            >
              <WhatsAppIcon className="size-4" />
              Nous écrire sur WhatsApp
            </a>
            <Link
              href="/suivi"
              className="inline-flex items-center justify-center rounded-full border border-line-inverse px-6 py-3.5 text-sm font-semibold text-fg-inverse transition hover:bg-white/5"
            >
              Suivre mon colis
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
