"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  mode: "create" | "edit";
  slug?: string;
  initial?: { title: string; date: string; excerpt: string; tags: string; content: string };
}

export default function PostForm({ mode, slug: existingSlug, initial }: Props) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: existingSlug ?? "",
    date: initial?.date ?? today,
    excerpt: initial?.excerpt ?? "",
    tags: initial?.tags ?? "",
    content: initial?.content ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function set(key: string, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "create") next.slug = autoSlug(value);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const url = mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${existingSlug}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success || data.slug) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition text-sm shadow-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Your newsletter title" required className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Slug (URL) *</label>
        <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-post-slug" required disabled={mode === "edit"} className={`${inputClass} ${mode === "edit" ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}`} />
        {mode === "create" && (
          <p className="text-slate-400 text-xs mt-1.5">URL: /newsletter/<span className="text-slate-600 font-mono">{form.slug || "your-slug"}</span></p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Date *</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="AI Tools, Automation" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt *</label>
        <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short description shown in cards and SEO..." required rows={2} className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className={labelClass}>Content (Markdown) *</label>
        <textarea value={form.content} onChange={(e) => set("content", e.target.value)} placeholder={"## Introduction\n\nWrite your newsletter content here..."} required rows={20} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`} />
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60 shadow-md shadow-blue-200">
          {loading ? "Saving..." : mode === "create" ? "Publish Post" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.push("/admin/dashboard")} className="px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl font-bold text-sm transition-all bg-white">
          Cancel
        </button>
      </div>
    </form>
  );
}
