import React, { useState, useEffect, useRef } from 'react';
import { ALL_CHAPTERS, ALL_UNITS } from '../data/curriculumData';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { PARADOXES_DATA } from '../data/paradoxesData';
import { PRACTICE_PROBLEMS } from '../data/practiceProblemsData';
import {
  Search,
  BookOpen,
  X,
  Calculator,
  Brain,
  Sigma,
  ArrowRight,
  Sparkles,
  FileText,
  AlertOctagon,
  GraduationCap,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit: (unitId: string) => void;
  onOpenGlossary: (termId?: string) => void;
  onOpenCalculators: () => void;
  onOpenFlashcards: () => void;
  onOpenFormulas: () => void;
  onOpenCaseStudies?: () => void;
  onOpenParadoxes?: () => void;
  onOpenPractice?: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectUnit,
  onOpenGlossary,
  onOpenCalculators,
  onOpenFlashcards,
  onOpenFormulas,
  onOpenCaseStudies,
  onOpenParadoxes,
  onOpenPractice,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedQuery = query.toLowerCase().trim();

  // Search in units
  const matchedUnits = trimmedQuery
    ? ALL_UNITS.filter(
        u =>
          u.title.toLowerCase().includes(trimmedQuery) ||
          u.subtitle?.toLowerCase().includes(trimmedQuery) ||
          u.deepDive?.toLowerCase().includes(trimmedQuery) ||
          u.unitNumber.includes(trimmedQuery)
      ).slice(0, 5)
    : ALL_UNITS.slice(0, 3);

  // Search in glossary terms
  const matchedGlossary = trimmedQuery
    ? GLOSSARY_TERMS.filter(
        g =>
          g.slo.toLowerCase().includes(trimmedQuery) ||
          g.eng.toLowerCase().includes(trimmedQuery) ||
          g.definition.toLowerCase().includes(trimmedQuery)
      ).slice(0, 5)
    : GLOSSARY_TERMS.slice(0, 3);

  // Search in case studies
  const matchedCases = trimmedQuery
    ? CASE_STUDIES.filter(
        c =>
          c.title.toLowerCase().includes(trimmedQuery) ||
          c.subtitle.toLowerCase().includes(trimmedQuery) ||
          c.summary.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  // Search in paradoxes
  const matchedParadoxes = trimmedQuery
    ? PARADOXES_DATA.filter(
        p =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          p.subtitle.toLowerCase().includes(trimmedQuery) ||
          p.story.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  // Search in practice problems
  const matchedProblems = trimmedQuery
    ? PRACTICE_PROBLEMS.filter(
        p =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          p.topic.toLowerCase().includes(trimmedQuery) ||
          p.problemStatement.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs cursor-default"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150 cursor-default"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Išči po lekcijah, slovarju, vajah, paradoksih ali primerih... (npr. t-test, CLT, stent, Simpson)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Quick Tools Shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-medium shrink-0">Orodja:</span>

          <button
            onClick={() => {
              onClose();
              onOpenGlossary();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
          >
            <BookOpen className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
            <span>Slovar</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCalculators();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
          >
            <Calculator className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Kalkulatorji</span>
          </button>

          {onOpenPractice && (
            <button
              onClick={() => {
                onClose();
                onOpenPractice();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
            >
              <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Vaje & izpiti</span>
            </button>
          )}

          {onOpenCaseStudies && (
            <button
              onClick={() => {
                onClose();
                onOpenCaseStudies();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
            >
              <FileText className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
              <span>Študije primerov</span>
            </button>
          )}

          {onOpenParadoxes && (
            <button
              onClick={() => {
                onClose();
                onOpenParadoxes();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
            >
              <AlertOctagon className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>Pasti & paradoksi</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onOpenFormulas();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors shrink-0 font-medium"
          >
            <Sigma className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Formularij</span>
          </button>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Units Section */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Učne enote v učbeniku ({matchedUnits.length})</span>
            </h3>

            <div className="space-y-1.5">
              {matchedUnits.map(unit => (
                <button
                  key={unit.id}
                  onClick={() => {
                    onClose();
                    onSelectUnit(unit.id);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {unit.unitNumber}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {unit.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {unit.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Practice Problems Section */}
          {matchedProblems.length > 0 && onOpenPractice && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Računske vaje ({matchedProblems.length})
              </h3>
              <div className="space-y-1.5">
                {matchedProblems.map(prob => (
                  <button
                    key={prob.id}
                    onClick={() => {
                      onClose();
                      onOpenPractice();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {prob.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Tema: {prob.topic} · {prob.difficulty}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Case Studies Section */}
          {matchedCases.length > 0 && onOpenCaseStudies && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Študije resničnih primerov ({matchedCases.length})
              </h3>
              <div className="space-y-1.5">
                {matchedCases.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onClose();
                      onOpenCaseStudies();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-purple-600 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {c.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {c.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Paradoxes Section */}
          {matchedParadoxes.length > 0 && onOpenParadoxes && (
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Pasti in paradoksi ({matchedParadoxes.length})
              </h3>
              <div className="space-y-1.5">
                {matchedParadoxes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onOpenParadoxes();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <AlertOctagon className="h-4 w-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {p.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Section */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pojmi v statističnem slovarju ({matchedGlossary.length})
            </h3>

            <div className="space-y-1.5">
              {matchedGlossary.map(term => (
                <button
                  key={term.id}
                  onClick={() => {
                    onClose();
                    onOpenGlossary(term.id);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-left group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {term.slo}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal italic">
                        ({term.eng})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {term.definition}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
