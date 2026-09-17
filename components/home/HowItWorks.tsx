import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    number: "1",
    title: "Get in Touch",
    description:
      "Contact us via WhatsApp, phone, or our online quote form to tell us what you need cleaned.",
  },
  {
    number: "2",
    title: "Tell Us What Needs Cleaning",
    description:
      "Let us know your rooms, sofas or mattresses, plus your postcode and preferred timing.",
  },
  {
    number: "3",
    title: "Receive Your Quote",
    description:
      "We'll confirm pricing based on our published rates and the minimum call-out.",
  },
  {
    number: "4",
    title: "Get Your Cleaning Service",
    description:
      "Our team carries out the cleaning using professional carpet and upholstery equipment.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Simple, Straightforward Booking"
          />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal text-lg font-bold text-white">
                {step.number}
              </span>
              <h3 className="text-base font-semibold text-brand-navy">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
