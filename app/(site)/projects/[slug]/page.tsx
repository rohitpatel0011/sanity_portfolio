import { getSingleProject } from "@/sanity/query";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongLeft, HiArrowTopRightOnSquare } from "react-icons/hi2";

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10 relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={value.asset.url}
            alt={value.alt || "Project image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-black mt-16 mb-6 text-zinc-900 dark:text-zinc-100">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-zinc-900 dark:text-zinc-100">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-10 mb-5 text-zinc-800 dark:text-zinc-200">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg leading-relaxed mb-6 text-zinc-600 dark:text-zinc-400">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 text-lg text-zinc-600 dark:text-zinc-400 space-y-2 marker:text-[var(--primary)]">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 text-lg text-zinc-600 dark:text-zinc-400 space-y-2 marker:text-[var(--primary)] font-medium">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-zinc-900 dark:text-zinc-100">{children}</strong>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : ''}
          className="text-[var(--primary)] hover:underline decoration-2 underline-offset-4 font-medium"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function SingleProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getSingleProject(slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">The project you are looking for doesn't exist.</p>
        <Link
          href="/projects"
          className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-medium transition-colors hover:brightness-110"
        >
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 mt-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] font-medium transition-colors mb-10 group"
      >
        <HiArrowLongLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to all projects
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-zinc-900 dark:text-white">
          {project.name}
        </h1>

        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/20 dark:shadow-black/40"
          >
            Visit Project
            <HiArrowTopRightOnSquare className="w-5 h-5" />
          </a>
        )}
      </header>

      {project.coverImage?.image && (
        <div className="relative w-full aspect-video md:aspect-[21/9] mb-16 rounded-3xl overflow-hidden shadow-2xl glass border border-white/20">
          <Image
            src={project.coverImage.image}
            alt={project.coverImage.alt || project.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto">
        <div className="prose prose-zinc max-w-none prose-lg md:prose-xl">
          {project.description ? (
            <PortableText value={project.description} components={ptComponents} />
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 italic">No description available for this project.</p>
          )}
        </div>
      </article>
    </main>
  );
}
