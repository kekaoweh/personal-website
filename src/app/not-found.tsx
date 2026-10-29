import Link from "next/link";
import { Footer, PageHeader, delay } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        description={<p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>}
        back
      />
      <div className="rise flex flex-wrap gap-2 pt-10 text-sm" style={delay(3)}>
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
            {l.label}
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}
