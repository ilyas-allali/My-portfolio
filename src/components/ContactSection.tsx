import { motion } from "framer-motion";

const ContactSection = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Ready to Automate{" "}
          <span className="text-gradient">your Business?</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-md mx-auto">
          Let's build something exceptional together.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
      >
        <a
          href="https://wa.me/212608301414"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-xl px-6 py-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300 glow-sm"
        >
          <span className="text-primary text-lg">💬</span>
          <div className="text-left">
            <p className="text-xs text-muted-foreground">WhatsApp</p>
            <p className="text-sm font-medium text-foreground">+212 608 301 414</p>
          </div>
        </a>
        <a
          href="mailto:allaliilyas4@gmail.com"
          className="glass rounded-xl px-6 py-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300 glow-sm"
        >
          <span className="text-primary text-lg">✉️</span>
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium text-foreground">allaliilyas4@gmail.com</p>
          </div>
        </a>
      </motion.div>

      {/* Footer */}
      <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2026 Ilyas Allali. Built with precision.
        </p>
        <a
          href="/cv-ilyas-allali.pdf"
          download
          className="text-xs text-primary hover:underline underline-offset-4"
        >
          Download CV ↓
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
