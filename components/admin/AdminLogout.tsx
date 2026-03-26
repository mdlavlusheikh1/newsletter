"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2.5 border border-white/10 hover:border-red-500/30 text-slate-500 hover:text-red-400 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
    >
      Logout
    </button>
  );
}
