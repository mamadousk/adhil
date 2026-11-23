export const SITE = {
  name: "Adhilix",
  domain: "adhilix.com",
  url: "https://adhilix.com",
  tagline: "Achat & Expédition Europe → RDC",
  description:
    "Adhilix achète pour vous sneakers, streetwear et articles de luxe en Europe, puis les expédie en RDC avec un suivi transparent.",
  whatsappNumber: "+243815828281",
  whatsappE164: "243815828281",
  whatsappLink: (message: string) =>
    `https://wa.me/243815828281?text=${encodeURIComponent(message)}`,
  email: "contact@adhilix.com",
  location: "Kinshasa, RDC",
  warehouses: "France · Belgique",
} as const;

export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#processus", label: "Processus" },
  { href: "/suivi", label: "Suivi" },
  { href: "/faq", label: "FAQ" },
] as const;

export const SERVICES = [
  {
    id: "sneakers",
    eyebrow: "Personal Shopping",
    title: "Sneakers & Streetwear",
    description:
      "Sourcing et vérification d'authenticité sur les modèles exclusifs : Nike SNKRS, Adidas Confirmed, StockX et boutiques officielles. Zéro contrefaçon.",
    cta: "Commander une paire",
    href: SITE.whatsappLink(
      "Bonjour, je recherche une paire de sneakers.",
    ),
  },
  {
    id: "luxe",
    eyebrow: "Conciergerie",
    title: "Luxe & Mode",
    description:
      "Achat sur commande dans les maisons de mode en France et en Belgique : vêtements, maroquinerie, accessoires. Paiement géré et retrait sécurisé.",
    cta: "Demander un devis",
    href: SITE.whatsappLink(
      "Bonjour, je souhaite commander un article de luxe.",
    ),
  },
  {
    id: "fret",
    eyebrow: "Logistique",
    title: "Fret aérien express",
    description:
      "Réception dans notre entrepôt européen, groupage, emballage renforcé et expédition rapide par vol cargo vers Kinshasa, avec visibilité à chaque étape.",
    cta: "Consulter un suivi",
    href: "/suivi",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    title: "Vous nous envoyez l'article",
    description:
      "Lien, photo ou référence sur WhatsApp. Vous recevez un devis clair, sans surprise.",
  },
  {
    number: "02",
    title: "Achat confirmé",
    description:
      "Après votre accord et votre paiement, nous achetons l'article auprès de sources fiables en Europe.",
  },
  {
    number: "03",
    title: "Entrepôt et contrôle",
    description:
      "Réception, vérification d'authenticité, photos si besoin et emballage renforcé avant départ.",
  },
  {
    number: "04",
    title: "Vol cargo vers Kinshasa",
    description:
      "Votre colis part par fret aérien. Vous recevez votre code de suivi ADH-XXXXX.",
  },
  {
    number: "05",
    title: "Arrivée et dédouanement",
    description:
      "Nous gérons les formalités à l'arrivée pour que vous n'ayez pas à vous en soucier.",
  },
  {
    number: "06",
    title: "Retrait ou livraison",
    description:
      "Vous récupérez votre article à notre point de retrait à Kinshasa ou en livraison à domicile.",
  },
] as const;

export const COMMITMENTS = [
  {
    title: "100% authentique",
    description:
      "Chaque article est acheté auprès de boutiques officielles ou plateformes reconnues, puis contrôlé avant l'expédition.",
  },
  {
    title: "Traçabilité en temps réel",
    description:
      "Un code ADH-XXXXX vous permet de suivre chaque étape, de l'entrepôt européen jusqu'à la remise à Kinshasa.",
  },
  {
    title: "Remise sécurisée",
    description:
      "Retrait à notre point de retrait ou livraison à domicile, selon ce qui vous arrange le mieux.",
  },
  {
    title: "Emballage renforcé",
    description:
      "Groupage soigné et protection adaptée pour que sneakers, pièces streetwear ou luxe arrivent en parfait état.",
  },
] as const;

export const FAQS = [
  {
    question: "Comment passer commande ?",
    answer:
      "Écrivez-nous sur WhatsApp avec le lien ou la photo de l'article souhaité. Nous vous envoyons un devis clair incluant l'article, le service et l'expédition. Après votre accord et paiement, nous lançons l'achat en Europe.",
  },
  {
    question: "Comment suivre mon colis ?",
    answer:
      "Dès l'enregistrement de votre expédition, vous recevez un code ADH-XXXXX. Entrez-le sur la page Suivi de colis pour voir l'état actuel de votre commande.",
  },
  {
    question: "Les articles sont-ils authentiques ?",
    answer:
      "Oui. Nous achetons auprès de boutiques officielles et de plateformes reconnues. Chaque article est contrôlé par notre équipe en Europe avant tout départ vers la RDC.",
  },
  {
    question: "Combien de temps dure la livraison ?",
    answer:
      "Le délai dépend de la disponibilité de l'article et du prochain vol cargo. Nous vous communiquons une estimation au moment du devis et vous suivez chaque étape en ligne.",
  },
  {
    question: "Puis-je récupérer mon colis moi-même ?",
    answer:
      "Oui. Vous pouvez retirer votre colis à notre point de retrait à Kinshasa, ou choisir une livraison à domicile selon votre préférence.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Les modalités de paiement sont précisées dans votre devis. Nous confirmons toujours le montant total et les conditions avant de lancer la commande.",
  },
] as const;

export const MARQUEE_ITEMS = [
  "Nike SNKRS",
  "Adidas Confirmed",
  "StockX",
  "Jordan",
  "New Balance",
  "Streetwear",
  "Luxe & Mode",
  "Fret aérien",
] as const;
