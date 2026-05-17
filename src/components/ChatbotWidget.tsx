import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

const ChatbotWidget = () => {
  const { t, lang } = useLang();
  const greeting: Msg = { role: "assistant", content: t("bot.greeting") };

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Refresh greeting if user switches language before chatting
  useEffect(() => {
    setMessages((m) => {
      if (m.length === 1 && m[0].role === "assistant") {
        return [{ role: "assistant", content: t("bot.greeting") }];
      }
      return m;
    });
  }, [lang, t]);

  // Show the shiny callout shortly after page load (only if not opened)
  useEffect(() => {
    const timer = setTimeout(() => setShowCallout(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) setShowCallout(false);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((_, i) => i !== 0), // drop the local greeting
          lang,
        }),
      });
      const data = await res.json();
      const reply = data.reply ?? t("bot.error.brain");
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t("bot.error.network") }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <>
      {/* Shiny callout next to the button */}
      <AnimatePresence>
        {showCallout && !open && (
          <motion.button
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setOpen(true)}
            className="fixed bottom-9 right-24 z-50 max-w-[16rem] text-left float-pulse"
            aria-label={t("bot.callout")}
          >
            <span className="relative inline-block glass-strong rounded-full px-4 py-2 text-xs text-foreground border border-primary/40 shadow-lg overflow-hidden">
              <span className="relative z-10">{t("bot.callout")}</span>
              <span className="absolute inset-0 shimmer opacity-60 pointer-events-none" />
            </span>
            {/* Pointer triangle toward the bubble button */}
            <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-card/60 border-r border-t border-primary/40" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center font-bold text-xl ${open ? "glow-md" : "glow-pulse"}`}
        aria-label="Chat with Mini Ilyas"
      >
        {open ? "×" : "💬"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[28rem] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                I
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t("bot.title")}</p>
                <p className="text-xs text-muted-foreground">{t("bot.subtitle")}</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl px-3 py-2 text-sm text-muted-foreground">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "240ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/40 p-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={t("bot.placeholder")}
                className="flex-1 bg-secondary/60 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40"
              >
                {t("bot.send")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
