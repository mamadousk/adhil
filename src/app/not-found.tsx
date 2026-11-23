import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center pt-32 pb-24">
      <div className="container-shell text-center">
        <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">Erreur 404</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-fg-muted">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/suivi"
            className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-fg transition hover:bg-bg-elev"
          >
            Suivre un colis
          </Link>
        </div>
      </div>
    </main>
  );
}
