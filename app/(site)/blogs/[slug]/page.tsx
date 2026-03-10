/** @format */

import { getSingleBlog } from "@/sanity/query";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import TableOfContents from "../../components/global/TableOfContents";


// URL ke liye id banane ka function (e.g., "Why API?" -> "why-api")
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Spaces ko dash banaye
    .replace(/[^\w\-]+/g, '')   // Special characters hataye
    .replace(/\-\-+/g, '-')     // Multiple dashes ko single kare
    .replace(/^-+/, '')         // Start se dash hataye
    .replace(/-+$/, '');        // End se dash hataye
};

// Markdown text se saari h2 aur h3 nikalne ka function
const extractHeadings = (markdown: string) => {
  const regex = /^(##|###) (.*)$/gm;
  const headings = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length, // 2 for h2, 3 for h3
      text: match[2],
      id: slugify(match[2]),
    });
  }
  return headings;
};

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog)
    return (
      <div className="text-center py-20 text-2xl font-bold">
        Post not found!
      </div>
    );

  // Markdown se headings nikal li
  const headings = extractHeadings(blog.content);

  return (
    <article className="max-w-7xl mx-auto px-6 py-12">
      {/* Blog Header (Full width) */}
      <header className="mb-12 text-center max-w-3xl mx-auto">
        <p className="text-[var(--primary)] font-bold text-sm uppercase tracking-widest mb-4">
          {new Date(blog.publishedAt).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-6">
          {blog.title}
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400">{blog.excerpt}</p>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative w-full h-[300px] md:h-[500px] mb-16 rounded-[2rem] overflow-hidden shadow-2xl border border-white/40 max-w-5xl mx-auto">
          <Image
            src={blog.coverImage.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}


      {/* === GRID LAYOUT FOR CONTENT & TOC === */}
      {/* items-start lagana zaroori hai tabhi sticky kaam karega */}
      <div className="flex flex-col lg:flex-row gap-12 relative items-start">
        {/* LEFT COLUMN: Main Content (Scrolls Normally) */}
        <div className="w-full lg:w-[70%] text-zinc-800 dark:text-zinc-200 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // YAHAN DHYAN DEIN: Headings me id add kar diya hai taaki scroll kaam kare
              h2({ children }) {
                const id = slugify(children?.toString() || "");
                return (
                  <h2
                    id={id}
                    className="text-3xl font-bold mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800 scroll-mt-28">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                const id = slugify(children?.toString() || "");
                return (
                  <h3
                    id={id}
                    className="text-2xl font-semibold mt-8 mb-4 scroll-mt-28">
                    {children}
                  </h3>
                );
              },

              // ... Baaki purane tags (h1, p, ul, code, table) waise ke waise hi rahenge ...
              h1({ children }) {
                return (
                  <h1 className="text-4xl font-extrabold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    {children}
                  </h1>
                );
              },
              p({ children }) {
                return (
                  <p className="text-lg leading-relaxed mb-6">{children}</p>
                );
              },
              strong({ children }) {
                return (
                  <strong className="font-bold text-black dark:text-white">{children}</strong>
                );
              },
              ul({ children }) {
                return (
                  <ul className="list-disc pl-8 mb-6 space-y-2 text-lg">
                    {children}
                  </ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="list-decimal pl-8 mb-6 space-y-2 text-lg">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                return <li className="pl-2">{children}</li>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-[var(--primary)] pl-6 py-2 my-8 italic bg-white/50 dark:bg-zinc-800/50 rounded-r-xl shadow-sm text-zinc-600 dark:text-zinc-400 text-lg">
                    {children}
                  </blockquote>
                );
              },
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    className="text-[var(--danger)] hover:text-[var(--primary)] underline underline-offset-4 font-semibold transition-colors"
                    target="_blank"
                    rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },

              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                if (!inline && match) {
                  return (
                    <div className="rounded-2xl overflow-hidden my-8 border border-white/20 shadow-xl bg-[#1d1d20]">
                      <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                        </div>
                        <span className="ml-4 text-xs font-mono text-zinc-400">
                          {match[1]}
                        </span>
                      </div>
                      <SyntaxHighlighter
                        {...props}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: "1.5rem",
                          background: "transparent",
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                        }}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <code
                    {...props}
                    className="bg-zinc-200 dark:bg-zinc-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-300 dark:border-zinc-700">
                    {children}
                  </code>
                );
              },

              table({ children }) {
                return (
                  <div className="overflow-x-auto my-10 bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-xl p-1 border border-white/40 dark:border-white/10 shadow-sm">
                    <table className="w-full text-left border-collapse m-0">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="p-4 bg-white/60 dark:bg-black/60 font-bold border-b border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="p-4 border-b border-zinc-200/60 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300">
                    {children}
                  </td>
                );
              },
              hr() {
                return <hr className="my-10 border-t border-zinc-300 dark:border-zinc-700" />;
              },
            }}>
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* RIGHT COLUMN: Table of Contents (Fixed / Sticky) */}
        <aside className="hidden lg:block w-[30%] sticky top-[20vh]  h-fit">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </article>
  );
}
