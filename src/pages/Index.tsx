import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoundationSection from "@/components/FoundationSection";
import AILabSection from "@/components/AILabSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <main className="bg-background text-foreground min-h-screen">
    <Navbar />
    <HeroSection />
    <FoundationSection />
    <AILabSection />
    <SkillsSection />
    <ContactSection />
  </main>
);

export default Index;
