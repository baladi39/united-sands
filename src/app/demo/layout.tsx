import type { Metadata } from "next";
import LenisProvider from "@/components/demo/lenis-provider";

export const metadata: Metadata = {
  title: "United Sands — Animation Demo",
  description: "We shape the future",
};

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LenisProvider>{children}</LenisProvider>;
}
