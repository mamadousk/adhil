import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/site";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";

export function HomeFaq() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">
              Questions fréquentes
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Tout savoir avant de commander.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
              Des réponses claires sur le fonctionnement, les délais, l&apos;authenticité et le suivi.
            </p>
            <Link
              href="/faq"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg transition hover:text-accent-strong"
            >
              Voir toutes les questions
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqList items={FAQS.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  );
}
