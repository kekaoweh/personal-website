"use client";

import { useEffect } from "react";

export function PrintButton() {
  // /resume?print (from the command menu) opens the print dialog on arrival.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("print")) return;
    const id = setTimeout(() => window.print(), 400);
    return () => clearTimeout(id);
  }, []);

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
