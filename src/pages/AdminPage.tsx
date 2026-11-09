import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { Course, CourseLevel } from '../types';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  KeyRound, 
  Activity, 
  Bot, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface MockStudent {
  id: string;
  name: string;
  email: string;
  xp: number;
  coursesCount: number;
  status: 'active' | 'blocked';
  joinedDate: string;
}

const INITIAL_STUDENTS: MockStudent[] = [
  { id: 'st-1', name: 'Ibrohimjon Ergashov', email: 'ibrohimjon75557@gmail.com', xp: 1450, coursesCount: 3, status: 'active', joinedDate: '2026-11-01' },
  { id: 'st-2', name: 'Malika Qosimova', email: 'malika.q@mail.uz', xp: 2300, coursesCount: 4, status: 'active', joinedDate: '2026-10-24' },
  { id: 'st-3', name: 'Azizbek Rahimov', email: 'aziz.tech@gmail.com', xp: 820, coursesCount: 2, status: 'active', joinedDate: '2026-11-04' },
  { id: 'st-4', name: 'Diyorbek Yusupov', email: 'diyor.dev@yahoo.com', xp: 3400, coursesCount: 6, status: 'active', joinedDate: '2026-09-15' },
  { id: 'st-5', name: 'Shahzoda Olimova', email: 'shahzoda@inbox.uz', xp: 600, coursesCount: 1, status: 'active', joinedDate: '2026-11-07' }
];

export const AdminPage: React.FC = () => {
  const { user, isAdmin, login } = useAuth();
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'stats' | 'courses' | 'students' | 'quizzes'>('stats');
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES_DATA);
  const [studentsList, setStudentsList] = useState<MockStudent[]>(INITIAL_STUDENTS);

  // New Course Modal State
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Frontend');
  const [newLevel, setNewLevel] = useState<CourseLevel>('Boshlang\'ich');
  const [newHours, setNewHours] = useState(15);
  const [newXp, setNewXp] = useState(1000);

  // If user is not admin, show login gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#05050a] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl glass-panel-elevated p-8 border border-amber-500/30 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Administrator Huquqi Talab Qilinadi
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Ushbu bo‘lim faqat VELORA ma'murlari uchun mo‘ljallangan. Iltimos, administrator hisobiga kiring yoki demo paroldan foydalaning.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => login('admin@velora.uz', 'admin', 'Bosh Administrator')}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Admin sifatida kirish (Demo Admin)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const createdCourse: Course = {
      id: `course-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      tagline: newTagline || 'Yangi professional kurs',
      description: newTagline || 'Yangi qo‘shilgan kurs dasturi.',
      longDescription: 'Ushbu kurs yangi zamonaviy texnologiyalarni o‘rgatadi.',
      category: newCategory,
      iconName: 'Code2',
      level: newLevel,
      durationHours: Number(newHours),
      totalLessons: 10,
      totalXp: Number(newXp),
      accentColor: '#8b5cf6',
      gradient: 'from-purple-600 to-cyan-500',
      badge: 'Yangi',
      enrolledStudentsCount: 0,
      rating: 5.0,
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: '1-Modul: Asoslar',
          description: 'Kirish darslari',
          lessons: [
            {
              id: `les-${Date.now()}`,
              courseId: `course-${Date.now()}`,
              title: 'Birinchi darsga kirish',
              durationMinutes: 20,
              videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
              summary: 'Kirish darsi',
              contentMarkdown: 'Ushbu dars noldan boshlanadi.',
              codeSnippets: [],
              exercises: [],
              quiz: [],
              xp: 100
            }
          ]
        }
      ]
    };

    setCoursesList([createdCourse, ...coursesList]);
    setIsAddCourseModalOpen(false);
    setNewTitle('');
    setNewTagline('');
  };

  const handleDeleteCourse = (id: string) => {
    setCoursesList(coursesList.filter(c => c.id !== id));
  };

  const handleToggleStudentStatus = (id: string) => {
    setStudentsList(studentsList.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'active' ? 'blocked' : 'active' };
      }
      return s;
    }));
  };

  const handleAwardStudentXp = (id: string) => {
    setStudentsList(studentsList.map(s => {
      if (s.id === id) {
        return { ...s, xp: s.xp + 250 };
      }
      return s;
    }));
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <span>VELORA Administrator Paneli</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                Super Admin
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Kurslar, darslar, talabalar va statistika boshqaruvi
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-white/10">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stats' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Statistika
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kurslar ({coursesList.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'students' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Talabalar ({studentsList.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Statistics Overview */}
      {activeTab === 'stats' && (
        <div className="space-y-8 animate-in fade-in">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20">
              <div className="flex items-center justify-between text-cyan-400 mb-2">
                <Users className="w-6 h-6" />
                <span className="text-xs font-mono font-bold">+14% bu oy</span>
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">10,482</p>
              <p className="text-xs text-slate-400 mt-1">Jami Ro‘yxatdan O‘tganlar</p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-purple-500/20">
              <div className="flex items-center justify-between text-purple-400 mb-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-xs font-mono font-bold">12 Yo‘nalish</span>
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">{coursesList.length}</p>
              <p className="text-xs text-slate-400 mt-1">Faol Kurslar Soni</p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-emerald-500/20">
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-xs font-mono font-bold">98.4% Sifat</span>
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">24,890</p>
              <p className="text-xs text-slate-400 mt-1">Tugatilgan Darslar</p>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-amber-500/20">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <Award className="w-6 h-6" />
                <span className="text-xs font-mono font-bold">Raqamli QR</span>
              </div>
              <p className="text-3xl font-extrabold text-white font-mono">3,120</p>
              <p className="text-xs text-slate-400 mt-1">Berilgan Sertifikatlar</p>
            </div>
          </div>

          {/* System Health Status */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Tizim va Xizmatlar Holati</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Gemini 3.8 Flash AI:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Onlayn
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Playground Runtime:</span>
                <span className="text-emerald-400 font-bold">Barqaror (0.1s)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">O‘rtacha Baho:</span>
                <span className="text-amber-400 font-bold">4.96 / 5.0 ★</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Mavjud Kurslar Ro‘yxati</h3>
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Kurs Qo‘shish</span>
            </button>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Kurs Nomi</th>
                  <th className="p-4">Yo‘nalish</th>
                  <th className="p-4">Daraja</th>
                  <th className="p-4">Soat</th>
                  <th className="p-4">XP</th>
                  <th className="p-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {coursesList.map((course) => (
                  <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-bold text-white">{course.title}</td>
                    <td className="p-4 font-mono text-cyan-400">{course.category}</td>
                    <td className="p-4">{course.level}</td>
                    <td className="p-4 font-mono">{course.durationHours} soat</td>
                    <td className="p-4 font-mono text-purple-400">+{course.totalXp} XP</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Students Management */}
      {activeTab === 'students' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Ro‘yxatdan O‘tgan Talabalar</h3>
            <span className="text-xs text-slate-400 font-mono">Jami: {studentsList.length} nafar</span>
          </div>

          <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4">Ism va Email</th>
                  <th className="p-4">XP Ball</th>
                  <th className="p-4">Kurslar Soni</th>
                  <th className="p-4">Holat</th>
                  <th className="p-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {studentsList.map((st) => (
                  <tr key={st.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white">{st.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{st.email}</p>
                    </td>
                    <td className="p-4 font-mono text-cyan-400 font-bold">{st.xp} XP</td>
                    <td className="p-4 font-mono">{st.coursesCount} ta</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        st.status === 'active' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-red-950 text-red-400 border border-red-500/30'
                      }`}>
                        {st.status === 'active' ? 'Faol' : 'Bloklangan'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleAwardStudentXp(st.id)}
                        className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-500/30 hover:bg-purple-900 text-[11px] font-semibold"
                        title="+250 XP bonus berish"
                      >
                        +250 XP
                      </button>
                      <button
                        onClick={() => handleToggleStudentStatus(st.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          st.status === 'active'
                            ? 'bg-red-950/60 text-red-300 hover:bg-red-900'
                            : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900'
                        }`}
                      >
                        {st.status === 'active' ? 'Bloklash' : 'Faollashtirish'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add New Course Modal */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-panel-elevated p-6 border border-amber-500/40 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Yangi Dasturlash Kursi Qo‘shish</h3>
            
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Kurs Nomi</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: Flutter & Dart Mobile"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Qisqacha Shior (Tagline)</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="Kross-platforma mobil ilovalar yaratish"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Kategoriya</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Dasturlash Asoslari">Dasturlash Asoslari</option>
                    <option value="Ma'lumotlar Bazasi">Ma'lumotlar Bazasi</option>
                    <option value="Dizayn">Dizayn</option>
                    <option value="Full Stack">Full Stack</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Daraja</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as CourseLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  >
                    <option value="Boshlang'ich">Boshlang'ich</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Yuqori">Yuqori</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Davomiylik (soat)</label>
                  <input
                    type="number"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Mukofot XP</label>
                  <input
                    type="number"
                    value={newXp}
                    onChange={(e) => setNewXp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Qo‘shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
