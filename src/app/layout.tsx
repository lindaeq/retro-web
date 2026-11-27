import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Courier_Prime, Righteous, Roboto, Silkscreen, VT323 } from "next/font/google";
import "./globals.css";

const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: "--righteous", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--roboto", display: "swap" });
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
    <html lang="en" className={`${righteous.variable} ${roboto.variable} ${vt323.variable} ${silkscreen.variable} ${courier.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
