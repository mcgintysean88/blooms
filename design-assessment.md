# Blooms by Beth — Design Assessment

**Date:** 2026-07-28
**Scope:** Full-site design review — every page at desktop (1280×800) and mobile (375×812), verified against computed styles in-browser and against source.
**Companion doc:** [`design-system.md`](./design-system.md) documents the *intended* system. This doc records what was actually found, what was fixed, and what remains.

---

## Status legend

| Mark | Meaning |
|------|---------|
| ✅ | Fixed and shipped to production |
| ⬜ | Open — not yet started |

---

## ✅ Fixed — the font pipeline was broken

**This was the single highest-impact finding.** The site loaded two Google fonts and rendered neither.

### Root cause

`app/layout.tsx` loaded Geist + Geist Mono via `next/font`, which defines CSS variables (`--font-geist-sans`). But `tailwind.config.ts` had **no `fontFamily` extension**, so nothing ever consumed those variables. Tailwind's preflight fell through to its default stacks.

Verified via computed style before the fix:

| Element | Intended | Actually rendered |
|---|---|---|
| All `font-serif` headings (80 usages) | Playfair Display (per design-system.md) | `ui-serif, Georgia, Times New Roman` |
| Body / nav / paragraphs | Geist Sans | `ui-sans-serif, system-ui` (OS default) |

So every heading on the site rendered in **Georgia**, and Geist was downloaded on every page load and thrown away.

### Fix applied

1. **`tailwind.config.ts`** — added the missing `fontFamily` extension mapping `sans` → `var(--font-geist-sans)` and `serif` → `var(--font-cormorant-garamond)`, each with the default stack as fallback. This was the actual root cause.
2. **`app/layout.tsx`** — loaded **Cormorant Garamond** (weights 300–700) via `next/font/google` with `display: "swap"`; added `font-sans` to `<body>`.
3. **Removed Geist Mono** — declared and downloaded on every page, but `font-mono` appears zero times in the codebase.

### Font choice rationale

Initially implemented **Playfair Display** (the name recorded in `design-system.md`), then switched to **Cormorant Garamond** by preference. Cormorant is more delicate and better suited to the garden aesthetic, and critically it **supports weight 300** — Playfair's range starts at 400, which meant the three `font-light` display headings were silently clamping to 400. With Cormorant those headings render at a true 300.

> ⚠️ **Known side effect to watch:** Cormorant Garamond has a noticeably smaller x-height than Playfair. At identical `px` sizes it reads smaller. Card titles (`text-xl font-serif`) now appear undersized relative to body copy. This sharpens open item **T-2** below.

---

## Open items

### 🔴 High impact

#### F-1 ⬜ No brand color tokens in Tailwind
All six brand colors are raw hex strings repeated across every file — `text-[#3c4c30]` alone appears dozens of times. A single palette change means a find-and-replace across the whole codebase.

**Fix:** Promote to `tailwind.config.ts` as named tokens (`sage-dark`, `sage`, `sage-hover`, `body`, `beige`, `green-light`) so usage becomes `text-sage-dark`.

**Why first:** This is foundational. Every other visual change below becomes cheaper and safer once it's done. Recommended as the next task.

#### N-1 ⬜ Logo is force-centered by a CSS hack
`app/globals.css` contains:
```css
.header-logo { margin-left: auto; margin-right: auto; }
```
Computes to a ~165px left margin at desktop, pushing the logo to center while nav sits right — leaving the entire left third of the header empty and unbalanced.

**Fix:** Delete those two lines. Standard is logo-left / nav-right.

#### FM-1 ⬜ Select inputs don't match text inputs
`components/contact-form.tsx` uses native `<select>` styled inline (`border-gray-300 rounded-md p-2 h-10`) sitting directly beside shadcn `<Input>` components. Different border color, height, and text weight — visibly mismatched within the same form.

**Fix:** Use the shadcn `Select` component.

---

### 🟠 Bugs & accessibility

#### N-2 ⬜ Duplicate close button in mobile drawer
`components/header.tsx:55` renders a manual `<X>` button, but shadcn's `SheetContent` already ships its own close control. Two X's visibly stack in the drawer's top-right corner.

**Fix:** Delete the manual button.

#### N-3 ⬜ Mobile menu missing accessible title
Console error on every mobile menu open:
```
`DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users.
```
Screen readers cannot announce the navigation drawer.

**Fix:** Add a `SheetTitle` wrapped in Radix `VisuallyHidden`.

---

### 🟡 Navigation

#### N-4 ⬜ Nav font size is off-scale and oversized
Desktop uses `text-[1.25rem]` (20px) — an arbitrary one-off — while mobile uses `text-lg` (18px). 20px is large for nav and crowds the header.

**Fix:** Unify to `text-base` (16px), optionally with slightly wider letter-spacing.

#### N-5 ⬜ No active-page indicator
Nothing indicates which page the visitor is currently on.

**Fix:** Use `usePathname()` to apply an underline or sage color to the current route.

---

### 🟡 Typography

#### T-1 ⬜ Hero headline cramped on mobile
`text-5xl` at 375px runs nearly edge-to-edge with almost no breathing room.

**Fix:** Drop to `text-4xl` on mobile; add horizontal padding to the hero text block.

#### T-2 ⬜ Heading scale has a cliff
Sizes jump `text-7xl` → `text-5xl` → `text-4xl` → `text-xl` → `text-lg`. The `text-xl` → `text-4xl` gap is large, leaving card titles undersized against section headings. **Now more pronounced with Cormorant Garamond's smaller x-height** (see font note above).

**Fix:** Define a formal type scale; likely bump card titles to `text-2xl`.

#### T-3 ⬜ No measure or leading control on long-form copy
The About page runs five dense paragraphs with default leading and no `max-w` on the text column, producing long, monotonous lines.

**Fix:** Add `leading-relaxed` and cap the measure around `max-w-[65ch]`.

---

### 🟡 Layout

#### L-1 ⬜ About page two-column layout is imbalanced
The portrait floats near the bottom of its column with a large empty gap above it, while the text column runs far past the image bottom.

**Fix:** Top-align or make the image sticky, or restructure to single-column with the portrait as a full-width band.

#### L-2 ⬜ Service cards mix text alignment
Within a single card: icon centered, title centered, body text left-aligned.

**Fix:** Pick one. Recommend all-left — centered body copy is harder to read.

#### L-3 ⬜ Section padding is inconsistent
`py-16 md:py-24` on some sections, `py-20 md:py-32` on others, with no documented rule. The dark-green Services header in particular carries excessive dead space above its title.

**Fix:** Define two or three standard section-padding tiers and apply consistently.

---

### 🟡 Forms

#### FM-2 ⬜ 13 fields presented as one undifferentiated wall
The contact form has no grouping, no card, and no visual containment against the white page background.

**Fix:** Group into three fieldsets — *Your Info* / *Property* / *Project Details* — and consider a bordered card on a `#f8f5f0` background.

#### FM-3 ⬜ Focus rings are default near-black, not brand sage
Inputs focus to shadcn's default `ring-ring` rather than `#738c65`.

#### FM-4 ⬜ Error red clashes with the palette
Generic `red-500` sits harshly against the muted sage system. A warmer, desaturated red would integrate better.

---

### 🟢 Cleanup

#### C-1 ⬜ Dead shadcn theme layer in `globals.css`
A full light/dark CSS-variable system plus five `--chart-*` colors, none of which relate to the brand or are used. Unused weight that misleads anyone reading the file.

#### C-2 ⬜ Duplicated card patterns
Philosophy cards (About) and `ServiceCard` are visually near-identical but separately implemented. Process steps (Services) are an inline pattern with no component. Candidates for a shared `FeatureCard`.

---

## Recommended sequence

| Order | Item | Rationale |
|---|---|---|
| ~~1~~ | ~~Font pipeline~~ | ✅ **Done** — transformative |
| 2 | **F-1** brand color tokens | Foundation; makes everything below cheaper |
| 3 | **N-1, N-4, N-5** header fixes | High visibility, low risk |
| 4 | **N-2, N-3** drawer bug + a11y | Straight bug fixes |
| 5 | **FM-1, FM-2, FM-3** form polish | Highest-converting page on the site |
| 6 | **L-1, L-2, L-3, T-1, T-2, T-3** | Layout and type refinement |
| 7 | **C-1, C-2** | Housekeeping |

---

## Not a design issue, but noted

- **`public/hero-garden.jpg` is 18 MB.** It is the largest asset on the site by a wide margin and loads on the home page. Compressing it would materially improve load time and Core Web Vitals. Worth its own ticket.
- **Pre-existing lint errors.** `npm run lint` reports numerous `react/no-unescaped-entities` errors plus one unused variable in `newsletter-signup.tsx`. ESLint is disabled during build (`next.config.ts`), so these do not block deploys. Unrelated to design.
