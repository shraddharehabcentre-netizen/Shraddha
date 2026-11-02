import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { siteConfig, SiteConfigType } from "@/config/siteConfig";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "cmsData.json");
const ADMIN_PIN = process.env.CMS_ADMIN_PIN || "shraddha2026";

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
    addictionsWeTreat:
      overrides.addictionsWeTreat || siteConfig.addictionsWeTreat,
    programs: overrides.programs || siteConfig.programs,
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
      return NextResponse.json(mergeWithDefaults(kvData));
    }

    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return NextResponse.json(mergeWithDefaults(parsed));
  } catch {
    return NextResponse.json(siteConfig);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pin, config } = body;

    if (pin !== ADMIN_PIN) {
      return NextResponse.json(
        { error: "Incorrect Admin PIN. Access denied." },
        { status: 401 }
      );
    }

    const merged = mergeWithDefaults(config);
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
      // Read-only serverless disk fallback
    }

    return NextResponse.json({
      success: true,
      mode: savedCloud
        ? "cloud-kv"
        : savedLocal
        ? "local-file"
        : "browser-session",
      data: merged,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save configuration", details: String(err) },
      { status: 500 }
    );
  }
}