"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, LogOut, Plus, RefreshCw, Trash2 } from "lucide-react";
import { adminCreateTracking, adminDeleteTracking, adminUpdateTracking, logoutAdmin } from "@/app/mamadousk/actions";
import { TRACKING_STATUSES, generateCode, type TrackingRecord, type TrackingStatus } from "@/lib/tracking-types";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-CD", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export function AdminDashboard({ initialRecords }: { initialRecords: TrackingRecord[] }) {
  const router = useRouter();
  const [createState, createAction, createPending] = useActionState(adminCreateTracking, null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<TrackingStatus>(TRACKING_STATUSES[0]);
  const [note, setNote] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">Back office</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight">Suivi des colis</h1>
          <p className="mt-2 text-sm text-fg-muted">Générez des codes, mettez à jour les statuts et gérez les suivis clients.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg transition hover:bg-bg-elev"
          >
            <RefreshCw className="size-4" /> Actualiser
          </button>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg transition hover:bg-bg-elev"
            >
              <LogOut className="size-4" /> Déconnexion
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold tracking-tight">Créer un code de suivi</h2>
        <form
          action={async (fd) => {
            await createAction(fd);
            setCode("");
            setNote("");
            setStatus(TRACKING_STATUSES[0]);
            router.refresh();
          }}
          className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_2fr_auto]"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">Code (optionnel)</label>
            <div className="flex gap-2">
              <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ADH-XXXXX"
                className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm font-mono outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={() => setCode(generateCode())}
                className="shrink-0 rounded-2xl border border-line px-4 py-3 text-sm font-medium hover:bg-bg"
              >
                Générer
              </button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Statut</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TrackingStatus)}
              className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            >
              {TRACKING_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Note (optionnel)</label>
            <input
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Départ vol cargo prévu vendredi"
              className="w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={createPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-60"
            >
              <Plus className="size-4" /> {createPending ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
        {createState && !createState.ok && (
          <p className="mt-4 rounded-xl bg-danger/[0.08] px-4 py-3 text-sm text-danger">{createState.error}</p>
        )}
        {createState && createState.ok && (
          <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-strong">
            Code {createState.record.code} créé avec le statut « {createState.record.status} ».
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-bold tracking-tight">Codes existants</h2>
          <span className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-fg-muted">{initialRecords.length} code(s)</span>
        </div>

        {initialRecords.length === 0 ? (
          <p className="mt-6 text-sm text-fg-muted">Aucun code de suivi pour le moment. Créez-en un ci-dessus.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {initialRecords.map((record) => (
              <RecordRow key={record.code} record={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RecordRow({ record }: { record: TrackingRecord }) {
  const router = useRouter();
  const [status, setStatus] = useState<TrackingStatus>(record.status);
  const [note, setNote] = useState(record.note);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setMsg(null); setErr(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("code", record.code);
      fd.set("status", status);
      fd.set("note", note);
      const res = await adminUpdateTracking(null, fd);
      if (res.ok) { setMsg("Mis à jour."); router.refresh(); }
      else setErr(res.error || "Erreur.");
    });
  };

  const remove = () => {
    if (!confirm(`Supprimer ${record.code} ?`)) return;
    setMsg(null); setErr(null);
    startTransition(async () => {
      const res = await adminDeleteTracking(record.code);
      if (res.ok) router.refresh();
      else setErr(res.error || "Erreur.");
    });
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(record.code); setMsg("Code copié."); }
    catch { setMsg(record.code); }
  };

  return (
    <div className="rounded-2xl border border-line bg-bg p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-lg font-semibold">{record.code}</p>
            <button type="button" onClick={copy} className="rounded-lg p-1.5 text-fg-muted hover:bg-bg-elev hover:text-fg" aria-label="Copier le code">
              <Copy className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-xs text-fg-muted">Mis à jour : {formatDate(record.updatedAt)}</p>
        </div>
        <button type="button" onClick={remove} disabled={pending} className="inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/[0.08] disabled:opacity-50">
          <Trash2 className="size-3.5" /> Supprimer
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_auto]">
        <select value={status} onChange={(e) => setStatus(e.target.value as TrackingStatus)} className="w-full rounded-xl border border-line bg-bg-elev px-3 py-2.5 text-sm outline-none focus:border-accent/60">
          {TRACKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note visible dans le contexte interne" className="w-full rounded-xl border border-line bg-bg-elev px-3 py-2.5 text-sm outline-none focus:border-accent/60" />
        <button type="button" onClick={save} disabled={pending} className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-strong disabled:opacity-60">
          {pending ? "..." : "Enregistrer"}
        </button>
      </div>
      {msg && <p className="mt-3 text-xs text-accent-strong">{msg}</p>}
      {err && <p className="mt-3 text-xs text-danger">{err}</p>}
    </div>
  );
}
