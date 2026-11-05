import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  inquiryType: string;
  seekingHelpFor?: string;
  preferredVisitDate?: string;
  preferredTimeSlot?: string;
  message?: string;
  status: "New Lead" | "Called" | "Visited" | "Admitted";
  createdAt: string;
}

const memoryLeads: LeadRecord[] = [];

export async function GET() {
  return NextResponse.json({ leads: memoryLeads });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadRecord>;
    const newLead: LeadRecord = {
      id: `lead_${Date.now()}`,
      name: body.name || "Anonymous",
      phone: body.phone || "",
      email: body.email || "",
      inquiryType: body.inquiryType || "Callback Request",
      seekingHelpFor: body.seekingHelpFor || "Family Member",
      preferredVisitDate: body.preferredVisitDate || "",
      preferredTimeSlot: body.preferredTimeSlot || "",
      message: body.message || "",
      status: "New Lead",
      createdAt: new Date().toISOString(),
    };

    memoryLeads.unshift(newLead);
    return NextResponse.json({ success: true, lead: newLead });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 400 }
    );
  }
}