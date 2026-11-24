"use client";

import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";
import { useLang } from "@/components/LanguageProvider";

const faqsFr = [
  { question: "Comment passer commande ?", answer: "Écrivez-nous sur WhatsApp avec le lien ou la photo de l'article souhaité. Nous vous envoyons un devis clair incluant l'article, le service et l'expédition. Après votre accord et paiement, nous lançons l'achat en Europe." },
  { question: "Comment suivre mon colis ?", answer: "Dès l'enregistrement de votre expédition, vous recevez un code ADH-XXXXX. Entrez-le sur la page Suivi de colis pour voir l'état actuel de votre commande." },
  { question: "Les articles sont-ils authentiques ?", answer: "Oui. Nous achetons auprès de boutiques officielles et de plateformes reconnues. Chaque article est contrôlé par notre équipe en Europe avant tout départ vers la RDC." },
  { question: "Combien de temps dure la livraison ?", answer: "Le délai dépend de la disponibilité de l'article et du prochain vol cargo. Nous vous communiquons une estimation au moment du devis et vous suivez chaque étape en ligne." },
  { question: "Puis-je récupérer mon colis moi-même ?", answer: "Oui. Vous pouvez retirer votre colis à notre point de retrait à Kinshasa, ou choisir une livraison à domicile selon votre préférence." },
  { question: "Quels moyens de paiement acceptez-vous ?", answer: "Les modalités de paiement sont précisées dans votre devis. Nous confirmons toujours le montant total et les conditions avant de lancer la commande." },
];

const faqsEn = [
  { question: "How do I place an order?", answer: "Message us on WhatsApp with the link or photo of the item you want. We'll send you a clear quote including the item, service and shipping. After your approval and payment, we purchase the item in Europe." },
  { question: "How do I track my parcel?", answer: "As soon as your shipment is registered, you receive an ADH-XXXXX code. Enter it on the Tracking page to see the current status of your order." },
  { question: "Are the items authentic?", answer: "Yes. We buy from official stores and recognized platforms. Every item is checked by our team in Europe before departure to DRC." },
  { question: "How long does delivery take?", answer: "Timing depends on item availability and the next cargo flight. We give you an estimate with the quote and you can follow every step online." },
  { question: "Can I pick up my parcel myself?", answer: "Yes. You can collect your parcel at our Kinshasa pickup point, or choose home delivery according to your preference." },
  { question: "What payment methods do you accept?", answer: "Payment methods are specified in your quote. We always confirm the total amount and conditions before launching the order." },
];

export function FaqContent() {
  const { lang, t } = useLang();
  const faqs = lang === "en" ? faqsEn : faqsFr;
  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">FAQ</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">{t("faq.pageTitle")}</h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{t("faq.pageDesc")}</p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={faqs} />
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-line-inverse bg-bg-inverse p-8 text-fg-inverse sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight">{t("faq.moreTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-inverse-muted">{t("faq.moreDesc")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.whatsappLink("Bonjour Adhilix, j'ai une question.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
              <WhatsAppIcon className="size-4" />
              {t("faq.moreCta")}
            </a>
            <Link href="/suivi" className="inline-flex items-center justify-center rounded-full border border-line-inverse px-6 py-3.5 text-sm font-semibold text-fg-inverse transition hover:bg-accent/10">
              {t("nav.track")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
