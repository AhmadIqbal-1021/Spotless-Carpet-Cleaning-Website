import type { ServiceCategory } from "@/lib/services";
import { formatGBP } from "@/lib/services";

export function PricingTable({ category }: { category: ServiceCategory }) {
  return (
    <div
      id={category.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <h3 className="text-xl font-bold text-brand-navy">{category.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {category.description}
      </p>

      <ul className="mt-6 divide-y divide-border">
        {category.services.map((service) => (
          <li
            key={service.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="text-sm font-medium text-foreground sm:text-base">
              {service.name}
            </span>
            <span className="whitespace-nowrap text-base font-bold text-brand-teal-dark sm:text-lg">
              {formatGBP(service.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
