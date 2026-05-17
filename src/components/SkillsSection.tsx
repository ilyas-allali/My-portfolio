import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const langIcons: Record<string, string> = {
  C: "🔩", "C++": "⚙️", JavaScript: "🟨", TypeScript: "🔷", Python: "🐍",
};
const toolIcons: Record<string, string> = {
  n8n: "🔗", Docker: "🐳", Kubernetes: "☸️", React: "⚛️", Vite: "⚡",
};

const SkillsSection = () => {
  const { t, lang } = useLang();

  const what = [
    {
      icon: "🤖",
      title: t("skills.build.ai"),
      desc: t("skills.build.ai.sub"),
      color: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/30",
      glow: "group-hover:shadow-[0_0_30px_-4px_rgba(168,85,247,0.4)]",
    },
    {
      icon: "🛒",
      title: t("skills.build.ecom"),
      desc: t("skills.build.ecom.sub"),
      color: "from-primary/20 to-primary/5",
      border: "border-primary/30",
      glow: "group-hover:shadow-[0_0_30px_-4px_hsl(var(--gold-glow)/0.5)]",
    },
    {
      icon: "⚡",
      title: t("skills.build.automation"),
      desc: t("skills.build.automation.sub"),
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/30",
      glow: "group-hover:shadow-[0_0_30px_-4px_rgba(59,130,246,0.4)]",
    },
  ];

  const expertise =
    lang === "fr"
      ? ["Automatisation IoT", "IA Agentique", "Architecture Full-Stack", "E-Commerce", "API & Webhooks"]
      : ["IoT Automation", "Agentic AI", "Full-Stack Architecture", "E-Commerce", "APIs & Webhooks"];

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {t("skills.kicker")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl">{t("skills.sub")}</p>
        </motion.div>

        {/* Languages + Tools side by side */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="glass-frost rounded-2xl p-6"
          >
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-5">
              {t("skills.languages")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(langIcons).map(([lang, icon], i) => (
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 cursor-default hover:border-primary/40 transition-all duration-300 hover:glow-sm"
                >
                  <span className="text-lg leading-none">{icon}</span>
                  <span className="text-sm font-medium text-foreground">{lang}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-frost rounded-2xl p-6"
          >
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-5">
              {t("skills.tools")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(toolIcons).map(([tool, icon], i) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 cursor-default hover:border-primary/40 transition-all duration-300 hover:glow-sm"
                >
                  <span className="text-lg leading-none">{icon}</span>
                  <span className="text-sm font-medium text-foreground">{tool}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expertise pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-frost rounded-2xl p-6 mb-16"
        >
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-5">
            {t("skills.expertise")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {expertise.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/25 font-medium"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* What I can build */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8"
        >
          {t("skills.can_build")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {what.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.13 }}
              whileHover={{ y: -4 }}
              className={`group glass-frost rounded-2xl p-6 border ${item.border} bg-gradient-to-br ${item.color} transition-all duration-300 ${item.glow}`}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
