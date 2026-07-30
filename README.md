# Blooms by Beth

A professional website for Blooms by Beth, a garden design and planting service based in Mount Pleasant, SC, serving the greater Charleston Lowcountry. Built with Next.js 15, TypeScript, and Tailwind CSS and deployed on Vercel.

**Live site:** [bloomsbybethchs.com](https://bloomsbybethchs.com)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero image, intro, services overview, newsletter signup |
| `/about` | About Beth — biography, philosophies, community involvement |
| `/services` | Services — detailed service descriptions, what we don't do, 3-step process |
| `/portfolio` | Portfolio — project gallery. **Not linked from nav or footer** — reachable only by direct URL until a fuller portfolio exists |
| `/contact` | Contact — detailed inquiry form |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives) |
| Validation | Zod |
| Icons | Lucide React |

---

## Services

### Vercel — Hosting & Deployment
- **URL:** [vercel.com](https://vercel.com)
- **Purpose:** Hosts the production website. Automatically redeploys whenever code is pushed to the `main` branch on GitHub.
- **Plan:** Free (Hobby)
- **Repo connection:** `github.com/mcgintysean88/blooms` → `main` branch
- **Production project:** **`blooms-1hgv`** — the project holding `bloomsbybethchs.com`. The name signals nothing, and until 2026-07-29 three other projects were also connected to this repo, so one push deployed public duplicate copies of the site. Those were deleted. Confirm `.vercel/project.json` points at `blooms-1hgv` before trusting any `vercel` command; see CLAUDE.md → *Which Vercel project is production*.
- **Log retention is ~1 hour on Hobby.** To investigate a production error after the fact, use Vercel's aggregated runtime **errors** view, which retains about 7 days, rather than runtime logs.

### GitHub — Source Control
- **URL:** [github.com/mcgintysean88/blooms](https://github.com/mcgintysean88/blooms)
- **Purpose:** Stores the codebase. Pushing to `main` triggers a Vercel deployment automatically.
- **Active branch:** `main`

### Neon — Database (PostgreSQL)
- **URL:** [neon.tech](https://neon.tech)
- **Purpose:** Serverless Postgres database that stores two types of data:
  - `contact_messages` — every contact form submission (name, address, property type, budget, message, etc.)
  - `subscribers` — email addresses from newsletter signups
- **Plan:** Free tier
- **Connection:** via `DATABASE_URL` environment variable

### Resend — Transactional Email
- **URL:** [resend.com](https://resend.com)
- **Purpose:** Sends an email notification to `sean@bloomsbybethchs.com` every time someone submits the contact form. The email includes the full submission details in a formatted table.
- **Plan:** Free tier (100 emails/day, 3,000/month)
- **Sending address:** `noreply@bloomsbybethchs.com`, set in the `from` field of **`lib/email.ts`** (not `app/actions.ts`). This requires `bloomsbybethchs.com` to be verified at [resend.com/domains](https://resend.com/domains).
- **⚠️ Failures are silent.** `lib/email.ts` awaits the `fetch` to Resend but never checks the response. A revoked key, an unverified domain or a rate limit is discarded without logging: the inquiry is still saved to Neon, but no notification is sent and nothing surfaces the problem. If Beth reports missing notifications, check here first — the form itself may be working fine.
- **Known:** the `RESEND_API_KEY` in the local `.env.local` returns **401** from the Resend API (checked 2026-07-29). That is either a revoked key or one scoped to sending-only, which cannot be told apart without sending a message. Production holds its own separate key. Worth confirming that notifications are actually arriving.

---

## Environment Variables

These must be set in `.env.local` for local development and in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Description | Where to find it |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string | Neon dashboard → your project → Connection string |
| `RESEND_API_KEY` | Resend API key for sending emails | Resend dashboard → API Keys |
| `NOTIFICATION_EMAIL` | Email address that receives contact form alerts | Currently `sean@bloomsbybethchs.com` |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local
# Then fill in your values

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Preview tooling starts
the same server on port **3100** instead, via `.claude/launch.json`.

> **The database is shared with production.** There is no separate dev database — submitting
> the contact form locally writes a real row to `contact_messages` next to genuine customer
> inquiries, and attempts a real notification email. Don't use live submissions as a test.

> **Never run `npm run build` and `npm run dev` against the same `.next` directory**, in either
> order. The production and dev build layouts are incompatible, and the result is that every
> server action POST returns a 500 before your code runs. `rm -rf .next` clears it.

---

## Deployment

Deployment is automatic. Any push to the `main` branch on GitHub triggers a Vercel build and deployment.

To deploy manually:

```bash
git add .
git commit -m "Your message"
git push origin main
```

> **Removed:** this section used to recommend `git push origin v4:main --force` to promote the
> `v4` branch. **Do not do that.** `v4` is long abandoned — `main` currently holds 14 commits
> that `v4` does not, and a force-push would destroy all of them. Work happens directly on
> `main`, or on a branch merged into it.

---

## Project Structure

```
/app              — Pages and server actions (Next.js App Router)
/components       — Reusable React components
/components/ui    — shadcn/ui base components (select.tsx is native, not Radix)
/public           — Static assets (images, favicon, robots.txt)
/lib              — Utility functions
/scripts          — One-off maintenance scripts (DB setup)
/types            — Shared TypeScript types
```

---

## Key Files

| File | Purpose |
|---|---|
| `app/actions.ts` | Server actions — contact form submission (saves to DB + sends email) and newsletter signup. Zod schemas live here. Returns errors as values; never throws |
| `components/contact-form.tsx` | Contact form UI — 13 fields in 3 fieldsets, renders per-field validation errors |
| `types/index.ts` | Shared types, incl. `ContactFormResult` — the contract between the action and the form |
| `lib/db.ts` | Neon client singleton. Calls `neon()` at module scope, so a missing `DATABASE_URL` throws on import |
| `lib/email.ts` | Resend helper. Holds the `from` address; **ignores the API response** |
| `components/newsletter-signup.tsx` | Newsletter signup UI component |
| `app/sitemap.ts` | Auto-generated XML sitemap for SEO |
| `public/robots.txt` | Search engine crawl rules |
| `scripts/create-tables.mjs` | One-time script to set up the Neon database schema (`npm run db:setup`) |
| `tailwind.config.ts` | Brand colour tokens and the font family mapping — both required |
| `design-system.md` | The design system — colours, type, spacing, component rules |
| `design-assessment.md` | Design audit: what was found, what shipped, what remains |
| `next.config.ts` | Next.js configuration (image optimization, ESLint settings) |
