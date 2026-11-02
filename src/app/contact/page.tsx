"use client";

import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Lock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const { config: siteConfig } = useSiteConfig();
  const [inquiryType, setInquiryType] = useState<"visit" | "callback">("visit");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const accessKey = siteConfig.contact.web3FormsAccessKey;
    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      inquiryType === "visit"
        ? `New Centre Visit Booking - Shraddha (${formData.get("name")})`
        : `New Confidential Callback Request - Shraddha (${formData.get("name")})`
    );
    formData.append("from_name", "Shraddha Rehab Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(
          data.message ||
            "Please add your free Web3Forms Access Key in .env.local or siteConfig.ts."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call or WhatsApp us directly.");
    }
  }

  return (
    <div className="py-10 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Helpline Cards & Address */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-700">
              24/7 Confidential Intake • Uppal, Hyderabad
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-ink-900 mt-1.5 leading-tight">
              Book a Visit or Speak With Us
            </h1>
            <p className="text-ink-600 mt-3 text-xs sm:text-base leading-relaxed">
              Visit our centre at Mallikarjuna Nagar, Parvathapur, Uppal in person, or request a discreet callback from our founder and counselling team.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {/* Primary Phone */}
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-700 transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-600 block truncate">
                    Primary Helpline & WhatsApp
                  </span>
                  <span className="font-serif text-base sm:text-xl font-bold text-ink-900">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Secondary Phone */}
              <a
                href={`tel:${siteConfig.contact.secondaryPhoneRaw}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-700 transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-accent-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-600 block truncate">
                    Secondary Mobile (24/7)
                  </span>
                  <span className="font-serif text-base sm:text-xl font-bold text-ink-900">
                    {siteConfig.contact.secondaryPhoneDisplay}
                  </span>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                  siteConfig.contact.whatsappDefaultMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-600 transition-all sm:col-span-2 lg:col-span-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-600 block">
                    Discreet WhatsApp Support
                  </span>
                  <span className="font-serif text-base sm:text-xl font-bold text-ink-900">
                    Chat on {siteConfig.contact.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Uppal Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface/80 border border-slate-200 sm:col-span-2 lg:col-span-1">
                <MapPin className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-600 block">
                    Centre Address
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink-900 mt-1 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Book a Visit / Confidential Callback Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-9 lg:p-11 border border-slate-200 shadow-apple">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-800 bg-brand-50 px-3 py-1 rounded-full mb-4">
                <Lock className="w-3 h-3 shrink-0" />
                <span>100% Private • Sent Directly to Our Email</span>
              </div>

              {/* Toggle Switch */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-surface rounded-xl mb-6 border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setInquiryType("visit")}
                  className={`py-2.5 px-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    inquiryType === "visit"
                      ? "bg-brand-700 text-white shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Book a Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType("callback")}
                  className={`py-2.5 px-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    inquiryType === "callback"
                      ? "bg-brand-700 text-white shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Request Callback</span>
                </button>
              </div>

              <h2 className="font-serif text-xl sm:text-3xl text-ink-900">
                {inquiryType === "visit"
                  ? "Schedule a Visit to Our Uppal Centre"
                  : "Request a Discreet Phone Callback"}
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 mt-1 mb-6">
                {inquiryType === "visit"
                  ? "Select your preferred date and time to tour Shraddha Rehabilitation Centre."
                  : "Leave your number below and our senior counsellor will call you privately."}
              </p>

              {status === "success" ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-brand-50 border border-brand-100 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-brand-700 mx-auto" />
                  <h3 className="font-serif text-xl sm:text-2xl text-ink-900">
                    Request Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 max-w-md mx-auto">
                    We have received your request in our email inbox and will call you shortly. For immediate help, call{" "}
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="font-bold text-brand-800 underline"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs font-semibold text-brand-700 underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="hidden"
                    name="inquiry_type"
                    value={
                      inquiryType === "visit"
                        ? "Book a Centre Visit"
                        : "Confidential Callback"
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g., Ramesh K."
                        className="w-full px-3.5 py-3 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-3.5 py-3 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                      />
                    </div>
                  </div>

                  {inquiryType === "visit" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 sm:p-4 rounded-xl bg-brand-50/60 border border-brand-100">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-900 mb-1.5">
                          Preferred Visit Date *
                        </label>
                        <input
                          type="date"
                          name="preferred_visit_date"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-900 mb-1.5">
                          Preferred Time Slot *
                        </label>
                        <select
                          name="preferred_time_slot"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                        >
                          <option value="Morning (10 AM - 1 PM)">
                            Morning (10 AM – 1 PM)
                          </option>
                          <option value="Afternoon (2 PM - 5 PM)">
                            Afternoon (2 PM – 5 PM)
                          </option>
                          <option value="Evening (5 PM - 7:30 PM)">
                            Evening (5 PM – 7:30 PM)
                          </option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-1.5">
                        Seeking Help For
                      </label>
                      <select
                        name="seeking_help_for"
                        className="w-full px-3.5 py-3 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                      >
                        <option value="Family Member / Loved One">
                          A Family Member / Loved One
                        </option>
                        <option value="Myself">Myself</option>
                        <option value="Friend / Colleague">
                          A Friend / Colleague
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-1.5">
                        Your Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="For confirmation"
                        className="w-full px-3.5 py-3 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-900 mb-1.5">
                      Brief Situation or Questions (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Share details about the addiction, whether assisted pickup is needed, or any questions..."
                      className="w-full px-3.5 py-3 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm shadow-apple transition-all"
                  >
                    {status === "submitting"
                      ? "Sending to Shraddha Team..."
                      : inquiryType === "visit"
                      ? "Confirm Centre Visit Booking"
                      : "Request Discreet Callback"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Embedded Uppal Google Map Section */}
      <Reveal delay={0.18}>
        <div className="mt-10 sm:mt-16 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-apple h-72 sm:h-96 bg-slate-100">
          <iframe
            src={siteConfig.contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shraddha Rehabilitation Centre Uppal Location"
          />
        </div>
      </Reveal>
    </div>
  );
}