import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { company } from "@/data/company";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — ${company.slogan}`,
    template: `%s | ${company.name}`,
  },
  description: company.tagline,
  applicationName: company.name,
  keywords: [
    "sloop",
    "ruiming",
    "demontage",
    "ontruiming",
    "Goeree-Overflakkee",
    "Middelharnis",
    "Sommelsdijk",
    "Ouddorp",
    "Goedereede",
    "betonsloop",
    "terreinsanering",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: company.url,
    siteName: company.name,
    title: `${company.name} — ${company.slogan}`,
    description: company.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
