"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Mobile Drawer Content (Rendered via Portal to document.body for 100% reliability)
  const mobileDrawerContent = (
    <div
      onClick={() => setMobileMenuOpen(false)}
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex justify-start animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[85%] max-w-sm bg-[#FFFFFF] border-r border-[#E5DFD3] h-full p-6 overflow-y-auto animate-slide-right flex flex-col justify-between text-[#1C1C1C] shadow-2xl cursor-default"
      >
        <div>
          {/* Mobile Drawer Top Header */}
          <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-4 mb-5">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full border border-[#C7A13A] overflow-hidden">
                <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-[#1C1C1C] tracking-wide">EMIRATES GOLD</span>
                <span className="text-[8px] tracking-[0.2em] font-semibold text-[#C7A13A] uppercase">DUBAI ATELIER</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] rounded-full hover:bg-gray-100 transition"
              aria-label="Close Mobile Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Live Gold Rate Banner embedded inside Mobile Menu */}
          <div className="bg-[#F7F4EF] p-3 rounded-xl border border-[#C7A13A]/30 mb-6 text-xs space-y-1">
            <div className="flex justify-between items-center text-[#C7A13A] font-bold text-[10px] uppercase tracking-wider">
              <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Live Dubai Gold Rates</span>
              <span>{GOLD_RATES.change24k}</span>
            </div>
            <div className="flex justify-between text-[#1C1C1C] font-semibold text-[11px] pt-1">
              <span>24K: <strong>AED {GOLD_RATES.aed24k}/g</strong></span>
              <span>22K: <strong>AED {GOLD_RATES.aed22k}/g</strong></span>
            </div>
          </div>

          {/* Mobile Navigation Category Accordions & Links */}
          <div className="space-y-2 font-serif text-base text-[#1C1C1C]">
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition border-b border-gray-100"
            >
              <span>Featured Collections</span>
              <Award className="w-4.5 h-4.5 text-[#C7A13A]" />
            </a>

            {/* Collapsible Category Link */}
            <div>
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="w-full flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition border-b border-gray-100 text-left"
              >
                <span>Categories Atelier</span>
                <ChevronDown className={`w-4.5 h-4.5 text-[#C7A13A] transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCategoryOpen && (
                <div className="pl-4 py-2 space-y-2.5 text-xs font-sans text-gray-700 animate-fade-in border-l-2 border-[#C7A13A] ml-3 mt-1">
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
              className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition border-b border-gray-100"
            >
              <span>Trending Masterpieces</span>
              <Gem className="w-4.5 h-4.5 text-[#C7A13A]" />
            </a>

            <a
              href="#bridal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition border-b border-gray-100"
            >
              <span>Wedding Couture</span>
              <Sparkles className="w-4.5 h-4.5 text-[#C7A13A]" />
            </a>

            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition border-b border-gray-100"
            >
              <span>Why Emirates Gold</span>
              <ShieldCheck className="w-4.5 h-4.5 text-[#C7A13A]" />
            </a>
          </div>
        </div>

        {/* Mobile Drawer Bottom Action Buttons */}
        <div className="pt-6 border-t border-[#E5DFD3] font-sans">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAccount(); }}
              className="py-3 px-3 text-[#1C1C1C] bg-[#F7F4EF] border border-[#E5DFD3] rounded-full text-center font-semibold hover:border-[#C7A13A] transition flex items-center justify-center space-x-1"
            >
              <User className="w-3.5 h-3.5 mr-1 text-[#C7A13A]" />
              <span>VIP Portal</span>
            </button>
            <a
              href="https://wa.me/97148004653"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 bg-[#25D366] text-white rounded-full text-center font-semibold flex items-center justify-center space-x-1 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-1 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#EAE6DF] text-[#1C1C1C] shadow-sm transition-all">
      {/* Top Gold Rate Ticker (Clean Champagne Dark Luxe Bar) */}
      <div className="bg-[#1C1C1C] text-[#FAFAF8] text-xs py-1.5 px-4 sm:px-8 border-b border-[#C7A13A]/30">
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
            <span className="text-[#C7A13A] text-[10px] hidden md:inline font-semibold">
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

      {/* Main Luxury Navigation Bar (Light Professional Luxe Theme) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo + Wordmark */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-3 group" title="Emirates Gold International">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 overflow-hidden rounded-full border-2 border-[#C7A13A] gold-glow flex-shrink-0 transition-transform duration-300 group-hover:scale-105 bg-white">
              <Image
                src="/logo.jpeg"
                alt="Emirates Gold Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1C1C1C] leading-none group-hover:text-[#C7A13A] transition-colors">
                EMIRATES GOLD
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-semibold text-[#C7A13A] uppercase mt-0.5">
                INTERNATIONAL ATELIER
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-9 text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1C1C]">
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

        {/* Right: Icon Actions + Mobile Hamburger Menu Trigger */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition rounded-full hover:bg-gray-100"
            title="Search Products"
          >
            <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8A1F1F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C7A13A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition hidden sm:inline-flex rounded-full hover:bg-gray-100"
            title="VIP Account"
          >
            <User className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </button>

          {/* Mobile Hamburger Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#1C1C1C] hover:text-[#C7A13A] focus:outline-none transition rounded-xl hover:bg-gray-100 active:scale-95 ml-1"
            aria-label="Open Mobile Navigation Menu"
          >
            <Menu className="w-6.5 h-6.5 text-[#1C1C1C]" />
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="hidden lg:block absolute top-full left-0 w-full bg-[#FFFFFF] text-[#1C1C1C] border-b border-[#C7A13A]/40 shadow-2xl py-8 px-8 z-50 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
                Gold Jewellery
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">22K & 24K Royal Necklaces</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Hand-Engraved Gold Bangles</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Solid Heavy Gold Chains</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Gold Coins & Bullion Bars</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
                Diamond & Solitaires
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">GIA Certified Solitaire Rings</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Diamond Cascade Earrings</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">Sapphire & Emerald Pendants</a></li>
                <li><a href="#trending" className="hover:text-[#C7A13A] transition">High Jewellery Masterpieces</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
                Bridal & Occasions
              </h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Royal Wedding Sets</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Engagement Solitaire Bands</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Anniversary Eternities</a></li>
                <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Corporate VIP Bullion Gifts</a></li>
              </ul>
            </div>

            <div className="bg-[#F7F4EF] p-4 rounded-xl border border-[#C7A13A]/30 text-center">
              <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400"
                  alt="Featured Collection"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#C7A13A]">Atelier Highlight</span>
              <h5 className="font-serif font-bold text-sm text-[#1C1C1C] mt-1">The Royal Emerald Choker</h5>
              <a
                href="#trending"
                onClick={() => setMegaMenuOpen(false)}
                className="mt-3 text-xs font-semibold text-[#1C1C1C] bg-[#C7A13A] hover:bg-[#1C1C1C] hover:text-white px-4 py-1.5 rounded-full transition inline-block gold-glow"
              >
                View Piece
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Render Mobile Drawer via Portal directly to body */}
      {mounted && mobileMenuOpen && createPortal(mobileDrawerContent, document.body)}
    </header>
  );
};
