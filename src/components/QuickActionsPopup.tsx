"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, Flame, Gem, ShoppingBag, Eye } from "lucide-react";
import { Product, PRODUCTS } from "@/data/jewelleryData";

interface QuickActionsPopupProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currency: "AED" | "USD";
}

export const QuickActionsPopup: React.FC<QuickActionsPopupProps> = ({
  onQuickView,
  onAddToCart,
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

  // Minimized Pill (Sleek Light Mode Floating Trigger on Bottom-Left)
  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 left-4 sm:left-6 z-40 bg-white border border-[#C7A13A]/60 text-[#1C1C1C] px-4 py-2.5 rounded-full shadow-xl hover:border-[#C7A13A] hover:bg-[#F7F4EF] transition-all duration-300 flex items-center space-x-2 text-xs font-serif font-bold tracking-wide animate-fade-in"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C7A13A]" />
        <span>Curated Selection</span>
      </button>
    );
  }

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 2);
  const newReleases = PRODUCTS.filter((p) => p.isNew).slice(0, 2);
  const currentProducts = activeTab === "bestsellers" ? bestSellers : newReleases;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 max-w-[340px] w-full animate-fade-in">
      <div className="bg-white/98 backdrop-blur-xl border border-[#E5DFD3] rounded-2xl p-4 shadow-2xl text-[#1C1C1C] space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C7A13A] animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#C7A13A]">
              Atelier Curated
            </span>
          </div>
          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition"
            title="Minimize"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Light Tab Switcher */}
        <div className="flex bg-[#F7F4EF] p-1 rounded-full text-xs font-serif border border-[#E5DFD3]">
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`flex-1 py-1 rounded-full flex items-center justify-center space-x-1 transition cursor-pointer ${
              activeTab === "bestsellers"
                ? "bg-white text-[#1C1C1C] font-bold shadow-xs border border-gray-200"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C7A13A]" />
            <span>Bestsellers</span>
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 py-1 rounded-full flex items-center justify-center space-x-1 transition cursor-pointer ${
              activeTab === "new"
                ? "bg-white text-[#1C1C1C] font-bold shadow-xs border border-gray-200"
                : "text-gray-500 hover:text-black"
            }`}
          >
            <Gem className="w-3.5 h-3.5 text-[#C7A13A]" />
            <span>New Releases</span>
          </button>
        </div>

        {/* Product Items */}
        <div className="space-y-2.5">
          {currentProducts.map((prod) => (
            <div
              key={prod.id}
              className="flex items-center justify-between bg-[#FAFAF8] hover:bg-[#F4F1EA] p-2.5 rounded-xl border border-[#E5DFD3] transition group"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200 shadow-xs">
                  <Image
                    src={prod.imagePrimary}
                    alt={prod.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-serif font-bold text-xs text-[#1C1C1C] truncate group-hover:text-[#C7A13A] transition-colors">
                    {prod.name}
                  </h5>
                  <span className="text-xs font-semibold text-[#C7A13A] block mt-0.5">
                    {currency === "AED" ? `AED ${prod.priceAED.toLocaleString()}` : `$${prod.priceUSD.toLocaleString()} USD`}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 ml-2">
                <button
                  onClick={() => onQuickView(prod)}
                  className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-200 rounded-full transition"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="p-1.5 bg-[#1C1C1C] hover:bg-[#C7A13A] text-white rounded-full transition shadow-xs"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
