-- ==============================================================================
-- CALCAURA — SUPABASE DATABASE & STORAGE SCHEMA FOR CLERK AUTHENTICATION
-- ==============================================================================
-- Native Third-Party Auth Integration:
-- Supabase automatically validates Clerk JWTs when configured in Third-Party Auth.
-- The authenticated user ID is obtained via: auth.jwt() ->> 'sub'
-- ==============================================================================

-- 1. PRACTICE ATTEMPTS TABLE
-- Stores submitted interactive practice sheets with detailed question snapshots,
-- submitted choices, correct answers, scores, and step-by-step explanations.
CREATE TABLE IF NOT EXISTS public.practice_attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    class_level TEXT,
    chapter TEXT,
    score NUMERIC(5,2) NOT NULL DEFAULT 0,
    max_score NUMERIC(5,2) NOT NULL DEFAULT 0,
    percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    incorrect_count INTEGER NOT NULL DEFAULT 0,
    unanswered_count INTEGER NOT NULL DEFAULT 0,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    stage_id TEXT,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    submitted_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_practice_attempts_user_id ON public.practice_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_submitted_at ON public.practice_attempts(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_user_submitted ON public.practice_attempts(user_id, submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;

-- Practice Attempts Policies (Strict Clerk sub user isolation)
DROP POLICY IF EXISTS "Users can view their own practice attempts" ON public.practice_attempts;
CREATE POLICY "Users can view their own practice attempts"
ON public.practice_attempts FOR SELECT
USING ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can insert their own practice attempts" ON public.practice_attempts;
CREATE POLICY "Users can insert their own practice attempts"
ON public.practice_attempts FOR INSERT
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can update their own practice attempts" ON public.practice_attempts;
CREATE POLICY "Users can update their own practice attempts"
ON public.practice_attempts FOR UPDATE
USING ((auth.jwt() ->> 'sub') = user_id)
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can delete their own practice attempts" ON public.practice_attempts;
CREATE POLICY "Users can delete their own practice attempts"
ON public.practice_attempts FOR DELETE
USING ((auth.jwt() ->> 'sub') = user_id);


-- 2. SAVED WHITEBOARDS TABLE
-- Stores explicitly saved whiteboard documents (manual save only).
-- Large image assets are extracted to Supabase Storage, preserving slim document JSON.
CREATE TABLE IF NOT EXISTS public.saved_whiteboards (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    sheet_count INTEGER NOT NULL DEFAULT 1,
    document JSONB NOT NULL DEFAULT '{}'::jsonb,
    thumbnail_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_saved_whiteboards_user_id ON public.saved_whiteboards(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_whiteboards_updated_at ON public.saved_whiteboards(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_whiteboards_user_updated ON public.saved_whiteboards(user_id, updated_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.saved_whiteboards ENABLE ROW LEVEL SECURITY;

-- Saved Whiteboards Policies (Strict Clerk sub user isolation)
DROP POLICY IF EXISTS "Users can view their own saved whiteboards" ON public.saved_whiteboards;
CREATE POLICY "Users can view their own saved whiteboards"
ON public.saved_whiteboards FOR SELECT
USING ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can insert their own saved whiteboards" ON public.saved_whiteboards;
CREATE POLICY "Users can insert their own saved whiteboards"
ON public.saved_whiteboards FOR INSERT
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can update their own saved whiteboards" ON public.saved_whiteboards;
CREATE POLICY "Users can update their own saved whiteboards"
ON public.saved_whiteboards FOR UPDATE
USING ((auth.jwt() ->> 'sub') = user_id)
WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved whiteboards" ON public.saved_whiteboards;
CREATE POLICY "Users can delete their own saved whiteboards"
ON public.saved_whiteboards FOR DELETE
USING ((auth.jwt() ->> 'sub') = user_id);


-- 3. SUPABASE STORAGE BUCKET: whiteboard-assets
-- Private bucket for storing whiteboard diagrams, images, and visual artifacts.
-- Path organization: clerk_user_id/board_id/filename

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'whiteboard-assets',
    'whiteboard-assets',
    false,
    15728640, -- 15MB file size limit
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 15728640;

-- Storage RLS Policies: enforce user isolation based on path folder matching Clerk sub
DROP POLICY IF EXISTS "Users can read their own whiteboard assets" ON storage.objects;
CREATE POLICY "Users can read their own whiteboard assets"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'whiteboard-assets'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

DROP POLICY IF EXISTS "Users can upload their own whiteboard assets" ON storage.objects;
CREATE POLICY "Users can upload their own whiteboard assets"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'whiteboard-assets'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

DROP POLICY IF EXISTS "Users can update their own whiteboard assets" ON storage.objects;
CREATE POLICY "Users can update their own whiteboard assets"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'whiteboard-assets'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);

DROP POLICY IF EXISTS "Users can delete their own whiteboard assets" ON storage.objects;
CREATE POLICY "Users can delete their own whiteboard assets"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'whiteboard-assets'
    AND (storage.foldername(name))[1] = (auth.jwt() ->> 'sub')
);
