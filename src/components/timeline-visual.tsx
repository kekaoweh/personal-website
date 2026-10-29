// An illustrative editing timeline for Picasso: a ruler, a video track of
// clips and title cards, an audio waveform, and a playhead sweeping across.

const CLIPS = [
  { w: 14, kind: "title" },
  { w: 19, kind: "clip" },
  { w: 11, kind: "clip" },
  { w: 22, kind: "accent" },
  { w: 9, kind: "clip" },
  { w: 15, kind: "clip" },
  { w: 10, kind: "title" },
] as const;

function wave(i: number) {
  const x = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 1.7 + 1) * 0.3 + Math.sin(i * 0.13) * 0.2;
  return Math.round((0.25 + Math.abs(x) * 0.75) * 100);
}

export function TimelineVisual({ compact = false }: { compact?: boolean }) {
  const bars = compact ? 64 : 96;
  return (
    <div
      aria-hidden
      className="relative flex flex-col gap-1.5 overflow-hidden rounded-lg border border-border bg-background/60 p-3 font-mono text-[10px]"
    >
      {!compact && (
        <div className="text-muted-foreground flex items-center justify-between pb-1">
          <span>timeline.json</span>
          <span className="flex items-center gap-1.5">
            <span className="bg-accent size-1.5 animate-pulse rounded-full" />
            rendering
          </span>
        </div>
      )}
      {/* Ruler */}
      <div className="flex h-2 items-end justify-between">
        {Array.from({ length: 25 }, (_, i) => (
          <span
            key={i}
            className={`w-px bg-foreground/25 ${i % 4 === 0 ? "h-2" : "h-1"}`}
          />
        ))}
      </div>
      {/* Video track */}
      <div className="flex h-7 gap-0.5">
        {CLIPS.map((c, i) => (
          <span
            key={i}
            style={{ width: `${c.w}%` }}
            className={`rounded-[3px] ${
              c.kind === "accent"
                ? "bg-accent/40"
                : c.kind === "title"
                  ? "border border-dashed border-foreground/25"
                  : "bg-foreground/12"
            }`}
          />
        ))}
      </div>
      {/* Audio track */}
      <div className="flex h-5 items-center gap-px">
        {Array.from({ length: bars }, (_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-foreground/20"
            style={{ height: `${wave(i)}%` }}
          />
        ))}
      </div>
      {/* Playhead */}
      <span className="playhead pointer-events-none absolute inset-y-2 w-px bg-accent">
        <span className="bg-accent absolute -top-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full" />
      </span>
    </div>
  );
}
