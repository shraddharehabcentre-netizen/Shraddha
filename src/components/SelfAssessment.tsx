"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Square,
  ShieldCheck,
  MessageCircle,
  Phone,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/ui/Reveal";

export function SelfAssessment() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleQuestion = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const count = selectedIds.length;

  const getGuidance = () => {
    if (count === 0) {
      return {
        level: "Select any signs above to view guidance",
        tone: "bg-surface text-ink-600 border-slate-200",
        summary:
          "Even if you are only noticing early changes in mood, sleep, or drinking habits, speaking with a counsellor early can prevent a deeper crisis.",
      };
    }
    if (count <= 2) {
      return {
        level: "Early Intervention & Counselling Recommended",
        tone: "bg-amber-50/90 text-amber-950 border-amber-300",
        summary:
          "You have selected early-to-moderate indicators of dependency. A confidential evaluation or counselling session can help stabilize habits before withdrawal worsens.",
      };
    }
    return {
      level: "Supervised Detox & Residential Care Recommended",
      tone: "bg-brand-50 text-brand-900 border-brand-600/30",
      summary:
        "Checking 3 or more signs strongly indicates physical and psychological dependency. Stopping abruptly at home can be unsafe. Speak with our intake team for a safe recovery plan.",
    };
  };

  const guidance = getGuidance();

  const customWhatsappText = `Hello Shraddha Team, I completed the Self-Assessment on your website (${count}/5 indicators checked) and would like a confidential consultation.`;

  return (
    <section
      id="assessment"
      className="py-12 sm:py-20 lg:py-24 bg-apple-mesh border-y border-slate-200/70 scroll-mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-700/20 text-[11px] sm:text-xs font-semibold text-brand-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent-600" />
              {siteConfig.selfAssessment.badge}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-ink-900 mt-3 leading-tight">
              {siteConfig.selfAssessment.title}
            </h2>
            <p className="text-ink-600 mt-2.5 text-xs sm:text-base leading-relaxed">
              {siteConfig.selfAssessment.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200/90 shadow-apple">
            {/* Checklist Items */}
            <div className="space-y-2.5 sm:space-y-3.5">
              {siteConfig.selfAssessment.questions.map((item, idx) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleQuestion(item.id)}
                    className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-start gap-3 sm:gap-4 ${
                      isChecked
                        ? "bg-brand-50/70 border-brand-700 shadow-sm"
                        : "bg-background/60 hover:bg-surface/70 border-slate-200/80"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-brand-700">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-brand-700 text-white" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-700 block mb-0.5">
                        Indicator 0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-base font-medium text-ink-900 leading-snug block">
                        {item.question}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Assessment Feedback Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ opacity: 0.6, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-6 sm:mt-8 p-4 sm:p-7 rounded-2xl border ${guidance.tone}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-current/10">
                  <div className="flex items-start sm:items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0 mt-0.5 sm:mt-0" />
                    <span className="font-serif text-base sm:text-xl font-semibold leading-snug">
                      {guidance.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 text-ink-900">
                      {count} of {siteConfig.selfAssessment.questions.length} Selected
                    </span>
                    {count > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedIds([])}
                        className="text-xs font-semibold underline inline-flex items-center gap-1 opacity-75 hover:opacity-100"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-base leading-relaxed opacity-90">
                  {guidance.summary}
                </p>

                {/* Sleek Single-Line Mobile Action Buttons */}
                <div className="mt-5 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      customWhatsappText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-brand-700 hover:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Discuss Result on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-white hover:bg-surface text-ink-900 border border-slate-300 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                    <span>Call: {siteConfig.contact.phoneDisplay}</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}