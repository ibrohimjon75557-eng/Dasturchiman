import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  Terminal, 
  Bot, 
  Award, 
  Flame, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Users, 
  Star, 
  Code2, 
  BookOpen, 
  ChevronRight,
  Shield,
  Layers,
  GraduationCap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenAuthModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const { isAuthenticated } = useAuth();
  const [typedText, setTypedText] = useState('');
  const fullCodeSnippet = `const student = new VeloraStudent("Dasturchi");
await student.learn({
  skills: ["HTML", "CSS", "JS", "Python", "React", "AI"],
  speed: "Tezkor",
  mentor: "VELORA AI Ustoz"
});
// Natija: Kelajak dasturchisi muvaffaqiyatli tayyorlandi!`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullCodeSnippet.length) {
        setTypedText(fullCodeSnippet.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const featuredCourses = COURSES_DATA.slice(0, 6);

  return (
    <div className="relative min-h-screen bg-[#05050a] text-slate-100 overflow-hidden">
      
      {/* Ambient Cyber Light Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/25 via-blue-900/20 to-cyan-800/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40rem] left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid background layer */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)] animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono">VELORA 2.0 — Sun'iy intellekt bilan kuchaytirilgan platforma</span>
          </div>

          {/* Main Heading as requested */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight sm:leading-none mb-6">
            <span className="block text-white">Kelajak shu yerdan</span>
            <span className="gradient-text-velora text-glow block mt-2">
              boshlanadi.
            </span>
          </h1>

          {/* Description as requested */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Dasturlashni noldan o‘rganing, yangi imkoniyatlarni kashf eting va o‘z kelajagingizni yarating.
          </p>

          {/* Buttons as requested */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  onNavigate('courses');
                } else {
                  onOpenAuthModal();
                }
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Hoziroq boshlash</span>
              <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-slate-200 glass-panel hover:bg-white/10 hover:text-white border border-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>Kurslarni ko‘rish</span>
            </button>
          </div>

          {/* Orbiting technology pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            {['HTML5', 'CSS3', 'JavaScript', 'Python', 'C++', 'Java', 'React', 'TypeScript', 'PHP', 'SQL', 'UI/UX', 'AI Mentor'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-900/80 border border-white/5 text-slate-300 shadow-sm hover:border-purple-500/40 hover:text-cyan-400 transition-colors cursor-default"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive 3D Cyber Code Terminal Showcase */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl glass-panel-elevated p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-purple-500/30">
          <div className="bg-[#090914] rounded-2xl p-4 sm:p-6 border border-white/5">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  velora-engine.ts — live interactive compiler
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                  Node v22 & Gemini
                </span>
              </div>
            </div>

            {/* Live Typing Code Body */}
            <div className="font-mono text-xs sm:text-sm text-cyan-300 whitespace-pre-wrap leading-relaxed min-h-[140px] bg-[#05050c] p-4 rounded-xl border border-white/5 overflow-x-auto">
              {typedText}
              <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </div>

            {/* Quick Interactive Terminal Actions */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> 100% Sinovdan o‘tdi
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <Zap className="w-4 h-4" /> 0.12s Tezkor Kompilyatsiya
                </span>
              </div>
              <button
                onClick={() => onNavigate('playground')}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group"
              >
                <span>Playgroundda ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & IMPACT METRICS */}
      <section className="relative py-12 border-y border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl glass-panel">
              <p className="text-3xl sm:text-4xl font-extrabold gradient-text-velora font-mono">12+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Professional Kurslar</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">10,000+</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Faol O‘quvchilar</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel">
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">98%</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">Ijobiy Natija</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">24/7</p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-semibold">AI Mentor Yordami</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS OF VELORA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">
            Platforma Imkoniyatlari
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Nega aynan VELORA bilan o‘rganish samarali?
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Biz oddiy video tomosha qilishdan ko‘ra, har bir qator kodni amalda sinab ko‘rish va sun'iy intellektdan real vaqtda maslahat olish tizimini qurdik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div 
            onClick={() => onNavigate('playground')}
            className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-white/5 hover:border-cyan-500/40"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Jonli Kod Playground
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              HTML, CSS va JavaScript kodlaringizni to‘g‘ridan-to‘g‘ri brauzerda yozing va natijani darhol real vaqtda ko‘ring.
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold mt-4">
              Muhitni ochish →
            </span>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => onNavigate('ai-mentor')}
            className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-white/5 hover:border-purple-500/40"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              24/7 AI Mentor (O‘zbekcha)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Tushunarsiz xatolar bormi? Google Gemini quvvatidagi AI ustozimiz o‘zbek tilida kod tahlili va yechimlarni taqdim etadi.
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-purple-400 font-semibold mt-4">
              AI bilan suhbat →
            </span>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-white/5 hover:border-amber-500/40"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Raqamli Sertifikatlar
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Kurslarni tamomlang, rasmiy tekshiruv kodiga ega sertifikatni qo‘lga kiriting va o‘z rezyumengizga qo‘shing.
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold mt-4">
              Sertifikatlarni ko‘rish →
            </span>
          </div>

          {/* Feature 4 */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="p-6 rounded-2xl glass-panel hover:glass-panel-elevated cursor-pointer transition-all hover:-translate-y-1 group border border-white/5 hover:border-red-500/40"
          >
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">
              Streak va Gamifikatsiya
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Kunlik o‘qish seriyasini (Streak) uzmang, XP ballar to‘plang va yangi dasturchilik darajalariga ko‘tariling.
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-red-400 font-semibold mt-4">
              Mening yutuqlarim →
            </span>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES SECTION */}
      <section className="py-20 border-t border-white/5 bg-[#070712]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold">
                O‘quv Dasturlari
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                Eng ommabop dasturlash kurslari
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Barcha 12 ta kurs chuqur amaliyot, viktorinalar va video darslarni o‘z ichiga oladi.
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-400 text-xs font-bold transition-all"
            >
              <span>Barcha 12 ta kursni ko‘rish</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onNavigate('courses', course.id)}
                className="rounded-2xl glass-panel p-6 hover:glass-panel-elevated transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between border border-white/5 hover:border-purple-500/40 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-white/10">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>{course.durationHours} soat</span>
                    <span>•</span>
                    <span className="text-purple-400 font-semibold font-mono">+{course.totalXp} XP</span>
                  </div>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Boshlash →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LEARNING ROADMAP */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">
            Muvaffaqiyat Yo‘li
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Noldan Tajribali Dasturchigacha
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Bosqichma-bosqich tuzilgan professional xalqaro o‘quv rejasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 relative">
            <span className="text-xs font-mono text-cyan-400 font-bold">BOSQICH 01</span>
            <h3 className="text-xl font-bold text-white mt-1">Veb Asoslari (Frontend)</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              HTML5, zamonaviy CSS dizayn, Flexbox, Grid va JavaScript orqali interaktiv saytlar qurishni o‘rganasiz.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-900">HTML</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">CSS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">JavaScript</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-purple-500/20 relative">
            <span className="text-xs font-mono text-purple-400 font-bold">BOSQICH 02</span>
            <h3 className="text-xl font-bold text-white mt-1">Reaktiv UI va Backend</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              React va TypeScript orqali yirik Single Page ilovalar, Python va PHP orqali server dasturlarini yarating.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-900">React</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">TypeScript</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">Python</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-pink-500/20 relative">
            <span className="text-xs font-mono text-pink-400 font-bold">BOSQICH 03</span>
            <h3 className="text-xl font-bold text-white mt-1">Full-Stack & Sun'iy Intellekt</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              PostgreSQL bazasi, API integratsiyalari, tizimli C++ algoritmlari va Gemini AI bilan ishlash.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-900">SQL</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">Full Stack</span>
              <span className="px-2 py-0.5 rounded bg-slate-900">C++</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-3xl p-10 sm:p-14 glass-panel-elevated overflow-hidden border border-purple-500/40 shadow-[0_0_80px_rgba(139,92,246,0.3)]">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
            Hoziroq O‘rganishni Boshlang
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-4">
            Kelajak shu yerdan boshlanadi.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            Bugunoq ro‘yxatdan o‘ting, o‘zbek tilidagi bepul darslarni ko‘ring va birinchi kodingizni yozing!
          </p>

          <button
            onClick={() => {
              if (isAuthenticated) {
                onNavigate('courses');
              } else {
                onOpenAuthModal();
              }
            }}
            className="px-9 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <span>Bepul Ro‘yxatdan O‘tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
