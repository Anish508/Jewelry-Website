"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { CategoryGrid } from "@/components/CategoryGrid";
import { TrendingProducts } from "@/components/TrendingProducts";
import { WeddingBanner } from "@/components/WeddingBanner";
import { DiamondMagazine } from "@/components/DiamondMagazine";
import { OccasionGrid } from "@/components/OccasionGrid";
import { WhyUs } from "@/components/WhyUs";
import { CustomerStories } from "@/components/CustomerStories";
import { InstagramGallery } from "@/components/InstagramGallery";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { Modals } from "@/components/Modals";
import { QuickActionsPopup } from "@/components/QuickActionsPopup";
import { Product, PRODUCTS } from "@/data/jewelleryData";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  // App Global State
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number; selectedKarat: string; selectedSize: string }[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedKarat: PRODUCTS[0].karat,
      selectedSize: '16"',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Currency switcher state
  const [currency, setCurrency] = useState<"AED" | "USD">("AED");

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart actions
  const handleAddToCart = (product: Product) => {
    handleAddToCartDetailed(product, 1, product.karat, product.availableSizes ? product.availableSizes[0] : "Standard");
  };

  const handleAddToCartDetailed = (product: Product, quantity: number, karat: string, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedKarat === karat && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedKarat === karat && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedKarat: karat, selectedSize: size }];
    });
    showNotification(`Added "${product.name}" to your luxury shopping bag.`);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) => prev.map((item) => (item.product.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((i) => i !== product.id));
      showNotification(`Removed "${product.name}" from your saved wishlist.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showNotification(`Saved "${product.name}" to your wishlist.`);
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistIds((prev) => prev.filter((i) => i !== id));
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1C1C1C]">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0D0D0C] text-[#FAFAF8] px-5 py-3 rounded-full shadow-2xl border border-[#C7A13A] flex items-center space-x-2 animate-fade-in text-xs font-semibold gold-glow">
          <CheckCircle2 className="w-4 h-4 text-[#C7A13A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenAppointment={() => setAppointmentOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <HeroCarousel onOpenAppointment={() => setAppointmentOpen(true)} />
        <FeaturedCollections />
        <CategoryGrid />
        <TrendingProducts
          onQuickView={(p) => setQuickViewProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          currency={currency}
        />
        <WeddingBanner onOpenAppointment={() => setAppointmentOpen(true)} />
        <DiamondMagazine />
        <OccasionGrid />
        <WhyUs />
        <CustomerStories />
        <InstagramGallery />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals, Overlays & Drawers */}
      <Modals
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        cartOpen={cartOpen}
        onCloseCart={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        wishlistOpen={wishlistOpen}
        onCloseWishlist={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveWishlistToCart={handleMoveWishlistToCart}
        appointmentOpen={appointmentOpen}
        onCloseAppointment={() => setAppointmentOpen(false)}
        searchOpen={searchOpen}
        onCloseSearch={() => setSearchOpen(false)}
        allProducts={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        accountOpen={accountOpen}
        onCloseAccount={() => setAccountOpen(false)}
        onAddToCartDetailed={handleAddToCartDetailed}
        currency={currency}
      />

      {/* Quick Actions & VIP Discovery Popup */}
      <QuickActionsPopup
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
        onOpenAppointment={() => setAppointmentOpen(true)}
        currency={currency}
      />
    </div>
  );
}
