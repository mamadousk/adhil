"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { useLang } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLang();
  const footerLinks = [
    {
      title: t("footer.nav"),
      links: [
        { label: t("nav.boutique"), href: "/boutique" },
        { label: t("nav.services"), href: "/#services" },
        { label: t("nav.process"), href: "/#processus" },
        { label: t("nav.tracking"), href: "/suivi" },
        { label: "FAQ", href: "/faq" },
        { label: t("nav.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: "CGV / CGS", href: "/cgv" },
        { label: t("cta.returns"), href: "/commandes-retours" },
      ],
    },
  ];

  return (
    <footer className="relative bg-bg-inverse text-fg-inverse pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 grid-fade opacity-40" aria-hidden="true" />
      <div className="container-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <Image src="/images/logo.png" alt="Adhilix" width={852} height={219} className="h-11 w-auto" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-fg-inverse-muted">{t("footer.desc")}</p>
            <a href={SITE.whatsappLink("Bonjour Adhilix, je souhaite passer une commande.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
              <WhatsAppIcon className="size-4" />
              {t("nav.whatsappLong")}
            </a>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-fg-inverse-muted">{group.title}</p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-fg-inverse/85 transition hover:text-accent">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-fg-inverse-muted">{t("footer.contact")}</p>
            <ul className="mt-5 space-y-3 text-sm text-fg-inverse/85">
              <li>
                <a href={SITE.whatsappLink("Bonjour Adhilix, j'ai une question.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-accent">
                  WhatsApp <ArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li><a href="mailto:hello@adhilix.com" className="transition hover:text-accent">hello@adhilix.com</a></li>
              <li>{SITE.whatsappNumber}</li>
              <li>{SITE.location}</li>
              <li className="text-fg-inverse-muted">{t("footer.warehouses")} {SITE.warehouses}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-inverse pt-6 text-xs text-fg-inverse-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Adhilix. {t("footer.rights")}</p>
          <p>{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
