import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const ContactSection = () => {
  const { t, lang, setLang } = useLang();

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t("contact.available")}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            {t("contact.title.a")}{" "}
            <span className="text-gradient">{t("contact.title.b")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            {t("contact.sub")}
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-2 gap-5 mb-8"
        >
          {/* WhatsApp */}
          <a
            href="https://wa.me/212608301414"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-frost rounded-2xl p-6 flex items-center gap-5 hover:border-green-500/40 transition-all duration-300 hover:shadow-[0_0_30px_-6px_rgba(74,222,128,0.35)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center text-2xl shrink-0 group-hover:bg-green-500/25 transition-colors duration-300">
              💬
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
              <p className="text-base font-semibold text-foreground">{t("contact.wa")}</p>
              <p className="text-xs text-green-400 mt-1">{t("contact.wa.sub")}</p>
              <p className="text-sm font-mono text-muted-foreground mt-1">+212 608 301 414</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:allaliilyas4@gmail.com"
            className="group glass-frost rounded-2xl p-6 flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:glow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/25 transition-colors duration-300">
              ✉️
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Email</p>
              <p className="text-base font-semibold text-foreground">{t("contact.email")}</p>
              <p className="text-xs text-primary mt-1">{t("contact.email.sub")}</p>
              <p className="text-sm font-mono text-muted-foreground mt-1">allaliilyas4@gmail.com</p>
            </div>
          </a>
        </motion.div>

        {/* CV banner */}
        <motion.a
          href="/cv-ilyas-allali.pdf"
          download
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group flex items-center justify-between glass-frost rounded-2xl px-6 py-4 hover:border-primary/40 transition-all duration-300 hover:glow-sm mb-16"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{t("contact.cv")}</p>
            <p className="text-xs text-muted-foreground">Ilyas Allali · CV 2026</p>
          </div>
          <span className="text-2xl group-hover:translate-y-1 transition-transform duration-300">⬇️</span>
        </motion.a>

        {/* Footer */}
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t("contact.copyright")}</p>
          <div
            role="group"
            aria-label={t("contact.language")}
            className="glass inline-flex items-center rounded-full p-0.5 text-xs"
          >
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fr")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                lang === "fr"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={lang === "fr"}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
