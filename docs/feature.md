# Innovative Feature: Angular ↔ React Interop in an Nx Monorepo

## What it is
- Angular hosts the app and renders a React Web Component `<react-collab-widget>`.
- React dispatches `taskSelected` events; Angular listens and logs them.
- React also renders an Angular custom element `<ng-insights-widget>` via a tiny React wrapper (two-way interop).
- Tailwind class names are used for consistent styling across both.

## Where the pieces live
- `ng-host/src/main.ts` – `import '@sbsc-assessment/react'` (defines the WC) then bootstraps Angular.
- `ng-host/src/app/app.html` – `<react-collab-widget></react-collab-widget>`.
- `ng-host/src/app/app.ts` – `CUSTOM_ELEMENTS_SCHEMA` + `taskSelected` listener.
- `libs/react/src/index.tsx` – registers the React component as a Web Component.
- `libs/react/src/lib/CollabEditor.tsx` – editor UI, `document.dispatchEvent(...)`, React wrapper for `<ng-insights-widget>`.

## Challenges & solutions
1) JSX typing for custom elements → used a wrapper with `React.createElement('ng-insights-widget', props)`.
2) TSX under Angular build → enabled `"jsx": "react-jsx"` and included the React lib in the Angular app tsconfig.
3) Angular “unknown element” → `CUSTOM_ELEMENTS_SCHEMA` on the standalone component.
4) `react-to-webcomponent` options → `{ shadow: 'open' }`.

## How to run
```bash
pnpm i
pnpm nx serve ng-host
# open http://localhost:4200


