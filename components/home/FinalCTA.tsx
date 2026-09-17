import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { PhoneButton } from "@/components/shared/PhoneButton";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxSection } from "@/components/motion/ParallaxSection";

export function FinalCTA() {
  return (
    <ParallaxSection
      image="/images/service/carpet-cleaning-dramatic-contrast.jpg"
      overlayClassName="bg-gradient-to-b from-brand-teal-dark/75 via-brand-teal/55 to-brand-teal-dark/75"
      className="bg-brand-teal py-16 sm:py-20"
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <h2 className="max-w-xl text-3xl font-bold text-white sm:text-4xl">
            Ready for a Fresher, Cleaner Home?
          </h2>
          <p className="max-w-lg text-white/90">
            Get a quote today and see why a professional clean makes the
            difference.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-teal-dark shadow-lg transition-colors hover:bg-white/90"
              >
                Get a Quote
              </Link>
            </MagneticButton>
            <MagneticButton>
              <WhatsAppButton size="lg" />
            </MagneticButton>
            <PhoneButton
              size="lg"
              className="border-white! text-white! hover:bg-white/10!"
            />
          </div>
        </Reveal>
      </Container>
    </ParallaxSection>
  );
}
