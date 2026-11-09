import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/modals/SearchModal';
import { AuthModal } from './components/modals/AuthModal';
import { CertificateModal } from './components/modals/CertificateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { LessonViewerPage } from './pages/LessonViewerPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AiMentorPage } from './pages/AiMentorPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';

import { Certificate } from './types';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [activeLesson, setActiveLesson] = useState<{ courseId: string; lessonId: string } | null>(null);
  const [aiMentorPrompt, setAiMentorPrompt] = useState<string | undefined>(undefined);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'courses' && param) {
      setSelectedCourseId(param);
      setCurrentTab('courses');
      setActiveLesson(null);
      return;
    }

    if (tab === 'courses') {
      setSelectedCourseId(undefined);
      setActiveLesson(null);
    }

    setCurrentTab(tab);
  };

  const handleNavigateToLesson = (courseId: string, lessonId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveLesson({ courseId, lessonId });
    setCurrentTab('lesson');
  };

  const handleOpenAiMentorWithContext = (context: string) => {
    setAiMentorPrompt(context);
    setCurrentTab('ai-mentor');
  };

  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesPage
            initialCourseId={selectedCourseId}
            onNavigateToLesson={handleNavigateToLesson}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'lesson' && activeLesson && (
          <LessonViewerPage
            courseId={activeLesson.courseId}
            lessonId={activeLesson.lessonId}
            onBackToCourse={(cId) => handleNavigate('courses', cId)}
            onOpenAiMentorWithContext={handleOpenAiMentorWithContext}
          />
        )}

        {currentTab === 'playground' && (
          <PlaygroundPage />
        )}

        {currentTab === 'ai-mentor' && (
          <AiMentorPage
            initialPrompt={aiMentorPrompt}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onNavigateToCourse={(cId) => handleNavigate('courses', cId)}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPage />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'faq' && (
          <FaqPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={(cId) => handleNavigate('courses', cId)}
        onSelectLesson={handleNavigateToLesson}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
