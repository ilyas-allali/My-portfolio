import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLang();

  const navLinks = [
    { label: t("nav.ai_lab"), href: "#ai-lab" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-slate-900">
          IA<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="glass inline-flex items-center rounded-full p-0.5 text-xs">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "en"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
              aria-pressed={lang === "en"}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "fr"
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
              aria-pressed={lang === "fr"}
              aria-label="Passer au français"
            >
              FR
            </button>
          </div>
          <a
            href="https://wa.me/212608301414"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-sm px-4 py-2 rounded-lg bg-[#D4AF37] text-zinc-900 hover:bg-[#E7C85C] font-semibold transition-all duration-300 shadow-sm"
          >
            {t("nav.cta")}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
