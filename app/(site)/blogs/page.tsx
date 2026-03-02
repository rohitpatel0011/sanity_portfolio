import { getBlogs } from "@/sanity/query";
import Link from "next/link";
import Image from "next/image";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black mb-12">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog: any) => (
          <Link key={blog._id} href={`/blogs/${blog.slug}`} className="block group">
            <div className="glass border border-zinc-200 p-6 rounded-2xl hover:border-zinc-400 transition-all h-full flex flex-col">
              {blog.coverImage?.image && (
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={blog.coverImage.image}
                    alt={blog.coverImage.alt || blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--highlight)] transition-colors">{blog.title}</h2>
              <p className="text-zinc-500 mb-4 flex-grow">{blog.excerpt}</p>
              <div className="text-sm font-medium text-zinc-400 mt-auto pt-4 border-t border-zinc-100">
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
