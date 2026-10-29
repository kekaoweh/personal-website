import Link from "next/link";
import { AccentButton, ThemeButton } from "@/components/controls";
import { TimelineVisual } from "@/components/timeline-visual";
import { type Project, socials } from "@/content/site";
import { SHORTCUTS } from "@/lib/prefs";

export const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function PageHeader({
  title,
  description,
  eyebrow,
  back,
  backHref = "/",
  backLabel = "home",
}: {
  title: string;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  back?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="relative flex flex-col gap-3">
      <div className="no-print text-muted-foreground absolute -top-1 right-0 flex gap-1">
        <ThemeButton />
        <AccentButton />
      </div>
      {back ? (
        <Link
          href={backHref}
          className="no-print rise text-muted-foreground group w-fit font-mono text-xs hover:text-foreground"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-0.5">
            ←
          </span>{" "}
          {backLabel}
        </Link>
      ) : (
        eyebrow
      )}
      <h1
        className="rise pr-16 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl"
        style={delay(1)}
      >
        {title}
      </h1>
      {description && (
        <div
          className="rise text-muted-foreground max-w-lg text-pretty"
          style={delay(2)}
        >
          {description}
        </div>
      )}
    </header>
  );
}

export function SectionLabel({
  children,
  href,
  count,
}: {
  children: React.ReactNode;
  href?: string;
  count?: number;
}) {
  const label = (
    <>
      <span>{children}</span>
      {count !== undefined && (
        <span className="text-muted-foreground/60">({count})</span>
      )}
    </>
  );
  return (
    <div className="text-muted-foreground flex items-center gap-3 font-mono text-xs tracking-wider uppercase">
      {href ? (
        <Link href={href} className="group flex gap-1.5 hover:text-foreground">
          {label}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      ) : (
        <span className="flex gap-1.5">{label}</span>
      )}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function seededDots(seed: string, cols: number, rows: number) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const dots = [];
  for (let i = 0; i < cols * rows; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    dots.push({ i, on: (h >>> 16) % 3 === 0, x: i % cols, y: Math.floor(i / cols) });
  }
  return dots;
}

// Generative dot pattern, seeded by a string so each project looks unique.
export function Pattern({
  seed,
  cols = 22,
  rows = 5,
}: {
  seed: string;
  cols?: number;
  rows?: number;
}) {
  const dots = seededDots(seed, cols, rows);
  return (
    <svg
      viewBox={`0 0 ${cols * 10} ${rows * 10}`}
      className="h-auto w-full"
      aria-hidden
    >
      {dots.map((d) => (
        <circle
          key={d.i}
          cx={d.x * 10 + 5}
          cy={d.y * 10 + 5}
          r={d.on ? 2.2 : 1}
          className={
            d.on
              ? "fill-foreground/70 transition-all duration-500 group-hover:fill-accent"
              : "fill-foreground/15"
          }
          style={{ transitionDelay: `${(d.x + d.y) * 25}ms` }}
        />
      ))}
    </svg>
  );
}

export const cardClass =
  "group flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_var(--accent)]";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <li>
      <Link href={`/projects/${p.slug}`} className={cardClass}>
        {p.slug === "picasso" ? (
          <TimelineVisual compact />
        ) : (
          <Pattern seed={p.title} />
        )}
        <div className="flex flex-1 flex-col gap-1">
          <p className="flex items-center justify-between gap-3">
            <span className="font-serif text-2xl leading-none">{p.title}</span>
            <StatusBadge status={p.status} />
          </p>
          <p className="text-muted-foreground text-sm text-pretty">{p.tagline}</p>
        </div>
        <p className="text-muted-foreground flex items-center justify-between gap-3 font-mono text-[11px]">
          <span className="truncate">{p.stack.slice(0, 3).join(" · ")}</span>
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
            →
          </span>
        </p>
      </Link>
    </li>
  );
}

// A numbered row with a dotted leader running to a right-aligned meta label.
export function IndexRow({
  href,
  index,
  title,
  subtitle,
  description,
  meta,
}: {
  href?: string;
  index: number;
  title: string;
  subtitle?: string;
  description: string;
  meta: React.ReactNode;
}) {
  const body = (
    <>
      <span className="text-muted-foreground pt-0.5 font-mono text-xs tabular-nums transition-colors group-hover:text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-baseline gap-3">
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {title}
            {subtitle && (
              <span className="text-muted-foreground hidden sm:inline">
                {" "}
                — {subtitle}
              </span>
            )}
          </span>
          <span className="mb-1 h-px min-w-4 flex-1 border-b border-dotted border-border" />
          <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
            {meta}
          </span>
        </span>
        {subtitle && (
          <span className="text-muted-foreground text-sm sm:hidden">{subtitle}</span>
        )}
        <span className="text-muted-foreground text-sm text-pretty transition-transform duration-300 group-hover:translate-x-1">
          {description}
        </span>
      </span>
    </>
  );
  const className =
    "group -mx-3 flex gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-surface";
  return (
    <li>
      {href ? (
        <Link href={href} className={className}>
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}

export function Chips({ items, small }: { items: string[]; small?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className={`text-muted-foreground rounded-full border border-border font-mono ${small ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-[11px]"}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const live = status === "Live";
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1.5 font-mono text-[11px]">
      <span
        className={`size-1.5 rounded-full ${live ? "bg-accent" : status === "In development" ? "bg-amber-500" : "bg-foreground/30"}`}
      />
      {status}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-auto flex flex-col gap-6 pt-20 pb-16">
      <div className="flex flex-col gap-2">
        <p className="font-serif text-2xl">Let&apos;s build something.</p>
        <p className="text-muted-foreground text-sm">
          Open to internships, co-ops and freelance work.
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-x-5 gap-y-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group relative text-sm"
          >
            {s.label}
            <span className="bg-accent absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        ))}
      </div>
      <div className="text-muted-foreground hidden gap-4 font-mono text-[11px] sm:flex">
        {SHORTCUTS.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-surface px-1.5 py-px font-mono">
              {s.key}
            </kbd>
            {s.label}
          </span>
        ))}
      </div>
    </footer>
  );
}
