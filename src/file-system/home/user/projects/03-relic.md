



## *Relic*
## 2026

### • Next.js 14, TypeScript
### • Express, MongoDB, Stripe
A Coursera-shaped learning platform, built solo across both ends of the stack.

The frontend is Next.js 14 App Router with CSS Modules and design tokens: a course grid, auto-scrolling carousels, dark mode with glassmorphism, cart and Stripe checkout, reviews and ratings, and a role-gated admin dashboard with live stats.

The piece I liked building most was the course player. It wraps YouTube with its own controls, keyboard shortcuts and a Next Lesson auto-advance, and reports completion back to the API so progress survives a refresh.

Backend is Express and MongoDB Atlas with JWT auth and bcrypt, deployed on Vercel. Seeded with 6 courses and 174 lessons, including a 134-lesson ML course, with the section and lesson sidebar driven entirely from the API.

https://relic-black.vercel.app
