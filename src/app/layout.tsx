import type { Metadata, Viewport } from "next";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { LanguageProvider } from "@/components/LanguageProvider";

const siteUrl = "https://adhilix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adhilix | Achat & Expédition Europe → RDC",
    template: "%s | Adhilix",
  },
  description:
    "Adhilix achète pour vous sneakers, streetwear et articles de luxe en Europe, puis les expédie en RDC avec un suivi transparent de bout en bout.",
  keywords: [
    "Adhilix",
    "achat Europe RDC",
    "expédition Kinshasa",
    "sneakers RDC",
    "personal shopping Europe",
    "fret aérien Kinshasa",
  ],
  openGraph: {
    title: "Adhilix | Achat & Expédition Europe → RDC",
    description:
      "Personal shopping en Europe, fret aérien et suivi transparent jusqu'à Kinshasa.",
    url: siteUrl,
    siteName: "Adhilix",
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhilix | Achat & Expédition Europe → RDC",
    description:
      "Personal shopping en Europe, fret aérien et suivi transparent jusqu'à Kinshasa.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Adhilix",
    url: siteUrl,
    description: metadata.description,
    telephone: "+243815828281",
    areaServed: ["CD", "FR", "BE"],
    address: { "@type": "PostalAddress", addressLocality: "Kinshasa", addressCountry: "CD" },
    sameAs: ["https://wa.me/243815828281"],
  };

  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-fg overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
