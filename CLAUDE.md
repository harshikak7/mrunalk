# Portfolio — Mrunal

Stack: Vite + React, Tailwind CSS v4, React Router, GSAP (+ ScrollTrigger).

## Read first
Before building any page, read DESIGN.md. It has the tokens, layout, asset names, routes, and component behavior. Do not re-fetch tokens from Figma.

## Figma
- Figma is the source of truth for exact pixel values.
- Read ONLY the frame link I give you in the prompt. Never scan the whole file.
- Frames marked "Ready for dev" are the ones to build from.

## Rules
- No hardcoded hex values. Use the theme tokens.
- Build desktop and mobile together using the frames I link. Mobile is not a copy of desktop.
- One component per file. Folders: src/components, src/pages, src/data, src/lib, src/assets.
- All text content lives in src/data, not inside components.
- Images come from src/assets via the loader in src/lib/assets.js, never hard-coded paths.
- Animations use GSAP; respect prefers-reduced-motion.
- Only these routes exist: /, /about, /work/:slug, and * (NotFound).

## Working style
- Plan first for anything bigger than one component, then wait for my OK.
- Build one step at a time and stop so I can check it in the browser.
- Keep replies short. Don't re-explain code. Don't refactor files I didn't mention.
- Don't install new packages without asking.
