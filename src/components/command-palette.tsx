"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { copyEmail } from "@/components/toast";
import { projects, site, socials } from "@/content/site";
import { cycleAccent, toggleTheme } from "@/lib/prefs";

const OPEN_EVENT = "site:palette";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, "_blank", "noopener");
    return [
      { id: "home", group: "Pages", label: "Home", hint: "h", run: go("/") },
      { id: "projects", group: "Pages", label: "Projects", hint: "p", run: go("/projects") },
      { id: "resume", group: "Pages", label: "Résumé", hint: "r", run: go("/resume") },
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.tagline,
        run: go(`/projects/${p.slug}`),
      })),
      { id: "copy-email", group: "Actions", label: "Copy email address", hint: site.email, run: () => copyEmail(site.email) },
      { id: "pdf", group: "Actions", label: "Download résumé as PDF", run: go("/resume?print") },
      { id: "theme", group: "Actions", label: "Toggle light / dark", hint: "t", run: toggleTheme },
      { id: "accent", group: "Actions", label: "Change accent color", hint: "a", run: cycleAccent },
      ...socials
        .filter((s) => !s.href.startsWith("mailto:"))
        .map((s) => ({
          id: `link-${s.label}`,
          group: "Links",
          label: s.label,
          hint: s.href.replace(/^https?:\/\/(www\.)?/, ""),
          run: external(s.href),
        })),
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.group} ${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  function run(item: Item | undefined) {
    if (!item) return;
    close();
    item.run();
  }

  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-[60] flex items-start justify-center bg-black/30 px-4 pt-[14vh] backdrop-blur-[2px]"
      onMouseDown={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="palette-in w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <span className="text-muted-foreground font-mono text-xs">⌘K</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                run(filtered[active]);
              } else if (e.key === "Escape") {
                close();
              }
            }}
            placeholder="Search pages, projects, actions…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `palette-${filtered[active].id}` : undefined}
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="text-muted-foreground rounded border border-border px-1.5 py-px font-mono text-[10px]">
            esc
          </kbd>
        </div>
        <ul
          ref={listRef}
          id="palette-list"
          role="listbox"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {filtered.length === 0 && (
            <li className="text-muted-foreground px-3 py-6 text-center text-sm">
              No results for “{query}”
            </li>
          )}
          {filtered.map((item, i) => {
            const header = i === 0 || filtered[i - 1].group !== item.group;
            return (
              <li key={item.id}>
                {header && (
                  <p className="text-muted-foreground px-3 pt-2 pb-1 font-mono text-[10px] tracking-wider uppercase">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${i === active ? "bg-surface" : ""}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`size-1.5 rounded-full transition-colors ${i === active ? "bg-accent" : "bg-border"}`}
                    />
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="text-muted-foreground truncate font-mono text-[11px]">
                      {item.hint}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
