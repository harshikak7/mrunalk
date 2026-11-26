# DESIGN.md — Portfolio (Home + About)

Single source of truth for the build. Figma is the source for exact pixel values: read ONLY the frame I link in each prompt. Everything below is already extracted, so do not re-fetch it from Figma.

Reference for the scroll/column behavior: https://maelle.framer.website/work/neon-flux

Scope now: **Home** and **About** (desktop + mobile). Work / case-study pages come later; create only stub routes for them.

---

## 1. Stack and folders

Vite + React, Tailwind CSS v4, React Router, GSAP (+ ScrollTrigger).

```
src/
  assets/          # all images, flat, unique filenames (see section 4)
  components/      # Nav, TimeChip, Marquee, Footer, ProjectCard, Spotlight, Grain, Layout
  pages/           # Home.jsx, About.jsx, CaseStudy.jsx (stub), NotFound.jsx
  data/            # site.js, projects.js
  lib/             # assets.js (auto asset loader), time.js
public/
  favicon.svg
```

Rules: one component per file; no hardcoded hex values (use theme tokens); all text content lives in `src/data`, not inside components; respect `prefers-reduced-motion`.

---

## 2. Design tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#101010` | Page background |
| `--text` | `#FCFCFC` | Primary text, CTA background |
| `--text-muted` | `#FCFCFC` at 60% | Inactive nav links, metadata |
| `--text-secondary` | `#8A8A8A` | Roles, time |
| `--text-on-light` | `#010101` | Text on the white CTA bar |
| `--line` | `#FCFCFC` at 20% | Every 1px border and divider |
| `--accent` | `#34C759` | Status dot and text |
| `--line-on-light` | `#010101` at 20% | Divider on the white (hovered) marquee |
| nav cell fill | `#202020` at 10-20% + backdrop blur | Glass look |

**Grain texture:** the page background is `#101010` with a procedural grain on top at **30% opacity**. No image file: `<Grain />` generates a small tiling SVG noise (`feTurbulence`, desaturated) as an inline data URI. Implement as one fixed, full-screen layer: `position: fixed; inset: 0; pointer-events: none; opacity: .3; background-repeat: repeat; z-index` above the background and below content.

**Fonts** (Google Fonts, load via CSS, `font-display: swap`):
- Source Serif 4: headings. SemiBold 60/64 (hero), SemiBold 40 (CTA), Regular 24 (section titles), Regular 20 (achievement name), SemiBold 20 (footer name).
- Source Sans 3: body. Regular 24 (intro), 20 (time), 18 (footer, status), 16 (metadata); Medium 20 (project captions).
- Nav links: use Source Sans 3 Medium 20 (replaces IBM Plex Sans from the design, for simplicity).
- Letter-spacing: 1px everywhere (2px on the footer credit, 0 on nav).

No border radius except the logo (fully round). No shadows.

---

## 3. Layout

### Desktop (1440 design width)
Three columns split by 1px `--line` vertical dividers: **Left 400 / Center 639 / Right 401**.

- **Only the center column scrolls.** Left and right columns are static (`position: sticky` / fixed to the viewport with their content pinned top and bottom). The page scrolls through the center column only.
- Each side column: content pinned to the top and to the bottom, empty space between. 160px top offset for main content below the 60px nav bar.
- Nav bar (60px) spans all three columns and stays fixed at the top.

### Mobile
Single column. Static side-column content is restructured per the mobile frame. Read the mobile frame; do not copy desktop structure.

Breakpoint: switch to mobile layout below `768px`.

---

## 4. Assets and naming (auto-loaded)

Put files in `src/assets/` with EXACTLY these names (lowercase, kebab-case; Linux hosting like Vercel is case-sensitive, so `Logo.png` would break in production). Extensions can be png, jpg, jpeg, webp or svg.

| File name | Used for |
|---|---|
| `logo` | Nav avatar (the illustration of me) |
| `viscer-vr-cover` | Home card 1 image |
| `insurance-calculators-cover` | Home card 2 image |
| `internal-insurance-dashboard-cover` | Home card 3 image |
| `about-sticker-1` ... `about-sticker-5` | About page sticker scroller, in order |
| `about-photo` (if the About frame has one) | About main image |

Rule for future images: `{project-slug}-cover` for covers, `{project-slug}-1`, `-2`... for case study images, `about-sticker-N` for stickers.

**Auto-loader** (`src/lib/assets.js`): use `import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })`. Export:
- `getAsset(name)`: returns the URL for the file whose name (without extension) equals `name`; log a clear console warning if missing.
- `getAssetsByPrefix(prefix)`: returns all URLs whose name starts with the prefix, sorted by the trailing number (so `about-sticker-1..5` come out in order).

Components must use these helpers. Never import images by hard-coded path.

---

## 5. Data files

`src/data/site.js` holds: name, intro copy, status text, nav links, footer rows, achievements, quick links.

**Corrected copy (fix the typos from Figma):**
- Hero: "Hello! I'm Mrunal."
- Intro (white): "I design products in a way people don't have to think about."
- Intro (grey): "Previously I design and lead product experiences at Simutomy." (keep as in design unless I say otherwise)
- Status: "Open for New Opportunities"

**Nav links:** Resume (Google Drive share link, opens in new tab with `rel="noopener noreferrer"`; no `public/resume.pdf`), About (`/about`), Behance (https://www.behance.net/KMrunal), LinkedIn (https://www.linkedin.com/in/kmrunal). All URLs live in `site.js`.

**Footer rows (underlined rows, defined in `site.js` as `footer.rows`):** "UI/UX Design" and "Product Design" are **static plain-text role tags** (not links, no routes). Only "kolekarmrunal@gmail.com" is a link (`mailto:`). The only links to `/work/:slug` are the Selected Works cards.
Footer center: "Coded by Human, **Harshika**", where "Harshika" is an external link to `https://harshikaa-portfolio.vercel.app/` (new tab, `rel="noopener noreferrer"`). Footer right: "Achievements" label, "UIUX Ninja", "2024", "Simutomy Medtech Pvt Ltd".

`src/data/projects.js`:

```js
export const projects = [
  { slug: "viscer-vr", name: "VisceR VR", role: "UI/UX & Product Design", year: "2023-2026" },
  { slug: "insurance-calculators", name: "Insurance Calculators", role: "UI/UX Design", year: "2025" },
  { slug: "internal-insurance-dashboard", name: "Internal Insurance Dashboard", role: "UI/UX Design", year: "2025" },
];
```

Cover image is resolved with `getAsset(`${slug}-cover`)`.

---

## 6. Routing (protected)

Routes: `/`, `/about`, `/work/:slug`, and `*` (NotFound).

- Only these routes exist. Anything else renders `NotFound` with a link home.
- `/work/:slug` is validated against `projects.js`; an unknown slug renders `NotFound` (never a blank or broken page).
- Ignore and strip query strings and unknown hashes on these routes.
- Navigation uses React Router `<Link>` (no full page reload); external links open in a new tab with `rel="noopener noreferrer"`.
- Add a hosting rewrite so refresh and direct visits work: `vercel.json` with `{"rewrites":[{"source":"/(.*)","destination":"/"}]}`.
- Note: the browser address bar cannot be made un-editable in a client-side app. This setup means a changed or invalid URL can never break the site or reach anything that does not exist.
- Work/case-study pages: stub only for now (title + "Case study coming soon").

---

## 7. Components and behavior

### Nav (all pages, fixed, 60px)
- Left: `logo` avatar, ~47px, fully round, links to `/`.
- Center: four equal 160px cells (Resume, About, Behance, LinkedIn), 1px border, glass blur.
- Right: `<TimeChip />`.
- **Default (neutral) state:** all four cells are identical: 60px tall (same as the bar), dimmed text (`--text-muted`), no arrow. The LinkedIn cell in the Figma frame is drawn in its hover state only to show the effect; it is NOT its default look. Do not special-case LinkedIn.
- **Hover state (all four cells):** the hovered cell extends downward to ~86px tall (hanging below the bar), text becomes fully white, and an arrow (→) appears after the label. Animate about 250-300ms ease-out, and reverse smoothly on mouse leave. Also support keyboard focus with the same effect.
- Touch devices: no hover effect.
- Mobile: follow the mobile frame for the nav (it may collapse); do not assume it matches desktop.

### TimeChip
Shows "Mumbai | Oct 31, 8:20 PM" using the **real current time** in `Asia/Kolkata` (`Intl.DateTimeFormat`). Update live (check every 15-30 seconds, aligned to the minute change). Clean up the interval on unmount.

### Marquee ("Available for Work! | Let's Connect!")
Bar 91px tall, serif 40px text, a short vertical divider between the two phrases. **Scrolls continuously left to right**, seamless loop (duplicate the content), pausing on hover is optional.

- **Default state (Frame 2147259071):** dark background (`--bg`), light serif text (`--text`), 1px top and bottom borders and the vertical divider in `--line`.
- **Hover state (Frame 2147259044):** smooth transition (~300ms ease-out, GSAP, reversed on leave) to a solid white background (`--text`), dark serif text (`--text-on-light`), and a subtle dark vertical divider (`--line-on-light`). Desktop pointer only; reduced-motion switches instantly. Placed at the bottom of the center column on Home and on About. Respect reduced-motion (static if enabled).

### Spotlight / cursor-follow gradient
On hover, the element's background shows a soft radial gradient that follows the cursor. Apply to: project cards and nav cells. Implement with CSS variables `--mx` and `--my` updated on `mousemove` (no heavy library). Desktop only; disabled on touch devices.

### ProjectCard
Image 602x362 (square corners), 13px gap, caption row: **name** (white) + " | role" (grey) on the left, year on the right. Links to `/work/:slug`. Spotlight effect on hover.

### Footer
Same on Home and About. Desktop: left column has the three quick-link rows (1px bottom borders, 9px gap), center has the credit, right has Achievements. Mobile: restructure per the mobile frame.

---

## 8. Page specs

### Home (`/`)
- Desktop, three static-frame columns; center scrolls.
- **Left:** hero "Hello! I'm Mrunal." (Source Serif 4 SemiBold 60/64), footer quick links pinned bottom.
- **Center:** intro paragraph; horizontal line; "Selected Works" (serif 24); 3 `ProjectCard`s with 43px between; line; Marquee; footer credit.
- **Right:** status dot + "Open for New Opportunities" (green); Achievements pinned bottom.
- **Mobile:** single column per the mobile frame. **Selected Works cards come in one by one, sliding up as the user scrolls** (GSAP ScrollTrigger: fade + translateY ~40px to 0, each card triggered as it enters the viewport, once).

### About (`/about`)
- Same 3-column desktop layout and static-sides / scrolling-center behavior as Home, same nav and footer.
- Content (copy, headings, section order, sizes) comes from the About frame: read it, do not invent text.
- Contains a **sticker scroller** with 5 images (`about-sticker-1..5`), auto-scrolling horizontally and looping seamlessly; images come from `getAssetsByPrefix('about-sticker-')`.
- Includes the "Available for Work! | Let's Connect!" marquee and the footer, as on Home.
- **Mobile:** layout is simplified versus desktop (not a straight copy). Follow the About mobile frame exactly.

---

## 9. Quality bar (check before saying done)

- Matches the Figma frame at 1440 desktop and the mobile frame at ~390.
- Side columns stay fixed while the center scrolls (desktop).
- No hardcoded colors, no console warnings about missing assets.
- Smooth 60fps animation; reduced-motion respected.
- Keyboard accessible links, visible focus states, alt text on images.
