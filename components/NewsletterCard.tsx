import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface Props {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function NewsletterCard({ slug, title, date, excerpt, tags }: Props) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <Link href={`/newsletter/${slug}`} className="group block h-full">
      <article className="h-full flex flex-col p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all duration-200">
        {/* Tag + read time */}
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-50 text-blue-600">
            <Tag className="w-3 h-3" />{tags[0] ?? "Issue"}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <Clock className="w-3 h-3" />5 min read
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug mb-3 flex-1">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <time className="text-xs text-slate-400">{formatted}</time>
          <span className="text-blue-500 text-sm font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
