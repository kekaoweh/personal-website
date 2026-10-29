import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TimelineVisual } from "@/components/timeline-visual";
import {
  Chips,
  Footer,
  PageHeader,
  Pattern,
  SectionLabel,
  StatusBadge,
  delay,
} from "@/components/ui";
import { experience, projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: `${p.tagline}. ${p.description}` } : {};
}

// Every real slug is prerendered by generateStaticParams; awaiting params at the
// top (instead of inside <Suspense>) keeps a proper 404 status for unknown slugs.
export const instant = false;

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = projects[index];
  const job = experience.find((e) => e.company === p.title);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { label: "Status", value: <StatusBadge status={p.status} /> },
    { label: "Timeline", value: p.period },
    { label: "Role", value: p.role ?? job?.role },
  ].filter((f) => f.value);

  return (
    <>
      <PageHeader
        title={p.title}
        description={<p>{p.tagline}</p>}
        back
        backHref="/projects"
        backLabel="Projects"
      />

      <div className="flex flex-col gap-12 pt-10">
        <div className="rise flex flex-col gap-6" style={delay(3)}>
          <div className="rounded-xl border border-border bg-surface p-4">
            {p.slug === "picasso" ? (
              <TimelineVisual />
            ) : (
              <Pattern seed={p.title} cols={32} rows={7} />
            )}
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(3,auto)_1fr]">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <dt className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
                  {f.label}
                </dt>
                <dd className="text-sm">{f.value}</dd>
              </div>
            ))}
            {(p.href || p.repo) && (
              <div className="col-span-2 flex items-end gap-2 sm:col-span-1 sm:justify-end">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-foreground text-background rounded-full px-3.5 py-1.5 font-mono text-xs transition-opacity hover:opacity-80"
                  >
                    Visit site ↗
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3.5 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            )}
          </dl>
        </div>

        <section className="rise flex flex-col gap-3" style={delay(4)}>
          <SectionLabel>Overview</SectionLabel>
          <p className="text-[17px] leading-relaxed text-pretty">{p.description}</p>
        </section>

        {p.pipeline && (
          <section className="rise flex flex-col gap-4" style={delay(5)}>
            <SectionLabel>How it works</SectionLabel>
            <ol className="grid grid-cols-1 gap-2 sm:grid-flow-col sm:auto-cols-fr">
              {p.pipeline.map((s, i) => (
                <li
                  key={s.step}
                  className="relative flex gap-3 rounded-lg border border-border p-3 sm:flex-col sm:gap-1.5"
                >
                  <span className="text-accent font-mono text-[11px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm">{s.step}</span>
                    <span className="text-muted-foreground text-xs leading-snug text-pretty">
                      {s.detail}
                    </span>
                  </span>
                  {i < p.pipeline!.length - 1 && (
                    <span className="text-muted-foreground absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 bg-background text-xs sm:block">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="rise flex flex-col gap-3" style={delay(6)}>
          <SectionLabel>What I built</SectionLabel>
          <ul className="flex flex-col gap-2.5">
            {(job?.highlights ?? p.highlights).map((h) => (
              <li key={h} className="flex gap-3">
                <span className="bg-accent mt-2.5 size-1 shrink-0 rounded-full" />
                <span className="text-pretty">{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {(p.built || p.next) && (
          <section className="rise flex flex-col gap-4" style={delay(7)}>
            <SectionLabel>Roadmap</SectionLabel>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {p.built && (
                <div className="flex flex-col gap-2">
                  <p className="text-muted-foreground font-mono text-[11px] uppercase">
                    Shipped
                  </p>
                  {p.built.map((b) => (
                    <p key={b} className="flex gap-2.5 text-sm">
                      <span className="text-accent">✓</span>
                      {b}
                    </p>
                  ))}
                </div>
              )}
              {p.next && (
                <div className="flex flex-col gap-2">
                  <p className="text-muted-foreground font-mono text-[11px] uppercase">
                    Up next
                  </p>
                  {p.next.map((n) => (
                    <p key={n} className="text-muted-foreground flex gap-2.5 text-sm">
                      <span>○</span>
                      {n}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="rise flex flex-col gap-3" style={delay(8)}>
          <SectionLabel>Stack</SectionLabel>
          <Chips items={job?.stack ?? p.stack} />
        </section>

        <nav
          aria-label="More projects"
          className="rise grid grid-cols-2 gap-3 border-t border-border pt-8"
          style={delay(9)}
        >
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1">
            <span className="text-muted-foreground font-mono text-[11px]">← Previous</span>
            <span className="transition-colors group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col items-end gap-1 text-right"
          >
            <span className="text-muted-foreground font-mono text-[11px]">Next →</span>
            <span className="transition-colors group-hover:text-accent">{next.title}</span>
          </Link>
        </nav>
      </div>
      <Footer />
    </>
  );
}
