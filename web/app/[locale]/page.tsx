import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { MediaSection } from "@/components/landing/MediaSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <AboutSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ProblemSection />
      <SolutionSection />
      <ImpactSection />
      <UseCasesSection />
      <MediaSection />
      <PartnersSection />
      <Footer />
    </main>
  );
}