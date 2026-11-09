import React, { useState } from 'react';
import { VeloraLogo } from '../brand/VeloraLogo';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
}) => {
  const { login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(defaultMode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Iltimos, to‘g‘ri elektron pochta manzilini kiriting.');
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo‘lishi lozim.');
      return;
    }

    if (!isLoginMode && !name.trim()) {
      setError('Iltimos, ism va familiyangizni kiriting.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLoginMode) {
        const isAdmin = email.toLowerCase().includes('admin');
        login(email, isAdmin ? 'admin' : 'student', name || undefined);
      } else {
        register(name, email);
      }
      onClose();
    }, 600);
  };

  const handleQuickDemo = (role: 'student' | 'admin') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        login('admin@velora.uz', 'admin', 'Bosh Administrator');
      } else {
        login('ibrohimjon75557@gmail.com', 'student', 'Ibrohimjon Ergashov');
      }
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-purple-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 bg-gradient-to-r from-purple-600 via-cyan-500 to-indigo-600 rounded-full blur-3xl opacity-40 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Brand Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <VeloraLogo size="lg" showSlogan={true} />
          <p className="text-xs text-slate-400 mt-2">
            {isLoginMode 
              ? 'Akkauntingizga kiring va darslarni davom ettiring' 
              : 'Yangi hisob oching va bepul 200 XP qo‘lga kiriting'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900/80 border border-white/5 mb-6">
          <button
            type="button"
            onClick={() => { setIsLoginMode(true); setError(''); }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              isLoginMode 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginMode(false); setError(''); }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              !isLoginMode 
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ism va Familiya
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Sardor Aliyev"
                  required={!isLoginMode}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Elektron Pochta
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nomingiz@mail.uz"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>{isLoginMode ? 'Kirish' : 'Ro‘yxatdan o‘tish va Boshlash'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] text-center text-slate-400 mb-3 uppercase tracking-wider font-semibold">
            Tezkor Namuna (1 Bosishda Kirish):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="py-2.5 px-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Talaba Profili</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2.5 px-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Paneli</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
