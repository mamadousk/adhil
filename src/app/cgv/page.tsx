import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "CGV / CGS",
  description: "Conditions générales de vente et de services d'Adhilix.",
  alternates: { canonical: "/cgv" },
};

const sections = [
  {
    title: "1. Objet",
    body: [
      "Les présentes conditions générales régissent les services proposés par Adhilix : personal shopping, achat sur commande en Europe, réception en entrepôt, contrôle, emballage, fret aérien et remise à Kinshasa (RDC).",
      "Toute commande implique l'acceptation des présentes conditions, du devis transmis et de la politique de commande et de retour.",
    ],
  },
  {
    title: "2. Commande sur demande",
    body: [
      "Adhilix agit sur demande du client pour acheter un article auprès d'un fournisseur ou marchand européen. La commande est lancée uniquement après validation du devis par le client et confirmation du paiement selon les modalités convenues.",
      "Le devis précise, selon le cas, le prix de l'article, les frais de service, les frais logistiques, les délais estimatifs et les conditions applicables.",
    ],
  },
  {
    title: "3. Prix et paiement",
    body: [
      "Les prix sont communiqués avant confirmation. Ils peuvent varier selon la disponibilité, le prix fournisseur, le taux de change, le poids/volume, les frais logistiques ou les exigences du marchand.",
      "Aucun achat n'est effectué avant réception du paiement ou de l'acompte convenu. Les modalités exactes sont indiquées sur le devis.",
    ],
  },
  {
    title: "4. Disponibilité et authenticité",
    body: [
      "Adhilix s'efforce de s'approvisionner auprès de boutiques officielles et de plateformes reconnues. L'authenticité des articles est contrôlée avant expédition.",
      "La disponibilité d'un article dépend du marchand. Si un article devient indisponible après validation du devis mais avant achat effectif, le client en est informé et les sommes versées pour l'article non acheté sont traitées selon l'accord convenu.",
    ],
  },
  {
    title: "5. Expédition et délais",
    body: [
      "Les délais communiqués sont des estimations. Ils dépendent notamment de la disponibilité de l'article, des délais fournisseur, des vols cargo, des formalités d'arrivée et des contraintes logistiques.",
      "Adhilix met en œuvre les moyens raisonnables pour respecter les délais annoncés, sans pouvoir garantir une date de livraison ferme lorsque des facteurs externes interviennent.",
    ],
  },
  {
    title: "6. Suivi et remise",
    body: [
      "Un code de suivi ADH-XXXXX peut être communiqué dès l'enregistrement de l'expédition. Le client peut suivre l'état de sa commande sur la page Suivi.",
      "La remise s'effectue au point de retrait à Kinshasa ou en livraison à domicile, selon l'option convenue. Le client doit vérifier l'état extérieur du colis au moment de la remise.",
    ],
  },
  {
    title: "7. Responsabilité",
    body: [
      "Adhilix est responsable de la bonne exécution des services convenus dans les limites du devis et des présentes conditions. La responsabilité d'Adhilix ne saurait être engagée pour des retards ou impossibilités dus à un événement extérieur, au fournisseur, au transporteur, aux autorités ou à toute circonstance indépendante de sa volonté.",
      "Les droits légaux du client en matière de défaut, non-conformité ou autre protection applicable demeurent réservés.",
    ],
  },
  {
    title: "8. Contact",
    body: [
      `Pour toute question relative à une commande ou aux présentes conditions, contactez Adhilix via WhatsApp au ${SITE.whatsappNumber} ou par message WhatsApp.`,
    ],
  },
];

export default function CgvPage() {
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">Légal</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Conditions générales de vente et de services
          </h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Ces conditions encadrent les services d&apos;achat sur commande et d&apos;expédition Europe → RDC proposés par Adhilix.
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
            <Link href="/commandes-retours" className="font-medium text-fg underline decoration-accent decoration-2 underline-offset-4">
              Politique de commande et de retour
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
