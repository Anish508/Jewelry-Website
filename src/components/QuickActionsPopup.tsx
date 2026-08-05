"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, Flame, Gem, ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { Product, PRODUCTS } from "@/data/jewelleryData";

interface QuickActionsPopupProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenAppointment: () => void;
  currency: "AED" | "USD";
}

export const QuickActionsPopup: React.FC<QuickActionsPopupProps> = ({
  onQuickView,
  onAddToCart,
  onOpenAppointment,
  currency,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"bestsellers" | "new">("bestsellers");
  const [minimized, setMinimized] = useState(false);

  // Auto show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  // Minimized Trigger Pill placed at bottom-20 on mobile, sm:bottom-6 sm:right-56 on desktop so it NEVER overlaps with VIP Suite button at right-6!
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-20 right-6 sm:bottom-6 sm:right-56 z-40 bg-[#0F0E0C]/95 backdrop-blur-md text-[#C7A13A] border border-[#C7A13A]/50 px-4 py-2.5 rounded-full shadow-2xl hover:bg-[#C7A13A] hover:text-[#0F0E0C] transition-all duration-300 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider gold-glow animate-fade-in"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C7A13A]" />
        <span>Quick Discover</span>
      </button>
    );
  }

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 2);
  const newReleases = PRODUCTS.filter((p) => p.isNew).slice(0, 2);
  const currentProducts = activeTab === "bestsellers" ? bestSellers : newReleases;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-56 sm:bottom-6 z-40 max-w-[340px] w-full ml-auto animate-fade-in">
      <div className="bg-[#0F0E0C]/95 backdrop-blur-xl border border-[#C7A13A]/40 rounded-2xl p-3.5 shadow-2xl text-white space-y-3 gold-glow">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C7A13A] animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#C7A13A]">
              Atelier Discovery
            </span>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-gray-400 hover:text-white rounded-full transition"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Tab Switcher */}
        <div className="flex bg-[#1A1815] p-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-white/5">
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`flex-1 py-1 rounded-full flex items-center justify-center space-x-1 transition ${
              activeTab === "bestsellers"
                ? "bg-[#C7A13A] text-[#0F0E0C] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Bestsellers</span>
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-1 rounded-full flex items-center justify-center space-x-1 transition ${
              activeTab === "new"
                ? "bg-[#C7A13A] text-[#0F0E0C] font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Gem className="w-3 h-3" />
            <span>New Releases</span>
          </button>
        </div>

        {/* Product Items */}
        <div className="space-y-2">
          {currentProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-[#171512] p-2 rounded-xl border border-white/5 hover:border-[#C7A13A]/40 transition group"
            >
              <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-white/10">
                  <Image
                    src={prod.imagePrimary}
                    alt={prod.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-serif font-semibold text-xs text-[#FAFAF8] truncate group-hover:text-[#C7A13A] transition-colors">
                    {prod.name}
                  </h5>
                  <span className="text-[10px] font-medium text-[#C7A13A] block">
                    {currency === "AED" ? `AED ${prod.priceAED.toLocaleString()}` : `$${prod.priceUSD.toLocaleString()} USD`}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => onQuickView(prod)}
                  className="p-1.5 bg-white/10 hover:bg-[#C7A13A] hover:text-[#0F0E0C] text-white rounded-full transition"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="p-1.5 bg-[#C7A13A] hover:bg-white text-[#0F0E0C] rounded-full transition font-bold"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom VIP Link */}
        <button
          onClick={onOpenAppointment}
          className="w-full py-1.5 bg-[#171512] hover:bg-[#C7A13A] text-gray-300 hover:text-[#0F0E0C] text-[10px] font-semibold uppercase tracking-wider rounded-xl transition border border-white/5 flex items-center justify-center space-x-1"
        >
          <span>Book Private Suite Consultation</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
