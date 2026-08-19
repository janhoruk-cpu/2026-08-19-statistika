export interface PracticeStep {
  stepNumber: number;
  title: string;
  explanation: string;
  mathFormula?: string;
  result: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  topic: 'Intervali zaupanja' | 'Preizkušanje domnev' | 'Bayesov izrek' | 'Hi-kvadrat' | 'Linearna regresija' | 'Verjetnost';
  difficulty: 'Osnovna' | 'Srednja' | 'Zahtevna';
  chapterLink: string;
  problemStatement: string;
  givenData: { label: string; value: string }[];
  finalAnswer: string;
  steps: PracticeStep[];
  commonMistakes: string[];
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'prob-ci-proportion',
    title: '95 % interval zaupanja za delež javnomnenjske podpore',
    topic: 'Intervali zaupanja',
    difficulty: 'Osnovna',
    chapterLink: 'unit-5-2',
    problemStatement:
      'V reprezentativni anketi med 1.024 naključno izbranimi volivci je 563 vprašanih odgovorilo, da podpirajo predlagani zakon o obnovljivih virih energije. Izračunajte 95 % interval zaupanja za dejanski delež podpore v celotni populaciji in podajte interpretacijo.',
    givenData: [
      { label: 'Velikost vzorca n', value: '1.024' },
      { label: 'Število podpornikov k', value: '563' },
      { label: 'Stopnja zaupanja 1 - α', value: '95 % (z* = 1.96)' },
    ],
    finalAnswer: 'p ∈ [51.93 %, 58.03 %] (oz. 54.98 % ± 3.05 %)',
    steps: [
      {
        stepNumber: 1,
        title: 'Izračun točkovne ocene (vzorčnega deleža)',
        explanation: 'Izračunamo vzorčni delež p̂ kot razmerje med številom ugodnih izidov k in velikostjo vzorca n.',
        mathFormula: '\\hat{p} = \\frac{k}{n} = \\frac{563}{1024} \\approx 0.5498 \\quad (54.98\\%)',
        result: 'p̂ = 0.5498',
      },
      {
        stepNumber: 2,
        title: 'Preverjanje pogojev za normalno aproksimacijo',
        explanation: 'Preverimo pogoj uspehov in neuspehov: n · p̂ ≥ 10 in n · (1 - p̂) ≥ 10.',
        mathFormula: 'n\\hat{p} = 563 \\ge 10, \\quad n(1 - \\hat{p}) = 461 \\ge 10 \\quad \\checkmark',
        result: 'Pogoji za centralni limitni izrek so izpolnjeni.',
      },
      {
        stepNumber: 3,
        title: 'Izračun standardne napake (SE) in roba napake (E)',
        explanation: 'Standardna napaka deleža in rob napake z uporabo kritične vrednosti z* = 1.96.',
        mathFormula: 'SE = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} = \\sqrt{\\frac{0.5498 \\cdot 0.4502}{1024}} \\approx 0.01556 \\\\\nE = z^* \\cdot SE = 1.96 \\cdot 0.01556 \\approx 0.0305 \\quad (3.05\\%)',
        result: 'Rob napake E = 3.05 %',
      },
      {
        stepNumber: 4,
        title: 'Zapis intervala zaupanja in vsebinska interpretacija',
        explanation: 'Interval zaupanja je [p̂ - E, p̂ + E].',
        mathFormula: 'IZ_{95\\%} = [0.5498 - 0.0305, \\; 0.5498 + 0.0305] = [0.5193, \\; 0.5803]',
        result: 'Z 95 % gotovostjo trdimo, da zakon podpira med 51.93 % in 58.03 % vseh volivcev (večina).',
      },
    ],
    commonMistakes: [
      'Napačna interpretacija: "Obstaja 95 % verjetnost, da je populacijski delež v tem specifičnem intervalu." (Pravilno: 95 % vseh tako zgrajenih intervalov vsebuje pravi parameter).',
      'Uporaba napačne kritične vrednosti t namesto normalne z* pri velikih vzorcih deležev.',
    ],
  },
  {
    id: 'prob-two-sample-ttest',
    title: 'Dvovzorčni t-test za primerjavo učinkovitosti nove metode učenja',
    topic: 'Preizkušanje domnev',
    difficulty: 'Srednja',
    chapterLink: 'unit-6-1',
    problemStatement:
      'Profesor je želel preveriti, ali interaktivna simulacijska metoda izboljša rezultate izpita. Skupina A (tradicionalno predavanje, n₁ = 25) je dosegla povprečno oceno x̄₁ = 72.4 točk (s₁ = 8.2). Skupina B (interaktivno učenje, n₂ = 25) je dosegla x̄₂ = 78.6 točk (s₂ = 7.5). Preizkusite hipotezo pri stopnji značilnosti α = 0.05.',
    givenData: [
      { label: 'Skupina 1 (Tradicionalna)', value: 'n₁ = 25, x̄₁ = 72.4, s₁ = 8.2' },
      { label: 'Skupina 2 (Interaktivna)', value: 'n₂ = 25, x̄₂ = 78.6, s₂ = 7.5' },
      { label: 'Stopnja značilnosti α', value: '0.05 (dvostranski test)' },
    ],
    finalAnswer: 'Zavrnitev H₀ (t = -2.79, p = 0.0075 < 0.05). Interaktivno učenje statistično značilno izboljša rezultat.',
    steps: [
      {
        stepNumber: 1,
        title: 'Postavitev ničelne in alternativne hipoteze',
        explanation: 'H₀ predpostavlja enaki povprečji populacij, H₁ pa razliko.',
        mathFormula: 'H_0: \\mu_1 = \\mu_2 \\quad (\\mu_1 - \\mu_2 = 0) \\\\\nH_1: \\mu_1 \\ne \\mu_2 \\quad (\\mu_1 - \\mu_2 \\ne 0)',
        result: 'Dvostranski preizkus hipoteze.',
      },
      {
        stepNumber: 2,
        title: 'Izračun standardne napake razlike povprečij',
        explanation: 'Ker sta vzorca neodvisna, seštejemo vzorčni varianci.',
        mathFormula: 'SE_{(\\bar{x}_1 - \\bar{x}_2)} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} = \\sqrt{\\frac{8.2^2}{25} + \\frac{7.5^2}{25}} = \\sqrt{2.6896 + 2.25} = \\sqrt{4.9396} \\approx 2.2225',
        result: 'SE = 2.2225',
      },
      {
        stepNumber: 3,
        title: 'Izračun testne statistike t',
        explanation: 'Določimo, za koliko standardnih napak se opazovana razlika razlikuje od 0.',
        mathFormula: 't = \\frac{(\\bar{x}_1 - \\bar{x}_2) - 0}{SE} = \\frac{72.4 - 78.6}{2.2225} = \\frac{-6.2}{2.2225} \\approx -2.790',
        result: 't = -2.790',
      },
      {
        stepNumber: 4,
        title: 'Določitev p-vrednosti in sklep',
        explanation: 'Pri stopnjah prostosti df ≈ 48 je dvostranska p-vrednost 0.0075.',
        mathFormula: 'p = 2 \\cdot P(T_{48} \\le -2.790) \\approx 0.0075 \\\\\np = 0.0075 < \\alpha = 0.05 \\implies \\text{Zavrnemo } H_0',
        result: 'Obstaja statistično značilna razlika v prid interaktivni metodi (razlika 6.2 točk, p = 0.0075).',
      },
    ],
    commonMistakes: [
      'Zamenjava enostranskega in dvostranskega testa brez vnaprejšnje teoretične opredelitve predznaka.',
      'Predpostavljanje enakih varianc brez preverjanja (uporaba Welchovega t-testa je varnejša).',
    ],
  },
  {
    id: 'prob-chi-square-independence',
    title: 'Hi-kvadrat (χ²) test neodvisnosti med izobrazbo in volilno udeležbo',
    topic: 'Hi-kvadrat',
    difficulty: 'Srednja',
    chapterLink: 'unit-6-2',
    problemStatement:
      'V raziskavi na 400 posameznikih so opazovali povezavo med stopnjo izobrazbe (Srednja / Visoka) in volilno udeležbo (Volil / Ni volil). Podatki kontingenčne tabele: Srednja izobrazba: 120 volilo, 80 ni volilo. Visoka izobrazba: 150 volilo, 50 ni volilo. Preizkusite neodvisnost pri α = 0.01.',
    givenData: [
      { label: 'Opazovane frekvence O', value: 'Tabela 2x2: [[120, 80], [150, 50]]' },
      { label: 'Skupni vzorec N', value: '400' },
      { label: 'Stopnja značilnosti α', value: '0.01' },
    ],
    finalAnswer: 'Zavrnitev H₀ (χ² = 10.37, p = 0.0013 < 0.01, df = 1). Izobrazba in udeležba sta odvisni.',
    steps: [
      {
        stepNumber: 1,
        title: 'Postavitev hipotez',
        explanation: 'H₀ trdi, da sta spremenljivki neodvisni, H₁ pa, da sta povezani.',
        mathFormula: 'H_0: \\text{Stopnja izobrazbe in volilna udeležba sta neodvisni.} \\\\\nH_1: \\text{Med stopnjo izobrazbe in udeležbo obstaja statistična povezanost.}',
        result: 'df = (vrstice - 1)(stolpci - 1) = (2-1)(2-1) = 1',
      },
      {
        stepNumber: 2,
        title: 'Izračun pričakovanih frekvenc E ob predpostavki H₀',
        explanation: 'Za vsako celico: E = (vsota vrstice · vsota stolpca) / N.',
        mathFormula: 'E_{11} = \\frac{200 \\cdot 270}{400} = 135, \\quad E_{12} = \\frac{200 \\cdot 130}{400} = 65 \\\\\nE_{21} = \\frac{200 \\cdot 270}{400} = 135, \\quad E_{22} = \\frac{200 \\cdot 130}{400} = 65',
        result: 'Vse pričakovane frekvence so ≥ 5 (pogoj izpolnjen).',
      },
      {
        stepNumber: 3,
        title: 'Izračun testne statistike χ²',
        explanation: 'Seštejemo relativna kvadratna odstopanja (O - E)² / E po vseh 4 celicah.',
        mathFormula: '\\chi^2 = \\sum \\frac{(O - E)^2}{E} = \\frac{(120-135)^2}{135} + \\frac{(80-65)^2}{65} + \\frac{(150-135)^2}{135} + \\frac{(50-65)^2}{65} \\\\\n\\chi^2 = \\frac{225}{135} + \\frac{225}{65} + \\frac{225}{135} + \\frac{225}{65} = 1.667 + 3.462 + 1.667 + 3.462 = 10.258',
        result: 'χ² = 10.26',
      },
      {
        stepNumber: 4,
        title: 'Primerjava s kritično vrednostjo in sklep',
        explanation: 'Pri df = 1 in α = 0.01 je kritična vrednost χ²(krit) = 6.635.',
        mathFormula: '\\chi^2 = 10.26 > \\chi^2_{0.01, 1} = 6.635 \\implies p = 0.0013 < 0.01',
        result: 'Zavrnemo H₀. Posamezniki z visoko izobrazbo imajo statistično značilno višjo volilno udeležbo (75 % vs 60 %).',
      },
    ],
    commonMistakes: [
      'Uporaba χ² testa, ko so pričakovane frekvence E < 5 v več kot 20 % celic (v tem primeru uporabite Fisherjev eksaktni test).',
    ],
  },
  {
    id: 'prob-bayes-medical',
    title: 'Bayesov izrek pri redki bolezni in lažno pozitivnih izvidih',
    topic: 'Bayesov izrek',
    difficulty: 'Zahtevna',
    chapterLink: 'unit-2-3',
    problemStatement:
      'Prevalenca redke bolezni v populaciji je 0.5 % (P(B) = 0.005). Diagnostični test ima 98 % občutljivost (ob bolezni pokaže pozitiven izvid) in 95 % specifičnost (pri zdravem pokaže negativen izvid). Oseba prejme pozitiven izvid (+). Izračunajte verjetnost, da je oseba dejansko bolna P(B | +).',
    givenData: [
      { label: 'Apriorna verjetnost P(B)', value: '0.005 (0.5 %)' },
      { label: 'Občutljivost P(+ | B)', value: '0.98 (98 %)' },
      { label: 'Specifičnost P(- | Zdrav)', value: '0.95 (95 %)' },
      { label: 'Lažno pozitivna stopnja P(+ | Zdrav)', value: '1 - 0.95 = 0.05 (5 %)' },
    ],
    finalAnswer: 'P(B | +) = 8.96 % (več kot 91 % pozitivnih izvidov je lažno pozitivnih!)',
    steps: [
      {
        stepNumber: 1,
        title: 'Zapis Bayesovega obrazca za popolno verjetnost',
        explanation: 'Razdelimo celotno verjetnost pozitivnega izvida P(+) na prave in lažne pozitivne.',
        mathFormula: 'P(B \\mid +) = \\frac{P(+ \\mid B)P(B)}{P(+)} = \\frac{P(+ \\mid B)P(B)}{P(+ \\mid B)P(B) + P(+ \\mid \\bar{B})P(\\bar{B})}',
        result: 'Bayesov obrazec.',
      },
      {
        stepNumber: 2,
        title: 'Izračun števca (pravi pozitivni)',
        explanation: 'Verjetnost, da je oseba bolna IN ima pozitiven izvid.',
        mathFormula: 'P(+ \\cap B) = 0.98 \\cdot 0.005 = 0.0049',
        result: 'Števec = 0.0049',
      },
      {
        stepNumber: 3,
        title: 'Izračun imenovalca (celotna verjetnost P(+))',
        explanation: 'Vsota pravih pozitivnih (0.0049) in lažnih pozitivnih (0.05 · 0.995).',
        mathFormula: 'P(+) = 0.0049 + (0.05 \\cdot 0.995) = 0.0049 + 0.04975 = 0.05465',
        result: 'Imenovalec P(+) = 0.05465 (5.465 % vseh testov bo pozitivnih)',
      },
      {
        stepNumber: 4,
        title: 'Izračun aposteriorne verjetnosti',
        explanation: 'Delež pravih pozitivnih med vsemi pozitivnimi izvidi.',
        mathFormula: 'P(B \\mid +) = \\frac{0.0049}{0.05465} \\approx 0.08966 \\quad (8.97\\%)',
        result: 'P(B | +) ≈ 8.97 %',
      },
    ],
    commonMistakes: [
      'Zamenjava občutljivosti P(+ | B) z aposteriorno verjetnostjo P(B | +) (osnovna Bayesova zabloda).',
      'Ignoriranje nizke prevalence bolezni, zaradi katere velika večina pozitivnih izvidov izhaja iz zdrave večine.',
    ],
  },
];
