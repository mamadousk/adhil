"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE } from "@/lib/site";
import { useLang } from "@/components/LanguageProvider";

export function ContactContent() {
  const { t } = useLang();
  const cards = [
    { icon: Mail, title: t("contact.email"), value: "hello@adhilix.com", href: "mailto:hello@adhilix.com", note: t("contact.emailNote") },
    { icon: MapPin, title: t("contact.location"), value: "Kinshasa, RDC", note: t("contact.locationNote") },
    { icon: Clock, title: t("contact.fast"), value: t("contact.fastValue"), href: SITE.whatsappLink("Bonjour Adhilix, j'ai une question."), note: t("contact.fastNote") },
  ];

  return (
    <main className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-[0.25em] text-fg-muted uppercase">{t("contact.kicker")}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">{t("contact.title")}</h1>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{t("contact.desc")}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, title, value, href, note }) => (
            <div key={title} className="rounded-3xl border border-line bg-bg-elev p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-strong"><Icon className="size-5" /></div>
              <p className="mt-4 font-display font-semibold">{title}</p>
              {href ? (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-1 block text-sm font-medium text-fg hover:text-accent-strong">{value}</a>
              ) : (
                <p className="mt-1 text-sm font-medium text-fg">{value}</p>
              )}
              <p className="mt-2 text-sm text-fg-muted">{note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <ContactForm />
          <div className="rounded-3xl bg-bg-inverse p-8 text-fg-inverse sm:p-10">
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{t("contact.side.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">{t("contact.side.title")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-inverse-muted">{t("contact.side.desc")}</p>
            <a href={SITE.whatsappLink("Bonjour Adhilix, j'ai une question.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong">
              <WhatsAppIcon className="size-4" />
              {t("contact.side.cta")}
            </a>
            <div className="mt-10 border-t border-line-inverse pt-8 space-y-4 text-sm text-fg-inverse-muted">
              <p><span className="text-fg-inverse font-medium">{t("contact.side.emailLabel")}</span> hello@adhilix.com</p>
              <p><span className="text-fg-inverse font-medium">{t("contact.side.waLabel")}</span> {SITE.whatsappNumber}</p>
              <p><span className="text-fg-inverse font-medium">{t("contact.side.zoneLabel")}</span> {t("contact.side.zoneValue")}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
