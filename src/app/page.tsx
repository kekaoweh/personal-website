import { LocalClock } from "@/components/controls";
import {
  Chips,
  Footer,
  IndexRow,
  PageHeader,
  SectionLabel,
  Tile,
  delay,
} from "@/components/ui";
import { Waveform } from "@/components/waveform";
import {
  education,
  experience,
  featured,
  projects,
  site,
  skills,
} from "@/content/site";

// Work already listed under Experience is left out of the home projects list.
const sideProjects = projects.filter(
  (p) => !experience.some((e) => e.company === p.title),
);

function yearRange(start: string, end?: string) {
  const s = start.slice(0, 4);
  const e = end ? end.slice(0, 4) : "now";
  return s === e ? s : `${s} – ${e}`;
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
        <section className="rise flex flex-col gap-4" style={delay(4)}>
          <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2">
            {featured.map((f) => (
              <Tile key={f.href} {...f} />
            ))}
          </ul>
        </section>

        <section className="rise flex flex-col gap-2" style={delay(5)}>
          <SectionLabel>Experience</SectionLabel>
          <ul className="flex flex-col">
            {experience.map((e, i) => (
              <IndexRow
                key={e.company}
                index={i + 1}
                title={e.company}
                subtitle={e.role}
                description={e.summary}
                meta={yearRange(e.start, e.end)}
                href="/resume"
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
                href={`/projects#${p.slug}`}
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

        <section className="rise flex flex-col gap-5" style={delay(7)}>
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

        <section className="rise flex flex-col gap-4" style={delay(8)}>
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
