import { buildTelLink, business } from "@/lib/business";

type PhoneButtonProps = {
  variant?: "solid" | "outline";
  size?: "md" | "lg";
  className?: string;
};

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className="h-5 w-5 shrink-0"
    fill="currentColor"
  >
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);

export function PhoneButton({
  variant = "outline",
  size = "md",
  className = "",
}: PhoneButtonProps) {
  const href = buildTelLink();
  const sizeClasses = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${sizeClasses}`;
  const solidClasses = "bg-brand-navy text-white hover:bg-brand-navy-dark";
  const outlineClasses =
    "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy/5";

  const classes = `${base} ${variant === "solid" ? solidClasses : outlineClasses} ${className}`;

  if (!href) {
    return (
      <span
        className={`${classes} cursor-not-allowed opacity-60`}
        aria-disabled="true"
        title="Phone number not yet configured"
      >
        <PhoneIcon />
        Call Us
      </span>
    );
  }

  return (
    <a href={href} className={classes}>
      <PhoneIcon />
      Call {business.phone.number}
    </a>
  );
}
