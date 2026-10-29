// All editable site content lives here.

export const site = {
  name: "Kekachukwu Oweh",
  role: "Full-stack developer",
  title: "Kekachukwu Oweh — Full-Stack Developer",
  description:
    "Full-stack developer building human-centered mobile and web apps. Computing Science student at Trinity Western University, minoring in Psychology.",
  bio: "Full-stack developer with 2+ years shipping production mobile and web apps: React and React Native on the front, Node.js and Python on the back, deployed on AWS. I study Computing Science at Trinity Western University with a minor in Psychology, and use both to build technology designed around how people actually think.",
  // Shown in the live status line under the bio.
  location: "Langley, BC",
  timeZone: "America/Vancouver",
  now: "Building Picasso",
  url: "https://kekwebsite.vercel.app",
  email: "owehjessie@gmail.com",
  github: "kekaoweh",
};

export const featured: {
  title: string;
  description: string;
  href: string;
}[] = [
  {
    title: "Projects",
    description: "Case studies of the products I've designed and built",
    href: "/projects",
  },
  {
    title: "Résumé",
    description: "Experience, skills and education on one printable page",
    href: "/resume",
  },
];

export type Experience = {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, omitted = present
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "VolTrack",
    role: "Frontend Developer & UX Designer",
    start: "2025-06",
    end: "2025-09",
    summary:
      "Designed and built the website for a Toronto startup tackling vehicle theft through tracking and protection.",
    highlights: [
      "Designed and built the company website for VolTrack, a Toronto startup focused on tracking stolen vehicles and protecting cars from theft.",
      "Developed a responsive, mobile-first site in React and Next.js that presents the product clearly across every screen size.",
      "Translated Figma wireframes into production-ready UI, applying accessible design patterns aligned with WCAG guidelines.",
      "Ran user feedback sessions with the co-founder and iterated rapidly on information architecture and messaging.",
    ],
    stack: ["React", "Next.js", "JavaScript", "CSS3", "Figma", "Relume"],
  },
  {
    company: "Herds",
    role: "Founding Full-Stack Developer",
    start: "2023-05",
    end: "2024-12",
    summary:
      "Founding engineer on a mobile platform for Greek life organizations, owning the product from system design to production.",
    highlights: [
      "Architected and launched a mobile platform serving 500+ active users, owning the full product lifecycle from system design through production deployment on AWS.",
      "Built responsive React Native UI with consistent behavior on iOS and Android, polished with animations and transitions.",
      "Engineered a scalable Node.js/Express backend on MongoDB, containerized with Docker on AWS EC2, sustaining 99.5% uptime.",
      "Shipped an ML-powered recommendation system in Python and PyTorch that increased user engagement by 35% through personalized content.",
      "Built real-time messaging with Socket.io, enabling instant communication across 50+ campus organizations.",
    ],
    stack: [
      "React Native",
      "React",
      "Node.js",
      "Python",
      "PyTorch",
      "MongoDB",
      "AWS EC2",
      "Docker",
      "Socket.io",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  period: string;
  status: "Live" | "In development" | "Shipped" | "Open source";
  role?: string;
  highlights: string[];
  stack: string[];
  // Optional case-study sections, shown on /projects/[slug]
  pipeline?: { step: string; detail: string }[];
  built?: string[];
  next?: string[];
  href?: string; // live site or demo
  repo?: string; // source code
};

export const projects: Project[] = [
  {
    slug: "picasso",
    title: "Picasso",
    tagline: "A studio for moving pictures",
    description:
      "An AI video editor where an agent makes the whole video. Describe what you want, add footage, references and music, and pick a style: a Claude-powered agent studies the media, writes the script and cuts the timeline, and the backend renders an MP4. Ask for changes in plain language to get a new version.",
    period: "Oct 2026 – Present",
    status: "In development",
    role: "Designer & sole developer",
    highlights: [
      "Built an editing agent on the Claude Agent SDK with no shell or file access, only four project-scoped studio tools: list assets, view frames as contact sheets, write the script, and set the timeline.",
      "Designed a validated timeline schema (trims, captions, Ken Burns motion, transitions, music bed) that an ffmpeg pipeline renders to 16:9, 9:16, 1:1 or 4:5.",
      "Styles pair editing direction for the agent with render settings like color grade and caption design; five built in, plus user-made styles.",
      "Users sign in with their own Claude credential, encrypted at rest and isolated per user so a run can never fall back to another account.",
      "Live studio log streams the agent's progress to the editor while it works.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "SQLite",
      "ffmpeg",
      "Claude Agent SDK",
    ],
    pipeline: [
      { step: "Brief", detail: "Prompt, footage, references, music and a style" },
      { step: "Agent", detail: "Claude studies the media and writes the script" },
      { step: "Timeline", detail: "A validated JSON edit: clips, trims, captions" },
      { step: "Render", detail: "ffmpeg grades, captions and mixes the cut" },
      { step: "MP4", detail: "Watch it, then ask for changes in plain words" },
    ],
    built: [
      "Claude editing agent with project-scoped tools",
      "Timeline schema and ffmpeg renderer",
      "Studio API, run pipeline and live event stream",
      "Sign-in with a Claude account or API key",
      "Editor, studio home and Styles pages",
    ],
    next: [
      "Generating new shots with an AI video model",
      "Voiceover and auto-captions from speech",
      "A background job queue for scaling out",
    ],
    repo: "https://github.com/kekaoweh/picasso",
  },
  {
    slug: "recall",
    title: "Recall",
    tagline: "AI-powered flashcards",
    description:
      "A full-stack study tool that turns any pasted text into flashcards with Claude, then schedules reviews with spaced repetition.",
    period: "2025",
    status: "Live",
    highlights: [
      "Integrated the Claude API to generate flashcards intelligently from pasted notes or readings.",
      "Implemented a spaced-repetition scheduler with a four-point rating system (Again / Hard / Good / Easy) to maximize retention.",
      "Designed cookie-based authentication for persistent browser sessions; deployed on Vercel with Neon Postgres.",
    ],
    stack: ["Next.js 16", "TypeScript", "Neon Postgres", "Tailwind CSS", "Claude API"],
    pipeline: [
      { step: "Paste", detail: "Notes, a reading or any text" },
      { step: "Generate", detail: "Claude turns it into flashcards" },
      { step: "Review", detail: "Rate each card Again, Hard, Good or Easy" },
      { step: "Schedule", detail: "Spaced repetition decides when it returns" },
    ],
    href: "https://recall-flashcards.spawnlabs.site",
    repo: "https://github.com/kekaoweh/recall",
  },
  {
    slug: "soccercheck",
    title: "SoccerCheck",
    tagline: "GPS check-ins for soccer leagues",
    description:
      "A mobile app that verifies player attendance by GPS, so leagues can trust their check-ins and manage capacity in real time.",
    period: "Oct 2025 – Present",
    status: "In development",
    highlights: [
      "GPS-based attendance verification within a 500-foot radius of the field, backed by a FastAPI service.",
      "Device fingerprinting to prevent check-in fraud.",
      "Push notifications for real-time capacity alerts.",
    ],
    stack: ["React Native", "Expo", "FastAPI", "Python", "Geolocation APIs"],
    pipeline: [
      { step: "Arrive", detail: "Player opens the app at the field" },
      { step: "Locate", detail: "GPS confirms they're within 500 feet" },
      { step: "Verify", detail: "Device fingerprint blocks duplicate check-ins" },
      { step: "Alert", detail: "Push notifications track capacity live" },
    ],
  },
  {
    slug: "micro-journal",
    title: "micro/journal",
    tagline: "60-second daily journaling",
    description:
      "A journaling app built on a psychology idea: one prompt a day and a 60-second timer, because constrained input reduces overthinking.",
    period: "2026",
    status: "Open source",
    highlights: [
      "Designed around the paradox of choice: a single daily prompt and a 60-second writing window, with entries locked once saved.",
      "Scores each entry's sentiment from -1 to 1 and shows history with at-a-glance mood indicators.",
      "No sign-up: cookie-based per-browser ownership backed by serverless Neon Postgres, with the schema created on first load.",
    ],
    stack: ["Next.js 16", "TypeScript", "Neon Postgres", "Tailwind CSS"],
    pipeline: [
      { step: "Prompt", detail: "One question for the day" },
      { step: "Write", detail: "Typing starts a 60-second timer" },
      { step: "Lock", detail: "The entry saves with no editing" },
      { step: "Reflect", detail: "History shows the mood of each day" },
    ],
    next: [
      "Sentiment chart over time",
      "Day-of-week comparison",
      "Streak tracking",
      "Data export",
    ],
    repo: "https://github.com/kekaoweh/micro-journal",
  },
  {
    slug: "herds",
    title: "Herds",
    tagline: "Social platform for Greek life",
    description:
      "The mobile platform I built as founding engineer: messaging, personalized recommendations and organization tools for 500+ students.",
    period: "2023 – 2024",
    status: "Shipped",
    highlights: [
      "Cross-platform React Native app on iOS and Android.",
      "Real-time messaging across 50+ campus organizations via Socket.io.",
      "PyTorch recommendation system that lifted engagement 35%.",
    ],
    stack: ["React Native", "Node.js", "MongoDB", "PyTorch", "AWS", "Docker"],
  },
  {
    slug: "voltrack",
    title: "VolTrack",
    tagline: "Vehicle theft protection, Toronto",
    description:
      "The website for a Toronto startup working to track stolen vehicles and protect cars from theft, designed in Figma and built in Next.js.",
    period: "2025",
    status: "Shipped",
    highlights: [
      "Designed the site end to end, from Figma wireframes and Relume layouts to production code.",
      "Mobile-first, responsive layouts that explain the product clearly on any device.",
      "Accessible UI patterns aligned with WCAG guidelines, refined through user feedback sessions.",
    ],
    stack: ["React", "Next.js", "Figma", "Relume"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "Java", "C", "C++", "HTML5", "CSS3", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "React Native", "Next.js", "Tailwind CSS", "CSS Animation", "Responsive Design", "Figma"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Flask", "REST APIs", "Socket.io", "PostgreSQL", "MongoDB"],
  },
  {
    group: "Infra & AI",
    items: ["AWS (EC2, Lambda)", "Docker", "Vercel", "CI/CD", "Git", "PyTorch", "NumPy"],
  },
];

export const education: {
  school: string;
  degree: string;
  period: string;
}[] = [
  {
    school: "Trinity Western University",
    degree: "B.Sc. Computing Science, Minor in Psychology",
    period: "2025 – 2029 (expected)",
  },
  {
    school: "Conestoga College",
    degree: "Computer Science coursework",
    period: "Jan – Aug 2025",
  },
];

export const coursework = [
  "Object-Oriented Programming",
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "Discrete Mathematics",
  "Human-Computer Interaction",
];

export const interests = [
  "Human-AI Interaction",
  "Behavioral Technology",
  "Digital Accessibility",
  "UX Research",
  "Open Source",
];

export const socials: { label: string; href: string }[] = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kekaoweh/" },
  { label: "GitHub", href: "https://github.com/kekaoweh" },
];

// The waveform: one bar per month since May 2023, taller when more was going on.
const timeline: { label: string; start: string; end?: string }[] = [
  { label: "Herds", start: "2023-05", end: "2024-12" },
  { label: "Conestoga College", start: "2025-01", end: "2025-08" },
  { label: "VolTrack", start: "2025-06", end: "2025-09" },
  { label: "Trinity Western", start: "2025-09" },
  { label: "SoccerCheck", start: "2025-10" },
  { label: "micro/journal", start: "2026-09", end: "2026-09" },
  { label: "Picasso", start: "2026-10" },
];

const NOW = "2026-10";

function monthsBetween(start: string, end: string) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  const out: string[] = [];
  for (let y = sy, m = sm; y < ey || (y === ey && m <= em); m === 12 ? (y++, (m = 1)) : m++)
    out.push(`${y}-${String(m).padStart(2, "0")}`);
  return out;
}

export const activity: { date: string; label: string; weight: number }[] =
  monthsBetween("2023-05", NOW).map((month) => {
    const active = timeline.filter(
      (t) => t.start <= month && (t.end ?? NOW) >= month,
    );
    return {
      date: new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
      label: active.map((t) => t.label).join(" · "),
      weight: active.length,
    };
  });

export function formatMonth(ym?: string) {
  if (!ym) return "Present";
  return new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
