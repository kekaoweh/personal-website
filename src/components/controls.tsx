"use client";

import { useSyncExternalStore } from "react";
import { toggleTheme } from "@/lib/prefs";

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

function subscribeMinutes(onChange: () => void) {
  const id = setInterval(onChange, 5000);
  return () => clearInterval(id);
}

export function LocalClock({ timeZone }: { timeZone: string }) {
  // Whole minutes on the client, null on the server (avoids hydration mismatch).
  const minutes = useSyncExternalStore(
    subscribeMinutes,
    () => Math.floor(Date.now() / 60000),
    () => null,
  );

  const time = minutes
    ? new Date(minutes * 60000).toLocaleTimeString("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : "--:--";

  return <span className="tabular-nums">{time}</span>;
}
