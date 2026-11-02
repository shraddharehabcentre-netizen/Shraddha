"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  let sid = sessionStorage.getItem("shraddha_sid");
  if (!sid) {
    sid = `vis_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    sessionStorage.setItem("shraddha_sid", sid);
  }
  return sid;
}

function getDeviceType(): "Mobile" | "Desktop" {
  if (typeof window === "undefined") return "Mobile";
  return window.innerWidth < 768 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";
}

function getCleanReferrer(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct / Bookmark";
  try {
    const url = new URL(document.referrer);
    if (url.hostname.includes("google")) return "Google Search";
    if (url.hostname.includes("instagram")) return "Instagram";
    if (url.hostname.includes("youtube")) return "YouTube";
    if (url.hostname.includes("facebook")) return "Facebook";
    if (url.hostname.includes("justdial")) return "Justdial";
    if (url.hostname === window.location.hostname) return "Internal Navigation";
    return url.hostname;
  } catch {
    return "Direct";
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Do not track admin dashboard views as patient traffic
    if (!pathname || pathname.startsWith("/admin")) return;

    const sessionId = getSessionId();
    const device = getDeviceType();
    const referrer = getCleanReferrer();
    startTimeRef.current = Date.now();

    // 1. Log Pageview
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        type: "pageview",
        path: pathname,
        durationSec: 5,
        device,
        referrer,
      }),
    }).catch(() => {});

    // 2. Heartbeat every 10 seconds to record accurate reading/viewing duration
    const sendDuration = () => {
      const elapsedSec = Math.min(
        Math.round((Date.now() - startTimeRef.current) / 1000),
        1800 // Cap single tab idle at 30 mins
      );
      if (elapsedSec < 3) return;

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: "duration",
          path: pathname,
          durationSec: elapsedSec,
          device,
          referrer,
        }),
        keepalive: true,
      }).catch(() => {});
    };

    const interval = setInterval(sendDuration, 10000);

    // 3. Track Phone Call & WhatsApp Clicks across the page
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            type: "call_click",
            path: pathname,
            device,
            referrer,
          }),
          keepalive: true,
        }).catch(() => {});
      } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            type: "whatsapp_click",
            path: pathname,
            device,
            referrer,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      clearInterval(interval);
      sendDuration();
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [pathname]);

  return null;
}