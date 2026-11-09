import React from 'react';
import { VeloraLogo } from '../components/brand/VeloraLogo';
import { 
  Sparkles, 
  Target, 
  Compass, 
  Users, 
  Cpu, 
  ShieldCheck, 
  Globe2, 
  Rocket 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex justify-center mb-4">
          <VeloraLogo size="xl" showSlogan={true} />
        </div>
        <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
          BIZ HAQIMIZDA
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Kelajak shu yerdan boshlanadi.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          VELORA — har bir insonga eng ilg‘or texnologiyalar, sun'iy intellekt va amaliyot orqali xalqaro IT mutaxassisi bo‘lish imkonini beruvchi ekotizimdir.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl glass-panel-elevated border border-purple-500/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-500/40">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Bizning Missiyamiz</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            O‘zbekistonda va mintaqada dasturlash ta'limini tubdan yangilash. Nazariy quruq ma'ruzalardan voz kechib, har bir talabaga real loyihalar qurish, sun'iy intellekt mentori bilan ishlash va global bozorga munosib kadr bo‘lib yetishish imkonini taqdim etish.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-cyan-500/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/40">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Bizning Qarashimiz (Vision)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dasturlashni qiyin va zerikarli fan emas, balki ijodiy va hayajonli san'atga aylantirish. Shiori: <strong>"THE FUTURE STARTS WITH CODE"</strong> bo‘lgan erkin, intellektual va cheksiz imkoniyatlar makoni.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Asosiy Qadriyatlarimiz</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            <h3 className="text-base font-bold text-white">Eng Yangi Texnologiyalar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Biz faqat eng dolzarb freymvorklar va standartlar (HTML5, ES6+, React 19, TypeScript, Python, Gemini AI) asosida o‘rgatamiz.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
            <Globe2 className="w-6 h-6 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Barchaga Ochiq va Erkin</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auditoriyamiz yoshidan, kasbidan va joylashuvidan qat'i nazar dasturlashni sevuvchi har bir insonni qamrab oladi.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Haqiqiy Amaliy Natija</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Har bir dars amaliy kod topshiriqlari, avtomatlashtirilgan testlar va rasmiy tekshiruv kodli sertifikat bilan tasdiqlanadi.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('courses')}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Rocket className="w-4 h-4" />
          <span>Kurslarni O‘rganishni Boshlash</span>
        </button>
      </div>

    </div>
  );
};
