import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PricingHighlight } from "@/components/home/PricingHighlight";
import { BeforeAfterHighlight } from "@/components/home/BeforeAfterHighlight";
import { HowItWorks } from "@/components/home/HowItWorks";
import { EquipmentShowcase } from "@/components/home/EquipmentShowcase";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesOverview />
      <PricingHighlight />
      <BeforeAfterHighlight />
      <HowItWorks />
      <EquipmentShowcase />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
    </>
  );
}
