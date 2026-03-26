import { MetadataRoute } from "next";
import { getAllNewsletters } from "@/lib/newsletters";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const newsletters = getAllNewsletters();

  const newsletterRoutes = newsletters.map((n) => ({
    url: `${siteUrl}/newsletter/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/newsletter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...newsletterRoutes,
  ];
}
