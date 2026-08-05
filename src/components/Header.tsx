"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, MapPin, ChevronDown, Menu, X, Sparkles } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0C]/95 backdrop-blur-xl border-b border-[#C7A13A]/30 text-[#FAFAF8] shadow-2xl transition-all">
      {/* Top Gold Rate & Concierge Ticker */}
      <div className="bg-[#050505] text-[#FAFAF8] text-xs py-1.5 px-3 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Mobile Concise Ticker / Desktop Full Rates */}
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
            <button
              onClick={onOpenAppointment}
              className="hover:text-[#C7A13A] hidden sm:flex items-center text-gray-300 transition"
            >
              <MapPin className="w-3 h-3 mr-1 text-[#C7A13A]" /> Dubai Atelier
            </button>
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

      {/* Main Luxury Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Left Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#FAFAF8] hover:text-[#C7A13A] focus:outline-none transition rounded-lg hover:bg-white/5"
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo & Title */}
        <div className="flex items-center">
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full border-2 border-[#C7A13A] gold-glow flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Emirates Gold Logo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#FAFAF8] leading-none group-hover:text-[#C7A13A] transition-colors">
                EMIRATES GOLD
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] font-semibold text-[#C7A13A] uppercase mt-0.5">
                INTERNATIONAL ATELIER
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold text-[#FAFAF8]">
          <a href="#collections" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
            Collections
          </a>
          <button
            onMouseEnter={() => setMegaMenuOpen(true)}
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="hover:text-[#C7A13A] transition py-2 flex items-center border-b-2 border-transparent hover:border-[#C7A13A]"
          >
            Category <ChevronDown className="w-3 h-3 ml-1" />
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

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#FAFAF8] hover:text-[#C7A13A] transition rounded-full hover:bg-white/10"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-[#FAFAF8] hover:text-[#C7A13A] transition relative rounded-full hover:bg-white/10"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8A1F1F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 text-[#FAFAF8] hover:text-[#C7A13A] transition relative rounded-full hover:bg-white/10"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C7A13A] text-[#0F0E0C] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 text-[#FAFAF8] hover:text-[#C7A13A] transition hidden sm:inline-flex rounded-full hover:bg-white/10"
            title="VIP Account"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenAppointment}
            className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0F0E0C] bg-[#C7A13A] rounded-full hover:bg-white transition gold-glow"
          >
            VIP Appointment
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
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
              <button
                onClick={() => { setMegaMenuOpen(false); onOpenAppointment(); }}
                className="mt-3 text-xs font-semibold text-[#0F0E0C] bg-[#C7A13A] hover:bg-white px-4 py-1.5 rounded-full transition gold-glow"
              >
                Inquire Atelier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-start">
          <div className="w-4/5 max-w-sm bg-[#0D0D0C] border-r border-[#C7A13A]/30 h-full p-6 overflow-y-auto animate-slide-right flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between border-b border-[#C7A13A]/30 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Image src="/logo.jpeg" alt="Logo" width={32} height={32} className="rounded-full border border-[#C7A13A]" />
                  <span className="font-serif font-bold text-lg text-white">EMIRATES GOLD</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white hover:text-[#C7A13A]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 font-serif text-lg text-gray-200">
                <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#C7A13A] border-b border-white/5">
                  Featured Collections
                </a>
                <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#C7A13A] border-b border-white/5">
                  Shop By Category
                </a>
                <a href="#trending" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#C7A13A] border-b border-white/5">
                  Trending Jewellery
                </a>
                <a href="#bridal" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#C7A13A] border-b border-white/5">
                  Wedding Collection
                </a>
                <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-[#C7A13A] border-b border-white/5">
                  Why Emirates Gold
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C7A13A]/30 space-y-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAppointment(); }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#0F0E0C] bg-[#C7A13A] rounded-full text-center gold-glow font-bold"
              >
                Book VIP Appointment
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAccount(); }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 rounded-full text-center"
              >
                My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
