import PageEffects from "@/features/page-effects/PageEffects";
import HeroSection from "@/features/hero/HeroSection";
import TickerSection from "@/features/ticker/TickerSection";
import SolutionsSection from "@/features/solutions/SolutionsSection";
import ProductsSection from "@/features/products/ProductsSection";
import WhySection from "@/features/why/WhySection";
import PartnersSection from "@/features/partners/PartnersSection";
import InfraSection from "@/features/infrastructure/InfraSection";
import PricingSection from "@/features/pricing/PricingSection";
import DcStatsSection from "@/features/dc-stats/DcStatsSection";
import TestimonialsSection from "@/features/testimonials/TestimonialsSection";
import FaqSection from "@/features/faq/FaqSection";
import CtaSection from "@/features/cta/CtaSection";

export const metadata = {
  title: "Solutions — NeoCloudz GPU Cloud",
  description:
    "End-to-end GPU cloud solutions for AI training, inference, and research compute.",
};

export default function SolutionsPage() {
  return (
    <PageEffects>
      <HeroSection />
      <TickerSection />
      <SolutionsSection />
      <ProductsSection />
      <WhySection />
      <PartnersSection />
      <InfraSection />
      <PricingSection />
      <DcStatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </PageEffects>
  );
}
