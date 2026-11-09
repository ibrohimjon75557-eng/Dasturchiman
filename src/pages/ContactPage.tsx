import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  Sparkles,
  HelpCircle 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
          BOG‘LANISH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Biz Bilan Aloqada Bo‘ling
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Savollaringiz, takliflaringiz yoki hamkorlik masalalarida bizga istalgan vaqtda murojaat qilishingiz mumkin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Info (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl glass-panel-elevated border border-purple-500/30 space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Aloqa Ma'lumotlari
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-500/30 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Elektron Pochta:</p>
                  <a href="mailto:support@velora.uz" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    support@velora.uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Telegram Rasmiy:</p>
                  <a href="https://t.me/velora_uz" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    @velora_uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Yagona Call-Markaz:</p>
                  <p className="font-semibold text-white font-mono">+998 (71) 200-00-00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-950 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Ish Vaqti:</p>
                  <p className="font-semibold text-white">Dushanba - Shanba, 09:00 - 20:00</p>
                  <p className="text-[10px] text-cyan-400 font-mono mt-0.5">AI Ustoz 24/7 onlayn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (3 Cols) */}
        <div className="lg:col-span-3">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-purple-500/30 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">
              Xabar Yuborish
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Murojaatingizni yozib qoldiring, mutaxassislarimiz 24 soat ichida javob qaytarishadi.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Rahmat! Xabaringiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ismingiz</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Sardor"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Elektron Pochta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nomingiz@mail.uz"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Mavzu</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Masalan: Kurslar bo‘yicha savol yoki hamkorlik"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Xabar Matni</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="O‘z savolingiz yoki fikringizni batafsil yozing..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Xabarni Yuborish</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
