# Silicon Studio
Frontend hub (Vite + vanilla JS, no runtime dependencies) with a searchable directory and an internal guide page for each of 10 independent tools. All project data lives in `src/data.js`.

## Run
`npm install` · `npm run dev` · `npm run build` (also runs `scripts/check.mjs`) · `npm run preview`

## Deploy (Vercel)
Import the repo; framework preset Vite, build `npm run build`, output `dist`. `vercel.json` rewrites unknown paths to `index.html` so `/tools/<id>` works on refresh.

## Navigation
Internal links use the History API. Open Tool and View Source Code are plain `<a href>` links, same tab, so Back returns to the guide.

## Verification status
Guide text comes from each tool's build spec, not from inspecting the live apps or repos. Each guide says so. Before launch, check each tool and correct `src/data.js`. Not done: browser testing, Lighthouse, live URL checks.
