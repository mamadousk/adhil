"use client";

import { CreditCard, Package, ShieldCheck, Smartphone, Sparkles, Truck } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { MobileMoneyIcon, VisaIcon, MastercardIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";
import { useLang } from "@/components/LanguageProvider";

const TARGET_DATE = "2027-01-01T00:00:00+01:00";
const featIcons = [Sparkles, Smartphone, CreditCard, Package, ShieldCheck, Truck];

export function BoutiqueContent() {
  const { t } = useLang();
  return (
    <main className="relative overflow-hidden bg-bg-inverse pt-32 pb-24 text-fg-inverse md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-fade opacity-40" aria-hidden="true" />
      <div className="animate-drift absolute -top-24 left-[-10%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
      <div className="animate-drift-reverse absolute top-1/3 right-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="container-shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line-inverse bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fg-inverse-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
            {t("boutique.badge")}
          </div>
          <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {t("boutique.title1")} <span className="text-accent-text">{t("boutique.title2")}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-fg-inverse-muted sm:text-lg">
            {t("boutique.desc")} <span className="font-semibold text-fg-inverse">{t("boutique.date")}</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-fg-inverse-muted">{t("boutique.payments")}</span>
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-line-inverse bg-white/80 p-2"><MobileMoneyIcon className="h-8 w-auto" /></div>
              <div className="rounded-xl border border-line-inverse bg-white/80 p-2"><VisaIcon className="h-8 w-auto" /></div>
              <div className="rounded-xl border border-line-inverse bg-white/80 p-2"><MastercardIcon className="h-8 w-auto" /></div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <Countdown target={TARGET_DATE} />
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-accent-text uppercase">{t("boutique.featKicker")}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{t("boutique.featTitle")}</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featIcons.map((Icon, i) => (
              <div key={i} className="rounded-3xl border border-line-inverse bg-white/80 p-6 transition hover:bg-white">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-text"><Icon className="size-5" /></div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{t(`boutique.f${i + 1}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-inverse-muted">{t(`boutique.f${i + 1}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={SITE.whatsappLink("Bonjour Adhilix, je souhaite être informé de l'ouverture de la boutique.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
            <WhatsAppIcon className="size-4" />
            {t("boutique.notify")}
          </a>
          <a href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-7 py-4 text-sm font-semibold text-fg-inverse transition hover:bg-accent/10">
            {t("boutique.order")}
          </a>
        </div>
      </div>
    </main>
  );
}
