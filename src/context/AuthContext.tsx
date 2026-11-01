import React, { createContext, useContext, useEffect, useCallback } from 'react';
import {
  ClerkProvider,
  useAuth as useClerkAuth,
  useUser as useClerkUser,
} from '@clerk/clerk-react';
import { CLERK_PUBLISHABLE_KEY, isClerkConfigured, getClerkAppearance } from '../lib/clerkConfig.ts';
import { setGlobalTokenProvider } from '../lib/supabaseClient.ts';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'educator' | 'scholar';
  avatar?: string;
  grade?: string;
  createdAt: number;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  getClerkToken?: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LS_ACTIVE_UID = 'calcaura_active_user_id';
const LEGACY_LOCAL_AUTH_KEY = 'calcaura_auth_user_v1';

const ClerkAuthBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn, userId, getToken, signOut } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();

  // Supabase receives the authenticated Clerk session token. The Clerk user ID
  // is the only user identifier used for ownership and RLS filtering.
  useEffect(() => {
  if (!isLoaded) return;

  if (isSignedIn && userId) {
      setGlobalTokenProvider(async () => {
        try {
          return (await getToken()) || null;
        } catch (error) {
          console.error('Unable to obtain the Clerk session token for Supabase:', error);
          return null;
        }
      });
      try {
        window.localStorage.setItem(LS_ACTIVE_UID, userId);
        // Remove old insecure demo/local-auth identity left by previous builds.
        window.localStorage.removeItem(LEGACY_LOCAL_AUTH_KEY);
      } catch (error) {
        console.warn('Unable to update the local active-user cache:', error);
      }
    } else {
      setGlobalTokenProvider(null);
      try {
        window.localStorage.removeItem(LS_ACTIVE_UID);
        window.localStorage.removeItem(LEGACY_LOCAL_AUTH_KEY);
      } catch (error) {
        console.warn('Unable to clear the local active-user cache:', error);
      }
    }
  }, [isSignedIn, userId, getToken]);

  const user: UserProfile | null = clerkUser
    ? {
        id: clerkUser.id,
        name:
          clerkUser.fullName ||
          clerkUser.firstName ||
          clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] ||
          'Math Scholar',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        role: ((clerkUser.publicMetadata as Record<string, unknown>)?.role as UserProfile['role']) || 'scholar',
        avatar: clerkUser.imageUrl || '🎓',
        grade: ((clerkUser.publicMetadata as Record<string, unknown>)?.grade as string) || '',
        createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).getTime() : Date.now(),
      }
    : null;

  const logout = useCallback(() => {
    void signOut().catch((error) => {
      console.error('Clerk sign-out failed:', error);
    });
  }, [signOut]);

  const getClerkToken = useCallback(async () => {
    try {
      return (await getToken()) || null;
    } catch {
      return null;
    }
  }, [getToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(isSignedIn && user),
        isLoading: !isLoaded,
        logout,
        getClerkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Fail closed when the Clerk publishable key is missing. No fake local login,
// demo identity, or client-generated user ID is ever treated as authenticated.
const ClerkSetupRequired: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: null,
      isAuthenticated: false,
      isLoading: false,
      logout: () => undefined,
    }}
  >
    {children}
  </AuthContext.Provider>
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isClerkConfigured()) {
    return <ClerkSetupRequired>{children}</ClerkSetupRequired>;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={getClerkAppearance(true)}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/history"
      signUpFallbackRedirectUrl="/history"
    >
      <ClerkAuthBridge>{children}</ClerkAuthBridge>
    </ClerkProvider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
