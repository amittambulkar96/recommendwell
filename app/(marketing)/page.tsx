import HeroSection from "@/components/hero-section-one";
import FeaturesSection from "@/components/features-seven";
import PricingSection from "@/components/pricing-section-one";
import FAQs from "@/components/faqs";
import CallToActionSection from "@/components/call-to-action-three";
import FooterSection from "@/components/footer-two";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQs />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
}
