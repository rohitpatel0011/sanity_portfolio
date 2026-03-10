"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" } // Center focus ke liye thoda adjust kiya hai
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    /* EXACT NAVBAR DESIGN: glass, rounded-2xl, p-6 */
    <div className="glass p-6 rounded-2xl max-h-[60vh] overflow-y-auto custom-scrollbar">
      <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-[var(--danger)] border-b border-zinc-200/50 pb-4">
        Table of Contents
      </h3>
      <ul className="space-y-4 pr-2"> {/* pr-2 diya hai taaki scrollbar text se na chipke */}
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(heading.level - 2)}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`relative block text-sm font-bold transition-all duration-300 ${
                activeId === heading.id
                  ? "text-[var(--primary)] translate-x-3"
                  : "text-zinc-500 hover:text-[var(--danger)] hover:translate-x-1"
              }`}
            >
              {activeId === heading.id && (
                <span className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"></span>
              )}
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}