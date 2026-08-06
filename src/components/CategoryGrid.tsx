"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/jewelleryData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export const CategoryGrid: React.FC = () => {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isDragging,
    dragProps,
  } = useHorizontalScroll({ enableWheel: true });

  return (
    <section id="categories" className="py-20 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
                Crafted Purity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
                Shop By Category
              </h2>
            </div>
            <p className="text-sm text-[#5A5A5A] max-w-md mt-2 md:mt-0">
              Select your preferred jewellery style from our master craftsmen. Each piece is hallmarked with certified weight and karat purity.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontally Scrollable Categories */}
        <ScrollReveal delay={150}>
          <div
            ref={containerRef}
            {...dragProps}
            className={`flex gap-4 overflow-x-auto no-scrollbar scroll-snap-x pb-4 pt-1 px-1 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="flex-none w-[180px] sm:w-[210px] scroll-snap-item group relative bg-[#FAFAF8] rounded-2xl p-4 border border-[#EAE8E4] text-center luxury-card cursor-pointer"
              >
                <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-[#F7F4EF]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1C1C1C] group-hover:text-[#C7A13A] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#5A5A5A] block mt-0.5 font-medium">
                  {cat.itemCount}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
