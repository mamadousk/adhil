import { promises as fs } from "fs";
import path from "path";
import {
  TRACKING_STATUSES,
  generateCode,
  isValidCode,
  normalizeCode,
  type TrackingRecord,
  type TrackingStatus,
} from "./tracking-types";

export { TRACKING_STATUSES, generateCode, isValidCode, normalizeCode };
export type { TrackingRecord, TrackingStatus };

const DATA_FILE = path.join(process.cwd(), "data", "tracking.json");

async function readAll(): Promise<TrackingRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as TrackingRecord[];
  } catch {
    return [];
  }
}

async function writeAll(records: TrackingRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
}

export async function listTracking(): Promise<TrackingRecord[]> {
  const records = await readAll();
  return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getTracking(code: string): Promise<TrackingRecord | null> {
  const normalized = normalizeCode(code);
  const records = await readAll();
  return records.find((r) => r.code === normalized) ?? null;
}

export async function createTracking(input: {
  code?: string;
  status?: TrackingStatus;
  note?: string;
}): Promise<{ ok: true; record: TrackingRecord } | { ok: false; error: string }> {
  const records = await readAll();
  let code = normalizeCode(input.code || generateCode());
  if (!code.startsWith("ADH-")) code = `ADH-${code}`;
  if (!isValidCode(code)) {
    return { ok: false, error: "Code invalide. Format attendu: ADH-XXXXX (lettres/chiffres)." };
  }
  if (records.some((r) => r.code === code)) {
    return { ok: false, error: `Le code ${code} existe déjà.` };
  }
  const now = new Date().toISOString();
  const record: TrackingRecord = {
    code,
    status: input.status && TRACKING_STATUSES.includes(input.status) ? input.status : TRACKING_STATUSES[0],
    note: (input.note || "").trim().slice(0, 300),
    createdAt: now,
    updatedAt: now,
  };
  records.push(record);
  try {
    await writeAll(records);
  } catch {
    return { ok: false, error: "Impossible d'enregistrer le code (stockage non persistant sur cet environnement)." };
  }
  return { ok: true, record };
}

export async function updateTracking(input: {
  code: string;
  status: TrackingStatus;
  note?: string;
}): Promise<{ ok: true; record: TrackingRecord } | { ok: false; error: string }> {
  const records = await readAll();
  const code = normalizeCode(input.code);
  const idx = records.findIndex((r) => r.code === code);
  if (idx === -1) return { ok: false, error: "Code introuvable." };
  if (!TRACKING_STATUSES.includes(input.status)) return { ok: false, error: "Statut invalide." };
  const prev = records[idx];
  const record: TrackingRecord = {
    ...prev,
    status: input.status,
    note: input.note !== undefined ? input.note.trim().slice(0, 300) : prev.note,
    updatedAt: new Date().toISOString(),
  };
  records[idx] = record;
  try {
    await writeAll(records);
  } catch {
    return { ok: false, error: "Impossible de mettre à jour (stockage non persistant sur cet environnement)." };
  }
  return { ok: true, record };
}

export async function deleteTracking(code: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const records = await readAll();
  const normalized = normalizeCode(code);
  const next = records.filter((r) => r.code !== normalized);
  if (next.length === records.length) return { ok: false, error: "Code introuvable." };
  try {
    await writeAll(next);
  } catch {
    return { ok: false, error: "Impossible de supprimer." };
  }
  return { ok: true };
}
