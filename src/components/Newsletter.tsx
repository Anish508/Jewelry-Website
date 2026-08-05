"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-[#F7F4EF] border-t border-[#EAE8E4]">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#C7A13A]/40 flex items-center justify-center mx-auto gold-glow">
            <Mail className="w-5 h-5 text-[#C7A13A]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A13A]">
              Private Invitations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1C1C]">
              Join The Emirates Gold Circle
            </h2>
            <p className="text-sm text-[#5A5A5A] max-w-lg mx-auto">
              Subscribe to receive private previews of new haute joaillerie releases, exclusive Dubai gold rate insights, and invitations to boutique private events.
            </p>
          </div>

          {subscribed ? (
            <div className="bg-[#FAFAF8] border border-[#C7A13A] p-4 rounded-full max-w-md mx-auto flex items-center justify-center space-x-2 text-[#1C1C1C] animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-[#C7A13A]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Thank you for subscribing to Emirates Gold Circle.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-6 py-4 rounded-full bg-[#FAFAF8] border border-[#EAE8E4] text-sm text-[#1C1C1C] focus:outline-none focus:border-[#C7A13A] transition"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#1C1C1C] hover:bg-[#C7A13A] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition duration-300 gold-glow"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
};
