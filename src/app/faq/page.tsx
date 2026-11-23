import type { Metadata } from "next";
import { FaqContent } from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur le personal shopping, le fret aérien et le suivi de colis Adhilix entre l'Europe et la RDC.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return <FaqContent />;
}
