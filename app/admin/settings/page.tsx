import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  if (!(await isAuthenticated())) redirect("/admin");

  const settings = [
    { label: "Site Name", value: process.env.NEXT_PUBLIC_SITE_NAME ?? "", desc: "Displayed in navbar, footer, and SEO tags." },
    { label: "Site URL", value: process.env.NEXT_PUBLIC_SITE_URL ?? "", desc: "Your production domain." },
    { label: "Beehiiv Publication ID", value: process.env.BEEHIIV_PUBLICATION_ID ? "••••" + process.env.BEEHIIV_PUBLICATION_ID.slice(-4) : "Not set", desc: "Beehiiv → Settings → Publication.", warn: !process.env.BEEHIIV_PUBLICATION_ID },
    { label: "Beehiiv API Key", value: process.env.BEEHIIV_API_KEY ? "••••" + process.env.BEEHIIV_API_KEY.slice(-4) : "Not set", desc: "Beehiiv → Settings → API.", warn: !process.env.BEEHIIV_API_KEY },
    { label: "Admin Username", value: process.env.ADMIN_USERNAME ?? "", desc: "Used to login to this admin panel." },
    { label: "Admin Password", value: "••••••••", desc: "Change in .env.local file." },
  ];

  return (
    <div className="px-8 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Site Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Current configuration from your .env.local file.</p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 mb-8 max-w-2xl">
        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-blue-700 text-sm font-medium">
          To change these values, edit <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> and restart the dev server.
        </p>
      </div>

      <div className="space-y-3 max-w-2xl">
        {settings.map(({ label, value, desc, warn }) => (
          <div key={label} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-700 font-bold text-sm">{label}</p>
              <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 ${
              warn
                ? "bg-red-50 text-red-500 border border-red-100"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}>
              {value || "Not set"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 max-w-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Config File</p>
        <code className="text-slate-600 text-xs font-mono">newsletter-site/.env.local</code>
      </div>
    </div>
  );
}
