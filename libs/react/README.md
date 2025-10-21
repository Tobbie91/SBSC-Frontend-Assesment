
---

## Optional: create the short feature doc for PDF/Google Doc

```bash
cat > docs/feature.md <<'MD'
# Innovative Feature: Angular ↔ React Interop in an Nx Monorepo

## Objective
Integrate Angular and React in a single Nx workspace using Web Components and Angular Elements, with consistent styling and realtime interactions.

## What was built
- Angular hosts the app and renders a React Web Component `<react-collab-widget>`.
- React dispatches `taskSelected` events; Angular listens and reacts.
- React also renders an Angular custom element `<ng-insights-widget>` via a thin React wrapper (proves two-way interop).
- Tailwind CSS for consistent styling.
- Realtime UX via BroadcastChannel + localStorage (swap-ready for Firebase).

## Key Challenges & Solutions
1. **JSX typing for unknown custom elements** → wrap with a tiny React component (avoids `JSX.IntrinsicElements` errors).
2. **TS/Angular config quirks** → JSX enabled + lib includes adjusted to `../libs/...`.
3. **Angular unknown element** → `CUSTOM_ELEMENTS_SCHEMA` in the standalone component decorator.
4. **`react-to-webcomponent` options** → use `{ shadow: 'open' }`.

## How to Run
```bash
pnpm i
pnpm nx serve ng-host

# SBSC Innovative Feature — Angular ↔ React Interop (Nx Monorepo)

**Live Demo (Vercel):** [https://sbsc-frontend-task.vercel.app/](https://sbsc-frontend-task.vercel.app/)  
**GitHub Repository:** [https://github.com/Tobbie91/SBSC-Frontend-Assesment](https://github.com/Tobbie91/SBSC-Frontend-Assesment)  
**Documentation (Google Doc):** [View Here](https://docs.google.com/document/d/1LZCr8nv_D4zO6JJ4r-3Wo01dGzv2db6QwRKPpGRTgks/edit?usp=sharing)
