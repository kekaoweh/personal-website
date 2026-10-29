"use client";

import { useEffect, useState } from "react";

const EVENT = "site:toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export async function copyEmail(email: string) {
  try {
    await navigator.clipboard.writeText(email);
    toast("Email copied to clipboard");
  } catch {
    window.location.href = `mailto:${email}`;
  }
}

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function onToast(e: Event) {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2200);
    }
    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print pointer-events-none fixed inset-x-0 top-6 z-[70] flex justify-center"
    >
      <div
        className={`bg-foreground text-background flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs shadow-lg transition-all duration-300 ${message ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
      >
        <span className="bg-accent size-1.5 rounded-full" />
        {message}
      </div>
    </div>
  );
}
