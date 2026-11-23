"use server";

type ContactState = { ok: boolean; error?: string } | null;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Veuillez remplir tous les champs obligatoires." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Adresse e-mail invalide." };
  }

  const to = "hello@adhilix.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fallback: no provider configured. Return a specific error with mailto hint.
    return {
      ok: false,
      error: `Envoi automatique non configuré. Écrivez-nous directement à ${to}.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Adhilix <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: subject ? `[Contact Adhilix] ${subject}` : `[Contact Adhilix] Message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      return { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous directement à hello@adhilix.com." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous directement à hello@adhilix.com." };
  }
}
