import React, { useState } from 'react';
import { FormattedMathText } from './FormattedMathText';
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Brain,
  Layers,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface FlashcardsViewProps {
  onBack: () => void;
  onSelectUnit?: (unitId: string) => void;
}

interface Flashcard {
  id: string;
  category: string;
  chapterNumber: number;
  unitId: string;
  question: string;
  answer: string;
  mathFormula?: string;
  tip: string;
}

const FLASHCARD_DECK: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Načrtovanje poskusov',
    chapterNumber: 1,
    unitId: 'unit-1-1',
    question: 'Zakaj korelacija med dvema spremenljivkama ne pomeni nujno vzročne povezave (Association ≠ Causation)?',
    answer: 'Zaradi motečih spremenljivk (confounding variables), ki so hkrati povezane z obema opazovanima spremenljivkama in ustvarjajo lažno navidezno povezavo. Vzročnost lahko dokažemo le z randomiziranim kontroliranim poskusom.',
    tip: 'Primer: Prodaja sladoleda in število utopitev imata skupno motečo spremenljivko: vročo poletno temperaturo.',
  },
  {
    id: 'fc-2',
    category: 'Opisna statistika',
    chapterNumber: 2,
    unitId: 'unit-2-2',
    question: 'Kdaj za opis sredine uporabimo mediano namesto povprečja in kdaj IQR namesto standardnega odklona?',
    answer: 'Mediano in IQR (medčetrtinski razmik) uporabimo vedno, ko so podatki močno asimetrični ali ko vsebujejo izrazite osamelce (ekstreme), saj sta to robustni statistiki, na kateri ekstremi ne vplivajo.',
    tip: 'Aritmetično povprečje in standardni odklon sta občutljiva na vsak posamezen ekstremni znesek (npr. plače).',
  },
  {
    id: 'fc-3',
    category: 'Verjetnost & Bayes',
    chapterNumber: 3,
    unitId: 'unit-3-2',
    question: 'Kaj je lažno pozitivni paradoks (False Positive Paradox) pri redkih boleznih?',
    answer: 'Kadar je prevalenca bolezni zelo nizka (npr. 0,1 %), je tudi ob 95-odstotni občutljivosti testa število zdravih oseb z lažno pozitivnim izvidom veliko večje od števila resnično bolnih. Zato je P(Bolezen | +) presenetljivo nizka.',
    mathFormula: 'P(Bolezen \\mid +) = \\frac{P(+ \\mid B)P(B)}{P(+ \\mid B)P(B) + P(+ \\mid \\text{Zdrav})P(\\text{Zdrav})}',
    tip: 'Zato zdravniki po pozitivnem presejalnem testu vedno opravijo dodatno potrditveno preiskavo (npr. biopsijo).',
  },
  {
    id: 'fc-4',
    category: 'Porazdelitve',
    chapterNumber: 4,
    unitId: 'unit-4-1',
    question: 'Kaj določa empirično pravilo 68-95-99,7 pri normalni porazdelitvi?',
    answer: 'Pri vsaki simetrični zvonasti Gaussovi porazdelitvi leži približno 68 % podatkov znotraj 1 standardnega odklona (μ ± 1σ), približno 95 % znotraj 2 standardnih odklonov (μ ± 2σ) in 99,7 % znotraj 3 standardnih odklonov (μ ± 3σ).',
    tip: 'Vse vrednosti z Z-vrednostjo |Z| > 3 štejemo za izjemno redke dogodke.',
  },
  {
    id: 'fc-5',
    category: 'Statistično sklepanje',
    chapterNumber: 5,
    unitId: 'unit-5-1',
    question: 'Kaj je natančna definicija p-vrednosti (p-value)?',
    answer: 'p-vrednost je verjetnost, da bi ob predpostavki, da ničelna hipoteza (H0) drži, dobili tako skrajne ali še bolj skrajne rezultate, kot smo jih opazili v svojem vzorcu. Majhna p-vrednost (< 0.05) pomeni, da so naši podatki v nasprotju s H0.',
    tip: 'POMEMBNO: p-vrednost NI verjetnost, da je H0 pravilna! To je najpogostejša zmota.',
  },
  {
    id: 'fc-6',
    category: 'Statistično sklepanje',
    chapterNumber: 5,
    unitId: 'unit-5-3',
    question: 'Kakšna je razlika med napako tipa I (α) in napako tipa II (β)?',
    answer: 'Napaka tipa I (lažni alarm) nastane, ko zavrnemo resnično H0 (verjetnost je nivo značilnosti α). Napaka tipa II (spregled) nastane, ko ne uspemo zavrniti napačne H0 (verjetnost β). Statistična moč je 1 - β.',
    tip: 'Mnemotehnika: Tip I = obsodba nedolžnega; Tip II = oprostitev krivega.',
  },
  {
    id: 'fc-7',
    category: 'Kategorični podatki',
    chapterNumber: 6,
    unitId: 'unit-6-2',
    question: 'Kdaj uporabimo Hi-kvadrat (χ²) test namesto dveh ločenih testov deležev?',
    answer: 'Hi-kvadrat test uporabimo za preverjanje neodvisnosti dveh kategoričnih spremenljivk s poljubnim številom nivojev (npr. tabela 3x4) ali za preverjanje skladnosti z več kot dvema kategorijama. Zahteva, da so vse pričakovane frekvence E_ij ≥ 5.',
    mathFormula: '\\chi^2 = \\sum \\frac{(O - E)^2}{E}',
    tip: 'S tem se izognemo inflaciji napake tipa I, ki bi nastala pri večkratnem parnem testiranju.',
  },
  {
    id: 'fc-8',
    category: 'Številska analiza & ANOVA',
    chapterNumber: 7,
    unitId: 'unit-7-3',
    question: 'Kaj meri F-statistika v analizi variance (ANOVA)?',
    answer: 'F-statistika meri razmerje med variabilnostjo med posameznimi skupinami (MSG) in variabilnostjo znotraj samih skupin (MSE). Če je F bistveno večji od 1, to pomeni, da so razlike med skupinami prevelike, da bi nastale le po naključju.',
    mathFormula: 'F = \\frac{MSG}{MSE}',
    tip: 'Če ANOVA zavrne H0, uporabimo naknadne teste s popravkom (npr. Bonferroni α* = α / K).',
  },
  {
    id: 'fc-9',
    category: 'Linearna regresija',
    chapterNumber: 8,
    unitId: 'unit-8-2',
    question: 'Kaj je razlika med vzvodom (leverage) in vplivno točko (influential point) pri regresiji?',
    answer: 'Točka z visokim vzvodom ima ekstremno vrednost neodvisne spremenljivke x (daleč od povprečja x). Če ta točka hkrati močno odstopa od splošnega trenda ostalih točk, deluje kot vzvod in bistveno spremeni naklon regresijske premice – takrat je to vplivna točka.',
    tip: 'Vplivne točke vedno prepoznamo s primerjavo premice z njimi in brez njih.',
  },
  {
    id: 'fc-10',
    category: 'Večkratna & Logistična regresija',
    chapterNumber: 9,
    unitId: 'unit-9-3',
    question: 'Zakaj pri binarnih izidih (0/1) uporabljamo logistično namesto navadne linearne regresije?',
    answer: 'Ker bi navadna premica dajala nesmiselne napovedi verjetnosti pod 0 % ali nad 100 %. Logistična funkcija z logit transformacijo ln(p / (1-p)) stisne napovedi v veljavni interval verjetnosti med 0 in 1 po sigmoidni krivulji.',
    mathFormula: 'p(x) = \\frac{1}{1 + e^{-(\\beta_0 + \\beta_1 x)}}',
    tip: 'Koeficient β1 razlagamo preko razmerja obetov (Odds Ratio = e^β1).',
  },
];

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  onBack,
  onSelectUnit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('Vse');

  const categories = ['Vse', ...Array.from(new Set(FLASHCARD_DECK.map(c => c.category)))];

  const filteredCards = FLASHCARD_DECK.filter(
    c => selectedFilter === 'Vse' || c.category === selectedFilter
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const markKnown = (id: string) => {
    if (!knownCards.includes(id)) setKnownCards([...knownCards, id]);
    setReviewCards(reviewCards.filter(c => c !== id));
    handleNext();
  };

  const markReview = (id: string) => {
    if (!reviewCards.includes(id)) setReviewCards([...reviewCards, id]);
    setKnownCards(knownCards.filter(c => c !== id));
    handleNext();
  };

  const handleReset = () => {
    setKnownCards([]);
    setReviewCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* Top Header */}
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
              <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Kartice za ponavljanje in samotestiranje</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aktivno priklicanje konceptov, razlag in matematičnih izrekov
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {knownCards.length}
            </span>
            <span className="text-rose-500 font-bold flex items-center gap-1">
              <XCircle className="h-3.5 w-3.5" />
              {reviewCards.length}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            title="Ponastavi napredek kartic"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedFilter(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard Arena */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center justify-center max-w-3xl w-full mx-auto space-y-6">
        {currentCard ? (
          <div className="w-full space-y-6">
            {/* Step Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold">
                Poglavje {currentCard.chapterNumber} · {currentCard.category}
              </span>
              <span>
                Kartica {currentIndex + 1} od {filteredCards.length}
              </span>
            </div>

            {/* Interactive Flippable Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`min-h-[280px] sm:min-h-[320px] w-full rounded-3xl p-6 sm:p-10 cursor-pointer transition-all duration-300 border shadow-lg flex flex-col justify-between select-none ${
                isFlipped
                  ? 'bg-indigo-900/90 text-white border-indigo-600/80 ring-2 ring-indigo-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs opacity-75 pb-3 border-b border-current/10">
                <span className="font-semibold uppercase tracking-wider">
                  {isFlipped ? 'Odgovor in razlaga' : 'Vprašanje za razmislek'}
                </span>
                <span className="text-[11px]">Klikni za {isFlipped ? 'vprašanje' : 'odgovor'}</span>
              </div>

              {/* Card Body */}
              <div className="py-6 flex-1 flex flex-col justify-center space-y-4">
                {!isFlipped ? (
                  <h2 className="text-lg sm:text-xl font-bold leading-relaxed text-slate-900 dark:text-slate-100">
                    {currentCard.question}
                  </h2>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-indigo-50 font-medium">
                      {currentCard.answer}
                    </p>

                    {currentCard.mathFormula && (
                      <div className="bg-indigo-950/80 border border-indigo-700/60 rounded-xl p-3 text-center">
                        <FormattedMathText text={`$$${currentCard.mathFormula}$$`} />
                      </div>
                    )}

                    <div className="text-xs text-indigo-200/90 bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
                      💡 <strong>Ključni namig:</strong> {currentCard.tip}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="text-[11px] text-center opacity-60">
                {isFlipped ? 'Ocenite svoje razumevanje spodaj' : 'Poskusite odgovoriti v mislih preden obrnete kartico'}
              </div>
            </div>

            {/* Assessment Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all shadow-xs"
                  title="Prejšnja kartica"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all shadow-xs"
                  title="Naslednja kartica"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => markReview(currentCard.id)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-all shadow-xs"
                >
                  <XCircle className="h-4 w-4 text-rose-500" />
                  <span>Še ponovi</span>
                </button>

                <button
                  onClick={() => markKnown(currentCard.id)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-all shadow-xs"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Obvladam</span>
                </button>

                {onSelectUnit && (
                  <button
                    onClick={() => onSelectUnit(currentCard.unitId)}
                    className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Lekcija</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500">Ni kartic v tej kategoriji.</p>
          </div>
        )}
      </main>
    </div>
  );
};
