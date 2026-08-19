import React, { useState } from 'react';
import { UnitConfig, ExplanationDepth } from '../types';
import { GLOSSARY_TERMS, UNIT_GLOSSARY_MAP } from '../data/glossaryData';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import { POEQuiz } from './POEQuiz';
import { MiniJupyter } from './MiniJupyter';
import { TextbookDepthCard } from './TextbookDepthCard';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sigma,
  Languages,
} from 'lucide-react';

interface UnitContentProps {
  unit: UnitConfig;
  onNextUnit?: () => void;
  hasNextUnit: boolean;
  onSyncSimulation?: (params: Record<string, any>) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const UnitContent: React.FC<UnitContentProps> = ({
  unit,
  onNextUnit,
  hasNextUnit,
  onSyncSimulation,
  onOpenGlossary,
}) => {
  const [openMathProof, setOpenMathProof] = useState<boolean>(false);
  const [depth, setDepth] = useState<ExplanationDepth>('simple');

  const termIds = UNIT_GLOSSARY_MAP[unit.id] || [];
  const unitTerms = GLOSSARY_TERMS.filter(t => termIds.includes(t.id) || t.unitId === unit.id);

  const mnemonic = unit.mnemonic || {
    eli5: 'Preprosta razlaga koncepta z vsakdanjim primerom.',
    anchor: 'Miselno sidro za trajno razumevanje.',
    fallacyWarning: {
      name: 'Past razmišljanja',
      description: 'Tipična napačna intuicija pri interpretaciji.',
      example: 'Pazi na napačno posploševanje majhnih vzorcev.',
    },
  };

  const wisdom = unit.explanationLevels || unit.textbookWisdom || {
    simpleQuote: 'Preprosta razlaga za vsakogar brez zapletenih formul.',
    simpleExplanation: unit.leadParagraph || mnemonic.eli5,
    practicalInsight: 'Uporabno pri delu s podatki in sprejemanju odločitev.',
    mathematicalTheory: 'Formalna definicija in analitične lastnosti.',
  };

  const mathProof = unit.mathProof || {
    summaryLatex: '',
    steps: [],
  };

  return (
    <article className="h-full overflow-y-auto bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 sm:py-16 px-6 sm:px-12 scroll-smooth text-base leading-relaxed">
      <div className="max-w-2xl mx-auto space-y-10 pb-24">
        {/* 1. Header with clear, focused typography */}
        <header className="space-y-2 pb-6 border-b border-slate-200 dark:border-slate-800">
          <p className="text-base text-slate-500 dark:text-slate-400">
            Lekcija {unit.unitNumber || unit.id.replace('unit-', '')}
          </p>

          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            {unit.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-400">
            {unit.subtitle}
          </p>
        </header>

        {/* 2. Concept Depth & Flowing Narrative Text */}
        <section aria-label="Razlaga koncepta">
          <TextbookDepthCard
            wisdom={wisdom}
            explanationLevels={wisdom}
            mnemonic={mnemonic}
            depth={depth}
            onSelectDepth={setDepth}
          />
        </section>

        {/* 3. POE Quiz: Self-Check */}
        {unit.poeQuiz && (
          <POEQuiz quiz={unit.poeQuiz} unitId={unit.id} />
        )}

        {/* 4. Mini-Jupyter Python Sandbox */}
        {unit.miniJupyter && (
          <section aria-label="Programska koda" className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <MiniJupyter config={unit.miniJupyter} onSyncSimulation={onSyncSimulation} />
          </section>
        )}

        {/* 5. Optional Mathematical Proof Accordion */}
        {mathProof && (mathProof.summaryLatex || (mathProof.steps && mathProof.steps.length > 0) || mathProof.fullDerivationHtml) && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setOpenMathProof(!openMathProof)}
              className="w-full flex items-center justify-between py-2 text-left text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sigma className="h-4 w-4 text-indigo-500" />
                <span className="text-base font-semibold">
                  Matematične enačbe & formalna izpeljava (za poglobljen študij)
                </span>
              </div>
              {openMathProof ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {openMathProof && (
              <div className="pt-6 pb-2 space-y-4 animate-in fade-in">
                {mathProof.summaryLatex && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
                    <MathView math={mathProof.summaryLatex} block={true} />
                  </div>
                )}

                {mathProof.steps && mathProof.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <span className="text-base font-semibold text-slate-700 dark:text-slate-300 block">
                      {step.title}
                    </span>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto">
                      <MathView math={step.latex} block={true} />
                    </div>
                    <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}

                {mathProof.fullDerivationHtml && (
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                    <FormattedMathText text={mathProof.fullDerivationHtml} />
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* 6. Key Statistical Terminology */}
        {unitTerms.length > 0 && (
          <section aria-label="Ključni izrazi" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span>Ključni strokovni izrazi in pojmi</span>
              </div>
              {onOpenGlossary && (
                <button
                  onClick={() => onOpenGlossary()}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Odpri celoten slovar →
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {unitTerms.map(term => (
                <button
                  key={term.id}
                  onClick={() => onOpenGlossary && onOpenGlossary(term.id)}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-xs transition-all shadow-2xs"
                  title="Kliknite za ogled definicije in prevoda"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {term.slo}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 group-hover:text-indigo-500">
                    ({term.eng})
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 7. Bottom Navigation to Next Lesson */}
        {hasNextUnit && onNextUnit && (
          <nav aria-label="Nadaljevanje" className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onNextUnit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-medium text-sm transition-all shadow-xs"
            >
              <span>Nadaljuj na naslednjo lekcijo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </article>
  );
};
