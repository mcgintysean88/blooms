# Blooms by Beth — Design System

A marketing and inquiry website for a Charleston-area garden design and landscaping business. The aesthetic is warm, natural, and Southern — rooted in organic textures, sage greens, and serif typography. The tone is personal, welcoming, and artisan.

---

## Brand Identity

**Business:** Blooms by Beth  
**Location:** Charleston, SC (Lowcountry)  
**Voice:** Warm, personal, expert — like a trusted neighbor who happens to be a master gardener  
**Aesthetic:** Southern garden — organic, elegant, unhurried  
**Logo mark:** Flower icon (lucide-react `Flower`) + wordmark in serif font

---

## Color Palette

All colors are currently applied as hardcoded Tailwind hex values (e.g. `text-[#3c4c30]`). They are not yet defined as Tailwind config tokens.

### Brand Colors

| Name | Hex | Tailwind Usage | Purpose |
|------|-----|----------------|---------|
| Dark Sage | `#3c4c30` | `text-[#3c4c30]`, `bg-[#3c4c30]` | Headings, footer background, logo wordmark |
| Mid Sage | `#738c65` | `text-[#738c65]`, `bg-[#738c65]` | Buttons (default), icons, accents, success states |
| Hover Sage | `#5d7251` | `hover:bg-[#5d7251]` | Button hover state |
| Body Text | `#5a5a5a` | `text-[#5a5a5a]` | Paragraph text, secondary content |
| Warm Beige | `#f8f5f0` | `bg-[#f8f5f0]` | Section backgrounds, hero CTA button hover |
| Light Green | `#f0f4eb` | `bg-[#f0f4eb]` | Alternate section backgrounds, icon backgrounds |

### Utility Colors (currently unbranded — gaps to resolve)

| Value | Where Used | Issue |
|-------|-----------|-------|
| `gray-300` | Form select borders | Not in brand palette |
| `gray-500` | Character counter text | Not in brand palette |
| `red-500` | Form error states, error messages | Not in brand palette |
| `#e5e7eb` | Border accents | Not in brand palette |
| `black/30` | Hero image overlay | Acceptable utility use |
| `white/80`, `white/70` | Footer text opacity | Acceptable on dark background |

### Background Usage Rule

- **Warm Beige (`#f8f5f0`)** — Use for primary section backgrounds and card fills (intro section, philosophy cards)
- **Light Green (`#f0f4eb`)** — Use for alternate section backgrounds and icon container fills
- These two should alternate to create visual rhythm between sections

### Hover State Rule

- **Navigation links** → hover to Mid Sage (`#738c65`)
- **Buttons** → hover to Hover Sage (`#5d7251`)
- **Footer links** → hover to full white (`hover:text-white`)

---

## Typography

### Fonts

| Role | Font | Class |
|------|------|-------|
| Serif (headings, logo, quotes) | Cormorant Garamond (300–700) | `font-serif` |
| Sans-serif (body, labels, nav) | Geist Sans | `font-sans` (default) |

Both are loaded via `next/font/google` in `app/layout.tsx` and mapped to Tailwind's
`serif` / `sans` keys in `tailwind.config.ts`. **The Tailwind `fontFamily` mapping is
required** — without it the CSS variables are defined but never consumed, and both
fonts silently fall back to system defaults. See `design-assessment.md` for the
history of that bug.

### Heading Scale (current usage — no formal scale defined)

| Level | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| Display / Hero H1 | `text-5xl md:text-7xl` | `font-light` | serif | Hero section only |
| Page H1 | `text-4xl md:text-5xl` | default | serif | Page titles (About) |
| Section H2 | `text-3xl md:text-4xl` | default | serif | Section headings |
| Card / Sub H3 | `text-xl` | default | serif | Card titles, column headers |
| Footer H3 | `text-lg` | default | serif | Footer column labels |

### Body Scale

| Usage | Size | Weight | Color |
|-------|------|--------|-------|
| Large body copy | `text-lg` + `leading-relaxed` | default | `#5a5a5a` |
| Standard body | `text-base` | default | `#5a5a5a` |
| Form labels | `text-sm` | `font-medium` | `#3c4c30` |
| Error messages | `text-xs` | default | `red-500` (gap — needs brand color) |
| Caption / meta | `text-sm` | default | `white/70` or `#5a5a5a` |
| Character counter | `text-xs` | default | `gray-500` (gap — needs brand color) |

### Nav Link

- Desktop: `text-[1.25rem] font-medium` — currently non-standard size (gap)
- Mobile: `text-lg font-medium`

---

## Spacing & Layout

### Container

```
container mx-auto px-4
max-w-3xl   — hero text block
max-w-4xl   — about page, newsletter
max-w-5xl   — intro section
max-w-6xl   — services grid
```

### Section Padding

```
py-16 md:py-24   — primary content sections
py-12 md:py-16   — secondary/compact sections
```

### Card / Component Internal Padding

```
p-6   — standard card padding (ServiceCard, philosophy cards)
p-4   — compact card (quote callout)
```

### Grid Gaps

```
gap-6    — form field rows
gap-8    — card grids, two-column layouts
gap-10   — footer columns
gap-12   — large two-column sections
```

### Form Field Spacing

```
space-y-6   — between form field groups
space-y-2   — label + input stacking within a field
```

---

## Components

### Button

**Primary (default)**
```
bg-[#738c65] hover:bg-[#5d7251] text-white
```

**Primary on dark / inverted**
```
bg-white hover:bg-[#f8f5f0] text-[#3c4c30]
```
*(Used in hero — white button on image overlay)*

**Size variants in use:**
- Default: shadcn default sizing
- Hero CTA: `text-lg px-8 py-6 rounded-md` (one-off — not a defined variant)
- Ghost icon: `variant="ghost" size="icon"` (header mobile menu trigger)

**States:**
- Loading: button text changes to "Sending...", `disabled` applied
- Disabled: `disabled:opacity-50` (shadcn default)

**Gap:** No `size="lg"` variant defined — hero uses inline overrides.

---

### Form Fields

**Text Input** — uses shadcn `<Input />`  
**Textarea** — uses shadcn `<Textarea />` with `min-h-[150px]`  
**Select** — native `<select>` with inline styles (gap — not using shadcn component)

**Field anatomy:**
```
<div class="space-y-2">
  <label class="text-sm font-medium text-[#3c4c30]" />
  <Input class="w-full [border-red-500 if error]" />
  <p class="text-red-500 text-xs mt-1" />  ← error message
</div>
```

**Select field anatomy (current — inconsistent):**
```
<select class="w-full border border-gray-300 rounded-md p-2 h-10 [border-red-500 if error]" />
```

**Error state (current gap):** Uses generic `red-500` — not brand-aligned.  
**Focus state (current gap):** Uses Tailwind/browser default `focus-visible:ring-ring` — not sage-aligned.

---

### Service Card

```
Card (border-none, shadow-sm, hover:shadow-md, transition-shadow)
└── CardContent (p-6)
    ├── Icon (h-10 w-10 text-[#738c65], centered)
    ├── H3 (text-xl font-serif text-[#3c4c30], centered)
    └── p (text-[#5a5a5a])
```

Available icons: `FlowerIcon`, `Calendar`, `Palette`, `Scissors`, `Sprout`, `Shovel`

---

### Philosophy Card (About page)

```
div (bg-[#f8f5f0] p-6 rounded-md)
├── H3 (text-xl font-serif text-[#3c4c30] mb-3 text-center)
└── p (text-[#5a5a5a] text-center)
```

Note: This is structurally similar to ServiceCard but implemented inline — candidate for extraction into a shared component.

---

### Header

```
header (sticky top-0 z-50, bg-white/80 backdrop-blur-md, border-b border-border/40)
└── container (h-16, flex, items-center, justify-between, px-4)
    ├── Logo (Flower icon + serif wordmark, text-[#738c65] / text-[#3c4c30])
    ├── Desktop nav (hidden md:flex, gap-4) — links text-[#5a5a5a] hover:text-[#738c65]
    └── Mobile Sheet (md:hidden) — Sheet drawer from right, same nav links
```

---

### Footer

```
footer (bg-[#3c4c30] text-white)
└── container (py-12 md:py-16 px-4)
    ├── 3-column grid (gap-10)
    │   ├── Col 1: Logo + tagline + social links (text-white/80)
    │   ├── Col 2: Contact info (text-white/80)
    │   └── Col 3: Quick links — hover:text-white
    ├── Separator (bg-white/20)
    └── Copyright + legal links (text-white/70, hover:text-white)
```

---

### Hero Section

```
section (relative)
├── Overlay div (absolute inset-0 bg-black/30 z-10)
├── Image container (h-[80vh] overflow-hidden)
│   └── next/image (fill, object-cover, priority)
└── Content (absolute inset-0 z-20, flex items-center justify-center, text-center)
    ├── H1 (text-5xl md:text-7xl font-serif font-light text-white)
    ├── p (text-2xl md:text-3xl text-white/90 font-light)
    └── Button (bg-white hover:bg-[#f8f5f0] text-[#3c4c30], text-lg px-8 py-6)
```

---

### Quote Callout

Small floating card used on the home intro section:
```
div (absolute -bottom-6 -left-6, bg-white p-4 rounded shadow-md w-48, hidden md:block)
├── p (font-serif text-[#3c4c30] italic) — quote text
└── p (text-right text-sm mt-2 text-[#738c65]) — attribution
```

---

### Process Step (Services page)

Inline pattern — candidate for a reusable component:
```
div (flex items-start gap-4)
├── span (w-12 h-12 bg-[#738c65] rounded-full, flex items-center justify-center, text-white font-bold, shrink-0)
└── div
    ├── h3 (font-serif text-[#3c4c30])
    └── p (text-[#5a5a5a])
```

---

## Shadows & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | Small | Service cards (default) |
| `shadow-md` | Medium | Service cards (hover), quote callout |
| `rounded-md` | `0.375rem` | Cards, buttons, images, select inputs |
| `rounded-full` | Full circle | Process step number badges |

---

## Icons

Library: `lucide-react`

| Icon | Usage |
|------|-------|
| `Flower` | Logo mark, decorative |
| `Menu` / `X` | Mobile nav open/close |
| `ChevronRight` | Button arrow suffix |
| `Mail` | Footer contact |
| `Calendar` | Service card |
| `Palette` | Service card |
| `Scissors` | Service card |
| `FlowerIcon` | Service card |
| `Sprout` | Service card |
| `Shovel` | Service card |

Icon sizing: `h-4 w-4` (inline button icons), `h-5 w-5` (footer/nav), `h-6 w-6` (logo/header), `h-10 w-10` (service card feature icons)

---

## Imagery

- **Hero:** Full-bleed photo at `80vh` with `bg-black/30` overlay for text legibility
- **Portrait:** `aspect-[4/5]` or `aspect-square`, `object-cover`, `rounded-md`
- All images use `next/image` with explicit `sizes` and `quality` props
- Sizes: hero `100vw`, portrait `(max-width: 768px) 100vw, 50vw`
- Quality: hero `90`, portraits `85`

---

## Page Layout Pattern

Every page follows this shell:
```
div (flex min-h-screen flex-col)
├── <Header />
├── main (flex-1)
│   └── [page sections]
└── <Footer />
```

---

## Known Gaps (Design Decisions Needed)

> A fuller audit of these gaps — with severity, root causes, and a recommended
> sequence — lives in [`design-assessment.md`](./design-assessment.md).
> Font loading (formerly the largest gap) is resolved as of 2026-07-28.

1. **Error color** — `red-500` used for all form errors; consider a sage-adjacent warm red or define a brand `danger` color
2. **Focus ring** — inputs use default Tailwind `ring-ring`; should be `#738c65` to match brand
3. **Select inputs** — native `<select>` styled inline; should match `<Input />` visually
4. **Nav link font size** — desktop uses non-standard `text-[1.25rem]`; mobile uses `text-lg` — these should be unified
5. **Hero button size** — one-off `text-lg px-8 py-6`; a `size="lg"` button variant would formalize this
6. **Character counter / helper text color** — `gray-500` used; should use `#5a5a5a` or a dedicated muted token
7. **No Tailwind config tokens** — all brand colors are raw hex strings; should be added to `tailwind.config.ts` as named tokens for refactor-safety
8. **Philosophy cards vs ServiceCards** — visually similar but separate implementations; candidate for a shared `<FeatureCard />` component
9. **Process steps** — inline pattern in services page with no reusable component
10. **No defined `font-size` token for nav** — desktop and mobile nav sizes differ with no documented standard
