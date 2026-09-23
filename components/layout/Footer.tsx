import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { business } from "@/lib/business";
import { serviceCategories } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-brand-navy text-white/90">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit rounded-lg bg-white px-3 py-2 shadow-sm">
            <Image
              src="/images/logo/spotless-carpet-cleaning-logo.png"
              alt={`${business.name} logo`}
              width={613}
              height={393}
              className="h-9 w-auto"
            />
          </div>
          <p className="text-sm text-white/70">{business.shortDescription}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <Link href="/services" className="hover:text-white">
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Service Areas
          </h3>
          <ul className="mt-4 space-y-1 text-sm text-white/70">
            <li>Scotland &amp; England</li>
            <li>{business.serviceAreas.note}</li>
          </ul>
          <Link
            href="/#areas"
            className="mt-2 inline-block text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            See full list
          </Link>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Get in Touch
          </h3>
          <div className="mt-4 flex flex-col items-start gap-3">
            <WhatsAppButton />
            <Link
              href="/contact"
              className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>{" "}
            — final legal wording to be confirmed by the business owner.
          </p>
        </Container>
        <Container className="flex justify-center pb-6 text-xs text-white/50 sm:justify-end sm:pt-0">
          <a
            href="mailto:ahmadiqbal1021412@gmail.com"
            className="hover:text-white/80"
          >
            Designed &amp; Developed by Muhammad Ahmad Iqbal
          </a>
        </Container>
      </div>
    </footer>
  );
}
