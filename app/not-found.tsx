import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-700/10 rounded-full blur-[100px]" />
        </div>

        <div className="text-8xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-white/40 mb-8 leading-relaxed text-sm">
          This page doesn&apos;t exist or was moved. Head back home and keep exploring.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/newsletter"
            className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm transition-all"
          >
            Browse Archive
          </Link>
        </div>
      </div>
    </main>
  );
}
