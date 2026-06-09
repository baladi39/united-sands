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

export const metadata: Metadata = {
  title: "United Sands — We Shape the Future",
  description:
    "A Saudi-born technology consultancy engineering the next era of smart cities, digital twins, and geospatial intelligence.",
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
