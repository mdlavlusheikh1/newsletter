import { isAuthenticated } from "@/lib/auth";
import { getNewsletterBySlug } from "@/lib/newsletters";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Props) {
  if (!(await isAuthenticated())) redirect("/admin");

  const { slug } = await params;
  const post = getNewsletterBySlug(slug);
  if (!post) notFound();

  return (
    <div className="px-8 py-8 w-full max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-700 text-sm font-medium transition-colors">
          ← Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Edit Post</h1>
      </div>

      <PostForm
        mode="edit"
        slug={slug}
        initial={{
          title: post.title,
          date: post.date,
          excerpt: post.excerpt,
          tags: post.tags.join(", "),
          content: post.content,
        }}
      />
    </div>
  );
}
