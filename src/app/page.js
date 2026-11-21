import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import SubjectsSection from "@/components/SubjectsSection";
import WhyChooseUs from "@/components/WhyChooseUs";



export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <SubjectsSection />
      <HowItWorks />
      <WhyChooseUs />
      <PricingSection />
      <CTASection />
    </div>
  );
}
