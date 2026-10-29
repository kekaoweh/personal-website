import Link from "next/link";
import { ThemeButton } from "@/components/controls";
import { TimelineVisual } from "@/components/timeline-visual";
import { type Project, site, socials } from "@/content/site";

export const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function PageHeader({
  title,
  description,
  eyebrow,
  back,
  backHref = "/",
  backLabel = "Home",
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
        className="rise pr-16 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl"
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
      <span className="bg-accent size-1 shrink-0 rounded-[1px]" />
      {href ? (
        <Link href={href} className="group -ml-1 flex gap-1.5 hover:text-foreground">
          {label}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      ) : (
        <span className="-ml-1 flex gap-1.5">{label}</span>
      )}
      <span className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
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
              ? "opacity-55 transition-opacity duration-500 group-hover:opacity-100"
              : "fill-foreground/15"
          }
          style={
            d.on
              ? {
                  // Lit dots sweep from accent blue to cyan across the pattern.
                  fill: `color-mix(in oklab, var(--accent-2) ${Math.round((d.x / (cols - 1)) * 100)}%, var(--accent))`,
                  transitionDelay: `${(d.x + d.y) * 25}ms`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

export const cardClass =
  "group flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_40px_-18px_var(--accent)]";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <li>
      <Link href={`/projects/${p.slug}`} className={cardClass} data-light>
        {p.slug === "picasso" ? (
          <TimelineVisual compact />
        ) : (
          <Pattern seed={p.title} />
        )}
        <div className="flex flex-1 flex-col gap-1">
          <p className="flex items-center justify-between gap-3">
            <span className="text-lg leading-none font-semibold tracking-tight">{p.title}</span>
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
          <span className="font-medium transition-transform duration-300 group-hover:translate-x-1">
            {title}
            {subtitle && (
              <span className="text-muted-foreground hidden font-normal sm:inline">
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
        <Link href={href} className={className} data-light>
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}

// Pill list; an optional tone (a CSS color) tints the pills for categorized lists.
export function Chips({ items, tone }: { items: string[]; tone?: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="text-muted-foreground rounded-md border border-border px-2 py-0.5 font-mono text-[11px]"
          style={
            tone
              ? {
                  color: `color-mix(in oklab, ${tone} 75%, var(--foreground))`,
                  borderColor: `color-mix(in oklab, ${tone} 22%, transparent)`,
                  backgroundColor: `color-mix(in oklab, ${tone} 6%, transparent)`,
                }
              : undefined
          }
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const STATUS_COLOR: Record<string, string> = {
  Live: "var(--live)",
  "In development": "var(--warn)",
  "Open source": "var(--accent-3)",
  Shipped: "var(--accent)",
};

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLOR[status] ?? "var(--muted-foreground)";
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-px font-mono text-[10.5px] whitespace-nowrap"
      style={{
        color,
        borderColor: `color-mix(in oklab, ${color} 30%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${color} 8%, transparent)`,
      }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {status}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-auto flex flex-col gap-4 pt-20 pb-24">
      <SectionLabel>Contact</SectionLabel>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          className="text-sm font-medium transition-colors hover:text-accent"
        >
          {site.email}
        </a>
        <div className="flex gap-5">
          {socials
            .filter((s) => !s.href.startsWith("mailto:"))
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
      <p className="text-muted-foreground text-xs">
        {site.name} · {site.location}
      </p>
    </footer>
  );
}
