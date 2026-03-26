import { isAuthenticated } from "@/lib/auth";
import { getAllNewsletters } from "@/lib/newsletters";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { Plus, ExternalLink, Pencil, FileText } from "lucide-react";

export default async function AllPostsPage() {
  if (!(await isAuthenticated())) redirect("/admin");
  const posts = getAllNewsletters();

  return (
    <div className="px-8 py-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">All Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""} published</p>
        </div>
        <Link href="/admin/posts/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-200">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <FileText className="w-10 h-10 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold mb-3">No posts yet.</p>
            <Link href="/admin/posts/new" className="text-blue-500 hover:text-blue-700 text-sm font-bold transition-colors">Create your first post →</Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
              <span className="col-span-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Title</span>
              <span className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</span>
              <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Tags</span>
              <span className="col-span-2 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</span>
            </div>
            {posts.map((post, i) => (
              <div key={post.slug} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors ${i !== posts.length - 1 ? "border-b border-slate-100" : ""}`}>
                <div className="col-span-5">
                  <p className="text-slate-700 font-semibold text-sm line-clamp-1">{post.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{post.slug}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 text-xs">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-600 border border-blue-100">{tag}</span>
                  ))}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <Link href={`/newsletter/${post.slug}`} target="_blank" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all" title="View">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link href={`/admin/posts/${post.slug}/edit`} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <AdminDeleteButton slug={post.slug} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
