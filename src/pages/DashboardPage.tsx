import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import { Certificate, Course } from '../types';
import { 
  User, 
  Flame, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Calendar, 
  Edit3, 
  Trophy, 
  ExternalLink,
  Lock,
  Clock,
  Printer,
  ChevronRight
} from 'lucide-react';

interface DashboardPageProps {
  onNavigateToCourse: (courseId: string) => void;
  onViewCertificate: (cert: Certificate) => void;
  onOpenAuthModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToCourse,
  onViewCertificate,
  onOpenAuthModal,
}) => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [headlineInput, setHeadlineInput] = useState(user?.headline || '');
  const [bioInput, setBioInput] = useState(user?.bio || '');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#05050a] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md p-8 rounded-3xl glass-panel-elevated border border-purple-500/30">
          <User className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Talaba Paneli</h2>
          <p className="text-xs text-slate-400 mb-6">
            O‘z yutuqlaringiz, kurslar jarayoni va rasmiy sertifikatlaringizni ko‘rish uchun tizimga kiring.
          </p>
          <button
            onClick={onOpenAuthModal}
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Kirish / Ro‘yxatdan o‘tish
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      headline: headlineInput,
      bio: bioInput,
    });
    setEditingProfile(false);
  };

  // Rank title based on XP
  const getRank = (xp: number) => {
    if (xp >= 5000) return { title: 'Velora Arxitektori', nextXp: 10000, color: 'text-amber-400' };
    if (xp >= 2500) return { title: 'Kiber Muhandis', nextXp: 5000, color: 'text-cyan-400' };
    if (xp >= 1200) return { title: 'Dastur Ustasi', nextXp: 2500, color: 'text-purple-400' };
    if (xp >= 500) return { title: 'Kod Sayyohi', nextXp: 1200, color: 'text-blue-400' };
    return { title: 'Yangi Boshlovchi', nextXp: 500, color: 'text-slate-300' };
  };

  const rank = getRank(user.xp);
  const totalCompletedLessons = user.enrolledCourses.reduce((sum, c) => sum + c.completedLessonIds.length, 0);

  // 7-day streak tracker
  const daysOfWeek = ['Du', 'Se', 'Chor', 'Pay', 'Ju', 'Shan', 'Yak'];

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. Profile Header Hero */}
      <div className="relative rounded-3xl glass-panel-elevated p-6 sm:p-8 border border-purple-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-400/60 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono font-bold">
                {user.role.toUpperCase()}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user.name}
                </h1>
                <button
                  onClick={() => {
                    setNameInput(user.name);
                    setHeadlineInput(user.headline);
                    setBioInput(user.bio);
                    setEditingProfile(!editingProfile);
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Profilni tahrirlash"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                {user.headline}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-lg line-clamp-2">
                {user.bio}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial p-3 px-4 rounded-2xl glass-panel border border-orange-500/30 text-center">
              <div className="flex items-center justify-center gap-1.5 text-orange-400 text-sm font-bold">
                <Flame className="w-4 h-4 fill-orange-400 text-orange-400 animate-bounce" />
                <span>{user.streakDays} Kun</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">O‘qish Seriyasi</p>
            </div>

            <div className="flex-1 md:flex-initial p-3 px-4 rounded-2xl glass-panel border border-purple-500/30 text-center">
              <div className="flex items-center justify-center gap-1.5 text-purple-300 text-sm font-bold font-mono">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{user.xp} XP</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Tajriba Balli</p>
            </div>

            <div className="flex-1 md:flex-initial p-3 px-4 rounded-2xl glass-panel border border-amber-500/30 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-300 text-sm font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{user.certificates.length} ta</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Sertifikatlar</p>
            </div>
          </div>
        </div>

        {/* Edit profile modal inline */}
        {editingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Profilni Tahrirlash</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Ism va Familiya</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Kasbiy Maqsad / Headline</label>
                <input
                  type="text"
                  value={headlineInput}
                  onChange={(e) => setHeadlineInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Shaxsiy Bio</label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProfile(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Saqlash
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Rank Tier & Weekly Streak Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Velora Rank Card */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Hozirgi Daraja:</span>
            <span className={`font-bold ${rank.color}`}>{rank.title}</span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((user.xp / rank.nextXp) * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{user.xp} XP</span>
            <span>Keyingi darajaga: {rank.nextXp} XP</span>
          </div>
        </div>

        {/* 7-Day Streak Tracker */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-orange-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Haftalik Uzluksiz Ta'lim (Streak)
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-orange-400">
              {user.streakDays} kun ketma-ket 🔥
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {daysOfWeek.map((day, idx) => {
              // 7 days active simulation
              const isChecked = idx < user.streakDays % 7 || user.streakDays >= 7;
              return (
                <div
                  key={day}
                  className={`p-2.5 rounded-xl border text-center font-mono text-xs ${
                    isChecked
                      ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                      : 'bg-slate-900 border-white/5 text-slate-500'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 mb-1">{day}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 mx-auto text-orange-400" />
                  ) : (
                    <span className="block w-2 h-2 rounded-full bg-slate-700 mx-auto" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Enrolled Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>O‘rganilayotgan Kurslarim ({user.enrolledCourses.length})</span>
          </h2>
          <span className="text-xs text-slate-400">
            Jami {totalCompletedLessons} ta dars yakunlandi
          </span>
        </div>

        {user.enrolledCourses.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel border border-white/5 text-center text-slate-400">
            <p className="text-sm">Hozircha hech qanday kursga yozilmagansiz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.enrolledCourses.map((enr) => {
              const course = COURSES_DATA.find(c => c.id === enr.courseId);
              if (!course) return null;

              return (
                <div
                  key={enr.courseId}
                  onClick={() => onNavigateToCourse(enr.courseId)}
                  className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-white/5 hover:border-purple-500/40 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300">
                        {course.category}
                      </span>
                      <span className="text-cyan-400 font-bold">{enr.progressPercent}%</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${enr.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Oxirgi faollik: {enr.lastStudiedAt}
                    </span>
                    <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Davom etish →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Official Certificates Gallery */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Rasmiy Sertifikatlarim ({user.certificates.length})</span>
        </h2>

        {user.certificates.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel border border-white/5 text-center text-slate-400">
            <p className="text-sm">Hali sertifikat olmadingiz. Kursni 100% bajaring va birinchi sertifikatingizni qo‘lga kiriting!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onViewCertificate(cert)}
                className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-amber-500/20 hover:border-amber-500/50 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    {cert.verificationCode}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {cert.courseTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Berilgan: {cert.issuedDate}</p>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">Natija: {cert.grade}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Sertifikatni ko‘rish & Chop etish</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Achievements Showcase */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-400" />
          <span>Yutuqlar va Mukofotlar</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                ach.isUnlocked
                  ? 'bg-purple-950/40 border-purple-500/40 text-white'
                  : 'bg-slate-900/40 border-white/5 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ach.isUnlocked
                    ? 'bg-purple-600/30 text-cyan-300 border border-purple-500/40'
                    : 'bg-slate-800 text-slate-600'
                }`}>
                  {ach.isUnlocked ? <Sparkles className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{ach.description}</p>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block mt-1">
                    +{ach.xpBonus} XP Mukofot
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
