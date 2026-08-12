



## *NutriAtlas*
## 2026

### • Next.js 15, Tailwind
### • Recharts, MapLibre, Docker
An interactive nutrition dashboard. Log meals, get a health score, watch trends in Recharts widgets, and find healthy spots around Bhopal on a MapLibre map served from OpenFreeMap tiles.

It is a front-end heavy build: an animated dashboard shell with Framer Motion, shadcn-style primitives, dark and light themes via next-themes, and a layout that holds together down to a 320px viewport.

Being straight about it, the data lives in localStorage. There is no backend and no model behind the health score, it is a scoring function I wrote. The point of the project was the UI and the deployment path.

That path was the fun part: a multi-stage Docker build on Next.js standalone output, pushed through Artifact Registry and Cloud Build to GCP Cloud Run in asia-south1. It now also runs on Vercel.

https://nutriatlas-five.vercel.app
