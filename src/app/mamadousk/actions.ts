"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  createTracking,
  deleteTracking,
  getTracking,
  listTracking,
  updateTracking,
  TRACKING_STATUSES,
  type TrackingStatus,
} from "@/lib/tracking-store";

const ADMIN_PASSWORD = "Mamadousacko22";
const COOKIE_NAME = "adhilix_admin";
const COOKIE_VALUE = "adhilix_admin_session_ok_v1";

async function isAdmin() {
  const c = await cookies();
  return c.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function loginAdmin(_prev: { error?: string } | null, formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password !== ADMIN_PASSWORD) {
    return { error: "Mot de passe incorrect." };
  }
  const c = await cookies();
  c.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return { error: undefined };
}

export async function logoutAdmin() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
  revalidatePath("/mamadousk");
}

export async function adminListTracking() {
  if (!(await isAdmin())) return { ok: false as const, error: "Non autorisé.", records: [] };
  const records = await listTracking();
  return { ok: true as const, records };
}

export async function adminCreateTracking(_prev: unknown, formData: FormData) {
  if (!(await isAdmin())) return { ok: false as const, error: "Non autorisé." };
  const code = String(formData.get("code") || "");
  const status = String(formData.get("status") || TRACKING_STATUSES[0]) as TrackingStatus;
  const note = String(formData.get("note") || "");
  const res = await createTracking({ code: code || undefined, status, note });
  if (res.ok) {
    revalidatePath("/mamadousk");
    revalidatePath("/suivi");
  }
  return res;
}

export async function adminUpdateTracking(_prev: unknown, formData: FormData) {
  if (!(await isAdmin())) return { ok: false as const, error: "Non autorisé." };
  const code = String(formData.get("code") || "");
  const status = String(formData.get("status") || "") as TrackingStatus;
  const note = String(formData.get("note") || "");
  const res = await updateTracking({ code, status, note });
  if (res.ok) {
    revalidatePath("/mamadousk");
    revalidatePath("/suivi");
  }
  return res;
}

export async function adminDeleteTracking(code: string) {
  if (!(await isAdmin())) return { ok: false as const, error: "Non autorisé." };
  const res = await deleteTracking(code);
  if (res.ok) {
    revalidatePath("/mamadousk");
    revalidatePath("/suivi");
  }
  return res;
}

export async function publicGetTracking(code: string) {
  return getTracking(code);
}
