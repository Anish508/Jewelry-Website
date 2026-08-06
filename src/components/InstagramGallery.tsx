"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const InstagramGallery: React.FC = () => {
  const posts = [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A] flex items-center justify-center space-x-1">
            <Camera className="w-4 h-4 mr-1" /> @EmiratesGoldOfficial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C] mt-1">
            Follow Our Atelier Journey
          </h2>
        </div>
      </ScrollReveal>

      {/* Desktop Masonry / Mobile Horizontal Scroll */}
      <ScrollReveal delay={150}>
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-6 gap-3 overflow-x-auto no-scrollbar scroll-snap-x px-4 sm:px-8 touch-pan-y">
          {posts.map((img, idx) => (
            <div
              key={idx}
              className="flex-none w-[200px] sm:w-auto scroll-snap-item relative h-64 rounded-xl overflow-hidden group bg-[#F7F4EF] luxury-card"
            >
              <Image
                src={img}
                alt={`Instagram post ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-8 h-8 text-[#C7A13A]" />
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
