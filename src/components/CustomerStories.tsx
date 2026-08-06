"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { CUSTOMER_STORIES } from "@/data/jewelleryData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export const CustomerStories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isDragging,
    dragProps,
  } = useHorizontalScroll({ enableWheel: true });

  const scrollToIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const container = containerRef.current;
      if (container && container.children[index]) {
        const targetCard = container.children[index] as HTMLElement;
        container.scrollTo({
          left: targetCard.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
    },
    [containerRef]
  );

  // Auto scroll timer, paused when user hovers or drags
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % CUSTOMER_STORIES.length;
      scrollToIndex(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, isHovered, isDragging, scrollToIndex]);

  // Sync activeIndex dynamically when user scrolls/drags manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeftPos = container.scrollLeft;
      const children = Array.from(container.children) as HTMLElement[];
      let closestIdx = 0;
      let minDistance = Infinity;

      children.forEach((child, idx) => {
        const childOffset = child.offsetLeft - container.offsetLeft;
        const distance = Math.abs(childOffset - scrollLeftPos);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const handlePrev = () => {
    const newIdx = (activeIndex - 1 + CUSTOMER_STORIES.length) % CUSTOMER_STORIES.length;
    scrollToIndex(newIdx);
  };

  const handleNext = () => {
    const newIdx = (activeIndex + 1) % CUSTOMER_STORIES.length;
    scrollToIndex(newIdx);
  };

  return (
    <section className="py-20 bg-[#F7F4EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
                Client Testimonials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1C1C] tracking-wide">
                Customer Stories
              </h2>
            </div>

            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft && activeIndex === 0}
                className={`p-2.5 rounded-full border border-[#EAE8E4] transition shadow-sm ${
                  canScrollLeft || activeIndex > 0
                    ? "bg-[#FAFAF8] text-[#1C1C1C] hover:bg-[#C7A13A] hover:text-white cursor-pointer"
                    : "bg-[#FAFAF8] text-gray-300 cursor-not-allowed opacity-50"
                }`}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canScrollRight && activeIndex === CUSTOMER_STORIES.length - 1}
                className={`p-2.5 rounded-full border border-[#EAE8E4] transition shadow-sm ${
                  canScrollRight || activeIndex < CUSTOMER_STORIES.length - 1
                    ? "bg-[#FAFAF8] text-[#1C1C1C] hover:bg-[#C7A13A] hover:text-white cursor-pointer"
                    : "bg-[#FAFAF8] text-gray-300 cursor-not-allowed opacity-50"
                }`}
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Auto & Manual Horizontally Scrollable Cards Container */}
        <div
          ref={containerRef}
          {...dragProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex gap-6 overflow-x-auto no-scrollbar scroll-snap-x pb-6 pt-1 px-1 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {CUSTOMER_STORIES.map((story, idx) => (
            <div
              key={story.id}
              className={`flex-none w-[320px] sm:w-[360px] scroll-snap-item bg-[#FAFAF8] p-6 sm:p-8 rounded-2xl border border-[#EAE8E4] flex flex-col justify-between space-y-6 luxury-card relative transition-all duration-300 ${
                idx === activeIndex ? "border-[#C7A13A]/60 shadow-lg" : ""
              }`}
            >
              <Quote className="w-8 h-8 text-[#C7A13A]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex text-[#C7A13A] space-x-1">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#1C1C1C] italic leading-relaxed font-editorial">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE8E4] flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C7A13A]/40 flex-shrink-0">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base text-[#1C1C1C]">
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

        {/* Pagination Indicators */}
        <div className="flex justify-center space-x-2 pt-2">
          {CUSTOMER_STORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? "w-6 bg-[#C7A13A]" : "w-1.5 bg-[#1C1C1C]/20 hover:bg-[#1C1C1C]/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
