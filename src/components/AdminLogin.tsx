"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { loginAdmin } from "@/app/mamadousk/actions";

export function AdminLogin() {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAdmin, null);

  useEffect(() => {
    if (state && !state.error) {
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-line bg-bg-elev p-8">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-text">
          <Lock className="size-5" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">Accès administration</h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Cette page est réservée à l&apos;administration Adhilix.
        </p>

        <form action={action} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-fg">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              placeholder="Entrez le mot de passe"
            />
          </div>
          {state?.error && (
            <p className="rounded-xl bg-danger/[0.08] px-4 py-3 text-sm text-danger">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-60"
          >
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
