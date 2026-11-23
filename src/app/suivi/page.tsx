import type { Metadata } from "next";
import { TrackingForm } from "@/components/TrackingForm";

export const metadata: Metadata = {
  title: "Suivi de colis",
  description:
    "Suivez votre commande Adhilix avec votre code ADH-XXXXX, de l'entrepôt européen jusqu'à la remise à Kinshasa.",
  alternates: { canonical: "/suivi" },
};

export default function SuiviPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">
            Suivi de colis
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Où est votre commande ?
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Entrez votre code de suivi Adhilix pour visualiser l&apos;étape actuelle de votre
            expédition entre l&apos;Europe et Kinshasa.
          </p>
        </div>
        <div className="mt-12">
          <TrackingForm />
        </div>
      </div>
    </main>
  );
}
