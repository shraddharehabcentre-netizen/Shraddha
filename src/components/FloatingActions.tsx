"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function FloatingActions() {
  return (
    <>
      {/* MOBILE (< 640px): Sleek Docked Bottom Action Bar (Never obscures form inputs or headings) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="flex items-center justify-center gap-2 bg-ink-900 active:bg-brand-800 text-white py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-accent-500 shrink-0" />
            <span className="truncate">Call 24/7 Helpline</span>
          </a>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
              siteConfig.contact.whatsappDefaultMsg
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 active:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">WhatsApp Chat</span>
          </a>
        </div>
      </div>

      {/* DESKTOP & TABLET (>= 640px): Floating Bottom-Right Pills */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40 flex-row items-center gap-3">
        <a
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            siteConfig.contact.whatsappDefaultMsg
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-semibold"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Confidential WhatsApp</span>
        </a>

        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex items-center gap-2 bg-ink-900 hover:bg-brand-800 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-semibold"
        >
          <Phone className="w-4 h-4 text-accent-500" />
          <span>24/7 Helpline: {siteConfig.contact.phoneDisplay}</span>
        </a>
      </div>
    </>
  );
}