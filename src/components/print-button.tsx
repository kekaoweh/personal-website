"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print bg-foreground text-background w-fit rounded-full px-4 py-1.5 font-mono text-xs transition-opacity hover:opacity-80"
    >
      Download PDF ↓
    </button>
  );
}
