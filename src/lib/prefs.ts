// Visitor preferences (theme + accent), stored in localStorage and applied as
// data attributes on <html>. The inline script in layout.tsx applies them
// before first paint to avoid a flash.

export const ACCENTS = ["blue", "red", "amber", "green", "violet"] as const;

// Keyboard shortcuts handled by components/shortcuts.tsx, listed in the footer.
export const SHORTCUTS = [
  { key: "h", label: "home" },
  { key: "p", label: "projects" },
  { key: "r", label: "résumé" },
  { key: "t", label: "theme" },
  { key: "a", label: "accent" },
];

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function cycleAccent() {
  const root = document.documentElement;
  const current = root.dataset.accent ?? "blue";
  const next = ACCENTS[(ACCENTS.indexOf(current as never) + 1) % ACCENTS.length];
  root.dataset.accent = next;
  store("accent", next);
}

export function toggleTheme() {
  const root = document.documentElement;
  const isDark =
    root.dataset.theme === "dark" ||
    (!root.dataset.theme &&
      matchMedia("(prefers-color-scheme: dark)").matches);
  const next = isDark ? "light" : "dark";
  root.dataset.theme = next;
  store("theme", next);
}

export const prefsScript = `try{var d=document.documentElement,t=localStorage.getItem("theme"),a=localStorage.getItem("accent");if(t)d.dataset.theme=t;if(a)d.dataset.accent=a;if(/[?&]static\\b/.test(location.search))d.dataset.motion="off"}catch(e){}`;
