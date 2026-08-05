"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ShoppingBag, Heart, Star, Check, Phone, Search, Truck } from "lucide-react";
import { Product, STORE_LOCATIONS } from "@/data/jewelleryData";

interface ModalsProps {
  quickViewProduct: Product | null;
  onCloseQuickView: () => void;
  cartOpen: boolean;
  onCloseCart: () => void;
  cartItems: { product: Product; quantity: number; selectedKarat: string; selectedSize: string }[];
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveFromCart: (id: string) => void;
  wishlistOpen: boolean;
  onCloseWishlist: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onMoveWishlistToCart: (product: Product) => void;
  appointmentOpen: boolean;
  onCloseAppointment: () => void;
  searchOpen: boolean;
  onCloseSearch: () => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  accountOpen: boolean;
  onCloseAccount: () => void;
  onAddToCartDetailed: (product: Product, quantity: number, karat: string, size: string) => void;
  currency: "AED" | "USD";
}

export const Modals: React.FC<ModalsProps> = ({
  quickViewProduct,
  onCloseQuickView,
  cartOpen,
  onCloseCart,
  cartItems,
  onUpdateCartQty,
  onRemoveFromCart,
  wishlistOpen,
  onCloseWishlist,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveWishlistToCart,
  appointmentOpen,
  onCloseAppointment,
  searchOpen,
  onCloseSearch,
  allProducts,
  onSelectProduct,
  accountOpen,
  onCloseAccount,
  onAddToCartDetailed,
  currency,
}) => {
  // Quick view local options
  const [selectedKarat, setSelectedKarat] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Appointment form local state
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [store, setStore] = useState(STORE_LOCATIONS[0]);
  const [appDate, setAppDate] = useState("");
  const [appTime, setAppTime] = useState("14:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Search local state
  const [searchQuery, setSearchQuery] = useState("");

  // Account local tab
  const [accountTab, setAccountTab] = useState<"login" | "register">("login");

  // Lock background scroll when any modal or drawer is active
  const isAnyModalOpen = Boolean(
    quickViewProduct || cartOpen || wishlistOpen || appointmentOpen || accountOpen
  );

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyModalOpen]);

  // Calculate cart total
  const cartSubtotalAED = cartItems.reduce((acc, item) => acc + item.product.priceAED * item.quantity, 0);
  const cartSubtotalUSD = cartItems.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const freeShippingThresholdAED = 10000;
  const shippingProgress = Math.min((cartSubtotalAED / freeShippingThresholdAED) * 100, 100);

  return (
    <>
      {/* ================= QUICK VIEW MODAL ================= */}
      {quickViewProduct && (
        <div
          onClick={onCloseQuickView}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAFAF8] rounded-2xl max-w-3xl w-full p-5 sm:p-8 relative max-h-[92vh] overflow-y-auto animate-fade-in border border-[#EAE8E4] shadow-2xl cursor-default"
          >
            {/* Prominent Circular Close Button */}
            <button
              onClick={onCloseQuickView}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 bg-[#0D0D0C] text-white p-2.5 rounded-full shadow-2xl hover:bg-[#C7A13A] border border-[#C7A13A]/50 transition flex items-center justify-center group"
              title="Close (Esc)"
              aria-label="Close Product View"
            >
              <X className="w-5 h-5 text-[#C7A13A] group-hover:text-white transition-colors" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center pt-2">
              {/* Product Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F7F4EF] border border-[#EAE8E4]">
                <Image
                  src={quickViewProduct.imagePrimary}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Options */}
              <div className="space-y-3 sm:space-y-4">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#C7A13A]">
                  {quickViewProduct.category} • {quickViewProduct.karat}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C]">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center space-x-2 text-xs text-[#5A5A5A]">
                  <div className="flex text-[#C7A13A]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="ml-1 font-bold text-[#1C1C1C]">{quickViewProduct.rating}</span>
                  </div>
                  <span>({quickViewProduct.reviewsCount} Atelier Reviews)</span>
                </div>

                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1C1C]">
                  {currency === "AED"
                    ? `AED ${quickViewProduct.priceAED.toLocaleString()}`
                    : `$${quickViewProduct.priceUSD.toLocaleString()} USD`}
                </div>

                <p className="text-xs text-[#5A5A5A] leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Karat Selection */}
                {quickViewProduct.karatOptions && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] sm:text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Karat Purity
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickViewProduct.karatOptions.map((k) => (
                        <button
                          key={k}
                          onClick={() => setSelectedKarat(k)}
                          className={`px-3 py-1 text-xs rounded-full border font-medium transition ${
                            selectedKarat === k || (!selectedKarat && k === quickViewProduct.karat)
                              ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                              : "bg-[#FAFAF8] text-[#1C1C1C] border-[#EAE8E4] hover:border-[#C7A13A]"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {quickViewProduct.availableSizes && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] sm:text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider block">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickViewProduct.availableSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 text-xs rounded-full border font-medium transition ${
                            selectedSize === s || (!selectedSize && s === quickViewProduct.availableSizes![0])
                              ? "bg-[#C7A13A] text-white border-[#C7A13A]"
                              : "bg-[#FAFAF8] text-[#1C1C1C] border-[#EAE8E4] hover:border-[#C7A13A]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA */}
                <div className="pt-3 sm:pt-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center border border-[#EAE8E4] rounded-full px-2.5 py-1 bg-[#F7F4EF]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 font-bold text-xs sm:text-sm text-[#1C1C1C]"
                    >
                      -
                    </button>
                    <span className="px-2 font-semibold text-xs sm:text-sm text-[#1C1C1C]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 font-bold text-xs sm:text-sm text-[#1C1C1C]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCartDetailed(
                        quickViewProduct,
                        quantity,
                        selectedKarat || quickViewProduct.karat,
                        selectedSize || (quickViewProduct.availableSizes ? quickViewProduct.availableSizes[0] : "Standard")
                      );
                      onCloseQuickView();
                    }}
                    className="flex-1 py-3 bg-[#1C1C1C] hover:bg-[#C7A13A] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition gold-glow"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SHOPPING CART DRAWER ================= */}
      {cartOpen && (
        <div
          onClick={onCloseCart}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FAFAF8] h-full p-4 sm:p-6 flex flex-col justify-between shadow-2xl animate-slide-right border-l border-[#EAE8E4] cursor-default"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE8E4] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#C7A13A]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1C1C]">Your Shopping Bag</h3>
                </div>
                <button onClick={onCloseCart} className="p-1.5 text-[#1C1C1C] hover:text-[#C7A13A] rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Free Insured Shipping Bar */}
              <div className="bg-[#F7F4EF] p-3 rounded-xl border border-[#C7A13A]/30 mb-4 text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[#1C1C1C]">
                  <span className="font-semibold flex items-center text-[11px] sm:text-xs">
                    <Truck className="w-3.5 h-3.5 mr-1 text-[#C7A13A]" /> Global Express Delivery
                  </span>
                  <span className="font-bold text-[#C7A13A] text-[11px] sm:text-xs">
                    {shippingProgress >= 100 ? "Unlocked!" : `AED ${cartSubtotalAED.toLocaleString()} / 10,000`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#C7A13A] h-full transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
                </div>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-serif text-[#5A5A5A]">Your shopping bag is empty.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center bg-[#F7F4EF] p-3 rounded-xl border border-[#EAE8E4]">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <Image src={item.product.imagePrimary} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1C1C] truncate">{item.product.name}</h4>
                        <span className="text-[10px] text-[#5A5A5A] block truncate">{item.selectedKarat} • Size: {item.selectedSize}</span>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#1C1C1C]">
                            {currency === "AED" ? `AED ${(item.product.priceAED * item.quantity).toLocaleString()}` : `$${(item.product.priceUSD * item.quantity).toLocaleString()}`}
                          </span>
                          <div className="flex items-center space-x-1.5 bg-white rounded-full px-2 border border-[#EAE8E4]">
                            <button onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)} className="px-1 font-bold text-xs">-</button>
                            <span className="text-xs font-semibold">{item.quantity}</span>
                            <button onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)} className="px-1 font-bold text-xs">+</button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => onRemoveFromCart(item.product.id)} className="text-gray-400 hover:text-[#8A1F1F] p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Total */}
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-[#EAE8E4] space-y-3">
                <div className="flex justify-between items-center font-serif text-base sm:text-lg font-bold text-[#1C1C1C]">
                  <span>Subtotal</span>
                  <span>{currency === "AED" ? `AED ${cartSubtotalAED.toLocaleString()}` : `$${cartSubtotalUSD.toLocaleString()} USD`}</span>
                </div>
                <button
                  onClick={() => alert("Proceeding to secure UAE Emirates Gold Checkout!")}
                  className="w-full py-3.5 bg-[#1C1C1C] hover:bg-[#C7A13A] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition gold-glow"
                >
                  Proceed To Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= WISHLIST DRAWER ================= */}
      {wishlistOpen && (
        <div
          onClick={onCloseWishlist}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FAFAF8] h-full p-4 sm:p-6 flex flex-col justify-between shadow-2xl animate-slide-right border-l border-[#EAE8E4] cursor-default"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE8E4] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#8A1F1F] fill-current" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1C1C]">Your Saved Wishlist</h3>
                </div>
                <button onClick={onCloseWishlist} className="p-1.5 text-[#1C1C1C] hover:text-[#C7A13A] rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-serif text-[#5A5A5A]">You haven't saved any jewellery items yet.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {wishlistProducts.map((prod) => (
                    <div key={prod.id} className="flex gap-3 items-center bg-[#F7F4EF] p-3 rounded-xl border border-[#EAE8E4]">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <Image src={prod.imagePrimary} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1C1C] truncate">{prod.name}</h4>
                        <span className="font-serif font-bold text-xs text-[#1C1C1C] block">
                          {currency === "AED" ? `AED ${prod.priceAED.toLocaleString()}` : `$${prod.priceUSD.toLocaleString()}`}
                        </span>
                        <button
                          onClick={() => onMoveWishlistToCart(prod)}
                          className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#C7A13A] px-3 py-1 rounded-full inline-block text-center"
                        >
                          Move To Cart
                        </button>
                      </div>
                      <button onClick={() => onRemoveFromWishlist(prod.id)} className="text-gray-400 hover:text-[#8A1F1F] p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* ================= ACCOUNT DRAWER ================= */}
      {accountOpen && (
        <div
          onClick={onCloseAccount}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[#FAFAF8] h-full p-4 sm:p-6 flex flex-col justify-between shadow-2xl animate-slide-right border-l border-[#EAE8E4] cursor-default"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE8E4] pb-3 mb-5">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1C1C]">Client Account</h3>
                <button onClick={onCloseAccount} className="p-1.5 text-[#1C1C1C] hover:text-[#C7A13A] rounded-full hover:bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex border-b border-[#EAE8E4] mb-5">
                <button
                  onClick={() => setAccountTab("login")}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider ${
                    accountTab === "login" ? "text-[#C7A13A] border-b-2 border-[#C7A13A]" : "text-gray-400"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAccountTab("register")}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider ${
                    accountTab === "register" ? "text-[#C7A13A] border-b-2 border-[#C7A13A]" : "text-gray-400"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Sign In Successful!"); onCloseAccount(); }} className="space-y-3 sm:space-y-4">
                {accountTab === "register" && (
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider block">Full Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full px-3.5 py-2.5 bg-[#F7F4EF] rounded-xl border border-[#EAE8E4] text-xs text-[#1C1C1C]" />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider block">Email Address</label>
                  <input type="email" required placeholder="client@emiratesgold.com" className="w-full px-3.5 py-2.5 bg-[#F7F4EF] rounded-xl border border-[#EAE8E4] text-xs text-[#1C1C1C]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-xs font-semibold text-[#1C1C1C] uppercase tracking-wider block">Password</label>
                  <input type="password" required placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-[#F7F4EF] rounded-xl border border-[#EAE8E4] text-xs text-[#1C1C1C]" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-[#1C1C1C] hover:bg-[#C7A13A] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition gold-glow">
                  {accountTab === "login" ? "Sign In To Account" : "Register Member"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Bar (WhatsApp Concierge) */}
      <a
        href="https://wa.me/97148004653"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-white"
        title="Chat with WhatsApp Concierge"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>
    </>
  );
};
