import "../globals.css";
import Navbar from "./components/global/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <div className="pt-24">{children}</div>
      </body>
    </html>
  );
}