import { getSingleBlog, getRelatedBlogs } from "@/sanity/query";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongLeft, HiArrowTopRightOnSquare } from "react-icons/hi2";
import TableOfContents from "../../components/global/TableOfContents";

// Helper components map for PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10 relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
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
    h1: ({ children, value }: any) => {
      const id = children?.[0]?.toLowerCase()?.replace(/\s+/g, '-') || '';
      return <h1 id={id} className="text-4xl md:text-5xl font-black mt-16 mb-6 text-zinc-900 scroll-mt-24 group"><a href={`#${id}`} className="absolute -ml-8 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 hover:text-[var(--primary)]">#</a>{children}</h1>;
    },
    h2: ({ children, value }: any) => {
      const id = children?.[0]?.toLowerCase()?.replace(/\s+/g, '-') || '';
      return <h2 id={id} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-zinc-900 scroll-mt-24 group"><a href={`#${id}`} className="absolute -ml-8 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 hover:text-[var(--primary)]">#</a>{children}</h2>;
    },
    h3: ({ children, value }: any) => {
      const id = children?.[0]?.toLowerCase()?.replace(/\s+/g, '-') || '';
      return <h3 id={id} className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-zinc-800 scroll-mt-24 group"><a href={`#${id}`} className="absolute -ml-8 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 hover:text-[var(--primary)]">#</a>{children}</h3>;
    },
    h4: ({ children, value }: any) => {
      const id = children?.[0]?.toLowerCase()?.replace(/\s+/g, '-') || '';
      return <h4 id={id} className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-zinc-800 scroll-mt-24">{children}</h4>;
    },
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

// Helper function to extract headings for TOC
const extractHeadings = (blocks: any[]) => {
  if (!blocks) return [];
  const headings: any[] = [];

  blocks.forEach(block => {
    if (block._type === 'block' && /^h[2-3]/.test(block.style)) {
      const text = block.children.map((child: any) => child.text).join('');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      headings.push({
        text,
        id,
        level: parseInt(block.style.replace('h', '')),
      });
    }
  });

  return headings;
};

export default async function SingleBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Parallel fetches for better performance
  const [blog, relatedBlogs] = await Promise.all([
    getSingleBlog(slug),
    getRelatedBlogs(slug)
  ]);

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

  const headings = extractHeadings(blog.content);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 mt-10">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-[var(--primary)] font-medium transition-colors mb-10 group"
      >
        <HiArrowLongLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to all blogs
      </Link>

      <header className="mb-12 md:mb-16 max-w-4xl">
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

      <div className="flex flex-col lg:flex-row gap-16 relative items-start">
        {/* Main Content Area */}
        <article className="lg:w-2/3 xl:w-3/4">
          <div className="prose prose-zinc max-w-none prose-lg md:prose-xl">
            <PortableText value={blog.content} components={ptComponents} />
          </div>

          {/* Related Blogs Section */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div className="mt-24 pt-12 border-t border-zinc-200">
              <h3 className="text-3xl font-black mb-8 text-zinc-900">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((related: any) => (
                  <Link key={related._id} href={`/blogs/${related.slug}`} className="group block">
                    <div className="glass border border-zinc-200 p-4 rounded-2xl hover:border-[var(--primary)] transition-all h-full flex flex-col">
                      {related.coverImage?.image && (
                        <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden bg-zinc-100">
                          <Image
                            src={related.coverImage.image}
                            alt={related.coverImage.alt || related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h4 className="text-lg font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{related.title}</h4>
                      <time className="text-xs text-zinc-400 mt-auto pt-2 block">
                        {new Date(related.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Right Sidebar Area: Table of Contents */}
        <aside className="lg:w-1/3 xl:w-1/4 hidden lg:block sticky top-32">
          <div className="glass rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-6">
              Table of Contents
            </h3>

            <TableOfContents headings={headings} />

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-4 block">Share Article</span>
              <div className="flex gap-4">
                {/* Share placeholders */}
                <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-[var(--primary)] hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-[var(--primary)] hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}