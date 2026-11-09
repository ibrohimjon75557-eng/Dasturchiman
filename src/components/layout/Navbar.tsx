import React, { useState } from 'react';
import { VeloraLogo } from '../brand/VeloraLogo';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Bell, 
  Flame, 
  User as UserIcon, 
  Menu, 
  X, 
  Terminal, 
  Bot, 
  BookOpen, 
  LayoutDashboard, 
  ShieldCheck, 
  Sun, 
  Moon,
  Sparkles,
  LogOut,
  CheckCircle2,
  Trophy
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenAuthModal,
}) => {
  const { 
    user, 
    isAuthenticated, 
    isAdmin, 
    notifications, 
    unreadNotificationsCount, 
    markNotificationsAsRead, 
    logout,
    theme,
    toggleTheme
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Bosh Sahifa', icon: Sparkles },
    { id: 'courses', label: 'Kurslar', icon: BookOpen },
    { id: 'playground', label: 'Playground', icon: Terminal, badge: 'Jonli' },
    { id: 'ai-mentor', label: 'AI Ustoz', icon: Bot, badge: 'Gemini' },
    { id: 'dashboard', label: 'Mening Profilim', icon: LayoutDashboard },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin', icon: ShieldCheck, badge: 'Pro' });
  }

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070711]/85 border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer transition-transform hover:opacity-95 active:scale-98"
          >
            <VeloraLogo size="md" showSlogan={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-purple-950/80 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/70 border border-white/10 hover:border-purple-500/40 transition-all group"
              title="Qidirish (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden md:inline text-xs text-slate-400 font-mono">Qidiruv...</span>
              <kbd className="hidden md:inline text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">⌘K</kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-yellow-400 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
              title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Streak Counter (Gamification) */}
            {isAuthenticated && user && (
              <div 
                onClick={() => handleNavClick('dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 cursor-pointer hover:bg-orange-500/20 transition-all"
                title={`${user.streakDays} kunlik uzluksiz o'qish seriyasi!`}
              >
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                <span className="text-xs font-bold font-mono">{user.streakDays} kun</span>
              </div>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications && unreadNotificationsCount > 0) {
                    markNotificationsAsRead();
                  }
                }}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/5 transition-all"
                title="Xabarnomalar"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 text-[#070711] text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_#22d3ee]">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel-elevated p-4 shadow-2xl z-50 border border-purple-500/20 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white">Xabarlar va Eslatmalar</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Barchasi ({notifications.length})</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">Hozircha yangi xabarnomalar yo‘q</p>
                    ) : (
                      notifications.map((n) => (
                        <div 
                          key={n.id}
                          className={`p-3 rounded-xl border text-xs transition-colors ${
                            n.read 
                              ? 'bg-slate-900/40 border-white/5 text-slate-300' 
                              : 'bg-purple-950/40 border-purple-500/30 text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold mb-1">
                            <span className="text-cyan-300">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login CTA */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-slate-900 border border-purple-500/40 hover:border-cyan-400/60 transition-all group"
                >
                  <div className="hidden sm:flex flex-col text-right mr-1">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-purple-400 font-mono font-semibold">
                      {user.xp} XP
                    </span>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-purple-400/50"
                  />
                </button>

                {/* Profile dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-panel-elevated p-3 shadow-2xl z-50 border border-purple-500/30 animate-in fade-in zoom-in-95">
                    <div className="p-2 border-b border-white/10 mb-2">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs bg-purple-950/60 p-2 rounded-lg border border-purple-500/20">
                        <span className="text-slate-300">Daraja:</span>
                        <span className="font-bold text-cyan-300">
                          {user.xp > 2500 ? 'Kiber Muhandis' : user.xp > 1000 ? 'Dastur Ustasi' : 'Yangi Boshlovchi'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleNavClick('dashboard');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-400" />
                        <span>Mening Profilim & Yutuqlar</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('courses');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>Mening Kurslarim ({user.enrolledCourses.length})</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            handleNavClick('admin');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-amber-300 hover:bg-amber-500/10 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <span>Admin Boshqaruv Paneli</span>
                        </button>
                      )}

                      <div className="pt-2 border-t border-white/10 mt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Chiqish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-95 transition-all"
              >
                Kirish / Ro‘yxatdan o‘tish
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel-elevated border-b border-purple-500/20 px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {!isAuthenticated && (
              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-center shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                  Kirish / Ro‘yxatdan o‘tish
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
