"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, PackageCheck, Clock, Plane, Warehouse, MapPin, CheckCircle2 } from "lucide-react";
import { publicGetTracking } from "@/app/mamadousk/actions";
import { TRACKING_STATUSES, type TrackingRecord } from "@/lib/tracking-types";
import { useLang } from "@/components/LanguageProvider";

const ICONS = [CheckCircle2, Warehouse, PackageCheck, Plane, MapPin, Clock];

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function TrackingForm() {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<
    | null
    | { kind: "invalid"; code: string }
    | { kind: "notfound"; code: string }
    | { kind: "found"; record: TrackingRecord }
  >(null);
  const [pending, startTransition] = useTransition();

  const normalized = normalizeCode(input);
  const statusLabels = lang === "en"
    ? ["Order confirmed", "Received at warehouse", "Check & packaging", "In flight to Kinshasa", "Arrived in Kinshasa", "Ready for pickup"]
    : [...TRACKING_STATUSES];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = normalizeCode(input);
    if (!/^ADH-[A-Z0-9]{5}$/.test(code)) {
      setResult({ kind: "invalid", code });
      return;
    }
    startTransition(async () => {
      const record = await publicGetTracking(code);
      if (record) setResult({ kind: "found", record });
      else setResult({ kind: "notfound", code });
    });
  };

  const progress = useMemo(() => {
    if (result?.kind !== "found") return -1;
    return TRACKING_STATUSES.indexOf(result.record.status);
  }, [result]);

  return (
    <div className="mx-auto max-w-3xl">
      <form className="rounded-3xl border border-line bg-bg-elev p-3 sm:p-4" onSubmit={onSubmit}>
        <label htmlFor="tracking-code" className="sr-only">{t("tracking.kicker")}</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
            <input
              id="tracking-code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("tracking.placeholder")}
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-2xl border border-line bg-bg py-4 pl-11 pr-4 font-mono text-sm text-fg outline-none transition placeholder:text-fg-muted/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <button type="submit" className="rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-50" disabled={normalized.length === 0 || pending}>
            {pending ? t("tracking.loading") : t("tracking.btn")}
          </button>
        </div>
        <p className="mt-3 px-1 text-xs text-fg-muted">
          {t("tracking.format")} <span className="font-mono">ADH-XXXXX</span>. {t("tracking.formatNote")}
        </p>
      </form>

      {result?.kind === "invalid" && (
        <div className="mt-6 rounded-3xl border border-danger/20 bg-danger/[0.04] p-6">
          <p className="font-display text-lg font-semibold text-fg">{t("tracking.invalidTitle")}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            <span className="font-mono">{result.code || "—"}</span> {t("tracking.invalidDesc")} <span className="font-mono">ADH-XXXXX</span>.
          </p>
        </div>
      )}

      {result?.kind === "notfound" && (
        <div className="mt-6 rounded-3xl border border-line bg-bg-elev p-6">
          <p className="font-display text-lg font-semibold text-fg">{t("tracking.notfoundTitle")}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {t("tracking.notfoundDesc")} <span className="font-mono">{result.code}</span>. {t("tracking.notfoundHelp")}
          </p>
        </div>
      )}

      {result?.kind === "found" && (
        <div className="mt-6 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">{t("tracking.kicker")}</p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-fg">{result.record.code}</p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent-text">
              <span className="size-2 rounded-full bg-accent-strong animate-pulse-soft" />
              {statusLabels[progress] || result.record.status}
            </div>
          </div>

          {result.record.note && (
            <p className="mt-5 rounded-2xl bg-bg px-4 py-3 text-sm text-fg-muted">
              <span className="font-medium text-fg">{t("tracking.note")}</span> {result.record.note}
            </p>
          )}

          <div className="mt-8 space-y-0">
            {statusLabels.map((status, i) => {
              const done = i <= progress;
              const current = i === progress;
              const Icon = ICONS[i];
              return (
                <div key={status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${done ? "border-accent/40 bg-accent/15 text-accent-text" : "border-line bg-bg text-fg-muted/50"} ${current ? "ring-2 ring-accent/25" : ""}`}>
                      <Icon className="size-4" />
                    </div>
                    {i < statusLabels.length - 1 && <div className={`my-1 w-px flex-1 min-h-8 ${done && !current ? "bg-accent/40" : "bg-line"}`} />}
                  </div>
                  <div className="pb-7 pt-1.5">
                    <p className={`font-display text-sm font-semibold ${done ? "text-fg" : "text-fg-muted"}`}>
                      {status}
                      {current && <span className="ml-2 text-xs font-medium text-accent-text">{t("tracking.current")}</span>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-2 text-xs text-fg-muted">
            {t("tracking.updated")} {new Date(result.record.updatedAt).toLocaleString(lang === "en" ? "en-US" : "fr-CD", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      )}
    </div>
  );
}
