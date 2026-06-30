import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AILabSection from "@/components/AILabSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => (
  <main className="bg-background text-foreground min-h-screen">
    <Navbar />
    <HeroSection />
    <AILabSection />
    <SkillsSection />
    <ContactSection />
    <ChatbotWidget />
  </main>
);

export default Index;
