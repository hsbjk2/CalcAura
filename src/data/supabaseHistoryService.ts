import { getSupabaseClient, isSupabaseConfigured, TokenProvider } from '../lib/supabaseClient.ts';
import { PracticeHistoryEntry, SavedWhiteboardEntry } from './historyStorage.ts';

export interface DatabasePracticeAttemptRow {
  id: string;
  user_id: string;
  title: string;
  class_level: string | null;
  chapter: string | null;
  score: number;
  max_score: number;
  percentage: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  duration_seconds: number;
  stage_id: string | null;
  questions: any;
  submitted_answers: any;
  submitted_at: string;
}

export interface DatabaseSavedWhiteboardRow {
  id: string;
  user_id: string;
  name: string;
  sheet_count: number;
  document: any;
  thumbnail_path: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Maps a frontend PracticeHistoryEntry to Supabase practice_attempts row
 */
export function toSupabasePracticeRow(entry: PracticeHistoryEntry, userId: string): DatabasePracticeAttemptRow {
  return {
    id: entry.id,
    user_id: userId,
    title: entry.title,
    class_level: entry.classGrade || entry.stageLabel || null,
    chapter: entry.chapter || entry.classChapter || null,
    score: entry.score,
    max_score: entry.totalQuestions,
    percentage: entry.percentage,
    correct_count: entry.correctCount,
    incorrect_count: entry.incorrectCount,
    unanswered_count: entry.unansweredCount,
    duration_seconds: entry.timeSpentSeconds || entry.timeTakenSeconds || 0,
    stage_id: entry.stage || null,
    questions: entry.questions || [],
    submitted_answers: entry.submittedAnswers || entry.userAnswers || {},
    submitted_at: new Date(entry.submittedAt).toISOString(),
  };
}

/**
 * Maps a Supabase practice_attempts row back to frontend PracticeHistoryEntry
 */
export function fromSupabasePracticeRow(row: DatabasePracticeAttemptRow): PracticeHistoryEntry {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    stage: (row.stage_id as any) || 'all',
    stageLabel: row.class_level || 'Mathematics',
    classChapter: row.chapter || '',
    submittedAt: new Date(row.submitted_at).getTime(),
    questions: Array.isArray(row.questions) ? row.questions : [],
    userAnswers: row.submitted_answers || {},
    submittedAnswers: row.submitted_answers || {},
    score: Number(row.score) || 0,
    totalQuestions: Number(row.max_score) || 0,
    percentage: Number(row.percentage) || 0,
    correctCount: Number(row.correct_count) || 0,
    incorrectCount: Number(row.incorrect_count) || 0,
    unansweredCount: Number(row.unanswered_count) || 0,
    timeSpentSeconds: Number(row.duration_seconds) || 0,
    timeTakenSeconds: Number(row.duration_seconds) || 0,
    timeLimitMinutes: 15,
    classGrade: row.class_level || undefined,
    chapter: row.chapter || undefined,
  };
}

/**
 * Maps a frontend SavedWhiteboardEntry to Supabase saved_whiteboards row
 */
export function toSupabaseWhiteboardRow(entry: SavedWhiteboardEntry, userId: string): DatabaseSavedWhiteboardRow {
  return {
    id: entry.id,
    user_id: userId,
    name: entry.name,
    sheet_count: entry.sheetCount || entry.notebook?.sheets?.length || 1,
    document: entry.notebook,
    thumbnail_path: entry.thumbnail || null,
    created_at: new Date(entry.createdAt).toISOString(),
    updated_at: new Date(entry.lastSavedAt).toISOString(),
  };
}

/**
 * Maps a Supabase saved_whiteboards row back to frontend SavedWhiteboardEntry
 */
export function fromSupabaseWhiteboardRow(row: DatabaseSavedWhiteboardRow): SavedWhiteboardEntry {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    sheetCount: Number(row.sheet_count) || 1,
    createdAt: new Date(row.created_at).getTime(),
    lastSavedAt: new Date(row.updated_at).getTime(),
    thumbnail: row.thumbnail_path || undefined,
    notebook: row.document || {
      id: row.id,
      name: row.name,
      sheets: [],
      activeSheetId: '',
      createdAt: new Date(row.created_at).getTime(),
      updatedAt: new Date(row.updated_at).getTime(),
    },
  };
}

// ==============================================================================
// PRACTICE ATTEMPTS SUPABASE OPERATIONS
// ==============================================================================

export async function fetchPracticeAttemptsFromSupabase(
  userId: string,
  getToken?: TokenProvider
): Promise<PracticeHistoryEntry[] | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('practice_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchPracticeAttempts error:', error.message);
      return null;
    }

    if (!data) return [];
    return data.map((row) => fromSupabasePracticeRow(row as DatabasePracticeAttemptRow));
  } catch (err) {
    console.warn('Error fetching practice attempts from Supabase:', err);
    return null;
  }
}

export async function savePracticeAttemptToSupabase(
  entry: PracticeHistoryEntry,
  userId: string,
  getToken?: TokenProvider
): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return false;

  try {
    const row = toSupabasePracticeRow(entry, userId);
    const { error } = await supabase
      .from('practice_attempts')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase savePracticeAttempt error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving practice attempt to Supabase:', err);
    return false;
  }
}

export async function deletePracticeAttemptFromSupabase(
  id: string,
  userId: string,
  getToken?: TokenProvider
): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('practice_attempts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.warn('Supabase deletePracticeAttempt error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error deleting practice attempt from Supabase:', err);
    return false;
  }
}

export async function clearAllPracticeAttemptsFromSupabase(
  userId: string,
  getToken?: TokenProvider
): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('practice_attempts')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.warn('Supabase clearAllPracticeAttempts error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error clearing practice attempts from Supabase:', err);
    return false;
  }
}

// ==============================================================================
// SAVED WHITEBOARDS SUPABASE OPERATIONS
// ==============================================================================

export async function fetchSavedWhiteboardsFromSupabase(
  userId: string,
  getToken?: TokenProvider
): Promise<SavedWhiteboardEntry[] | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('saved_whiteboards')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchSavedWhiteboards error:', error.message);
      return null;
    }

    if (!data) return [];
    return data.map((row) => fromSupabaseWhiteboardRow(row as DatabaseSavedWhiteboardRow));
  } catch (err) {
    console.warn('Error fetching saved whiteboards from Supabase:', err);
    return null;
  }
}

export async function saveWhiteboardToSupabase(
  entry: SavedWhiteboardEntry,
  userId: string,
  getToken?: TokenProvider
): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return false;

  try {
    const row = toSupabaseWhiteboardRow(entry, userId);
    const { error } = await supabase
      .from('saved_whiteboards')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase saveWhiteboard error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving whiteboard to Supabase:', err);
    return false;
  }
}

export async function deleteSavedWhiteboardFromSupabase(
  id: string,
  userId: string,
  getToken?: TokenProvider
): Promise<boolean> {
  if (!isSupabaseConfigured() || !userId) return false;

  const supabase = getSupabaseClient(getToken);
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('saved_whiteboards')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.warn('Supabase deleteSavedWhiteboard error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error deleting saved whiteboard from Supabase:', err);
    return false;
  }
}
