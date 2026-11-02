"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Phone,
  MessageCircle,
  HeartHandshake,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { ConditionDetail, ProgramDetail } from "@/config/siteConfig";

interface ConditionModalProps {
  condition: ConditionDetail | null;
  onClose: () => void;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
}

export function ConditionDetailModal({
  condition,
  onClose,
  phoneDisplay,
  phoneRaw,
  whatsappNumber,
}: ConditionModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (condition) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [condition, onClose]);

  return (
    <AnimatePresence>
      {condition && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/65 backdrop-blur-xl"
          />

          {/* Modal Sheet */}
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
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-background rounded-t-[2rem] sm:rounded-[2.25rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/90 border-b border-slate-200/80 px-5 sm:px-9 py-4 sm:py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-700 block">
                  {condition.category} • Clinical Protocol
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-semibold text-ink-900 truncate">
                  {condition.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close popup"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface hover:bg-slate-200 text-ink-900 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-9 overflow-y-auto space-y-6 sm:space-y-8">
              {/* Overview Box */}
              <div className="bg-apple-mesh p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80">
                <span className="inline-block text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-200/60 px-3 py-1 rounded-full mb-3">
                  {condition.teluguTitle}
                </span>
                <p className="text-ink-900 text-xs sm:text-base leading-relaxed font-medium">
                  {condition.overview}
                </p>
              </div>

              {/* Warning Signs Checklist */}
              <div>
                <div className="flex items-center gap-2 mb-3.5">
                  <AlertTriangle className="w-5 h-5 text-accent-600 shrink-0" />
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-ink-900">
                    Warning Signs Families Should Watch For
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {condition.warningSigns.map((sign, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-ink-900 flex items-start gap-2.5 shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How We Treat Step-by-Step */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-brand-700 shrink-0" />
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-ink-900">
                    How We Treat {condition.title} at Shraddha
                  </h4>
                </div>
                <div className="space-y-3.5">
                  {condition.howWeTreat.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                        {step.phase}
                      </span>
                      <h5 className="font-serif text-base sm:text-lg font-semibold text-ink-900 mt-2">
                        {step.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-ink-600 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Note for Families */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300/80 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <strong className="font-semibold">Guidance for Families: </strong>
                  {condition.familyNote}
                </p>
              </div>

              {/* Direct Action Bar */}
              <div className="bg-brand-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-semibold">
                    Need confidential help with {condition.title}?
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    24/7 Helpline & Safe Assisted Home Pickup Available
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-2.5">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      condition.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-white text-ink-900 text-xs sm:text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 text-brand-700" />
                    {phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ProgramModalProps {
  program: ProgramDetail | null;
  onClose: () => void;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
}

export function ProgramDetailModal({
  program,
  onClose,
  phoneDisplay,
  phoneRaw,
  whatsappNumber,
}: ProgramModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (program) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [program, onClose]);

  return (
    <AnimatePresence>
      {program && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/65 backdrop-blur-xl"
          />

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
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-background rounded-t-[2rem] sm:rounded-[2.25rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/90 border-b border-slate-200/80 px-5 sm:px-9 py-4 sm:py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-serif text-xl sm:text-2xl font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-xl border border-brand-100 shrink-0">
                  {program.id}
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink-600 block">
                    Recommended Duration: {program.duration}
                  </span>
                  <h3 className="font-serif text-base sm:text-xl font-semibold text-ink-900 truncate">
                    {program.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close popup"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface hover:bg-slate-200 text-ink-900 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-9 overflow-y-auto space-y-6 sm:space-y-8">
              {/* Overview & Who Is It For */}
              <div className="bg-apple-mesh p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-3">
                <p className="text-xs sm:text-base text-ink-900 leading-relaxed">
                  {program.description}
                </p>
                <div className="pt-3 border-t border-slate-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 block mb-1">
                    Who This Program Is Designed For:
                  </span>
                  <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                    {program.whoIsItFor}
                  </p>
                </div>
              </div>

              {/* Phase-by-Phase Clinical Roadmap */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-brand-700 shrink-0" />
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-ink-900">
                    Stage-by-Stage Recovery Roadmap
                  </h4>
                </div>
                <div className="space-y-3.5">
                  {program.phases?.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md">
                        {p.week}
                      </span>
                      <h5 className="font-serif text-base sm:text-lg font-semibold text-ink-900 mt-2">
                        {p.focus}
                      </h5>
                      <p className="text-xs sm:text-sm text-ink-600 mt-1 leading-relaxed">
                        {p.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Therapies & Care Elements */}
              <div>
                <div className="flex items-center gap-2 mb-3.5">
                  <ShieldCheck className="w-5 h-5 text-brand-700 shrink-0" />
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-ink-900">
                    What Is Included in Program {program.id}
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(program.includedTherapies || program.highlights).map(
                    (item, i) => (
                      <div
                        key={i}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink-900"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0" />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Direct Connect CTA */}
              <div className="bg-brand-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-semibold">
                    Inquire About Program {program.id} Admission
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    100% Confidential Assessment • Uppal, Hyderabad
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-2.5">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      program.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask on WhatsApp
                  </a>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-white text-ink-900 text-xs sm:text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 text-brand-700" />
                    {phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}