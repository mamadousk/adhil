import type { Metadata } from "next";
import { SuiviContent } from "@/components/SuiviContent";

export const metadata: Metadata = {
  title: "Suivi de colis",
  description:
    "Suivez votre commande Adhilix avec votre code ADH-XXXXX, de l'entrepôt européen jusqu'à la remise à Kinshasa.",
  alternates: { canonical: "/suivi" },
};

export default function SuiviPage() {
  return <SuiviContent />;
}
