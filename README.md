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
- **Note:** Currently sending from `onboarding@resend.dev`. To send from `noreply@bloomsbybethchs.com` instead, verify the domain at [resend.com/domains](https://resend.com/domains) and update the `from` field in `app/actions.ts`.

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
cp .env.local.example .env.local
# Then fill in your values

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Deployment

Deployment is automatic. Any push to the `main` branch on GitHub triggers a Vercel build and deployment.

To deploy manually:

```bash
git add .
git commit -m "Your message"
git push origin main
```

To push from the `v4` development branch to `main`:

```bash
git push origin v4:main --force
```

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
| `app/actions.ts` | Server actions — handles contact form submission (saves to DB + sends email) and newsletter signup |
| `components/contact-form.tsx` | Contact form UI component |
| `components/newsletter-signup.tsx` | Newsletter signup UI component |
| `app/sitemap.ts` | Auto-generated XML sitemap for SEO |
| `public/robots.txt` | Search engine crawl rules |
| `scripts/create-tables.mjs` | One-time script to set up the Neon database schema (`npm run db:setup`) |
| `tailwind.config.ts` | Brand colour tokens and the font family mapping — both required |
| `design-system.md` | The design system — colours, type, spacing, component rules |
| `design-assessment.md` | Design audit: what was found, what shipped, what remains |
| `next.config.ts` | Next.js configuration (image optimization, ESLint settings) |
