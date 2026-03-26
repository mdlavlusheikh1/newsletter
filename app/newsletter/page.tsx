import type { Metadata } from "next";
import { getAllNewsletters } from "@/lib/newsletters";
import NewsletterCard from "@/components/NewsletterCard";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Newsletter Archive",
  description: "Browse all past AI & Automation newsletter issues.",
};

export default function NewsletterArchivePage() {
  const newsletters = getAllNewsletters();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight mb-4">
            Newsletter Archive
          </h1>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            Every issue in one place — searchable, readable, and free.
          </p>
          <SubscribeForm variant="inline" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {newsletters.length > 0 && (
          <p className="text-sm text-slate-400 font-medium mb-6">
            {newsletters.length} issue{newsletters.length !== 1 ? "s" : ""} published
          </p>
        )}

        {newsletters.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-slate-400 text-lg">No issues yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsletters.map((n) => (
              <NewsletterCard key={n.slug} {...n} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
