"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/business";

const DISMISS_KEY = "spotless-floating-whatsapp-dismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function FloatingWhatsApp() {
  const [dismissed, setDismissed] = useState(readDismissed);
  const href = buildWhatsAppLink();

  if (!href || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore storage errors (e.g. private browsing) — dismissal is
      // a per-session convenience, not critical state.
    }
  };

  return (
    <div
      className="fixed right-4 z-30 flex items-center gap-1 md:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp (opens in a new tab)"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp-dark"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          className="h-7 w-7"
          fill="currentColor"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.29c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.14-8.16 8.14Z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide WhatsApp button"
        className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy/80 text-xs text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
      >
        &times;
      </button>
    </div>
  );
}
