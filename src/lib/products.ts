export type Product = {
  id: string;
  name: string;
  category: "Sneakers" | "Streetwear" | "Luxe";
  price: number;
  currency: "USD";
  description: string;
  details: string[];
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "nk-af1",
    name: "Nike Air Force 1 '07",
    category: "Sneakers",
    price: 130,
    currency: "USD",
    description: "Le classique intemporel. Cuir premium, confort quotidien, style clean.",
    details: ["Authenticité vérifiée", "Tailles disponibles sur demande", "Achat via boutique officielle/partenaires"],
    badge: "Populaire",
  },
  {
    id: "jd-4",
    name: "Air Jordan 4 Retro",
    category: "Sneakers",
    price: 280,
    currency: "USD",
    description: "Silhouette iconique Jordan, coloris selon disponibilité.",
    details: ["Sourcing Europe", "Contrôle avant expédition", "Emballage renforcé"],
    badge: "Demande forte",
  },
  {
    id: "nb-550",
    name: "New Balance 550",
    category: "Sneakers",
    price: 160,
    currency: "USD",
    description: "Look rétro basket, finitions soignées, très polyvalent.",
    details: ["Plusieurs coloris possibles", "Authenticité garantie", "Livraison Kinshasa"],
  },
  {
    id: "st-hoodie",
    name: "Hoodie Streetwear Premium",
    category: "Streetwear",
    price: 120,
    currency: "USD",
    description: "Hoodie coupe moderne, coton épais, sélection de marques streetwear.",
    details: ["Marque/modèle sur demande", "Vérification qualité", "Conseil taille disponible"],
  },
  {
    id: "st-tee",
    name: "T-shirt Designer",
    category: "Streetwear",
    price: 85,
    currency: "USD",
    description: "T-shirts de marques sélectionnées, neufs et authentiques.",
    details: ["Sélection Europe", "Neuf avec étiquettes", "Photos avant expédition"],
  },
  {
    id: "lx-bag",
    name: "Sac Luxe (sur sélection)",
    category: "Luxe",
    price: 450,
    currency: "USD",
    description: "Maroquinerie de maisons de luxe, achetée sur commande en Europe.",
    details: ["Devis personnalisé selon modèle", "Achat boutique officielle", "Contrôle d'authenticité"],
    badge: "Sur commande",
  },
];

export const PAYMENT_METHODS = [
  { id: "mobile_money", label: "Mobile Money", description: "M-Pesa, Orange Money, Airtel Money" },
  { id: "visa", label: "Visa", description: "Carte Visa" },
  { id: "mastercard", label: "Mastercard", description: "Carte Mastercard" },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];
