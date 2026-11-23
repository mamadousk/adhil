"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function CtaBanner() {
  const { t } = useLang();
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-bg-inverse px-7 py-10 text-fg-inverse sm:px-10 sm:py-14 md:px-14">
            <div className="absolute inset-0 grid-fade opacity-30" aria-hidden="true" />
            <div className="animate-drift absolute -top-20 right-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-medium tracking-[0.25em] text-accent uppercase">{t("section.cta.kicker")}</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("section.cta.title")}</h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-inverse-muted sm:text-lg">
                  Envoyez-nous le lien ou la photo de l&apos;article souhaité. Notre équipe vous répond sur WhatsApp avec un devis clair.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={SITE.whatsappLink("Bonjour Adhilix, voici l'article que je souhaite commander.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
                    <WhatsAppIcon className="size-4" />
                    Discuter avec notre équipe
                  </a>
                  <Link href="/suivi" className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-7 py-4 text-sm font-semibold text-fg-inverse transition hover:bg-white/5">
                    Suivre un colis
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-line-inverse bg-white/[0.03] p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-accent">
                  <FileText className="size-4" />
                  <p className="font-mono text-xs tracking-[0.2em] uppercase">Information préalable à la commande</p>
                </div>
                <p className="mt-4 font-display text-base font-semibold text-fg-inverse">Votre commande est effectuée sur demande.</p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-fg-inverse-muted">
                  <p>Adhilix organise l&apos;achat de votre article auprès d&apos;un fournisseur européen. Votre commande est lancée après validation du devis et confirmation du paiement.</p>
                  <p>Une fois l&apos;article commandé, toute modification dépend de l&apos;acceptation du fournisseur et des conditions qu&apos;il applique. Les changements d&apos;avis ne sont pas automatiquement acceptés après expiration des délais légaux de rétractation.</p>
                  <p>Les droits légaux en matière de rétractation, de défaut et de non-conformité restent préservés.</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                  <Link href="/cgv" className="text-accent transition hover:text-accent-strong">Consulter les CGV / CGS</Link>
                  <Link href="/commandes-retours" className="text-accent transition hover:text-accent-strong">Politique de commande et de retour</Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
