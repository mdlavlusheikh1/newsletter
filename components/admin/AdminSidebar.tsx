"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, Settings, ExternalLink, LogOut, Zap } from "lucide-react";

const navGroups = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "All Posts", href: "/admin/posts", icon: FileText },
      { label: "New Post", href: "/admin/posts/new", icon: PlusCircle },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
      { label: "View Site", href: "/", icon: ExternalLink, external: true },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col bg-white border-r border-slate-200 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <p className="text-slate-800 font-black text-sm tracking-tight">The AI Operator</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-2">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon, external }: { label: string; href: string; icon: React.ElementType; external?: boolean }) => {
                const active = !external && (pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href)));
                return (
                  <Link key={label} href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      active ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-blue-500" : "text-slate-400"}`} />
                    {label}
                    {external && <ExternalLink className="w-3 h-3 ml-auto text-slate-300" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-700 text-xs font-bold">Admin</p>
            <p className="text-slate-400 text-[10px]">Authenticated</p>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
