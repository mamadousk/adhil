"use client";

import { useActionState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { sendContact } from "@/app/contact/actions";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, null);

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent-strong">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">Message envoyé</h3>
        <p className="mt-2 text-sm text-fg-muted">
          Merci pour votre message. Nous vous répondrons dès que possible à l&apos;adresse indiquée.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-3xl border border-line bg-bg-elev p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" name="name" required placeholder="Votre nom" />
        <Field label="Adresse e-mail" name="email" type="email" required placeholder="vous@exemple.com" />
      </div>
      <Field label="Sujet (optionnel)" name="subject" placeholder="Objet de votre message" />
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Décrivez votre besoin, votre commande ou votre question..."
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20 resize-y"
        />
      </div>

      {state?.error && (
        <p className="rounded-xl bg-danger/[0.08] px-4 py-3 text-sm text-danger">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong disabled:opacity-60"
      >
        <Send className="size-4" />
        {pending ? "Envoi..." : "Envoyer le message"}
      </button>

      <p className="text-xs text-fg-muted text-center">
        Vous pouvez aussi nous écrire directement à{" "}
        <a href="mailto:hello@adhilix.com" className="font-medium text-accent-strong underline decoration-accent/40 underline-offset-4">
          hello@adhilix.com
        </a>
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-fg">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
