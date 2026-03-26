import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <div className="h-14 border-b border-slate-200 bg-white flex items-center px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-600">The AI Operator</span>
            <span>/</span>
            <span className="text-slate-400">Admin</span>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
