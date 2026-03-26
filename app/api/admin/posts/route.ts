import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content/newsletters");

function ensureDir() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, date, excerpt, tags, content, slug } = await req.json();

  if (!title || !slug || !content)
    return NextResponse.json({ error: "title, slug and content are required." }, { status: 400 });

  ensureDir();
  const filePath = path.join(DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath))
    return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });

  const tagsArr = typeof tags === "string"
    ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : tags ?? [];

  const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "${excerpt}"\ntags: [${tagsArr.map((t: string) => `"${t}"`).join(", ")}]\n---\n\n`;
  fs.writeFileSync(filePath, frontmatter + content, "utf-8");

  return NextResponse.json({ success: true, slug });
}
