"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.boutique": "Boutique",
  "nav.services": "Services",
  "nav.process": "Processus",
  "nav.tracking": "Suivi",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.track": "Suivre un colis",
  "nav.whatsapp": "WhatsApp",
  "nav.whatsappLong": "Discuter sur WhatsApp",
  "hero.badge": "ACHATS EN EUROPE · LIVRAISON EN RDC",
  "hero.title1": "Vos achats en Europe,",
  "hero.title2": "livrés en RDC.",
  "hero.desc": "Adhilix achète pour vous sneakers rares, streetwear et articles de luxe en France et en Belgique, puis les expédie à Kinshasa avec un suivi transparent, de l'achat à la remise.",
  "hero.cta1": "Commander sur WhatsApp",
  "hero.cta2": "Suivre mon colis",
  "hero.pill1": "Authenticité contrôlée",
  "hero.pill2": "Fret aérien express",
  "hero.pill3": "Suivi ADH-XXXXX",
  "section.services.kicker": "Ce que nous faisons",
  "section.services.title": "Des services pensés pour acheter en Europe, l'esprit tranquille.",
  "section.process.kicker": "Le parcours de votre colis",
  "section.process.title": "De la boutique européenne à votre porte.",
  "section.commitments.kicker": "Nos engagements",
  "section.commitments.title": "La transparence, ce n'est pas une option.",
  "section.faq.kicker": "Questions fréquentes",
  "section.faq.title": "Tout savoir avant de commander.",
  "section.cta.kicker": "Prêt à commander",
  "section.cta.title": "Besoin d'un devis d'achat ?",
  "footer.rights": "Tous droits réservés.",
  "footer.tagline": "Achat sur commande Europe · Expédition vers la RDC",
  "lang.label": "Langue",
};

const en: Dict = {
  "nav.boutique": "Shop",
  "nav.services": "Services",
  "nav.process": "Process",
  "nav.tracking": "Tracking",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.track": "Track a parcel",
  "nav.whatsapp": "WhatsApp",
  "nav.whatsappLong": "Chat on WhatsApp",
  "hero.badge": "SHOPPING IN EUROPE · DELIVERY TO DRC",
  "hero.title1": "Your purchases in Europe,",
  "hero.title2": "delivered to DRC.",
  "hero.desc": "Adhilix buys rare sneakers, streetwear and luxury items for you in France and Belgium, then ships them to Kinshasa with transparent tracking from purchase to delivery.",
  "hero.cta1": "Order on WhatsApp",
  "hero.cta2": "Track my parcel",
  "hero.pill1": "Authenticity checked",
  "hero.pill2": "Express air freight",
  "hero.pill3": "ADH-XXXXX tracking",
  "section.services.kicker": "What we do",
  "section.services.title": "Services designed for worry-free shopping in Europe.",
  "section.process.kicker": "Your parcel journey",
  "section.process.title": "From the European store to your door.",
  "section.commitments.kicker": "Our commitments",
  "section.commitments.title": "Transparency is not optional.",
  "section.faq.kicker": "Frequently asked questions",
  "section.faq.title": "Everything before you order.",
  "section.cta.kicker": "Ready to order",
  "section.cta.title": "Need a purchase quote?",
  "footer.rights": "All rights reserved.",
  "footer.tagline": "On-demand shopping Europe · Shipping to DRC",
  "lang.label": "Language",
};

const dicts: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("adhilix-lang") as Lang | null;
    if (saved === "fr" || saved === "en") {
      const id = window.setTimeout(() => setLangState(saved), 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("adhilix-lang", l);
    document.cookie = `adhilix-lang=${l};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = l;
  };

  const t = (k: string) => dicts[lang][k] ?? dicts.fr[k] ?? k;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
