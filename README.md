# Adhilix

Site web officiel d'**Adhilix** — personal shopping en Europe et fret aérien vers la RDC.

## Stack

- **Next.js 16** (App Router, Cache Components / PPR)
- **TypeScript** strict
- **React 19**
- **Tailwind CSS v4**
- **GSAP 3 + ScrollTrigger** via `@gsap/react`
- **Lenis** (défilement fluide)
- **Animations CSS** (dérives, orbites, hero animé) + **canvas 2D** (réseau de particules léger)
- **lucide-react** + SVG de marques inline (`src/components/BrandIcons.tsx`)
- **Polices auto-hébergées** via Fontsource : Plus Jakarta Sans, Inter, JetBrains Mono

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — serveur de production
- `npm run lint` — ESLint

## Structure

```
src/
  app/                  # Routes App Router (/, /suivi, /faq, /cgv, /commandes-retours)
  components/
    home/               # Sections de la page d'accueil
    BrandIcons.tsx      # Icônes SVG de marques (WhatsApp, Nike, Adidas, etc.)
    Header.tsx          # Navigation
    Footer.tsx          # Pied de page
    SmoothScroll.tsx    # Lenis + GSAP ticker
    ParticleCanvas.tsx  # Réseau de particules 2D (hero)
    Reveal.tsx          # Animations d'apparition au scroll (GSAP)
    TrackingForm.tsx    # Formulaire de suivi ADH-XXXXX
  lib/
    site.ts             # Contenu et constantes du site
```

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com). Connectez le dépôt, importez le projet, et Vercel détectera automatiquement Next.js.
