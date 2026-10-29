"use client";

import { useSyncExternalStore } from "react";
import { cycleAccent, toggleTheme } from "@/lib/prefs";

export function AccentButton() {
  return (
    <button
      type="button"
      onClick={cycleAccent}
      title="Change accent (a)"
      aria-label="Change accent color"
      className="group relative grid size-6 place-items-center rounded-md hover:bg-surface"
    >
      <span className="bg-accent size-2.75 rounded-[3px] transition-transform duration-300 group-hover:rotate-45 group-active:scale-75" />
    </button>
  );
}

export function ThemeButton() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme (t)"
      aria-label="Toggle light and dark theme"
      className="grid size-6 place-items-center rounded-md hover:bg-surface"
    >
      <span className="relative size-3 overflow-hidden rounded-full border border-current">
        <span className="absolute inset-y-0 right-0 w-1/2 bg-current" />
      </span>
    </button>
  );
}

function subscribeSeconds(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

export function LocalClock({ timeZone }: { timeZone: string }) {
  // Whole seconds on the client, null on the server (avoids hydration mismatch).
  const seconds = useSyncExternalStore(
    subscribeSeconds,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );

  const time = seconds
    ? new Date(seconds * 1000).toLocaleTimeString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  return <span className="tabular-nums">{time}</span>;
}
