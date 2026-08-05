"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, ShieldCheck, Camera } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-[#FAFAF8] pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.jpeg" alt="Logo" width={40} height={40} className="rounded-full border border-[#C7A13A]/50" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  EMIRATES GOLD
                </span>
                <span className="text-[9px] tracking-[0.25em] font-medium text-[#C7A13A] uppercase block">
                  INTERNATIONAL ATELIER
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Emirates Gold International is a premier luxury jewellery brand recognized globally for pure 22K/24K gold craftsmanship, GIA certified solitaires, and royal bridal couture.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C7A13A]" />
                <span>Fashion Avenue, The Dubai Mall, Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C7A13A]" />
                <span>+971 4 800 GOLD (4653)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C7A13A]" />
                <span>concierge@emiratesgold.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C7A13A]/40 pb-2">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#collections" className="hover:text-[#C7A13A] transition">Royal Gold Jewellery</a></li>
              <li><a href="#collections" className="hover:text-[#C7A13A] transition">GIA Solitaire Rings</a></li>
              <li><a href="#bridal" className="hover:text-[#C7A13A] transition">Bridal Wedding Sets</a></li>
              <li><a href="#collections" className="hover:text-[#C7A13A] transition">18K Minimalist Daily Wear</a></li>
              <li><a href="#collections" className="hover:text-[#C7A13A] transition">24K Investment Bullion</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C7A13A]/40 pb-2">
              Customer Atelier
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-[#C7A13A] transition">Book VIP Consultation</a></li>
              <li><a href="#" className="hover:text-[#C7A13A] transition">Gold Rate Exchange Calculator</a></li>
              <li><a href="#" className="hover:text-[#C7A13A] transition">Certificates & Purity Verification</a></li>
              <li><a href="#" className="hover:text-[#C7A13A] transition">Insured Global Delivery</a></li>
              <li><a href="#" className="hover:text-[#C7A13A] transition">Bespoke Custom Commissions</a></li>
            </ul>
          </div>

          {/* Policies & Stores */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 border-b border-[#C7A13A]/40 pb-2">
              Boutique Stores
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span className="text-white font-medium">Dubai Mall Boutique</span></li>
              <li><span className="text-white font-medium">Gold & Diamond Park</span></li>
              <li><span className="text-white font-medium">Galleria Mall Abu Dhabi</span></li>
              <li><span className="text-white font-medium">Mayfair Atelier, London</span></li>
            </ul>

            <div className="pt-4 flex items-center space-x-2 text-[11px] text-[#C7A13A]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Certified UAE Hallmark</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Emirates Gold International. All Rights Reserved.</p>

          <div className="flex items-center space-x-4">
            <span className="hover:text-gray-300 transition cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-300 transition cursor-pointer">Terms of Luxury Service</span>
            <span>•</span>
            <span className="hover:text-gray-300 transition cursor-pointer">Store Locator</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
