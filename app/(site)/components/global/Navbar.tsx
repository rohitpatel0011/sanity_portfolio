"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down & passed threshold -> hide
        setIsVisible(false);
      } else {
        // Scrolling up -> show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <nav
      className={`fixed top-6 left-0 right-0 z-50 px-6 transition-transform duration-300 ease-in-out flex justify-center ${
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-8 py-3 flex gap-x-8 items-center">
        {/* <Link href="/" className="font-black text-xl tracking-tighter text-[var(--danger)] mr-4">
          ROHIT<span className="text-[var(--primary)]">.</span>
        </Link> */}

        <div className="flex gap-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-bold transition-colors ${
                pathname === link.href ? "text-[var(--primary)]" : "text-zinc-600 hover:text-[var(--primary)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}