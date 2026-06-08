import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const oswald = localFont({
  src: [
    { path: "../../public/fonts/Oswald-Light.ttf", weight: "300" },
    { path: "../../public/fonts/Oswald-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Oswald-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Oswald-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Oswald-Bold.ttf", weight: "700" },
  ],
  variable: "--font-oswald",
});

const roboto = localFont({
  src: [
    { path: "../../public/fonts/Roboto-Light.ttf", weight: "300" },
    { path: "../../public/fonts/Roboto-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Roboto-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/Roboto-Bold.ttf", weight: "700" },
  ],
  variable: "--font-roboto",
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
      <body className={`${oswald.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
