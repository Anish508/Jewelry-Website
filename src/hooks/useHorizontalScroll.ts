"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseHorizontalScrollOptions {
  step?: number;
  enableWheel?: boolean;
}

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalScrollOptions = {}
) {
  const containerRef = useRef<T | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    const handleScroll = () => {
      checkScroll();
    };

    // Optional desktop wheel redirect for smooth horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      if (!options.enableWheel) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (
          (e.deltaY > 0 && el.scrollLeft < maxScroll) ||
          (e.deltaY < 0 && el.scrollLeft > 0)
        ) {
          e.preventDefault();
          el.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
        }
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    if (options.enableWheel) {
      el.addEventListener("wheel", handleWheel, { passive: false });
    }

    const resizeObserver = new ResizeObserver(() => checkScroll());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (options.enableWheel) {
        el.removeEventListener("wheel", handleWheel);
      }
      resizeObserver.disconnect();
    };
  }, [checkScroll, options.enableWheel]);

  const scrollLeft = useCallback(
    (customStep?: number) => {
      const el = containerRef.current;
      if (!el) return;
      const distance = customStep || options.step || el.clientWidth * 0.75;
      el.scrollBy({ left: -distance, behavior: "smooth" });
    },
    [options.step]
  );

  const scrollRight = useCallback(
    (customStep?: number) => {
      const el = containerRef.current;
      if (!el) return;
      const distance = customStep || options.step || el.clientWidth * 0.75;
      el.scrollBy({ left: distance, behavior: "smooth" });
    },
    [options.step]
  );

  // Mouse Drag Handlers for Desktop Swiping
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.8;
    el.scrollLeft = scrollLeftPos - walk;
  };

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isDragging,
    dragProps: {
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
    },
  };
}
