"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";
import { SelfAssessment } from "@/components/SelfAssessment";
import { FacilityImage } from "@/components/ui/FacilityImage";

export default function HomePage() {
  const [activeSpace, setActiveSpace] = useState(siteConfig.campusSpaces[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroImgSrc, setHeroImgSrc] = useState(siteConfig.hero.portraitImageUrl);

  return (
    <div className="overflow-hidden">
      {/* =========================================================
          1. HERO SECTION (RESPONSIVE SPLIT LAYOUT FOR MOBILE & DESKTOP)
         ========================================================= */}
      <section className="relative bg-apple-mesh pt-4 pb-12 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* LEFT COLUMN: Portrait Card with Overlaid Serif Headline */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative w-full max-w-[440px] mx-auto lg:mx-0 aspect-[4/4.6] sm:aspect-[4/4.8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-apple border border-slate-200/80 bg-[#F5EFE6]">
                  <img
                    src={heroImgSrc}
                    onError={() =>
                      setHeroImgSrc(siteConfig.hero.portraitImageFallback)
                    }
                    alt={siteConfig.hero.portraitImageAlt}
                    className="w-full h-full object-cover object-bottom scale-[1.01] transition-transform duration-700 hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.78) 40%, rgba(250,248,245,0.10) 70%, rgba(15,23,42,0.15) 100%)",
                    }}
                  />

                  <div className="absolute top-0 left-0 right-0 p-5 sm:p-8 z-10">
                    <h1 className="font-serif text-[clamp(1.6rem,5.5vw,2.65rem)] font-bold text-ink-900 leading-[1.15] tracking-tight">
                      <span className="italic text-brand-700 font-semibold">
                        {siteConfig.hero.highlightedWord}
                      </span>{" "}
                      {siteConfig.hero.headlineRest}
                    </h1>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Editorial Quote, Mobile-Friendly CTAs & Trust Checks */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-2 xl:pl-6">
              <Reveal delay={0.08}>
                <blockquote className="font-serif italic font-semibold text-[clamp(1.15rem,3.8vw,2rem)] text-ink-900 leading-[1.45] max-w-2xl">
                  {siteConfig.hero.quoteBeforeBrand}
                  <span className="text-brand-700 underline decoration-brand-600/50 underline-offset-4">
                    {siteConfig.hero.quoteBrandHighlight}
                  </span>
                  {siteConfig.hero.quoteAfterBrand}
                </blockquote>
              </Reveal>

              {/* CTA Row: Full-width buttons on mobile, inline pill + link on desktop */}
              <Reveal delay={0.15}>
                <div className="mt-6 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm sm:text-base shadow-apple transition-all text-center"
                  >
                    {siteConfig.hero.primaryCta}
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      siteConfig.contact.whatsappDefaultMsg
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 sm:py-2 px-4 sm:px-0 rounded-xl sm:rounded-none bg-white sm:bg-transparent border border-slate-200 sm:border-0 text-sm sm:text-base font-semibold text-ink-900 hover:text-brand-700 transition-colors group"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 sm:hidden" />
                    <span>{siteConfig.hero.secondaryCta}</span>
                    <ArrowRight className="w-4 h-4 text-brand-700 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>

              {/* Trust Micro-Checkmarks */}
              <Reveal delay={0.22}>
                <div className="mt-5 sm:mt-7 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-ink-600 font-medium">
                  {siteConfig.hero.trustChecks.map((check, index) => (
                    <div key={index} className="inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-700 stroke-[2.5] shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Quick Stats Strip */}
              <Reveal delay={0.28}>
                <div className="mt-7 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl">
                  <div>
                    <p className="font-serif text-xl sm:text-3xl font-bold text-brand-700">
                      24/7
                    </p>
                    <p className="text-[11px] sm:text-xs text-ink-600 mt-0.5 leading-tight">
                      Medical Supervision
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-3xl font-bold text-brand-700">
                      1:6
                    </p>
                    <p className="text-[11px] sm:text-xs text-ink-600 mt-0.5 leading-tight">
                     Care/Resident Ratio
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-3xl font-bold text-brand-700">
                      100%
                    </p>
                    <p className="text-[11px] sm:text-xs text-ink-600 mt-0.5 leading-tight">
                      Private & Discreet
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          2. "YOU DON'T HAVE TO FIGHT THIS ALONE" SECTION
         ========================================================= */}
      <section className="py-12 sm:py-20 lg:py-24 bg-background border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-sans text-xl sm:text-3xl lg:text-4xl font-semibold text-ink-900 tracking-tight">
                {siteConfig.empathySection.heading}
              </h2>
              <p className="mt-3 text-ink-600 text-xs sm:text-base lg:text-lg leading-relaxed">
                {siteConfig.empathySection.subtext}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {siteConfig.empathySection.pillars.map((pillar, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-apple">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-50 border border-brand-100 text-brand-700 font-serif font-bold text-sm sm:text-base flex items-center justify-center mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl text-ink-900 font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-base text-ink-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          3. INTERACTIVE FAMILY & SELF-ASSESSMENT SECTION
         ========================================================= */}
      <SelfAssessment />

      {/* =========================================================
          4. NUMBERED 01-04 RECOVERY PROGRAMS
         ========================================================= */}
      <section className="py-14 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-3">
            <div className="max-w-2xl">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
                Clinical Care Pathways
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-ink-900 mt-1.5 leading-tight">
                Structured Recovery Programs
              </h2>
            </div>
            <Link
              href="/programs"
              className="text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5"
            >
              View full program details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Horizontally scrollable condition pills on mobile, wrapped on desktop */}
        <Reveal delay={0.05}>
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 mb-8 sm:mb-10 no-scrollbar">
            {siteConfig.conditionsWeTreat.map((item, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface border border-slate-200/90 text-xs sm:text-sm font-medium text-ink-900 whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {siteConfig.programs.map((program, idx) => (
            <Reveal key={program.id} delay={idx * 0.08}>
              <div className="group h-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-9 border border-slate-200/80 shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="font-serif text-xl sm:text-3xl font-semibold text-brand-700 bg-brand-50 px-3.5 py-1 rounded-xl border border-brand-100">
                      {program.id}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-surface text-ink-600">
                      {program.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl text-ink-900 font-semibold group-hover:text-brand-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-accent-600 mt-1">
                    {program.tagline}
                  </p>
                  <p className="text-ink-600 text-xs sm:text-base mt-3 leading-relaxed">
                    {program.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {program.highlights.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-ink-900"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      program.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5"
                  >
                    Inquire about Program {program.id}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =========================================================
          5. INTERACTIVE "GLIMPSE OF THE CENTRE" WALKTHROUGH
         ========================================================= */}
      <section className="py-14 sm:py-24 bg-surface/80 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-3">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
                  A Glimpse of the Centre
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-ink-900 mt-1.5">
                  Experience Our Healing Spaces
                </h2>
              </div>
              <p className="text-ink-600 max-w-md text-xs sm:text-base">
                Step inside {siteConfig.brand.shortName}. Select any space below to see where residents rest, heal, dine, and rebuild their daily rhythm.
              </p>
            </div>
          </Reveal>

          {/* Space Selector Pills */}
          <div className="flex overflow-x-auto pb-2.5 sm:pb-0 sm:flex-wrap gap-2 mb-6 sm:mb-10 no-scrollbar">
            {siteConfig.campusSpaces.map((space) => {
              const isSelected = activeSpace.id === space.id;
              return (
                <button
                  key={space.id}
                  onClick={() => setActiveSpace(space)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-brand-700 text-white shadow-sm"
                      : "bg-white text-ink-600 hover:text-ink-900 border border-slate-200"
                  }`}
                >
                  {space.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpace.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-apple"
            >
              <div className="lg:col-span-7 relative h-60 sm:h-80 lg:h-auto lg:min-h-[420px] bg-slate-100">
  <FacilityImage
    src={activeSpace.imagePlaceholder}
    fallbackSrc={activeSpace.imageFallback}
    alt={activeSpace.title}
    privacyBlur={activeSpace.privacyBlur}
    blurZone={activeSpace.blurZone}
  />
</div>

              <div className="lg:col-span-5 p-5 sm:p-9 lg:p-12 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
                    {activeSpace.label}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl text-ink-900 mt-1.5">
                    {activeSpace.title}
                  </h3>
                  <p className="text-ink-600 mt-3 leading-relaxed text-xs sm:text-base">
                    {activeSpace.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                    {activeSpace.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm font-medium text-ink-900"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href="/facility"
                    className="text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1.5"
                  >
                    See full facility & daily routine{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          6. FREQUENTLY ASKED QUESTIONS
         ========================================================= */}
      <section className="py-14 sm:py-24 max-w-4xl mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              Clarity for Families
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink-900 mt-1.5">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3 sm:space-y-4">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3"
                >
                  <span className="font-semibold text-sm sm:text-lg text-ink-900 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-brand-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-base text-ink-600 leading-relaxed border-t border-slate-100 pt-3.5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}