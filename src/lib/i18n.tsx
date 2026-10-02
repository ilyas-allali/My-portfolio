import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "fr";

type Dict = Record<string, { en: string; fr: string }>;

const dict: Dict = {
  // Navbar
  "nav.foundation": { en: "Foundation", fr: "Fondation" },
  "nav.ai_lab": { en: "AI Lab", fr: "Labo IA" },
  "nav.design": { en: "Design", fr: "Design" },
  "nav.skills": { en: "Skills", fr: "Compétences" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.cta": { en: "Let's Talk", fr: "Discutons" },

  // Hero
  "hero.kicker": { en: "1337 (42 Network) · UM6P", fr: "1337 (Réseau 42) · UM6P" },
  "hero.role": { en: "AI Architect", fr: "Architecte IA" },
  "hero.cv": { en: "Download CV", fr: "Télécharger CV" },
  "hero.talk": { en: "Let's Talk →", fr: "Discutons →" },
  "hero.phrase.1": { en: "Building Agents...", fr: "Création d'agents..." },
  "hero.phrase.2": { en: "Kernel Hacking...", fr: "Hacking du noyau..." },
  "hero.phrase.3": { en: "Scaling Startups...", fr: "Scaler des startups..." },
  "hero.phrase.4": { en: "Shipping E-Commerce...", fr: "Lancer du E-Commerce..." },

  // Foundation
  "foundation.kicker": { en: "The 42 Foundation", fr: "La Fondation 42" },
  "foundation.title": { en: "Engineering From First Principles", fr: "L'ingénierie depuis la base" },
  "foundation.sub": {
    en: "No teachers. No classes. Peer-to-peer learning at 1337 — where every line of code is earned.",
    fr: "Pas de profs. Pas de cours. Apprentissage entre pairs à 1337 — chaque ligne de code se mérite.",
  },

  // AI Lab
  "ailab.kicker": { en: "AI & Startup Lab", fr: "Labo IA & Startup" },
  "ailab.title": { en: "From Prototype to Production", fr: "Du prototype à la production" },
  "ailab.sub": {
    en: "Live products built with agentic AI, modern stacks, and real users. Click any title to open the live site.",
    fr: "Des produits en ligne, construits avec de l'IA agentique, des stacks modernes et de vrais utilisateurs. Cliquez sur un titre pour ouvrir le site.",
  },
  "ailab.how": { en: "How it Works →", fr: "Comment ça marche →" },
  "ailab.hide": { en: "Hide Details", fr: "Masquer les détails" },
  "ailab.visit": { en: "Visit ↗", fr: "Visiter ↗" },

  // Design Gallery
  "design.kicker": { en: "Design Gallery", fr: "Galerie Design" },
  "design.title": { en: "What I Built — In 3D", fr: "Ce que j'ai construit — en 3D" },
  "design.sub": {
    en: "Scroll through a horizontal product track. Each mockup illustrates what the product actually does.",
    fr: "Faites défiler une piste produit horizontale. Chaque maquette illustre ce que fait vraiment le produit.",
  },

  // Skills
  "skills.kicker": { en: "Technical Stack", fr: "Stack Technique" },
  "skills.title": { en: "What I Build With", fr: "Ce avec quoi je construis" },
  "skills.sub": {
    en: "From low-level C to agentic AI — a full range of tools I've used in production.",
    fr: "Du C bas niveau à l'IA agentique — une palette complète d'outils utilisés en production.",
  },
  "skills.languages": { en: "Languages", fr: "Langages" },
  "skills.tools": { en: "Tools & DevOps", fr: "Outils & DevOps" },
  "skills.expertise": { en: "Expertise", fr: "Expertise" },
  "skills.can_build": { en: "What I can build for you", fr: "Ce que je peux construire pour vous" },
  "skills.build.ai": { en: "AI Agents & Chatbots", fr: "Agents IA & Chatbots" },
  "skills.build.ai.sub": {
    en: "Autonomous agents, agentic workflows, chatbots deployed on your website.",
    fr: "Agents autonomes, workflows agentiques, chatbots déployés sur votre site.",
  },
  "skills.build.ecom": { en: "E-Commerce Stores", fr: "Boutiques E-Commerce" },
  "skills.build.ecom.sub": {
    en: "Full storefronts with product catalog, cart, checkout — fast and conversion-ready.",
    fr: "Boutiques complètes : catalogue, panier, paiement — rapides et optimisées pour la conversion.",
  },
  "skills.build.automation": { en: "Automation Pipelines", fr: "Pipelines d'automatisation" },
  "skills.build.automation.sub": {
    en: "n8n workflows, backend automation with TypeScript & Python.",
    fr: "Workflows n8n, automatisation backend avec TypeScript & Python.",
  },

  "github.view": { en: "View my repositories", fr: "Voir mes dépôts" },

  // Contact
  "contact.title.a": { en: "Got a project?", fr: "Un projet en tête ?" },
  "contact.title.b": { en: "Let's build it.", fr: "On le construit ensemble." },
  "contact.sub": {
    en: "Whether it's an AI agent, an e-commerce store, or a full automation — I'm in.",
    fr: "Que ce soit un agent IA, une boutique e-commerce ou une automatisation complète — je suis partant.",
  },
  "contact.wa": { en: "Message on WhatsApp", fr: "Message sur WhatsApp" },
  "contact.wa.sub": { en: "Fastest way to reach me", fr: "Le moyen le plus rapide" },
  "contact.email": { en: "Send an email", fr: "Envoyer un email" },
  "contact.email.sub": { en: "For longer discussions", fr: "Pour les discussions plus longues" },
  "contact.available": { en: "Available for freelance & collab", fr: "Disponible en freelance & collab" },
  "contact.copyright": {
    en: "© 2026 Ilyas Allali. Built with precision.",
    fr: "© 2026 Ilyas Allali. Conçu avec précision.",
  },
  "contact.cv": { en: "Download CV ↓", fr: "Télécharger CV ↓" },
  "contact.language": { en: "Language", fr: "Langue" },

  // Chatbot
  "bot.title": { en: "Mini Ilyas", fr: "Mini Ilyas" },
  "bot.subtitle": { en: "Ask me about my work", fr: "Posez-moi des questions sur mon travail" },
  "bot.placeholder": { en: "Ask about my projects…", fr: "Une question sur mes projets…" },
  "bot.send": { en: "Send", fr: "Envoyer" },
  "bot.greeting": {
    en: "hey, i'm mini ilyas — what u want to know about me?",
    fr: "salut, je suis mini ilyas — qu'est-ce que tu veux savoir sur moi ?",
  },
  "bot.callout": {
    en: "👋 Talk to mini Ilyas — ask me anything about my work",
    fr: "👋 Parle à mini Ilyas — demande-moi tout sur mon travail",
  },
  "bot.error.network": {
    en: "Network hiccup — try again in a moment.",
    fr: "Souci réseau — réessayez dans un instant.",
  },
  "bot.error.brain": {
    en: "Hmm, I couldn't reach my brain. Try again in a sec.",
    fr: "Hmm, je n'arrive pas à joindre mon cerveau. Réessayez.",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof dict) => string };

const LangContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("lang");
    if (stored === "en" || stored === "fr") return stored;
    return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
