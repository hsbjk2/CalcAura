
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  ClerkProvider,
  useAuth as useClerkAuth,
  useUser as useClerkUser,
} from '@clerk/clerk-react';

import {
  CLERK_PUBLISHABLE_KEY,
  isClerkConfigured,
  getClerkAppearance,
} from '../lib/clerkConfig.ts';

import {
  setGlobalTokenProvider,
} from '../lib/supabaseClient.ts';

// ==========================================
// USER PROFILE
// ==========================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'educator' | 'scholar';
  avatar?: string;
  grade?: string;
  createdAt: number;
}

// ==========================================
// AUTH CONTEXT TYPE
// ==========================================

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isClerkActive: boolean;

  login: (email: string, password?: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    grade?: string,
    password?: string
  ) => Promise<boolean>;

  logout: () => void;

  authModalOpen: boolean;
  openAuthModal: (
    mode?: 'signin' | 'register',
    returnTo?: string
  ) => void;
  closeAuthModal: () => void;

  authModalMode: 'signin' | 'register';
  returnToDestination: string | null;

  getClerkToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// ==========================================
// CLERK AUTHENTICATION
// ==========================================

const ClerkAuthBridge: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const {
    isLoaded: clerkLoaded,
    isSignedIn,
    userId,
    getToken,
    signOut,
  } = useClerkAuth();

  const { user: clerkUser } = useClerkUser();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [authModalMode, setAuthModalMode] = useState<
    'signin' | 'register'
  >('signin');

  const [returnToDestination, setReturnToDestination] =
    useState<string | null>(null);

  // ==========================================
  // CONNECT CLERK JWT TO SUPABASE
  // ==========================================

  useEffect(() => {

    if (!clerkLoaded) return;

    if (isSignedIn && userId) {

      // This is the real Clerk user ID.
      // It is only a cache identifier, not an authentication mechanism.
      localStorage.setItem(
        'calcaura_active_user_id',
        userId
      );

      setGlobalTokenProvider(async () => {
        try {
          const token = await getToken();
          return token || null;
        } catch (error) {
          console.error(
            'Unable to get Clerk token:',
            error
          );
          return null;
        }
      });

    } else {

      setGlobalTokenProvider(null);

      localStorage.removeItem(
        'calcaura_active_user_id'
      );
    }

    return () => {
      setGlobalTokenProvider(null);
    };

  }, [clerkLoaded, isSignedIn, userId, getToken]);

  // ==========================================
  // MAP REAL CLERK USER
  // ==========================================

  const mappedUser: UserProfile | null = clerkUser
    ? {
        id: clerkUser.id,

        name:
          clerkUser.fullName ||
          clerkUser.firstName ||
          clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] ||
          'User',

        email:
          clerkUser.primaryEmailAddress?.emailAddress || '',

        role:
          (
            clerkUser.publicMetadata as Record<string, unknown>
          )?.role as UserProfile['role'] || 'student',

        avatar: clerkUser.imageUrl,

        grade:
          (
            clerkUser.publicMetadata as Record<string, unknown>
          )?.grade as string || '',

        createdAt: clerkUser.createdAt
          ? new Date(clerkUser.createdAt).getTime()
          : Date.now(),
      }
    : null;

  // ==========================================
  // CLERK SIGN-IN / SIGN-UP ACTIONS
  // ==========================================

  const openAuthModal = useCallback(
    (
      mode: 'signin' | 'register' = 'signin',
      returnTo = 'history'
    ) => {
      setAuthModalMode(mode);
      setReturnToDestination(returnTo);
      setAuthModalOpen(true);
    },
    []
  );

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  // These compatibility methods open the Clerk UI.
  // They do NOT authenticate users using local email/password.

  const login = useCallback(
    async (
      _email: string,
      _password?: string
    ): Promise<boolean> => {
      openAuthModal('signin');
      return true;
    },
    [openAuthModal]
  );

  const register = useCallback(
    async (
      _name: string,
      _email: string,
      _grade?: string,
      _password?: string
    ): Promise<boolean> => {
      openAuthModal('register');
      return true;
    },
    [openAuthModal]
  );

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = useCallback(() => {
    void signOut();
  }, [signOut]);

  // ==========================================
  // CONTEXT PROVIDER
  // ==========================================

  return (
    <AuthContext.Provider
      value={{
        user: mappedUser,

        isAuthenticated: !!isSignedIn,

        isLoading: !clerkLoaded,

        isClerkActive: true,

        login,
        register,
        logout,

        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        returnToDestination,

        getClerkToken: async () => {
          try {
            return (await getToken()) || null;
          } catch (error) {
            console.error(
              'Unable to retrieve Clerk token:',
              error
            );
            return null;
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// ROOT AUTH PROVIDER
// CLERK ONLY - NO DEMO OR LOCAL FALLBACK
// ==========================================

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  if (!isClerkConfigured()) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#f8fafc',
          color: '#1e293b',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ maxWidth: '480px', textAlign: 'center' }}>
          <h2>Authentication Not Configured</h2>

          <p>
            CALCAURA requires Clerk authentication.
            Add your Clerk Publishable Key to the
            .env.local file and restart the application.
          </p>

          <code>
            VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
          </code>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={getClerkAppearance(true)}
    >
      <ClerkAuthBridge>
        {children}
      </ClerkAuthBridge>
    </ClerkProvider>
  );
};

// ==========================================
// USE AUTH HOOK
// ==========================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}
