import type { Metadata } from "next";
import { Footer, PageHeader, ProjectCard, SectionLabel, delay } from "@/components/ui";
import { experience, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of products designed and built by Kekachukwu Oweh.",
};

const work = projects.filter((p) => experience.some((e) => e.company === p.title));
const personal = projects.filter((p) => !work.includes(p));

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description={
          <p>
            Products I&apos;ve designed and built end to end, from mobile apps
            used by hundreds of students to AI tools in production. Open any
            one for the full case study.
          </p>
        }
        back
      />
      <div className="flex flex-col gap-12 pt-12">
        <section className="rise flex flex-col gap-4" style={delay(3)}>
          <SectionLabel count={personal.length}>Personal</SectionLabel>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {personal.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ul>
        </section>
        <section className="rise flex flex-col gap-4" style={delay(4)}>
          <SectionLabel count={work.length}>Work</SectionLabel>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {work.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
