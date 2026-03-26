"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      setError(data.message ?? "Invalid credentials.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition font-medium text-sm shadow-sm";
  const labelClass = "block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center font-black text-white text-xl mx-auto mb-4 shadow-xl shadow-blue-200">
            P
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">The AI Operator</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required autoComplete="username" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required autoComplete="current-password" className={inputClass} />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60 shadow-md shadow-blue-200 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
