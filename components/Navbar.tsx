"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/newsletter", label: "Archive" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 group-hover:bg-blue-500 transition-colors">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-[#0f172a] text-lg tracking-tight">
            The AI <span className="text-blue-600">Operator</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`text-sm font-semibold transition-colors ${pathname === href ? "text-blue-600" : "text-slate-500 hover:text-slate-900"}`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/#subscribe"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-200">
            Subscribe Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-2 shadow-lg">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${pathname === href ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"}`}>
              {label}
            </Link>
          ))}
          <Link href="/#subscribe" onClick={() => setOpen(false)}
            className="mt-1 px-3 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm text-center">
            Subscribe Free
          </Link>
        </div>
      )}
    </header>
  );
}
