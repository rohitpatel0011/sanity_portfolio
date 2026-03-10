/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// react-icons import
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="rounded-full px-6 py-3 flex items-center justify-center gap-x-8 backdrop-blur-md bg-white/60 dark:bg-zinc-900/60 border border-white/40 dark:border-zinc-800 shadow-lg dark:shadow-black/50 transition-all duration-300">

        {/* Navigation Links */}
        <div className="flex items-center gap-x-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm md:text-base font-semibold transition-all duration-300 ${
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400 drop-shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Separator Line */}
        <div className="w-[1px] h-6 bg-zinc-300 dark:bg-zinc-700 mx-2" />

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm"
          aria-label="Toggle Theme">
          {mounted ? (
            <>
              {/* Sun Icon (Light Mode) */}
              <FiSun
                className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transition-all duration-500 transform ${
                  resolvedTheme === "dark"
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              {/* Moon Icon (Dark Mode) */}
              <FiMoon
                className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-indigo-300 transition-all duration-500 transform ${
                  resolvedTheme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="w-4 h-4 sm:w-5 sm:h-5 opacity-0" />
          )}
        </button>
      </div>
    </nav>
  );
}
