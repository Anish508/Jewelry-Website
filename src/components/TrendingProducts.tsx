"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Eye, ShoppingBag, Star, Sparkles } from "lucide-react";
import { Product, PRODUCTS } from "@/data/jewelleryData";

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

        {/* 4 Products Visible on Desktop / Mobile Swipe Carousel */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar scroll-snap-x pb-4 sm:pb-0">
          {PRODUCTS.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const priceDisplay =
              currency === "AED"
                ? `AED ${product.priceAED.toLocaleString()}`
                : `$${product.priceUSD.toLocaleString()} USD`;

            return (
              <div
                key={product.id}
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
                    className="object-cover transition-transform duration-700 ease-out"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.isNew && (
                      <span className="px-2.5 py-0.5 bg-[#C7A13A] text-xs font-bold text-[#1C1C1C] rounded-full uppercase tracking-wider">
                        New Release
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="px-2.5 py-0.5 bg-[#1C1C1C] text-xs font-semibold text-[#FAFAF8] rounded-full uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                      isWishlisted
                        ? "bg-[#8A1F1F] text-white"
                        : "bg-white/80 text-[#1C1C1C] hover:bg-[#8A1F1F] hover:text-white"
                    }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>

                  {/* Quick View Button Overlay */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-2.5 bg-[#1C1C1C]/90 hover:bg-[#1C1C1C] text-white text-xs font-semibold uppercase tracking-wider rounded-full backdrop-blur-md flex items-center justify-center space-x-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#5A5A5A]">
                    <span className="font-medium">{product.karat}</span>
                    <div className="flex items-center text-[#C7A13A]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="ml-1 font-bold text-xs">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1C1C1C] line-clamp-1 group-hover:text-[#C7A13A] transition-colors">
                    {product.name}
                  </h3>

                  <div className="pt-2 flex items-center justify-between border-t border-[#EAE8E4]">
                    <div>
                      <span className="text-xs text-[#5A5A5A] block">Atelier Price</span>
                      <span className="font-serif font-bold text-lg text-[#1C1C1C]">
                        {priceDisplay}
                      </span>
                    </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
};
