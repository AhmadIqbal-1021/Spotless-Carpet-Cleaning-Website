import { buildWhatsAppLink } from "@/lib/business";

type WhatsAppButtonProps = {
  message?: string;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
  className?: string;
  label?: string;
};

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className="h-5 w-5 shrink-0"
    fill="currentColor"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.29c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.68 8.14-8.16 8.14Zm4.5-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.06s.88 2.39 1 2.56c.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
  </svg>
);

export function WhatsAppButton({
  message,
  variant = "solid",
  size = "md",
  className = "",
  label = "WhatsApp Us",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  const sizeClasses = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp ${sizeClasses}`;
  const solidClasses = "bg-whatsapp text-white hover:bg-whatsapp-dark";
  const outlineClasses =
    "border-2 border-whatsapp text-whatsapp-dark hover:bg-whatsapp/10";

  const classes = `${base} ${variant === "solid" ? solidClasses : outlineClasses} ${className}`;

  if (!href) {
    // WhatsApp number not yet configured — render a disabled-looking
    // placeholder rather than a broken/invented link.
    return (
      <span
        className={`${classes} cursor-not-allowed opacity-60`}
        aria-disabled="true"
        title="WhatsApp number not yet configured"
      >
        <WhatsAppIcon />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={`${label} on WhatsApp (opens in a new tab)`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
