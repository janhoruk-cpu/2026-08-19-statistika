import React, { useState, useRef, useEffect } from 'react';
import { ChapterConfig, UnitConfig } from '../types';
import { ALL_UNITS } from '../data/curriculumData';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  SlidersHorizontal,
  Sun,
  Moon,
  Sparkles,
  Layout,
  MonitorPlay,
  BookOpen,
  Search,
  Calculator,
  Brain,
  Sigma,
  Wrench,
  FileText,
  AlertOctagon,
  GraduationCap,
} from 'lucide-react';

export type ViewLayoutMode = 'unified' | 'canvas' | 'split';

interface HeaderProps {
  currentUnit: UnitConfig;
  currentChapter: ChapterConfig;
  onSelectUnit: (unitId: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenCurriculum: () => void;
  onOpenSettings: () => void;
  onOpenGlossary: () => void;
  onOpenCalculators: () => void;
  onOpenFlashcards: () => void;
  onOpenFormulas: () => void;
  onOpenCaseStudies: () => void;
  onOpenParadoxes: () => void;
  onOpenPractice: () => void;
  onOpenSearch: () => void;
  viewMode: ViewLayoutMode;
  onSelectViewMode: (mode: ViewLayoutMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUnit,
  currentChapter,
  onSelectUnit,
  isDark,
  onToggleDark,
  isSidebarOpen,
  onToggleSidebar,
  onOpenCurriculum,
  onOpenSettings,
  onOpenGlossary,
  onOpenCalculators,
  onOpenFlashcards,
  onOpenFormulas,
  onOpenCaseStudies,
  onOpenParadoxes,
  onOpenPractice,
  onOpenSearch,
  viewMode,
  onSelectViewMode,
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);

  const currentIndex = ALL_UNITS.findIndex(u => u.id === currentUnit.id);
  const prevUnit = currentIndex > 0 ? ALL_UNITS[currentIndex - 1] : null;
  const nextUnit = currentIndex < ALL_UNITS.length - 1 ? ALL_UNITS[currentIndex + 1] : null;

  // Close tools dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsToolsOpen(false);
      }
    };

    if (isToolsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isToolsOpen]);

  return (
    <header className="h-14 border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between z-30 shrink-0">
      {/* LEFT: Full Curriculum Roadmap & Current Unit Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          onClick={onOpenCurriculum}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800/90 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer group"
          title="Učni načrt in pregled vseh učnih enot"
        >
          <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform" />
          <span>Učni načrt</span>
        </button>

        {/* Current Unit Badge */}
        <div className="hidden lg:flex items-center gap-2 min-w-0 border-l border-slate-200 dark:border-slate-800 pl-3">
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
            {currentUnit.unitNumber.startsWith('Uvod') ? currentUnit.unitNumber : `Enota ${currentUnit.unitNumber}`}
          </span>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[240px]">
            {currentUnit.title}
          </span>
        </div>
      </div>

      {/* CENTER: Clean Stepper (1 / 18) */}
      <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-1 shadow-2xs">
        <button
          onClick={() => prevUnit && onSelectUnit(prevUnit.id)}
          disabled={!prevUnit}
          className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
          title="Prejšnja učna enota (Ctrl + ←)"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono tracking-tight">
          {currentIndex + 1} <span className="text-slate-400 dark:text-slate-500 font-normal">/</span> {ALL_UNITS.length}
        </span>

        <button
          onClick={() => nextUnit && onSelectUnit(nextUnit.id)}
          disabled={!nextUnit}
          className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
          title="Naslednja učna enota (Ctrl + →)"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* RIGHT: Search, Unified Tools Dropdown, Theme & Settings */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Minimalist Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-slate-50/90 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium transition-all shadow-2xs group"
          title="Hitro iskanje po vsebinah in orodjih (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          <span className="hidden md:inline text-slate-500 dark:text-slate-400">Išči...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        {/* UNIFIED TOOLS DROPDOWN */}
        <div className="relative" ref={toolsMenuRef}>
          <button
            onClick={() => setIsToolsOpen(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
              isToolsOpen
                ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200'
            }`}
            title="Odpri statistična orodja, primere in vaje"
          >
            <Wrench className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Orodja</span>
            <ChevronDown
              className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                isToolsOpen ? 'rotate-180 text-indigo-600' : ''
              }`}
            />
          </button>

          {/* Tools Menu Popover */}
          {isToolsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Pripomočki & Učenje
              </div>

              {/* 1. Calculators */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenCalculators();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calculator className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Statistični kalkulatorji</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Z-score, 2-vzorčni t-test, χ², Bayes, moč
                  </div>
                </div>
              </button>

              {/* 2. Step-by-Step Practice Problems */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenPractice();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Vaje & izpitne naloge</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Vodene računske rešitve korak za korakom
                  </div>
                </div>
              </button>

              {/* 3. Case Studies */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenCaseStudies();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Študije primerov (Case Studies)</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Resnični medicinski in družbeni poskusi
                  </div>
                </div>
              </button>

              {/* 4. Paradoxes & Pitfalls */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenParadoxes();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <AlertOctagon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Pasti & paradoksi</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Simpsonov paradoks, P-hacking, Wald
                  </div>
                </div>
              </button>

              {/* 5. Formulas */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenFormulas();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Sigma className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Formularij & izreki</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    KaTeX matematični obrazci
                  </div>
                </div>
              </button>

              {/* 6. Flashcards */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenFlashcards();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Kartice za ponavljanje</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Active recall in samotestiranje
                  </div>
                </div>
              </button>

              {/* 7. Glossary */}
              <button
                onClick={() => {
                  setIsToolsOpen(false);
                  onOpenGlossary();
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold">Statistični slovar (A-Z)</div>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Dvojezična gesla s povezavami
                  </div>
                </div>
              </button>

              {/* Section Divider */}
              <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Način prikaza lekcije
                </div>

                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl">
                  <button
                    onClick={() => {
                      onSelectViewMode('unified');
                      setIsToolsOpen(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                      viewMode === 'unified'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                    title="Čist enoten pogled z vgrajenim platnom"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Enoten</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectViewMode('canvas');
                      setIsToolsOpen(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                      viewMode === 'canvas'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                    title="Celozaslonsko simulacijsko platno"
                  >
                    <MonitorPlay className="h-3 w-3" />
                    <span>Platno</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectViewMode('split');
                      setIsToolsOpen(false);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
                      viewMode === 'split'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                    title="Deljen pogled (teorija levo, simulacija desno)"
                  >
                    <Layout className="h-3 w-3" />
                    <span>Deljeno</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shadow-2xs"
          title={isDark ? 'Preklopi na svetlo temo' : 'Preklopi na temno temo'}
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5 text-amber-400" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-slate-700" />
          )}
        </button>

        {/* Dedicated Settings Page Link */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shadow-2xs"
          title="Odpre nastavitve teme, pisave in bližnjic"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>
    </header>
  );
};
