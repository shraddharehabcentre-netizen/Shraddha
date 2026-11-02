"use client";

import React, { useState } from "react";
import { CheckCircle2, Phone, MessageCircle, Plus } from "lucide-react";
import { ConditionDetail, ProgramDetail } from "@/config/siteConfig";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal } from "@/components/ui/Reveal";
import {
  ConditionDetailModal,
  ProgramDetailModal,
} from "@/components/TreatmentModals";

export default function ProgramsPage() {
  const { config: siteConfig } = useSiteConfig();
  const [selectedCondition, setSelectedCondition] =
    useState<ConditionDetail | null>(null);
  const [selectedProgram, setSelectedProgram] =
    useState<ProgramDetail | null>(null);

  return (
    <div className="py-10 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* 1. ADDICTIONS WE TREAT SECTION */}
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              Specialized De-Addiction & Behavioural Care
            </span>
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-ink-900 mt-1.5 leading-tight">
              What We Treat & Clinical Programs
            </h1>
            <p className="text-xs sm:text-lg text-ink-600 mt-3 sm:mt-4 leading-relaxed">
              Select any addiction or recovery program below to inspect warning signs, medical detox protocols, and our 12-Step therapy roadmap.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {siteConfig.addictionsWeTreat.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.04}>
              <div
                onClick={() => setSelectedCondition(item)}
                className="group cursor-pointer h-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-apple hover:border-brand-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-50 text-brand-800">
                    {item.category}
                  </span>
                  <h2 className="font-serif text-lg sm:text-2xl text-ink-900 font-semibold mt-3 group-hover:text-brand-700">
                    {item.title}
                  </h2>
                  <p className="text-xs font-semibold text-accent-600 mt-1">
                    {item.teluguTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-ink-600 mt-2.5 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-700">
                    Open Clinical Overview
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brand-50 group-hover:bg-brand-700 text-brand-700 group-hover:text-white flex items-center justify-center transition-all">
                    <Plus className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 2. NUMBERED 01-04 RECOVERY PROGRAMS */}
        <Reveal>
          <div className="mt-16 sm:mt-24 max-w-2xl">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              Residential & Outpatient Pathways
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-ink-900 mt-1.5">
              Our 4 Core Recovery Programs
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-10">
          {siteConfig.programs.map((program, idx) => (
            <Reveal key={program.id} delay={idx * 0.05}>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-200 shadow-apple grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl">
                      {program.id}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-surface text-ink-600">
                      Timeline: {program.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl text-ink-900 font-semibold">
                    {program.title}
                  </h3>
                  <p className="text-ink-600 text-xs sm:text-base mt-2.5 leading-relaxed">
                    {program.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-900 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-all"
                  >
                    <span>View Stage-by-Stage Breakdown</span>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-5 bg-surface/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/70">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-3">
                    What This Program Includes:
                  </h4>
                  <ul className="space-y-2.5 mb-5">
                    {program.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-ink-900"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                        program.whatsappPrefill
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition-all"
                    >
                      <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-ink-900 text-xs font-semibold"
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ConditionDetailModal
        condition={selectedCondition}
        onClose={() => setSelectedCondition(null)}
        phoneDisplay={siteConfig.contact.phoneDisplay}
        phoneRaw={siteConfig.contact.phoneRaw}
        whatsappNumber={siteConfig.contact.whatsappNumber}
      />

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        phoneDisplay={siteConfig.contact.phoneDisplay}
        phoneRaw={siteConfig.contact.phoneRaw}
        whatsappNumber={siteConfig.contact.whatsappNumber}
      />
    </div>
  );
}