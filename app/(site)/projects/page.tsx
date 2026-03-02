import { getProjects } from "@/sanity/query";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 mt-10">
      <h1 className="text-5xl font-black mb-12">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <Link key={project._id} href={`/projects/${project.slug}`} className="block group">
            <div className="glass border border-zinc-200 p-6 rounded-2xl hover:border-[var(--primary)] transition-all h-full flex flex-col">
              {project.coverImage?.image ? (
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-zinc-100">
                  <Image
                    src={project.coverImage.image}
                    alt={project.coverImage.alt || project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 mb-6 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <span className="text-zinc-400">No Image</span>
                </div>
              )}
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">{project.name}</h2>
              {/* If there's a description we can show a short preview, or just leave it for the single page */}
              <p className="text-zinc-500 text-sm flex-grow line-clamp-3">
                 Click to view project details and visit the live site.
              </p>

              <div className="mt-6 font-medium text-[var(--primary)] text-sm group-hover:underline underline-offset-4 flex items-center gap-2">
                View Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
