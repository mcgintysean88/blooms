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

All brand colors are defined as named tokens in `tailwind.config.ts`. **Use the token,
never a raw hex.** Arbitrary values — `text-[#3c4c30]` and friends — should not appear
in components. Use `text-sage-dark` instead.

### Brand Colors

| Name | Token | Hex | Purpose |
|------|-------|-----|---------|
| Dark Sage | `sage-dark` | `#3c4c30` | Headings, footer background, logo wordmark |
| Mid Sage | `sage` | `#738c65` | Buttons (default), icons, accents, success states |
| Hover Sage | `sage-hover` | `#5d7251` | Button hover state |
| Body Text | `body` | `#5a5a5a` | Paragraph text, secondary content |
| Warm Beige | `beige` | `#f8f5f0` | Section backgrounds, hero CTA button hover |
| Light Green | `sage-pale` | `#f0f4eb` | Alternate section backgrounds, icon backgrounds |

Usage: `text-sage-dark`, `bg-sage`, `hover:bg-sage-hover`, `text-body`, `bg-beige`,
`bg-sage-pale`. Opacity modifiers work as normal — `text-sage/30`, `bg-beige/50`.

**Exception:** `app/layout.tsx` sets `themeColor: '#738c65'` in the `Viewport` export.
That is a plain metadata string, not a Tailwind class, so it cannot use a token and
must be kept in sync with `sage` by hand.

### Utility Colors

| Value | Where Used | Status |
|-------|-----------|--------|
| `red-500` | Form error states, error messages | Not in brand palette — open (FM-4) |
| `gray-200` | Contact page section divider | Neutral; the one call site if a brand border colour is defined |
| `border-input` | Input / Select / Textarea borders | shadcn token, intentionally neutral |
| `black/30` | Hero image overlay | Acceptable utility use |
| `white/80`, `white/70` | Footer text opacity | Acceptable on dark background |

### Background Usage Rule

- **`beige`** — Use for primary section backgrounds and card fills (intro section, philosophy cards)
- **`sage-pale`** — Use for alternate section backgrounds and icon container fills
- These two should alternate to create visual rhythm between sections

### Hover State Rule

- **Navigation links** → hover to `sage`
- **Buttons** → hover to `sage-hover`
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
| Large body copy | `text-lg` + `leading-relaxed` | default | `body` |
| Standard body | `text-base` | default | `body` |
| Form labels | `text-sm` | `font-medium` | `sage-dark` |
| Error messages | `text-xs` | default | `red-500` (gap — needs brand color) |
| Caption / meta | `text-sm` | default | `white/70` or `body` |
| Character counter | `text-xs` | default | `body` |

### Nav Link

- `text-base font-medium` on both desktop and in the mobile drawer
- Inactive: `text-body hover:text-sage`
- Active (current route): `text-sage-dark` + `underline decoration-sage decoration-2 underline-offset-8`, with `aria-current="page"`

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

Three tiers, and only these three. Pick by the section's role, not by feel.

| Tier | Classes | Use for |
|------|---------|---------|
| **Band** | `py-20 md:py-28` | Full-width page-opening bands (Services dark header, Portfolio top) |
| **Primary** | `py-16 md:py-24` | Main content sections (About, Terms, Privacy, home intro, Services process) |
| **Compact** | `py-12 md:py-16` | Secondary sections (home services grid, home newsletter) |

The Band tier was previously an undocumented `py-20 md:py-32`, which left visible
dead space above the Services heading. Trimmed to `md:py-28` and documented here.

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
bg-sage hover:bg-sage-hover text-white
```

**Primary on dark / inverted**
```
bg-white hover:bg-beige text-sage-dark
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
**Select** — `components/ui/select.tsx`, a **native** `<select>` styled to match `<Input />`
(same height, border, radius, padding). Deliberately native, not a Radix listbox: these
fields submit via `FormData` and native selects give phones their own picker. The
placeholder option is muted via `invalid:text-muted-foreground`.

**Field anatomy:**
```
<div class="space-y-2">
  <label class="text-sm font-medium text-sage-dark" />
  <Input class="w-full [border-red-500 if error]" />
  <p class="text-red-500 text-xs mt-1" />  ← error message
</div>
```

**Select field anatomy:**
```
<Select name="..." required defaultValue="">   ← matches <Input /> metrics
  <option value="">Select a …</option>          ← muted while :invalid
  ...
</Select>
```

**Error state (current gap):** Uses generic `red-500` — not brand-aligned.  
**Focus state:** `focus-visible:ring-ring`, where `--ring` is sage `#738c65`. Resolved 2026-07-29.

---

### Service Card

```
Card (border-none, shadow-sm, hover:shadow-md, transition-shadow)
└── CardContent (p-6)
    ├── Icon (h-10 w-10 text-sage)
    ├── H3 (text-xl font-serif text-sage-dark)
    └── p (text-body)
```

**Alignment rule:** cards are left-aligned throughout — icon, title and body.
Mixing a centered icon/title with left-aligned body copy (the previous state) reads
as a mistake, and centered body copy is harder to scan. Philosophy cards on the
About page follow the same rule.

Available icons: `FlowerIcon`, `Calendar`, `Palette`, `Scissors`, `Sprout`, `Shovel`

---

### Philosophy Card (About page)

```
div (bg-beige p-6 rounded-md)
├── H3 (text-xl font-serif text-sage-dark mb-3)
└── p (text-body)
```

Note: This is structurally similar to ServiceCard but implemented inline — candidate for extraction into a shared component.

---

### Header

```
header (sticky top-0 z-50, bg-white/80 backdrop-blur-md, border-b border-border/40)
└── container (h-16, flex, items-center, justify-between, px-4)
    ├── Logo (Flower icon + serif wordmark, text-sage / text-sage-dark)
    ├── Desktop nav (hidden md:flex, gap-4) — links text-body hover:text-sage
    └── Mobile Sheet (md:hidden) — Sheet drawer from right, same nav links
```

---

### Footer

```
footer (bg-sage-dark text-white)
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
    └── Button (bg-white hover:bg-beige text-sage-dark, text-lg px-8 py-6)
```

---

### Quote Callout

Small floating card used on the home intro section:
```
div (absolute -bottom-6 -left-6, bg-white p-4 rounded shadow-md w-48, hidden md:block)
├── p (font-serif text-sage-dark italic) — quote text
└── p (text-right text-sm mt-2 text-sage) — attribution
```

---

### Process Step (Services page)

Inline pattern — candidate for a reusable component:
```
div (flex items-start gap-4)
├── span (w-12 h-12 bg-sage rounded-full, flex items-center justify-center, text-white font-bold, shrink-0)
└── div
    ├── h3 (font-serif text-sage-dark)
    └── p (text-body)
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
2. ~~**Focus ring**~~ — resolved: `--ring` is now sage `#738c65`, so every shadcn control focuses to brand
3. ~~**Select inputs**~~ — resolved: `components/ui/select.tsx` matches `<Input />`
4. ~~**Nav link font size**~~ — resolved: both are `text-base`
5. **Hero button size** — one-off `text-lg px-8 py-6`; a `size="lg"` button variant would formalize this
6. ~~**Character counter / helper text color**~~ — resolved: now uses the `body` token
7. ~~**No Tailwind config tokens**~~ — resolved: brand palette is tokenised in `tailwind.config.ts`
8. **Philosophy cards vs ServiceCards** — visually similar but separate implementations; candidate for a shared `<FeatureCard />` component
9. **Process steps** — inline pattern in services page with no reusable component
10. ~~**No defined `font-size` token for nav**~~ — resolved: nav is `text-base` everywhere
