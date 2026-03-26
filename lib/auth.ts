import { cookies } from "next/headers";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "powerbox2026";
export const SESSION_COOKIE = "admin_session";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "authenticated";
}
