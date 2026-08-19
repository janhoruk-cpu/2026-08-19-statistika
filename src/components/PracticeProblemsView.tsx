import React, { useState } from 'react';
import { PRACTICE_PROBLEMS, PracticeProblem } from '../data/practiceProblemsData';
import { FormattedMathText } from './FormattedMathText';
import { MathView } from './MathView';
import {
  ArrowLeft,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface PracticeProblemsViewProps {
  onBack: () => void;
  onSelectUnit: (unitId: string) => void;
}

export const PracticeProblemsView: React.FC<PracticeProblemsViewProps> = ({ onBack, onSelectUnit }) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(PRACTICE_PROBLEMS[0].id);
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [activeTopic, setActiveTopic] = useState<string>('Vse');

  const topics = ['Vse', 'Intervali zaupanja', 'Preizkušanje domnev', 'Bayesov izrek', 'Hi-kvadrat'];

  const filteredProblems = activeTopic === 'Vse'
    ? PRACTICE_PROBLEMS
    : PRACTICE_PROBLEMS.filter(p => p.topic === activeTopic);

  const selectedProblem = PRACTICE_PROBLEMS.find(p => p.id === selectedProblemId) || PRACTICE_PROBLEMS[0];

  const currentRevealed = revealedSteps[selectedProblem.id] ?? 0;

  const handleRevealNextStep = () => {
    setRevealedSteps(prev => ({
      ...prev,
      [selectedProblem.id]: Math.min((prev[selectedProblem.id] ?? 0) + 1, selectedProblem.steps.length),
    }));
  };

  const handleRevealAll = () => {
    setRevealedSteps(prev => ({
      ...prev,
      [selectedProblem.id]: selectedProblem.steps.length,
    }));
    setShowAllSteps(true);
  };

  const handleHideAll = () => {
    setRevealedSteps(prev => ({
      ...prev,
      [selectedProblem.id]: 0,
    }));
    setShowAllSteps(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto select-none">
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
              <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Vaje in izpitne računske naloge</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Strukturirane naloge z vodenimi rešitvami korak za korakom
            </p>
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => setActiveTopic(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTopic === t
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Izberite nalogo ({filteredProblems.length})
          </h2>

          <div className="space-y-2">
            {filteredProblems.map(item => {
              const isSelected = item.id === selectedProblem.id;
              const difficultyColors = {
                Osnovna: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
                Srednja: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                Zahtevna: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
              };

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedProblemId(item.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-indigo-400 dark:border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      {item.topic}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${difficultyColors[item.difficulty]}`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Statement & Interactive Solver */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Title & Navigation */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {selectedProblem.topic}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Težavnost: {selectedProblem.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => onSelectUnit(selectedProblem.chapterLink)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Odpri povezano lekcijo v učbeniku</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedProblem.title}
              </h2>
            </div>

            {/* Problem Statement Card */}
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                <span>Besedilo naloge</span>
              </div>
              <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                <FormattedMathText text={selectedProblem.problemStatement} />
              </div>

              {/* Given Data Pills */}
              <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Podani podatki:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProblem.givenData.map((d, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    >
                      <span className="text-slate-500 mr-1.5">{d.label}:</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-Step Solver Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Postopek reševanja ({currentRevealed} / {selectedProblem.steps.length} korakov razkritih)
              </div>

              <div className="flex items-center gap-2">
                {currentRevealed < selectedProblem.steps.length ? (
                  <button
                    onClick={handleRevealNextStep}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Razkrij naslednji korak</span>
                  </button>
                ) : (
                  <button
                    onClick={handleHideAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Skrij postopek</span>
                  </button>
                )}

                <button
                  onClick={handleRevealAll}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Pokaži vse
                </button>
              </div>
            </div>

            {/* Steps Container */}
            <div className="space-y-4">
              {selectedProblem.steps.map((st, idx) => {
                const isVisible = idx < currentRevealed;
                if (!isVisible) {
                  return (
                    <div
                      key={st.stepNumber}
                      onClick={handleRevealNextStep}
                      className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 hover:text-indigo-600 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-colors"
                    >
                      Kliknite za razkritje koraka {st.stepNumber}: <strong>{st.title}</strong>
                    </div>
                  );
                }

                return (
                  <div
                    key={st.stepNumber}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="h-6 w-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                          {st.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {st.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {st.result}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <FormattedMathText text={st.explanation} />
                    </div>

                    {st.mathFormula && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto text-xs sm:text-sm">
                        <MathView math={st.mathFormula} block />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Final Answer Banner (when all steps revealed) */}
            {currentRevealed >= selectedProblem.steps.length && (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Končni sklep naloge</span>
                </div>
                <div className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                  {selectedProblem.finalAnswer}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Pogoste študentske napake pri tej vrsti nalog</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200 list-disc list-inside">
                {selectedProblem.commonMistakes.map((m, i) => (
                  <li key={i} className="leading-relaxed">
                    <FormattedMathText text={m} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
