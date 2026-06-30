import { motion } from "framer-motion";
import { Bot, Braces, Code2, Cpu, Network, ShoppingCart, Wrench, Zap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PREMIUM_EASE } from "@/lib/motion";
import PremiumBentoCard from "@/components/PremiumBentoCard";

const languages = [
  { name: "C", token: "C", icon: Braces },
  { name: "C++", token: "C++", icon: Braces },
  { name: "JavaScript", token: "JS", icon: Code2 },
  { name: "TypeScript", token: "TS", icon: Code2 },
  { name: "Python", token: "PY", icon: Cpu },
];

const tools = [
  { name: "n8n", token: "N8", icon: Network },
  { name: "Docker", token: "DK", icon: Wrench },
  { name: "Kubernetes", token: "K8", icon: Network },
  { name: "React", token: "RX", icon: Code2 },
  { name: "Vite", token: "VT", icon: Zap },
];

const SkillsSection = () => {
  const { t, lang } = useLang();

  const what = [
    {
      icon: Bot,
      title: t("skills.build.ai"),
      desc: t("skills.build.ai.sub"),
      metric: lang === "fr" ? "Agents" : "Agents",
    },
    {
      icon: ShoppingCart,
      title: t("skills.build.ecom"),
      desc: t("skills.build.ecom.sub"),
      metric: "Commerce",
    },
    {
      icon: Zap,
      title: t("skills.build.automation"),
      desc: t("skills.build.automation.sub"),
      metric: lang === "fr" ? "Pipelines" : "Pipelines",
    },
  ];

  const expertise =
    lang === "fr"
      ? ["Automatisation IoT", "IA Agentique", "Architecture Full-Stack", "E-Commerce", "API & Webhooks"]
      : ["IoT Automation", "Agentic AI", "Full-Stack Architecture", "E-Commerce", "APIs & Webhooks"];

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-10 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px gold-hairline opacity-45" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          className="mb-14 md:mb-16"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            {t("skills.kicker")}
          </p>
          <h2 className="mb-4 max-w-3xl text-3xl font-semibold tracking-[0] text-slate-900 md:text-5xl">
            {t("skills.title")}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-zinc-500 md:text-base">{t("skills.sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[174px]">
          <PremiumBentoCard
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: PREMIUM_EASE }}
            className="min-h-[330px] md:col-span-3 md:row-span-2"
            contentClassName="flex h-full flex-col p-6 md:p-7"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  {t("skills.languages")}
                </p>
                <h3 className="text-2xl font-semibold tracking-[0] text-slate-900">
                  {lang === "fr" ? "Base systeme" : "System base"}
                </h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
              {languages.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.05, ease: PREMIUM_EASE }}
                    whileHover={{ y: -3 }}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 transition-colors duration-300 premium-ease hover:border-primary/25"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-primary">{item.token}</span>
                      <Icon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </PremiumBentoCard>

          <PremiumBentoCard
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: PREMIUM_EASE }}
            className="min-h-[210px] md:col-span-3"
            contentClassName="flex h-full flex-col p-6 md:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  {t("skills.tools")}
                </p>
                <h3 className="text-xl font-semibold tracking-[0] text-slate-900">
                  {lang === "fr" ? "Execution & livraison" : "Execution and delivery"}
                </h3>
              </div>
              <Wrench className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tools.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.span
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: PREMIUM_EASE }}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-slate-900 transition-colors duration-300 premium-ease hover:border-primary/25"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="font-mono text-[11px] text-primary">{item.token}</span>
                    {item.name}
                  </motion.span>
                );
              })}
            </div>
          </PremiumBentoCard>

          <PremiumBentoCard
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.14, ease: PREMIUM_EASE }}
            className="min-h-[210px] md:col-span-3"
            contentClassName="flex h-full flex-col p-6 md:p-7"
          >
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              {t("skills.expertise")}
            </p>
            <div className="flex flex-1 flex-wrap content-start gap-2.5">
              {expertise.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: index * 0.05, ease: PREMIUM_EASE }}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-primary/15 bg-primary/[0.055] px-3 py-2 text-sm font-medium text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </PremiumBentoCard>

        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          className="mb-5 mt-10 text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          {t("skills.can_build")}
        </motion.p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {what.map((item, index) => {
            const Icon = item.icon;

            return (
              <PremiumBentoCard
                key={item.title}
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: PREMIUM_EASE }}
                className="min-h-[250px]"
                contentClassName="flex h-full flex-col p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/70">{item.metric}</span>
                </div>
                <h4 className="mb-3 text-lg font-semibold tracking-[0] text-slate-900">{item.title}</h4>
                <p className="text-sm leading-7 text-zinc-500">{item.desc}</p>
              </PremiumBentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
