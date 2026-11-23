"use client";

import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Adhilix sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
