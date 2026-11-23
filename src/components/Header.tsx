"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLang, type Lang } from "@/components/LanguageProvider";

const NAV = [
  { href: "/boutique", key: "nav.boutique" },
  { href: "/#services", key: "nav.services" },
  { href: "/#processus", key: "nav.process" },
  { href: "/suivi", key: "nav.tracking" },
  { href: "/faq", key: "nav.faq" },
  { href: "/contact", key: "nav.contact" },
] as const;

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5">
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-wide transition ${
            lang === l ? "bg-accent text-accent-ink" : "text-fg-inverse-muted hover:text-fg-inverse"
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-white/10 bg-bg-inverse/72 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:h-16 sm:px-4">
          <Link href="/" className="inline-flex shrink-0 items-center pl-1" aria-label="Adhilix, accueil">
            <Image src="/images/logo.png" alt="Adhilix" width={2080} height={550} priority className="h-8 w-auto sm:h-9" />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigation principale">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[13px] font-medium text-fg-inverse-muted transition hover:bg-white/[0.06] hover:text-fg-inverse whitespace-nowrap"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LangToggle />
            <a
              href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong whitespace-nowrap"
            >
              <WhatsAppIcon className="size-4" />
              {t("nav.whatsapp")}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LangToggle />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg-inverse"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-bg-inverse/96 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="container-shell flex h-full flex-col pt-28 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-2" aria-label="Navigation mobile">
            {NAV.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-fg-inverse transition hover:bg-white/5">
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link href="/suivi" className="inline-flex items-center justify-center gap-2 rounded-full border border-line-inverse px-5 py-4 text-sm font-semibold text-fg-inverse">
              {t("nav.track")}
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-sm font-semibold text-accent-ink"
            >
              <WhatsAppIcon className="size-4" />
              {t("nav.whatsappLong")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
