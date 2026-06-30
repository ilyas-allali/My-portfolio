import { useLayoutEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_EASE } from "@/lib/motion";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const Browser = ({
  url,
  children,
  accent,
}: {
  url: string;
  children: ReactNode;
  accent: string;
}) => (
  <div className="h-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl">
    <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
      <span className="size-2 rounded-sm bg-zinc-300" />
      <span className="size-2 rounded-sm bg-primary/60" />
      <span className="size-2 rounded-sm bg-zinc-200" />
      <div className="min-w-0 flex-1 truncate text-center font-mono text-[10px] text-zinc-500">
        {url}
      </div>
    </div>
    <div
      className="relative h-[320px] p-4 sm:h-[360px] md:h-[420px]"
      style={{ background: `linear-gradient(135deg, ${accent}18, transparent 62%)` }}
    >
      {children}
    </div>
  </div>
);

const StorefrontMockup = ({ lang, accent }: { lang: "en" | "fr"; accent: string }) => (
  <div className="flex h-full flex-col gap-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
          {lang === "fr" ? "Catalogue" : "Catalog"}
        </p>
        <p className="text-lg font-semibold text-zinc-900">Tiboder</p>
      </div>
      <div className="rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs text-zinc-500">
        2 items
      </div>
    </div>
    <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
      {[
        ["899 DH", lang === "fr" ? "Perceuse" : "Drill"],
        ["1 290 DH", lang === "fr" ? "Meuleuse" : "Grinder"],
        ["420 DH", lang === "fr" ? "Visseuse" : "Driver"],
        ["150 DH", lang === "fr" ? "Marteau" : "Hammer"],
        ["2 100 DH", lang === "fr" ? "Scie" : "Circular saw"],
        ["85 DH", lang === "fr" ? "Mètre" : "Tape measure"],
      ].map(([price, name], index) => (
        <div key={name} className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div
            className="mb-3 h-16 rounded-md border border-zinc-200"
            style={{
              background: `linear-gradient(135deg, ${accent}${index % 2 ? "18" : "28"}, rgba(244,244,245,1))`,
            }}
          />
          <p className="truncate text-xs text-zinc-900">{name}</p>
          <p className="mt-auto font-mono text-xs" style={{ color: accent }}>
            {price}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ElectronicsMockup = ({ lang, accent }: { lang: "en" | "fr"; accent: string }) => (
  <div className="grid h-full grid-cols-[0.42fr_1fr] gap-3">
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
        {lang === "fr" ? "Rayons" : "Aisles"}
      </p>
      {[lang === "fr" ? "Téléphones" : "Phones", "Laptops", "Audio", lang === "fr" ? "Montres" : "Watches"].map(
        (item, index) => (
          <div
            key={item}
            className="mb-2 rounded-md px-2 py-2 text-xs"
            style={{
              background: index === 1 ? `${accent}18` : "transparent",
              color: index === 1 ? accent : "rgba(113,113,122,0.8)",
            }}
          >
            {item}
          </div>
        )
      )}
    </div>
    <div className="grid grid-cols-2 gap-3">
      {["MacBook Air", "ThinkPad X1", "Dell XPS 13", "ROG Zephyrus"].map((item, index) => (
        <div key={item} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div
            className="mb-3 h-20 rounded-md border border-zinc-200"
            style={{ background: `linear-gradient(145deg, ${accent}${index % 2 ? "16" : "26"}, rgba(244,244,245,1))` }}
          />
          <p className="truncate text-xs text-zinc-900">{item}</p>
          <div className="mt-3 h-1.5 rounded-sm bg-zinc-200">
            <div className="h-full rounded-sm" style={{ width: `${52 + index * 12}%`, background: accent }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AssistantMockup = ({ lang, accent }: { lang: "en" | "fr"; accent: string }) => (
  <div className="flex h-full flex-col justify-end gap-3 text-sm">
    <div className="mr-auto max-w-[82%] rounded-lg rounded-bl-sm border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700">
      {lang === "fr"
        ? "Bonjour, je peux réserver votre rendez-vous. Quelle date vous arrange ?"
        : "Hi, I can book your appointment. Which date works?"}
    </div>
    <div className="ml-auto max-w-[74%] rounded-lg rounded-br-sm px-4 py-3 text-zinc-900" style={{ background: accent }}>
      {lang === "fr" ? "Vendredi 14h pour un détartrage" : "Friday 2pm for a cleaning"}
    </div>
    <div className="mr-auto rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs" style={{ color: accent }}>
      {lang === "fr" ? "verification calendrier..." : "checking calendar..."}
    </div>
    <div className="mr-auto max-w-[86%] rounded-lg rounded-bl-sm border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-700">
      {lang === "fr" ? "Réservé: Dr. Amrani · Vendredi 14:00" : "Booked: Dr. Amrani · Friday 2:00 PM"}
      <p className="mt-1 font-mono text-[10px]" style={{ color: accent }}>
        {lang === "fr" ? "confirmation SMS envoyée" : "SMS confirmation sent"}
      </p>
    </div>
  </div>
);

const BudgetMockup = ({ lang, accent }: { lang: "en" | "fr"; accent: string }) => (
  <div className="grid h-full grid-cols-2 gap-3">
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-xs text-zinc-500">{lang === "fr" ? "Solde" : "Balance"}</p>
      <p className="mt-2 text-3xl font-semibold text-zinc-900">2 480</p>
      <p className="font-mono text-xs" style={{ color: accent }}>
        +12% {lang === "fr" ? "ce mois" : "this month"}
      </p>
      <div className="mt-8 space-y-3">
        {[72, 44, 61].map((value, index) => (
          <div key={index} className="h-1.5 rounded-sm bg-zinc-200">
            <div className="h-full rounded-sm" style={{ width: `${value}%`, background: accent }} />
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <p className="mb-4 text-xs text-zinc-500">{lang === "fr" ? "Semaine" : "Week"}</p>
      <div className="flex h-[78%] items-end gap-2">
        {[40, 66, 35, 80, 55, 70, 45].map((height, index) => (
          <div key={index} className="flex-1 rounded-t-sm" style={{ height: `${height}%`, background: `${accent}B8` }} />
        ))}
      </div>
    </div>
    <div className="col-span-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-900">Carrefour Maarif</p>
          <p className="font-mono text-[10px]" style={{ color: accent }}>
            {lang === "fr" ? "IA: courses" : "AI: groceries"}
          </p>
        </div>
        <p className="font-mono text-sm" style={{ color: accent }}>
          -148
        </p>
      </div>
    </div>
  </div>
);

const DesignGallery = () => {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const mockups = [
    {
      name: "Tiboder",
      url: "mustafa.matajeralwaha.workers.dev",
      accent: "#D4AF37",
      caption:
        lang === "fr"
          ? "Boutique en ligne d'outillage : perceuses, meuleuses, visseuses et accessoires pros — sur Cloudflare Workers."
          : "Online tools & hardware store: drills, grinders, screwdrivers, and pro accessories — on Cloudflare Workers.",
      preview: <StorefrontMockup lang={lang} accent="#D4AF37" />,
    },
    {
      name: "Electro Box",
      url: "electro-box-commerce.vercel.app",
      accent: "#E2E8F0",
      caption:
        lang === "fr"
          ? "Boutique d'électronique avec sidebar catégories, fiches produits et ajout au panier."
          : "Electronics store with category sidebar, product cards, and add-to-cart actions.",
      preview: <ElectronicsMockup lang={lang} accent="#E2E8F0" />,
    },
    {
      name: "Mojib.online",
      url: "mojib.online",
      accent: "#D4AF37",
      caption:
        lang === "fr"
          ? "Assistant IA déployé sur le site du client : prend les RDV, les commandes, et qualifie les ventes."
          : "AI assistant deployed on the client's site: books appointments, takes orders, and qualifies sales.",
      preview: <AssistantMockup lang={lang} accent="#D4AF37" />,
    },
    {
      name: "Mizaniyti.online",
      url: "mizaniyti.online",
      accent: "#E2E8F0",
      caption:
        lang === "fr"
          ? "Tableau de bord budget : solde, graphique hebdo, et catégorisation automatique par IA."
          : "Budget dashboard: balance, weekly chart, and automatic AI transaction categorization.",
      preview: <BudgetMockup lang={lang} accent="#E2E8F0" />,
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-card]"));
    const media = gsap.matchMedia();
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    media.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 24);

      const scrollTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getDistance() + section.offsetHeight, section.offsetHeight)}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.92, filter: "brightness(0.72)", opacity: 0.76 },
          {
            scale: 1,
            filter: "brightness(1.12)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 70%",
              end: "center center",
              scrub: true,
            },
          }
        );

        gsap.to(card, {
          scale: 0.94,
          filter: "brightness(0.8)",
          opacity: 0.82,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "center center",
            end: "right 30%",
            scrub: true,
          },
        });
      });
    });

    media.add("(max-width: 767px)", () => {
      gsap.set(track, { clearProps: "transform" });
      gsap.set(cards, { clearProps: "transform,filter,opacity" });
    });

    return () => {
      window.clearTimeout(refreshTimer);
      media.revert();
    };
  }, [lang]);

  return (
    <section id="design" ref={sectionRef} className="relative overflow-hidden py-28 md:min-h-screen md:py-20">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
            {t("design.kicker")}
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
            {t("design.title")}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 md:text-base">
            {t("design.sub")}
          </p>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-10">
        <div ref={trackRef} className="flex flex-col gap-6 px-6 md:w-max md:flex-row md:items-stretch">
          {mockups.map((mockup, index) => (
            <a
              key={mockup.name}
              data-gallery-card
              href={`https://${mockup.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full shrink-0 rounded-lg border border-zinc-200 bg-white shadow-sm p-3 transition-colors duration-500 premium-ease hover:border-[#D4AF37]/20 md:w-[min(78vw,760px)] md:p-4"
            >
              <Browser url={mockup.url} accent={mockup.accent}>
                {mockup.preview}
              </Browser>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 text-base font-semibold text-zinc-900">
                    {mockup.name}
                    <ArrowUpRight className="size-4 text-[#D4AF37]" aria-hidden="true" />
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
                    {mockup.caption}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">
                  0{index + 1}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignGallery;
