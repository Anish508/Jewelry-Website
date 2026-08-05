"use client";

import React from "react";
import { Award, Gem, RefreshCw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { WHY_US } from "@/data/jewelleryData";

export const WhyUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award": return <Award className="w-6 h-6 text-[#C7A13A]" />;
      case "Gem": return <Gem className="w-6 h-6 text-[#C7A13A]" />;
      case "RefreshCw": return <RefreshCw className="w-6 h-6 text-[#C7A13A]" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-[#C7A13A]" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-[#C7A13A]" />;
      case "Truck": return <Truck className="w-6 h-6 text-[#C7A13A]" />;
      default: return <Award className="w-6 h-6 text-[#C7A13A]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-[#FAFAF8] border-y border-[#EAE8E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
            The Emirates Gold Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
            Why Choose Emirates Gold
          </h2>
          <div className="w-12 h-0.5 bg-[#C7A13A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F7F4EF] p-8 rounded-2xl border border-[#EAE8E4] luxury-card space-y-4 hover:border-[#C7A13A]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#C7A13A]/30 flex items-center justify-center shadow-sm">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C1C1C]">
                {item.title}
              </h3>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
