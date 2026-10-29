import type { Metadata } from "next";
import { PrintButton } from "@/components/print-button";
import { Footer, PageHeader, SectionLabel, delay } from "@/components/ui";
import {
  coursework,
  education,
  experience,
  formatMonth,
  interests,
  projects,
  site,
  skills,
  socials,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role}.`,
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        title={site.name}
        description={
          <div className="flex flex-col gap-4">
            <p className="text-foreground">
              {site.role} · {site.location}
            </p>
            <p className="print-only text-sm">
              {socials.map((s) => s.href.replace(/^mailto:|^https?:\/\//, "")).join("  ·  ")}
            </p>
            <PrintButton />
          </div>
        }
        back
      />

      <div className="flex flex-col gap-10 pt-12 text-sm leading-relaxed">
        <section className="rise flex flex-col gap-3" style={delay(3)}>
          <SectionLabel>Summary</SectionLabel>
          <p className="text-pretty">
            Full-stack developer with 2+ years building production mobile and
            web applications. Experienced shipping end-to-end features across
            React and React Native frontends and Node.js and Python backends,
            deployed on AWS. Pairs a Computing Science foundation with a
            Psychology minor to build human-centered technology, with a strong
            interest in responsive design, JavaScript architecture and UI
            development.
          </p>
        </section>

        <section className="rise flex flex-col gap-6" style={delay(4)}>
          <SectionLabel>Experience</SectionLabel>
          {experience.map((e) => (
            <article key={e.company} className="flex flex-col gap-2 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-medium">
                  {e.company}{" "}
                  <span className="text-muted-foreground font-normal">— {e.role}</span>
                </h3>
                <span className="text-muted-foreground shrink-0 font-mono text-xs">
                  {formatMonth(e.start)} – {formatMonth(e.end)}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground font-mono text-[11px]">
                {e.stack.join(" · ")}
              </p>
            </article>
          ))}
        </section>

        <section className="rise flex flex-col gap-6" style={delay(5)}>
          <SectionLabel>Projects</SectionLabel>
          {projects
            .filter((p) => !experience.some((e) => e.company === p.title))
            .map((p) => (
              <article key={p.slug} className="flex flex-col gap-2 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium">
                    {p.title}{" "}
                    <span className="text-muted-foreground font-normal">— {p.tagline}</span>
                  </h3>
                  <span className="text-muted-foreground shrink-0 font-mono text-xs">
                    {p.period}
                  </span>
                </div>
                {p.href && (
                  <a
                    href={p.href}
                    className="text-muted-foreground w-fit font-mono text-xs hover:text-accent"
                  >
                    {p.href.replace(/^https?:\/\//, "")}
                  </a>
                )}
                <ul className="flex flex-col gap-1">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                      <span className="text-pretty">{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {p.stack.join(" · ")}
                </p>
              </article>
            ))}
        </section>

        <section className="rise flex flex-col gap-3 break-inside-avoid" style={delay(6)}>
          <SectionLabel>Skills</SectionLabel>
          <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1.5">
            {skills.map((s) => (
              <div key={s.group} className="contents">
                <dt>{s.group}</dt>
                <dd className="text-muted-foreground">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rise flex flex-col gap-3 break-inside-avoid" style={delay(7)}>
          <SectionLabel>Education</SectionLabel>
          {education.map((e) => (
            <div key={e.school} className="flex items-baseline justify-between gap-4">
              <p>
                {e.school}{" "}
                <span className="text-muted-foreground">— {e.degree}</span>
              </p>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {e.period}
              </span>
            </div>
          ))}
          <p className="text-muted-foreground">
            <span className="text-foreground">Coursework: </span>
            {coursework.join(", ")}
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground">Interests: </span>
            {interests.join(", ")}
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
