import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (verifyAdminPassword(password)) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
