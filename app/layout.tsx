import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import "./globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SolarCards — How to Play Battle Mode",
  description:
    "Learn SolarCards Battle Mode: build your celestial system, attack your rivals and summon the ultimate celestial card.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lilita.variable} ${nunito.variable}`}>
      <body className="bg-space-black text-ink antialiased">{children}</body>
    </html>
  );
}
