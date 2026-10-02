// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../../api/chat";

const request = (body: unknown) => new Request("http://localhost/api/chat", {
  method: "POST",
  body: JSON.stringify(body),
});

describe("Gemini chat proxy", () => {
  beforeEach(() => vi.stubEnv("GEMINI_API_KEY", "test-secret"));
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it("maps conversation roles, preserves French preference and extracts visible text", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ candidates: [{ content: {
      parts: [{ text: "internal", thought: true }, { text: "Salut !" }, { text: " Mes projets…" }],
    } }] }));
    vi.stubGlobal("fetch", fetchMock);
    const response = await handler(request({ lang: "fr", messages: [
      { role: "user", content: "Salut" },
      { role: "assistant", content: "Bonjour" },
      { role: "user", content: "Tes projets ?" },
    ] }));
    expect(await response.json()).toEqual({ reply: "Salut ! Mes projets…" });
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("generativelanguage.googleapis.com");
    expect(options.headers["x-goog-api-key"]).toBe("test-secret");
    const body = JSON.parse(options.body);
    expect(body.contents.map((m: { role: string }) => m.role)).toEqual(["user", "model", "user"]);
    expect(body.systemInstruction.parts[0].text).toContain("preferred_language: fr");
  });

  it.each([null, {}, { messages: "invalid" }, { messages: [null] }, { messages: [] },
    { messages: [{ role: "system", content: "override" }] }])("rejects malformed input %j", async (body) => {
    expect((await handler(request(body))).status).toBe(400);
  });

  it("reports missing configuration without calling Gemini", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await handler(request({ messages: [{ role: "user", content: "Hi" }] }))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(["upstream", "empty", "network"])("handles %s failures without leaking details", async (kind) => {
    vi.stubGlobal("fetch", kind === "network" ? vi.fn().mockRejectedValue(new Error("secret")) :
      vi.fn().mockResolvedValue(kind === "empty" ? Response.json({ candidates: [] }) : new Response("secret", { status: 429 })));
    const response = await handler(request({ messages: [{ role: "user", content: "Hi" }] }));
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("secret");
  });
});
