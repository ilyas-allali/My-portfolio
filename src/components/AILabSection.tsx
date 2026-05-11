import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

const AILabSection = () => {
  const { t, lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const labProjects = [
    {
      name: "Mojib.online",
      url: "https://mojib.online",
      tagline: lang === "fr" ? "Plateforme de réponses IA" : "AI-Powered Answering Platform",
      description:
        lang === "fr"
          ? "Une plateforme intelligente de questions-réponses propulsée par des workflows agentiques pour des réponses instantanées et précises."
          : "An intelligent question-answering platform powered by agentic AI workflows for instant, accurate responses.",
      steps: [
        { label: "Frontend", detail: "Vite · HTML · CSS" },
        { label: lang === "fr" ? "Backend / Automatisation" : "Backend / Automation", detail: "TypeScript · JavaScript" },
        { label: lang === "fr" ? "Intelligence" : "Intelligence", detail: lang === "fr" ? "Agents IA" : "AI Agents" },
      ],
    },
    {
      name: "Mizaniyti.online",
      url: "https://mizaniyti.online",
      tagline: lang === "fr" ? "Gestion budgétaire intelligente" : "Smart Budget Management",
      description:
        lang === "fr"
          ? "Un outil de finance personnelle avec catégorisation intelligente, insights en temps réel et suivi budgétaire automatisé."
          : "A personal finance tool with intelligent categorization, real-time insights, and automated budget tracking.",
      steps: [
        { label: "Frontend", detail: "React · TypeScript" },
        { label: "Backend", detail: lang === "fr" ? "API Full-Stack" : "Full-Stack API" },
        { label: lang === "fr" ? "Intelligence" : "Intelligence", detail: lang === "fr" ? "Catégorisation IA" : "AI Categorization" },
      ],
    },
    {
      name: "Tiboder",
      url: "https://mustafa.matajeralwaha.workers.dev",
      tagline: lang === "fr" ? "Boutique e-commerce" : "E-Commerce Storefront",
      description:
        lang === "fr"
          ? "Une expérience e-commerce rapide, déployée à la périphérie sur Cloudflare Workers — conçue pour la vitesse et la conversion."
          : "A fast, edge-deployed e-commerce experience running on Cloudflare Workers — built for speed and conversion.",
      steps: [
        { label: "Frontend", detail: lang === "fr" ? "Stack Web moderne" : "Modern Web Stack" },
        { label: "Edge", detail: "Cloudflare Workers" },
        { label: "Commerce", detail: lang === "fr" ? "Panier · Paiement" : "Cart · Checkout" },
      ],
    },
    {
      name: "Electro Box",
      url: "https://electro-box-commerce.vercel.app",
      tagline: lang === "fr" ? "E-commerce d'électronique" : "Electronics E-Commerce",
      description:
        lang === "fr"
          ? "Une boutique d'électronique soignée avec un catalogue de produits sélectionnés, déployée sur Vercel avec une navigation fluide."
          : "A polished electronics storefront with curated product catalog, deployed on Vercel with snappy navigation.",
      steps: [
        { label: "Frontend", detail: "React · Vercel" },
        { label: lang === "fr" ? "Catalogue" : "Catalog", detail: lang === "fr" ? "Pages produits" : "Product Pages" },
        { label: "Commerce", detail: lang === "fr" ? "Panier · Paiement" : "Cart · Checkout" },
      ],
    },
  ];

  return (
    <section id="ai-lab" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {t("ailab.kicker")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("ailab.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16">
            {t("ailab.sub")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {labProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{
                rotateX: -2,
                rotateY: 3,
                scale: 1.015,
                transition: { duration: 0.3 },
              }}
              style={{ transformPerspective: 1000 }}
              className="glass-frost rounded-2xl p-8 flex flex-col group relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between mb-6 relative">
                <div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-1 hover:text-primary transition-colors cursor-pointer">
                      {project.name}
                    </h3>
                  </a>
                  <p className="text-sm text-primary">{project.tagline}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {t("ailab.visit")}
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="text-sm text-primary hover:underline underline-offset-4 mb-4 self-start transition-colors"
              >
                {openIndex === i ? t("ailab.hide") : t("ailab.how")}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
                      {project.steps.map((step, si) => (
                        <div key={step.label} className="flex items-center gap-2">
                          <div className="bg-secondary rounded-lg px-3 py-2 text-center">
                            <p className="text-xs text-primary font-mono">{step.label}</p>
                            <p className="text-xs text-muted-foreground">{step.detail}</p>
                          </div>
                          {si < project.steps.length - 1 && (
                            <span className="text-muted-foreground text-xs">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AILabSection;
