import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commandes & retours",
  description: "Politique de commande, modification, annulation et retour d'Adhilix.",
  alternates: { canonical: "/commandes-retours" },
};

const sections = [
  {
    title: "1. Commande sur demande",
    body: [
      "Chaque commande Adhilix est traitée sur demande. Nous achetons l'article en Europe après validation de votre devis et confirmation du paiement.",
      "Avant le lancement de l'achat, nous vous communiquons les informations essentielles : article, prix estimé/confirmé, frais, délai estimatif et conditions de remise.",
    ],
  },
  {
    title: "2. Modification ou annulation",
    body: [
      "Avant l'achat effectif auprès du fournisseur, une demande de modification ou d'annulation peut être étudiée. Contactez-nous immédiatement sur WhatsApp.",
      "Après l'achat auprès du fournisseur européen, toute modification ou annulation dépend de l'acceptation du fournisseur et des conditions qu'il applique (frais, délais, refus possible).",
    ],
  },
  {
    title: "3. Changements d'avis et échanges",
    body: [
      "Les changements d'avis, demandes d'échange de convenance ou retours non liés à un défaut/ne pas-conformité ne sont pas automatiquement acceptés, notamment après expiration des délais légaux de rétractation applicables ou lorsque l'article a été spécifiquement acheté sur demande.",
      "Chaque situation est examinée selon la nature de l'article, le fournisseur, l'état du produit et les conditions applicables.",
    ],
  },
  {
    title: "4. Défaut ou non-conformité",
    body: [
      "Si un article présente un défaut ou n'est pas conforme à la commande, contactez-nous dès réception avec votre code de suivi, des photos et une description claire du problème.",
      "Adhilix examinera la situation avec vous et appliquera les solutions appropriées conformément aux droits légaux applicables et aux conditions fournisseur/transporteur.",
    ],
  },
  {
    title: "5. Vérification à la remise",
    body: [
      "Nous vous invitons à vérifier l'état du colis lors du retrait ou de la livraison. En cas d'anomalie visible, signalez-la rapidement afin que nous puissions traiter la demande efficacement.",
    ],
  },
  {
    title: "6. Contact",
    body: [
      `Pour toute demande liée à une commande, modification ou retour, contactez-nous sur WhatsApp au ${SITE.whatsappNumber} avec votre code ADH-XXXXX si disponible.`,
    ],
  },
];

export default function CommandesRetoursPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">Légal</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Politique de commande et de retour
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Des règles claires pour les commandes sur demande, les modifications, les changements d&apos;avis et les cas de défaut ou non-conformité.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-fg-muted sm:text-base">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-bg-elev border border-line p-6 text-sm text-fg-muted">
            Voir aussi :{" "}
            <Link href="/cgv" className="font-medium text-fg underline decoration-accent decoration-2 underline-offset-4">
              CGV / CGS
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
