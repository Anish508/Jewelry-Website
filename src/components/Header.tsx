"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, MapPin, ChevronDown, Menu, X, Sparkles, Gem, Award, ShieldCheck, Phone } from "lucide-react";
import { GOLD_RATES } from "@/data/jewelleryData";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenAppointment: () => void;
  currency: "AED" | "USD";
  setCurrency: (c: "AED" | "USD") => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenAppointment,
  currency,
  setCurrency,
}) => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0C]/95 backdrop-blur-xl border-b border-[#C7A13A]/30 text-[#FAFAF8] shadow-2xl transition-all">
      {/* Top Gold Rate Ticker */}
      <div className="bg-[#050505] text-[#FAFAF8] text-xs py-1.5 px-3 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Live Gold Rate Banner */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-[11px] font-medium tracking-wide">
            <span className="flex items-center text-[#C7A13A] font-bold uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> Live Gold Rate
            </span>
            <span className="text-gray-200">
              24K: <strong className="text-white font-bold">AED {GOLD_RATES.aed24k}/g</strong>
            </span>
            <span className="text-gray-400 hidden sm:inline">
              22K: <strong className="text-white">AED {GOLD_RATES.aed22k}/g</strong>
            </span>
            <span className="text-gray-400 hidden md:inline">
              18K: <strong className="text-white">AED {GOLD_RATES.aed18k}/g</strong>
            </span>
            <span className="text-[#C7A13A] text-[10px] hidden lg:inline font-semibold">
              {GOLD_RATES.change24k} Daily Trend
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-gray-300 hidden sm:flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-[#C7A13A]" /> Dubai Atelier
            </span>
            <div className="h-3 w-px bg-white/20 hidden sm:block"></div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-400 text-[10px] uppercase font-medium">Curr:</span>
              <button
                onClick={() => setCurrency(currency === "AED" ? "USD" : "AED")}
                className="font-bold text-[#C7A13A] hover:underline uppercase text-xs"
              >
                {currency}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar (Professionally Balanced Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between">
        {/* Left: Mobile Hamburger Trigger (Visible on Mobile < lg) */}
        <div className="flex items-center lg:hidden w-12">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="p-2 text-[#FAFAF8] hover:text-[#C7A13A] focus:outline-none transition rounded-xl hover:bg-white/10 active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-[#C7A13A]" />
            ) : (
              <Menu className="w-7 h-7 text-[#C7A13A]" />
            )}
          </button>
        </div>

        {/* Center/Left: Prominent Large Logo Emblem (No Text Name Near Logo) */}
        <div className="flex items-center justify-center lg:justify-start">
          <a href="#" className="flex items-center group py-1" title="Emirates Gold International">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 overflow-hidden rounded-full border-2 border-[#C7A13A] gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="Emirates Gold Emblem Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links (Visible on >= lg) */}
        <nav className="hidden lg:flex items-center space-x-9 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAFAF8]">
          <a href="#collections" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
            Collections
          </a>
          <button
            onMouseEnter={() => setMegaMenuOpen(true)}
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="hover:text-[#C7A13A] transition py-2 flex items-center border-b-2 border-transparent hover:border-[#C7A13A]"
          >
            Category <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#C7A13A]" />
          </button>
          <a href="#bridal" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
            Bridal Couture
          </a>
          <a href="#trending" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
            Trending
          </a>
          <a href="#why-us" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
            Craftsmanship
          </a>
        </nav>

        {/* Right: Icon Actions (Search, Wishlist, Cart, Account) */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-[#FAFAF8] hover:text-[#C7A13A] transition rounded-full hover:bg-white/10"
            title="Search Products"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2.5 text-[#FAFAF8] hover:text-[#C7A13A] transition relative rounded-full hover:bg-white/10"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8A1F1F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2.5 text-[#FAFAF8] hover:text-[#C7A13A] transition relative rounded-full hover:bg-white/10"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C7A13A] text-[#0F0E0C] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2.5 text-[#FAFAF8] hover:text-[#C7A13A] transition hidden sm:inline-flex rounded-full hover:bg-white/10"
            title="VIP Account"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="hidden lg:block absolute top-full left-0 w-full bg-[#12110F] text-white border-b border-[#C7A13A]/40 shadow-2xl py-8 px-8 z-50 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#C7A13A]/30 pb-2 mb-4">
                Gold Jewellery
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">22K & 24K Royal Necklaces</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Hand-Engraved Gold Bangles</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Solid Heavy Gold Chains</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Gold Coins & Bullion Bars</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#C7A13A]/30 pb-2 mb-4">
                Diamond & Solitaires
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">GIA Certified Solitaire Rings</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Diamond Cascade Earrings</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Sapphire & Emerald Pendants</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">High Jewellery Masterpieces</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#C7A13A]/30 pb-2 mb-4">
                Bridal & Occasions
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Royal Wedding Sets</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Engagement Solitaire Bands</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Anniversary Eternities</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Corporate VIP Bullion Gifts</a></li>
              </ul>
            </div>

            <div className="bg-[#1A1815] p-4 rounded-xl border border-[#C7A13A]/30 text-center">
              <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400"
                  alt="Featured Collection"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#C7A13A]">Atelier Highlight</span>
              <h5 className="font-serif font-bold text-sm text-white mt-1">The Royal Emerald Choker</h5>
              <a
                href="#trending"
                onClick={() => setMegaMenuOpen(false)}
                className="mt-3 text-xs font-semibold text-[#0F0E0C] bg-[#C7A13A] hover:bg-white px-4 py-1.5 rounded-full transition inline-block gold-glow"
              >
                View Piece
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ROCK-SOLID MOBILE DRAWER NAVIGATION (HIGH Z-INDEX OVERLAY) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-[999] bg-black/90 backdrop-blur-2xl flex justify-start animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[85%] max-w-sm bg-[#0D0D0C] border-r border-[#C7A13A]/40 h-full p-5 overflow-y-auto animate-slide-right flex flex-col justify-between text-white shadow-2xl cursor-default"
          >
            <div>
              {/* Mobile Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#C7A13A]/30 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full border border-[#C7A13A] overflow-hidden gold-glow">
                    <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-white hover:text-[#C7A13A] rounded-full hover:bg-white/10 transition"
                  aria-label="Close Mobile Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Live Gold Rate Banner embedded inside Mobile Menu */}
              <div className="bg-[#1A1815] p-3 rounded-xl border border-[#C7A13A]/30 mb-6 text-xs space-y-1">
                <div className="flex justify-between items-center text-[#C7A13A] font-bold text-[10px] uppercase tracking-wider">
                  <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Live Dubai Rates</span>
                  <span>{GOLD_RATES.change24k}</span>
                </div>
                <div className="flex justify-between text-gray-200 font-semibold text-[11px] pt-1">
                  <span>24K: AED {GOLD_RATES.aed24k}/g</span>
                  <span>22K: AED {GOLD_RATES.aed22k}/g</span>
                </div>
              </div>

              {/* Mobile Navigation Links & Accordions */}
              <div className="space-y-3 font-serif text-base text-gray-200">
                <a
                  href="#collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 hover:text-[#C7A13A] transition border-b border-white/5"
                >
                  <span>Featured Collections</span>
                  <Award className="w-4 h-4 text-[#C7A13A]" />
                </a>

                {/* Collapsible Category Link */}
                <div>
                  <button
                    onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                    className="w-full flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 hover:text-[#C7A13A] transition border-b border-white/5 text-left"
                  >
                    <span>Categories Atelier</span>
                    <ChevronDown className={`w-4 h-4 text-[#C7A13A] transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCategoryOpen && (
                    <div className="pl-4 py-2 space-y-2.5 text-xs font-sans text-gray-300 animate-fade-in border-l border-[#C7A13A]/30 ml-3 mt-1">
                      <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#C7A13A]">22K & 24K Gold Rings</a>
                      <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#C7A13A]">Empress Gold Bangles</a>
                      <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#C7A13A]">Solitaire Diamond Necklaces</a>
                      <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#C7A13A]">24K Stamped Gold Coins</a>
                    </div>
                  )}
                </div>

                <a
                  href="#trending"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 hover:text-[#C7A13A] transition border-b border-white/5"
                >
                  <span>Trending Jewellery</span>
                  <Gem className="w-4 h-4 text-[#C7A13A]" />
                </a>

                <a
                  href="#bridal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 hover:text-[#C7A13A] transition border-b border-white/5"
                >
                  <span>Wedding Couture</span>
                  <Sparkles className="w-4 h-4 text-[#C7A13A]" />
                </a>

                <a
                  href="#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 hover:text-[#C7A13A] transition border-b border-white/5"
                >
                  <span>Why Emirates Gold</span>
                  <ShieldCheck className="w-4 h-4 text-[#C7A13A]" />
                </a>
              </div>
            </div>

            {/* Mobile Drawer Bottom Action CTAs */}
            <div className="pt-6 border-t border-[#C7A13A]/30 font-sans">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAccount(); }}
                  className="py-3 px-3 text-white border border-white/20 rounded-full text-center font-semibold hover:border-[#C7A13A] transition flex items-center justify-center space-x-1"
                >
                  <User className="w-3.5 h-3.5 mr-1" />
                  <span>Account</span>
                </button>
                <a
                  href="https://wa.me/97148004653"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#25D366] text-white rounded-full text-center font-semibold flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 mr-1 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
