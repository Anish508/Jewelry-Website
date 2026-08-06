"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/data/jewelleryData";

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Touch Swipe Handlers for Finger Scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[85vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#0F0E0C] select-none"
    >
      {/* Main Hero Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
            {/* High-Fashion Editorial Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl text-white space-y-4 sm:space-y-6 animate-fade-in">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#C7A13A]/20 border border-[#C7A13A]/60 text-[#C7A13A] text-[11px] font-medium tracking-[0.25em] uppercase backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.tagline}</span>
                </div>

                {/* Primary Editorial Heading in Cormorant Garamond */}
                <h1 className="heading-primary text-4xl sm:text-6xl lg:text-7xl text-[#FAFAF8] drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Body Text in Inter */}
                <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-normal max-w-xl leading-[1.7] tracking-[0.01em]">
                  {slide.subtitle}
                </p>

                <div className="pt-2 sm:pt-4 flex items-center space-x-4">
                  <a
                    href="#collections"
                    className="font-btn inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#0F0E0C] bg-[#C7A13A] rounded-full hover:bg-white transition duration-300 gold-glow"
                  >
                    {slide.ctaPrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Sleek Minimalist Luxury Line Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentSlide ? "w-8 bg-[#C7A13A] shadow-sm" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
