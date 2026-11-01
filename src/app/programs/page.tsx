import React from "react";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";

export default function ProgramsPage() {
  return (
    <div className="py-10 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              Evidence-Based Addiction Recovery
            </span>
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-ink-900 mt-1.5 leading-tight">
              Our Recovery Programs
            </h1>
            <p className="text-xs sm:text-lg text-ink-600 mt-3 sm:mt-4 leading-relaxed">
              Every resident undergoes a thorough medical and psychological evaluation upon arrival so we can customize their treatment duration and therapy intensity.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-14 space-y-6 sm:space-y-10">
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
                  <h2 className="font-serif text-xl sm:text-3xl text-ink-900 font-semibold">
                    {program.title}
                  </h2>
                  <p className="text-ink-600 text-xs sm:text-base mt-2.5 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-surface/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/70">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-3">
                    What This Program Includes:
                  </h3>
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
    </div>
  );
}