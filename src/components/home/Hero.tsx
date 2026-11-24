"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Plane, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";
import { useLang } from "@/components/LanguageProvider";

const statKeys = ["hero.stat1.label", "hero.stat2.label", "hero.stat3.label", "hero.stat4.label"];
const statValues = ["100%", "6", "FR · BE", "WhatsApp"];

export function Hero() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-bg-inverse pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="absolute inset-0 grid-fade opacity-50" aria-hidden="true" />

      <div className="animate-drift absolute -top-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="animate-drift-reverse absolute top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="animate-pulse-soft absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute top-1/2 right-[8%] hidden -translate-y-1/2 lg:block" aria-hidden="true">
        <div className="relative size-[420px]">
          <div className="animate-orbit absolute inset-0 rounded-full border border-accent/20">
            <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(242,138,69,0.9)]" />
          </div>
          <div className="animate-orbit-reverse absolute inset-12 rounded-full border border-accent/15">
            <span className="absolute bottom-6 right-6 size-2 rounded-full bg-accent/60" />
          </div>
          <div className="absolute inset-24 rounded-full border border-accent/10 bg-accent/[0.03]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass rounded-3xl p-6 text-fg-inverse shadow-[0_20px_60px_rgba(112,71,44,0.12)]">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-ink">
                  <Plane className="size-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{t("hero.card.title")}</p>
                  <p className="text-xs text-fg-inverse-muted">{t("hero.card.sub")}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { icon: ShieldCheck, text: "Contrôle d'authenticité" },
                  { icon: MapPin, text: "Livraison à Kinshasa" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-fg-inverse-muted">
                    <Icon className="size-3.5 text-accent-text" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-accent/10 px-4 py-3">
                <p className="font-mono text-[11px] tracking-wider text-fg-inverse-muted">{t("hero.card.code")}</p>
                <p className="mt-1 font-mono text-sm font-medium text-accent-text">ADH-XXXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-shell relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-inverse bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fg-inverse-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
            {t("hero.badge")}
          </div>

          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-fg-inverse text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {t("hero.title1")}{" "}
            <span className="text-accent-text">{t("hero.title2")}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-fg-inverse-muted sm:text-lg">
            {t("hero.desc")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
              <WhatsAppIcon className="size-4" />
              {t("hero.cta1")}
            </a>
            <Link href="/suivi" className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-7 py-4 text-sm font-semibold text-fg-inverse transition hover:bg-accent/10">
              {t("hero.cta2")}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-inverse-muted">
            {[t("hero.pill1"), t("hero.pill2"), t("hero.pill3")].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent/80" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line-inverse bg-line-inverse md:mt-20 md:grid-cols-4">
          {statKeys.map((k, i) => (
            <div key={k} className="bg-white/80 px-5 py-6 backdrop-blur sm:px-6">
              <p className="font-display text-2xl font-bold tracking-tight text-fg-inverse sm:text-3xl">{statValues[i]}</p>
              <p className="mt-1 text-xs leading-relaxed text-fg-inverse-muted sm:text-sm">{t(k)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-shell relative mt-10 flex justify-center md:hidden">
        <Link href="#services" className="inline-flex items-center gap-1 text-xs font-medium text-fg-inverse-muted">
          Découvrir <ChevronRight className="size-4 rotate-90" />
        </Link>
      </div>
    </section>
  );
}
