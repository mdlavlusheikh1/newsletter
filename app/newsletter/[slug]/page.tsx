import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNewsletters, getNewsletterBySlug } from "@/lib/newsletters";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import SubscribeForm from "@/components/SubscribeForm";
import ReadingProgress from "@/components/ReadingProgress";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllNewsletters().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNewsletterBySlug(slug);
  if (!n) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
  return {
    title: n.title,
    description: n.excerpt,
    openGraph: { title: n.title, description: n.excerpt, type: "article", publishedTime: n.date, url: `${siteUrl}/newsletter/${slug}` },
  };
}

export default async function NewsletterPage({ params }: Props) {
  const { slug } = await params;
  const newsletter = getNewsletterBySlug(slug);
  if (!newsletter) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Powerbox";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: newsletter.title,
    description: newsletter.excerpt,
    datePublished: newsletter.date,
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
  };

  const formatted = new Date(newsletter.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-2xl mx-auto px-6 py-16">
        {/* Back */}
        <Link href="/newsletter" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-medium mb-10 transition-colors group">
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Archive
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {newsletter.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-600">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight mb-4 tracking-tight">
          {newsletter.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-slate-400 mb-10">
          <time>{formatted}</time>
          <span>·</span>
          <span>5 min read</span>
        </div>

        <div className="h-px bg-slate-100 mb-10" />

        {/* Content */}
        <div className="prose prose-slate max-w-none
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-800
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-800 prose-strong:font-bold
          prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-slate-700
          prose-hr:border-slate-100
          prose-li:text-slate-600">
          <MDXRemote source={newsletter.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <h3 className="text-xl font-black text-slate-800 mb-2">Enjoyed this issue?</h3>
          <p className="text-slate-500 text-sm mb-6">Get the next one every Tuesday — free.</p>
          <SubscribeForm variant="inline" />
        </div>
      </article>
    </main>
  );
}
