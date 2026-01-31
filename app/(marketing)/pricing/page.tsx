import { Badge } from "@/components/ui/badge";
import PricingSection from "@/components/pricing-section-one";
import FAQs from "@/components/faqs";
import CallToActionSection from "@/components/call-to-action-three";

export const metadata = {
  title: "Pricing | RecommendWell",
  description:
    "Simple lifetime pricing for recommendation letters. One payment for full access to templates, tone presets, and exports.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="pt-24">
        <div className="mx-auto w-full max-w-7xl px-6 pb-6">
          <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
            Pricing
          </Badge>
          <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">
            Lifetime access, one simple price
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl">
            Pay once and keep every draft, template, and export for as long as you
            need to write recommendation letters.
          </p>
        </div>
      </section>
      <PricingSection />
      <FAQs />
      <CallToActionSection />
    </div>
  );
}
