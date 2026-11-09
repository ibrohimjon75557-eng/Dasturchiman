import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Certificate, NotificationItem, Achievement } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  login: (email: string, role?: 'student' | 'admin', name?: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  enrollCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string, xpEarned: number) => void;
  addCertificate: (courseId: string) => Certificate;
  unlockAchievement: (achievementId: string) => void;
  markNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type: 'streak' | 'achievement' | 'course' | 'info') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-lesson',
    title: 'Birinchi Qadam',
    description: 'Birinchi darsni muvaffaqiyatli tamomladingiz!',
    icon: 'Sparkles',
    xpBonus: 100,
    isUnlocked: true,
    unlockedAt: '2026-11-01',
    category: 'course'
  },
  {
    id: 'ach-ai-chat',
    title: 'AI Hamroh',
    description: 'VELORA AI Ustoz bilan dasturlash bo‘yicha maslahatlashdingiz.',
    icon: 'Bot',
    xpBonus: 150,
    isUnlocked: true,
    unlockedAt: '2026-11-03',
    category: 'ai'
  },
  {
    id: 'ach-playground-pro',
    title: 'Laborant Dasturchi',
    description: 'Playground muhitida o‘z kodingizni sinab ko‘rdingiz.',
    icon: 'Terminal',
    xpBonus: 150,
    isUnlocked: false,
    category: 'playground'
  },
  {
    id: 'ach-streak-fire',
    title: 'Olovli Intizom',
    description: 'Ketma-ket 5 kun davomida darslarni qoldirmay o‘qidingiz.',
    icon: 'Flame',
    xpBonus: 250,
    isUnlocked: false,
    category: 'streak'
  },
  {
    id: 'ach-quiz-master',
    title: 'Viktorina Daho',
    description: 'Test sinovidan xatosiz 100% natija qayd etdingiz.',
    icon: 'Trophy',
    xpBonus: 200,
    isUnlocked: false,
    category: 'quiz'
  },
  {
    id: 'ach-certified',
    title: 'Sertifikatlangan Mutaxassis',
    description: 'Birinchi to‘liq kursni tamomlab rasmiy sertifikat oldingiz.',
    icon: 'Award',
    xpBonus: 500,
    isUnlocked: false,
    category: 'course'
  }
];

const INITIAL_USER: UserProfile = {
  id: 'usr-ibrohim-1',
  name: 'Ibrohimjon Ergashov',
  email: 'ibrohimjon75557@gmail.com',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  headline: 'Full-Stack Dasturchi & Kiber Xavfsizlik Qiziquvchisi',
  bio: 'VELORA akademiyasida zamonaviy veb texnologiyalari va sun\'iy intellekt integratsiyasini o‘rganmoqdaman.',
  xp: 1450,
  streakDays: 7,
  lastActiveDate: '2026-11-09',
  themePreference: 'dark',
  enrolledCourses: [
    {
      courseId: 'course-html',
      progressPercent: 100,
      completedLessonIds: ['lesson-html-1', 'lesson-html-2'],
      startedAt: '2026-11-01',
      lastStudiedAt: '2026-11-08'
    },
    {
      courseId: 'course-react',
      progressPercent: 50,
      completedLessonIds: ['lesson-react-1'],
      startedAt: '2026-11-03',
      lastStudiedAt: '2026-11-09'
    },
    {
      courseId: 'course-python',
      progressPercent: 25,
      completedLessonIds: ['lesson-py-1'],
      startedAt: '2026-11-05',
      lastStudiedAt: '2026-11-09'
    }
  ],
  achievements: DEFAULT_ACHIEVEMENTS,
  certificates: [
    {
      id: 'cert-velora-html-1',
      courseId: 'course-html',
      courseTitle: 'HTML: Veb Asoslari va Gipermatn',
      studentName: 'Ibrohimjon Ergashov',
      issuedDate: '2026-11-08',
      grade: 'A+ (A\'lo Darajada)',
      verificationCode: 'VEL-2026-HT-9941',
      hoursSpent: 12
    }
  ]
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '7 Kunlik Seriya! 🔥',
    message: 'Ajoyib natija! Siz 7 kun ketma-ket darslarni bajardingiz. +50 XP bonus qo‘shildi.',
    timestamp: 'Bugun, 10:15',
    read: false,
    type: 'streak'
  },
  {
    id: 'notif-2',
    title: 'Sertifikat Tayyor! 🎓',
    message: 'HTML kursini 100% muvaffaqiyatli tugatganingiz uchun rasmiy sertifikat taqdim etildi.',
    timestamp: 'Kecha, 18:30',
    read: false,
    type: 'course'
  },
  {
    id: 'notif-3',
    title: 'Yangi AI Imkoniyati',
    message: 'VELORA AI Mentor endi o‘zbek tilida kod tahlilini ham taqdim etadi.',
    timestamp: '2 kun oldin',
    read: true,
    type: 'info'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('velora_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user session from localStorage', e);
    }
    return INITIAL_USER;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('velora_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('velora_theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('velora_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('velora_user_session');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('velora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('velora_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email: string, role: 'student' | 'admin' = 'student', name?: string) => {
    const newUser: UserProfile = {
      ...INITIAL_USER,
      email,
      role,
      name: name || (email.includes('admin') ? 'Bosh Administrator' : email.split('@')[0]),
    };
    setUser(newUser);
    addNotification('Xush kelibsiz!', `${newUser.name}, VELORA platformasiga xush kelibsiz!`, 'info');
  };

  const register = (name: string, email: string) => {
    const newUser: UserProfile = {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'student',
      xp: 200, // Welcome gift XP
      streakDays: 1,
      enrolledCourses: [],
      certificates: []
    };
    setUser(newUser);
    addNotification('Xush kelibsiz!', 'Ro‘yxatdan o‘tganingiz uchun +200 XP sovg‘a berildi!', 'achievement');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => (prev ? { ...prev, ...updates } : null));
    addNotification('Profil yangilandi', 'Ma\'lumotlaringiz muvaffaqiyatli saqlandi.', 'info');
  };

  const addNotification = (title: string, message: string, type: 'streak' | 'achievement' | 'course' | 'info') => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Hozirgina',
      read: false,
      type
    };
    setNotifications(prev => [item, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const enrollCourse = (courseId: string) => {
    if (!user) return;
    const exists = user.enrolledCourses.some(c => c.courseId === courseId);
    if (exists) return;

    const newEnrollment = {
      courseId,
      progressPercent: 0,
      completedLessonIds: [],
      startedAt: new Date().toISOString().split('T')[0],
      lastStudiedAt: new Date().toISOString().split('T')[0]
    };

    const course = COURSES_DATA.find(c => c.id === courseId);
    const updatedCourses = [...user.enrolledCourses, newEnrollment];
    setUser({
      ...user,
      enrolledCourses: updatedCourses,
      xp: user.xp + 50
    });

    addNotification('Yangi Kursga Yozildingiz!', `"${course?.title || 'Kurs'}" ga muvaffaqiyatli yozildingiz. +50 XP olindi!`, 'course');
  };

  const completeLesson = (courseId: string, lessonId: string, xpEarned: number) => {
    if (!user) return;

    const course = COURSES_DATA.find(c => c.id === courseId);
    const totalLessons = course ? course.modules.reduce((sum, m) => sum + m.lessons.length, 0) : 1;

    let updatedEnrolled = [...user.enrolledCourses];
    let courseEnrollment = updatedEnrolled.find(c => c.courseId === courseId);

    if (!courseEnrollment) {
      courseEnrollment = {
        courseId,
        progressPercent: 0,
        completedLessonIds: [],
        startedAt: new Date().toISOString().split('T')[0],
        lastStudiedAt: new Date().toISOString().split('T')[0]
      };
      updatedEnrolled.push(courseEnrollment);
    }

    if (!courseEnrollment.completedLessonIds.includes(lessonId)) {
      courseEnrollment.completedLessonIds.push(lessonId);
      courseEnrollment.progressPercent = Math.min(
        100,
        Math.round((courseEnrollment.completedLessonIds.length / totalLessons) * 100)
      );
      courseEnrollment.lastStudiedAt = new Date().toISOString().split('T')[0];

      // Give XP
      const newXp = user.xp + xpEarned;
      setUser({
        ...user,
        xp: newXp,
        enrolledCourses: updatedEnrolled
      });

      addNotification('Dars Yakunlandi! 🎉', `+${xpEarned} XP qo‘lga kiritildi. Davom eting!`, 'course');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      // Check if course 100% completed
      if (courseEnrollment.progressPercent === 100) {
        addCertificate(courseId);
      }
    }
  };

  const addCertificate = (courseId: string): Certificate => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    const existing = user?.certificates.find(c => c.courseId === courseId);
    if (existing) return existing;

    const code = `VEL-${new Date().getFullYear()}-${courseId.slice(-3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      courseId,
      courseTitle: course?.title || 'VELORA Dasturlash Kursi',
      studentName: user?.name || 'Talaba',
      issuedDate: new Date().toISOString().split('T')[0],
      grade: 'A+ (A\'lo Darajada)',
      verificationCode: code,
      hoursSpent: course?.durationHours || 20
    };

    if (user) {
      setUser({
        ...user,
        certificates: [...user.certificates, newCert],
        xp: user.xp + 500
      });
    }

    addNotification('Tabriklaymiz! 🏆', `"${newCert.courseTitle}" kursini muvaffaqiyatli tamomlab rasmiy sertifikatga ega bo‘ldingiz!`, 'achievement');
    
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // ignore
    }

    return newCert;
  };

  const unlockAchievement = (achievementId: string) => {
    if (!user) return;
    const ach = user.achievements.find(a => a.id === achievementId);
    if (ach && !ach.isUnlocked) {
      const updated = user.achievements.map(a => 
        a.id === achievementId ? { ...a, isUnlocked: true, unlockedAt: new Date().toISOString().split('T')[0] } : a
      );
      setUser({
        ...user,
        achievements: updated,
        xp: user.xp + ach.xpBonus
      });
      addNotification('Yangi Yutuq! 🏅', `"${ach.title}" yutug‘ini ochdingiz! +${ach.xpBonus} XP berildi!`, 'achievement');
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        notifications,
        unreadNotificationsCount,
        login,
        register,
        logout,
        updateProfile,
        enrollCourse,
        completeLesson,
        addCertificate,
        unlockAchievement,
        markNotificationsAsRead,
        addNotification,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
