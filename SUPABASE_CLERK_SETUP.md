# CalcAura: Clerk Authentication + Supabase Native Third-Party Auth Integration Guide

This guide details the end-to-end architecture and setup instructions for connecting **Clerk Authentication** (identity provider) with **Supabase Database & Storage** (data backend) in CalcAura.

---

## 1. Architecture Overview

- **Clerk (`@clerk/clerk-react`)**:
  - Handles single sign-on (SSO), Google OAuth, email verification, user profile management, session tokens, and sign-out.
  - Generates signed RS256 JSON Web Tokens (JWT) where the authenticated user's ID is stored in the standard `sub` (subject) claim.
  - Dedicated routes: `/sign-in`, `/sign-up`, and `/history`.

- **Supabase (`@supabase/supabase-js`)**:
  - Stores user data: `practice_attempts`, `saved_whiteboards`, and file attachments in the `whiteboard-assets` storage bucket.
  - Uses **Native Third-Party Auth** (Supabase native JWT verification against the Clerk JWKS endpoint).
  - Supplies the session token directly via the Supabase client `accessToken` callback:
    ```ts
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      accessToken: async () => {
        // Obtains the active Clerk session JWT
        return (await clerk.session?.getToken()) || null;
      },
    });
    ```
  - **Row Level Security (RLS)** strictly verifies ownership on all tables and storage assets using:
    ```sql
    (auth.jwt() ->> 'sub') = user_id
    ```

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env` and fill in your keys:

```bash
# Clerk Authentication Publishable Key (from https://dashboard.clerk.com)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase Project URL and Anon/Publishable Key (from https://supabase.com/dashboard)
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
```

> **Security Note**: Never expose the Clerk Secret Key (`sk_live_...` or `sk_test_...`) or the Supabase Service Role key in frontend code or repository commits.

---

## 3. Supabase Dashboard Configuration (Native Third-Party Auth)

Do **NOT** create a custom JWT template. Instead, use Supabase's native Third-Party Auth:

1. Open your **Supabase Dashboard** -> Select your Project.
2. In the left navigation, go to **Authentication** -> **Third-Party Auth**.
3. Click **Add Provider** and select **Clerk**.
4. In the Clerk dashboard, navigate to **API Keys** -> **Clerk Domain** / **Frontend API URL** (e.g. `clerk.your-domain.com` or `https://<subdomain>.clerk.accounts.dev`).
5. Paste this domain into Supabase's Clerk Provider settings.
6. Save changes. Supabase will now automatically download Clerk's JWKS and validate JWTs signed by your Clerk instance.

---

## 4. Applying the SQL Database & Storage Migration

A complete SQL migration script is located at:
`supabase/migrations/20261031_calcaura_clerk_supabase.sql`

To apply the migration:
1. Go to **Supabase Dashboard** -> **SQL Editor**.
2. Click **New Query**.
3. Copy and paste the entire contents of `supabase/migrations/20261031_calcaura_clerk_supabase.sql`.
4. Click **Run**.

### Schema Summary:
1. **`practice_attempts` Table**:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `user_id TEXT NOT NULL` (matches Clerk `sub` ID, indexed)
   - `title TEXT NOT NULL`
   - `class_level TEXT NOT NULL`
   - `chapter TEXT`
   - `score INTEGER NOT NULL`
   - `total_questions INTEGER NOT NULL`
   - `percentage NUMERIC(5,2) NOT NULL`
   - `correct_count INTEGER NOT NULL`
   - `incorrect_count INTEGER NOT NULL`
   - `unanswered_count INTEGER NOT NULL`
   - `time_spent_seconds INTEGER NOT NULL`
   - `questions_data JSONB NOT NULL` (questions, options, explanations, correct answers)
   - `user_answers JSONB NOT NULL` (user's chosen answers)
   - `submitted_at TIMESTAMPTZ DEFAULT now()`
   - **RLS Enabled**:
     - `SELECT`, `INSERT`, `UPDATE`, `DELETE` permitted only when `(auth.jwt() ->> 'sub') = user_id`.

2. **`saved_whiteboards` Table**:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - `user_id TEXT NOT NULL` (matches Clerk `sub` ID, indexed)
   - `title TEXT NOT NULL`
   - `sheet_count INTEGER NOT NULL DEFAULT 1`
   - `thumbnail_url TEXT`
   - `notebook_data JSONB NOT NULL` (pages, strokes, shapes, text, grids, camera state)
   - `created_at TIMESTAMPTZ DEFAULT now()`
   - `updated_at TIMESTAMPTZ DEFAULT now()`
   - **RLS Enabled**:
     - `SELECT`, `INSERT`, `UPDATE`, `DELETE` permitted only when `(auth.jwt() ->> 'sub') = user_id`.

3. **`whiteboard-assets` Storage Bucket**:
   - Private bucket for whiteboard images, diagrams, and asset uploads.
   - Organized by user folder: `${clerk_user_id}/${board_id}/${filename}`.
   - **Storage RLS Policies**:
     - User can view, upload, update, and delete files inside their own `${clerk_user_id}/*` prefix.

---

## 5. Client Implementation Architecture

1. **`src/lib/supabaseClient.ts`**:
   - Initializes the Supabase client using dynamic `accessToken` callback.
   - Exposes `setGlobalTokenProvider()` which connects Clerk's `getToken()` into Supabase RPC and queries.

2. **`src/context/AuthContext.tsx`**:
   - Seamlessly wraps `<ClerkProvider>` with CalcAura's custom dark theme (`getClerkAppearance`).
   - Listens to Clerk user and session status (`useClerkAuth()`, `useClerkUser()`).
   - When authenticated, registers the JWT token callback with the Supabase client and syncs the active user ID with localStorage.
   - On sign-out, clears the token provider, active user ID, and cleans up local caches.
   - Includes graceful fallback for preview/testing environments before real API keys are configured.

3. **`src/data/historyStorage.ts` & `src/data/supabaseHistoryService.ts`**:
   - Dual-persistence engine: Local IndexedDB for instant, zero-latency offline loading and offline-first responsiveness, seamlessly synced with remote Supabase cloud storage.
   - Practice attempts are saved **only upon final test submission** with detailed explanations, scoring, and questions. They are never saved beforehand, preventing test leaks.
   - Whiteboard saves are **strictly manual** (user presses "Save" or "Save As..."), preventing unintended storage bloat.

---

## 6. Verification Checklist

- [x] Clerk prebuilt `<SignIn />` and `<SignUp />` styled with CalcAura dark obsidian theme.
- [x] Dedicated `/sign-in` and `/sign-up` routes preserved with fallback redirect to `/history`.
- [x] Desktop navbar updated with Clerk `<UserButton />`.
- [x] Logged-out History view displays cinematic preview page with locked vault indicators and Sign In / Register buttons.
- [x] Logged-in History view displays the user's completed practice attempts and saved whiteboards fetched from Supabase.
- [x] All 46 unit test suites pass (`npm test`).
