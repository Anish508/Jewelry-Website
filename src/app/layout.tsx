import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-[#FAFAF8] text-[#1C1C1C]">
        {children}
      </body>
    </html>
  );
}
