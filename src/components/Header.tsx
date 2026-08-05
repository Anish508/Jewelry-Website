"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Menu,
  Store,
  Heart,
  ShoppingBag,
  Search,
  Camera,
  Mic,
  X,
  Sparkles,
  ChevronRight,
  Award,
  ShieldCheck,
  Gem,
  Phone,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Product, PRODUCTS, GOLD_RATES } from "@/data/jewelleryData";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch?: () => void;
  onOpenAccount: () => void;
  onOpenAppointment: () => void;
  currency: "AED" | "USD";
  setCurrency: (c: "AED" | "USD") => void;
  allProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenAppointment,
  currency,
  setCurrency,
  allProducts = PRODUCTS,
  onSelectProduct,
}) => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Search State (Navbar Inline Search)
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [imageSearchModal, setImageSearchModal] = useState(false);

  const searchContainerRefMobile = useRef<HTMLDivElement>(null);
  const searchContainerRefDesktop = useRef<HTMLDivElement>(null);

  const placeholders = [
    "Search for gold necklace",
    "Search for solitaire diamond rings",
    "Search for 24K gold coins",
    "Search for emerald bridal sets",
    "Search for royal gold bangles",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Click outside listener for search results dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideMobile = searchContainerRefMobile.current?.contains(target);
      const insideDesktop = searchContainerRefDesktop.current?.contains(target);
      if (!insideMobile && !insideDesktop) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll locking for mobile menu
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

  // Voice Search Handler
  const handleVoiceSearch = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      try {
        const win = window as unknown as Record<string, any>;
        const SpeechRecClass = win.SpeechRecognition || win.webkitSpeechRecognition;
        const recognition = new SpeechRecClass();
        recognition.lang = "en-US";
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsListening(false);
          setIsSearchFocused(true);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch {
        simulateVoiceSearch();
      }
    } else {
      simulateVoiceSearch();
    }
  };

  const simulateVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery("Gold Necklace");
      setIsSearchFocused(true);
    }, 1500);
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.karat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mobile Drawer (Rendered via Portal to body)
  const mobileDrawerContent = (
    <div
      onClick={() => setMobileMenuOpen(false)}
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex justify-start animate-fade-in cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[85%] max-w-xs bg-[#FFFFFF] border-r border-[#E5DFD3] h-full p-5 overflow-y-auto animate-slide-right flex flex-col justify-between text-[#1C1C1C] shadow-2xl cursor-default"
      >
        <div>
          {/* Drawer Top Header: Logo Image Only */}
          <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-4 mb-4">
            <div className="relative w-11 h-11 rounded-full border border-[#C7A13A] overflow-hidden bg-white shadow-xs">
              <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#1C1C1C] hover:text-[#C7A13A] rounded-full hover:bg-gray-100 transition"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Live Gold Rates Widget inside Drawer */}
          <div className="bg-[#F7F4EF] p-3 rounded-xl border border-[#C7A13A]/30 mb-5 text-xs">
            <div className="flex justify-between items-center text-[#C7A13A] font-bold text-[10px] uppercase tracking-wider mb-1">
              <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1" /> Live Gold Rates</span>
              <span>{GOLD_RATES.change24k}</span>
            </div>
            <div className="flex justify-between text-[#1C1C1C] text-[11px]">
              <span>24K: <strong>AED {GOLD_RATES.aed24k}/g</strong></span>
              <span>22K: <strong>AED {GOLD_RATES.aed22k}/g</strong></span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 text-sm font-serif text-[#1C1C1C]">
            <a
              href="#collections"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition"
            >
              <span>Featured Collections</span>
              <Award className="w-4 h-4 text-[#C7A13A]" />
            </a>

            <div>
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition text-left"
              >
                <span>Categories Atelier</span>
                <ChevronDown className={`w-4 h-4 text-[#C7A13A] transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCategoryOpen && (
                <div className="pl-4 py-2 space-y-2 text-xs text-gray-700 border-l-2 border-[#C7A13A] ml-3 mt-1">
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
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition"
            >
              <span>Trending Masterpieces</span>
              <Gem className="w-4 h-4 text-[#C7A13A]" />
            </a>

            <a
              href="#bridal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition"
            >
              <span>Wedding Couture</span>
              <Sparkles className="w-4 h-4 text-[#C7A13A]" />
            </a>

            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F7F4EF] hover:text-[#C7A13A] transition"
            >
              <span>Why Emirates Gold</span>
              <ShieldCheck className="w-4 h-4 text-[#C7A13A]" />
            </a>
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="pt-4 border-t border-[#E5DFD3]">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAccount(); }}
              className="py-2.5 px-3 text-[#1C1C1C] bg-[#F7F4EF] border border-[#E5DFD3] rounded-full text-center font-bold hover:border-[#C7A13A] transition flex items-center justify-center space-x-1"
            >
              <User className="w-3.5 h-3.5 mr-1 text-[#C7A13A]" />
              <span>VIP Portal</span>
            </button>
            <a
              href="https://wa.me/97148004653"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#25D366] text-white rounded-full text-center font-bold flex items-center justify-center space-x-1 shadow-sm"
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAE6DF] text-[#1C1C1C] shadow-xs">
      {/* Top Gold Rate Bar (Shared for both Mobile & Desktop) */}
      <div className="bg-[#1C1C1C] text-[#FAFAF8] text-xs py-1 px-4 sm:px-8 border-b border-[#C7A13A]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-4 text-[11px] font-medium tracking-wide">
            <span className="flex items-center text-[#C7A13A] font-bold uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" /> Live Dubai Gold Rate
            </span>
            <span>
              24K: <strong className="text-white font-bold">AED {GOLD_RATES.aed24k}/g</strong>
            </span>
            <span className="hidden sm:inline text-gray-300">
              22K: <strong className="text-white">AED {GOLD_RATES.aed22k}/g</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-gray-300 hidden sm:flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-[#C7A13A]" /> Dubai Atelier
            </span>
            <div className="h-3 w-px bg-white/20 hidden sm:block"></div>
            <button
              onClick={() => setCurrency(currency === "AED" ? "USD" : "AED")}
              className="font-bold text-[#C7A13A] hover:underline uppercase text-xs"
            >
              {currency}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE NAVBAR LAYOUT (lg:hidden) - Clean 2-Row Layout with Searchbar */}
      {/* ========================================================================= */}
      <div className="lg:hidden">
        {/* Row 1: Hamburger Menu | Logo Image Only | Store, Wishlist, Cart */}
        <div className="px-4 pt-2.5 pb-1 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 text-[#1C1C1C] hover:text-[#C7A13A] transition rounded-lg hover:bg-gray-100"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-7 h-7 text-[#1C1C1C]" />
            </button>

            {/* Logo Image Only (logo.jpeg), no text */}
            <a href="#" className="relative w-10 h-10 rounded-full border border-[#C7A13A] overflow-hidden bg-white shrink-0 block shadow-xs">
              <Image src="/logo.jpeg" alt="Logo" fill priority className="object-cover" />
            </a>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAppointment}
              className="p-1 text-[#1C1C1C] hover:text-[#C7A13A] transition rounded-full hover:bg-gray-100"
              title="Store Locator"
            >
              <Store className="w-6 h-6 stroke-[1.75]" />
            </button>

            <button
              onClick={onOpenWishlist}
              className="p-1 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
              title="Wishlist"
            >
              <Heart className="w-6 h-6 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8A1F1F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="p-1 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
              title="Cart"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.75]" />
              <span className="absolute -top-1 -right-1 bg-[#8A1F1F] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Mobile Integrated Searchbar */}
        <div className="px-4 pb-2.5 pt-1">
          <div ref={searchContainerRefMobile} className="relative w-full">
            <div className="relative flex items-center bg-white border border-gray-300 rounded-2xl px-3 py-2 shadow-xs focus-within:border-[#C7A13A] focus-within:ring-2 focus-within:ring-[#C7A13A]/20 transition-all">
              <Search className="w-4.5 h-4.5 text-gray-400 mr-2 shrink-0 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder-gray-400 focus:outline-none font-serif"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-1 text-gray-400 hover:text-black mr-1">
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center space-x-1.5 pl-2 border-l border-gray-200 ml-1 shrink-0">
                <button onClick={() => setImageSearchModal(true)} className="p-1 text-gray-600 hover:text-[#C7A13A]">
                  <Camera className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={handleVoiceSearch}
                  className={`p-1 transition ${isListening ? "text-red-500 animate-pulse" : "text-gray-600 hover:text-[#C7A13A]"}`}
                >
                  <Mic className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Search Results */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 z-50 animate-fade-in max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                  <span className="text-[11px] font-bold text-[#C7A13A] uppercase tracking-wider">
                    {searchQuery ? `Results (${filteredProducts.length})` : "Popular Searches"}
                  </span>
                  <button onClick={() => setIsSearchFocused(false)} className="text-xs text-gray-400 hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {!searchQuery ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Gold Necklace", "Diamond Ring", "24K Coin", "Bangles"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-[#F7F4EF] hover:bg-[#C7A13A] hover:text-white px-2.5 py-1 rounded-full border border-[#E5DFD3] transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(prod);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#F7F4EF] cursor-pointer transition"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image src={prod.imagePrimary} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-xs text-[#1C1C1C] truncate">{prod.name}</h4>
                          <span className="text-[11px] text-[#C7A13A] font-semibold">
                            {currency === "AED" ? `AED ${prod.priceAED.toLocaleString()}` : `$${prod.priceUSD.toLocaleString()}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP NAVBAR LAYOUT (hidden lg:flex) - Clean 1-Row Professional Header */}
      {/* ========================================================================= */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo Image Only (logo.jpeg), no text */}
          <div className="flex items-center">
            <a href="#" className="relative w-12 h-12 rounded-full border-2 border-[#C7A13A] gold-glow overflow-hidden bg-white shrink-0 block transition-transform duration-300 hover:scale-105">
              <Image src="/logo.jpeg" alt="Logo" fill priority className="object-cover" />
            </a>
          </div>

          {/* Center: Professional Desktop Navigation Links */}
          <nav className="flex items-center space-x-8 text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1C1C]">
            <a href="#collections" className="hover:text-[#C7A13A] transition py-2 border-b-2 border-transparent hover:border-[#C7A13A]">
              Collections
            </a>
            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="hover:text-[#C7A13A] transition py-2 flex items-center border-b-2 border-transparent hover:border-[#C7A13A] cursor-pointer"
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

          {/* Right: Desktop Action Bar (Sleek Compact Search + Action Icons) */}
          <div className="flex items-center space-x-4">
            {/* Compact Desktop Search Input */}
            <div ref={searchContainerRefDesktop} className="relative w-64">
              <div className="relative flex items-center bg-[#FAFAF8] border border-gray-300 rounded-full px-3 py-1.5 focus-within:border-[#C7A13A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#C7A13A]/20 transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search jewellery..."
                  className="w-full bg-transparent text-xs text-[#1C1C1C] placeholder-gray-400 focus:outline-none font-serif"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-0.5 text-gray-400 hover:text-black mr-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="flex items-center space-x-1 pl-1.5 border-l border-gray-200 shrink-0">
                  <button onClick={() => setImageSearchModal(true)} title="Camera Search" className="p-0.5 text-gray-500 hover:text-[#C7A13A]">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={handleVoiceSearch} title="Voice Search" className={`p-0.5 transition ${isListening ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-[#C7A13A]"}`}>
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Desktop Dropdown Search Results */}
              {isSearchFocused && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 z-50 animate-fade-in max-h-[70vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                    <span className="text-[10px] font-bold text-[#C7A13A] uppercase tracking-wider">
                      {searchQuery ? `Results (${filteredProducts.length})` : "Popular Masterpieces"}
                    </span>
                    <button onClick={() => setIsSearchFocused(false)} className="text-xs text-gray-400 hover:text-black">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {!searchQuery ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Gold Necklace", "Solitaire Ring", "24K Coin", "Emerald Choker"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="text-xs bg-[#F7F4EF] hover:bg-[#C7A13A] hover:text-white px-2.5 py-1 rounded-full border border-[#E5DFD3] transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            if (onSelectProduct) onSelectProduct(prod);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F4EF] cursor-pointer transition border border-transparent hover:border-[#C7A13A]/30 group"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                              <Image src={prod.imagePrimary} alt={prod.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-serif font-bold text-xs text-[#1C1C1C] truncate group-hover:text-[#C7A13A] transition">
                                {prod.name}
                              </h4>
                              <span className="text-[11px] text-[#C7A13A] font-semibold">
                                {currency === "AED" ? `AED ${prod.priceAED.toLocaleString()}` : `$${prod.priceUSD.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C7A13A] transition shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Store Locator Icon */}
            <button
              onClick={onOpenAppointment}
              className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition rounded-full hover:bg-gray-100"
              title="Store Locator & Appointments"
            >
              <Store className="w-5.5 h-5.5 stroke-[1.75]" />
            </button>

            {/* Desktop Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
              title="Saved Wishlist"
            >
              <Heart className="w-5.5 h-5.5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#8A1F1F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Desktop Cart Icon */}
            <button
              onClick={onOpenCart}
              className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition relative rounded-full hover:bg-gray-100"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5.5 h-5.5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C7A13A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop VIP Account Icon */}
            <button
              onClick={onOpenAccount}
              className="p-2 text-[#1C1C1C] hover:text-[#C7A13A] transition rounded-full hover:bg-gray-100"
              title="VIP Account"
            >
              <User className="w-5.5 h-5.5 stroke-[1.75]" />
            </button>
          </div>
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
              <h4 className="font-serif text-base font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
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
              <h4 className="font-serif text-base font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
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
              <h4 className="font-serif text-base font-bold text-[#C7A13A] border-b border-[#EAE6DF] pb-2 mb-4">
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
              <div className="relative h-28 w-full mb-3 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400"
                  alt="Featured Collection"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#C7A13A]">Atelier Highlight</span>
              <h5 className="font-serif font-bold text-xs text-[#1C1C1C] mt-0.5">The Royal Emerald Choker</h5>
              <a
                href="#trending"
                onClick={() => setMegaMenuOpen(false)}
                className="mt-2 text-xs font-semibold text-[#1C1C1C] bg-[#C7A13A] hover:bg-[#1C1C1C] hover:text-white px-4 py-1 rounded-full transition inline-block gold-glow"
              >
                View Piece
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Visual Search Modal */}
      {imageSearchModal && (
        <div
          onClick={() => setImageSearchModal(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-gray-200 text-center cursor-default"
          >
            <button
              onClick={() => setImageSearchModal(false)}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-[#F7F4EF] text-[#C7A13A] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C7A13A]/30">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1C1C1C] mb-1">Visual Image Search</h3>
            <p className="text-xs text-gray-600 mb-5">
              Upload or snap a photo of any gold necklace, ring, or design to discover identical masterpieces in our collection.
            </p>
            <div className="border-2 border-dashed border-[#C7A13A]/50 bg-[#F7F4EF]/50 rounded-xl p-6 text-center cursor-pointer hover:bg-[#F7F4EF] transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="visual-search-upload"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSearchQuery("Gold Necklace");
                    setImageSearchModal(false);
                    setIsSearchFocused(true);
                  }
                }}
              />
              <label htmlFor="visual-search-upload" className="cursor-pointer">
                <span className="text-xs font-bold text-[#C7A13A] bg-white px-4 py-2 rounded-full border border-[#C7A13A] inline-block shadow-xs">
                  Choose Photo / Take Picture
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Render Mobile Drawer Portal */}
      {mounted && mobileMenuOpen && createPortal(mobileDrawerContent, document.body)}
    </header>
  );
};
