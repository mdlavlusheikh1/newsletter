import { NextRequest, NextResponse } from "next/server";
import { subscribeToBeehiiv } from "@/lib/beehiiv";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
  }

  const result = await subscribeToBeehiiv(email);
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
