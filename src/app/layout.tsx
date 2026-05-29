import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { company } from "@/data/company";
import { siteGraph } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE_DEFAULT =
  "Sloopbedrijf Goeree-Overflakkee | Sloop, Ruiming & Demontage";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: TITLE_DEFAULT,
    template: "%s | Ruimingswerken Flakkee",
  },
  description: company.description,
  applicationName: company.legalName,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "sloopbedrijf Goeree-Overflakkee",
    "sloopbedrijf in de buurt",
    "sloopbedrijf Flakkee",
    "ruimingswerken Flakkee",
    "ruimingsbedrijf Goeree-Overflakkee",
    "sloopwerken Goeree-Overflakkee",
    "sloper Goeree-Overflakkee",
    "slopen Middelharnis",
    "sloopbedrijf Middelharnis",
    "ontruiming Goeree-Overflakkee",
    "woningontruiming Flakkee",
    "bedrijfsontruiming Goeree-Overflakkee",
    "demontage Goeree-Overflakkee",
    "betonsloop Goeree-Overflakkee",
    "betonvloer verwijderen",
    "terreinsanering Goeree-Overflakkee",
    "schuur slopen Flakkee",
    "afvoer sloopafval Flakkee",
    "sloopbedrijf Ouddorp",
    "sloopbedrijf Dirksland",
    "sloopbedrijf Sommelsdijk",
    "sloopbedrijf Oude-Tonge",
    "sloopbedrijf Stellendam",
    "sloop en ruiming Zuid-Holland",
  ],
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "Sloop en ruimingswerken",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: company.url,
    siteName: company.legalName,
    title: TITLE_DEFAULT,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: company.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Zet GOOGLE_SITE_VERIFICATION in je environment om de Search Console
  // HTML-tag te activeren (alternatief voor DNS- of bestandsverificatie).
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0c2340",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <noscript>
          {/* Reveal-animaties zijn JS-gestuurd; zonder JS direct zichtbaar tonen. */}
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={siteGraph()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
