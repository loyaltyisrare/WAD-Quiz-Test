import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/db/client";

export async function GET() {
  try {
    const leads = await getAllLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Admin Fetch Leads Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
