import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoundationSection from "@/components/FoundationSection";
import AILabSection from "@/components/AILabSection";
import DesignGallery from "@/components/DesignGallery";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => (
  <main className="bg-background text-foreground min-h-screen">
    <Navbar />
    <HeroSection />
    <FoundationSection />
    <AILabSection />
    <DesignGallery />
    <SkillsSection />
    <ContactSection />
    <ChatbotWidget />
  </main>
);

export default Index;
