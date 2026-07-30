# Blooms by Beth v4

A Next.js 15 marketing and inquiry website for Blooms by Beth, a Charleston-area garden design and landscaping business. Customers browse services and submit project inquiries via a contact form. Beth receives email notifications for each submission.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (see Conventions — disabled during build)
npm run db:setup # Initialize database tables (Neon)
```

`.claude/launch.json` starts the same dev server on **port 3100** for preview tooling, to
avoid colliding with anything already on 3000.

**Don't mix `npm run build` and `npm run dev` against the same `.next`** — in either order.
`next build` writes `.next/server/app/<route>/page.js` as a *file*; Turbopack dev expects
`page/` as a *directory* holding `app-build-manifest.json`. The two layouts collide, the dev
server throws `ENOENT` on its manifests, and **server actions stop dispatching — every POST
returns a 500 before your action body runs**. The tell is a 500 with none of your own
`console.error` output in the server log. Fix with `rm -rf .next`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.2.6, App Router, React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3 + shadcn/ui (New York style) |
| Icons | lucide-react |
| Validation | Zod |
| Database | Neon PostgreSQL (serverless) |
| Email | Resend API |
| Hosting | Vercel (bloomsbybethchs.com) |

## Architecture

```
app/
  layout.tsx          # Root layout — metadata, fonts, viewport themeColor
  page.tsx            # Home: hero, intro, services overview, newsletter
  about/page.tsx      # Beth's bio and philosophy cards
  services/page.tsx   # Service offerings with process steps
  contact/page.tsx    # Contact form (renders <ContactForm />)
  portfolio/page.tsx  # Project gallery — NOT linked in nav (see BLO-28)
  privacy-policy/     # Legal
  terms/              # Legal
  error.tsx           # Error boundary
  loading.tsx         # Loading state
  globals.css         # Tailwind layers + shadcn CSS variables (--ring is sage)
  actions.ts          # Server actions: submitContactForm, subscribeToNewsletter
  sitemap.ts          # Auto-generated XML sitemap

components/
  ui/                 # button, card, input, select, separator, sheet, textarea
  header.tsx          # Sticky nav, active-route indicator, mobile Sheet drawer
  footer.tsx          # Footer with nav links and social icons
  contact-form.tsx    # Client component — 13 fields in 3 fieldsets
  newsletter-signup.tsx  # Client component — email capture
  service-card.tsx    # Icon + title + description display (left-aligned)
  testimonial-card.tsx   # Quote card — BUILT BUT NEVER RENDERED (see BLO-33)
  social-links.tsx    # Social media icon links

design-system.md      # The intended design system — read before visual changes
design-assessment.md  # Audit findings, what shipped, what remains

lib/
  db.ts               # Neon SQL client singleton
  email.ts            # Resend email helper
  utils.ts            # cn() — Tailwind class merging (clsx + tailwind-merge)

types/
  index.ts            # ContactFormData, ContactFormResult (the action's contract), ServiceItem

scripts/
  create-tables.mjs   # One-time DB schema setup script
```

## Data Flow

1. User fills out `<ContactForm />` (client component)
2. Form calls `submitContactForm(formData)` server action in `app/actions.ts`
3. Action validates with Zod, inserts into Neon `contact_messages` table
4. Action sends HTML email to `NOTIFICATION_EMAIL` via Resend API
5. `revalidatePath("/contact")` clears the route cache

Newsletter signup follows the same pattern but writes to `subscribers` table (no email sent).

### The action returns its errors — it never throws

`submitContactForm` returns `ContactFormResult` (`types/index.ts`), a discriminated union:
`{ success: true }`, or `{ success: false, error, fieldErrors? }`. `fieldErrors` is Zod's
`flatten().fieldErrors`, keyed off `ContactFormData` so error keys cannot drift from field
names. `ContactForm` feeds it into `validationErrors`, and each of the 13 fields renders its
own message plus a `border-red-500` ring via `getFieldError`.

**Do not go back to throwing here.** A throw inside a server action reaches the browser as an
HTTP 500 and an opaque "An unexpected response was received from the server" — the field
detail never crosses the boundary. That shipped: a message under 10 characters returned a 500
on the live site, and the per-field rendering above was unreachable dead code, because the
errors were logged server-side and discarded. Invalid input now returns **200**, so any
alerting on 5xx from `/contact` will not see validation failures.

One failure mode this does *not* cover: `lib/db.ts` calls `neon(process.env.DATABASE_URL!)` at
module scope, and `neon()` throws at *construction* when the string is missing. That throw is
upstream of the action's `try`/`catch`, so a missing `DATABASE_URL` is still an uncatchable
500. The `!` is the only thing hiding it at compile time.

### Email failures are silent

`lib/email.ts` does `await fetch(...)` to Resend and never inspects the response. Any
rejection — revoked key, unverified sending domain, rate limit — is discarded: the lead is
still saved to Neon, but no notification goes out and nothing is logged. If notifications are
reported missing, suspect this before suspecting the form. Sending is from
`noreply@bloomsbybethchs.com`, which requires that domain to be verified in Resend.

## Environment Variables

Required in `.env.local` (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `RESEND_API_KEY` | Resend email API key |
| `NOTIFICATION_EMAIL` | Recipient of form submission alerts — currently `sean@bloomsbybethchs.com`, not Beth's own address |

**There is one Neon database, shared by local development and production.** There is no
separate dev branch or seed database, so a form submission from `localhost` writes a real row
to `contact_messages` alongside genuine customer inquiries — which is the concrete reason for
the "don't submit a test lead" rule under Conventions. Verify structurally instead.

The same three variables must also be set on the production Vercel project (see below); they
are not inferred from `.env.local`.

## Database Schema

**`contact_messages`** — one row per contact form submission  
Fields: `id`, `first_name`, `last_name`, `email`, `phone`, `street`, `city`, `state`, `zip`, `property_type`, `project_timeframe`, `budget_range`, `contact_method`, `message`, `created_at`

**`subscribers`** — newsletter email list  
Fields: `id`, `email` (unique), `created_at`

## Design System

Full reference: **[`design-system.md`](./design-system.md)** (the intended system) and
**[`design-assessment.md`](./design-assessment.md)** (audit findings, what was fixed, what
remains). Read those before making visual changes.

### Colors — use tokens, never raw hex

Defined in `tailwind.config.ts`. Arbitrary values like `text-[#3c4c30]` should not appear
in components.

| Token | Value | Usage |
|-------|-------|-------|
| `sage-dark` | `#3c4c30` | Headings, footer background, logo wordmark |
| `sage` | `#738c65` | Buttons, accents, icons |
| `sage-hover` | `#5d7251` | Button hover states |
| `body` | `#5a5a5a` | Paragraph text |
| `beige` | `#f8f5f0` | Section backgrounds, card fills |
| `sage-pale` | `#f0f4eb` | Alternate backgrounds, icon fills |

Usage: `text-sage-dark`, `bg-sage`, `hover:bg-sage-hover`, `text-body`, `bg-beige`.
Opacity modifiers work normally (`text-sage/30`).

One exception: `app/layout.tsx` sets `themeColor: '#738c65'` in its `Viewport` export.
That is a metadata string, not a class, so it stays a literal and must be hand-synced.

### Typography

**Cormorant Garamond** (weights 300–700) for headings via `font-serif`; **Geist Sans**
for body via `font-sans`. Both load through `next/font/google` in `app/layout.tsx` **and
must be mapped to Tailwind's `serif`/`sans` keys in `tailwind.config.ts`** — without that
mapping the CSS variables are defined but never consumed and both fonts silently fall
back to system defaults. That exact bug shipped undetected for months; see
`design-assessment.md`.

### Section padding — three tiers only

| Tier | Classes | Use for |
|------|---------|---------|
| Band | `py-20 md:py-28` | Page-opening bands (Services header, Portfolio top) |
| Primary | `py-16 md:py-24` | Main content sections |
| Compact | `py-12 md:py-16` | Secondary sections |

### Other conventions

- **Cards are left-aligned** — icon, title and body. No centered card text.
- **Focus rings** come from `--ring` in `globals.css`, set to sage. Every shadcn control
  inherits it via `ring-ring`; don't override per-component.
- **Nav** is `text-base` everywhere; the active route gets `sage-dark` + a sage underline
  and `aria-current="page"`.

## Conventions

- **Server components by default.** Add `"use client"` only for interactive forms (ContactForm, NewsletterSignup) and the Header nav.
- **`cn()` from `@/lib/utils`** for all conditional Tailwind class merging.
- **Server actions** handle all form submissions — no API route handlers.
- **Server actions return structured results; they never throw.** A throw becomes a 500 plus
  an opaque client-side error, and any detail you computed is lost. Return
  `{ success: false, ... }` instead. See Data Flow.
- **Zod schemas** live in `app/actions.ts` alongside the actions that use them.
- **shadcn/ui** components go in `components/ui/`; custom components go in `components/`.
- **Path alias:** `@/` maps to the project root.
- **`components/ui/select.tsx` is a native `<select>`, not Radix.** Deliberate: these fields
  submit through `FormData` on the lead-capture path, and native selects give phones their
  own picker. Don't swap it for `@radix-ui/react-select` without weighing that.
- **The contact form is the business's only lead path.** If you change it, verify every
  `name` attribute still matches what `app/actions.ts` reads from `FormData`. Don't submit
  a test lead to verify — it writes a row and emails Beth.
- **ESLint is disabled during build** (`next.config.ts`). `npm run lint` reports numerous
  pre-existing `react/no-unescaped-entities` errors; they don't block deploys.

## External Services

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| Vercel | Hosting, CI/CD | vercel.com |
| Neon | PostgreSQL database | console.neon.tech |
| Resend | Transactional email | resend.com |
| GitHub | Source control | github.com |

### Which Vercel project is production

**`bloomsbybethchs.com` is served by the Vercel project `blooms-1hgv`**
(`prj_CRMIA5IKHqMlYadPWZPQYKPf3uKC`). Nothing in the project name suggests it, and the repo
directory is named `blooms-by-beth-v4`, so verify before acting on any production question.

Several Vercel projects have historically been connected to this same GitHub repo
(`mcgintysean88/blooms`, branch `main`) from repeated imports and v0 exports; while
connected, a single push deploys all of them. Only `blooms-1hgv` holds the custom domain and
a full set of environment variables. Any such duplicate serves a public, indexable copy of
the site, and one lacking `DATABASE_URL` returns a 500 on *every* contact-form submission:
`lib/db.ts` calls `neon(process.env.DATABASE_URL!)` at module scope, and `neon()` throws at
construction when the string is missing. That throw is upstream of the try/catch in
`submitContactForm`, so no amount of error handling inside the action can absorb it — the
non-null assertion on `DATABASE_URL!` is the only thing hiding it at compile time.

The practical consequence: **Vercel CLI and MCP calls default to whatever
`.vercel/project.json` is linked to, which is not necessarily production.** A link pointed at
the wrong project makes `vercel env ls` report "No Environment Variables found" — true of
that project, and badly misleading about the live site. Confirm the link, or target the
project explicitly:

```bash
VERCEL_ORG_ID=team_ieVWn8P18PB9P3qypxH533LI VERCEL_PROJECT_ID=prj_CRMIA5IKHqMlYadPWZPQYKPf3uKC vercel env ls
```

`main` auto-deploys to production on Vercel, so a push to `main` updates the live site.

When diagnosing a production error, reach for Vercel's aggregated **runtime errors** rather
than runtime logs — log retention is roughly 1h on Hobby and 1 day on Pro, so the failure is
usually already gone by the time you look, while the error table retains about 7 days.
