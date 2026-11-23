"use client";

import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Gem, Plane } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

const icons = [ShoppingBag, Gem, Plane];

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="py-24 md:py-32 scroll-mt-24">
      <div className="container-shell">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">{t("section.services.kicker")}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("section.services.title")}</h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
              De la recherche de l&apos;article à la remise à Kinshasa, Adhilix gère chaque étape avec rigueur, transparence et soin.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={service.id} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col rounded-[1.75rem] border border-line bg-bg-elev p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_rgba(23,24,22,0.15)] sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-bg-inverse text-accent"><Icon className="size-5" /></div>
                    <span className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">{service.eyebrow}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{service.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted sm:text-base">{service.description}</p>
                  <Link
                    href={service.href}
                    target={service.href.startsWith("http") ? "_blank" : undefined}
                    rel={service.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg transition group-hover:text-accent-strong"
                  >
                    {service.cta}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
