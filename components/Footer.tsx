import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm">A</div>
              <span className="font-black text-[#0f172a] text-lg tracking-tight">The AI <span className="text-blue-600">Operator</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-5">
              Weekly AI tools, automation workflows, and strategies for professionals who want to stay ahead.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Twitter", href: "https://twitter.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 text-xs font-semibold transition-all">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, { href: "/newsletter", label: "Archive" }].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Company</h4>
            <ul className="space-y-3">
              {["Privacy", "Contact", "Sponsor"].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 The AI Operator. All rights reserved.</p>
          <CountdownTimer />
        </div>
      </div>
    </footer>
  );
}
