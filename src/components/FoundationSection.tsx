import { motion } from "framer-motion";

const projects = [
  {
    title: "Minishell",
    lang: "C",
    description:
      "Writing a shell from scratch. Deep dive into processes, file descriptors, and signal handling.",
    tags: ["Processes", "Signals", "Parsing"],
  },
  {
    title: "Inception",
    lang: "DevOps",
    description:
      "System administration with Docker & Kubernetes. Orchestrating a full infrastructure with Nginx, MariaDB, and WordPress in isolated containers.",
    tags: ["Docker", "Kubernetes", "Nginx"],
  },
  {
    title: "IRC Server",
    lang: "C++",
    description:
      "Building a multi-client server using C++98, handling non-blocking I/O and networking protocols.",
    tags: ["Sockets", "Non-blocking I/O", "RFC"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const FoundationSection = () => (
  <section id="foundation" className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
          The 42 Foundation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Engineering From First Principles
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          No teachers. No classes. Peer-to-peer learning at 1337 — where every line of code is earned.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{
              rotateX: -2,
              rotateY: 3,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            style={{ transformPerspective: 800 }}
            className="glass rounded-2xl p-6 group cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono tracking-wider text-primary uppercase">
                {project.lang}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FoundationSection;
