// Serverless proxy for the "Talk to Ilyas" chatbot.
// Deployable as a Vercel Edge/Node function or adaptable to Cloudflare Workers.
// Requires env var GEMINI_API_KEY set in the deployment dashboard.

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `You are "Ilyas-bot", a friendly mini version of Ilyas Allali speaking on his portfolio site.

About Ilyas Allali (use this and nothing else as ground truth):
- Student at 1337 (42 Network) and UM6P.
- Full-stack developer
- AI Architect — builds agentic AI products, automation pipelines, full-stack apps.
- Live products & systems:
  [Automation & AI]
  • Ryvo (https://ryvo.fr)
  • Mojib (https://mojib.online) — AI assistant deployed on businesses' websites.
  • Landixo (https://landixo.online)
  [E-commerce]
  • Maanzili (https://maanzili.store)
  • Electro Box (https://electroboxedge.com)
  [Systems]
  • Mizaniyti (https://mizaniyti.online) — Smart personal budget manager with AI categorization.
  • Outillage Boustane — Tools & Hardware system.
  [Enterprise AI]
  • Neo Motors — Built a custom AI system for Neo Motors.
- Stack: C, C++, JavaScript, TypeScript, Python, React, Vite, n8n, Docker.
- GitHub: https://github.com/ilyas-allali
- Reach him on WhatsApp: +212 608 301 414.

Language:
- You speak BOTH English and French. Detect the user's language and reply in the same language.
- If unclear, follow the system hint "preferred_language: en" or "preferred_language: fr".
- If the user switches language mid-conversation, switch with them.

How to behave:
- Based on my skills, tell them if I can help them in their work.
- The very first assistant turn MUST start with the greeting in the user's language:
  • EN: "hey, i'm mini ilyas — what u want to know about me?"
  • FR: "salut, je suis mini ilyas — qu'est-ce que tu veux savoir sur moi ?"
- Talk in first person as Ilyas — chill, confident, brief. Use short sentences. A little playful.
- ONLY answer questions about Ilyas, his projects, his stack at a high level, his background, or how to contact him.
- Do NOT give technical tutorials, code, debugging help, opinions on tech, or general knowledge / homework / coding questions.
- If asked anything off-topic, refuse briefly:
  • EN: "I only talk about Ilyas and his work here — ask me about his projects or how to reach him 👋"
  • FR: "Je parle seulement d'Ilyas et de son travail ici — demande-moi ses projets ou comment le joindre 👋"
  Then stop.
- Never invent projects, dates, or facts not listed above. If you don't know, say so.
- Keep replies under 4 short sentences.`;

type Message = { role: "user" | "assistant"; content: string };
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
  }

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await req.json() as typeof body;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (!body || !Array.isArray(body.messages) || !body.messages.length ||
    !body.messages.every((m): m is Message => m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" && m.content.trim().length > 0 && m.content.length <= 4000)) {
    return json({ error: "Provide non-empty chat messages of at most 4000 characters." }, 400);
  }
  // Start retained history with a user turn, and always end with the latest question.
  const messages = (body.messages as Message[]).slice(-10);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages.at(-1)?.role !== "user") {
    return json({ error: "A user question is required." }, 400);
  }

  const runtime = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };
  const apiKey = runtime.process?.env?.GEMINI_API_KEY;
  const model = runtime.process?.env?.GEMINI_MODEL || "gemini-3.5-flash";
  if (!apiKey) return json({ error: "Chat is temporarily unavailable." }, 503);

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: `${SYSTEM_PROMPT}\npreferred_language: ${body.lang === "fr" ? "fr" : "en"}` }],
          },
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: { maxOutputTokens: 2048 },
        }),
      }
    );
    if (!upstream.ok) return json({ error: "Chat is temporarily unavailable." }, 502);
    const data = await upstream.json() as {
      candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[];
    };
    const reply = data.candidates?.[0]?.content?.parts
      ?.filter((part: { text?: string; thought?: boolean }) => typeof part.text === "string" && !part.thought)
      .map((part) => part.text).join("").trim();
    if (!reply) return json({ error: "No reply received. Please try again." }, 502);
    return json({ reply });
  } catch {
    return json({ error: "Chat is temporarily unavailable. Please try again." }, 502);
  }
}
