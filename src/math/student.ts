/**
 * Student academic calculators: GPA/CGPA, attendance planning, marks & percentages
 */

export interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

export function calcGpa(courses: CourseEntry[]): { gpa: number; totalCredits: number; totalPoints: number } {
  let totalCredits = 0;
  let totalPoints = 0;

  for (const c of courses) {
    if (c.credits > 0 && c.gradePoint >= 0) {
      totalCredits += c.credits;
      totalPoints += c.credits * c.gradePoint;
    }
  }

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return {
    gpa: Math.round(gpa * 100) / 100,
    totalCredits,
    totalPoints,
  };
}

export interface AttendancePlan {
  attended: number;
  total: number;
  targetPercent: number;
  currentPercent: number;
  status: 'on-track' | 'shortage';
  classesNeededToTarget: number;
  classesCanSkip: number;
  advice: string;
}

export function planAttendance(attended: number, total: number, targetPercent: number = 75): AttendancePlan {
  if (total <= 0) {
    return {
      attended: 0,
      total: 0,
      targetPercent,
      currentPercent: 0,
      status: 'shortage',
      classesNeededToTarget: 0,
      classesCanSkip: 0,
      advice: 'Enter total classes conducted.',
    };
  }

  const currentPercent = (attended / total) * 100;
  const p = targetPercent / 100;

  if (currentPercent >= targetPercent) {
    // How many classes can be skipped: (attended / (total + s)) >= p => attended >= p*total + p*s => s <= (attended - p*total)/p
    const canSkip = Math.floor((attended - p * total) / p);
    return {
      attended,
      total,
      targetPercent,
      currentPercent: Math.round(currentPercent * 10) / 10,
      status: 'on-track',
      classesNeededToTarget: 0,
      classesCanSkip: Math.max(0, canSkip),
      advice: `You are above your ${targetPercent}% target! You can safely skip up to ${Math.max(0, canSkip)} consecutive class(es).`,
    };
  } else {
    // How many classes need to be attended: (attended + n) / (total + n) >= p => attended + n >= p*total + p*n => n(1 - p) >= p*total - attended
    const needed = Math.ceil((p * total - attended) / (1 - p));
    return {
      attended,
      total,
      targetPercent,
      currentPercent: Math.round(currentPercent * 10) / 10,
      status: 'shortage',
      classesNeededToTarget: Math.max(0, needed),
      classesCanSkip: 0,
      advice: `Attendance is below ${targetPercent}%. You must attend the next ${Math.max(0, needed)} class(es) continuously without missing any to restore eligibility.`,
    };
  }
}
