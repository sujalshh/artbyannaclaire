import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import { ButterflyLayer } from "@/components/ButterflyLayer";
import { Footer } from "@/components/Footer";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Hand-painted banners & custom gifts`,
  description: BRAND.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${pacifico.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen antialiased" suppressHydrationWarning>
        <ButterflyLayer />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
