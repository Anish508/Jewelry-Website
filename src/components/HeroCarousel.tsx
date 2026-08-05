"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/data/jewelleryData";

interface HeroCarouselProps {
  onOpenAppointment: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOpenAppointment }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] max-h-[800px] overflow-hidden bg-[#1C1C1C]">
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
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-white space-y-6 animate-fade-in">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C7A13A]/20 border border-[#C7A13A]/50 text-[#C7A13A] text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.tagline}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-[#FAFAF8]">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg text-gray-200 font-light max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <a
                    href="#collections"
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#1C1C1C] bg-[#C7A13A] rounded-full hover:bg-white transition-colors duration-300 gold-glow"
                  >
                    {slide.ctaPrimary}
                  </a>
                  <button
                    onClick={onOpenAppointment}
                    className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white border-2 border-white/80 rounded-full hover:bg-white hover:text-[#1C1C1C] transition-all duration-300 backdrop-blur-sm"
                  >
                    {slide.ctaSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-[#C7A13A] hover:text-[#1C1C1C] transition duration-300 backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-[#C7A13A] hover:text-[#1C1C1C] transition duration-300 backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? "w-8 bg-[#C7A13A]" : "w-2 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
