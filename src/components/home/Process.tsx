import { STEPS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Process() {
  return (
    <section id="processus" className="relative overflow-hidden bg-bg-inverse py-24 text-fg-inverse md:py-32 scroll-mt-24">
      <div className="absolute inset-0 grid-fade opacity-30" aria-hidden="true" />
      <div className="container-shell relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-inverse-muted uppercase">
              Le parcours de votre colis
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              De la boutique européenne à votre porte.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-inverse-muted sm:text-lg">
              Six étapes claires, visibles dans votre espace de suivi. Vous savez toujours
              où en est votre commande.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.06}>
              <div className="group relative h-full rounded-3xl border border-line-inverse bg-white/[0.02] p-6 transition duration-300 hover:bg-white/[0.04] hover:border-accent/30">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-medium text-accent">{step.number}</span>
                  <div className="h-px flex-1 bg-line-inverse transition group-hover:bg-accent/30" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-inverse-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
