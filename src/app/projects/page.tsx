import type { Metadata } from "next";
import { Chips, Footer, PageHeader, StatusBadge, delay } from "@/components/ui";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of products designed and built by Kekachukwu Oweh.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description={
          <p>
            Products I&apos;ve designed and built end to end, from mobile apps
            used by hundreds of students to AI tools in production.
          </p>
        }
        back
      />
      <ul className="flex flex-col gap-4 pt-12">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            id={p.slug}
            className="rise group scroll-mt-8 rounded-xl border border-border bg-surface p-5 transition-colors target:border-accent hover:border-accent/50 sm:p-6"
            style={delay(i + 3)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl leading-tight">{p.title}</h2>
                <p className="text-muted-foreground text-sm">{p.tagline}</p>
              </div>
              <div className="flex flex-col items-end gap-1 pt-1">
                <StatusBadge status={p.status} />
                <span className="text-muted-foreground font-mono text-[11px]">
                  {p.period}
                </span>
              </div>
            </div>
            <p className="mt-4 text-pretty">{p.description}</p>
            <ul className="text-muted-foreground mt-4 flex flex-col gap-1.5 text-sm">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                  <span className="text-pretty">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
              <Chips items={p.stack} />
              <div className="flex gap-4">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs hover:text-accent"
                  >
                    visit site ↗
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs hover:text-accent"
                  >
                    source ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
