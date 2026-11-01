import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  History,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Trash2,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  Edit2,
  Copy,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  X,
  FileCheck,
  Layout,
  Download,
  Check,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  PracticeHistoryEntry,
  SavedWhiteboardEntry,
  listPracticeHistory,
  deletePracticeHistoryEntry,
  clearAllPracticeHistory,
  listSavedWhiteboards,
  renameSavedWhiteboard,
  duplicateSavedWhiteboard,
  deleteSavedWhiteboard,
} from '../../data/historyStorage.ts';
import { Notebook } from '../Whiteboard/types.ts';
import { PracticeQuestion } from '../../data/practiceQuestionsData.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { CinematicHistoryLanding } from './CinematicHistoryLanding.tsx';

interface HistoryPageProps {
  onOpenWhiteboard: (notebook: Notebook) => void;
  onReviewPracticeAttempt: (entry: PracticeHistoryEntry) => void;
  onRetryPracticeQuestions: (questions: PracticeQuestion[], title: string) => void;
  onNavigateToPractice: () => void;
  onNavigateToWhiteboard: () => void;
  onNavigateToAuth?: (mode: 'sign-in' | 'sign-up') => void;
  darkMode: boolean;
}

type TabType = 'practice' | 'whiteboard';
type DateFilterType = 'all' | 'today' | '7days' | '30days';

const getSubmittedAnswer = (
  entry: PracticeHistoryEntry | null | undefined,
  q: any,
  idx: number
): number | undefined => {
  if (!entry) return undefined;
  const map: any = entry.userAnswers || entry.submittedAnswers || {};
  // Check index first
  if (map[idx] !== undefined && map[idx] !== null) return Number(map[idx]);
  if (map[String(idx)] !== undefined && map[String(idx)] !== null) return Number(map[String(idx)]);
  // Check question id
  if (q?.id !== undefined && map[q.id] !== undefined && map[q.id] !== null) return Number(map[q.id]);
  if (q?.id !== undefined && map[String(q.id)] !== undefined && map[String(q.id)] !== null) return Number(map[String(q.id)]);
  return undefined;
};

const getCorrectAnswer = (q: any): number => {
  if (q?.correctIdx !== undefined) return Number(q.correctIdx);
  if (q?.correctAnswer !== undefined) return Number(q.correctAnswer);
  return -1;
};

const getQuestionText = (q: any): string => {
  return q?.problem || q?.question || 'Question';
};

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onOpenWhiteboard,
  onReviewPracticeAttempt,
  onRetryPracticeQuestions,
  onNavigateToPractice,
  onNavigateToWhiteboard,
  onNavigateToAuth,
  darkMode,
}) => {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('practice');
  const [practiceEntries, setPracticeEntries] = useState<PracticeHistoryEntry[]>([]);
  const [whiteboards, setWhiteboards] = useState<SavedWhiteboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');

  // Modals & Confirmation dialogs
  const [reviewModalEntry, setReviewModalEntry] = useState<PracticeHistoryEntry | null>(null);
  const [deletePracticeId, setDeletePracticeId] = useState<string | null>(null);
  const [clearPracticeConfirmOpen, setClearPracticeConfirmOpen] = useState<boolean>(false);
  const [deleteWhiteboardId, setDeleteWhiteboardId] = useState<string | null>(null);
  const [renameWhiteboardEntry, setRenameWhiteboardEntry] = useState<SavedWhiteboardEntry | null>(null);
  const [renameInput, setRenameInput] = useState<string>('');

  // Load all history entries from IndexedDB for the authenticated user
  const loadHistory = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setPracticeEntries([]);
      setWhiteboards([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [pList, wList] = await Promise.all([
        listPracticeHistory(user.id),
        listSavedWhiteboards(user.id),
      ]);
      setPracticeEntries(pList);
      setWhiteboards(wList);
    } catch (err) {
      console.error('Failed to load history data:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Date filter helper
  const filterByDate = (timestamp: number, filter: DateFilterType): boolean => {
    if (filter === 'all') return true;
    const now = Date.now();
    const diff = now - timestamp;
    if (filter === 'today') return diff <= 24 * 60 * 60 * 1000;
    if (filter === '7days') return diff <= 7 * 24 * 60 * 60 * 1000;
    if (filter === '30days') return diff <= 30 * 24 * 60 * 60 * 1000;
    return true;
  };

  // Filtered Practice Entries
  const filteredPracticeEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return practiceEntries.filter((item) => {
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.classGrade && item.classGrade.toLowerCase().includes(q)) ||
        (item.chapter && item.chapter.toLowerCase().includes(q));
      const matchDate = filterByDate(item.submittedAt, dateFilter);
      return matchSearch && matchDate;
    });
  }, [practiceEntries, searchQuery, dateFilter]);

  // Filtered Saved Whiteboards
  const filteredWhiteboards = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return whiteboards.filter((item) => {
      const matchSearch = !q || item.name.toLowerCase().includes(q);
      const matchDate = filterByDate(item.lastSavedAt, dateFilter);
      return matchSearch && matchDate;
    });
  }, [whiteboards, searchQuery, dateFilter]);

  // Format timestamp helper
  const formatDateTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format time taken helper
  const formatSeconds = (sec?: number) => {
    if (!sec || sec <= 0) return null;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  // Handle Practice Deletion
  const handleDeletePracticeEntry = async (id: string) => {
    await deletePracticeHistoryEntry(id);
    setPracticeEntries((prev) => prev.filter((p) => p.id !== id));
    setDeletePracticeId(null);
  };

  // Handle Clear All Practice History
  const handleClearAllPractice = async () => {
    await clearAllPracticeHistory();
    setPracticeEntries([]);
    setClearPracticeConfirmOpen(false);
  };

  // Handle Whiteboard Deletion
  const handleDeleteWhiteboard = async (id: string) => {
    await deleteSavedWhiteboard(id);
    setWhiteboards((prev) => prev.filter((w) => w.id !== id));
    setDeleteWhiteboardId(null);
  };

  // Handle Whiteboard Duplication
  const handleDuplicateWhiteboard = async (id: string) => {
    const copy = await duplicateSavedWhiteboard(id);
    if (copy) {
      setWhiteboards((prev) => [copy, ...prev]);
    }
  };

  // Handle Whiteboard Rename
  const handleRenameConfirm = async () => {
    if (!renameWhiteboardEntry || !renameInput.trim()) return;
    const updated = await renameSavedWhiteboard(renameWhiteboardEntry.id, renameInput.trim());
    if (updated) {
      setWhiteboards((prev) =>
        prev.map((w) => (w.id === updated.id ? updated : w))
      );
    }
    setRenameWhiteboardEntry(null);
    setRenameInput('');
  };

  // Export board document directly
  const handleExportBoardData = (entry: SavedWhiteboardEntry) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entry.notebook, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${entry.name.replace(/\s+/g, '_')}.calcaura.json`);
    dlAnchor.click();
  };

  // Loading state while verifying authentication
  if (authLoading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-10 h-10 rounded-2xl border-3 border-[#7957F5] border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Verifying CalcAura Secure Session...</p>
      </div>
    );
  }

  // Dedicated Cinematic Login-Required Introduction Page when not logged in
  if (!isAuthenticated || !user) {
    return (
      <CinematicHistoryLanding
        onSignIn={() => {
          if (onNavigateToAuth) onNavigateToAuth('sign-in');
          else window.location.assign('/sign-in');
        }}
        onRegister={() => {
          if (onNavigateToAuth) onNavigateToAuth('sign-up');
          else window.location.assign('/sign-up');
        }}
      />
    );
  }

  return (
    <div className="min-h-[85vh] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-10 h-10 rounded-2xl bg-[#7957F5]/10 border border-[#7957F5]/30 flex items-center justify-center text-[#7957F5]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  History
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Vault Connected
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Your completed practice and saved creative work.
              </p>
            </div>
          </div>
        </div>

        {/* User Status Bar & Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Authenticated User Chip */}
          <<div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 max-w-[280px] min-w-0">

  {user.avatar && /^https?:\/\//i.test(user.avatar) ? (
    <img
      src={user.avatar}
      alt={`${user.name}'s profile`}
      className="w-9 h-9 rounded-full object-cover shrink-0"
      referrerPolicy="no-referrer"
    />
  ) : (
    <span className="text-xl w-9 h-9 flex items-center justify-center shrink-0">
      {user.avatar || '🎓'}
    </span>
  )}

  <div className="text-left min-w-0 flex-1">
    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
      {user.name}
    </div>
    <div className="text-[10px] font-mono text-slate-400 truncate">
      {user.email}
    </div>
  </div>

  <button
    onClick={logout}
    className="ml-1 p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0"
    title="Sign Out"
    aria-label="Sign Out"
  >
    <LogOut className="w-3.5 h-3.5" />
  </button>

</div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 self-start sm:self-auto">
            <button
              onClick={() => {
                setActiveTab('practice');
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-[#1E1E22] text-[#7957F5] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Interactive Practice</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                  activeTab === 'practice'
                    ? 'bg-[#7957F5]/10 text-[#7957F5]'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >
                {practiceEntries.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('whiteboard');
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'whiteboard'
                  ? 'bg-white dark:bg-[#1E1E22] text-[#7957F5] shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Saved Whiteboards</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                  activeTab === 'whiteboard'
                    ? 'bg-[#7957F5]/10 text-[#7957F5]'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                }`}
              >
                {whiteboards.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'practice'
                  ? 'Search by sheet title, class, or chapter...'
                  : 'Search saved whiteboards by name...'
              }
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-[#18181B] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#7957F5] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Date Range Filter */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
              className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-[#18181B]">All Time</option>
              <option value="today" className="dark:bg-[#18181B]">Today</option>
              <option value="7days" className="dark:bg-[#18181B]">Past 7 Days</option>
              <option value="30days" className="dark:bg-[#18181B]">Past 30 Days</option>
            </select>
          </div>

          {/* Practice Tab: Clear All Button */}
          {activeTab === 'practice' && practiceEntries.length > 0 && (
            <button
              onClick={() => setClearPracticeConfirmOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
              title="Clear all completed practice sheets"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* CONTENT LIST */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-3 border-[#7957F5] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loading history...</p>
        </div>
      ) : activeTab === 'practice' ? (
        /* ================= TAB 1: PRACTICE SHEETS ================= */
        filteredPracticeEntries.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-8 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#7957F5] mx-auto mb-4">
              <FileCheck className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              You haven't completed any practice sheets yet.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Solve interactive questions in the Practice Exam & Worksheet section. Your submitted tests, scores, and step proofs will appear here automatically.
            </p>
            <button
              onClick={onNavigateToPractice}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start a Practice Sheet</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPracticeEntries.map((entry) => {
              const incorrectQuestions = (entry.questions || []).filter((q, idx) => {
                const sub = getSubmittedAnswer(entry, q, idx);
                const corr = getCorrectAnswer(q);
                return sub !== undefined && sub !== null && sub !== corr;
              });

              const isPerfect = entry.percentage >= 90;
              const isPassing = entry.percentage >= 60;
              const gradeTag = entry.classGrade || entry.stageLabel || 'Practice';
              const chapterTag = entry.chapter || entry.classChapter;

              return (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-[#18181B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all p-4.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: tags and score badge */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {gradeTag && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#7957F5]/10 text-[#7957F5]">
                            {gradeTag}
                          </span>
                        )}
                        {chapterTag && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 truncate max-w-36">
                            {chapterTag}
                          </span>
                        )}
                      </div>

                      <div
                        className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 shrink-0 ${
                          isPerfect
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                            : isPassing
                            ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
                        }`}
                      >
                        <span>{entry.score}/{entry.totalQuestions}</span>
                        <span className="text-[10px] opacity-80">({entry.percentage}%)</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2">
                      {entry.title}
                    </h4>

                    {/* Metadata stats */}
                    <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] text-[11px] mb-3">
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{entry.correctCount} Correct</span>
                      </div>
                      <div className="flex items-center gap-1 text-rose-500 dark:text-rose-400 font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{entry.incorrectCount} Wrong</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatSeconds(entry.timeTakenSeconds || entry.timeSpentSeconds) || `${(entry.questions || []).length} Qs`}</span>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>Submitted: {formatDateTime(entry.submittedAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setReviewModalEntry(entry)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Review Sheet</span>
                    </button>

                    {incorrectQuestions.length > 0 && (
                      <button
                        onClick={() =>
                          onRetryPracticeQuestions(
                            incorrectQuestions,
                            `Retry Mistakes: ${entry.title}`
                          )
                        }
                        className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 transition-colors cursor-pointer"
                        title={`Retry ${incorrectQuestions.length} incorrect question(s) in a new attempt`}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setDeletePracticeId(entry.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete attempt from history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* ================= TAB 2: SAVED WHITEBOARDS ================= */
        filteredWhiteboards.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-8 max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-3xl bg-[#7957F5]/10 border border-[#7957F5]/20 flex items-center justify-center text-[#7957F5] mx-auto mb-4">
              <Layout className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              No saved whiteboards yet. Create a board and click Save to see it here.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Whiteboards are only added to your permanent history when you explicitly click the Save button. Draft edits or unsaved boards will not clutter your history.
            </p>
            <button
              onClick={onNavigateToWhiteboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Layout className="w-4 h-4" />
              <span>Open Whiteboard Workspace</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWhiteboards.map((entry) => (
              <div
                key={entry.id}
                className="bg-white dark:bg-[#18181B] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Thumbnail */}
                <div
                  onClick={() => onOpenWhiteboard(entry.notebook)}
                  className="h-36 bg-slate-100 dark:bg-black/30 border-b border-slate-100 dark:border-white/5 relative flex items-center justify-center overflow-hidden cursor-pointer group-hover:opacity-95 transition-opacity"
                >
                  {entry.thumbnail ? (
                    <img
                      src={entry.thumbnail}
                      alt={entry.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-400">
                      <Layout className="w-8 h-8 opacity-40" />
                      <span className="text-[11px] font-medium font-mono">CalcAura Canvas</span>
                    </div>
                  )}

                  {/* Sheet Count Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1">
                    <Layers className="w-3 h-3 text-purple-300" />
                    <span>{entry.sheetCount} {entry.sheetCount === 1 ? 'Sheet' : 'Sheets'}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4
                        onClick={() => onOpenWhiteboard(entry.notebook)}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#7957F5] dark:hover:text-[#9b7eff] transition-colors cursor-pointer truncate"
                        title={entry.name}
                      >
                        {entry.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-4">
                      <Clock className="w-3 h-3" />
                      <span>Last saved: {formatDateTime(entry.lastSavedAt)}</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-1.5">
                    <button
                      onClick={() => onOpenWhiteboard(entry.notebook)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Board</span>
                    </button>

                    <button
                      onClick={() => {
                        setRenameWhiteboardEntry(entry);
                        setRenameInput(entry.name);
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      title="Rename board"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDuplicateWhiteboard(entry.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      title="Duplicate board"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleExportBoardData(entry)}
                      className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      title="Download board document (.json)"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setDeleteWhiteboardId(entry.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Delete saved whiteboard"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ================= MODAL: PRACTICE REVIEW ================= */}
      {reviewModalEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#7957F5]/10 text-[#7957F5]">
                    {reviewModalEntry.classGrade || reviewModalEntry.stageLabel || 'Practice'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDateTime(reviewModalEntry.submittedAt)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {reviewModalEntry.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#7957F5]">
                    {reviewModalEntry.score} / {reviewModalEntry.totalQuestions}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {reviewModalEntry.percentage}% Accuracy
                  </div>
                </div>

                <button
                  onClick={() => setReviewModalEntry(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {(reviewModalEntry.questions || []).map((q: any, idx: number) => {
                const submitted = getSubmittedAnswer(reviewModalEntry, q, idx);
                const correct = getCorrectAnswer(q);
                const isCorrect = submitted !== undefined && submitted === correct;
                const isUnanswered = submitted === undefined || submitted === null;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : isUnanswered
                        ? 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Q{idx + 1}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isCorrect
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                            : isUnanswered
                            ? 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                            : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </>
                        ) : isUnanswered ? (
                          'Unanswered'
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    {/* Question Text */}
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 leading-relaxed">
                      {getQuestionText(q)}
                    </p>

                    {/* Options list */}
                    {q.options && q.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt: string, oIdx: number) => {
                          const isOptionSubmitted = submitted === oIdx;
                          const isOptionCorrect = correct === oIdx;

                          let optStyle =
                            'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300';
                          if (isOptionCorrect) {
                            optStyle =
                              'bg-emerald-100/70 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold';
                          } else if (isOptionSubmitted && !isOptionCorrect) {
                            optStyle =
                              'bg-rose-100/70 dark:bg-rose-900/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 line-through';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] opacity-70">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isOptionCorrect && (
                                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              )}
                              {isOptionSubmitted && !isOptionCorrect && (
                                <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step-by-Step Explanation */}
                    {q.explanation && (
                      <div className="mt-3 p-3 rounded-xl bg-purple-50/70 dark:bg-[#7957F5]/10 border border-purple-200 dark:border-[#7957F5]/20 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-[#7957F5] block mb-1">
                          Step-by-Step Explanation:
                        </span>
                        <p className="leading-relaxed whitespace-pre-line">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-white/[0.02]">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Total questions: {(reviewModalEntry.questions || []).length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currentEntry = reviewModalEntry;
                    setReviewModalEntry(null);
                    onReviewPracticeAttempt(currentEntry);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Worksheet</span>
                </button>

                {reviewModalEntry.incorrectCount > 0 && (
                  <button
                    onClick={() => {
                      const incorrectQuestions = (reviewModalEntry.questions || []).filter((q: any, idx: number) => {
                        const sub = getSubmittedAnswer(reviewModalEntry, q, idx);
                        const corr = getCorrectAnswer(q);
                        return sub !== undefined && sub !== null && sub !== corr;
                      });
                      onRetryPracticeQuestions(
                        incorrectQuestions,
                        `Retry: ${reviewModalEntry.title}`
                      );
                      setReviewModalEntry(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Incorrect ({reviewModalEntry.incorrectCount})</span>
                  </button>
                )}

                <button
                  onClick={() => setReviewModalEntry(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RENAME WHITEBOARD ================= */}
      {renameWhiteboardEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <button
              onClick={() => setRenameWhiteboardEntry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4 text-[#7957F5]">
              <div className="w-10 h-10 rounded-2xl bg-[#7957F5]/10 border border-[#7957F5]/20 flex items-center justify-center">
                <Edit2 className="w-5 h-5 text-[#7957F5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Rename Whiteboard
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update title in saved whiteboard history
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                autoFocus
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameConfirm();
                  if (e.key === 'Escape') setRenameWhiteboardEntry(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#7957F5]"
              />

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRenameWhiteboardEntry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRenameConfirm}
                  disabled={!renameInput.trim()}
                  className="px-5 py-2 rounded-xl bg-[#7957F5] hover:bg-[#6846E3] disabled:opacity-40 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Title
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE PRACTICE CONFIRMATION ================= */}
      {deletePracticeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-3 text-rose-500">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Delete Practice Attempt?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Are you sure you want to delete this completed practice sheet entry? This record and its submitted answers cannot be recovered.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeletePracticeId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePracticeEntry(deletePracticeId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CLEAR ALL PRACTICE CONFIRMATION ================= */}
      {clearPracticeConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-3 text-rose-500">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Clear All Practice History?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              This will permanently delete all {practiceEntries.length} completed practice sheet records and answers. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setClearPracticeConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllPractice}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Practice Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE WHITEBOARD CONFIRMATION ================= */}
      {deleteWhiteboardId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-3xl border border-slate-200 dark:border-white/12 shadow-2xl p-6 relative">
            <div className="flex items-center gap-3 mb-3 text-rose-500">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Delete Saved Whiteboard?
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Are you sure you want to delete this saved whiteboard from history? Its sheets, drawings, and canvas data will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeleteWhiteboardId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWhiteboard(deleteWhiteboardId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Whiteboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
