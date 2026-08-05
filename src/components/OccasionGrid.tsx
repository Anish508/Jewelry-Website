"use client";

import React from "react";
import Image from "next/image";
import { OCCASIONS } from "@/data/jewelleryData";

export const OccasionGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
            Celebrate Life's Milestones
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1C1C] tracking-wide">
            Shop By Occasion
          </h2>
          <div className="w-12 h-0.5 bg-[#C7A13A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {OCCASIONS.map((occ, idx) => (
            <div
              key={idx}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#FAFAF8] border border-[#EAE8E4] luxury-card cursor-pointer"
            >
              <Image
                src={occ.image}
                alt={occ.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-center space-y-1">
                <h3 className="font-serif text-base font-semibold text-[#FAFAF8] group-hover:text-[#C7A13A] transition-colors tracking-wide">
                  {occ.name}
                </h3>
                <p className="text-[10px] text-gray-300 line-clamp-1">
                  {occ.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
