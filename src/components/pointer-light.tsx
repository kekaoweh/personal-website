"use client";

import { useEffect } from "react";

// Tracks the pointer over any [data-light] element and exposes its position as
// --mx / --my, which globals.css uses to draw a soft light under the cursor.
export function PointerLight() {
  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-light]");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
