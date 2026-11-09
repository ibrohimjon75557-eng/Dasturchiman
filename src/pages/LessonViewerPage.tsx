import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Bot, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronRight, 
  Award,
  Video,
  BookOpen,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonViewerPageProps {
  courseId: string;
  lessonId: string;
  onBackToCourse: (courseId: string) => void;
  onOpenAiMentorWithContext?: (context: string) => void;
}

export const LessonViewerPage: React.FC<LessonViewerPageProps> = ({
  courseId,
  lessonId,
  onBackToCourse,
  onOpenAiMentorWithContext,
}) => {
  const { user, completeLesson, addCertificate } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'exercise' | 'quiz'>('content');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  // Exercise state
  const [userExerciseCode, setUserExerciseCode] = useState<string>('');
  const [exerciseTested, setExerciseTested] = useState<boolean>(false);
  const [exerciseSuccess, setExerciseSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Find course and lesson
  const course = COURSES_DATA.find(c => c.id === courseId);
  let currentLesson = null;
  let nextLesson = null;

  if (course) {
    const allLessons = course.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    if (currentIndex !== -1) {
      currentLesson = allLessons[currentIndex];
      if (currentIndex < allLessons.length - 1) {
        nextLesson = allLessons[currentIndex + 1];
      }
    }
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-[#05050a] text-slate-300 flex flex-col items-center justify-center p-4">
        <p className="text-base mb-4">Dars topilmadi yoki yuklanmadi.</p>
        <button
          onClick={() => onBackToCourse(courseId)}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
        >
          Kursga qaytish
        </button>
      </div>
    );
  }

  const enrollment = user?.enrolledCourses.find(c => c.courseId === courseId);
  const isLessonCompleted = enrollment?.completedLessonIds.includes(currentLesson.id);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleRunExercise = () => {
    setExerciseTested(true);
    const currentEx = currentLesson.exercises[0];
    if (!currentEx) return;

    // Simple validation check against solution tokens
    const userCodeTrimmed = userExerciseCode.trim().toLowerCase();
    const solutionTokens = currentEx.solutionCode
      .split('\n')
      .map(line => line.trim().toLowerCase())
      .filter(line => line.length > 5);

    const match = solutionTokens.some(token => userCodeTrimmed.includes(token)) || userCodeTrimmed.length > 15;

    if (match) {
      setExerciseSuccess(true);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      setExerciseSuccess(false);
    }
  };

  const handleQuizSelect = (qId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // Check if all correct
    const allCorrect = currentLesson.quiz.every(q => selectedAnswers[q.id] === q.correctIndex);
    if (allCorrect) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleFinishLesson = () => {
    completeLesson(course.id, currentLesson.id, currentLesson.xp);
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Header / Navigation Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onBackToCourse(course.id)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/50 text-slate-400 hover:text-white transition-all"
            title="Kursga qaytish"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold block">
              {course.title}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        {/* Action button: Complete Lesson */}
        <div className="flex items-center gap-3">
          {onOpenAiMentorWithContext && (
            <button
              onClick={() => onOpenAiMentorWithContext(`Men "${course.title}" kursining "${currentLesson.title}" darsini o'rganyapman. Iltimos, bu mavzu bo'yicha menga tushuntirish bering.`)}
              className="px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:text-white hover:bg-purple-900 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI Ustozdan so‘rash</span>
            </button>
          )}

          <button
            onClick={handleFinishLesson}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isLessonCompleted
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLessonCompleted ? 'Dars yakunlangan' : 'Darsni tugatish (+XP)'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Video Player & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Uzbek Video Lesson Player */}
          <div className="rounded-3xl glass-panel-elevated p-2 border border-purple-500/30 overflow-hidden shadow-2xl">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Video className="w-4 h-4 text-cyan-400" /> O‘zbek tilidagi professional video-dars
              </span>
              <span>{currentLesson.durationMinutes} daqiqa</span>
            </div>
          </div>

          {/* Navigation Tabs (Nazariya, Mashq, Viktorina) */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'content'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dars Mazmuni & Nazariya</span>
            </button>

            {currentLesson.exercises.length > 0 && (
              <button
                onClick={() => setActiveTab('exercise')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'exercise'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Amaliy Mashq</span>
              </button>
            )}

            {currentLesson.quiz.length > 0 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Interaktiv Viktorina ({currentLesson.quiz.length})</span>
              </button>
            )}
          </div>

          {/* Tab 1: Theoretical Content */}
          {activeTab === 'content' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {currentLesson.contentMarkdown}
              </div>

              {/* Code Snippets */}
              {currentLesson.codeSnippets.map((snippet, sIdx) => (
                <div key={sIdx} className="rounded-2xl bg-[#090914] border border-purple-500/30 overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-white/5 text-xs">
                    <span className="font-mono text-cyan-300 font-semibold">{snippet.title}</span>
                    <button
                      onClick={() => handleCopyCode(snippet.code, sIdx)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedSnippetIndex === sIdx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Nusxalandi!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Nusxa olish</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                  {snippet.explanation && (
                    <div className="px-4 py-2 bg-slate-950/60 text-[11px] text-slate-400 border-t border-white/5">
                      💡 {snippet.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Practical Exercise */}
          {activeTab === 'exercise' && currentLesson.exercises[0] && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  {currentLesson.exercises[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  {currentLesson.exercises[0].instructions}
                </p>
              </div>

              {/* Code editor box */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  Kodingizni quyidagi maydonga yozing:
                </label>
                <textarea
                  value={userExerciseCode || currentLesson.exercises[0].starterCode}
                  onChange={(e) => setUserExerciseCode(e.target.value)}
                  rows={8}
                  className="w-full p-4 rounded-2xl bg-[#090914] border border-purple-500/40 text-cyan-300 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showHint ? 'Maslahatni berkitish' : 'Maslahat (Hint) kerakmi?'}</span>
                </button>

                <button
                  onClick={handleRunExercise}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                  Kodni tekshirish
                </button>
              </div>

              {showHint && (
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-300">
                  💡 <strong>Maslahat:</strong> {currentLesson.exercises[0].hint}
                </div>
              )}

              {exerciseTested && (
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                  exerciseSuccess
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                    : 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                }`}>
                  {exerciseSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Ofarin! Mashq muvaffaqiyatli bajarildi va sintaksis to‘g‘ri.</span>
                    </div>
                  ) : (
                    <div>
                      <p>Kodni qayta tekshirib ko‘ring yoki "Maslahat" tugmasini bosing.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Interactive Quiz */}
          {activeTab === 'quiz' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Dars Viktorinasi
                </h3>
                <span className="text-xs font-mono text-cyan-400">+{currentLesson.xp} XP</span>
              </div>

              <div className="space-y-6">
                {currentLesson.quiz.map((q, qIndex) => (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let optionStyle = 'bg-slate-950/70 border-white/5 text-slate-300 hover:border-purple-500/30';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-red-950/80 border-red-500 text-red-200';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-purple-950 border-purple-500 text-cyan-300 font-semibold';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleQuizSelect(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-slate-300">
                        📖 <strong>Tushuntirish:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-102 active:scale-98 transition-all disabled:opacity-40"
                >
                  Javoblarni Tekshirish
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-center">
                  <p className="text-xs font-bold text-cyan-300">Viktorina yakunlandi!</p>
                  <p className="text-[11px] text-slate-400 mt-1">Darsni to‘liq tamomlash uchun yuqoridagi "Darsni tugatish" tugmasini bosing.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Col: Course Syllabus Navigation & Progress */}
        <div className="space-y-6">
          
          {/* Progress Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Kurs Jarayoni
            </h4>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-white font-semibold">Umumiy bajarildi:</span>
              <span className="text-cyan-400 font-bold">{enrollment?.progressPercent || 0}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${enrollment?.progressPercent || 0}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {enrollment?.completedLessonIds.length || 0} / {course.modules.flatMap(m => m.lessons).length} darslar tugatildi
            </p>
          </div>

          {/* Quick Lessons List */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Darslar Ro‘yxati
            </h4>
            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
              {course.modules.map((mod) => (
                <div key={mod.id} className="space-y-1">
                  <p className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider pt-2">
                    {mod.title}
                  </p>
                  {mod.lessons.map((les) => {
                    const isDone = enrollment?.completedLessonIds.includes(les.id);
                    const isCurrent = les.id === currentLesson?.id;

                    return (
                      <div
                        key={les.id}
                        onClick={() => {
                          if (les.id !== currentLesson?.id) {
                            // switch lesson
                            window.location.hash = `#lesson-${les.id}`;
                          }
                        }}
                        className={`p-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-purple-950 border border-purple-500 text-white font-bold'
                            : isDone
                            ? 'bg-slate-900/40 text-slate-300 hover:bg-slate-800'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {les.durationMinutes}m
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Next Lesson Teaser */}
          {nextLesson && (
            <div className="glass-panel p-5 rounded-3xl border border-cyan-500/20 text-xs space-y-2">
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Keyingi dars:</span>
              <p className="font-bold text-white">{nextLesson.title}</p>
              <p className="text-slate-400 text-[11px] line-clamp-1">{nextLesson.summary}</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
