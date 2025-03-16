# Blooms By Beth - Coming Soon Page

This is a simple "under construction" page for Blooms By Beth, a floral business. The page features a sign-up form to collect email addresses from visitors who want to be notified when the site is fully launched.

## Features

- Responsive, mobile-friendly design
- Email collection form with validation
- Success message after submission
- Beautiful flower-themed aesthetics
- Email storage in Neon PostgreSQL database

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Neon PostgreSQL

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Database Configuration

1. Create a `.env.local` file in the root directory with your Neon database credentials:

```
NEON_DATABASE_URL=postgresql://your-username:your-password@your-neon-host/your-database-name
```

2. Replace the placeholder connection string with your actual Neon database credentials.

3. The API will automatically create a `subscribers` table if it doesn't exist.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This site is designed to be hosted at [bloomsbybethchs.com](https://bloomsbybethchs.com).

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Implementation Notes

The email collection form is now connected to a Neon PostgreSQL database. Here's how it works:

1. When a user submits their email, it's sent to an API endpoint (`/api/subscribe`)
2. The API validates the email and connects to your Neon database
3. If the table doesn't exist, it creates a `subscribers` table
4. The email is stored in the database with a timestamp
5. Duplicate emails are not stored again (handled by the `ON CONFLICT` clause)

For security and proper error handling:

- All database credentials are stored in environment variables
- The API includes proper error handling for failed submissions
- The form shows appropriate loading and error states
- SSL is enabled for secure database connections

### Accessing Stored Emails

To access the stored emails:

1. Log in to your Neon console at https://console.neon.tech/
2. Navigate to your project and database
3. Use the SQL Editor to run: `SELECT * FROM subscribers;`
4. You can export the results as needed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# blooms
