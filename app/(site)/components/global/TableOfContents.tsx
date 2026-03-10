"use client";

import { useEffect, useState } from "react";

type Heading = {
  text: string;
  id: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Determine which heading is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: 1.0 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">No headings found.</p>;
  }

  return (
    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-[280px]">
      <h4 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white flex items-center gap-2">
        <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        On this page
      </h4>
      
      <nav className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
        {headings.map((heading, idx) => (
          <a
            key={idx}
            href={`#${heading.id}`}
            className={`text-sm transition-all duration-300 relative ${
              heading.level === 3 ? 'ml-4' : ''
            } ${
              activeId === heading.id
                ? 'text-[var(--primary)] font-bold translate-x-3'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] font-medium hover:translate-x-1'
            }`}
          >
            {/* Active Indicator Dot */}
            {activeId === heading.id && (
              <span className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"></span>
            )}
            <span className="line-clamp-2 leading-relaxed">{heading.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
