"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Gem } from "lucide-react";

export const DiamondMagazine: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAFAF8] border-b border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Large Feature Image */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-[#F7F4EF] border border-[#EAE8E4] h-[480px] sm:h-[600px] luxury-card">
            <Image
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=85&w=1200"
              alt="High Jewellery Diamond Atelier"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
              <span className="px-3 py-1 bg-[#C7A13A] text-xs font-bold uppercase tracking-widest text-[#1C1C1C] rounded-full inline-flex items-center">
                <Gem className="w-3.5 h-3.5 mr-1" /> High Atelier Edition
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                The Rare Solitaire Collection
              </h3>
              <p className="text-sm text-gray-200 font-light max-w-lg">
                Each diamond is hand-selected in Antwerp and Dubai for exceptional clarity (VVS1+), D-F color grade, and precision ideal cuts.
              </p>
            </div>
          </div>

          {/* Right Supporting Editorial Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
                Editorial Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
                Unrivaled Brilliance & Craft
              </h2>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                Emirates Gold International diamond atelier combines classic European prong setting with modern micro-pave contours, creating pieces that shimmer under any light.
              </p>
            </div>

            {/* 2 Supporting Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="relative h-48 rounded-xl overflow-hidden group bg-[#F7F4EF] border border-[#EAE8E4]">
                <Image
                  src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=500"
                  alt="Diamond Cascade"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-serif font-bold text-sm block">Cascade Drops</span>
                  <span className="text-[10px] text-gray-300">18K Rose Gold</span>
                </div>
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden group bg-[#F7F4EF] border border-[#EAE8E4]">
                <Image
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=500"
                  alt="Solitaire Ring"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-serif font-bold text-sm block">Marquise Halo</span>
                  <span className="text-[10px] text-gray-300">GIA Certified</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#trending"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#1C1C1C] hover:text-[#C7A13A] transition"
              >
                <span>View Full Diamond Catalogue</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
