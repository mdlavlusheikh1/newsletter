import { NextRequest, NextResponse } from "next/server";
import { ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Invalid username or password." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return res;
}
