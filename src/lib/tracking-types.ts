export const TRACKING_STATUSES = [
  "Commande confirmée",
  "Reçu à l'entrepôt",
  "Contrôle & emballage",
  "En vol vers Kinshasa",
  "Arrivée à Kinshasa",
  "Prêt à récupérer",
] as const;

export type TrackingStatus = (typeof TRACKING_STATUSES)[number];

export type TrackingRecord = {
  code: string;
  status: TrackingStatus;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export function normalizeCode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidCode(code: string): boolean {
  return /^ADH-[A-Z0-9]{5}$/.test(code);
}

export function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let part = "";
  for (let i = 0; i < 5; i++) part += chars[Math.floor(Math.random() * chars.length)];
  return `ADH-${part}`;
}
