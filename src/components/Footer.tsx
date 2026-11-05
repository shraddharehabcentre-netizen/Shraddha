"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ShraddhaLogo } from "@/components/ui/ShraddhaLogo";



export function Footer() {
  const { config: siteConfig } = useSiteConfig();
  return (
    <footer className="bg-ink-900 text-slate-300 pt-20 pb-28 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Urgent Callout Card */}
        <div className="bg-dark-mesh bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-100 bg-brand-800/60 px-3 py-1 rounded-full">
              Take the First Step Today
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mt-4 leading-tight">
              Ready to talk, or want to visit {siteConfig.brand.name} in person?
            </h3>
            <p className="text-slate-400 mt-3 text-base">
              Our intake counselors can answer your questions, explain room options, and arrange a private visit or safe assisted pickup.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all"
            >
              Call {siteConfig.contact.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all inline-flex items-center gap-2"
            >
              Book a Visit <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShraddhaLogo className="w-10 h-10" />
              <span className="font-serif text-2xl text-white font-semibold">
                {siteConfig.brand.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.brand.fullName}. Dedicated to ethical, medically supervised addiction recovery and family restoration.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Treatment Programs</Link></li>
              <li><Link href="/facility" className="hover:text-white transition-colors">Experience Our Centre</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About & Care Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Admissions & Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Core Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.programs.map((p) => (
                <li key={p.id}>
                  <Link href="/programs" className="hover:text-white transition-colors">
                    {p.id}. {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Visit & Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

{/* Local SEO "Near Me" & Hyderabad Service Areas Strip */}
<div className="py-6 border-b border-slate-800/80 text-[11px] sm:text-xs text-slate-400 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-300">
            Top-Rated Alcohol Addiction Treatment Programme & Drug Abuse Treatment Center in Hyderabad:
          </p>
          <p>
            Looking for the <strong className="text-slate-300 font-medium">best de-addiction centres in Hyderabad</strong> or an <strong className="text-slate-300 font-medium">alcohol abuse treatment center near you</strong>? Located in Parvathapur, Uppal, Shraddha Rehabilitation Centre provides 24/7 medically supervised detox, residential rehabilitation, and safe assisted home pickup across <span className="text-slate-300">Uppal, LB Nagar, Dilsukhnagar, Secunderabad, ECIL, Habsiguda, Nacharam, Boduppal, Medipally, Tarnaka, Kukatpally, Kompally, Gachibowli, Warangal, Nalgonda, Suryapet, Khammam, Karimnagar</span>, and all districts of Telangana.
          </p>
        </div>
        
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brand.fullName}. All rights reserved.</p>
          <p>Strict Patient Privacy & Medical Confidentiality Maintained.</p>
        </div>
      </div>
    </footer>
  );
}