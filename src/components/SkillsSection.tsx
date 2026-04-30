import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    items: ["C", "C++", "JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Tools",
    items: ["n8n", "Docker", "Kubernetes", "React", "Vite"],
  },
  {
    category: "Expertise",
    items: ["IoT Automation", "Agentic AI", "Full-Stack Architecture"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
          Technical Terminal
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
          ~/skills
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
          >
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-6">
              {group.category}
            </h3>
            <div className="flex flex-col gap-3">
              {group.items.map((item, ii) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: gi * 0.1 + ii * 0.05 }}
                  className="glass rounded-lg px-4 py-3 text-sm text-foreground hover:border-primary/30 transition-colors duration-300 cursor-default"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
