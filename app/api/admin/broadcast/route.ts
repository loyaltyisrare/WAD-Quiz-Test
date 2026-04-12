import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/db/client";
import { sendBroadcastEmail } from "@/lib/broadcast/email";

export async function POST(request: Request) {
  try {
    const { subject, content } = await request.json();
    
    if (!subject || !content) {
      return NextResponse.json({ error: "Missing subject or content" }, { status: 400 });
    }

    const leads = await getAllLeads();
    
    // In a real production scenario, we'd use a queue (BullMQ, QStash, etc)
    // For this architecture replication, we'll iterate and send
    const results = await Promise.allSettled(
      leads
        .filter(l => l.email)
        .map(l => sendBroadcastEmail(l.email, subject, content, l.firstName))
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return NextResponse.json({ 
      success: true, 
      stats: { total: leads.length, successful, failed } 
    });
  } catch (error) {
    console.error("Broadcast Disptach Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
