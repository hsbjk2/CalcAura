import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ClerkProvider,
  useAuth as useClerkAuth,
  useUser as useClerkUser,
  useClerk,
  UserButton,
  SignIn,
  SignUp,
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

export const PRESET_DEMO_USERS: UserProfile[] = [
  {
    id: 'user-himanshu-001',
    name: 'Himanshu',
    email: 'himanshuatsg@gmail.com',
    role: 'scholar',
    avatar: '👨‍🎓',
    grade: 'Advanced Mathematics',
    createdAt: 1729000000000,
  },
  {
    id: 'user-arjun-010',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@calcaura.io',
    role: 'student',
    avatar: '📚',
    grade: 'Class 10th Secondary',
    createdAt: 1729500000000,
  },
  {
    id: 'user-priya-012',
    name: 'Priya Patel',
    email: 'priya.patel@calcaura.io',
    role: 'scholar',
    avatar: '⚙️',
    grade: 'Engineering Applied Math',
    createdAt: 1729800000000,
  },
];

const LS_AUTH_USER = 'calcaura_auth_user_v1';
const LS_ACTIVE_UID = 'calcaura_active_user_id';

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isClerkActive: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, grade?: string, password?: string) => Promise<boolean>;
  loginAsDemo: (demoId?: string) => Promise<boolean>;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: (mode?: 'signin' | 'register', returnTo?: string) => void;
  closeAuthModal: () => void;
  authModalMode: 'signin' | 'register';
  returnToDestination: string | null;
  getClerkToken?: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========================================================
// 1. CLERK-POWERED AUTH IMPLEMENTATION
// ========================================================
const ClerkAuthBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded: clerkLoaded, isSignedIn, userId, getToken, signOut } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [returnToDestination, setReturnToDestination] = useState<string | null>(null);

  // Sync token callback with Supabase native third-party auth provider
  useEffect(() => {
    if (isSignedIn && userId) {
      setGlobalTokenProvider(async () => {
        try {
          const token = await getToken();
          return token || null;
        } catch (err) {
          console.warn('Failed to get Clerk JWT token for Supabase:', err);
          return null;
        }
      });
      localStorage.setItem(LS_ACTIVE_UID, userId);
    } else {
      setGlobalTokenProvider(null);
      localStorage.removeItem(LS_ACTIVE_UID);
    }
  }, [isSignedIn, userId, getToken]);

  const mappedUser: UserProfile | null = clerkUser
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
        grade:
          ((clerkUser.publicMetadata as Record<string, unknown>)?.grade as string) ||
          'Class 10th Secondary',
        createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).getTime() : Date.now(),
      }
    : null;

  const login = useCallback(async (_email: string, _password?: string): Promise<boolean> => {
    // In Clerk mode, redirect or modal opens Clerk's SignIn
    setAuthModalMode('signin');
    setAuthModalOpen(true);
    return true;
  }, []);

  const register = useCallback(
    async (_name: string, _email: string, _grade?: string, _password?: string): Promise<boolean> => {
      setAuthModalMode('register');
      setAuthModalOpen(true);
      return true;
    },
    []
  );

  const loginAsDemo = useCallback(async (demoId = 'user-himanshu-001'): Promise<boolean> => {
    // Keep 1-click preview demo functionality available
    const demo = PRESET_DEMO_USERS.find((u) => u.id === demoId) || PRESET_DEMO_USERS[0];
    localStorage.setItem(LS_ACTIVE_UID, demo.id);
    return true;
  }, []);

  const logout = useCallback(() => {
    signOut();
    localStorage.removeItem(LS_ACTIVE_UID);
    localStorage.removeItem(LS_AUTH_USER);
  }, [signOut]);

  const openAuthModal = useCallback((mode: 'signin' | 'register' = 'signin', returnTo = 'history') => {
    setAuthModalMode(mode);
    setReturnToDestination(returnTo);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: mappedUser,
        isAuthenticated: !!isSignedIn,
        isLoading: !clerkLoaded,
        isClerkActive: true,
        login,
        register,
        loginAsDemo,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        returnToDestination,
        getClerkToken: async () => {
          try {
            return await getToken();
          } catch {
            return null;
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================================
// 2. FALLBACK LOCAL AUTH IMPLEMENTATION (when Clerk key is pending)
// ========================================================
const FallbackAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [returnToDestination, setReturnToDestination] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_AUTH_USER);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProfile;
        if (parsed && parsed.id) {
          setUser(parsed);
          localStorage.setItem(LS_ACTIVE_UID, parsed.id);
        }
      }
    } catch (e) {
      console.warn('Failed to restore auth session:', e);
    } finally {
      const t = setTimeout(() => {
        setIsLoading(false);
      }, 50);
      return () => clearTimeout(t);
    }
  }, []);

  const login = useCallback(async (email: string, _password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const foundDemo = PRESET_DEMO_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
      let targetUser: UserProfile;

      if (foundDemo) {
        targetUser = foundDemo;
      } else {
        const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        targetUser = {
          id: 'user_' + Math.abs(hashCode(cleanEmail)),
          name: formattedName || 'Math Scholar',
          email: cleanEmail,
          role: 'student',
          avatar: '📐',
          grade: 'Class 10th Secondary',
          createdAt: Date.now(),
        };
      }

      setUser(targetUser);
      localStorage.setItem(LS_AUTH_USER, JSON.stringify(targetUser));
      localStorage.setItem(LS_ACTIVE_UID, targetUser.id);
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, grade = 'Class 10th Secondary', _password?: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        const cleanEmail = email.trim().toLowerCase();
        const newUser: UserProfile = {
          id: 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
          name: name.trim() || 'Math Scholar',
          email: cleanEmail,
          role: 'student',
          avatar: '🎓',
          grade: grade || 'Class 10th Secondary',
          createdAt: Date.now(),
        };

        setUser(newUser);
        localStorage.setItem(LS_AUTH_USER, JSON.stringify(newUser));
        localStorage.setItem(LS_ACTIVE_UID, newUser.id);
        setIsLoading(false);
        return true;
      } catch {
        setIsLoading(false);
        return false;
      }
    },
    []
  );

  const loginAsDemo = useCallback(async (demoId = 'user-himanshu-001'): Promise<boolean> => {
    setIsLoading(true);
    const demo = PRESET_DEMO_USERS.find((u) => u.id === demoId) || PRESET_DEMO_USERS[0];
    setUser(demo);
    localStorage.setItem(LS_AUTH_USER, JSON.stringify(demo));
    localStorage.setItem(LS_ACTIVE_UID, demo.id);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(LS_AUTH_USER);
      localStorage.removeItem(LS_ACTIVE_UID);
    } catch {}
  }, []);

  const openAuthModal = useCallback((mode: 'signin' | 'register' = 'signin', returnTo = 'history') => {
    setAuthModalMode(mode);
    setReturnToDestination(returnTo);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isClerkActive: false,
        login,
        register,
        loginAsDemo,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        returnToDestination,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================================
// 3. ROOT AUTH PROVIDER (Switches dynamically based on Clerk key)
// ========================================================
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const clerkReady = isClerkConfigured();

  if (clerkReady) {
    return (
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        appearance={getClerkAppearance(true)}
      >
        <ClerkAuthBridge>{children}</ClerkAuthBridge>
      </ClerkProvider>
    );
  }

  return <FallbackAuthProvider>{children}</FallbackAuthProvider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Simple deterministic hash for demo ID generation
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
