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
| `--link-hover` (`--color-link-hover`) | `#FFCC00` | Hover/focus color of active text links |
| nav cell fill | `#202020` at 10-20% + backdrop blur | Glass look |

**Grain texture:** the page background is `#101010` with a subtle, darkened procedural grain on top at **12% opacity**. No image file: `<Grain />` generates a small tiling SVG noise (`feTurbulence`, desaturated) as an inline data URI. Implement as one fixed, full-screen layer: `position: fixed; inset: 0; pointer-events: none; opacity: .12; background-repeat: repeat; z-index` above the background and below content.

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
- Each side column: content pinned to the top and to the bottom, empty space between. 130px top offset (from the page top) for the first row in all three columns, aligned on the same top line.
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

#### About page (built)
Copy lives in `src/data/about.js` (intro, stats, roles, FAQ, sticker alt text). Center column, top to bottom: back arrow, intro, sticker scroller, Work Experience, FAQ, Marquee, credit. Left: "About Me!" + footer rows. Right: stats (Years of Experience, Projects Worked On) pinned top, Achievements pinned bottom.
- **Back arrow** (not in Figma): `<BackButton />`, a 20px left arrow at the column padding with 28px clear space above the intro (desktop: lifted 19px above the 130px line so the intro stays on the 159px row; mobile: the intro moves down instead). `navigate(-1)`, or `/` when there is no history (`location.key === 'default'`). Muted by default, `--link-hover` on hover and keyboard focus, `aria-label="Go back"`. Shown on mobile too, above the intro.
- **Sticker scroller:** `<StickerScroller />` loops the 5 `about-sticker-*` images right to left (GSAP, ~40px/s, two copies of the set). Each `<Sticker />` is a white, 60px-tall box sized by the logo; on hover only the logo scales to 1.1 (box fixed). The loop distance is the measured width of one set after all images load (logo widths vary). Desktop pointer only; static under reduced motion.
- **FAQ accordion:** `<Faq />` / `<FaqItem />`. Buttons with `aria-expanded` and `aria-controls`; one item open at a time (clicking the open one closes it). The answer height animates with GSAP (~350ms), and the `add` (+) icon rotates out as the `close` (x) icon rotates in. Closed answers are `hidden`; instant under reduced motion. Answers are placeholders (TODO in `about.js`).
- **Links:** "Download Resume →" uses the Drive resume link from `site.js` (new tab). Simutomy/Viscer are underlined and turn `--link-hover` on hover; their URLs are still TODO in `about.js`.
- **Mobile:** stacked per the mobile frame: heading, footer rows, back arrow + intro, stickers, Work Experience (stacked rows), FAQ, status badge, Achievements, credit. No marquee and no stats on mobile.

---

## 9. Links, favicon, stickers

### Favicon and title
- Favicon: `src/assets/logo.png` via `<link rel="icon" type="image/png" href="/src/assets/logo.png">` in `index.html` (Vite fingerprints it on build).
- Page title: "Mrunal Kolekar | Product Designer".

### Link hover color
- Token `--color-link-hover: #FFCC00` (Tailwind: `text-link-hover`).
- Every active text link turns this yellow on hover and keyboard focus (`:focus-visible`), ~200ms color transition. Use the `link-hover` utility in `src/index.css`.
- Applies to: the footer email row, the "UIUX Ninja" achievement link (URL in `site.js`), the "Harshika" credit link, any underlined text link, and any "Download Resume" link.
- "UI/UX Design" and "Product Design" stay plain-text tags (not links), so no hover color.
- Does NOT apply to nav cells: they keep the white hover-down effect.

### About stickers (built, see "About page" in section 8)
- Each sticker is a white box: fixed 60px height, `width: auto` (no fixed width), 16px horizontal / 8px vertical padding, with a transparent logo image inside.
- The logo is `height: 100%` (of the padded box), `width: auto`, `max-width: none`, `object-fit: contain`. Never `object-fit: cover` or a fixed width; every logo shows in full.
- `overflow: hidden` only keeps the hover scale inside the box; the padding leaves room for the 1.1 scale. The scroller edge may cut a sticker as it passes.
- On hover, only the logo scales up (~1.08-1.12) inside the box with a smooth transition; the white box never changes size.
- Desktop hover only (no effect on touch); respect reduced-motion.

---

## 10. Quality bar (check before saying done)

- Matches the Figma frame at 1440 desktop and the mobile frame at ~390.
- Side columns stay fixed while the center scrolls (desktop).
- No hardcoded colors, no console warnings about missing assets.
- Smooth 60fps animation; reduced-motion respected.
- Keyboard accessible links, visible focus states, alt text on images.
- Pointer cursor: a global base rule in `src/index.css` gives `a`, `button`, `[role="button"]` and `summary` `cursor: pointer`; `:disabled` / `[aria-disabled="true"]` get `cursor: not-allowed`. Stickers are not links and keep the default cursor.
