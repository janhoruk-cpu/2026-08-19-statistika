import React, { useState } from 'react';
import { FormattedMathText } from './FormattedMathText';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Sigma,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface FormulaReferenceViewProps {
  onBack: () => void;
  onSelectUnit?: (unitId: string) => void;
}

interface FormulaItem {
  id: string;
  name: string;
  category: string;
  chapterNumber: number;
  unitId: string;
  latex: string;
  description: string;
  whenToUse: string;
  conditions?: string;
}

const FORMULA_LIST: FormulaItem[] = [
  // Poglavje 1 & 2: Opisna statistika
  {
    id: 'mean',
    name: 'Vzorčno povprečje (Sample Mean)',
    category: 'Opisna statistika',
    chapterNumber: 2,
    unitId: 'unit-2-1',
    latex: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
    description: 'Aritmetična sredina vseh vrednosti v vzorcu; predstavlja fizikalno težišče porazdelitve.',
    whenToUse: 'Kadar želimo eno število za opis središča simetričnih podatkov brez izrazitih osamelcev.',
  },
  {
    id: 'variance-sd',
    name: 'Vzorčna varianca in standardni odklon',
    category: 'Opisna statistika',
    chapterNumber: 2,
    unitId: 'unit-2-2',
    latex: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}',
    description: 'Povprečni kvadratni odklon od povprečja z Besselovim popravkom (deljenje z n-1).',
    whenToUse: 'Za merjenje razpršenosti (variabilnosti) številskih podatkov okoli povprečja.',
  },
  {
    id: 'iqr',
    name: 'Medčetrtinski razmik (IQR) & Meje za osamelce',
    category: 'Opisna statistika',
    chapterNumber: 2,
    unitId: 'unit-2-2',
    latex: 'IQR = Q_3 - Q_1, \\quad \\text{Meji za osamelce: } [Q_1 - 1.5 \\cdot IQR, \\; Q_3 + 1.5 \\cdot IQR]',
    description: 'Razpon srednjih 50 % podatkov; robustna mera razpršenosti, neobčutljiva na ekstreme.',
    whenToUse: 'Pri asimetričnih podatkih ali prisotnosti močnih osamelcev skupaj z mediano.',
  },
  {
    id: 'z-score',
    name: 'Standardizirana vrednost (Z-score)',
    category: 'Normalna porazdelitev',
    chapterNumber: 4,
    unitId: 'unit-4-1',
    latex: 'Z = \\frac{x - \\mu}{\\sigma} \\quad \\text{ali} \\quad Z = \\frac{x - \\bar{x}}{s}',
    description: 'Pove, za koliko standardnih odklonov je posamezna vrednost nad ali pod povprečjem.',
    whenToUse: 'Za primerjavo meritev z različnimi merskimi enotami (npr. SAT vs. ACT točke).',
  },

  // Poglavje 3 & 4: Verjetnost in porazdelitve
  {
    id: 'addition-rule',
    name: 'Splošno pravilo seštevanja verjetnosti',
    category: 'Teorija verjetnosti',
    chapterNumber: 3,
    unitId: 'unit-3-1',
    latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    description: 'Verjetnost, da se zgodi dogodek A ali dogodek B (ali oba).',
    whenToUse: 'Kadar dogodka A in B nista nujno nezdružljiva (disjunktna). Če sta disjunktna, je P(A ∩ B) = 0.',
  },
  {
    id: 'conditional-bayes',
    name: 'Pogojna verjetnost in Bayesov izrek',
    category: 'Teorija verjetnosti',
    chapterNumber: 3,
    unitId: 'unit-3-2',
    latex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{P(B \\mid A) \\cdot P(A)}{P(B \\mid A)P(A) + P(B \\mid A^c)P(A^c)}',
    description: 'Posodobitev verjetnosti dogodka A ob novem dokazu ali pogoju B.',
    whenToUse: 'Pri diagnostičnih testih, klasifikaciji neželene pošte in učenju iz novih podatkov.',
  },
  {
    id: 'expected-variance-rv',
    name: 'Pričakovana vrednost in varianca slučajne spremenljivke',
    category: 'Teorija verjetnosti',
    chapterNumber: 3,
    unitId: 'unit-3-3',
    latex: 'E(X) = \\sum x_i P(X = x_i), \\quad \\text{Var}(X) = \\sum (x_i - \\mu)^2 P(X = x_i)',
    description: 'Teoretično povprečje in varianca diskretne slučajne spremenljivke.',
    whenToUse: 'Za izračun pričakovanega dobička ali tveganja pri igrah na srečo in investicijah.',
  },
  {
    id: 'binomial-dist',
    name: 'Binomska porazdelitev (Binomial Distribution)',
    category: 'Porazdelitve',
    chapterNumber: 4,
    unitId: 'unit-4-2',
    latex: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad \\mu = np, \\quad \\sigma = \\sqrt{np(1-p)}',
    description: 'Verjetnost natanko k uspehov v n neodvisnih Bernoullijevih poskusih z verjetnostjo uspeha p.',
    whenToUse: 'Fiksno število poskusov n, dva možna izida (uspeh/neuspeh), konstantna verjetnost p.',
    conditions: 'Neodvisni poskusi, fiksni n, binarni izidi, konstanten p.',
  },
  {
    id: 'poisson-dist',
    name: 'Poissonova porazdelitev',
    category: 'Porazdelitve',
    chapterNumber: 4,
    unitId: 'unit-4-3',
    latex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad \\mu = \\lambda, \\quad \\sigma = \\sqrt{\\lambda}',
    description: 'Verjetnost števila redkih dogodkov v določenem časovnem ali prostorskem intervalu.',
    whenToUse: 'Štetje prihodov strank na uro, napak na proizvodni liniji, prometnih nesreč na teden.',
  },

  // Poglavje 5 & 6: Statistično sklepanje & Kategorični podatki
  {
    id: 'clt-proportion',
    name: 'Standardna napaka deleža in interval zaupanja (CLT)',
    category: 'Statistično sklepanje',
    chapterNumber: 5,
    unitId: 'unit-5-1',
    latex: 'SE_{\\hat{p}} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}, \\quad 95\\% \\text{ IZ: } \\hat{p} \\pm 1.96 \\cdot SE_{\\hat{p}}',
    description: 'Standardni odklon vzorčne porazdelitve deleža in 95 % območje zaupanja.',
    whenToUse: 'Ocenjevanje deleža populacije na podlagi anketnega vzorca.',
    conditions: 'Neodvisnost (slučajni vzorec) in pogoj uspehov/neuspehov: np ≥ 10 in n(1-p) ≥ 10.',
  },
  {
    id: 'diff-proportions',
    name: 'Razlika dveh deležev & Združeni delež (Pooled Proportion)',
    category: 'Kategorični podatki',
    chapterNumber: 6,
    unitId: 'unit-6-1',
    latex: '\\hat{p}_{pool} = \\frac{x_1 + x_2}{n_1 + n_2}, \\quad SE_{H_0} = \\sqrt{\\hat{p}_{pool}(1-\\hat{p}_{pool})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}',
    description: 'Testiranje ničelne hipoteze H0: p1 = p2 z združenim deležem.',
    whenToUse: 'Primerjava dveh neodvisnih poskusnih skupin (npr. poskusna terapija vs. kontrola).',
  },
  {
    id: 'chi-square',
    name: 'Hi-kvadrat (χ²) test neodvisnosti in skladnosti',
    category: 'Kategorični podatki',
    chapterNumber: 6,
    unitId: 'unit-6-2',
    latex: '\\chi^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i}, \\quad E_{ij} = \\frac{\\text{Vrstica}_i \\cdot \\text{Stolpec}_j}{N}, \\quad df = (R-1)(C-1)',
    description: 'Preverjanje odstopanja opazovanih frekvenc (O) od teoretično pričakovanih (E).',
    whenToUse: 'Analiza kontingenčnih tabel z več kot 2 nivojema ali preverjanje porazdelitve.',
    conditions: 'Vse pričakovane frekvence E_i morajo biti vsaj 5.',
  },

  // Poglavje 7: Številski podatki & ANOVA
  {
    id: 't-test-single',
    name: 'Enovzorčni t-test in interval zaupanja povprečja',
    category: 'Številska analiza',
    chapterNumber: 7,
    unitId: 'unit-7-1',
    latex: 'T = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}, \\quad 95\\% \\text{ IZ: } \\bar{x} \\pm t^*_{df} \\cdot \\frac{s}{\\sqrt{n}}, \\quad df = n - 1',
    description: 'Statistični sklep o neznanem populacijskem povprečju ob ocenjenem vzorčnem odklonu s.',
    whenToUse: 'Kadar ne poznamo pravega populacijskega odklona σ in ga ocenimo z vzorčnim s.',
  },
  {
    id: 'anova-f-test',
    name: 'Analiza variance (ANOVA) & F-statistika',
    category: 'Številska analiza',
    chapterNumber: 7,
    unitId: 'unit-7-3',
    latex: 'F = \\frac{MSG}{MSE} = \\frac{\\frac{1}{k-1}\\sum n_i (\\bar{x}_i - \\bar{x})^2}{\\frac{1}{n-k}\\sum (n_i - 1)s_i^2}, \\quad \\alpha^* = \\frac{\\alpha}{K}',
    description: 'Hkratna primerjava povprečij k skupin z razmerjem variabilnosti med skupinami in znotraj njih.',
    whenToUse: 'Primerjava 3 ali več skupin (npr. 3 različna zdravila) z Bonferronijevim popravkom za parne teste.',
  },

  // Poglavje 8 & 9: Regresija
  {
    id: 'ols-regression',
    name: 'Premica najmanjših kvadratov (OLS line)',
    category: 'Linearna regresija',
    chapterNumber: 8,
    unitId: 'unit-8-2',
    latex: '\\hat{y} = b_0 + b_1 x, \\quad b_1 = r \\cdot \\frac{s_y}{s_x}, \\quad b_0 = \\bar{y} - b_1 \\bar{x}',
    description: 'Linearna modelska premica, ki minimizira vsoto kvadratov navpičnih odklonov (rezidualov).',
    whenToUse: 'Napovedovanje številske odvisne spremenljivke y iz neodvisne spremenljivke x.',
    conditions: 'Linearnost, konstantna varianca rezidualov (homoskedastičnost), normalnost rezidualov, neodvisnost.',
  },
  {
    id: 'r-squared-adj',
    name: 'Koeficient determinacije (R²) in prilagojeni R²_adj',
    category: 'Linearna regresija',
    chapterNumber: 9,
    unitId: 'unit-9-2',
    latex: 'R^2 = 1 - \\frac{\\sum e_i^2}{\\sum (y_i - \\bar{y})^2}, \\quad R^2_{adj} = 1 - \\frac{s^2_{rez} / (n - k - 1)}{s^2_{tot} / (n - 1)}',
    description: 'Delež pojasnjene variance v odvisni spremenljivki. Prilagojeni R² kaznuje dodajanje nepotrebnih spremenljivk.',
    whenToUse: 'Vrednotenje kakovosti prileganja modela in izbira napovednih spremenljivk pri večkratni regresiji.',
  },
  {
    id: 'logistic-regression',
    name: 'Logistična regresija (Logit model)',
    category: 'Logistična regresija',
    chapterNumber: 9,
    unitId: 'unit-9-3',
    latex: '\\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_k x_k \\iff p = \\frac{1}{1 + e^{-(\\beta_0 + \\sum \\beta_i x_i)}}',
    description: 'Modeliranje verjetnosti binarnega izida (0 ali 1) s sigmoidno logistično krivuljo.',
    whenToUse: 'Klasifikacijski problemi (npr. odpoved dela, odobritev kredita, preživetje bolnika).',
  },
];

export const FormulaReferenceView: React.FC<FormulaReferenceViewProps> = ({
  onBack,
  onSelectUnit,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vse');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Vse', ...Array.from(new Set(FORMULA_LIST.map(f => f.category)))];

  const filteredFormulas = FORMULA_LIST.filter(f => {
    const matchesCategory = selectedCategory === 'Vse' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.whenToUse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyLatex = (id: string, latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-xs"
          >
            <ArrowLeft className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Nazaj v učilnico</span>
          </button>

          <div className="hidden sm:block h-4 w-px bg-slate-200 dark:border-slate-800" />

          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <Sigma className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Statistični formularij in matematični izreki</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vse ključne formule po poglavjih v KaTeX matematičnem zapisu
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
          {filteredFormulas.length} / {FORMULA_LIST.length} formul
        </div>
      </header>

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Išči formulo, simbol ali definicijo..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formulas List */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl w-full mx-auto space-y-6">
        {filteredFormulas.map(formula => (
          <div
            key={formula.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 transition-all hover:border-indigo-200 dark:hover:border-indigo-800/80"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  Poglavje {formula.chapterNumber} · {formula.category}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {formula.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLatex(formula.id, formula.latex)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400 transition-colors"
                  title="Kopiraj LaTeX formulo"
                >
                  {copiedId === formula.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Kopirano</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>LaTeX</span>
                    </>
                  )}
                </button>

                {onSelectUnit && (
                  <button
                    onClick={() => onSelectUnit(formula.unitId)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
                  >
                    <span>Odpri lekcijo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Formula KaTeX block */}
            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 flex justify-center items-center overflow-x-auto text-sm sm:text-base">
              <FormattedMathText text={`$$${formula.latex}$$`} />
            </div>

            {/* Explanations & Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Pomen in opis:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {formula.description}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Kdaj uporabimo:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {formula.whenToUse}
                </p>
              </div>
            </div>

            {formula.conditions && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider">Pogoji za veljavnost:</span>
                <span>{formula.conditions}</span>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
