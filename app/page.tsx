import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import NewsletterCard from "@/components/NewsletterCard";
import { getAllNewsletters } from "@/lib/newsletters";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "The AI Operator — AI & Automation Newsletter",
  description: "Join 5,200+ professionals getting weekly AI tools, automation workflows, and strategies. Free newsletter.",
};

const features = [
  { icon: "⚡", title: "Actionable every time", desc: "No fluff. Each issue gives you tools and workflows you can use the same day." },
  { icon: "🎯", title: "USA market focused", desc: "Curated for professionals operating in the US economy and tech landscape." },
  { icon: "📬", title: "One email per week", desc: "Every Tuesday morning. No spam, no noise. Unsubscribe in one click." },
];

export default function HomePage() {
  const newsletters = getAllNewsletters();
  const featured = newsletters[0] ?? null;
  const rest = newsletters.slice(1, 7);

  return (
    <main className="bg-[#f8fafc]">
      <HeroSection />

      {/* Why subscribe */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest issues — Rundown AI style */}
      {newsletters.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Latest Articles</h2>
              <Link href="/newsletter" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View all →
              </Link>
            </div>

            {/* Featured large card */}
            {featured && (
              <Link href={`/newsletter/${featured.slug}`} className="group block mb-6">
                <article className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-50 text-blue-600">{featured.tags[0] ?? "Featured"}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-xs text-slate-400">· 5 min read</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-3 max-w-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-2xl">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    Read full article
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </article>
              </Link>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((n) => (
                  <NewsletterCard key={n.slug} {...n} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Bottom CTA — Morning Brew style */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Join 5,200+ readers today.
          </h2>
          <p className="text-slate-500 mb-8">
            Every Tuesday, straight to your inbox. Free forever.
          </p>
          <SubscribeForm variant="hero" />
        </div>
      </section>
    </main>
  );
}
