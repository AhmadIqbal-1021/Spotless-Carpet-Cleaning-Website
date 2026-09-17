import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy information for ${business.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex max-w-2xl flex-col gap-4">
        <h1 className="text-3xl font-bold text-brand-navy">Privacy Policy</h1>
        <p className="rounded-xl border border-border bg-brand-teal-light/60 p-4 text-sm text-muted-foreground">
          Placeholder — this page is a configuration placeholder. Final,
          legally reviewed privacy policy wording should be supplied by the
          business owner before this site goes live.
        </p>
        <p className="text-sm text-muted-foreground">
          {business.name} collects the information you submit through our
          contact form (such as your name, phone number, postcode and
          enquiry details) solely to respond to your enquiry. We do not sell
          your information to third parties.
        </p>
      </Container>
    </section>
  );
}
