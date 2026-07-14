import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers";

// Single-typeface system: the PSB design sets everything in Inter — Bold for
// the hero + statements, SemiBold for section titles, Light/Regular for body.
// We ship Inter's variable file (weight 100–900) on the --font-inter slot that
// the `.font-inter` utility, inline styles, and the body fall back to.
const inter = localFont({
  src: "../../public/fonts/Inter-Variable.ttf",
  weight: "100 900",
  variable: "--font-inter",
});

// Canonical origin for absolute OG/Twitter image URLs. Resolves automatically
// on Vercel (production domain), overridable via NEXT_PUBLIC_SITE_URL, and falls
// back to the current deployment URL for local/preview builds.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://united-sands.vercel.app");

const title = "United Sands | We Shape the Future";
const description =
  "A Saudi-born technology consultancy engineering the next era of smart cities, digital twins, and geospatial intelligence.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // opengraph-image.png / twitter-image.png in this folder are wired up
  // automatically by Next; these fields enrich the share preview.
  openGraph: {
    type: "website",
    siteName: "United Sands",
    title,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
