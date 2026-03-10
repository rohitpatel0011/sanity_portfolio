/** @format */

import "../globals.css";
import Navbar from "./components/global/Navbar";
import { ThemeProvider } from "./components/global/ThemeProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning Next.js aur next-themes ke sath zaroori hai
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-500 font-sans">
        <ThemeProvider>
          <Navbar />
          <div className="pt-24">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
