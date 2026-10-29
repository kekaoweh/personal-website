import Link from "next/link";
import { Footer, PageHeader, delay } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Lost the plot."
        description={<p>This page doesn&apos;t exist, or it moved somewhere better.</p>}
        back
      />
      <div className="rise flex flex-col gap-6 pt-12" style={delay(3)}>
        <p className="text-muted-foreground font-serif text-[9rem] leading-none tracking-tight">
          404
        </p>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/resume", label: "Résumé" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-border px-3.5 py-1.5 transition-colors hover:border-accent hover:text-accent"
            >
              {l.label} →
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          Tip: press <kbd className="rounded border border-border px-1.5 font-mono text-xs">⌘K</kbd> to
          search everything.
        </p>
      </div>
      <Footer />
    </>
  );
}
