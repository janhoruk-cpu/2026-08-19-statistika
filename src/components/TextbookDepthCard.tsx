import React from 'react';
import { ExplanationLevels, ExplanationDepth, MnemonicCard } from '../types';
import { FormattedMathText } from './FormattedMathText';

interface TextbookDepthCardProps {
  wisdom?: ExplanationLevels;
  explanationLevels?: ExplanationLevels;
  mnemonic: MnemonicCard;
  depth: ExplanationDepth;
  onSelectDepth: (depth: ExplanationDepth) => void;
}

export const TextbookDepthCard: React.FC<TextbookDepthCardProps> = ({
  wisdom,
  explanationLevels,
  mnemonic,
  depth,
  onSelectDepth,
}) => {
  const levels = explanationLevels || wisdom || {
    simpleQuote: 'Preprosta razlaga za vsakogar brez zapletenih formul.',
    simpleExplanation: mnemonic.eli5,
    practicalInsight: 'Uporabno pri delu s podatki in sprejemanju odločitev.',
    mathematicalTheory: 'Formalna definicija in analitične lastnosti.',
  };

  const depthTabs: { id: ExplanationDepth; label: string }[] = [
    { id: 'simple', label: 'Razlaga' },
    { id: 'deep', label: 'Uporaba v praksi' },
    { id: 'math', label: 'Matematična teorija' },
  ];

  return (
    <div className="space-y-6 select-text text-base leading-relaxed text-slate-700 dark:text-slate-300">
      {/* 1. Preklopnik globine (enotna velikost in stil) */}
      <nav aria-label="Globina razlage" className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {depthTabs.map(tab => {
          const isActive = depth === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectDepth(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* RAZLAGA KONCEPTA - popolnoma enotna velikost pisave in jasen pomen */}
      {depth === 'simple' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Kaj je to in zakaj je pomembno
            </h2>
            {levels.simpleQuote && (
              <div className="text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border-l-2 border-indigo-500">
                <FormattedMathText text={levels.simpleQuote} />
              </div>
            )}
            <FormattedMathText text={levels.simpleExplanation || mnemonic.eli5} />
          </section>

          {mnemonic.eli5 && (
            <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Primer iz vsakdanjega življenja
              </h2>
              <FormattedMathText text={mnemonic.eli5} />
              {mnemonic.anchor && (
                <div className="text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
                  <FormattedMathText text={`Miselno sidro: ${mnemonic.anchor}`} />
                </div>
              )}
            </section>
          )}

          {mnemonic.fallacyWarning && (
            <section className="space-y-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Na kaj moramo paziti ({mnemonic.fallacyWarning.name})
              </h2>
              <FormattedMathText text={mnemonic.fallacyWarning.description} />
              {mnemonic.fallacyWarning.example && (
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 bg-amber-500/10 border-l-2 border-amber-500 p-2.5 rounded-r">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Konkretni primer: </span>
                  <FormattedMathText text={mnemonic.fallacyWarning.example} />
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* UPORABA V PRAKSI */}
      {depth === 'deep' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Pomen za odločanje in delo s podatki
            </h2>
            <FormattedMathText
              text={
                levels.practicalInsight ||
                'V praksi ta koncept določa, koliko podatkov potrebujemo za zanesljivo statistično sklepanje.'
              }
            />
          </section>
        </div>
      )}

      {/* MATEMATIČNA TEORIJA */}
      {depth === 'math' && (
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Formalna matematična definicija
            </h2>
            <FormattedMathText
              text={
                levels.mathematicalTheory ||
                'Formalna matematična opredelitev verjetnostnih prostorov in konvergence naključnih spremenljivk.'
              }
            />
          </section>

          <p className="text-base text-slate-600 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-slate-800">
            Podrobno analitično izpeljavo z enačbami po korakih si lahko ogledate v spodnjem razdelku »Matematične enačbe in formalni dokaz«.
          </p>
        </div>
      )}
    </div>
  );
};

