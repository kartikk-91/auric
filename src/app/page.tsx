'use client';
import AboutSection from "@/components/landing/about-section";
import ComparisonSection from "@/components/landing/comparison-section";
import FeaturesSection from "@/components/landing/features-section";
import FooterSection from "@/components/landing/footer-section";
import HeroSection from "@/components/landing/hero-section";
import Navbar from "@/components/landing/navbar";
import PricingSection from "@/components/landing/pricing-section";


export default function Home() {
  return (
    <div className="w-full h-fit bg-[#F4F2F1]">
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <PricingSection/>
      <AboutSection/>
      <ComparisonSection/>
      <FooterSection/>
    </div>
  );
}
