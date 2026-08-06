import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emirates Gold International | World-Class Luxury Jewellery Atelier",
  description: "Discover timeless 22K & 24K gold jewellery, GIA certified solitaires, and royal bridal couture crafted for generations by Emirates Gold International.",
  keywords: ["Emirates Gold", "Luxury Jewellery", "Dubai Gold", "Solitaire Rings", "Bridal Sets", "24K Bullion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAFAF8] text-[#1C1C1C]">
        {children}
      </body>
    </html>
  );
}
