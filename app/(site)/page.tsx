import { getProfile } from "@/sanity/query";
import { HiOutlineGlobeAlt, HiOutlineDevicePhoneMobile, HiOutlineSparkles } from "react-icons/hi2";

export default async function Home() {
  const profile = await getProfile();
  const data = profile[0];

  return (
    <main className="max-w-5xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-20">
        <h1 className="text-6xl font-black tracking-tighter mb-4">Hi, I'm superuser</h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">{data.shortBio}</p>
      </section>

      {/* What I Build Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-70 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        
        <div className="mb-12">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2">What I Build</h3>
          <h2 className="text-3xl font-black tracking-tight">Core Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Grid Item 1 */}
          <div className="group relative p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-all duration-300">
            <div className="absolute inset-0 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-6 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300">
              <HiOutlineGlobeAlt className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-zinc-100">SaaS & Web Platforms</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">Designing the technical architecture for scalable online businesses and high-performance web applications.</p>
          </div>

          {/* Grid Item 2 */}
          <div className="group relative p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-all duration-300">
            <div className="absolute inset-0 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-6 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300">
              <HiOutlineDevicePhoneMobile className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-zinc-100">Mobile Experiences</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">Crafting user-centric native and cross-platform Android applications for seamless mobile interactions.</p>
          </div>

          {/* Grid Item 3 */}
          <div className="group relative p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-all duration-300">
            <div className="absolute inset-0 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-6 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300">
              <HiOutlineSparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xl mb-3 text-zinc-900 dark:text-zinc-100">Intelligent Systems</h4>
            <p className="text-zinc-500 leading-relaxed text-sm">Leveraging custom AI agents to solve complex automation challenges and elevate software capabilities.</p>
          </div>
        </div>
      </section>

      {/* Experience / Timeline */}
      <section className="py-10">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 mb-8">Experience</h3>
        <div className="border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 pl-8 relative pb-8">
          <div className="absolute w-4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full -left-[9px] top-1"></div>
          <h4 className="font-bold text-xl">Founder & Developer</h4>
          <a href="https://sudodigit.com" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 transition-colors text-sm font-medium mb-3 block">sudodigit.com</a>
          <p className="text-zinc-500">Built and launched Sudodigit, providing software applications, web apps, and AI solutions.</p>
        </div>
        {/* More experience blocks can be added here */}
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-black tracking-tighter mb-6">Let's build something together.</h2>
        <p className="text-zinc-500 max-w-lg mx-auto mb-8">Have an idea for a web app, Android app, or need a custom AI agent? I'm available for new opportunities.</p>
        <a href="mailto:hello@superuser.com" className="inline-block bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform duration-200">
          Get in Touch
        </a>
      </section>
    </main>
  );
}