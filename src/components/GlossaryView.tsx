import React, { useState, useMemo, useEffect } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { MathView } from './MathView';
import {
  Search,
  ArrowLeft,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface GlossaryViewProps {
  onBack: () => void;
  onSelectUnit?: (unitId: string) => void;
  initialTermId?: string | null;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  onBack,
  onSelectUnit,
  initialTermId,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vsi');

  // If initialTermId was passed, set search query
  useEffect(() => {
    if (initialTermId) {
      const term = GLOSSARY_TERMS.find(t => t.id === initialTermId);
      if (term) {
        setSearchQuery(term.slo);
      }
    }
  }, [initialTermId]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GLOSSARY_TERMS.map(t => t.category)));
    return ['Vsi', ...cats];
  }, []);

  const filteredTerms = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return GLOSSARY_TERMS.filter(term => {
      const matchCat = selectedCategory === 'Vsi' || term.category === selectedCategory;
      if (!matchCat) return false;
      if (!query) return true;
      return (
        term.slo.toLowerCase().includes(query) ||
        term.eng.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.example && term.example.toLowerCase().includes(query)) ||
        (term.details && term.details.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* 1. Header Bar — Unified with Settings and Curriculum views */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-xs"
          >
            <ArrowLeft className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Nazaj v učilnico</span>
          </button>

          <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Statistični slovar
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Pojmov v bazi: </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800">
              {GLOSSARY_TERMS.length}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 select-text">
        <div className="max-w-5xl mx-auto space-y-8 pb-24">
          {/* Hero Banner */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              Slovar statističnih pojmov in metodologije
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Celovit pregled statistične terminologije, vrst spremenljivk, opisnih kazalnikov, verjetnostnih konceptov in sklepnih metod po standardu <em>Introduction to Modern Statistics (IMS2)</em>.
            </p>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="space-y-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Iskanje po slovenskih ali angleških izrazih, definicijah, formulah ali primerih..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-2.5 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Počisti
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none text-xs">
              {categories.map(cat => {
                const count =
                  cat === 'Vsi'
                    ? GLOSSARY_TERMS.length
                    : GLOSSARY_TERMS.filter(t => t.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded font-semibold ${
                        selectedCategory === cat
                          ? 'bg-indigo-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredTerms.length === 0 ? (
              <div className="col-span-full text-center py-16 space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
                <Search className="h-8 w-8 mx-auto text-slate-300 dark:text-slate-600" />
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                  Ni zadetkov za »{searchQuery}«
                </p>
                <p className="text-xs text-slate-400">
                  Poskusite z drugo ključno besedo ali izberite kategorijo »Vsi«.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Vsi');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Ponastavi iskanje
                </button>
              </div>
            ) : (
              filteredTerms.map(term => (
                <article
                  key={term.id}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all shadow-xs"
                >
                  <div className="space-y-3.5">
                    {/* Category & English counterpart */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {term.category}
                      </span>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                        {term.eng}
                      </span>
                    </div>

                    {/* Slovenian Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
                      {term.slo}
                    </h3>

                    {/* Main Definition */}
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {term.definition}
                    </p>

                    {/* Optional LaTeX Formula */}
                    {term.formula && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
                        <MathView math={term.formula} block={true} className="text-sm" />
                      </div>
                    )}

                    {/* Practical Example - Primer iz prakse */}
                    {term.example && (
                      <div className="text-sm p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 text-slate-800 dark:text-slate-200 leading-relaxed">
                        <strong className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Primer iz prakse:</strong>
                        <span>{term.example}</span>
                      </div>
                    )}

                    {/* Optional Extended Details */}
                    {term.details && (
                      <div className="text-sm p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 leading-relaxed">
                        <strong className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Dodatna razlaga:</strong>
                        <span>{term.details}</span>
                      </div>
                    )}
                  </div>

                  {/* Jump to unit link */}
                  {term.unitId && onSelectUnit && (
                    <div className="flex items-center justify-end pt-3.5 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                      <button
                        onClick={() => {
                          onSelectUnit(term.unitId!);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                      >
                        <span>Odpri lekcijo v učilnici</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
