"use client";

import { ShieldCheck, Radar, PackageCheck, Box } from "lucide-react";
import { COMMITMENTS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

const icons = [ShieldCheck, Radar, PackageCheck, Box];

export function Commitments() {
  const { t } = useLang();
  return (
    <section className="py-24 md:py-32">
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">{t("section.commitments.kicker")}</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("section.commitments.title")}</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
                Acheter à distance demande de la confiance. Nous la méritons avec des sources fiables, un contrôle réel et un suivi visible à chaque étape.
              </p>
              <div className="mt-8 rounded-3xl bg-bg-inverse p-6 text-fg-inverse">
                <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Le standard Adhilix</p>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">Chaque commande est traitée comme si c&apos;était la nôtre.</p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={item.title} delay={i * 0.07}>
                  <div className="h-full rounded-3xl border border-line bg-bg-elev p-6">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-strong"><Icon className="size-5" /></div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
