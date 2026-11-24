"use client";

import { useState } from "react";
import { Check, ShoppingBag, X, ArrowRight, ShieldCheck } from "lucide-react";
import { PRODUCTS, PAYMENT_METHODS, type Product, type PaymentMethodId } from "@/lib/products";
import { SITE } from "@/lib/site";
import { MobileMoneyIcon, VisaIcon, MastercardIcon, WhatsAppIcon } from "@/components/BrandIcons";

const paymentIcons: Record<PaymentMethodId, React.ComponentType<{ className?: string }>> = {
  mobile_money: MobileMoneyIcon,
  visa: VisaIcon,
  mastercard: MastercardIcon,
};

function formatUsd(n: number) {
  return new Intl.NumberFormat("fr-CD", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function BoutiqueCatalog() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="group flex flex-col rounded-[1.75rem] border border-line bg-bg-elev p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_rgba(23,24,22,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-fg-muted">{p.category}</span>
              {p.badge && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-text">{p.badge}</span>}
            </div>
            <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-text">
              <ShoppingBag className="size-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-fg">{p.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
            <ul className="mt-4 space-y-2">
              {p.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs text-fg-muted">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-accent-text" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-end justify-between gap-4 pt-5 border-t border-line">
              <div>
                <p className="text-xs text-fg-muted">À partir de</p>
                <p className="font-display text-2xl font-extrabold tracking-tight text-fg">{formatUsd(p.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(p)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong"
              >
                Commander <ArrowRight className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && <CheckoutModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function CheckoutModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Kinshasa");
  const [payment, setPayment] = useState<PaymentMethodId>("mobile_money");
  const [submitted, setSubmitted] = useState(false);

  const total = product.price * qty;
  const paymentLabel = PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? payment;

  const canSubmit = name.trim().length >= 2 && phone.trim().length >= 6;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const whatsappMsg = `Bonjour Adhilix, je souhaite passer commande:\n\nProduit: ${product.name}\nCatégorie: ${product.category}\nQuantité: ${qty}\nTotal estimé: ${formatUsd(total)}\nPaiement: ${paymentLabel}\n\nNom: ${name}\nTéléphone: ${phone}\nVille: ${city}\n\nMerci de m'envoyer le lien/procédure de paiement sécurisé.`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full sm:max-w-2xl overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-bg-elev border border-line shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-elev/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase">Commande</p>
            <h2 className="font-display text-lg font-bold tracking-tight">{product.name}</h2>
          </div>
          <button type="button" onClick={onClose} className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted hover:text-fg" aria-label="Fermer">
            <X className="size-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={submit} className="p-6 space-y-6">
            <div className="rounded-2xl bg-bg p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-display font-semibold">{product.name}</p>
                <p className="text-sm text-fg-muted">{formatUsd(product.price)} / unité</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-9 rounded-full border border-line text-fg">−</button>
                <span className="w-8 text-center font-mono text-sm">{qty}</span>
                <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} className="size-9 rounded-full border border-line text-fg">+</button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet" id="c-name" value={name} onChange={setName} required placeholder="Votre nom" />
              <Field label="Téléphone / WhatsApp" id="c-phone" value={phone} onChange={setPhone} required placeholder="+243 ..." />
            </div>
            <Field label="Ville" id="c-city" value={city} onChange={setCity} placeholder="Kinshasa" />

            <div>
              <p className="mb-3 text-sm font-medium text-fg">Moyen de paiement</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = paymentIcons[m.id];
                  const active = payment === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition ${active ? "border-accent bg-accent/[0.06]" : "border-line hover:border-accent/30"}`}
                    >
                      <input type="radio" name="payment" value={m.id} checked={active} onChange={() => setPayment(m.id)} className="sr-only" />
                      <Icon className={m.id === "mobile_money" ? "h-8 w-auto max-w-[96px]" : "h-8 w-auto max-w-[72px]"} />
                      <div>
                        <p className="text-sm font-semibold text-fg">{m.label}</p>
                        <p className="text-xs text-fg-muted">{m.description}</p>
                      </div>
                      {active && <span className="absolute right-3 top-3 size-5 rounded-full bg-accent text-accent-ink flex items-center justify-center"><Check className="size-3" /></span>}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-bg px-4 py-4">
              <span className="text-sm text-fg-muted">Total estimé</span>
              <span className="font-display text-2xl font-extrabold tracking-tight">{formatUsd(total)}</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-fg-muted">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-text" />
              <p>Après confirmation, notre équipe vous envoie la procédure/lien de paiement sécurisé ({paymentLabel}) et confirme la disponibilité.</p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-50"
            >
              Procéder au paiement
            </button>
          </form>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent-text">
              <Check className="size-7" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">Commande prête à finaliser</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              Votre commande de <span className="font-semibold text-fg">{product.name}</span> ({qty}×) pour <span className="font-semibold text-fg">{formatUsd(total)}</span> a été préparée.
              Paiement sélectionné : <span className="font-semibold text-fg">{paymentLabel}</span>.
            </p>
            <div className="mt-6 rounded-2xl bg-bg p-4 text-left text-sm text-fg-muted space-y-1">
              <p><span className="text-fg font-medium">Nom :</span> {name}</p>
              <p><span className="text-fg font-medium">Téléphone :</span> {phone}</p>
              <p><span className="text-fg font-medium">Ville :</span> {city}</p>
            </div>
            <p className="mt-5 text-sm text-fg-muted">
              Cliquez ci-dessous pour envoyer votre commande sur WhatsApp. Notre équipe vous transmettra le lien/procédure de paiement sécurisé {paymentLabel}.
            </p>
            <a
              href={SITE.whatsappLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-[#123b20] transition hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon className="size-4" />
              Finaliser sur WhatsApp
            </a>
            <button type="button" onClick={onClose} className="mt-3 w-full rounded-2xl border border-line px-6 py-3.5 text-sm font-semibold text-fg hover:bg-bg">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, value, onChange, placeholder, required }: { label: string; id: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
