import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  type: "pageview" | "duration" | "call_click" | "whatsapp_click" | "form_submit";
  path: string;
  durationSec?: number;
  device: "Mobile" | "Desktop";
  referrer: string;
  timestamp: number;
}

const ANALYTICS_FILE = path.join(
  process.cwd(),
  "src",
  "data",
  "analyticsData.json"
);

// In-memory cache so serverless warm instances retain live visitor stats
let memoryEvents: AnalyticsEvent[] = [];

async function loadEvents(): Promise<AnalyticsEvent[]> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/get/shraddha_analytics_events`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (data?.result) {
        const parsed =
          typeof data.result === "string"
            ? JSON.parse(data.result)
            : data.result;
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback to local file
    }
  }

  try {
    const raw = await fs.readFile(ANALYTICS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryEvents = parsed;
      return parsed;
    }
  } catch {
    // Use memory fallback
  }

  return memoryEvents;
}

async function saveEvents(events: AnalyticsEvent[]): Promise<void> {
  // Keep latest 2,500 events for fast dashboard performance
  const trimmed = events.slice(-2500);
  memoryEvents = trimmed;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      await fetch(`${url}/set/shraddha_analytics_events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmed),
      });
    } catch {
      // Ignore cloud error
    }
  }

  try {
    await fs.mkdir(path.dirname(ANALYTICS_FILE), { recursive: true });
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  } catch {
    // Read-only serverless fallback uses memoryEvents
  }
}

export async function GET() {
  const events = await loadEvents();
  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const events = await loadEvents();

    const newEvent: AnalyticsEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sessionId: body.sessionId || "anon",
      type: body.type || "pageview",
      path: body.path || "/",
      durationSec: Number(body.durationSec || 0),
      device: body.device === "Mobile" ? "Mobile" : "Desktop",
      referrer: body.referrer || "Direct",
      timestamp: Date.now(),
    };

    // If updating viewing duration for an existing page session, update the latest matching record
    if (newEvent.type === "duration") {
      const existingIdx = [...events]
        .reverse()
        .findIndex(
          (e) =>
            e.sessionId === newEvent.sessionId &&
            e.path === newEvent.path &&
            e.type === "pageview"
        );
      if (existingIdx !== -1) {
        const realIdx = events.length - 1 - existingIdx;
        events[realIdx].durationSec = Math.max(
          events[realIdx].durationSec || 0,
          newEvent.durationSec || 0
        );
        await saveEvents(events);
        return NextResponse.json({ ok: true });
      }
    }

    events.push(newEvent);
    await saveEvents(events);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}