# CALCAURA

CALCAURA is a mathematics and STEM learning workspace built with React, TypeScript, and Vite. Account authentication is handled by Clerk; submitted practice attempts and manually saved whiteboards are stored in Supabase under the authenticated Clerk user ID.

## Local setup

**Prerequisites:** Node.js 22.12+ (Node.js 22 LTS recommended) and npm.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and add your real Clerk and Supabase public client values:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```
3. Configure Clerk as a Third-Party Auth provider in your Supabase project and apply `supabase/migrations/20261031_calcaura_clerk_supabase.sql` in the Supabase SQL Editor. See `SUPABASE_CLERK_SETUP.md`.
4. Start the app:
   ```bash
   npm run dev
   ```

## Validation

```bash
npm run lint
npm test
npm run build
```

## Authentication and data

- Clerk is the only sign-in provider. There is no demo-login or client-generated local account fallback.
- The Clerk user ID (`sub`) is used as the ownership key for Supabase history rows.
- Interactive practice results are saved after final submission.
- Whiteboards are saved to cloud history only when the user explicitly selects Save or Save As.
- Supabase Row Level Security policies isolate each user's records.

Never commit `.env.local`, Clerk Secret Keys, or Supabase Secret/service-role keys. Add the three `VITE_` client variables separately in Vercel Project Settings → Environment Variables.
