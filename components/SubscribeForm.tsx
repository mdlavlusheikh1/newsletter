"use client";

import { useState } from "react";

export default function SubscribeForm({ variant = "hero" }: { variant?: "hero" | "inline" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus("success");
      setMessage(data.message);
      // Notify SparkLoop of successful signup
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = (window as any).SparkLoop;
        if (sl && typeof sl.submitForm === "function") {
          sl.submitForm(email);
        }
      } catch {}
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.message);
    }
  }

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-100">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-3 text-slate-800 placeholder:text-slate-400 bg-transparent outline-none text-sm font-medium"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60 whitespace-nowrap shadow-md shadow-blue-200"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed ✓" : "Subscribe Free →"}
          </button>
        </div>
        {message && (
          <p className={`mt-3 text-sm text-center ${status === "success" ? "text-emerald-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
        {status !== "success" && (
          <p className="mt-3 text-xs text-center text-slate-400">No spam. Unsubscribe anytime.</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        disabled={status === "loading" || status === "success"}
        className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "..." : status === "success" ? "Done ✓" : "Subscribe"}
      </button>
    </form>
  );
}
