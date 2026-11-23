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

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center rounded-full border border-line-inverse bg-white/[0.04] p-1 ${className}`}>
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition ${
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? "bg-bg-inverse/88 backdrop-blur-xl border-b border-line-inverse" : "bg-transparent"
        }`}
      >
        <div className="container-shell flex h-18 items-center justify-between gap-3 md:h-20">
          <Link href="/" className="relative z-10 inline-flex items-center shrink-0" aria-label="Adhilix, accueil">
            <Image src="/images/logo.png" alt="Adhilix" width={852} height={219} priority className="h-10 w-auto md:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-line-inverse bg-white/[0.04] p-1.5 backdrop-blur-md md:flex" aria-label="Navigation principale">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-fg-inverse-muted transition hover:text-fg-inverse hover:bg-white/[0.06]"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LangToggle />
            <Link
              href="/suivi"
              className="inline-flex items-center gap-2 rounded-full border border-line-inverse px-4 py-2.5 text-sm font-semibold text-fg-inverse transition hover:bg-white/5"
            >
              {t("nav.track")}
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
            >
              <WhatsAppIcon className="size-4" />
              {t("nav.whatsapp")}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LangToggle />
            <button
              type="button"
              className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-line-inverse text-fg-inverse"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 bg-bg-inverse transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="container-shell flex h-full flex-col pt-28 pb-10">
          <nav className="flex flex-col gap-2" aria-label="Navigation mobile">
            {NAV.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-fg-inverse transition hover:bg-white/5">
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
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
