import { useState, useEffect, useMemo, useCallback } from 'react';
import { ALL_CHAPTERS, ALL_UNITS, getUnitById, getNextUnit, getPrevUnit } from './data/curriculumData';
import { Header, ViewLayoutMode } from './components/Header';
import { CourseSidebar } from './components/CourseSidebar';
import { UnitContent } from './components/UnitContent';
import { CanvasSandbox } from './components/CanvasSandbox';
import { UnifiedLessonView } from './components/UnifiedLessonView';
import { SettingsView, FontFamilyId, FontSizeId } from './components/SettingsView';
import { CurriculumView } from './components/CurriculumView';
import { GlossaryView } from './components/GlossaryView';
import { StatisticalCalculators } from './components/StatisticalCalculators';
import { FormulaReferenceView } from './components/FormulaReferenceView';
import { FlashcardsView } from './components/FlashcardsView';
import { CaseStudiesView } from './components/CaseStudiesView';
import { ParadoxesView } from './components/ParadoxesView';
import { PracticeProblemsView } from './components/PracticeProblemsView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SimulationManager } from './simulations/simulationRegistry';
import { ThemeId, THEMES } from './utils/themeConfig';
import { BookOpen, MonitorPlay } from 'lucide-react';

type AppPage =
  | 'classroom'
  | 'settings'
  | 'curriculum'
  | 'glossary'
  | 'calculators'
  | 'formulas'
  | 'flashcards'
  | 'cases'
  | 'paradoxes'
  | 'practice';

export default function App() {
  // Navigation & Page state
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'settings') return 'settings';
    if (hash === 'curriculum') return 'curriculum';
    if (hash === 'glossary') return 'glossary';
    if (hash === 'calculators') return 'calculators';
    if (hash === 'formulas') return 'formulas';
    if (hash === 'flashcards') return 'flashcards';
    if (hash === 'cases') return 'cases';
    if (hash === 'paradoxes') return 'paradoxes';
    if (hash === 'practice') return 'practice';
    return 'classroom';
  });

  const [currentUnitId, setCurrentUnitId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('unit-')) return hash;
    const saved = localStorage.getItem('seeing_theory_last_unit');
    return saved || 'unit-0-1';
  });

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Glossary state
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState<string | null>(null);

  const handleOpenGlossary = (termId?: string) => {
    setSelectedGlossaryTermId(termId || null);
    navigateTo('glossary');
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeId>('indigo');

  // Light theme by default
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('seeing_theory_theme_mode');
    return saved === 'dark';
  });

  // Sidebar closed by default for a clean, non-cluttered start
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [fontFamily, setFontFamily] = useState<FontFamilyId>(() => {
    const saved = localStorage.getItem('seeing_theory_font');
    return (saved as FontFamilyId) || 'jakarta';
  });

  const [fontSize, setFontSize] = useState<FontSizeId>(() => {
    const saved = localStorage.getItem('seeing_theory_font_size');
    return (saved as FontSizeId) || 'normal';
  });

  // Default to unified single-column flow
  const [viewMode, setViewMode] = useState<ViewLayoutMode>(() => {
    const saved = localStorage.getItem('seeing_theory_view_mode');
    return (saved as ViewLayoutMode) || 'unified';
  });

  const [mobileTab, setMobileTab] = useState<'theory' | 'sandbox'>('theory');

  // Gamification stats
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('seeing_theory_xp');
    return saved ? parseInt(saved, 10) : 150;
  });
  const [streak] = useState<number>(3);
  const [completedUnits, setCompletedUnits] = useState<string[]>(() => {
    const saved = localStorage.getItem('seeing_theory_completed');
    return saved ? JSON.parse(saved) : ['unit-1-1'];
  });

  // URL Hash Synchronizer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'settings') {
        setCurrentPage('settings');
      } else if (hash === 'curriculum') {
        setCurrentPage('curriculum');
      } else if (hash === 'glossary') {
        setCurrentPage('glossary');
      } else if (hash === 'calculators') {
        setCurrentPage('calculators');
      } else if (hash === 'formulas') {
        setCurrentPage('formulas');
      } else if (hash === 'flashcards') {
        setCurrentPage('flashcards');
      } else if (hash === 'cases') {
        setCurrentPage('cases');
      } else if (hash === 'paradoxes') {
        setCurrentPage('paradoxes');
      } else if (hash === 'practice') {
        setCurrentPage('practice');
      } else if (hash.startsWith('unit-')) {
        setCurrentUnitId(hash);
        setCurrentPage('classroom');
      } else {
        setCurrentPage('classroom');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage, unitId?: string) => {
    setCurrentPage(page);
    if (page === 'settings') {
      window.location.hash = '#settings';
    } else if (page === 'curriculum') {
      window.location.hash = '#curriculum';
    } else if (page === 'glossary') {
      window.location.hash = '#glossary';
    } else if (page === 'calculators') {
      window.location.hash = '#calculators';
    } else if (page === 'formulas') {
      window.location.hash = '#formulas';
    } else if (page === 'flashcards') {
      window.location.hash = '#flashcards';
    } else if (page === 'cases') {
      window.location.hash = '#cases';
    } else if (page === 'paradoxes') {
      window.location.hash = '#paradoxes';
    } else if (page === 'practice') {
      window.location.hash = '#practice';
    } else {
      const targetUnit = unitId || currentUnitId;
      window.location.hash = `#${targetUnit}`;
    }
  };

  const handleSelectUnit = (unitId: string) => {
    setCurrentUnitId(unitId);
    localStorage.setItem('seeing_theory_last_unit', unitId);
    navigateTo('classroom', unitId);
  };

  const handleSelectViewMode = (mode: ViewLayoutMode) => {
    setViewMode(mode);
    localStorage.setItem('seeing_theory_view_mode', mode);
  };

  // Find active unit and chapter
  const currentUnit = useMemo(() => {
    return getUnitById(currentUnitId) || ALL_UNITS[0];
  }, [currentUnitId]);

  const currentChapter = useMemo(() => {
    return (
      ALL_CHAPTERS.find(c => c.id === currentUnit.chapterId) || ALL_CHAPTERS[0]
    );
  }, [currentUnit]);

  // Persistent Simulation Manager for the current unit
  const simManager = useMemo(() => {
    return new SimulationManager(currentUnit.simulationId);
  }, [currentUnit.simulationId]);

  // Clean sync handler for interactive text triggers
  const handleSyncSimulation = useCallback(
    (action: string, payload?: any) => {
      if (action === 'reset') {
        simManager.reset();
      } else if (action === 'sample') {
        simManager.step(payload?.count || 1);
      } else if (action === 'setParams') {
        simManager.updateParams(payload);
      }
    },
    [simManager]
  );

  // Mark completion & award XP
  const handleCompleteUnit = (unitId: string) => {
    if (!completedUnits.includes(unitId)) {
      const updated = [...completedUnits, unitId];
      setCompletedUnits(updated);
      localStorage.setItem('seeing_theory_completed', JSON.stringify(updated));
      const newXp = xp + 50;
      setXp(newXp);
      localStorage.setItem('seeing_theory_xp', newXp.toString());
    }
  };

  const handleNextUnit = () => {
    const next = getNextUnit(currentUnitId);
    if (next) {
      handleCompleteUnit(currentUnitId);
      handleSelectUnit(next.id);
    }
  };

  const nextUnit = getNextUnit(currentUnitId);
  const prevUnit = getPrevUnit(currentUnitId);
  const hasNext = Boolean(nextUnit);
  const hasPrev = Boolean(prevUnit);

  // Sync dark mode class with root html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('seeing_theory_theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('seeing_theory_theme_mode', 'light');
    }
  }, [isDark]);

  // Global Keyboard Shortcuts (Esc to close, Ctrl+K for search, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open Search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
        return;
      }

      // If search or modal is open, don't trigger navigation keys
      if (isSearchOpen) return;

      // Ctrl + Arrow navigation
      if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight' && nextUnit) {
        e.preventDefault();
        handleSelectUnit(nextUnit.id);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft' && prevUnit) {
        e.preventDefault();
        handleSelectUnit(prevUnit.id);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, nextUnit, prevUnit, currentUnitId]);

  // Apply typography settings to body
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font', fontFamily);
    root.setAttribute('data-size', fontSize);
  }, [fontFamily, fontSize]);

  // SUBPAGE 1: DEDICATED FULL SETTINGS PAGE
  if (currentPage === 'settings') {
    return (
      <SettingsView
        onBack={() => navigateTo('classroom')}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        fontFamily={fontFamily}
        onChangeFont={font => {
          setFontFamily(font);
          localStorage.setItem('seeing_theory_font', font);
        }}
        fontSize={fontSize}
        onChangeFontSize={size => {
          setFontSize(size);
          localStorage.setItem('seeing_theory_font_size', size);
        }}
      />
    );
  }

  // SUBPAGE 2: DEDICATED FULL ROADMAP / CURRICULUM PAGE
  if (currentPage === 'curriculum') {
    return (
      <CurriculumView
        onBack={() => navigateTo('classroom')}
        onSelectUnit={handleSelectUnit}
        completedUnits={completedUnits}
        currentUnitId={currentUnitId}
        onOpenGlossary={() => navigateTo('glossary')}
      />
    );
  }

  // SUBPAGE 3: DEDICATED FULL BILINGUAL GLOSSARY PAGE
  if (currentPage === 'glossary') {
    return (
      <GlossaryView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
        initialTermId={selectedGlossaryTermId}
      />
    );
  }

  // SUBPAGE 4: INTERACTIVE STATISTICAL CALCULATORS
  if (currentPage === 'calculators') {
    return (
      <StatisticalCalculators
        onBack={() => navigateTo('classroom', currentUnitId)}
        onOpenGlossary={handleOpenGlossary}
        onSelectUnit={handleSelectUnit}
      />
    );
  }

  // SUBPAGE 5: COMPREHENSIVE FORMULA SHEET
  if (currentPage === 'formulas') {
    return (
      <FormulaReferenceView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
      />
    );
  }

  // SUBPAGE 6: INTERACTIVE FLASHCARDS
  if (currentPage === 'flashcards') {
    return (
      <FlashcardsView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
      />
    );
  }

  // SUBPAGE 7: REAL-WORLD CASE STUDIES (Študije primerov)
  if (currentPage === 'cases') {
    return (
      <CaseStudiesView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
        onOpenGlossary={handleOpenGlossary}
      />
    );
  }

  // SUBPAGE 8: STATISTICAL PITFALLS & PARADOXES (Pasti in paradoksi)
  if (currentPage === 'paradoxes') {
    return (
      <ParadoxesView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
      />
    );
  }

  // SUBPAGE 9: STEP-BY-STEP PRACTICE PROBLEMS (Vaje & izpitne naloge)
  if (currentPage === 'practice') {
    return (
      <PracticeProblemsView
        onBack={() => navigateTo('classroom', currentUnitId)}
        onSelectUnit={handleSelectUnit}
        onOpenCalculators={() => navigateTo('calculators')}
      />
    );
  }

  // MAIN CLASSROOM VIEW
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* 1. Header with Tools & Search */}
      <Header
        currentUnit={currentUnit}
        currentChapter={currentChapter}
        onSelectUnit={handleSelectUnit}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSettings={() => navigateTo('settings')}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenCalculators={() => navigateTo('calculators')}
        onOpenFlashcards={() => navigateTo('flashcards')}
        onOpenFormulas={() => navigateTo('formulas')}
        onOpenCaseStudies={() => navigateTo('cases')}
        onOpenParadoxes={() => navigateTo('paradoxes')}
        onOpenPractice={() => navigateTo('practice')}
        onOpenSearch={() => setIsSearchOpen(true)}
        viewMode={viewMode}
        onSelectViewMode={handleSelectViewMode}
      />

      {/* 2. Slide-over Curriculum Drawer */}
      <CourseSidebar
        chapters={ALL_CHAPTERS}
        currentUnit={currentUnit}
        onSelectUnit={handleSelectUnit}
        completedUnits={completedUnits}
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(false)}
        xp={xp}
        streak={streak}
        onOpenSettings={() => navigateTo('settings')}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenCalculators={() => navigateTo('calculators')}
        onOpenFlashcards={() => navigateTo('flashcards')}
        onOpenFormulas={() => navigateTo('formulas')}
        onOpenCaseStudies={() => navigateTo('cases')}
        onOpenParadoxes={() => navigateTo('paradoxes')}
        onOpenPractice={() => navigateTo('practice')}
      />

      {/* 3. Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectUnit={handleSelectUnit}
        onOpenGlossary={handleOpenGlossary}
        onOpenCalculators={() => navigateTo('calculators')}
        onOpenFlashcards={() => navigateTo('flashcards')}
        onOpenFormulas={() => navigateTo('formulas')}
        onOpenCaseStudies={() => navigateTo('cases')}
        onOpenParadoxes={() => navigateTo('paradoxes')}
        onOpenPractice={() => navigateTo('practice')}
      />

      {/* 4. Main Learning Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* MODE 1 (DEFAULT): Unified Single-Column Flow */}
        {viewMode === 'unified' && (
          <div className="flex-1 overflow-hidden">
            <UnifiedLessonView
              unit={currentUnit}
              simManager={simManager}
              currentTheme={currentTheme}
              onNextUnit={handleNextUnit}
              hasNextUnit={hasNext}
              onSyncSimulation={handleSyncSimulation}
              onOpenGlossary={handleOpenGlossary}
            />
          </div>
        )}

        {/* MODE 2: Pure Canvas Fullscreen */}
        {viewMode === 'canvas' && (
          <div className="flex-1 h-full relative overflow-hidden bg-slate-100/70 dark:bg-slate-950 p-4 sm:p-6">
            <div className="h-full w-full max-w-6xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs bg-white dark:bg-slate-900">
              <CanvasSandbox
                unit={currentUnit}
                simManager={simManager}
                currentTheme={currentTheme}
              />
            </div>
          </div>
        )}

        {/* MODE 3: Classic 50/50 Split Screen */}
        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Desktop Split View: Left (Theory) / Right (Sandbox) */}
            <div className="hidden md:flex flex-1 h-full overflow-hidden">
              <div className="w-1/2 h-full border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
                <UnitContent
                  unit={currentUnit}
                  simManager={simManager}
                  onNextUnit={handleNextUnit}
                  hasNextUnit={hasNext}
                  onSyncSimulation={handleSyncSimulation}
                  onOpenGlossary={handleOpenGlossary}
                />
              </div>
              <div className="w-1/2 h-full p-4 overflow-hidden bg-slate-100/60 dark:bg-slate-950">
                <div className="h-full w-full rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
                  <CanvasSandbox
                    unit={currentUnit}
                    simManager={simManager}
                    currentTheme={currentTheme}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Tabbed Layout for Split Mode */}
            <div className="md:hidden flex-1 flex flex-col overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <button
                  onClick={() => setMobileTab('theory')}
                  className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    mobileTab === 'theory'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Teorija</span>
                </button>
                <button
                  onClick={() => setMobileTab('sandbox')}
                  className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    mobileTab === 'sandbox'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <MonitorPlay className="h-3.5 w-3.5" />
                  <span>Simulacija</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mobileTab === 'theory' ? (
                  <UnitContent
                    unit={currentUnit}
                    simManager={simManager}
                    onNextUnit={handleNextUnit}
                    hasNextUnit={hasNext}
                    onSyncSimulation={handleSyncSimulation}
                    onOpenGlossary={handleOpenGlossary}
                  />
                ) : (
                  <div className="p-3 h-full">
                    <CanvasSandbox
                      unit={currentUnit}
                      simManager={simManager}
                      currentTheme={currentTheme}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
