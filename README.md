# Ilyas Allali — Portfolio

Run `npm ci`, copy `.env.example` to `.env.local`, set `GEMINI_API_KEY`, then run
`npm run dev`. The local Vite server serves `/api/chat` using the same handler as
production. Restart the server after changing environment variables.

The chatbot uses the [Gemini REST API](https://ai.google.dev/api) with
`gemini-3.5-flash` by default. Set `GEMINI_MODEL` to override it. Create a key in
[Google AI Studio](https://aistudio.google.com/apikey). Keep it server-side; never
prefix it with `VITE_` or commit it.

For deployment on Vercel, use the Vite preset (`npm run build`, output `dist`) and
set `GEMINI_API_KEY` in the project's environment variables. `api/chat.ts` runs as
an Edge function. Static-only hosting and `npm run preview` do not run the API.

Both Download CV links import `Ilyas_Allali_CV_DaiL_Projects.pdf` from the project
root, so Vite includes the supplied file in the production build. Replace that
file to update the CV. GitHub links point to https://github.com/ilyas-allali.

Checks: `npm test`, `npm run build`, and `npm run lint`.
