import { getSingleBlog } from "@/sanity/query";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";

// Custom PortableText components for better styling
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10 relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={value.asset.url}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-black mt-16 mb-6 text-zinc-900">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-zinc-900">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-zinc-800">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-zinc-800">{children}</h4>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-6 text-zinc-600">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 my-8 italic text-xl text-zinc-500 bg-zinc-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 text-lg text-zinc-600 space-y-2 marker:text-[var(--primary)]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 text-lg text-zinc-600 space-y-2 marker:text-[var(--primary)] font-medium">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-zinc-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : ''}
          className="text-[var(--primary)] hover:underline decoration-2 underline-offset-4 transition-all font-medium"
        >
          {children}
        </a>
      );
    },
    code: ({ children }: any) => (
      <code className="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded-md text-sm font-mono border border-zinc-200">
        {children}
      </code>
    ),
  },
};

// Dhyan se dekho: params Promise hai
export default async function SingleBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Yeh await zaroori hai
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
        <p className="text-zinc-500 mb-8">The article you are looking for doesn't exist or has been removed.</p>
        <Link
          href="/blogs"
          className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
        >
          Return to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 mt-10">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-[var(--primary)] font-medium transition-colors mb-10 group"
      >
        <HiArrowLongLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to all blogs
      </Link>

      <header className="mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-zinc-900">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-zinc-500 font-medium">
          <time dateTime={blog.publishedAt} className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
          {/* Add more metadata here if needed (e.g., read time, author) */}
        </div>
      </header>

      {blog.coverImage?.image && (
        <div className="relative w-full aspect-video md:aspect-[21/9] mb-12 md:mb-20 rounded-3xl overflow-hidden shadow-2xl glass border border-white/20">
          <Image
            src={blog.coverImage.image}
            alt={blog.coverImage.alt || blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="prose prose-zinc max-w-none prose-lg md:prose-xl">
          <PortableText value={blog.content} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}