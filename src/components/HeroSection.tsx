import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const HeroSection = () => {
  const { t, lang } = useLang();
  const phrases = [
    t("hero.phrase.1"),
    t("hero.phrase.2"),
    t("hero.phrase.3"),
    t("hero.phrase.4"),
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setCurrentPhrase(0);
  }, [lang]);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - rect.left - 300}px, ${e.clientY - rect.top - 300}px)`;
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(phrase.slice(0, displayText.length + 1));
          if (displayText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(phrase.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase, phrases]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none transition-transform duration-200 ease-out"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          {t("hero.kicker")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
        >
          Ilyas Allali{" "}
          <span className="text-muted-foreground font-light">//</span>{" "}
          <br className="hidden md:block" />
          <span className="text-gradient">{t("hero.role")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 glass rounded-lg px-5 py-3 mb-10 font-mono text-sm"
        >
          <span className="text-primary">❯</span>
          <span className="text-muted-foreground">{displayText}</span>
          <span className="w-[2px] h-5 bg-primary animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/cv-ilyas-allali.pdf"
            download
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity duration-300"
          >
            {t("hero.cv")}
          </a>
          <a
            href="https://wa.me/212608301414"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg glass text-foreground font-medium text-sm hover:border-primary/40 transition-all duration-300"
          >
            {t("hero.talk")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
