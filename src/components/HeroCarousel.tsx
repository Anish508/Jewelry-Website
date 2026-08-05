"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/data/jewelleryData";

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[82vh] min-h-[500px] max-h-[780px] overflow-hidden bg-[#0F0E0C]">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
            />
            {/* Dark Vignette Overlay for Crisp Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-white space-y-4 sm:space-y-6 animate-fade-in">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C7A13A]/20 border border-[#C7A13A]/50 text-[#C7A13A] text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.tagline}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-wide leading-[1.15] text-[#FAFAF8]">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-lg text-gray-200 font-light max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-2 sm:pt-4">
                  <a
                    href="#collections"
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#0F0E0C] bg-[#C7A13A] rounded-full hover:bg-white transition duration-300 gold-glow"
                  >
                    {slide.ctaPrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Indicators Only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? "w-8 bg-[#C7A13A]" : "w-2 bg-white/40 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
