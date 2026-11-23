import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Adhilix pour un devis, une question ou un suivi de commande. Écrivez-nous à hello@adhilix.com ou sur WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
