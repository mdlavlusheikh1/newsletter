"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={handleDelete} disabled={loading} className="px-2.5 py-1.5 text-[10px] font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all disabled:opacity-60">
          {loading ? "..." : "Yes"}
        </button>
        <button onClick={() => setConfirming(false)} className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
          No
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Delete">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  );
}
