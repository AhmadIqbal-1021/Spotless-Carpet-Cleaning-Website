import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { business } from "@/lib/business";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & Prices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
        >
          <Image
            src="/images/logo/spotless-carpet-cleaning-logo.png"
            alt={`${business.name} logo`}
            width={613}
            height={393}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="sr-only">{business.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-navy transition-colors hover:text-brand-teal-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton />
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
