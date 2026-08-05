"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { CUSTOMER_STORIES } from "@/data/jewelleryData";

export const CustomerStories: React.FC = () => {
  return (
    <section className="py-20 bg-[#F7F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
            Customer Stories
          </h2>
          <div className="w-12 h-0.5 bg-[#C7A13A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-[#FAFAF8] p-8 rounded-2xl border border-[#EAE8E4] flex flex-col justify-between space-y-6 luxury-card relative"
            >
              <Quote className="w-8 h-8 text-[#C7A13A]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex text-[#C7A13A] space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#1C1C1C] italic leading-relaxed font-serif">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE8E4] flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C7A13A]/40">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#1C1C1C]">
                    {story.name}
                  </h4>
                  <span className="text-xs text-[#5A5A5A] block">
                    {story.location} • <strong className="text-[#C7A13A]">{story.purchase}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
