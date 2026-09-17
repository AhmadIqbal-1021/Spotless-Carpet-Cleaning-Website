import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxSection } from "@/components/motion/ParallaxSection";
import { business } from "@/lib/business";

export function ServiceAreas() {
  return (
    <ParallaxSection
      id="areas"
      image="/images/carpet/clean-hallway-carpet.jpg"
      overlayClassName="bg-brand-navy/60"
      className="scroll-mt-20 bg-brand-navy py-16 text-white sm:py-24"
    >
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="Where We Work"
            title="Areas We Cover"
            description="Serving customers across selected areas of Scotland and England, including surrounding areas."
          />
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 text-lg font-semibold text-white">Scotland</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
              {business.serviceAreas.scotland.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mb-4 text-lg font-semibold text-white">England</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
              {business.serviceAreas.england.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className="text-sm text-white/70">
          Don&apos;t see your town listed? We also cover{" "}
          {business.serviceAreas.note} — get in touch to check availability
          in your area.
        </p>
      </Container>
    </ParallaxSection>
  );
}
