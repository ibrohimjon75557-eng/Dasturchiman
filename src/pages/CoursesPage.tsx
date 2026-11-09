import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { Course, CourseLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Zap, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Sparkles,
  ArrowLeft,
  Award,
  Video,
  FileCode2,
  Users
} from 'lucide-react';

interface CoursesPageProps {
  initialCourseId?: string;
  onNavigateToLesson: (courseId: string, lessonId: string) => void;
  onOpenAuthModal: () => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  initialCourseId,
  onNavigateToLesson,
  onOpenAuthModal,
}) => {
  const { user, isAuthenticated, enrollCourse } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(initialCourseId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hammasi');
  const [selectedLevel, setSelectedLevel] = useState<string>('Hammasi');

  const categories = ['Hammasi', 'Frontend', 'Backend', 'Dasturlash Asoslari', 'Ma\'lumotlar Bazasi', 'Dizayn', 'Full Stack'];
  const levels = ['Hammasi', 'Boshlang\'ich', 'O\'rta', 'Yuqori'];

  // Filter courses
  const filteredCourses = COURSES_DATA.filter((c) => {
    const matchCategory = selectedCategory === 'Hammasi' || c.category === selectedCategory;
    const matchLevel = selectedLevel === 'Hammasi' || c.level === selectedLevel;
    const matchSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchLevel && matchSearch;
  });

  const selectedCourse = selectedCourseId 
    ? COURSES_DATA.find((c) => c.id === selectedCourseId) 
    : null;

  const getEnrollment = (courseId: string) => {
    return user?.enrolledCourses.find(c => c.courseId === courseId);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* If a course is selected, show Detail View */}
      {selectedCourse ? (
        <div className="animate-in fade-in duration-300">
          {/* Back button */}
          <button
            onClick={() => setSelectedCourseId(null)}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Barcha kurslarga qaytish</span>
          </button>

          {/* Hero Banner for Course */}
          <div className="relative rounded-3xl glass-panel-elevated p-8 sm:p-10 border border-purple-500/30 overflow-hidden shadow-2xl mb-10">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                    {selectedCourse.category}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-cyan-400 border border-cyan-500/30">
                    {selectedCourse.level} daraja
                  </span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {selectedCourse.rating} ({selectedCourse.enrolledStudentsCount} o‘quvchi)
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
                  {selectedCourse.title}
                </h1>

                <p className="text-base text-cyan-300 font-medium">
                  {selectedCourse.tagline}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {selectedCourse.longDescription}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-purple-400" /> {selectedCourse.durationHours} soat amaliy dars
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" /> +{selectedCourse.totalXp} XP mukofot
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" /> Rasmiy Sertifikat
                  </span>
                </div>
              </div>

              {/* Action Box */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-4">
                {getEnrollment(selectedCourse.id) ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30">
                      <p className="text-xs text-slate-400">Sizning o‘zlashtirish foizingiz:</p>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${getEnrollment(selectedCourse.id)?.progressPercent || 0}%` }}
                        />
                      </div>
                      <p className="text-sm font-bold text-cyan-300 mt-1 font-mono">
                        {getEnrollment(selectedCourse.id)?.progressPercent}% Bajarildi
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const firstLesson = selectedCourse.modules[0]?.lessons[0]?.id;
                        if (firstLesson) {
                          onNavigateToLesson(selectedCourse.id, firstLesson);
                        }
                      }}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Darslarni davom ettirish</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                      Ushbu kursni noldan boshlang va o‘zbek tilida bepul ta'lim oling.
                    </p>
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          onOpenAuthModal();
                        } else {
                          enrollCourse(selectedCourse.id);
                        }
                      }}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>Kursga yozilish (Bepul)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Syllabus Tree */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>Kurs O‘quv Dasturi (Syllabus)</span>
            </h3>

            <div className="space-y-4">
              {selectedCourse.modules.map((mod, modIdx) => (
                <div key={mod.id} className="glass-panel rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white">{mod.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{mod.description}</p>
                    </div>
                    <span className="text-xs font-mono text-purple-400">
                      {mod.lessons.length} ta dars
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {mod.lessons.map((lesson, lessonIdx) => {
                      const enrollment = getEnrollment(selectedCourse.id);
                      const isCompleted = enrollment?.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onNavigateToLesson(selectedCourse.id, lesson.id)}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-purple-950/40 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                              isCompleted 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `${lessonIdx + 1}`}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{lesson.summary}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                            <span className="hidden sm:inline flex items-center gap-1">
                              <Video className="w-3.5 h-3.5 text-purple-400" /> {lesson.durationMinutes} daqiqa
                            </span>
                            <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                              Darsga kirish →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Course Catalog List View */
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              12 TA TO‘LIQ O‘QUV YO‘NALISHLARI
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
              Dasturlash Kurslari
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Barcha darslar o‘zbek tilida, professional video qo‘llanmalar, interaktiv viktorinalar va sertifikatlar bilan boyitilgan.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kurs nomini yoki texnologiyani qidiring (masalan: React, Python, C++, SQL)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Level Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedLevel === lvl
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid (All 12 courses) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrollment = getEnrollment(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className="rounded-2xl glass-panel hover:glass-panel-elevated p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 group flex flex-col justify-between border border-white/5 hover:border-purple-500/40 shadow-xl"
                >
                  <div>
                    {/* Top badging */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-white/10">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {course.rating}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-purple-300 font-medium mt-1">
                      {course.tagline}
                    </p>
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* If enrolled, show progress */}
                    {enrollment && (
                      <div className="mt-4 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-slate-300">Jarayon:</span>
                          <span className="text-cyan-300 font-bold">{enrollment.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full"
                            style={{ width: `${enrollment.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card bottom metadata */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-3 font-mono">
                      <span>{course.durationHours} soat</span>
                      <span>•</span>
                      <span className="text-purple-400">+{course.totalXp} XP</span>
                    </div>
                    <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {enrollment ? 'Davom etish' : 'Batafsil'} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-base font-semibold">Qidiruvingiz bo‘yicha kurs topilmadi.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Hammasi'); setSelectedLevel('Hammasi'); }}
                className="mt-3 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Filtrlarni tozalash
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
