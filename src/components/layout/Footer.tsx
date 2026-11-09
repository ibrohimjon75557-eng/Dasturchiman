import React, { useState } from 'react';
import { VeloraLogo } from '../brand/VeloraLogo';
import { 
  Send, 
  CheckCircle2, 
  Github, 
  Youtube, 
  MessageCircle, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#04040a] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background cyber ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-purple-900/15 via-blue-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="cursor-pointer inline-block"
            >
              <VeloraLogo size="lg" showSlogan={true} />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              VELORA — yangi avlod xalqaro dasturlash ta'lim platformasi. 
              Sun'iy intellekt, interaktiv amaliyot va zamonaviy texnologiyalar bilan o‘z IT faoliyatingizni quring.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-bold block mb-2">
                Shiorimiz:
              </span>
              <p className="text-base font-semibold text-white italic">
                "Kelajak shu yerdan boshlanadi."
              </p>
              <p className="text-xs text-cyan-400 font-mono tracking-wider">
                THE FUTURE STARTS WITH CODE
              </p>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-3 pt-3">
              <a 
                href="https://t.me/velora_uz" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-105 transition-all shadow-md"
                title="Telegram Kanal"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-purple-400 hover:border-purple-400/50 hover:scale-105 transition-all shadow-md"
                title="GitHub Repozitoriya"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400/50 hover:scale-105 transition-all shadow-md"
                title="YouTube Darslar"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 3: Kurslar katalogi */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Asosiy Kurslar
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('courses', 'course-html')} className="hover:text-cyan-300 transition-colors">
                  HTML & CSS Veb Asoslari
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses', 'course-js')} className="hover:text-cyan-300 transition-colors">
                  JavaScript Dinamik Veb
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses', 'course-python')} className="hover:text-cyan-300 transition-colors">
                  Python & Sun'iy Intellekt
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses', 'course-react')} className="hover:text-cyan-300 transition-colors">
                  React SPA Kutubxonasi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses', 'course-fullstack')} className="hover:text-cyan-300 transition-colors">
                  Full Stack Arxitektura
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses', 'course-cpp')} className="hover:text-cyan-300 transition-colors">
                  C++ Tizimli Dasturlash
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="text-purple-400 font-bold hover:underline flex items-center gap-1">
                  Barcha 12 ta kurs →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platforma Imkoniyatlari */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Platforma
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('playground')} className="hover:text-cyan-300 transition-colors">
                  Kod Playground (Jonli)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-mentor')} className="hover:text-cyan-300 transition-colors">
                  VELORA AI Ustoz (24/7)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Reyting & Sertifikatlar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-300 transition-colors">
                  Biz haqimizda
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-cyan-300 transition-colors">
                  Ko‘p beriladigan savollar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-300 transition-colors">
                  Bog‘lanish va Qo‘llab-quvvatlash
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Yangi Darslar
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Yangi bepul darslar, hakatonlar va IT yangiliklaridan birinchilardan bo‘lib xabardor bo‘ling.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Elektron pochtangiz..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Obuna bo‘lish</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="mt-2 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Rahmat! Muvaffaqiyatli obuna bo‘ldingiz.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 VELORA Inc. Barcha huquqlar qonun bilan himoyalangan.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Qoidalar
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Maxfiylik Siyosati
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Xavfsizlik
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
