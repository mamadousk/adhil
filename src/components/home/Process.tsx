"use client";

import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

const nums = ["01", "02", "03", "04", "05", "06"];

export function Process() {
  const { t } = useLang();
  return (
    <section id="processus" className="relative overflow-hidden bg-bg-inverse py-24 text-fg-inverse md:py-32 scroll-mt-24">
      <div className="absolute inset-0 grid-fade opacity-30" aria-hidden="true" />
      <div className="container-shell relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-inverse-muted uppercase">{t("process.kicker")}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("process.title")}</h2>
            <p className="mt-5 text-base leading-relaxed text-fg-inverse-muted sm:text-lg">{t("process.desc")}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nums.map((n, i) => (
            <Reveal key={n} delay={i * 0.06}>
              <div className="group relative h-full rounded-3xl border border-line-inverse bg-white/80 p-6 transition duration-300 hover:bg-white hover:border-accent/30">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-medium text-accent-text">{n}</span>
                  <div className="h-px flex-1 bg-line-inverse transition group-hover:bg-accent/30" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{t(`process.${i}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-inverse-muted">{t(`process.${i}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
