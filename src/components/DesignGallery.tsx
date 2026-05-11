import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Mockup = {
  name: string;
  url: string;
  accent: string;
  kind: "store" | "store" | "agent" | "budget";
  preview: JSX.Element;
};

const Browser = ({ url, children, accent }: { url: string; children: React.ReactNode; accent: string }) => (
  <div className="rounded-xl overflow-hidden border border-border/60 shadow-2xl bg-card w-full">
    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/80 border-b border-border/40">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
      <div className="flex-1 text-[10px] text-muted-foreground font-mono truncate text-center">
        {url}
      </div>
    </div>
    <div className="p-4 h-[200px] relative" style={{ background: `linear-gradient(135deg, ${accent}10, transparent 60%)` }}>
      {children}
    </div>
  </div>
);

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-50, 50], [10, -10]);
  const rotateY = useTransform(sx, [-50, 50], [-12, 12]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const mockups: Mockup[] = [
  {
    name: "Matajer Alwaha",
    url: "mustafa.matajeralwaha.workers.dev",
    accent: "#E8B14A",
    kind: "store",
    preview: (
      <div className="grid grid-cols-3 gap-2 h-full">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-secondary/60 rounded-lg p-2 flex flex-col gap-1">
            <div className="bg-primary/20 rounded h-12" />
            <div className="bg-muted/60 h-1.5 rounded w-3/4" />
            <div className="bg-primary/40 h-1.5 rounded w-1/2" />
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Electro Box",
    url: "electro-box-commerce.vercel.app",
    accent: "#60A5FA",
    kind: "store",
    preview: (
      <div className="flex gap-2 h-full">
        <div className="w-24 bg-secondary/60 rounded-lg p-2 flex flex-col gap-1">
          <div className="bg-blue-400/30 h-2 rounded" />
          <div className="bg-muted/60 h-1.5 rounded w-3/4" />
          <div className="bg-muted/60 h-1.5 rounded w-1/2" />
          <div className="bg-muted/60 h-1.5 rounded w-2/3" />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-secondary/60 rounded-lg p-2">
              <div className="bg-blue-400/20 rounded h-10 mb-1" />
              <div className="bg-muted/60 h-1.5 rounded w-3/4 mb-1" />
              <div className="bg-blue-400/40 h-1.5 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Mojib.online",
    url: "mojib.online",
    accent: "#A78BFA",
    kind: "agent",
    preview: (
      <div className="flex flex-col gap-2 h-full">
        <div className="bg-secondary/60 rounded-lg px-3 py-2">
          <div className="bg-muted/60 h-1.5 rounded w-2/3" />
        </div>
        <div className="bg-purple-400/15 rounded-lg px-3 py-2 self-end max-w-[70%]">
          <div className="bg-purple-400/40 h-1.5 rounded w-20 mb-1" />
          <div className="bg-purple-400/30 h-1.5 rounded w-16" />
        </div>
        <div className="bg-secondary/60 rounded-lg px-3 py-2 max-w-[80%]">
          <div className="bg-muted/60 h-1.5 rounded w-32 mb-1" />
          <div className="bg-muted/60 h-1.5 rounded w-24 mb-1" />
          <div className="bg-muted/60 h-1.5 rounded w-28" />
        </div>
        <div className="mt-auto bg-secondary/40 rounded-full h-7 flex items-center px-3">
          <div className="bg-muted/40 h-1.5 rounded w-1/2" />
        </div>
      </div>
    ),
  },
  {
    name: "Mizaniyti.online",
    url: "mizaniyti.online",
    accent: "#34D399",
    kind: "budget",
    preview: (
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="bg-secondary/60 rounded-lg p-2 flex flex-col gap-1">
          <div className="bg-muted/60 h-1.5 rounded w-1/2" />
          <div className="bg-green-400/40 h-6 rounded w-full mt-1" />
          <div className="bg-muted/60 h-1.5 rounded w-2/3" />
          <div className="bg-muted/60 h-1.5 rounded w-1/2" />
        </div>
        <div className="bg-secondary/60 rounded-lg p-2 flex flex-col justify-end gap-1">
          <div className="flex items-end gap-1 h-20">
            {[40, 60, 35, 80, 55, 70, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-green-400/50 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2 bg-secondary/60 rounded-lg p-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-400/30" />
          <div className="flex-1">
            <div className="bg-muted/60 h-1.5 rounded w-2/3 mb-1" />
            <div className="bg-muted/60 h-1.5 rounded w-1/3" />
          </div>
          <div className="bg-green-400/50 h-1.5 rounded w-10" />
        </div>
      </div>
    ),
  },
];

const DesignGallery = () => (
  <section id="design" className="py-32 px-6 relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
          Design Gallery
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          UI Mockups in 3D
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16">
          Move your cursor over a card — interfaces I've shipped, tilted in space.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        {mockups.map((m, i) => (
          <motion.a
            key={m.name}
            href={`https://${m.url}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="block"
          >
            <TiltCard>
              <Browser url={m.url} accent={m.accent}>
                {m.preview}
              </Browser>
              <p className="mt-4 text-sm text-center text-muted-foreground group-hover:text-primary">
                <span className="text-foreground font-medium">{m.name}</span>
                <span className="mx-2 opacity-40">·</span>
                <span className="text-xs">{m.url} ↗</span>
              </p>
            </TiltCard>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default DesignGallery;
