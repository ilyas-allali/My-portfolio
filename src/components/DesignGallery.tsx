import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";

const Browser = ({
  url,
  children,
  accent,
}: {
  url: string;
  children: React.ReactNode;
  accent: string;
}) => (
  <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl glass-frost w-full">
    <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 border-b border-white/5">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
      <div className="flex-1 text-[10px] text-muted-foreground font-mono truncate text-center">
        {url}
      </div>
    </div>
    <div
      className="p-4 h-[240px] relative"
      style={{ background: `linear-gradient(135deg, ${accent}14, transparent 60%)` }}
    >
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

// Tiboder — tools & hardware e-commerce. Show drills, grinders, etc.
const TiboderMockup = ({ lang }: { lang: "en" | "fr" }) => (
  <div className="flex flex-col gap-2 h-full">
    <div className="flex items-center justify-between text-[10px] text-foreground/80 mb-1">
      <span className="font-bold text-primary">TIBODER</span>
      <span className="text-muted-foreground">{lang === "fr" ? "Outillage pro" : "Pro Tools"}</span>
      <span className="flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-full text-primary">
        🛒 {lang === "fr" ? "Panier · 2" : "Cart · 2"}
      </span>
    </div>
    <div className="grid grid-cols-3 gap-2 flex-1">
      {[
        { p: "899 DH", n: lang === "fr" ? "Perceuse" : "Drill", e: "🔩" },
        { p: "1 290 DH", n: lang === "fr" ? "Meuleuse" : "Grinder", e: "⚙️" },
        { p: "420 DH", n: lang === "fr" ? "Visseuse" : "Screwdriver", e: "🪛" },
        { p: "150 DH", n: lang === "fr" ? "Marteau" : "Hammer", e: "🔨" },
        { p: "2 100 DH", n: lang === "fr" ? "Scie circulaire" : "Circular saw", e: "🪚" },
        { p: "85 DH", n: lang === "fr" ? "Mètre ruban" : "Tape measure", e: "📏" },
      ].map((item, i) => (
        <div key={i} className="bg-secondary/70 rounded-lg p-2 flex flex-col">
          <div className="bg-primary/15 rounded h-10 mb-1 flex items-center justify-center text-lg">
            {item.e}
          </div>
          <p className="text-[9px] text-foreground truncate">{item.n}</p>
          <p className="text-[10px] text-primary font-mono">{item.p}</p>
        </div>
      ))}
    </div>
  </div>
);

// Electro Box — electronics store with categories sidebar.
const ElectroBoxMockup = ({ lang }: { lang: "en" | "fr" }) => (
  <div className="flex gap-2 h-full">
    <div className="w-24 bg-secondary/70 rounded-lg p-2 flex flex-col gap-1 text-[9px] text-muted-foreground">
      <p className="text-blue-300 font-bold mb-1">{lang === "fr" ? "Catégories" : "Categories"}</p>
      <p className="hover:text-foreground">📱 {lang === "fr" ? "Téléphones" : "Phones"}</p>
      <p className="text-foreground bg-blue-400/10 rounded px-1">💻 {lang === "fr" ? "Laptops" : "Laptops"}</p>
      <p>🎧 Audio</p>
      <p>⌚ {lang === "fr" ? "Montres" : "Watches"}</p>
      <p>📷 {lang === "fr" ? "Caméras" : "Cameras"}</p>
    </div>
    <div className="flex-1 grid grid-cols-2 gap-2">
      {[
        { p: "$999", n: "MacBook Air" },
        { p: "$1299", n: "ThinkPad X1" },
        { p: "$849", n: "Dell XPS 13" },
        { p: "$1599", n: "ROG Zephyrus" },
      ].map((item, i) => (
        <div key={i} className="bg-secondary/70 rounded-lg p-2 flex flex-col">
          <div className="bg-blue-400/20 rounded h-8 mb-1 flex items-center justify-center text-[9px] text-blue-300">
            💻
          </div>
          <p className="text-[9px] text-foreground truncate">{item.n}</p>
          <div className="flex justify-between items-center mt-1">
            <p className="text-[10px] text-blue-300 font-mono">{item.p}</p>
            <span className="text-[8px] text-blue-300 bg-blue-400/15 px-1 rounded">{lang === "fr" ? "+ panier" : "+ cart"}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Mojib — AI assistant: bookings, orders, sales for businesses.
const MojibMockup = ({ lang }: { lang: "en" | "fr" }) => (
  <div className="flex flex-col gap-1.5 h-full text-[10px]">
    <div className="flex items-center justify-between text-foreground mb-1">
      <span className="font-bold text-purple-300">MOJIB</span>
      <span className="flex gap-1">
        <span className="px-1.5 py-0.5 rounded bg-purple-400/15 text-purple-300 text-[8px]">🦷 {lang === "fr" ? "Dentiste" : "Dentist"}</span>
        <span className="px-1.5 py-0.5 rounded bg-purple-400/10 text-muted-foreground text-[8px]">🍕 {lang === "fr" ? "Resto" : "Resto"}</span>
        <span className="px-1.5 py-0.5 rounded bg-purple-400/10 text-muted-foreground text-[8px]">🏠 {lang === "fr" ? "Immo" : "Real"}</span>
      </span>
    </div>
    <div className="bg-secondary/70 rounded-2xl rounded-bl-sm px-3 py-1.5 self-start max-w-[85%] text-foreground">
      {lang === "fr"
        ? "Bonjour 👋 je peux vous réserver un rendez-vous, quelle date ?"
        : "Hi 👋 I can book your appointment — what date works?"}
    </div>
    <div className="bg-purple-400/15 rounded-2xl rounded-br-sm px-3 py-1.5 self-end max-w-[75%] text-foreground">
      {lang === "fr" ? "Vendredi 14h pour un détartrage" : "Friday 2pm for a cleaning"}
    </div>
    <div className="bg-secondary/70 rounded-lg px-2 py-1 self-start text-[9px] text-purple-300 font-mono flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      {lang === "fr" ? "Vérification du calendrier..." : "Checking calendar..."}
    </div>
    <div className="bg-secondary/70 rounded-2xl rounded-bl-sm px-3 py-1.5 self-start max-w-[90%] text-foreground">
      <p>{lang === "fr" ? "✅ Réservé — Dr. Amrani · Vendredi 14:00" : "✅ Booked — Dr. Amrani · Friday 2:00 PM"}</p>
      <p className="text-[8px] text-purple-300 mt-0.5">{lang === "fr" ? "Confirmation envoyée par SMS" : "Confirmation sent by SMS"}</p>
    </div>
  </div>
);

// Mizaniyti — budget dashboard. Show balance + chart + AI category tags.
const MizaniytiMockup = ({ lang }: { lang: "en" | "fr" }) => (
  <div className="grid grid-cols-2 gap-2 h-full text-[10px]">
    <div className="bg-secondary/70 rounded-lg p-2 flex flex-col">
      <p className="text-muted-foreground">{lang === "fr" ? "Solde" : "Balance"}</p>
      <p className="text-lg font-bold text-green-300 leading-tight">2 480 MAD</p>
      <p className="text-[9px] text-green-400">+12% {lang === "fr" ? "ce mois" : "this month"}</p>
      <div className="mt-2 space-y-1">
        <div className="flex justify-between"><span className="text-muted-foreground">{lang === "fr" ? "Courses" : "Groceries"}</span><span className="text-foreground">820</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Transport</span><span className="text-foreground">340</span></div>
      </div>
    </div>
    <div className="bg-secondary/70 rounded-lg p-2 flex flex-col">
      <p className="text-muted-foreground mb-1">{lang === "fr" ? "Cette semaine" : "This week"}</p>
      <div className="flex items-end gap-1 flex-1">
        {[40, 65, 35, 80, 55, 70, 45].map((h, i) => (
          <div key={i} className="flex-1 bg-green-400/60 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
    <div className="col-span-2 bg-secondary/70 rounded-lg p-2 flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-green-400/20 flex items-center justify-center">🛒</div>
      <div className="flex-1">
        <p className="text-foreground text-[10px]">{lang === "fr" ? "Carrefour Maarif" : "Carrefour Maarif"}</p>
        <span className="text-[8px] bg-green-400/15 text-green-300 px-1.5 py-0.5 rounded">
          {lang === "fr" ? "IA: Courses" : "AI: Groceries"}
        </span>
      </div>
      <p className="text-green-300 font-mono">-148</p>
    </div>
  </div>
);

const DesignGallery = () => {
  const { t, lang } = useLang();

  const mockups = [
    {
      name: "Tiboder",
      url: "mustafa.matajeralwaha.workers.dev",
      accent: "#E8B14A",
      caption:
        lang === "fr"
          ? "Boutique en ligne d'outillage : perceuses, meuleuses, visseuses et accessoires pros — sur Cloudflare Workers."
          : "Online tools & hardware store: drills, grinders, screwdrivers, and pro accessories — on Cloudflare Workers.",
      preview: <TiboderMockup lang={lang} />,
    },
    {
      name: "Electro Box",
      url: "electro-box-commerce.vercel.app",
      accent: "#60A5FA",
      caption:
        lang === "fr"
          ? "Boutique d'électronique avec sidebar catégories, fiches produits et ajout au panier."
          : "Electronics store with category sidebar, product cards, and add-to-cart actions.",
      preview: <ElectroBoxMockup lang={lang} />,
    },
    {
      name: "Mojib.online",
      url: "mojib.online",
      accent: "#A78BFA",
      caption:
        lang === "fr"
          ? "Assistant IA déployé sur le site du client : prend les RDV (dentistes), les commandes (restos), vend des biens (immobilier)."
          : "AI assistant deployed on the client's site: books appointments (dentists), takes orders (restaurants), sells properties (real estate).",
      preview: <MojibMockup lang={lang} />,
    },
    {
      name: "Mizaniyti.online",
      url: "mizaniyti.online",
      accent: "#34D399",
      caption:
        lang === "fr"
          ? "Tableau de bord budget : solde, graphique hebdo, et catégorisation automatique par IA."
          : "Budget dashboard: balance, weekly chart, and automatic AI transaction categorization.",
      preview: <MizaniytiMockup lang={lang} />,
    },
  ];

  return (
    <section id="design" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">
            {t("design.kicker")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("design.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16">
            {t("design.sub")}
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
              className="block group"
            >
              <TiltCard>
                <Browser url={m.url} accent={m.accent}>
                  {m.preview}
                </Browser>
                <div className="mt-4 text-center">
                  <p className="text-sm">
                    <span className="text-foreground font-medium">{m.name}</span>
                    <span className="mx-2 opacity-40">·</span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      {m.url} ↗
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto leading-relaxed">
                    {m.caption}
                  </p>
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;
