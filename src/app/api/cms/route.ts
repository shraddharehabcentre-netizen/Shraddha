import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { siteConfig, SiteConfigType } from "@/config/siteConfig";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "cmsData.json");
const PIN_FILE_PATH = path.join(process.cwd(), "src", "data", "cmsPin.json");

// Global server memory cache so edits persist across requests even before KV is linked
let memoryConfigCache: SiteConfigType | null = null;
let memoryPinCache: string | null = null;

async function getActiveAdminPin(): Promise<string> {
  if (memoryPinCache) return memoryPinCache;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/get/shraddha_admin_pin`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (data?.result) {
        memoryPinCache = String(data.result);
        return memoryPinCache;
      }
    } catch {
      // Fallback
    }
  }

  try {
    const raw = await fs.readFile(PIN_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed?.pin) {
      memoryPinCache = String(parsed.pin);
      return memoryPinCache;
    }
  } catch {
    // Fallback to env variable
  }

  return process.env.CMS_ADMIN_PIN || "Shraddha#9763";
}

async function saveNewAdminPin(newPin: string): Promise<void> {
  memoryPinCache = newPin;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (url && token) {
    try {
      await fetch(`${url}/set/shraddha_admin_pin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPin),
      });
    } catch {
      // Ignore
    }
  }

  try {
    await fs.mkdir(path.dirname(PIN_FILE_PATH), { recursive: true });
    await fs.writeFile(
      PIN_FILE_PATH,
      JSON.stringify({ pin: newPin }, null, 2),
      "utf-8"
    );
  } catch {
    // Ignore on read-only serverless disk
  }
}

function mergeWithDefaults(overrides: Partial<SiteConfigType>): SiteConfigType {
  return {
    ...siteConfig,
    ...overrides,
    brand: { ...siteConfig.brand, ...(overrides.brand || {}) },
    contact: { ...siteConfig.contact, ...(overrides.contact || {}) },
    conversionTriggers: {
      ...siteConfig.conversionTriggers,
      ...(overrides.conversionTriggers || {}),
      pickupBanner: {
        ...siteConfig.conversionTriggers.pickupBanner,
        ...(overrides.conversionTriggers?.pickupBanner || {}),
      },
    },
    hero: { ...siteConfig.hero, ...(overrides.hero || {}) },
    founder: { ...siteConfig.founder, ...(overrides.founder || {}) },
    empathySection: {
      ...siteConfig.empathySection,
      ...(overrides.empathySection || {}),
    },
    selfAssessment: {
      ...siteConfig.selfAssessment,
      ...(overrides.selfAssessment || {}),
    },
    addictionsWeTreat:
      overrides.addictionsWeTreat || siteConfig.addictionsWeTreat,
    programs: overrides.programs || siteConfig.programs,
    campusSpaces: overrides.campusSpaces || siteConfig.campusSpaces,
    dailySchedule: overrides.dailySchedule || siteConfig.dailySchedule,
    faqs: overrides.faqs || siteConfig.faqs,
  };
}

async function getFromVercelKV(): Promise<Partial<SiteConfigType> | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/shraddha_cms_data`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (data?.result) {
      return typeof data.result === "string"
        ? JSON.parse(data.result)
        : data.result;
    }
  } catch {
    return null;
  }
  return null;
}

async function saveToVercelKV(payload: SiteConfigType): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return false;
  try {
    const res = await fetch(`${url}/set/shraddha_cms_data`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const kvData = await getFromVercelKV();
    if (kvData) {
      const merged = mergeWithDefaults(kvData);
      memoryConfigCache = merged;
      return NextResponse.json(merged);
    }

    if (memoryConfigCache) {
      return NextResponse.json(memoryConfigCache);
    }

    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    const merged = mergeWithDefaults(parsed);
    memoryConfigCache = merged;
    return NextResponse.json(merged);
  } catch {
    return NextResponse.json(memoryConfigCache || siteConfig);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, pin, newPin, config } = body;

    const activePin = await getActiveAdminPin();
    // Accept either the active custom password or fallback env password
    const isAuthorized =
      pin === activePin ||
      (process.env.CMS_ADMIN_PIN && pin === process.env.CMS_ADMIN_PIN);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Invalid Admin Password. Please try again." },
        { status: 401 }
      );
    }

    // 1. Login Verification Only
    if (action === "verify") {
      return NextResponse.json({ success: true });
    }

    // 2. Change Password Action
    if (action === "change_password") {
      if (!newPin || String(newPin).trim().length < 4) {
        return NextResponse.json(
          { error: "New password must be at least 4 characters." },
          { status: 400 }
        );
      }
      await saveNewAdminPin(String(newPin).trim());
      return NextResponse.json({
        success: true,
        message: "Password updated successfully!",
      });
    }

    // 3. Save Full Website Config
    const merged = mergeWithDefaults(config);
    memoryConfigCache = merged;

    const savedCloud = await saveToVercelKV(merged);

    let savedLocal = false;
    try {
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(
        DATA_FILE_PATH,
        JSON.stringify(merged, null, 2),
        "utf-8"
      );
      savedLocal = true;
    } catch {
      // Read-only disk on serverless
    }

    return NextResponse.json({
      success: true,
      mode: savedCloud
        ? "cloud-kv"
        : savedLocal
        ? "local-file"
        : "server-memory",
      data: merged,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save configuration", details: String(err) },
      { status: 500 }
    );
  }
}