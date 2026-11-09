export type CourseLevel = 'Boshlang\'ich' | 'O\'rta' | 'Yuqori';

export type CourseCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'Dasturlash Asoslari' 
  | 'Ma\'lumotlar Bazasi' 
  | 'Dizayn' 
  | 'Full Stack';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  videoUrl: string; // YouTube or video embed link
  videoThumbnail?: string;
  summary: string;
  contentMarkdown: string;
  codeSnippets: CodeSnippet[];
  exercises: Exercise[];
  quiz: QuizQuestion[];
  xp: number;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: CourseCategory;
  iconName: string;
  level: CourseLevel;
  durationHours: number;
  totalLessons: number;
  totalXp: number;
  accentColor: string;
  gradient: string;
  badge: string;
  modules: CourseModule[];
  enrolledStudentsCount: number;
  rating: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpBonus: number;
  isUnlocked: boolean;
  category: 'streak' | 'course' | 'quiz' | 'ai' | 'playground';
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issuedDate: string;
  grade: string;
  verificationCode: string;
  hoursSpent: number;
}

export interface EnrolledCourseProgress {
  courseId: string;
  progressPercent: number;
  completedLessonIds: string[];
  startedAt: string;
  lastStudiedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar: string;
  headline: string;
  bio: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  enrolledCourses: EnrolledCourseProgress[];
  achievements: Achievement[];
  certificates: Certificate[];
  themePreference: 'dark' | 'light';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  codeSnippet?: {
    code: string;
    language: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'streak' | 'achievement' | 'course' | 'info';
}
