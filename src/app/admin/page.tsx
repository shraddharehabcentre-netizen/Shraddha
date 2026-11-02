"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Lock,
  Save,
  RotateCcw,
  CheckCircle2,
  Phone,
  Stethoscope,
  Layers,
  Clock,
  HelpCircle,
  Ambulance,
  ExternalLink,
  BarChart3,
  Users,
  Eye,
  Timer,
  Smartphone,
  MessageCircle,
  RefreshCw,
  KeyRound,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import {
  siteConfig as defaultSiteConfig,
  SiteConfigType,
} from "@/config/siteConfig";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { AnalyticsEvent } from "@/app/api/analytics/route";

type TimeRange = "today" | "7d" | "30d" | "all";

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export default function AdminDashboardPage() {
  const { config, updateLocalConfig, refreshConfig } = useSiteConfig();
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Change Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const [activeTab, setActiveTab] = useState<
    | "analytics"
    | "contact"
    | "pickup"
    | "addictions"
    | "programs"
    | "schedule"
    | "faqs"
    | "security"
  >("analytics");

  const [draft, setDraft] = useState<SiteConfigType>(config);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Analytics State
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    setDraft(config);
  }, [config]);

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch("/api/analytics", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch {
      // Ignore
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (unlocked) {
      fetchAnalytics();
    }
  }, [unlocked]);

  const filteredStats = useMemo(() => {
    const now = Date.now();
    const cutoff =
      timeRange === "today"
        ? now - 24 * 60 * 60 * 1000
        : timeRange === "7d"
        ? now - 7 * 24 * 60 * 60 * 1000
        : timeRange === "30d"
        ? now - 30 * 24 * 60 * 60 * 1000
        : 0;

    const inRange = events.filter((e) => e.timestamp >= cutoff);
    const pageviews = inRange.filter((e) => e.type === "pageview");
    const uniqueSessions = new Set(pageviews.map((e) => e.sessionId)).size;

    const totalDurationSec = pageviews.reduce(
      (acc, cur) => acc + (cur.durationSec || 5),
      0
    );
    const avgDurationSec =
      pageviews.length > 0 ? Math.round(totalDurationSec / pageviews.length) : 0;

    const mobileCount = pageviews.filter((e) => e.device === "Mobile").length;
    const mobilePercent =
      pageviews.length > 0
        ? Math.round((mobileCount / pageviews.length) * 100)
        : 0;

    const callClicks = inRange.filter((e) => e.type === "call_click").length;
    const whatsappClicks = inRange.filter(
      (e) => e.type === "whatsapp_click"
    ).length;

    const pageMap: Record<string, { views: number; totalSec: number }> = {};
    pageviews.forEach((pv) => {
      if (!pageMap[pv.path]) {
        pageMap[pv.path] = { views: 0, totalSec: 0 };
      }
      pageMap[pv.path].views += 1;
      pageMap[pv.path].totalSec += pv.durationSec || 5;
    });

    const topPages = Object.entries(pageMap)
      .map(([path, info]) => ({
        path,
        views: info.views,
        avgSec: Math.round(info.totalSec / info.views),
      }))
      .sort((a, b) => b.views - a.views);

    const refMap: Record<string, number> = {};
    pageviews.forEach((pv) => {
      const ref = pv.referrer || "Direct";
      refMap[ref] = (refMap[ref] || 0) + 1;
    });
    const topSources = Object.entries(refMap)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count);

    return {
      uniqueSessions,
      totalPageviews: pageviews.length,
      avgDurationSec,
      mobilePercent,
      callClicks,
      whatsappClicks,
      topPages,
      topSources,
      recentEvents: [...inRange].reverse().slice(0, 15),
    };
  }, [events, timeRange]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setLoginError("");

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", pin: pin.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUnlocked(true);
      } else {
        setLoginError(data.error || "Incorrect Password. Access denied.");
      }
    } catch {
      setLoginError("Network error while verifying password.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSaveAll = async () => {
    setSaveStatus("saving");
    setStatusMessage("");

    // 1. Update local state & localStorage immediately across all open tabs
    updateLocalConfig(draft);

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim(), config: draft }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await refreshConfig();
        setSaveStatus("saved");
        setStatusMessage(
          "All changes saved and published live across all pages!"
        );
        setTimeout(() => setSaveStatus("idle"), 4000);
      } else {
        setSaveStatus("error");
        setStatusMessage(data.error || "Failed to save on server.");
      }
    } catch {
      setSaveStatus("saved");
      setStatusMessage("Changes saved to browser storage.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg("");

    if (newPassword.trim().length < 4) {
      setPasswordMsg("Error: New password must be at least 4 characters.");
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      setPasswordMsg("Error: New password and confirmation do not match.");
      return;
    }

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change_password",
          pin: pin.trim(),
          newPin: newPassword.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPin(newPassword.trim());
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMsg("Success: Your private admin password has been updated!");
      } else {
        setPasswordMsg(`Error: ${data.error || "Could not update password."}`);
      }
    } catch {
      setPasswordMsg("Error: Network issue while updating password.");
    }
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Are you sure you want to reset all texts back to original defaults?"
      )
    )
      return;
    setDraft(defaultSiteConfig);
    updateLocalConfig(defaultSiteConfig);
    await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin: pin.trim(),
        config: defaultSiteConfig,
      }),
    });
    setSaveStatus("saved");
    setStatusMessage("Reset to original defaults.");
  };

  if (!unlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-apple-mesh">
        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-apple">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-5">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink-900 font-semibold">
            Shraddha Private Admin
          </h1>
          <p className="text-xs sm:text-sm text-ink-600 mt-1.5 mb-6">
            Authorized access only. Enter your private administrator password to view analytics and manage website content.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-900 mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter your private password"
                  className="w-full px-4 py-3.5 pr-11 rounded-xl bg-background border border-slate-300 text-sm focus:outline-none focus:border-brand-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-600 hover:text-ink-900"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm transition-all"
            >
              {verifying ? "Verifying..." : "Unlock Admin Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-8">
      {/* Top Sticky Admin Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-apple mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-700 block">
            Founder&apos;s Website Controller & Analytics
          </span>
          <h1 className="font-serif text-xl sm:text-2xl text-ink-900 font-semibold">
            Shraddha Rehabilitation Centre — Admin
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface hover:bg-slate-200 text-ink-900 text-xs font-semibold"
          >
            <span>Preview Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-rose-50 text-ink-600 hover:text-rose-700 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>
              {saveStatus === "saving" ? "Saving..." : "Save & Publish Changes"}
            </span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-50 border border-brand-200 text-brand-900 text-xs sm:text-sm font-medium flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 no-scrollbar">
        {[
          { id: "analytics", label: "1. Live Visitors & Viewing Time", icon: BarChart3 },
          { id: "contact", label: "2. Phone, Hero & Founder", icon: Phone },
          { id: "pickup", label: "3. Home Pickup Banner", icon: Ambulance },
          { id: "addictions", label: "4. What We Treat (6)", icon: Stethoscope },
          { id: "programs", label: "5. Programs (01-04)", icon: Layers },
          { id: "schedule", label: "6. Daily Timetable", icon: Clock },
          { id: "faqs", label: "7. FAQs", icon: HelpCircle },
          { id: "security", label: "8. Change Password", icon: KeyRound },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                active
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-white text-ink-600 hover:text-ink-900 border border-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-apple flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900">
                Visitor Traffic, Viewing Time & Conversion Analytics
              </h2>
              <p className="text-xs sm:text-sm text-ink-600 mt-0.5">
                Track how many people visit Shraddha, how long they read each page, and how many click Call or WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "today", label: "Today (24h)" },
                  { id: "7d", label: "Last 7 Days" },
                  { id: "30d", label: "Last 30 Days" },
                  { id: "all", label: "All Time" },
                ] as { id: TimeRange; label: string }[]
              ).map((period) => (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setTimeRange(period.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    timeRange === period.id
                      ? "bg-brand-700 text-white shadow-sm"
                      : "bg-surface text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {period.label}
                </button>
              ))}

              <button
                type="button"
                onClick={fetchAnalytics}
                title="Refresh Live Stats"
                className="p-2 rounded-xl bg-surface hover:bg-slate-200 text-ink-900"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loadingAnalytics ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-apple">
              <div className="flex items-center justify-between text-brand-700 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Unique Visitors
                </span>
                <Users className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                {filteredStats.uniqueSessions}
              </p>
              <p className="text-[11px] text-ink-600 mt-1">
                Distinct people who visited
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-apple">
              <div className="flex items-center justify-between text-brand-700 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total Page Views
                </span>
                <Eye className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                {filteredStats.totalPageviews}
              </p>
              <p className="text-[11px] text-ink-600 mt-1">
                Total pages opened
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-apple">
              <div className="flex items-center justify-between text-accent-600 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Avg. Viewing Time
                </span>
                <Timer className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                {formatDuration(filteredStats.avgDurationSec)}
              </p>
              <p className="text-[11px] text-ink-600 mt-1">
                Time spent reading per page
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-apple">
              <div className="flex items-center justify-between text-brand-700 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Mobile Traffic
                </span>
                <Smartphone className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-900">
                {filteredStats.mobilePercent}%
              </p>
              <p className="text-[11px] text-ink-600 mt-1">
                Visitors on smartphones
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-apple">
              <div className="flex items-center justify-between text-emerald-700 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  WhatsApp Clicks
                </span>
                <MessageCircle className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-emerald-800">
                {filteredStats.whatsappClicks}
              </p>
              <p className="text-[11px] text-emerald-900/80 mt-1">
                High-intent WhatsApp inquiries
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-apple">
              <div className="flex items-center justify-between text-amber-800 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Helpline Call Clicks
                </span>
                <Phone className="w-5 h-5" />
              </div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-amber-900">
                {filteredStats.callClicks}
              </p>
              <p className="text-[11px] text-amber-900/80 mt-1">
                Direct phone call taps
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple">
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink-900 mb-4">
                Most Viewed Pages & Reading Time
              </h3>
              {filteredStats.topPages.length === 0 ? (
                <p className="text-xs text-ink-600 py-6">
                  No visitor data recorded for this time period yet.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredStats.topPages.map((pg, i) => (
                    <div
                      key={i}
                      className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="font-mono font-semibold text-ink-900">
                        {pg.path === "/" ? "/ (Home Page)" : pg.path}
                      </span>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2.5 py-1 rounded-full bg-surface text-ink-600 font-medium">
                          Avg time: {formatDuration(pg.avgSec)}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-800 font-bold">
                          {pg.views} views
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple">
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink-900 mb-4">
                Where Visitors Come From (Sources)
              </h3>
              {filteredStats.topSources.length === 0 ? (
                <p className="text-xs text-ink-600 py-6">
                  No referral sources recorded for this period yet.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredStats.topSources.map((src, i) => (
                    <div
                      key={i}
                      className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-ink-900">
                        {src.source}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-surface text-ink-900 font-bold">
                        {src.count} visits
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT, ADDRESS, HERO & FOUNDER BIO */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-apple space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900 border-b border-slate-100 pb-3">
            Helpline Numbers, WhatsApp, Hero & Founder Bio
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                Primary Phone (Displayed Across Site)
              </label>
              <input
                type="text"
                value={draft.contact.phoneDisplay}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: {
                      ...draft.contact,
                      phoneDisplay: e.target.value,
                      phoneRaw: e.target.value.replace(/\s+/g, ""),
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                Secondary Mobile Number
              </label>
              <input
                type="text"
                value={draft.contact.secondaryPhoneDisplay}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: {
                      ...draft.contact,
                      secondaryPhoneDisplay: e.target.value,
                      secondaryPhoneRaw: e.target.value.replace(/\s+/g, ""),
                    },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                WhatsApp Number (With 91, No + or Spaces)
              </label>
              <input
                type="text"
                value={draft.contact.whatsappNumber}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, whatsappNumber: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                Email Address
              </label>
              <input
                type="text"
                value={draft.contact.email}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, email: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Full Centre Address (Navbar, Footer & Contact Page)
            </label>
            <input
              type="text"
              value={draft.contact.address}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  contact: { ...draft.contact, address: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Founder&apos;s Short Bio (Displayed on About Page)
            </label>
            <textarea
              rows={4}
              value={draft.founder.shortBio}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  founder: { ...draft.founder, shortBio: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>
        </div>
      )}

      {/* TAB 3: CONVERSION TRIGGERS & ASSISTED PICKUP BANNER */}
      {activeTab === "pickup" && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-apple space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900 border-b border-slate-100 pb-3">
            High-Conversion Triggers (Telugu Line & Home Pickup Banner)
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Hero Telugu + English Trust Badge
            </label>
            <input
              type="text"
              value={draft.conversionTriggers.teluguTrustLine}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  conversionTriggers: {
                    ...draft.conversionTriggers,
                    teluguTrustLine: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Assisted Home Pickup Banner Headline
            </label>
            <input
              type="text"
              value={draft.conversionTriggers.pickupBanner.title}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  conversionTriggers: {
                    ...draft.conversionTriggers,
                    pickupBanner: {
                      ...draft.conversionTriggers.pickupBanner,
                      title: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Telugu Subtitle inside Pickup Banner
            </label>
            <input
              type="text"
              value={draft.conversionTriggers.pickupBanner.teluguSubtitle}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  conversionTriggers: {
                    ...draft.conversionTriggers,
                    pickupBanner: {
                      ...draft.conversionTriggers.pickupBanner,
                      teluguSubtitle: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
              Pickup Banner Description
            </label>
            <textarea
              rows={3}
              value={draft.conversionTriggers.pickupBanner.description}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  conversionTriggers: {
                    ...draft.conversionTriggers,
                    pickupBanner: {
                      ...draft.conversionTriggers.pickupBanner,
                      description: e.target.value,
                    },
                  },
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
            />
          </div>
        </div>
      )}

      {/* TAB 4: WHAT WE TREAT */}
      {activeTab === "addictions" && (
        <div className="space-y-6">
          {draft.addictionsWeTreat.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Addiction Card 0{idx + 1}
                </span>
                <span className="text-xs text-ink-600">{item.category}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...draft.addictionsWeTreat];
                      updated[idx] = { ...item, title: e.target.value };
                      setDraft({ ...draft, addictionsWeTreat: updated });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                    Telugu Subtitle
                  </label>
                  <input
                    type="text"
                    value={item.teluguTitle}
                    onChange={(e) => {
                      const updated = [...draft.addictionsWeTreat];
                      updated[idx] = { ...item, teluguTitle: e.target.value };
                      setDraft({ ...draft, addictionsWeTreat: updated });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                  Card Short Summary
                </label>
                <textarea
                  rows={2}
                  value={item.shortDesc}
                  onChange={(e) => {
                    const updated = [...draft.addictionsWeTreat];
                    updated[idx] = { ...item, shortDesc: e.target.value };
                    setDraft({ ...draft, addictionsWeTreat: updated });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                  Detailed Popup Overview Paragraph
                </label>
                <textarea
                  rows={3}
                  value={item.overview}
                  onChange={(e) => {
                    const updated = [...draft.addictionsWeTreat];
                    updated[idx] = { ...item, overview: e.target.value };
                    setDraft({ ...draft, addictionsWeTreat: updated });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: RECOVERY PROGRAMS */}
      {activeTab === "programs" && (
        <div className="space-y-6">
          {draft.programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-apple space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-serif text-lg font-bold text-brand-700">
                  Program {prog.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                    Program Title
                  </label>
                  <input
                    type="text"
                    value={prog.title}
                    onChange={(e) => {
                      const updated = [...draft.programs];
                      updated[idx] = { ...prog, title: e.target.value };
                      setDraft({ ...draft, programs: updated });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                    Duration Badge
                  </label>
                  <input
                    type="text"
                    value={prog.duration}
                    onChange={(e) => {
                      const updated = [...draft.programs];
                      updated[idx] = { ...prog, duration: e.target.value };
                      setDraft({ ...draft, programs: updated });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-ink-900 mb-1">
                  Program Description
                </label>
                <textarea
                  rows={3}
                  value={prog.description}
                  onChange={(e) => {
                    const updated = [...draft.programs];
                    updated[idx] = { ...prog, description: e.target.value };
                    setDraft({ ...draft, programs: updated });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-slate-300 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: DAILY TIMETABLE */}
      {activeTab === "schedule" && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-apple space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900 border-b border-slate-100 pb-3">
            Daily Routine Timetable (5:30 AM – 9:00 PM)
          </h2>
          {draft.dailySchedule.map((slot, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-surface/60 border border-slate-200/70"
            >
              <input
                type="text"
                value={slot.time}
                onChange={(e) => {
                  const updated = [...draft.dailySchedule];
                  updated[idx] = { ...slot, time: e.target.value };
                  setDraft({ ...draft, dailySchedule: updated });
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold"
              />
              <input
                type="text"
                value={slot.activity}
                onChange={(e) => {
                  const updated = [...draft.dailySchedule];
                  updated[idx] = { ...slot, activity: e.target.value };
                  setDraft({ ...draft, dailySchedule: updated });
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-semibold"
              />
              <input
                type="text"
                value={slot.category}
                onChange={(e) => {
                  const updated = [...draft.dailySchedule];
                  updated[idx] = { ...slot, category: e.target.value };
                  setDraft({ ...draft, dailySchedule: updated });
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
              />
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: FAQS */}
      {activeTab === "faqs" && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-apple space-y-5">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900 border-b border-slate-100 pb-3">
            Frequently Asked Questions
          </h2>
          {draft.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-surface/60 border border-slate-200 space-y-3"
            >
              <input
                type="text"
                value={faq.q}
                onChange={(e) => {
                  const updated = [...draft.faqs];
                  updated[idx] = { ...faq, q: e.target.value };
                  setDraft({ ...draft, faqs: updated });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold"
              />
              <textarea
                rows={2}
                value={faq.a}
                onChange={(e) => {
                  const updated = [...draft.faqs];
                  updated[idx] = { ...faq, a: e.target.value };
                  setDraft({ ...draft, faqs: updated });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {/* TAB 8: CHANGE ADMIN PASSWORD */}
      {activeTab === "security" && (
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-apple max-w-xl">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink-900 border-b border-slate-100 pb-3">
            Change Administrator Password
          </h2>
          <p className="text-xs sm:text-sm text-ink-600 mt-2 mb-6">
            Update the private password used to unlock this `/admin` dashboard.
          </p>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                New Private Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-ink-900 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 rounded-xl bg-background border border-slate-300 text-sm"
                required
              />
            </div>

            {passwordMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold ${
                  passwordMsg.startsWith("Success")
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {passwordMsg}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-ink-900 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              Update Private Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}