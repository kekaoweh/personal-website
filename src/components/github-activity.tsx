import { cacheLife } from "next/cache";
import { SectionLabel } from "@/components/ui";
import { site } from "@/content/site";

type Commit = { repo: string; message: string; date: string; url: string };

type GitHubRepo = { name: string; fork: boolean; private: boolean };
type GitHubCommit = {
  html_url: string;
  commit: { message: string; author: { date: string } };
};

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "kekwebsite",
};

async function getJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { headers });
  return res.ok ? ((await res.json()) as T) : null;
}

// Latest commits across the most recently pushed public repos, refreshed hourly.
async function getRecentCommits(user: string): Promise<Commit[]> {
  "use cache";
  cacheLife("hours");
  try {
    const repos =
      (await getJson<GitHubRepo[]>(
        `https://api.github.com/users/${user}/repos?sort=pushed&per_page=8`,
      )) ?? [];
    const lists = await Promise.all(
      repos
        .filter((r) => !r.fork && !r.private)
        .slice(0, 4)
        .map(async (r) => {
          const commits =
            (await getJson<GitHubCommit[]>(
              `https://api.github.com/repos/${user}/${r.name}/commits?per_page=5`,
            )) ?? [];
          return commits.map((c) => ({
            repo: r.name,
            message: c.commit.message.split("\n")[0],
            date: c.commit.author.date,
            url: c.html_url,
          }));
        }),
    );
    return lists
      .flat()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 6);
  } catch {
    return [];
  }
}

export async function GitHubActivity() {
  const commits = await getRecentCommits(site.github);
  if (commits.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <SectionLabel href={`https://github.com/${site.github}`}>
        Recent commits
      </SectionLabel>
      <ul className="relative flex flex-col">
        <span className="absolute top-3 bottom-3 left-[5px] w-px bg-border" />
        {commits.map((c) => (
          <li key={c.url}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-baseline gap-4 py-1.5"
            >
              <span className="relative z-10 mt-1.5 size-[11px] shrink-0 self-start rounded-full border-2 border-background bg-border transition-colors group-hover:bg-accent" />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-muted-foreground shrink-0 font-mono text-[11px] tabular-nums">
                  {new Date(c.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </span>
                <span className="min-w-0 truncate text-sm transition-colors group-hover:text-accent">
                  {c.message}
                </span>
              </span>
              <span className="text-muted-foreground shrink-0 rounded-full border border-border px-2 py-px font-mono text-[10px]">
                {c.repo}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
