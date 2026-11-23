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
const TMP_FILE = "/tmp/adhilix-tracking.json";
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KV_KEY = "adhilix:tracking";

async function kvFetch(command: unknown[]): Promise<unknown> {
  if (!KV_URL || !KV_TOKEN) throw new Error("KV not configured");
  const res = await fetch(`${KV_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV error ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

async function readFromKv(): Promise<TrackingRecord[] | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const result = await kvFetch(["GET", KV_KEY]);
    if (typeof result !== "string") return [];
    const parsed = JSON.parse(result) as unknown;
    return Array.isArray(parsed) ? (parsed as TrackingRecord[]) : [];
  } catch {
    return null;
  }
}

async function writeToKv(records: TrackingRecord[]): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    await kvFetch(["SET", KV_KEY, JSON.stringify(records)]);
    return true;
  } catch {
    return false;
  }
}

async function readFromFile(file: string): Promise<TrackingRecord[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as TrackingRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeToFile(file: string, records: TrackingRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(records, null, 2), "utf8");
}

async function readAll(): Promise<TrackingRecord[]> {
  const kv = await readFromKv();
  if (kv !== null) return kv;
  const primary = await readFromFile(DATA_FILE);
  const tmp = await readFromFile(TMP_FILE);
  // merge by code, prefer latest updatedAt
  const map = new Map<string, TrackingRecord>();
  for (const r of [...primary, ...tmp]) {
    const prev = map.get(r.code);
    if (!prev || r.updatedAt > prev.updatedAt) map.set(r.code, r);
  }
  return [...map.values()];
}

async function writeAll(records: TrackingRecord[]): Promise<void> {
  const kvOk = await writeToKv(records);
  if (kvOk) return;
  try {
    await writeToFile(DATA_FILE, records);
    return;
  } catch {
    // fall through to /tmp
  }
  try {
    await writeToFile(TMP_FILE, records);
    return;
  } catch {
    throw new Error("Impossible d'enregistrer le code.");
  }
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
    return { ok: false, error: "Impossible d'enregistrer le code. Configurez un stockage persistant (KV_REST_API_URL/KV_REST_API_TOKEN) sur Vercel." };
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
    return { ok: false, error: "Impossible de mettre à jour. Configurez un stockage persistant (KV_REST_API_URL/KV_REST_API_TOKEN) sur Vercel." };
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
