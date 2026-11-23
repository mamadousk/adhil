"use client";

import { useMemo, useState } from "react";
import { Search, PackageCheck, Clock, Plane, Warehouse, MapPin, CheckCircle2 } from "lucide-react";

type Status = {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STATUSES: Status[] = [
  { label: "Commande confirmée", description: "Votre demande a été validée et l'achat est lancé.", icon: CheckCircle2 },
  { label: "Reçu à l'entrepôt", description: "L'article est arrivé dans notre entrepôt en Europe.", icon: Warehouse },
  { label: "Contrôle & emballage", description: "Authenticité vérifiée et emballage renforcé préparé.", icon: PackageCheck },
  { label: "En vol vers Kinshasa", description: "Votre colis est en transit par fret aérien.", icon: Plane },
  { label: "Arrivée à Kinshasa", description: "Arrivé à destination, formalités en cours.", icon: MapPin },
  { label: "Prêt à récupérer", description: "Votre colis est disponible au retrait ou en livraison.", icon: Clock },
];

function normalizeCode(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function getDemoProgress(code: string) {
  // Deterministic demo status based on code characters.
  let sum = 0;
  for (const ch of code) sum += ch.charCodeAt(0);
  return (sum % STATUSES.length) + 1;
}

export function TrackingForm() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const normalized = normalizeCode(input);

  const result = useMemo(() => {
    if (!submitted) return null;
    const code = normalizeCode(submitted);
    if (!/^ADH-[A-Z0-9]{5}$/.test(code)) {
      return { kind: "invalid" as const, code };
    }
    return { kind: "found" as const, code, progress: getDemoProgress(code) };
  }, [submitted]);

  return (
    <div className="mx-auto max-w-3xl">
      <form
        className="rounded-3xl border border-line bg-bg-elev p-3 sm:p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(input);
        }}
      >
        <label htmlFor="tracking-code" className="sr-only">
          Code de suivi
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
            <input
              id="tracking-code"
              name="tracking-code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Entrez votre code, ex. ADH-7K2M9"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-2xl border border-line bg-bg py-4 pl-11 pr-4 font-mono text-sm text-fg outline-none transition placeholder:text-fg-muted/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-50"
            disabled={normalized.length === 0}
          >
            Suivre mon colis
          </button>
        </div>
        <p className="mt-3 px-1 text-xs text-fg-muted">
          Format attendu : <span className="font-mono">ADH-XXXXX</span>. Le code vous est communiqué dès l&apos;enregistrement de votre expédition.
        </p>
      </form>

      {result?.kind === "invalid" && (
        <div className="mt-6 rounded-3xl border border-danger/20 bg-danger/[0.04] p-6">
          <p className="font-display text-lg font-semibold text-fg">Code invalide</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            <span className="font-mono">{result.code || "—"}</span> n&apos;est pas un code de suivi Adhilix valide.
            Vérifiez le format <span className="font-mono">ADH-XXXXX</span> (5 caractères lettres/chiffres).
          </p>
        </div>
      )}

      {result?.kind === "found" && (
        <div className="mt-6 rounded-3xl border border-line bg-bg-elev p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">Suivi de colis</p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-fg">{result.code}</p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent-strong">
              <span className="size-2 rounded-full bg-accent-strong animate-pulse-soft" />
              Étape {result.progress} sur {STATUSES.length}
            </div>
          </div>

          <div className="mt-8 space-y-0">
            {STATUSES.map((status, i) => {
              const done = i < result.progress;
              const current = i === result.progress - 1;
              const Icon = status.icon;
              return (
                <div key={status.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${
                        done
                          ? "border-accent/40 bg-accent/15 text-accent-strong"
                          : "border-line bg-bg text-fg-muted/50"
                      } ${current ? "ring-2 ring-accent/25" : ""}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    {i < STATUSES.length - 1 && (
                      <div className={`my-1 w-px flex-1 min-h-8 ${done && !current ? "bg-accent/40" : "bg-line"}`} />
                    )}
                  </div>
                  <div className="pb-7 pt-1.5">
                    <p className={`font-display text-sm font-semibold ${done ? "text-fg" : "text-fg-muted/60"}`}>
                      {status.label}
                      {current && <span className="ml-2 text-xs font-medium text-accent-strong">(actuel)</span>}
                    </p>
                    <p className={`mt-1 text-sm leading-relaxed ${done ? "text-fg-muted" : "text-fg-muted/45"}`}>
                      {status.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-2 rounded-2xl bg-bg px-4 py-3 text-xs leading-relaxed text-fg-muted">
            Ceci est une démonstration d&apos;interface. Pour le statut réel de votre commande, contactez-nous sur WhatsApp avec votre code.
          </p>
        </div>
      )}
    </div>
  );
}
