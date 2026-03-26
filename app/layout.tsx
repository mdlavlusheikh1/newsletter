import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseSpotlight from "@/components/MouseSpotlight";
import { headers } from "next/headers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Powerbox";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} — AI & Automation Newsletter`, template: `%s | ${siteName}` },
  description: "Weekly AI tools, automation workflows, and strategies for global professionals.",
  openGraph: { type: "website", siteName, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  };

  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script async src="https://js.sparkloop.app/embed.js?publication_id=pub_e1a695ff7d64" data-sparkloop="" />
      </head>
      <body suppressHydrationWarning className="bg-[#f8fafc] text-slate-900 antialiased font-[family-name:var(--font-geist)]">
        {isAdmin ? (
          children
        ) : (
          <>
            <Navbar />
            <div className="pt-16">{children}</div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
