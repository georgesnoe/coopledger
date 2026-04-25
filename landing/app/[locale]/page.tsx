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
    <main className="relative min-h-screen bg-background font-sans">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[420px] w-[420px] rounded-full bg-[#7cc6fe]/20 blur-3xl" />
        <div className="absolute top-[35%] -right-20 h-[360px] w-[360px] rounded-full bg-blue-300/20 blur-3xl" />
      </div>
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
