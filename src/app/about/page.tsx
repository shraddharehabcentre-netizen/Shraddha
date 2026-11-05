"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartHandshake,
  Shield,
  Users,
  Award,
  Plus,
  X,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  Quote,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function AboutPage() {
  const { config: siteConfig } = useSiteConfig();
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [founderImgSrc, setFounderImgSrc] = useState(
    siteConfig.founder.imageUrl
  );

  // Lock background scroll & handle ESC key when Apple Modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsJourneyOpen(false);
    };
    if (isJourneyOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJourneyOpen]);

  const pillars = [
    {
      icon: HeartHandshake,
      title: "Lived Empathy Over Judgment",
      desc: "Guided by a founder who has walked 13 years of sobriety, we treat every resident with deep human dignity and zero stigma.",
    },
    {
      icon: Shield,
      title: "Uncompromising Safety & Care",
      desc: "Clean living spaces at our Uppal centre, ethical medical supervision, and strict confidentiality for every family.",
    },
    {
      icon: Users,
      title: "A.A. 12-Step & Clinical Synergy",
      desc: "Blending medical detoxification and psychological counselling with the time-tested spiritual principles of Alcoholics Anonymous.",
    },
    {
      icon: Award,
      title: "Family-Centred Healing",
      desc: "Structured counselling for parents, spouses, and children so the home environment supports lifelong sobriety.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      {/* 1. PAGE INTRO HEADER */}
      <Reveal>
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            About {siteConfig.brand.fullName}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ink-900 mt-2 leading-[1.12]">
            Restoring Lives Through Lived Empathy, Faith & Recovery.
          </h1>
          <p className="text-base sm:text-lg text-ink-600 mt-5 leading-relaxed">
            Located in {siteConfig.brand.city}, {siteConfig.brand.fullName} bridges structured clinical rehabilitation with the transformative spiritual principles of the 12-Step fellowship.
          </p>
        </div>
      </Reveal>

      {/* =========================================================
          2. FOUNDER'S DESK CARD WITH APPLE-STYLE "+" POPUP TRIGGER
         ========================================================= */}
      <Reveal delay={0.1}>
        <div className="mt-12 sm:mt-16 relative bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200/90 shadow-apple overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Founder Portrait */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] bg-surface overflow-hidden">
              <img
                src={founderImgSrc}
                onError={() =>
                  setFounderImgSrc(siteConfig.founder.imageFallback)
                }
                alt={siteConfig.founder.name}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.75) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest bg-brand-700/90 backdrop-blur-md px-3 py-1 rounded-full mb-2">
                  Since 2013 • 13 Years Sober
                </span>
                <p className="font-serif text-xl sm:text-2xl font-semibold">
                  {siteConfig.founder.name}
                </p>
                <p className="text-xs sm:text-sm text-slate-200">
                  {siteConfig.founder.role}
                </p>
              </div>
            </div>

            {/* Right Column: Founder's Desk Message & Apple "+" Trigger */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between bg-apple-mesh">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-700/20 text-xs font-semibold text-brand-800 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-600" />
                  <span>{siteConfig.founder.badge}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl text-ink-900 font-semibold leading-tight">
                  {siteConfig.founder.name}
                </h2>
                <p className="text-sm sm:text-base font-medium text-brand-700 mt-1">
                  — {siteConfig.founder.role}
                </p>

                <div className="mt-6 relative">
                  <Quote className="w-8 h-8 text-brand-700/15 mb-2" />
                  <p className="text-ink-600 text-sm sm:text-base lg:text-[17px] leading-relaxed">
                    {siteConfig.founder.shortBio}
                  </p>
                </div>
              </div>

              {/* Apple-Style Interactive "+" Button Bar */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-600">
                    Deep Dive Into His Story
                  </p>
                  <p className="text-sm font-medium text-ink-900">
                    From Recovery in 2013 to Building Shraddha
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsJourneyOpen(true)}
                  className="group inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-full bg-ink-900 hover:bg-brand-800 text-white text-sm font-semibold shadow-apple transition-all duration-300 hover:scale-[1.02] self-start sm:self-auto"
                >
                  <span>Read Full Journey</span>
                  <span className="w-9 h-9 rounded-full bg-white/15 group-hover:bg-white group-hover:text-ink-900 flex items-center justify-center transition-all duration-300 group-hover:rotate-90">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* =========================================================
          3. CORE PILLARS GRID
         ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-14 sm:mt-20">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-apple h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-ink-900 font-semibold">
                  {p.title}
                </h3>
                <p className="text-ink-600 mt-2.5 text-sm sm:text-base leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* =========================================================
          4. APPLE-LIKE DYNAMIC MODAL POPUP (FOUNDER'S DETAILED JOURNEY)
         ========================================================= */}
      <AnimatePresence>
        {isJourneyOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            {/* Frosted Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsJourneyOpen(false)}
              className="fixed inset-0 bg-ink-900/60 backdrop-blur-xl"
            />

            {/* Apple Spring Sheet Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 28 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                mass: 0.9,
              }}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-background rounded-t-[2rem] sm:rounded-[2.25rem] border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Sticky Glass Modal Header */}
              <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/85 border-b border-slate-200/70 px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-700 block">
                    Founder&apos;s Complete Biography
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink-900 line-clamp-1">
                    {siteConfig.founder.name} — {siteConfig.brand.shortName}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsJourneyOpen(false)}
                  aria-label="Close modal"
                  className="w-10 h-10 rounded-full bg-surface hover:bg-slate-200/80 text-ink-900 flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Editorial Story Content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                {/* Headline & Lead Paragraph */}
                <div className="bg-apple-mesh p-6 sm:p-8 rounded-3xl border border-slate-200/70">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink-900 font-semibold leading-tight">
                    {siteConfig.founder.modalTitle}
                  </h2>
                  <p className="mt-4 text-ink-600 text-sm sm:text-base leading-relaxed">
                    {siteConfig.founder.modalIntro}
                  </p>
                </div>

                {/* Narrative Sections */}
                <div className="space-y-7">
                  {siteConfig.founder.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                          Chapter 0{idx + 1}
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl text-ink-900 font-semibold">
                          {sec.heading}
                        </h4>
                      </div>
                      <p className="text-ink-600 text-sm sm:text-base leading-relaxed pl-1">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Milestones & Impact Bento Grid */}
                <div className="pt-4 border-t border-slate-200/80">
                  <h4 className="font-serif text-xl sm:text-2xl text-ink-900 font-semibold mb-4">
                    Key Milestones & Impact
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {siteConfig.founder.milestones.map((item, i) => (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="font-semibold text-ink-900 text-sm sm:text-base">
                              {item.title}
                            </h5>
                            <p className="text-xs sm:text-sm text-ink-600 mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Connect Footer Inside Modal */}
                <div className="bg-brand-900 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-xl font-semibold">
                      Speak directly with our counselling team
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Guided by D. Sreekanth Chary • 100% Confidential Support
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-ink-900 text-xs sm:text-sm font-semibold"
                    >
                      <Phone className="w-4 h-4 text-brand-700" />
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                        "Hello Shraddha Team, I read D. Sreekanth Chary's recovery journey and would like to speak with a counsellor."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-semibold"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}