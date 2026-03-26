import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content/newsletters");

function filePath(slug: string) {
  const mdx = path.join(DIR, `${slug}.mdx`);
  const md = path.join(DIR, `${slug}.md`);
  return fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const { title, date, excerpt, tags, content } = await req.json();
  const fp = filePath(slug);
  if (!fp) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const tagsArr = typeof tags === "string"
    ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : tags ?? [];

  const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt}"\ntags: [${tagsArr.map((t: string) => `"${t}"`).join(", ")}]\n---\n\n`;
  fs.writeFileSync(fp, frontmatter + content, "utf-8");

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug } = await params;
  const fp = filePath(slug);
  if (!fp) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  fs.unlinkSync(fp);
  return NextResponse.json({ success: true });
}
