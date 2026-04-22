# Blooms by Beth v4

A Next.js 15 marketing and inquiry website for Blooms by Beth, a Charleston-area garden design and landscaping business. Customers browse services and submit project inquiries via a contact form. Beth receives email notifications for each submission.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run db:setup # Initialize database tables (Neon)
```

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
  layout.tsx          # Root layout — metadata, fonts, Header/Footer
  page.tsx            # Home: hero, services overview, testimonials, newsletter
  about/page.tsx      # Beth's bio and philosophy
  services/page.tsx   # Service offerings with process steps
  contact/page.tsx    # Contact form (renders <ContactForm />)
  portfolio/page.tsx  # Project gallery
  privacy-policy/     # Legal
  terms/              # Legal
  actions.ts          # Server actions: submitContactForm, subscribeToNewsletter
  sitemap.ts          # Auto-generated XML sitemap

components/
  ui/                 # shadcn/ui base components (button, card, input, etc.)
  header.tsx          # Sticky nav with mobile Sheet drawer
  footer.tsx          # Footer with nav links and social icons
  contact-form.tsx    # Client component — 13-field inquiry form
  newsletter-signup.tsx  # Client component — email capture
  service-card.tsx    # Icon + title + description display
  testimonial-card.tsx   # Quote card
  social-links.tsx    # Social media icon links

lib/
  db.ts               # Neon SQL client singleton
  email.ts            # Resend email helper
  utils.ts            # cn() — Tailwind class merging (clsx + tailwind-merge)

types/
  index.ts            # Shared TypeScript types (ContactFormData, ServiceItem, etc.)

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

## Environment Variables

Required in `.env.local` (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `RESEND_API_KEY` | Resend email API key |
| `NOTIFICATION_EMAIL` | Beth's email — receives form submission alerts |

## Database Schema

**`contact_messages`** — one row per contact form submission  
Fields: `id`, `first_name`, `last_name`, `email`, `phone`, `street`, `city`, `state`, `zip`, `property_type`, `project_timeframe`, `budget_range`, `contact_method`, `message`, `created_at`

**`subscribers`** — newsletter email list  
Fields: `id`, `email` (unique), `created_at`

## Design System

Colors are hardcoded Tailwind hex values throughout components — no CSS variable aliases:

| Token | Value | Usage |
|-------|-------|-------|
| Dark sage | `#3c4c30` | Headings, dark text |
| Mid sage | `#738c65` | Buttons, accents, icons |
| Hover sage | `#5d7251` | Button hover states |
| Body text | `#5a5a5a` | Paragraph text |
| Warm beige | `#f8f5f0` | Section backgrounds |
| Light green | `#f0f4eb` | Alternate backgrounds |

Typography: serif font (Playfair Display / Geist Serif) for headings, sans-serif for body.

## Conventions

- **Server components by default.** Add `"use client"` only for interactive forms (ContactForm, NewsletterSignup) and the Header nav.
- **`cn()` from `@/lib/utils`** for all conditional Tailwind class merging.
- **Server actions** handle all form submissions — no API route handlers.
- **Zod schemas** live in `app/actions.ts` alongside the actions that use them.
- **shadcn/ui** components go in `components/ui/`; custom components go in `components/`.
- **Path alias:** `@/` maps to the project root.

## External Services

| Service | Purpose | Dashboard |
|---------|---------|-----------|
| Vercel | Hosting, CI/CD | vercel.com |
| Neon | PostgreSQL database | console.neon.tech |
| Resend | Transactional email | resend.com |
| GitHub | Source control | github.com |

`main` branch auto-deploys to production on Vercel.
