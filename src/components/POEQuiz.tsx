import React, { useState } from 'react';
import { POEQuizData } from '../types';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FormattedMathText } from './FormattedMathText';

interface POEQuizProps {
  quiz: POEQuizData;
  unitId: string;
}

export const POEQuiz: React.FC<POEQuizProps> = ({ quiz, unitId }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Reset selection when unitId changes
  React.useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [unitId]);

  const handleSelect = (optId: string) => {
    if (submitted) return;
    setSelectedOption(optId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    setSubmitted(true);
    const chosen = quiz.options.find(o => o.id === selectedOption);
    if (chosen?.isCorrect) {
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  return (
    <section
      aria-labelledby="poe-quiz-heading"
      className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800 text-base leading-relaxed text-slate-700 dark:text-slate-300"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="space-y-1 block">
            <div
              id="poe-quiz-heading"
              role="heading"
              aria-level={2}
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              <FormattedMathText text={`Vprašanje za razmislek: ${quiz.question}`} />
            </div>
            {quiz.prompt && (
              <div className="text-base text-slate-600 dark:text-slate-400">
                <FormattedMathText text={quiz.prompt} />
              </div>
            )}
          </legend>

          {/* Options List */}
          <div className="space-y-2.5 pt-2" role="radiogroup" aria-labelledby="poe-quiz-heading">
            {quiz.options.map(option => {
              const isSelected = selectedOption === option.id;

              let optionStyle =
                'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-850';

              if (isSelected && !submitted) {
                optionStyle =
                  'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 text-indigo-950 dark:text-indigo-100 font-medium ring-1 ring-indigo-600/30';
              }

              if (submitted) {
                if (option.isCorrect) {
                  optionStyle =
                    'border-emerald-600 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-100';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle =
                    'border-rose-500 dark:border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-100';
                } else {
                  optionStyle =
                    'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600';
                }
              }

              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={submitted}
                  role="radio"
                  aria-checked={isSelected}
                  className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border text-base transition-all cursor-pointer select-none ${optionStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {submitted && option.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : submitted && isSelected && !option.isCorrect ? (
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <FormattedMathText text={option.text} paragraphClassName="text-base text-inherit" />
                    {submitted && isSelected && (
                      <div className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/80 dark:border-slate-800 pt-2 leading-relaxed">
                        <FormattedMathText text={option.explanation} paragraphClassName="text-sm text-inherit" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Submit action */}
        {!submitted ? (
          <button
            type="submit"
            disabled={!selectedOption}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span>Preveri odgovor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <div className="pt-2 space-y-2 animate-in fade-in">
            <div className="text-base text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border-l-2 border-indigo-500">
              <span className="font-semibold text-slate-900 dark:text-slate-100 block mb-0.5">
                Ugotovitev:
              </span>
              <FormattedMathText text={quiz.insight} />
            </div>

            {quiz.followUpExperiment && (
              <div className="text-base text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Nadaljevanje: </span>
                <FormattedMathText text={quiz.followUpExperiment} />
              </div>
            )}
          </div>
        )}
      </form>
    </section>
  );
};

