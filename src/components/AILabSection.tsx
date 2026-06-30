import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, Cpu, ExternalLink, ShoppingCart, Wrench } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PREMIUM_EASE } from "@/lib/motion";
import PremiumBentoCard from "@/components/PremiumBentoCard";

const bentoSpans = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

const AILabSection = () => {
  const { t, lang } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const labProjects = [
    {
      name: "Mojib.online",
      url: "https://mojib.online",
      icon: Bot,
      logo: "/logos/mojibpng.png",
      metric: lang === "fr" ? "Agents client" : "Client agents",
      signal: "24/7",
      tagline: lang === "fr" ? "Assistant IA pour entreprises" : "AI Assistant for Businesses",
      description:
        lang === "fr"
          ? "Un assistant IA tout-en-un : prise de rendez-vous pour dentistes, commandes pour restaurants, vente de biens pour l'immobilier — déployé sur le site du client."
          : "An all-in-one AI assistant: books dentist appointments, takes restaurant orders, sells properties for real estate — deployed on the client's website.",
      steps: [
        { label: "Frontend", detail: "Vite · HTML · CSS" },
        { label: lang === "fr" ? "Backend / Automatisation" : "Backend / Automation", detail: "TypeScript · JavaScript" },
        { label: lang === "fr" ? "Cas d'usage" : "Use Cases", detail: lang === "fr" ? "RDV · Commandes · Ventes" : "Bookings · Orders · Sales" },
      ],
    },
    {
      name: "Mizaniyti.online",
      url: "https://mizaniyti.online",
      icon: Cpu,
      logo: "/logos/mizaniyti-logo.png",
      metric: lang === "fr" ? "Budget IA" : "AI budget",
      signal: "+12%",
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
      name: "Ryvo.fr",
      url: "https://ryvo.fr",
      icon: Bot,
      logo: "/logos/ryvo-logo-ClNjGEy4.png",
      metric: "Automation",
      signal: "AI",
      tagline: lang === "fr" ? "Automatisation avancée" : "Advanced Automation",
      description: lang === "fr" ? "Plateforme intelligente pilotée par l'IA et l'automatisation." : "Intelligent platform driven by AI and automation.",
      steps: [
        { label: "Core", detail: "AI Agents" },
        { label: "Ops", detail: "Automation" },
        { label: "Scale", detail: "Global" },
      ],
    },
    {
      name: "Landixo.online",
      url: "https://landixo.online",
      icon: Cpu,
      logo: "/logos/Landixo_logo_abstract_symbol_202605291440-removebg-preview.png",
      metric: "AI",
      signal: "Smart",
      tagline: lang === "fr" ? "Intelligence Artificielle" : "Artificial Intelligence",
      description: lang === "fr" ? "Projet d'intelligence artificielle et pipelines d'automatisation." : "Artificial intelligence project and automation pipelines.",
      steps: [
        { label: "System", detail: "AI Pipelines" },
        { label: "Integration", detail: "Seamless" },
        { label: "Speed", detail: "Fast" },
      ],
    },
    {
      name: "Maanzili",
      url: "https://maanzili.store",
      icon: ShoppingCart,
      logo: "/logos/maanzili.png",
      metric: "E-Commerce",
      signal: "Store",
      tagline: lang === "fr" ? "Boutique en ligne" : "Online Store",
      description: lang === "fr" ? "Plateforme e-commerce moderne et performante." : "Modern and high-performance e-commerce platform.",
      steps: [
        { label: "Frontend", detail: "Modern Web" },
        { label: lang === "fr" ? "Catalogue" : "Catalog", detail: lang === "fr" ? "Produits" : "Products" },
        { label: "Sales", detail: "Optimized" },
      ],
    },
    {
      name: "Electro Box",
      url: "https://electroboxedge.com",
      icon: ShoppingCart,
      logo: null,
      metric: "Commerce",
      signal: "UX",
      tagline: lang === "fr" ? "E-commerce d'électronique" : "Electronics E-Commerce",
      description:
        lang === "fr"
          ? "Une boutique d'électronique soignée avec un catalogue de produits sélectionnés avec une navigation fluide."
          : "A polished electronics storefront with curated product catalog with snappy navigation.",
      steps: [
        { label: "Frontend", detail: "React" },
        { label: lang === "fr" ? "Catalogue" : "Catalog", detail: lang === "fr" ? "Pages produits" : "Product Pages" },
        { label: "Commerce", detail: lang === "fr" ? "Panier · Paiement" : "Cart · Checkout" },
      ],
    },
    {
      name: "Outillage Boustane",
      url: "#",
      icon: Wrench,
      logo: "/logos/outillage-boustane.png",
      metric: "System",
      signal: "Hardware",
      tagline: lang === "fr" ? "Système de vente d'outillage" : "Hardware & Tools System",
      description:
        lang === "fr"
          ? "Une boutique en ligne et système pour l'outillage — perceuses, meuleuses, visseuses et accessoires pros."
          : "An online store and system for tools & hardware — drills, grinders, screwdrivers and pro accessories.",
      steps: [
        { label: "Frontend", detail: lang === "fr" ? "Stack Web moderne" : "Modern Web Stack" },
        { label: "System", detail: "Custom Architecture" },
        { label: lang === "fr" ? "Catalogue" : "Catalog", detail: lang === "fr" ? "Outillage pro" : "Pro Tools" },
      ],
    },
    {
      name: "Neo Motors",
      url: "#",
      icon: Cpu,
      logo: "/logos/neo-motors-logo.png",
      metric: "Enterprise",
      signal: "AI",
      tagline: lang === "fr" ? "Système IA pour l'automobile" : "AI System for Automotive",
      description: lang === "fr" ? "Conception et développement d'un système d'intelligence artificielle sur mesure pour Neo Motors." : "Design and development of a custom artificial intelligence system for Neo Motors.",
      steps: [
        { label: "Domain", detail: "Automotive" },
        { label: "Tech", detail: "Custom AI" },
        { label: "Impact", detail: "Innovation" },
      ],
    },
  ];

  return (
    <section id="ai-lab" className="relative overflow-hidden bg-zinc-50 px-6 py-10 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-zinc-200" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          className="mb-14 md:mb-16"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            {t("ailab.kicker")}
          </p>
          <h2 className="mb-4 max-w-3xl text-3xl font-semibold tracking-[0] text-slate-900 md:text-5xl">
            {t("ailab.title")}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-zinc-500 md:text-base">
            {t("ailab.sub")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:auto-rows-[250px]">
          {labProjects.map((project, index) => {
            const Icon = project.icon;
            const isOpen = openIndex === index;

            return (
              <PremiumBentoCard
                key={project.name}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: PREMIUM_EASE }}
                className={`min-h-[340px] ${bentoSpans[index]}`}
                contentClassName="flex h-full flex-col p-6 md:p-8"
              >
                {/* Watermark Logo */}
                {project.logo && (
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                    <img src={project.logo} alt="" className="w-64 h-64 object-contain filter grayscale" />
                  </div>
                )}

                <div className="mb-6 flex items-start justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    {project.logo ? (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md border border-zinc-100 p-2.5 transition-transform duration-500 group-hover:scale-110">
                        <img src={project.logo} alt={`${project.name} logo`} className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-md border border-primary/10 transition-transform duration-500 group-hover:scale-110">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary font-semibold">{project.metric}</p>
                      <p className="text-xs font-medium text-zinc-500 mt-1">{project.signal}</p>
                    </div>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200 px-3.5 text-xs font-medium text-zinc-500 transition-all duration-300 premium-ease hover:border-primary/40 hover:text-primary hover:bg-primary/5 shadow-sm"
                  >
                    {t("ailab.visit")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>

                <div className="flex-1 relative z-10">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 transition-colors duration-300 premium-ease hover:text-primary md:text-3xl">
                      {project.name}
                    </h3>
                  </a>
                  <p className="mb-5 text-sm font-semibold text-primary">{project.tagline}</p>
                  <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">{project.description}</p>
                </div>

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-600 transition-all duration-300 premium-ease hover:border-zinc-300 hover:bg-zinc-100 relative z-10 shadow-sm"
                  aria-expanded={isOpen}
                >
                  {isOpen ? t("ailab.hide") : t("ailab.how")}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 premium-ease ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: PREMIUM_EASE }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="mt-6 grid gap-3 border-t border-zinc-100 pt-6 sm:grid-cols-3">
                        {project.steps.map((step) => (
                          <div key={step.label} className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3.5 shadow-sm">
                            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{step.label}</p>
                            <p className="mt-1.5 text-xs font-medium leading-5 text-zinc-600">{step.detail}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PremiumBentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AILabSection;
