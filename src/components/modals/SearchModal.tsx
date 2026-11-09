import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from '../../data/coursesData';
import { Search, X, BookOpen, ChevronRight, Zap, PlayCircle } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  onSelectLesson: (courseId: string, lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  const filteredCourses = trimmedQuery
    ? COURSES_DATA.filter(c => 
        c.title.toLowerCase().includes(trimmedQuery) ||
        c.description.toLowerCase().includes(trimmedQuery) ||
        c.category.toLowerCase().includes(trimmedQuery)
      )
    : COURSES_DATA.slice(0, 4);

  // Search through lessons
  const lessonResults: { courseId: string; courseTitle: string; lessonId: string; lessonTitle: string }[] = [];
  if (trimmedQuery.length >= 2) {
    COURSES_DATA.forEach(course => {
      course.modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (
            lesson.title.toLowerCase().includes(trimmedQuery) ||
            lesson.summary.toLowerCase().includes(trimmedQuery)
          ) {
            lessonResults.push({
              courseId: course.id,
              courseTitle: course.title,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
            });
          }
        });
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl glass-panel-elevated p-6 shadow-2xl border border-purple-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-purple-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurslar, darslar yoki mavzularni qidiring (masalan: React, Python, Flexbox, SQL)..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-4 pr-1">
          {/* Courses matches */}
          <div>
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              {trimmedQuery ? 'Topilgan Kurslar' : 'Mashhur Kurslar'}
            </h5>

            <div className="space-y-1.5">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course.id);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] cursor-pointer border border-transparent hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-950 flex items-center justify-center text-purple-300 border border-purple-500/30">
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {course.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{course.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {course.level}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons matches */}
          {lessonResults.length > 0 && (
            <div className="pt-2 border-t border-white/5">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <PlayCircle className="w-3.5 h-3.5 text-purple-400" />
                Mavzular va Darslar ({lessonResults.length})
              </h5>
              <div className="space-y-1.5">
                {lessonResults.slice(0, 5).map((l, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectLesson(l.courseId, l.lessonId);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-950/40 cursor-pointer border border-transparent hover:border-purple-500/40 transition-all group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {l.lessonTitle}
                      </p>
                      <p className="text-[11px] text-purple-400">{l.courseTitle}</p>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono">Darsni ochish →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trimmedQuery && filteredCourses.length === 0 && lessonResults.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              <p>"{query}" bo‘yicha hech qanday natija topilmadi.</p>
              <p className="text-xs text-slate-500 mt-1">Boshqa so‘z yoki texnologiya nomini sinab ko‘ring.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
