"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

const faqsFr = [
  { question: "Comment passer commande ?", answer: "Écrivez-nous sur WhatsApp avec le lien ou la photo de l'article souhaité. Nous vous envoyons un devis clair incluant l'article, le service et l'expédition. Après votre accord et paiement, nous lançons l'achat en Europe." },
  { question: "Comment suivre mon colis ?", answer: "Dès l'enregistrement de votre expédition, vous recevez un code ADH-XXXXX. Entrez-le sur la page Suivi de colis pour voir l'état actuel de votre commande." },
  { question: "Les articles sont-ils authentiques ?", answer: "Oui. Nous achetons auprès de boutiques officielles et de plateformes reconnues. Chaque article est contrôlé par notre équipe en Europe avant tout départ vers la RDC." },
  { question: "Combien de temps dure la livraison ?", answer: "Le délai dépend de la disponibilité de l'article et du prochain vol cargo. Nous vous communiquons une estimation au moment du devis et vous suivez chaque étape en ligne." },
  { question: "Puis-je récupérer mon colis moi-même ?", answer: "Oui. Vous pouvez retirer votre colis à notre point de retrait à Kinshasa, ou choisir une livraison à domicile selon votre préférence." },
];

const faqsEn = [
  { question: "How do I place an order?", answer: "Message us on WhatsApp with the link or photo of the item you want. We'll send you a clear quote including the item, service and shipping. After your approval and payment, we purchase the item in Europe." },
  { question: "How do I track my parcel?", answer: "As soon as your shipment is registered, you receive an ADH-XXXXX code. Enter it on the Tracking page to see the current status of your order." },
  { question: "Are the items authentic?", answer: "Yes. We buy from official stores and recognized platforms. Every item is checked by our team in Europe before departure to DRC." },
  { question: "How long does delivery take?", answer: "Timing depends on item availability and the next cargo flight. We give you an estimate with the quote and you can follow every step online." },
  { question: "Can I pick up my parcel myself?", answer: "Yes. You can collect your parcel at our Kinshasa pickup point, or choose home delivery according to your preference." },
];

export function HomeFaq() {
  const { t, lang } = useLang();
  const faqs = lang === "en" ? faqsEn : faqsFr;
  return (
    <section className="py-24 md:py-32">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">{t("faq.kicker")}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("faq.title")}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">{t("faq.desc")}</p>
            <Link href="/faq" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg transition hover:text-accent-strong">
              {t("faq.all")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqList items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
