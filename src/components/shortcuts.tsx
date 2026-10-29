"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toggleTheme } from "@/lib/prefs";

export function Shortcuts() {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
        return;
      switch (e.key) {
        case "h":
          router.push("/");
          break;
        case "p":
          router.push("/projects");
          break;
        case "r":
          router.push("/resume");
          break;
        case "t":
          toggleTheme();
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
