"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FEATURED_COLLECTIONS } from "@/data/jewelleryData";
import { ScrollReveal } from "@/components/ScrollReveal";

export const FeaturedCollections: React.FC = () => {
  return (
    <section id="collections" className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
              Curated Atelier Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1C1C]">
              Featured Collections
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A13A] mx-auto mt-4" />
            <p className="text-sm sm:text-base text-[#5A5A5A] pt-2">
              Explore handcrafted masterpieces created with certified 22K gold, brilliant solitaires, and royal heritage designs.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop 4-Column Grid / Mobile Swipe Carousel */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar scroll-snap-x pb-4 sm:pb-0">
          {FEATURED_COLLECTIONS.map((collection, idx) => (
            <ScrollReveal key={collection.id} delay={idx * 100}>
              <div className="flex-none w-[280px] sm:w-auto scroll-snap-item group relative bg-[#F7F4EF] rounded-2xl overflow-hidden border border-[#EAE8E4] luxury-card cursor-pointer">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Badge Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#1C1C1C]/80 text-[#FAFAF8] text-[10px] uppercase tracking-widest font-semibold rounded-full border border-[#C7A13A]/40 backdrop-blur-sm">
                      {collection.tag}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-[#FAFAF8] group-hover:text-[#C7A13A] transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {collection.subtitle}
                    </p>
                    <div className="pt-2 flex items-center text-xs font-semibold text-[#C7A13A] group-hover:translate-x-1 transition-transform">
                      <span>Explore Atelier</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
