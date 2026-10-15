import type { Metadata, Viewport } from "next";
import { Caveat, Manrope, Oswald } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const display = Oswald({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["600"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sys&cotech клуб | Танилцуулга",
  description: "Идэвхгүй гишүүдэд зориулсан sys&cotech клубийн танилцуулга",
  openGraph: {
    title: "sys&cotech клуб",
    description: "Идэвхгүй гишүүдэд зориулсан танилцуулга",
    type: "website",
    locale: "mn_MN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mn"
      className={`${display.variable} ${body.variable} ${hand.variable}`}
    >
      <body className="font-body">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
