export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** Use "light" on dark or photo backgrounds so text stays legible. */
  tone?: "dark" | "light";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const eyebrowColor = tone === "light" ? "text-white/80" : "text-brand-teal-dark";
  const titleColor = tone === "light" ? "text-white" : "text-brand-navy";
  const descriptionColor = tone === "light" ? "text-white/85" : "text-muted-foreground";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className={`text-sm font-semibold uppercase tracking-wide ${eyebrowColor}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base sm:text-lg ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
