import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.VITE_SUPABASE_PROJECT_URL)) ||
  '';

export const SUPABASE_ANON_KEY =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
      import.meta.env?.VITE_SUPABASE_ANON_KEY ||
      import.meta.env?.VITE_SUPABASE_API_KEY)) ||
  '';

/**
 * Checks if Supabase credentials are configured with valid values.
 */
export function isSupabaseConfigured(): boolean {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  const url = SUPABASE_URL.trim();
  const key = SUPABASE_ANON_KEY.trim();
  if (
    url.includes('your-project-id') ||
    key.includes('your_supabase_anon_public_key') ||
    !url.startsWith('https://')
  ) {
    return false;
  }
  return true;
}

export type TokenProvider = () => Promise<string | null>;

let globalTokenProvider: TokenProvider | null = null;
let cachedClient: SupabaseClient | null = null;
let cachedTokenProvider: TokenProvider | null = null;

export function setGlobalTokenProvider(provider: TokenProvider | null) {
  globalTokenProvider = provider;
  // Invalidate cached client to use the new token provider
  cachedClient = null;
  cachedTokenProvider = null;
}

export function getActiveTokenProvider(): TokenProvider | null {
  return globalTokenProvider;
}

/**
 * Returns a configured Supabase client.
 * When integrated with Clerk Native Third-Party Auth, passes the active
 * Clerk JWT session token via the client's `accessToken` callback.
 */
export function getSupabaseClient(getToken?: TokenProvider): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const effectiveProvider = getToken || globalTokenProvider;

  // Reuse cached client if token provider reference is unchanged
  if (cachedClient && cachedTokenProvider === (effectiveProvider || null)) {
    return cachedClient;
  }

  cachedTokenProvider = effectiveProvider || null;

  cachedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'x-client-info': 'calcaura-clerk-supabase',
      },
    },
    accessToken: async () => {
      if (effectiveProvider) {
        try {
          const token = await effectiveProvider();
          return token || null;
        } catch (err) {
          console.warn('Error fetching Clerk token for Supabase client:', err);
          return null;
        }
      }
      return null;
    },
  });

  return cachedClient;
}

/**
 * Uploads a whiteboard image asset to Supabase Storage bucket 'whiteboard-assets'.
 * Path format: clerk_user_id/board_id/filename
 */
export async function uploadWhiteboardAsset(
  userId: string,
  boardId: string,
  file: Blob | File,
  filename: string,
  getToken?: TokenProvider
): Promise<{ path: string; url?: string } | null> {
  const supabase = getSupabaseClient(getToken);
  if (!supabase) return null;

  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${userId}/${boardId}/${Date.now()}_${sanitizedFilename}`;

  const { data, error } = await supabase.storage
    .from('whiteboard-assets')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error || !data) {
    console.error('Failed to upload whiteboard asset to Supabase:', error);
    return null;
  }

  // Generate a signed URL for private bucket access (valid for 24 hours)
  const { data: signedData } = await supabase.storage
    .from('whiteboard-assets')
    .createSignedUrl(data.path, 86400);

  return {
    path: data.path,
    url: signedData?.signedUrl,
  };
}
