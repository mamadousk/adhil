import type { Metadata } from "next";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { BoutiqueCatalog } from "@/components/BoutiqueCatalog";
import { MobileMoneyIcon, VisaIcon, MastercardIcon } from "@/components/BrandIcons";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Boutique Adhilix : sneakers, streetwear et articles luxe. Commandez en ligne et payez par Mobile Money, Visa ou Mastercard.",
  alternates: { canonical: "/boutique" },
};

const perks = [
  { icon: BadgeCheck, title: "100% authentique", text: "Produits sourcés en Europe et contrôlés avant expédition." },
  { icon: ShieldCheck, title: "Paiement sécurisé", text: "Mobile Money, Visa et Mastercard avec confirmation par notre équipe." },
  { icon: Truck, title: "Livraison RDC", text: "Expédition vers Kinshasa avec suivi Adhilix." },
];

export default function BoutiquePage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">Boutique</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Choisissez. Commandez. <span className="text-accent-strong">Payez en ligne.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Découvrez une sélection Adhilix de sneakers, streetwear et pièces luxe. Sélectionnez votre article,
            renseignez vos informations et choisissez votre moyen de paiement.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-fg-muted">Paiements acceptés :</span>
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-line bg-bg-elev p-2"><MobileMoneyIcon className="h-8 w-auto" /></div>
              <div className="rounded-xl border border-line bg-bg-elev p-2"><VisaIcon className="h-8 w-auto" /></div>
              <div className="rounded-xl border border-line bg-bg-elev p-2"><MastercardIcon className="h-8 w-auto" /></div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-line bg-bg-elev p-5">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-accent/15 text-accent-strong">
                <Icon className="size-5" />
              </div>
              <p className="mt-4 font-display font-semibold">{title}</p>
              <p className="mt-1 text-sm text-fg-muted">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <BoutiqueCatalog />
        </div>

        <div className="mt-14 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
          <p className="font-display text-lg font-bold">Comment ça marche ?</p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-fg-muted">
            <li className="rounded-2xl bg-bg p-4"><span className="font-mono text-accent-strong">01</span><p className="mt-2 font-medium text-fg">Choisissez votre produit</p><p className="mt-1">Sélectionnez l&apos;article et la quantité.</p></li>
            <li className="rounded-2xl bg-bg p-4"><span className="font-mono text-accent-strong">02</span><p className="mt-2 font-medium text-fg">Sélectionnez le paiement</p><p className="mt-1">Mobile Money, Visa ou Mastercard.</p></li>
            <li className="rounded-2xl bg-bg p-4"><span className="font-mono text-accent-strong">03</span><p className="mt-2 font-medium text-fg">Finalisez en sécurité</p><p className="mt-1">Notre équipe vous envoie la procédure de paiement sécurisé et confirme votre commande.</p></li>
          </ol>
        </div>
      </div>
    </main>
  );
}
