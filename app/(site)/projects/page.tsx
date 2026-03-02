import { getProjects } from "@/sanity/query";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black mb-12">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <a key={project._id} href={project.projectUrl || "#"} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="glass border border-zinc-200 p-6 rounded-2xl hover:border-[var(--highlight)] transition-all h-full flex flex-col">
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
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--highlight)] transition-colors">{project.name}</h2>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
