import { NextResponse } from "next/server";
import { saveLead } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { lead, score, sessionId, tracking } = data;

    if (!lead || !lead.email) {
      return NextResponse.json({ error: "Missing lead data" }, { status: 400 });
    }

    const saved = await saveLead({
      lead: {
        email: lead.email,
        firstName: lead.firstName,
        gender: lead.gender,
        age: lead.age,
        socialHandle: lead.socialHandle,
        phone: lead.phone,
        consent: lead.consent || true,
      },
      score: score,
      sessionId: sessionId,
      tracking: {
        ...tracking,
        userAgent: request.headers.get("user-agent"),
        ip: request.headers.get("x-forwarded-for") || "unknown"
      }
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error("API Lead Submission Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  // Protective: normally would check auth, but used by admin dashboard fetch
  // In a real app, this would be restricted to authenticated admins
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
