import type { Metadata } from "next";
import { BoutiqueContent } from "@/components/BoutiqueContent";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "La boutique Adhilix arrive bientôt : paiement Mobile Money, Visa et Mastercard, sélection premium et livraison en RDC.",
  alternates: { canonical: "/boutique" },
};

export default function BoutiquePage() {
  return <BoutiqueContent />;
}
