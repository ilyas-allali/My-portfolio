import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import chatHandler from "./api/chat";

function localChat(mode: string): Plugin {
  return {
    name: "local-gemini-chat",
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), "GEMINI_");
      for (const key of ["GEMINI_API_KEY", "GEMINI_MODEL"]) {
        if (env[key] && !process.env[key]) process.env[key] = env[key];
      }
      server.middlewares.use("/api/chat", async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += Buffer.byteLength(chunk);
            if (size > 100000) {
              res.statusCode = 413;
              res.end("Request too large");
              return;
            }
            chunks.push(Buffer.from(chunk));
          }
          const response = await chatHandler(new Request("http://localhost/api/chat", {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            ...(req.method !== "GET" && req.method !== "HEAD"
              ? { body: Buffer.concat(chunks).toString() } : {}),
          }));
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: "Chat is temporarily unavailable." }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), localChat(mode), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
