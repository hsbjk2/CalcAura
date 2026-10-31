import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth, PRESET_DEMO_USERS } from '../../context/AuthContext.tsx';

interface AuthModalProps {
  onSuccessRedirect?: (dest: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccessRedirect }) => {
  const {
    authModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    register,
    loginAsDemo,
    returnToDestination,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('Class 10th');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authModalMode === 'signin') {
      if (!email.trim()) {
        setErrorMsg('Please enter your email address');
        return;
      }
      setSubmitting(true);
      const ok = await login(email, password);
      setSubmitting(false);
      if (ok) {
        closeAuthModal();
        if (onSuccessRedirect) {
          onSuccessRedirect(returnToDestination || 'history');
        }
      } else {
        setErrorMsg('Authentication failed. Please verify your credentials.');
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address');
        return;
      }
      setSubmitting(true);
      const ok = await register(name, email, grade, password);
      setSubmitting(false);
      if (ok) {
        closeAuthModal();
        if (onSuccessRedirect) {
          onSuccessRedirect(returnToDestination || 'history');
        }
      } else {
        setErrorMsg('Registration failed. Please try again.');
      }
    }
  };

  const handleDemoSelect = async (demoId: string) => {
    setErrorMsg(null);
    setSubmitting(true);
    const ok = await loginAsDemo(demoId);
    setSubmitting(false);
    if (ok) {
      closeAuthModal();
      if (onSuccessRedirect) {
        onSuccessRedirect(returnToDestination || 'history');
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg bg-[#0F111E] text-white rounded-3xl border border-white/12 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/10 flex items-start justify-between relative bg-gradient-to-b from-white/[0.04] to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7957F5] to-[#D94BCB] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(121,87,245,0.4)]">
              <div className="w-full h-full bg-[#0E101D] rounded-[14px] flex items-center justify-center font-mono font-bold text-base text-white">
                ∑
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#A6A9B8]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CalcAura Secure Vault</span>
              </div>
              <h2 id="auth-modal-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {authModalMode === 'signin' ? 'Sign In to CalcAura' : 'Create Free Account'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 sm:px-6 pt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              openAuthModal('signin', returnToDestination || 'history');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authModalMode === 'signin'
                ? 'bg-[#7957F5] text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              openAuthModal('register', returnToDestination || 'history');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authModalMode === 'register'
                ? 'bg-[#7957F5] text-white shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick 1-Click Demo Profiles */}
          <div className="rounded-2xl p-3.5 bg-white/[0.03] border border-white/8 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Demo Profiles</span>
              </span>
              <span className="text-[10px] text-slate-400">Instant Access</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleDemoSelect(demo.id)}
                  disabled={submitting}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7957F5]/50 text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{demo.avatar}</span>
                    <span className="text-xs font-bold text-white group-hover:text-[#D94BCB] transition-colors truncate">
                      {demo.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">{demo.grade}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#0F111E] text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Or continue with credentials
            </span>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    required={authModalMode === 'register'}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7957F5] focus:ring-1 focus:ring-[#7957F5]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@calcaura.io"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7957F5] focus:ring-1 focus:ring-[#7957F5]"
                />
              </div>
            </div>

            {authModalMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Stage</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#181A2C] border border-white/10 text-xs text-white focus:outline-none focus:border-[#7957F5]"
                >
                  <option value="Class 10th">Class 10th Secondary</option>
                  <option value="Class 12th">Class 12th Senior Secondary</option>
                  <option value="Engineering">Engineering Applied Math</option>
                  <option value="Graduation">Graduation / Higher Math</option>
                  <option value="Middle School">Middle School (Classes 6–8)</option>
                  <option value="Classes 1–5">Junior (Classes 1–5)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7957F5] focus:ring-1 focus:ring-[#7957F5]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.99] text-white text-xs font-bold shadow-[0_0_20px_rgba(121,87,245,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
            >
              <span>{submitting ? 'Authenticating...' : authModalMode === 'signin' ? 'Sign In & Return to History' : 'Create Account & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center pt-2 border-t border-white/5">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Isolated User Vault · Private by Default · Never Public</span>
          </div>
        </div>
      </div>
    </div>
  );
};
