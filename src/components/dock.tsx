"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openPalette } from "@/components/command-palette";
import { copyEmail } from "@/components/toast";
import { site } from "@/content/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Résumé" },
];

// Floating navigation pinned to the bottom of every page.
export function Dock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="no-print fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/75 p-1 text-sm shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl">
        {LINKS.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${active ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {l.label}
              {active && (
                <span className="bg-accent absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full" />
              )}
            </Link>
          );
        })}
        <span className="mx-1 h-4 w-px bg-border" />
        <button
          type="button"
          onClick={() => copyEmail(site.email)}
          title="Copy email"
          className="text-muted-foreground rounded-full px-3 py-1.5 transition-colors hover:text-foreground"
        >
          Email
        </button>
        <button
          type="button"
          onClick={openPalette}
          title="Command menu (⌘K)"
          aria-label="Open command menu"
          className="text-muted-foreground hidden rounded-full px-2.5 py-1.5 font-mono text-xs transition-colors hover:text-foreground sm:block"
        >
          ⌘K
        </button>
      </div>
    </nav>
  );
}
