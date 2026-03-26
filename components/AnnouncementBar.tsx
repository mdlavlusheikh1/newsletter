import Link from "next/link";
import { getAllNewsletters } from "@/lib/newsletters";

export default function AnnouncementBar() {
  const latest = getAllNewsletters()[0];
  if (!latest) return null;

  return (
    <div className="relative z-50 bg-blue-600/10 border-b border-blue-500/15 py-2.5 px-4 text-center">
      <p className="text-[11px] font-bold text-slate-400 tracking-wide">
        Latest issue:{" "}
        <Link
          href={`/newsletter/${latest.slug}`}
          className="text-blue-400 hover:text-white font-black transition-colors"
        >
          {latest.title} →
        </Link>
      </p>
    </div>
  );
}
