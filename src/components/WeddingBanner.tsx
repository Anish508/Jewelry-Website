"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const WeddingBanner: React.FC = () => {
  return (
    <section id="bridal" className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#1C1C1C]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1920"
          alt="Royal Wedding Collection"
          fill
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
      </div>

      <ScrollReveal>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C7A13A]/20 border border-[#C7A13A] text-[#C7A13A] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Royal Arabian Couture</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-medium tracking-wide max-w-3xl mx-auto leading-tight text-[#FAFAF8]">
            The Royal Wedding Collection
          </h2>

          <p className="text-base sm:text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Crafted for the bride who demands eternal majesty. Explore bespoke 22K gold chokers, multilayered haars, and GIA-certified solitaire diamond tiara sets.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href="#trending"
              className="inline-flex items-center px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#0F0E0C] bg-[#C7A13A] rounded-full hover:bg-white transition duration-300 gold-glow"
            >
              View Bridal Lookbook
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
