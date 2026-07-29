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

#### F-1 ✅ Brand color tokens — **done 2026-07-29**
All six brand colors were raw hex strings repeated across the codebase — **174 hardcoded usages** across 16 files (`#3c4c30` alone appeared 95 times). Any palette change meant a codebase-wide find-and-replace.

**Fixed:** Tokens defined in `tailwind.config.ts` (`sage` / `sage-dark` / `sage-hover` / `sage-pale`, `beige`, `body`) and all 174 usages replaced. Zero bracketed hex values remain in `app/` or `components/`.

Verified as a true no-op by reading the generated CSS rules in-browser: every token resolves to its exact original hex, and every used variant is generated —
`.bg-sage-dark`/`.text-sage-dark` → `#3c4c30`, `.bg-sage`/`.text-sage`/`.hover:text-sage` → `#738c65`, `.hover:bg-sage-hover` → `#5d7251`, `.text-body` → `#5a5a5a`, `.bg-beige`/`.hover:bg-beige` → `#f8f5f0`, `.bg-sage-pale` → `#f0f4eb`.

Two anomalies were found and resolved during the sweep:

- **`app/error.tsx:27`** used `hover:bg-[#5a6e4d]` — a rogue green that existed nowhere else in the design system. Every other primary button hovers to `#5d7251`. Normalized to `sage-hover`, so the error page's button now matches every other button on the site.
- **`app/contact/page.tsx:33`** used `border-[#e5e7eb]`, which is exactly Tailwind's `gray-200`. Replaced with the standard utility. This is still a non-brand neutral — if a brand border color is ever defined, this is the one call site to update.

**Remaining exception:** `app/layout.tsx:19` sets `themeColor: '#738c65'` in the `Viewport` export. It is a plain metadata string, not a class, so it cannot take a token and must be hand-synced with `sage`.

#### N-1 ✅ Logo force-centered by a CSS hack — **done 2026-07-29**
`app/globals.css` contains:
```css
.header-logo { margin-left: auto; margin-right: auto; }
```
Computes to a ~165px left margin at desktop, pushing the logo to center while nav sits right — leaving the entire left third of the header empty and unbalanced.

**Fixed:** Rule deleted from `globals.css` and the now-dead `header-logo` class removed from the markup. The flex container's existing `justify-between` produces logo-left / nav-right on desktop and logo-left / hamburger-right on mobile. Verified: logo left edge now sits at the container's 16px padding, down from ~165px.

#### FM-1 ✅ Select inputs didn't match text inputs — **done 2026-07-29**
`components/contact-form.tsx` used native `<select>` styled inline (`border-gray-300 rounded-md p-2 h-10`) sitting directly beside shadcn `<Input>` components — different height, border colour and padding within the same form.

**Fixed — but not the way this item originally proposed.** The original fix said "use the shadcn `Select` component." On implementation that turned out to be the wrong call here:

- shadcn's `Select` was not installed, and `@radix-ui/react-select` is not a dependency.
- Radix's Select is a custom listbox, not a native control. It only reaches `FormData` via a hidden input — a behavioural change on the lead-capture path, which is the one flow this business actually depends on (see BLO-18, "Fix Lead Form Submissions").
- Native selects also give phones their own picker UI, which is better on mobile for 4–6 option lists.

The complaint in FM-1 is *visual*, so it got a visual fix: a new `components/ui/select.tsx` wrapping a **native** `<select>` styled to match `<Input />` exactly, with `appearance-none` plus a `ChevronDown`, and `invalid:text-muted-foreground` so the unselected placeholder option is muted the same way `<Input />`'s placeholder is.

Verified by measurement — `<Input>` and `<Select>` now report identical height (36px), border colour (`rgb(229,229,229)`), radius (6px), font size (14px) and left padding (12px). The select carries 32px right padding for the chevron. Placeholder state computes to muted `rgb(115,115,115)`; once a value is chosen it computes to `rgb(10,10,10)`, matching input text.

If a custom listbox is ever wanted for design reasons, that is a deliberate follow-up — not a prerequisite for visual consistency.

---

### 🟠 Bugs & accessibility

#### N-2 ✅ Duplicate close button in mobile drawer — **done 2026-07-29**
`components/header.tsx` rendered a manual `<X>` button, but `SheetContent` already ships its own close control at `components/ui/sheet.tsx:67` (`absolute right-4 top-4`). Two X's visibly stacked in the drawer's top-right corner.

**Fixed:** Manual button and its now-unused `X` import removed. The surrounding `flex justify-between` wrapper was redundant once the button was gone, so the logo `Link` absorbed its `mb-8` directly. Verified: the open drawer now contains exactly **1** button (the built-in "Close"), down from 2.

#### N-3 ✅ Mobile menu missing accessible title — **done 2026-07-29**
Radix logged an error on every mobile menu open:
```
`DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users.
```
Screen readers could not announce the navigation drawer.

**Fixed:** Added `<SheetTitle className="sr-only">Navigation menu</SheetTitle>` inside `SheetContent`. Tailwind's `sr-only` is used rather than pulling in `@radix-ui/react-visually-hidden` — same result, no new dependency.

Verified: the drawer renders an `<h2>` "Navigation menu" that is screen-reader-only (`position: absolute`, `width: 1px`), the dialog's `aria-labelledby` resolves to it, and opening the drawer no longer emits a new console error.

---

### 🟡 Navigation

#### N-4 ✅ Nav font size off-scale and oversized — **done 2026-07-29**
Desktop used `text-[1.25rem]` (20px) — an arbitrary one-off — while the mobile drawer used `text-lg` (18px).

**Fixed:** Both are now `text-base` (16px), on the standard scale and consistent with each other. Desktop nav gap went `gap-4` → `gap-6` so the links don't tighten up at the smaller size. Letter-spacing was left alone; it remains available if the nav wants more air.

#### N-5 ✅ No active-page indicator — **done 2026-07-29**
Nothing indicated which page the visitor was on.

**Fixed:** The current route's link renders in `sage-dark` with a `sage` underline (`underline-offset-8`) and carries `aria-current="page"`. Inactive links keep the `body` / `hover:sage` treatment. Uses `usePathname()` with a helper that also matches nested routes (`pathname.startsWith(href + '/')`), so future subpages will light up their parent nav item. Applied to both the desktop nav and the mobile drawer.

`navItems` also moved to module scope, since it never depended on render state.

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

#### L-1 ✅ About page two-column layout imbalanced — **done 2026-07-29**
The portrait floated near the middle of its column with a large empty gap above and below, while the text column ran far past it. Cause: `md:items-center` vertically centred a 432px `aspect-square` image against a 640px text column, splitting the 208px difference above and below.

**Fixed** with two changes: `md:items-center` → `md:items-start`, and `aspect-square` → `aspect-[4/5]` (matching the home page's portrait treatment). The taller crop does most of the work — the image is now 540px against 640px of text, so the height difference dropped from 208px to 100px.

Verified: image and text tops align exactly (both at 257px), and the crop still frames Beth well.

**A sticky image was tried and deliberately abandoned.** `md:sticky md:top-24` did not pin, and the reason is structural rather than a missing `overflow` fix: the sticky element *was* the grid item, so under `items-start` it shrink-wrapped to its own content height and had almost no travel inside its containing block. Making it work needs an extra full-height wrapper around the sticky div. Given the `aspect-[4/5]` change had already reduced the gap to 100px, sticky would have bought ~100px of travel for real added markup complexity — not worth it. Noted here so the next person doesn't rediscover it.

#### L-2 ✅ Service cards mixed text alignment — **done 2026-07-29**
Within a single card: icon centred, title centred, body text left-aligned — which reads as a mistake rather than a choice.

**Fixed:** `ServiceCard` is now all-left (icon, title, body). Verified the icon sits at the card's 24px `p-6` inset rather than centred, and both title and body compute to `text-align: start`.

**Also aligned the About page philosophy cards.** Those were internally consistent (centred title *and* centred body), but leaving them would have traded the in-card inconsistency for a cross-page one — service cards left, philosophy cards centred. Both card types are now left-aligned, and the rule is written into `design-system.md`. This also moves C-2 (shared `FeatureCard`) closer, since the two patterns now differ only in wrapper styling.

#### L-3 ✅ Section padding inconsistent — **done 2026-07-29**
An audit of every `<section>` found three tiers in use, only two of them documented:

| Padding | Used by | Was documented? |
|---|---|---|
| `py-16 md:py-24` | privacy, terms, about, home intro, services process | yes — "primary" |
| `py-12 md:py-16` | home services, home newsletter | yes — "compact" |
| `py-20 md:py-32` | services dark header, portfolio top | **no** |

The undocumented tier is a legitimate role — full-width page-opening bands — but it was oversized, which is what produced the dead space above the Services heading.

**Fixed:** formalised as a three-tier scale in `design-system.md` (**Band** `py-20 md:py-28` / **Primary** `py-16 md:py-24` / **Compact** `py-12 md:py-16`), and the two Band sections trimmed from `md:py-32` to `md:py-28`. Verified the Services band now computes to 112px top and bottom, down from 128px.

---

### 🟡 Forms

#### FM-2 ✅ 13 fields presented as one undifferentiated wall — **done 2026-07-29**
The contact form had no grouping and no visual containment against the white page background.

**Fixed:** Split into three semantic `<fieldset>`s with serif `<legend>`s — **Your Information** / **Property** / **Project Details**. Fieldsets carry `min-w-0` so their default `min-width: min-content` cannot break the inner grids.

Two grouping judgements worth knowing:
- **Preferred Contact Method** moved into *Your Information*. It describes how to reach the person, not the project.
- **Project Timeframe** and **Budget Range** now sit side by side in a 2-column grid rather than stacked full-width, which removes two full-width rows from the wall.

The optional beige card wrapper was **not** added — the fieldset legends already carry the grouping, and a card felt like over-containment on an otherwise white page. Still available if wanted.

#### FM-3 ✅ Focus rings were default near-black — **done 2026-07-29**
Inputs focused to shadcn's default `ring-ring`, which resolved to near-black (`--ring: 0 0% 3.9%`).

**Fixed at the token level** rather than per-component: `--ring` in `globals.css` is now `98.5 16.2% 47.3%`, the exact HSL of sage `#738c65` (verified to round-trip back to that hex). Because every shadcn component focuses via `ring-ring`, this single change covers Input, Textarea, the new Select, Button and the Sheet close control at once.

Verified: `hsl(var(--ring))` computes to `rgb(115, 140, 101)` = `#738c65`.

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
| ~~2~~ | ~~**F-1** brand color tokens~~ | ✅ **Done** — foundation for everything below |
| ~~3~~ | ~~**N-1, N-4, N-5** header fixes~~ | ✅ **Done** |
| ~~4~~ | ~~**N-2, N-3** drawer bug + a11y~~ | ✅ **Done** |
| ~~5~~ | ~~**FM-1, FM-2, FM-3** form polish~~ | ✅ **Done** |
| 6a | ~~**L-1, L-2, L-3** layout~~ | ✅ **Done** |
| 6b | **T-1, T-2, T-3** type refinement | **next up** |
| 7 | **C-1, C-2** | Housekeeping |

Still open on the form: **FM-4** (error red clashes with the palette).

---

## Not a design issue, but noted

- **`public/hero-garden.jpg` is 18 MB.** It is the largest asset on the site by a wide margin and loads on the home page. Compressing it would materially improve load time and Core Web Vitals. Worth its own ticket.
- **Pre-existing lint errors.** `npm run lint` reports numerous `react/no-unescaped-entities` errors plus one unused variable in `newsletter-signup.tsx`. ESLint is disabled during build (`next.config.ts`), so these do not block deploys. Unrelated to design.
