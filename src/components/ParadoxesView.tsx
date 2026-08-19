import React, { useState } from 'react';
import { PARADOXES_DATA, ParadoxItem } from '../data/paradoxesData';
import { FormattedMathText } from './FormattedMathText';
import {
  ArrowLeft,
  AlertOctagon,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Dice5,
} from 'lucide-react';

interface ParadoxesViewProps {
  onBack: () => void;
  onSelectUnit: (unitId: string) => void;
}

export const ParadoxesView: React.FC<ParadoxesViewProps> = ({ onBack, onSelectUnit }) => {
  const [selectedParadoxId, setSelectedParadoxId] = useState<string>(PARADOXES_DATA[0].id);

  // Interactive P-Hacking Sandbox State
  const [numHypotheses, setNumHypotheses] = useState<number>(20);
  const [alphaLevel, setAlphaLevel] = useState<number>(0.05);

  const selectedParadox = PARADOXES_DATA.find(p => p.id === selectedParadoxId) || PARADOXES_DATA[0];

  // Calculated overall false positive probability: 1 - (1 - alpha)^k
  const overallFalsePositiveRate = 1 - Math.pow(1 - alphaLevel, numHypotheses);
  const bonferroniThreshold = alphaLevel / numHypotheses;

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto select-none">
      {/* Header */}
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
              <AlertOctagon className="h-5 w-5 text-amber-500" />
              <span>Statistične pasti in paradoksi</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Zakaj podatki pogosto zavedejo intuitivno sklepanje in kako se izogniti klasičnim napakam
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: List of Paradoxes */}
        <div className="lg:col-span-4 space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Izberite paradoks ({PARADOXES_DATA.length})
          </h2>

          <div className="space-y-2">
            {PARADOXES_DATA.map(item => {
              const isSelected = item.id === selectedParadox.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedParadoxId(item.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-amber-400 dark:border-amber-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                      {item.category}
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

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {selectedParadox.category}
                </span>
                <button
                  onClick={() => onSelectUnit(selectedParadox.chapterLink)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Odpri povezano lekcijo v učbeniku</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedParadox.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {selectedParadox.subtitle}
              </p>
            </div>

            {/* Core Story / Setup */}
            <div className="bg-amber-50/70 dark:bg-amber-950/30 p-4 sm:p-5 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 text-xs sm:text-sm leading-relaxed text-amber-950 dark:text-amber-200">
              <div className="font-bold flex items-center gap-2 mb-1 text-amber-800 dark:text-amber-300">
                <Flame className="h-4 w-4 text-amber-600" />
                <span>Navidezno protislovje (Intuitivna past)</span>
              </div>
              <FormattedMathText text={selectedParadox.story} />
            </div>

            {/* Interactive Widget if P-Hacking */}
            {selectedParadox.id === 'p-hacking-multiple-testing' && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <Dice5 className="h-4 w-4 text-indigo-600" />
                    <span>Interaktivni demonstrator P-hackiranja</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Družinska stopnja napake</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Število preizkušenih hipotez (k):
                      </span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {numHypotheses}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={numHypotheses}
                      onChange={e => setNumHypotheses(parseInt(e.target.value, 10))}
                      className="w-full accent-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Stopnja tveganja posameznega testa (α):
                      </span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {alphaLevel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.10"
                      step="0.01"
                      value={alphaLevel}
                      onChange={e => setAlphaLevel(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                    <div className="text-[11px] font-semibold text-red-700 dark:text-red-300">
                      Verjetnost vsaj 1 lažnega odkritja:
                    </div>
                    <div className="text-lg font-extrabold font-mono text-red-600 dark:text-red-400">
                      {(overallFalsePositiveRate * 100).toFixed(1)} %
                    </div>
                    <div className="text-[10px] text-red-600/80 dark:text-red-400/80">
                      1 - (1 - {alphaLevel})^{numHypotheses}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      Bonferronijev prag (α / k):
                    </div>
                    <div className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      p &lt; {bonferroniThreshold.toFixed(4)}
                    </div>
                    <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80">
                      Zahtevana meja za veljavnost
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Real World Historical Example */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                <span>Resnični zgodovinski primer iz prakse</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <FormattedMathText text={selectedParadox.realWorldExample} />
              </p>
            </div>

            {/* Mathematical Proof & Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span>Matematična razlaga mehanizma</span>
              </h4>
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed font-sans">
                <FormattedMathText text={selectedParadox.mathExplanation} />
              </div>
            </div>

            {/* How to Avoid & Best Practices */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
                <span>Kako se izogniti tej pasti (Pravila za analitike)</span>
              </h4>

              <div className="space-y-2">
                {selectedParadox.howToAvoid.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="flex-1">
                      <FormattedMathText text={rule} />
                    </span>
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
