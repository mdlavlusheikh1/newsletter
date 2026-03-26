import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import PostForm from "@/components/admin/PostForm";

export default async function NewPostPage() {
  if (!(await isAuthenticated())) redirect("/admin");

  return (
    <div className="px-8 py-8 w-full max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-700 text-sm font-medium transition-colors">
          ← Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">New Post</h1>
      </div>

      <PostForm mode="create" />
    </div>
  );
}
