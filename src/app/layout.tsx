import type { Metadata } from "next";
import { Courier_Prime, Righteous, Silkscreen, VT323 } from "next/font/google";
import "./globals.css";

const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: "--righteous", display: "swap" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--vt", display: "swap" });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"], variable: "--silk", display: "swap" });
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linda Qi",
  description: "cs @ uwaterloo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${righteous.variable} ${vt323.variable} ${silkscreen.variable} ${courier.variable}`}>
      <body>{children}</body>
    </html>
  );
}
