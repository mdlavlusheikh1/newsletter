import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWSLETTERS_DIR = path.join(process.cwd(), "content/newsletters");

export interface Newsletter {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export function getAllNewsletters(): Omit<Newsletter, "content">[] {
  if (!fs.existsSync(NEWSLETTERS_DIR)) return [];

  return fs
    .readdirSync(NEWSLETTERS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(NEWSLETTERS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsletterBySlug(slug: string): Newsletter | null {
  const filePath = path.join(NEWSLETTERS_DIR, `${slug}.mdx`);
  const fallback = path.join(NEWSLETTERS_DIR, `${slug}.md`);
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null;

  if (!target) return null;

  const raw = fs.readFileSync(target, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    content,
  };
}
