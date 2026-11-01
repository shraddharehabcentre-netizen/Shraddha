"use client";

import React from "react";
import Link from "next/link";
import { Clock, ShieldCheck, Sun, Sunset, Moon, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";
import { FacilityImage } from "@/components/ui/FacilityImage";

export default function FacilityPage() {
  return (
    <div className="py-8 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Page Header */}
        <Reveal>
          <div className="max-w-3xl mb-8 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              Transparency, Brotherhood & Dignity
            </span>
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-ink-900 mt-1.5 leading-tight">
              Life Inside {siteConfig.brand.shortName}
            </h1>
            <p className="text-xs sm:text-lg text-ink-600 mt-3 sm:mt-4 leading-relaxed">
              We believe families deserve complete transparency. Explore our real counselling rooms, fellowship hall, dining area, and structured daily recovery routine at our Uppal, Hyderabad centre.
            </p>
          </div>
        </Reveal>

        {/* All 5 Real Campus Spaces Grid (100% Unblurred) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-14 sm:mb-24">
          {siteConfig.campusSpaces.map((space, i) => (
            <Reveal
              key={space.id}
              delay={i * 0.05}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <div
                className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-apple h-full flex flex-col ${
                  i === 0 ? "lg:grid lg:grid-cols-12" : ""
                }`}
              >
                <div
                  className={`${
                    i === 0
                      ? "lg:col-span-7 h-56 sm:h-80 lg:h-full min-h-[260px]"
                      : "h-56 sm:h-72"
                  } bg-slate-100 relative overflow-hidden`}
                >
                  <FacilityImage
                    src={space.imagePlaceholder}
                    altCandidates={space.altCandidates}
                    fallbackSrc={space.imageFallback}
                    alt={space.title}
                  />
                </div>

                <div
                  className={`${
                    i === 0 ? "lg:col-span-5" : ""
                  } p-5 sm:p-8 flex-1 flex flex-col justify-between`}
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-700">
                      {space.label}
                    </span>
                    <h2 className="font-serif text-lg sm:text-2xl text-ink-900 mt-1 font-semibold">
                      {space.title}
                    </h2>
                    <p className="text-ink-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 sm:gap-2">
                    {space.features.map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-surface px-2.5 py-1 rounded-full text-ink-900"
                      >
                        <ShieldCheck className="w-3 h-3 text-brand-700 shrink-0" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* =========================================================
            CLEAN, RESPONSIVE 19-SLOT DAILY SCHEDULE TIMELINE
           ========================================================= */}
        <Reveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-slate-200/90 shadow-apple max-w-4xl mx-auto">
            {/* Schedule Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-700 mb-1">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                    Structured Recovery Rhythm
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-3xl text-ink-900 font-semibold">
                  A Typical Day at {siteConfig.brand.shortName}
                </h2>
                <p className="text-ink-600 text-xs sm:text-sm mt-1">
                  From 5:30 AM wake-up to 9:00 PM sleep, every hour is designed to restore physical health, emotional clarity, and 12-Step discipline.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-50 text-brand-800 border border-brand-100 whitespace-nowrap">
                  5:30 AM – 9:00 PM
                </span>
              </div>
            </div>

            {/* Time-of-Day Legend Pills */}
            <div className="flex flex-wrap items-center gap-2 my-5 text-[11px] font-semibold text-ink-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                <Sun className="w-3.5 h-3.5 text-amber-600" /> Morning Wellness & Sessions
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200/60">
                <Sunset className="w-3.5 h-3.5 text-brand-700" /> Afternoon Counselling & Recreation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                <Moon className="w-3.5 h-3.5 text-slate-600" /> Evening Fellowship & Rest
              </span>
            </div>

            {/* Clean Vertical Timeline List (Never wraps awkwardly on 320px screens) */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-brand-100 space-y-2.5 sm:space-y-3 mt-4">
              {siteConfig.dailySchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="relative group bg-background/70 hover:bg-surface/70 border border-slate-200/70 rounded-xl sm:rounded-2xl p-3 sm:px-5 sm:py-3.5 transition-all"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[21px] sm:-left-[29px] top-4 sm:top-1/2 sm:-translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-white" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                    {/* Left: Time Badge + Activity Name */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 min-w-0">
                      {/* Top Row on Mobile: Time + Category inline */}
                      <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="font-mono text-[11px] sm:text-xs font-bold text-brand-800 bg-brand-50 border border-brand-200/60 px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 sm:w-40 sm:text-center">
                          {slot.time}
                        </span>

                        {/* Mobile Category Badge (Aligned cleanly on top-right of card) */}
                        <span className="sm:hidden text-[10px] font-semibold text-ink-600 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {slot.category}
                        </span>
                      </div>

                      {/* Activity Title */}
                      <span className="font-semibold text-ink-900 text-sm sm:text-base leading-snug pt-0.5 sm:pt-0">
                        {slot.activity}
                      </span>
                    </div>

                    {/* Desktop Category Pill */}
                    <span className="hidden sm:inline-flex text-xs font-semibold text-ink-600 bg-white border border-slate-200/80 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      {slot.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Schedule CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-ink-600">
                Want to visit our Uppal centre and see our daily routine in person?
              </p>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-brand-700 hover:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
              >
                <span>Book a Centre Visit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}