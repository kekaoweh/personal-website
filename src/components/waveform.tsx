"use client";

import { useState } from "react";
import { activity } from "@/content/site";

// Deterministic per-index jitter so server and client render identically.
function jitter(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Round style values so server and client serialize them identically.
const r3 = (n: number) => Math.round(n * 1000) / 1000;

const SIGMA = 36; // px radius of the cursor's influence
const maxWeight = Math.max(...activity.map((a) => a.weight));

export function Waveform() {
  const [pointer, setPointer] = useState<number | null>(null);
  const [width, setWidth] = useState(1);
  const [focused, setFocused] = useState<number | null>(null);

  const step = width / activity.length;
  const hovered =
    focused ??
    (pointer === null
      ? null
      : Math.min(activity.length - 1, Math.max(0, Math.floor(pointer / step))));

  return (
    <div className="relative pt-12 pb-2">
      <div
        className="flex h-14 items-center justify-between"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setWidth(rect.width);
          setPointer(e.clientX - rect.left);
        }}
        onPointerLeave={() => setPointer(null)}
      >
        {activity.map((a, i) => {
          const center = (i + 0.5) * step;
          const d = pointer === null ? Infinity : pointer - center;
          const near = Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
          const active = pointer !== null || focused !== null;
          const isHovered = hovered === i;
          const base = 0.4 + (a.weight / maxWeight) * 0.6;
          return (
            <button
              key={a.date}
              type="button"
              aria-label={`${a.date}: ${a.label}`}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused(null)}
              className="flex h-full items-center rounded-full px-px focus-visible:outline-none"
            >
              <span
                className="flex items-center"
                style={{ height: `${Math.round(base * 100)}%` }}
              >
                <span
                  className={`block h-full w-0.5 origin-center rounded-full lg:w-0.75 ${active ? "" : "breathe"}`}
                  style={{
                    animationDelay: `${Math.round((i * 90 + jitter(i) * 400) % 2400)}ms`,
                    transform: active
                      ? `scaleY(${isHovered ? 1 : r3(0.35 + near * 0.6)})`
                      : undefined,
                    transition:
                      "transform 0.25s cubic-bezier(0.22,1,0.36,1), background-color 0.2s, opacity 0.2s",
                    backgroundColor:
                      isHovered || a.weight === maxWeight
                        ? "var(--accent)"
                        : "var(--foreground)",
                    opacity: isHovered
                      ? 1
                      : r3(0.18 + near * 0.5 + jitter(i + 7) * 0.12),
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <div className="text-muted-foreground mt-2 flex justify-between font-mono text-[11px]">
        <span>{activity[0].date}</span>
        <span>{activity[activity.length - 1].date}</span>
      </div>
      {hovered !== null && (
        <div
          role="tooltip"
          className="pointer-events-none absolute top-0 flex -translate-x-1/2 gap-2 rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] whitespace-nowrap shadow-sm"
          style={{
            left: `clamp(110px, ${((hovered + 0.5) / activity.length) * 100}%, calc(100% - 110px))`,
          }}
        >
          <span className="text-muted-foreground">{activity[hovered].date}</span>
          <span>{activity[hovered].label}</span>
        </div>
      )}
    </div>
  );
}
