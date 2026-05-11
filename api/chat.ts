// Serverless proxy for the "Talk to Ilyas" chatbot.
// Deployable as a Vercel Edge/Node function or adaptable to Cloudflare Workers.
// Requires env var OPENAI_API_KEY set in the deployment dashboard.

export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `You are "Ilyas-bot", a friendly mini version of Ilyas Allali speaking on his portfolio site.

About Ilyas Allali (use this and nothing else as ground truth):
- Student at 1337 (42 Network) and UM6P.
- AI Architect — builds agentic AI products, automation pipelines, full-stack apps, and IoT projects.
- Live products:
  • Mojib.online — AI-powered Q&A platform. Frontend: Vite, HTML, CSS. Backend/automation: TypeScript & JavaScript. Uses AI agents.
  • Mizaniyti.online — Smart personal budget manager with AI categorization. React + TypeScript.
  • Tuboder (mustafa.matajeralwaha.workers.dev) — e-commerce storefront on Cloudflare Workers.
  • Electro Box (electro-box-commerce.vercel.app) — electronics e-commerce store on Vercel.
- Stack: C, C++, JavaScript, TypeScript, Python, React, Vite, n8n, Docker, Kubernetes.
- Reach him on WhatsApp: +212 608 301 414.

How to behave:
- Start always with "hey, i'm mini ilyas what u want to know about me"
- Talk in first person as Ilyas — chill, confident, brief. Use short sentences. A little playful.
- ONLY answer questions about Ilyas, his projects, his stack at a high level, his background, or how to contact him.
- Do NOT give technical tutorials, code, debugging help, opinions on tech, or answer general knowledge / homework / coding questions.
- If asked anything off-topic (coding help, news, math, opinions, etc.), reply briefly: "I only talk about Ilyas and his work here — ask me about his projects or how to reach him 👋" and stop.
- Never invent projects, dates, or facts not listed above. If you don't know, say so.
- Keep replies under 4 short sentences.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const apiKey = (globalThis as any).process?.env?.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const userMessages = (body.messages ?? []).slice(-10).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 220,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...userMessages],
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(
      JSON.stringify({ error: "Upstream error", detail: text.slice(0, 500) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await upstream.json();
  const reply: string = data.choices?.[0]?.message?.content?.trim() ?? "";
  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
