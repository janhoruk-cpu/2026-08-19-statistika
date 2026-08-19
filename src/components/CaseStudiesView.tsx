import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudiesData';
import { FormattedMathText } from './FormattedMathText';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface CaseStudiesViewProps {
  onBack: () => void;
  onSelectUnit: (unitId: string) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({ onBack, onSelectUnit }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('Vse');
  const [showDiscussionAnswers, setShowDiscussionAnswers] = useState<Record<string, boolean>>({});

  const categories = ['Vse', 'Eksperimenti', 'Preizkušanje domnev', 'Regresija', 'Epidemiologija'];

  const filteredCases = activeCategory === 'Vse'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.category === activeCategory);

  const selectedCase = CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  const toggleAnswer = (key: string) => {
    setShowDiscussionAnswers(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Nazaj v učilnico</span>
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Študije resničnih primerov</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Analize odmevnih znanstvenih eksperimentov in podatkovnih naborov iz prakse
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Master-Detail */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Case Studies */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Izberite raziskavo ({filteredCases.length})
          </h2>

          <div className="space-y-2">
            {filteredCases.map(item => {
              const isSelected = item.id === selectedCase.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCaseId(item.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-indigo-400 dark:border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      n = {item.dataSummary.totalN}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Details & Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header Badge & Title */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {selectedCase.category}
                </span>
                <button
                  onClick={() => onSelectUnit(selectedCase.chapterLink)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Odpri povezano lekcijo v učbeniku</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedCase.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {selectedCase.subtitle}
              </p>
            </div>

            {/* Summary Callout */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <FormattedMathText text={selectedCase.summary} />
            </div>

            {/* Background Narrative */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Ozadje in postavitev eksperimenta</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <FormattedMathText text={selectedCase.background} />
              </p>
            </div>

            {/* Empirical Data Summary Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span>Primerjava skupin in empirični podatki (Vzorec N = {selectedCase.dataSummary.totalN})</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCase.dataSummary.groups.map((grp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {grp.name}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-500">Velikost skupine:</span>
                      <span className="font-mono font-bold text-xs">n = {grp.n}</span>
                    </div>
                    {grp.successes > 0 && (
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-500">Število dogodkov:</span>
                        <span className="font-mono font-bold text-xs">{grp.successes}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Stopnja / Rezultat:
                      </span>
                      <span className="text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                        {grp.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Statistical Question & Result */}
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 dark:text-indigo-300">
                <HelpCircle className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Raziskovalno vprašanje</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-950 dark:text-indigo-200">
                {selectedCase.keyQuestion}
              </p>
              <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-300 leading-relaxed">
                <FormattedMathText text={selectedCase.interactiveExploration.description} />
              </div>
            </div>

            {/* Key Findings List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                <span>Ključna znanstvena spoznanja</span>
              </h4>
              <div className="space-y-2">
                {selectedCase.findings.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                  >
                    <span className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <FormattedMathText text={f} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Takeaway Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Glavno metodološko sporočilo</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                <FormattedMathText text={selectedCase.takeaway} />
              </p>
            </div>

            {/* Discussion & Critical Thinking Prompts */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-slate-500" />
                <span>Vprašanja za kritični razmislek</span>
              </h4>

              <div className="space-y-2">
                {selectedCase.discussionQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-2 text-xs"
                  >
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {idx + 1}. {q}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
