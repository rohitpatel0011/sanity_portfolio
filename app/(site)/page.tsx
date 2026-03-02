import { getProfile } from "@/sanity/query";
// Simple Mono Icons
import { HiOutlineCodeBracket, HiOutlineCpuChip, HiOutlineCircleStack, HiOutlineCommandLine } from "react-icons/hi2";

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("frontend")) return <HiOutlineCodeBracket className="text-zinc-500 w-6 h-6" />;
  if (n.includes("backend")) return <HiOutlineCommandLine className="text-zinc-500 w-6 h-6" />;
  if (n.includes("database")) return <HiOutlineCircleStack className="text-zinc-500 w-6 h-6" />;
  if (n.includes("ai")) return <HiOutlineCpuChip className="text-zinc-500 w-6 h-6" />;
  return <HiOutlineCodeBracket className="text-zinc-500 w-6 h-6" />;
};

export default async function Home() {
  const profile = await getProfile();
  const data = profile[0];

  return (
    <main className="max-w-5xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-20">
        <h1 className="text-6xl font-black tracking-tighter mb-4">I'm {data.fullName}</h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">{data.shortBio}</p>
      </section>

      {/* Skills Grid */}
      <section className="py-10">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-8">Technical Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skills?.map((cat: any, i: number) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/20 hover:border-zinc-300 transition-all group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-100 rounded-lg group-hover:bg-[var(--highlight)] transition-colors">
                  {getIcon(cat.categoryName)}
                </div>
                <h4 className="font-bold text-lg">{cat.categoryName}</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skillList.map((skill: string, j: number) => (
                  <span key={j} className="text-sm font-medium py-1 px-3 bg-white/50 border border-zinc-200 rounded-full text-zinc-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}