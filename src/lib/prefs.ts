// Visitor theme preference, stored in localStorage and applied as a data
// attribute on <html>. The inline script in layout.tsx applies it before first
// paint to avoid a flash.

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
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

export const prefsScript = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t)d.dataset.theme=t;localStorage.removeItem("accent");if(/[?&]static\\b/.test(location.search))d.dataset.motion="off"}catch(e){}`;
