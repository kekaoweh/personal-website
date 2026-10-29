import Link from "next/link";
import { LocalClock } from "@/components/controls";
import { GitHubActivity } from "@/components/github-activity";
import { TimelineVisual } from "@/components/timeline-visual";
import {
  Chips,
  Footer,
  IndexRow,
  PageHeader,
  SectionLabel,
  StatusBadge,
  cardClass,
  delay,
} from "@/components/ui";
import { Waveform } from "@/components/waveform";
import { education, experience, projects, site, skills } from "@/content/site";

const spotlight = projects.find((p) => p.slug === "picasso")!;

// Work already listed under Experience, and the spotlight, are left out of the list.
const sideProjects = projects.filter(
  (p) => p !== spotlight && !experience.some((e) => e.company === p.title),
);

function yearRange(start: string, end?: string) {
  const s = start.slice(0, 4);
  const e = end ? end.slice(0, 4) : "now";
  return s === e ? s : `${s} – ${e}`;
}

function Spotlight() {
  const done = spotlight.built?.length ?? 0;
  const total = done + (spotlight.next?.length ?? 0);
  return (
    <Link href={`/projects/${spotlight.slug}`} className={`${cardClass} p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
          <span className="relative flex size-1.5">
            <span className="bg-accent absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full" />
            <span className="bg-accent relative size-1.5 rounded-full" />
          </span>
          Now building
        </span>
        <StatusBadge status={spotlight.status} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-serif text-4xl leading-none">{spotlight.title}</h2>
        <p className="text-muted-foreground text-sm text-pretty">
          {spotlight.tagline}. Describe the video you want; a Claude-powered
          agent studies your footage, writes the script, cuts the timeline and
          renders the MP4.
        </p>
      </div>
      <TimelineVisual />
      <div className="flex flex-col gap-1.5">
        <div className="text-muted-foreground flex justify-between font-mono text-[11px]">
          <span>Roadmap</span>
          <span>
            {done} shipped · {total - done} next
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <div
            className="bg-accent h-full rounded-full"
            style={{ width: `${Math.round((done / total) * 100)}%` }}
          />
        </div>
      </div>
      <p className="text-muted-foreground flex items-center justify-between font-mono text-[11px]">
        <span>{spotlight.stack.slice(0, 4).join(" · ")}</span>
        <span className="flex items-center gap-1 transition-colors group-hover:text-accent">
          case study
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </p>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <PageHeader
        title={site.name}
        description={<p>{site.bio}</p>}
        eyebrow={
          <div className="rise text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            <span className="relative flex size-1.5">
              <span className="bg-accent absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full" />
              <span className="bg-accent relative size-1.5 rounded-full" />
            </span>
            <span>{site.now}</span>
            <span className="text-border">/</span>
            <span>
              {site.location} · <LocalClock timeZone={site.timeZone} />
            </span>
          </div>
        }
      />
      <div className="rise" style={delay(3)}>
        <Waveform />
      </div>
      <div className="flex flex-col gap-14 pt-10">
        <section className="rise" style={delay(4)}>
          <Spotlight />
        </section>

        <section className="rise flex flex-col gap-2" style={delay(5)}>
          <SectionLabel href="/resume">Experience</SectionLabel>
          <ul className="flex flex-col">
            {experience.map((e, i) => (
              <IndexRow
                key={e.company}
                index={i + 1}
                title={e.company}
                subtitle={e.role}
                description={e.summary}
                meta={yearRange(e.start, e.end)}
                href={`/projects/${e.company.toLowerCase()}`}
              />
            ))}
          </ul>
        </section>

        <section className="rise flex flex-col gap-2" style={delay(6)}>
          <SectionLabel href="/projects" count={projects.length}>
            Projects
          </SectionLabel>
          <ul className="flex flex-col">
            {sideProjects.map((p, i) => (
              <IndexRow
                key={p.slug}
                href={`/projects/${p.slug}`}
                index={i + 1}
                title={p.title}
                subtitle={p.tagline}
                description={p.description}
                meta={
                  p.status === "Live" ? (
                    <span className="text-accent">● live</span>
                  ) : p.status === "In development" ? (
                    "in progress"
                  ) : p.status === "Open source" ? (
                    "open source"
                  ) : (
                    p.period
                  )
                }
              />
            ))}
          </ul>
        </section>

        <div className="rise" style={delay(7)}>
          <GitHubActivity />
        </div>

        <section className="rise flex flex-col gap-5" style={delay(8)}>
          <SectionLabel>Toolkit</SectionLabel>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-[7rem_1fr]">
            {skills.map((s) => (
              <div key={s.group} className="contents">
                <dt className="text-sm sm:pt-0.5">{s.group}</dt>
                <dd>
                  <Chips items={s.items} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rise flex flex-col gap-4" style={delay(9)}>
          <SectionLabel>Education</SectionLabel>
          <ul className="flex flex-col gap-3">
            {education.map((e) => (
              <li key={e.school} className="flex items-baseline gap-3">
                <span className="flex flex-col">
                  <span>{e.school}</span>
                  <span className="text-muted-foreground text-sm">{e.degree}</span>
                </span>
                <span className="mb-1 h-px min-w-4 flex-1 border-b border-dotted border-border" />
                <span className="text-muted-foreground shrink-0 font-mono text-xs">
                  {e.period}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
