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
3. **Angular unknown element** → `CUSTOM_ELEMENTS_SCHEMA`.
4. **`react-to-webcomponent` options** → use `{ shadow: 'open' }`.

## How to Run
```bash
pnpm i
pnpm nx serve ng-host

