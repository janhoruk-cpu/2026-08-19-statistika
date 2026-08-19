import React, { useState } from 'react';
import { ChapterConfig, UnitConfig } from '../types';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  SlidersHorizontal,
  X,
  BookOpen,
  Calculator,
  Brain,
  Sigma,
  FileText,
  AlertOctagon,
  GraduationCap,
} from 'lucide-react';

interface CourseSidebarProps {
  chapters: ChapterConfig[];
  currentUnit: UnitConfig;
  onSelectUnit: (unitId: string) => void;
  completedUnits: string[];
  isOpen: boolean;
  onToggleSidebar: () => void;
  xp: number;
  streak: number;
  onOpenSettings: () => void;
  onOpenGlossary?: () => void;
  onOpenCalculators?: () => void;
  onOpenFlashcards?: () => void;
  onOpenFormulas?: () => void;
  onOpenCaseStudies?: () => void;
  onOpenParadoxes?: () => void;
  onOpenPractice?: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  chapters,
  currentUnit,
  onSelectUnit,
  completedUnits,
  isOpen,
  onToggleSidebar,
  xp,
  onOpenSettings,
  onOpenGlossary,
  onOpenCalculators,
  onOpenFlashcards,
  onOpenFormulas,
  onOpenCaseStudies,
  onOpenParadoxes,
  onOpenPractice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    chapters.forEach(ch => {
      initial[ch.id] = ch.units.some(u => u.id === currentUnit.id);
    });
    return initial;
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    chapters.forEach(ch => {
      all[ch.id] = true;
    });
    setExpandedChapters(all);
  };

  const collapseAll = () => {
    setExpandedChapters({});
  };

  // Filter units and chapters by search query
  const filteredChapters = chapters
    .map(chapter => {
      if (!searchQuery.trim()) return chapter;
      const q = searchQuery.toLowerCase();
      const matchingUnits = chapter.units.filter(
        u =>
          u.title.toLowerCase().includes(q) ||
          u.subtitle?.toLowerCase().includes(q) ||
          u.learningObjectives.some(obj => obj.toLowerCase().includes(q))
      );
      if (matchingUnits.length > 0 || chapter.title.toLowerCase().includes(q)) {
        return {
          ...chapter,
          units: matchingUnits.length > 0 ? matchingUnits : chapter.units,
        };
      }
      return null;
    })
    .filter((c): c is ChapterConfig => c !== null);

  const totalUnits = chapters.reduce((acc, c) => acc + c.units.length, 0);
  const completedCount = completedUnits.length;
  const progressPercent = Math.round((completedCount / totalUnits) * 100);

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={onToggleSidebar}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-2xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transition-transform duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              ST
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Seeing Theory
              </h2>
              <p className="text-[10px] text-slate-500">Vizualna verjetnost in statistika</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSidebar}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="Zapri stranski meni"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
            <span className="text-slate-600 dark:text-slate-400">Napredek v učbeniku</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
              {completedCount}/{totalUnits} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Išči po učnih enotah in konceptih..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Chapters Accordion */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredChapters.map(chapter => {
            const isExpanded = expandedChapters[chapter.id] ?? true;
            const chapterCompleted = chapter.units.every(u => completedUnits.includes(u.id));
            const chapterHasActive = chapter.units.some(u => u.id === currentUnit.id);

            return (
              <div key={chapter.id} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-xl transition-all ${
                    chapterHasActive
                      ? 'bg-slate-100 dark:bg-slate-800/70 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: chapter.color || '#6366f1' }}
                    />
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                        {chapter.chapterNumber === 0 ? 'Uvod:' : `P${chapter.chapterNumber}:`}
                      </span>
                      <span className="text-xs truncate">{chapter.title}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                    {chapterCompleted && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="pl-3 pr-1 py-0.5 space-y-0.5">
                    {chapter.units.map(unit => {
                      const isActive = unit.id === currentUnit.id;
                      const isDone = completedUnits.includes(unit.id);

                      return (
                        <button
                          key={unit.id}
                          onClick={() => {
                            onSelectUnit(unit.id);
                            onToggleSidebar();
                          }}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-all ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold shadow-xs'
                              : isDone
                              ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="shrink-0">
                            {isDone ? (
                              <CheckCircle2
                                className={`h-3.5 w-3.5 ${
                                  isActive ? 'text-indigo-200' : 'text-emerald-500'
                                }`}
                              />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-mono text-[10px] font-bold ${
                                  isActive ? 'text-indigo-200' : 'text-slate-400'
                                }`}
                              >
                                {unit.unitNumber}
                              </span>
                              <span className="truncate">{unit.title}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-2">
          {/* Quick Tools Grid */}
          <div className="grid grid-cols-3 gap-1.5 pb-1">
            {onOpenCalculators && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenCalculators();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shadow-2xs"
                title="Kalkulatorji"
              >
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mb-0.5" />
                <span>Kalkulator</span>
              </button>
            )}

            {onOpenPractice && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenPractice();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-blue-600 transition-colors shadow-2xs"
                title="Vaje & izpiti"
              >
                <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 mb-0.5" />
                <span>Vaje</span>
              </button>
            )}

            {onOpenCaseStudies && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenCaseStudies();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-purple-600 transition-colors shadow-2xs"
                title="Študije primerov"
              >
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400 mb-0.5" />
                <span>Primeri</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5 pb-1">
            {onOpenParadoxes && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenParadoxes();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-amber-600 transition-colors shadow-2xs"
                title="Pasti in paradoksi"
              >
                <AlertOctagon className="h-4 w-4 text-amber-600 dark:text-amber-400 mb-0.5" />
                <span>Pasti</span>
              </button>
            )}

            {onOpenFormulas && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenFormulas();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-emerald-600 transition-colors shadow-2xs"
                title="Formularij"
              >
                <Sigma className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mb-0.5" />
                <span>Formule</span>
              </button>
            )}

            {onOpenFlashcards && (
              <button
                onClick={() => {
                  onToggleSidebar();
                  onOpenFlashcards();
                }}
                className="flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-cyan-600 transition-colors shadow-2xs"
                title="Kartice za ponavljanje"
              >
                <Brain className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mb-0.5" />
                <span>Kartice</span>
              </button>
            )}
          </div>

          {onOpenGlossary && (
            <button
              onClick={() => {
                onToggleSidebar();
                onOpenGlossary();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Statistični slovar</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                A-Z
              </span>
            </button>
          )}

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onToggleSidebar();
                onOpenSettings();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Odpri nastavitve</span>
            </button>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {xp} XP
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
