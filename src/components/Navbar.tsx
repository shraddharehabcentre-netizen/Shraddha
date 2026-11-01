"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ShieldAlert, Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ShraddhaLogo } from "@/components/ui/ShraddhaLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Our Facility", href: "/facility" },
  { name: "Admissions", href: "/#assessment" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleQuickExit = () => {
    window.location.replace("https://www.google.com");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Emergency & Privacy Bar */}
      <div className="bg-brand-900 text-white text-[10px] sm:text-xs py-1.5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium truncate">
              24/7 Helpline • {siteConfig.brand.city}
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hover:text-accent-500 transition-colors font-semibold hidden sm:inline"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <button
              onClick={handleQuickExit}
              title="Quickly leaves this page to Google"
              className="inline-flex items-center gap-1 bg-white/15 hover:bg-rose-600 text-white px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors whitespace-nowrap"
            >
              <ShieldAlert className="w-3 h-3 shrink-0" />
              <span>Quick Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Header (Full SHRADDHA visibility on 320px+ screens) */}
      <div className="backdrop-blur-xl bg-background/95 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Left: Brand Logo + Full Non-Truncated Title */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3.5 group shrink-0"
          >
            <ShraddhaLogo className="w-8 h-8 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-sans text-[15px] xs:text-base sm:text-2xl font-bold tracking-[0.1em] sm:tracking-[0.24em] text-brand-700 leading-none whitespace-nowrap">
                {siteConfig.brand.name}
              </span>
              <span className="text-[9px] sm:text-[11px] tracking-[0.06em] sm:tracking-[0.18em] text-ink-600 font-normal mt-1 whitespace-nowrap">
                {siteConfig.brand.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links + Pill Button */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9 shrink-0">
            <nav className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-colors duration-200 whitespace-nowrap ${
                      active
                        ? "text-brand-700 font-semibold"
                        : "text-ink-900 hover:text-brand-700 font-normal"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 shadow-sm transition-all whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <Link
              href="/contact"
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-brand-700 active:scale-95 transition-transform whitespace-nowrap"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-surface text-ink-900 border border-slate-200/80 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl text-sm font-semibold text-ink-900 hover:bg-surface transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-700 text-white font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5" /> Call 24/7
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.contact.whatsappDefaultMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}