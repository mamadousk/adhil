"use client";

import { TrackingForm } from "@/components/TrackingForm";
import { useLang } from "@/components/LanguageProvider";

export function SuiviContent() {
  const { t } = useLang();
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">{t("tracking.kicker")}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">{t("tracking.title")}</h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{t("tracking.desc")}</p>
        </div>
        <div className="mt-12">
          <TrackingForm />
        </div>
      </div>
    </main>
  );
}
