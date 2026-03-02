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
    return <p className="text-sm text-zinc-500 italic">No headings found.</p>;
  }

  return (
    <nav className="flex flex-col gap-3">
      {headings.map((heading, idx) => (
        <a
          key={idx}
          href={`#${heading.id}`}
          className={`text-sm transition-all duration-300 line-clamp-2 ${
            heading.level === 3 ? 'ml-4' : ''
          } ${
            activeId === heading.id
              ? 'text-[var(--primary)] font-bold scale-[1.02] translate-x-1'
              : 'text-zinc-500 hover:text-[var(--primary)] font-medium'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}
