import { cn } from "@/lib/utils";
import Link from "next/link";

function TestLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c2410c] to-[#9a3412] flex items-center justify-center">
        <svg
          className="w-5 h-5 text-[#fef3c7]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      <span className="font-serif text-xl font-semibold text-[#1c1917] tracking-tight">
        RecommendWell
      </span>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#e7e5e4] bg-[#fafaf9]">
      <TestLogo />
    </div>
  );
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Desktop Header */}
      <header className="hidden lg:sticky lg:top-0 lg:z-50 lg:border-b lg:border-[#e7e5e4] lg:bg-[#fafaf9]/95 lg:backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <TestLogo />
          <div className="flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-[#57534e] hover:text-[#1c1917] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#57534e] hover:text-[#1c1917] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-[#57534e] hover:text-[#1c1917] transition-colors"
            >
              Templates
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#57534e] hover:text-[#1c1917] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-[#1c1917] text-[#fafaf9] hover:bg-[#292524] transition-colors"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <MobileNav />

      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#e7e5e4] bg-[#f5f5f4] py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#78716c] text-sm">
            © 2025 RecommendWell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
