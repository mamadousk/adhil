import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Plane, MapPin } from "lucide-react";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";

const stats = [
  { value: "100%", label: "Articles authentiques" },
  { value: "6", label: "Étapes de suivi" },
  { value: "FR · BE", label: "Achats en Europe" },
  { value: "WhatsApp", label: "Devis & support direct" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-bg-inverse pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="absolute inset-0 grid-fade opacity-50" aria-hidden="true" />
      <ParticleCanvas className="absolute inset-0 h-full w-full opacity-70" />

      {/* Drifting ambient orbs */}
      <div
        className="animate-drift absolute -top-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-drift-reverse absolute top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-pulse-soft absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Orbit rings */}
      <div
        className="pointer-events-none absolute top-1/2 right-[8%] hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="relative size-[420px]">
          <div className="animate-orbit absolute inset-0 rounded-full border border-white/[0.07]">
            <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(200,245,90,0.9)]" />
          </div>
          <div className="animate-orbit-reverse absolute inset-12 rounded-full border border-white/[0.05]">
            <span className="absolute bottom-6 right-6 size-2 rounded-full bg-white/70" />
          </div>
          <div className="absolute inset-24 rounded-full border border-accent/10 bg-accent/[0.03]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass rounded-3xl p-6 text-fg-inverse shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-ink">
                  <Plane className="size-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">Europe → RDC</p>
                  <p className="text-xs text-fg-inverse-muted">Fret aérien express</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { icon: ShieldCheck, text: "Contrôle d'authenticité" },
                  { icon: MapPin, text: "Livraison à Kinshasa" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-fg-inverse-muted">
                    <Icon className="size-3.5 text-accent" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-white/5 px-4 py-3">
                <p className="font-mono text-[11px] tracking-wider text-fg-inverse-muted">CODE SUIVI</p>
                <p className="mt-1 font-mono text-sm font-medium text-accent">ADH-XXXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-shell relative">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line-inverse bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-fg-inverse-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-soft" />
            ACHATS EN EUROPE <span className="text-white/30">·</span> LIVRAISON EN RDC
          </div>

          <h1
            className="animate-fade-up mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-fg-inverse text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            Vos achats en Europe,{" "}
            <span className="text-accent">livrés en RDC.</span>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-2xl text-base leading-relaxed text-fg-inverse-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Adhilix achète pour vous sneakers rares, streetwear et articles de luxe
            en France et en Belgique, puis les expédie à Kinshasa avec un suivi
            transparent, de l&apos;achat à la remise.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
            >
              <WhatsAppIcon className="size-4" />
              Commander sur WhatsApp
            </a>
            <Link
              href="/suivi"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-7 py-4 text-sm font-semibold text-fg-inverse transition hover:bg-white/5"
            >
              Suivre mon colis
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-inverse-muted"
            style={{ animationDelay: "320ms" }}
          >
            {["Authenticité contrôlée", "Fret aérien express", "Suivi ADH-XXXXX"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent/80" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line-inverse bg-line-inverse md:mt-20 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-bg-inverse/80 px-5 py-6 backdrop-blur sm:px-6">
              <p className="font-display text-2xl font-bold tracking-tight text-fg-inverse sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fg-inverse-muted sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-shell relative mt-10 flex justify-center md:hidden">
        <Link
          href="#services"
          className="inline-flex items-center gap-1 text-xs font-medium text-fg-inverse-muted"
        >
          Découvrir <ChevronRight className="size-4 rotate-90" />
        </Link>
      </div>
    </section>
  );
}
