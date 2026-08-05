"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Eye, ShoppingBag, Star, Sparkles } from "lucide-react";
import { Product, PRODUCTS } from "@/data/jewelleryData";
import { ScrollReveal } from "@/components/ScrollReveal";

interface TrendingProductsProps {
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  currency: "AED" | "USD";
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  onQuickView,
  onToggleWishlist,
  onAddToCart,
  wishlistIds,
  currency,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="trending" className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A] flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Royal Bestsellers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C] mt-1">
                Trending Atelier Masterpieces
              </h2>
            </div>
            <p className="text-sm text-[#5A5A5A] max-w-md mt-2 md:mt-0">
              Handcrafted with certified diamonds and 22K/24K hallmarked gold. Highly sought after across Dubai & international boutiques.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Products Visible on Desktop / Mobile Swipe Carousel */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar scroll-snap-x pb-4 sm:pb-0">
          {PRODUCTS.map((product, idx) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const priceDisplay =
              currency === "AED"
                ? `AED ${product.priceAED.toLocaleString()}`
                : `$${product.priceUSD.toLocaleString()} USD`;

            return (
              <ScrollReveal key={product.id} delay={idx * 100}>
                <div
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="flex-none w-[280px] sm:w-auto scroll-snap-item group relative bg-[#FAFAF8] rounded-2xl border border-[#EAE8E4] p-4 luxury-card flex flex-col justify-between"
                >
                  {/* Product Image Box */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F7F4EF] mb-4">
                    <Image
                      src={
                        hoveredId === product.id
                          ? product.imageSecondary
                          : product.imagePrimary
                      }
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Karat Tag */}
                    <div className="absolute top-3 left-3 bg-[#1C1C1C]/90 text-[#FAFAF8] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-[#C7A13A]/50 backdrop-blur-sm">
                      {product.karat}
                    </div>

                    {/* Wishlist Floating Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                        isWishlisted
                          ? "bg-[#8A1F1F] text-white"
                          : "bg-white/80 text-[#1C1C1C] hover:bg-[#C7A13A] hover:text-white"
                      }`}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1 text-[#C7A13A] text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#1C1C1C] group-hover:text-[#C7A13A] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5A5A5A] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-[#EAE8E4]">
                      <span className="font-serif font-bold text-sm text-[#1C1C1C]">
                        {priceDisplay}
                      </span>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onQuickView(product)}
                          className="p-2.5 bg-white hover:bg-[#F7F4EF] text-[#1C1C1C] rounded-full border border-gray-200 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="p-2.5 bg-[#F7F4EF] hover:bg-[#C7A13A] hover:text-white text-[#1C1C1C] rounded-full transition-colors gold-glow"
                          title="Add to Shopping Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
