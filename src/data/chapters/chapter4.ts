import { ChapterConfig } from '../../types';

export const chapter4: ChapterConfig = {
  id: 'chapter-4',
  chapterNumber: 4,
  title: '4. Poglavje: Porazdelitve slučajnih spremenljivk',
  subtitle: 'Normalna, Bernoullijeva, geometrijska, binomska in Poissonova porazdelitev',
  description: 'Spoznajte najpomembnejše verjetnostne modele v naravi in podatkovni znanosti. Odkrijte moč standardizacije z Z-vrednostmi, raziščite pravilo 68-95-99.7, modelirajte čakalne dobe z geometrijsko porazdelitvijo ter štejte redke dogodke s Poissonovim zakonom.',
  iconName: 'Activity',
  color: '#059669',
  units: [
    {
      id: 'unit-4-1',
      unitNumber: '4.1',
      chapterId: 'chapter-4',
      title: 'Normalna (Gaussova) porazdelitev in Z-vrednosti',
      subtitle: 'Standardizacija podatkov, percentili in empirično pravilo 68-95-99.7',
      leadParagraph: 'Med vsemi verjetnostnimi porazdelitvami je normalna zvonasta krivulja (Gaussova porazdelitev) daleč najpomembnejša. Pojavlja se povsod: pri telesnih merah, rezultatih standardiziranih testov in merilnih napakah v fiziki.',
      deepDive: 'Normalno porazdelitev $N(\\mu, \\sigma)$ natančno opišeta dva parametra: povprečje $\\mu$ (določa lego središča) in standardni odklon $\\sigma$ (določa širino in razpotegnjenost).\n\nKljučni koncepti normalnega modela:\n1. Standardizacija z $Z$-vrednostjo: $Z = \\frac{x - \\mu}{\\sigma}$ pove, za koliko standardnih odklonov se meritev nahaja nad ali pod povprečjem.\n2. Standardna normalna porazdelitev: $Z \\sim N(0, 1)$ ima povprečje $0$ in standardni odklon $1$.\n3. Empirično pravilo (pravilo 68-95-99.7):\n   - $\\mu \\pm 1\\sigma$: zajema približno $68,3\\,\\%$ vseh podatkov,\n   - $\\mu \\pm 2\\sigma$: zajema približno $95,4\\,\\%$ vseh podatkov,\n   - $\\mu \\pm 3\\sigma$: zajema kar $99,7\\,\\%$ vseh opazovanj.',
      mnemonic: {
        eli5: 'Z-vrednost je univerzalni prevajalnik za dosežke: če dobiš Z = +2,0, to pomeni, da si med najboljšimi 2,5 % v svoji ligi – ne glede na to, ali gre za točke na testu, višino ali hitrost!',
        anchor: 'Z = (x - μ) / σ; 68 % znotraj ±1σ, 95 % znotraj ±2σ, 99.7 % znotraj ±3σ.',
        fallacyWarning: {
          name: 'Predpostavka, da so vsi zvonasti podatki normalni',
          description: 'Slepa uporaba normalnega modela za podatke z debelimi repi ali močnimi osamelci.',
          example: 'Čeprav je donosnost delnic na prvi pogled videti zvonasta, ima v resnici »debele repe« (fat tails) – ekstremni padci se dogajajo stokrat pogosteje, kot bi napovedala normalna krivulja!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Z-vrednost je statistično merilo: pove ti, ali je tvoj rezultat povprečen, odličen ali pravi čudež.',
        simpleExplanation: 'Če je Ana dosegla 1300 točk na SAT (povprečje 1100, odklon 200), je njen Z-score enak (1300 - 1100) / 200 = +1,0 (dosegla je 84. percentil). Če je Peter dosegel 24 točk na ACT (povprečje 21, odklon 6), je njegov Z-score enak (24 - 21) / 6 = +0,5 (dosegel je 69. percentil). Ana se je odrezala relativno bolje od Petra!',
        practicalInsight: 'V medicinski diagnostiki se Z-vrednosti uporabljajo za merjenje kostne gostote (T-score/Z-score) in odkrivanje osteoporoze.',
        mathematicalTheory: 'Gostota standardne normalne porazdelitve: \\phi(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}. Kumulativna verjetnost: \\Phi(z) = \\int_{-\\infty}^z \\phi(t) dt.'
      },
      textbookWisdom: {
        simpleQuote: 'Z-vrednost je statistično merilo: pove ti, ali je tvoj rezultat povprečen, odličen ali pravi čudež.',
        simpleExplanation: 'Če je Ana dosegla 1300 točk na SAT (povprečje 1100, odklon 200), je njen Z-score enak (1300 - 1100) / 200 = +1,0 (dosegel je 84. percentil). Če je Peter dosegel 24 točk na ACT (povprečje 21, odklon 6), je njegov Z-score enak (24 - 21) / 6 = +0,5 (dosegel je 69. percentil). Ana se je odrezala relativno bolje od Petra!',
        practicalInsight: 'V medicinski diagnostiki se Z-vrednosti uporabljajo za merjenje kostne gostote (T-score/Z-score) in odkrivanje osteoporoze.',
        mathematicalTheory: 'Gostota standardne normalne porazdelitve: \\phi(z) = \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}. Kumulativna verjetnost: \\Phi(z) = \\int_{-\\infty}^z \\phi(t) dt.'
      },
      cueBannerText: 'Spreminjajte Z-vrednost in opazujte ploščino repa ter ustrezni percentil.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Višina odraslih moških v populaciji sledi N(175 cm, 7 cm). Kakšen delež moških je višjih od 189 cm (kar ustreza μ + 2σ)?',
        prompt: 'Uporabite empirično pravilo 68-95-99.7 za zgornji rep:',
        options: [
          {
            id: 'opt-1',
            text: 'Približno 2,5 % (točno 2,28 %).',
            isCorrect: true,
            explanation: 'Odlično! Znotraj ±2σ (od 161 do 189 cm) se nahaja 95,44 % populacije. V obeh repih ostane 4,56 %, v enem samem zgornjem repu nad 189 cm pa natanko polovica: 2,28 %.'
          },
          {
            id: 'opt-2',
            text: 'Točno 5 %.',
            isCorrect: false,
            explanation: 'Napačno. 5 % je v obeh repih skupaj (spodnjem pod 161 cm in zgornjem nad 189 cm).'
          },
          {
            id: 'opt-3',
            text: '16 %.',
            isCorrect: false,
            explanation: 'Napačno. 16 % je v repu nad 1 standardnim odklonom (nad 182 cm).'
          }
        ],
        insight: 'Zaradi simetrije normalne krivulje je v vsakem posameznem repu izven ±2σ le ~2,3 % podatkov!',
        followUpExperiment: 'V simulaciji vnesite Z = 1.96 in preverite, da znaša površina repa točno 0,025.'
      },
      mathProof: {
        summaryLatex: 'Z = \\frac{x - \\mu}{\\sigma} \\sim N(0, 1), \\quad P(X \\ge x) = 1 - \\Phi(Z)',
        steps: [
          {
            title: '1. Standardizacija spremenljivke',
            latex: 'Z = \\frac{x - \\mu}{\\sigma}',
            explanation: 'Od vrednosti odštejemo povprečje in delimo s standardnim odklonom.'
          },
          {
            title: '2. Izračun kumulativnega percentila',
            latex: 'P(X \\le x) = \\Phi(Z) = \\int_{-\\infty}^Z \\frac{1}{\\sqrt{2\\pi}} e^{-t^2/2} dt',
            explanation: 'Tabela standardne normalne porazdelitve vrne ploščino na levi strani.'
          },
          {
            title: '3. Prehod na zgornji rep',
            latex: 'P(X > x) = 1 - \\Phi(Z)',
            explanation: 'Zgornji rep dobimo z odštetjem leve ploščine od 1.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Z-vrednosti in percentilov za SAT in ACT',
        defaultCode: `import scipy.stats as stats

# Podatki za SAT (mu=1100, sigma=200) in ACT (mu=21, sigma=6)
sat_score = 1300
z_sat = (sat_score - 1100) / 200
pct_sat = stats.norm.cdf(z_sat)

act_score = 24
z_act = (act_score - 21) / 6
pct_act = stats.norm.cdf(z_act)

print(f"Ana (SAT 1300): Z = {z_sat:+.2f}, Percentil = {pct_sat*100:.1f}%")
print(f"Peter (ACT 24): Z = {z_act:+.2f}, Percentil = {pct_act*100:.1f}%")
print(f"Ana je presegla {pct_sat*100:.1f} % testirancev, Peter pa {pct_act*100:.1f} %.")`,
        description: 'Primerjajte Z-vrednosti in percentila Ane in Petra.',
        runCode: (code: string) => {
          return {
            output: `Ana (SAT 1300): Z = +1.00, Percentil = 84.1%\nPeter (ACT 24): Z = +0.50, Percentil = 69.1%\nAna je presegla 84.1 % testirancev, Peter pa 69.1 %.\nSklep: Ana je dosegla relativno boljši rezultat.`,
            metrics: { z_ana: 1.0, pct_ana: 0.841, z_peter: 0.5, pct_peter: 0.691 }
          };
        }
      }
    },
    {
      id: 'unit-4-2',
      unitNumber: '4.2',
      chapterId: 'chapter-4',
      title: 'Bernoullijeva in geometrijska porazdelitev',
      subtitle: 'Poskusi z dvema izidoma ter čakanje na prvi uspeh',
      leadParagraph: 'Najenostavnejši naključni poskus ima le dva možna izida: uspeh (1) z verjetnostjo p ali neuspeh (0) z verjetnostjo 1 - p. Tak poskus imenujemo Bernoullijev poskus. Ko tak poskus ponavljamo do prvega uspeha, čas čakanja opisuje geometrijska porazdelitev.',
      deepDive: 'Bernoullijev poskus je temeljni binarni poskus z le dvema možnima izidoma (uspeh z verjetnostjo $p$, neuspeh z $1-p$).\n\nLastnosti modelov:\n1. Bernoullijeva spremenljivka: pričakovana vrednost $\\mu = p$, standardni odklon $\\sigma = \\sqrt{p(1 - p)}$.\n2. Geometrijska porazdelitev: verjetnost prvega uspeha natanko v $n$-tem poskusu je $P(X = n) = (1 - p)^{n-1} p$.\n3. Pričakovano število poskusov do uspeha: $\\mu = 1 / p$, standardni odklon pa $\\sigma = \\sqrt{(1 - p) / p^2}$.\n4. Odsotnost spomina (Memorylessness): pretekli neuspehi ne spremenijo verjetnosti uspeha v naslednjem poskusu.',
      mnemonic: {
        eli5: 'Geometrijska porazdelitev je kot metanje kocke, dokler ne pade prva šestica: vsak neuspeh te stane en poskus, a kocka ne ve, kolikokrat si jo že vrgel!',
        anchor: 'Bernoulli = en sam poskus (0 ali 1); Geometrijska = število poskusov do 1. uspeha; E(X) = 1/p.',
        fallacyWarning: {
          name: 'Zabloda poplačila po nizu neuspehov',
          description: 'Mnenje, da se po dolgem nizu neuspehov verjetnost za uspeh v naslednjem poskusu poveča.',
          example: 'Če si 10-krat zapored zgrešil tarčo, tvoja možnost za zadetek v 11. poskusu še vedno znaša točno p, ne pa več!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če je možnost uspeha 1 proti 10, boš v povprečju čakal 10 poskusov – a vsak nov poskus se začne znova.',
        simpleExplanation: 'Kadar zavarovalnica pregleduje kartoteke voznikov in ve, da 88 % voznikov ne preseže odbitne franšize (p = 0,88), bo uslužbenec v povprečju moral odpreti le 1 / 0,88 = 1,14 kartoteke, da najde prvega takega voznika.',
        practicalInsight: 'V industrijski kontroli kakovosti geometrijsko porazdelitev uporabljajo za merjenje števila izdelanih mikročipov do prvega pokvarjenega kosa.',
        mathematicalTheory: 'Za geometrijsko spremenljivko X \\sim \\text{Geom}(p) velja: P(X = k) = (1-p)^{k-1}p za k \\in \\{1, 2, \\dots\\}. Kumulativna verjetnost: P(X \\le k) = 1 - (1-p)^k. E[X] = 1/p, \\text{Var}(X) = (1-p)/p^2.'
      },
      textbookWisdom: {
        simpleQuote: 'Če je možnost uspeha 1 proti 10, boš v povprečju čakal 10 poskusov – a vsak nov poskus se začne znova.',
        simpleExplanation: 'Kadar zavarovalnica pregleduje kartoteke voznikov in ve, da 88 % voznikov ne preseže odbitne franšize (p = 0,88), bo uslužbenec v povprečju moral odpreti le 1 / 0,88 = 1,14 kartoteke, da najde prvega takega voznika.',
        practicalInsight: 'V industrijski kontroli kakovosti geometrijsko porazdelitev uporabljajo za merjenje števila izdelanih mikročipov do prvega pokvarjenega kosa.',
        mathematicalTheory: 'Za geometrijsko spremenljivko X \\sim \\text{Geom}(p) velja: P(X = k) = (1-p)^{k-1}p za k \\in \\{1, 2, \\dots\\}. Kumulativna verjetnost: P(X \\le k) = 1 - (1-p)^k. E[X] = 1/p, \\text{Var}(X) = (1-p)/p^2.'
      },
      cueBannerText: 'Spreminjajte verjetnost uspeha p in opazujte eksponentno padanje verjetnosti čakanja.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Stroj za izdelavo mikroprocesorjev ima 2 % stopnjo napak (p = 0,02). Kolikšna je verjetnost, da je šele 10. izdelani mikroprocesor prvi pokvarjen?',
        prompt: 'Izračunajte geometrijsko verjetnost za 9 zaporednih brezhibnih in nato 1 pokvarjen procesor:',
        options: [
          {
            id: 'opt-1',
            text: '1,67 % ((0,98)⁹ * 0,02 ≈ 0,0167).',
            isCorrect: true,
            explanation: 'Odlično! Verjetnost je (1 - 0,02)⁹ * 0,02 = 0,8337 * 0,02 = 0,0167 ali 1,67 %.'
          },
          {
            id: 'opt-2',
            text: '20 % (10 * 0,02 = 0,20).',
            isCorrect: false,
            explanation: 'Napačno. Preprosto množenje ne upošteva verjetnosti zaporednih brezhibnih poskusov.'
          },
          {
            id: 'opt-3',
            text: '0,04 % (0,02² = 0,0004).',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Vsak korak čakanja zmanjša verjetnost s faktorjem (1 - p)!',
        followUpExperiment: 'V simulaciji izračunajte pričakovano število čipov do napake: 1 / 0,02 = 50 čipov.'
      },
      mathProof: {
        summaryLatex: 'P(X = n) = (1 - p)^{n-1} p, \\quad E[X] = \\frac{1}{p}, \\quad \\sigma = \\sqrt{\\frac{1-p}{p^2}}',
        steps: [
          {
            title: '1. Verjetnost niza (n-1) neuspehov in 1 uspeha',
            latex: 'P(N_1 \\cap N_2 \\cap \\dots \\cap U_n) = (1-p) \\cdot (1-p) \\dots (1-p) \\cdot p = (1-p)^{n-1}p',
            explanation: 'Zaradi neodvisnosti poskusov verjetnosti preprosto pomnožimo.'
          },
          {
            title: '2. Izpeljava pričakovane vrednosti z geometrijsko vrsto',
            latex: 'E[X] = \\sum_{n=1}^\\infty n (1-p)^{n-1} p = p \\frac{d}{d(1-p)} \\sum_{n=0}^\\infty (1-p)^n = \\frac{1}{p}',
            explanation: 'Vsota neskončne odvoda geometrijske vrste da pričakovanje 1/p.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Geometrijska porazdelitev in čakalne dobe',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Verjetnost napake na proizvodni liniji p = 0.02
p = 0.02

# Verjetnost, da je 10. izdelek prvi z napako
k = 10
p_10 = stats.geom.pmf(k, p)

# Pričakovano število izdelkov do napake
mu = 1 / p
sd = np.sqrt((1 - p) / p**2)

print(f"P(1. napaka natanko ob 10. kosu): {p_10:.4f} ({p_10*100:.2f} %)")
print(f"Pričakovano število do napake:     {mu:.0f} kosov")
print(f"Standardni odklon čakalne dobe:    {sd:.1f} kosov")`,
        description: 'Izračunajte geometrijske verjetnosti in parametre čakanja.',
        runCode: (code: string) => {
          return {
            output: `P(1. napaka natanko ob 10. kosu): 0.0167 (1.67 %)\nPričakovano število do napake:     50 kosov\nStandardni odklon čakalne dobe:    49.5 kosov`,
            metrics: { p_10: 0.0167, mu: 50, sd: 49.5 }
          };
        }
      }
    },
    {
      id: 'unit-4-3',
      unitNumber: '4.3',
      chapterId: 'chapter-4',
      title: 'Binomska porazdelitev in normalna aproksimacija',
      subtitle: 'Štetje k uspehov v n poskusih ter pravilo np ≥ 10 in n(1-p) ≥ 10',
      leadParagraph: 'Če vržemo 10 kovancev ali testiramo 100 naključnih pacientov, nas pogosto zanima skupno število uspehov k v fiksnem številu poskusov n. To je področje binomske porazdelitve.',
      deepDive: 'Binomska porazdelitev $\\text{Bin}(n, p)$ modelira število uspehov $k$ v $n$ neodvisnih poskusih.\n\nŠtirje pogoji za binomski proces:\n1. Neodvisnost: vsak poskus je statistično neodvisen od ostalih.\n2. Fiksno število poskusov: $n$ je vnaprej natančno določen.\n3. Dva izida: vsak poskus se konča z uspehom ali neuspehom.\n4. Stalna verjetnost: verjetnost uspeha $p$ je v vsakem poskusu enaka.\n\nFormule in normalna aproksimacija:\n- Verjetnost: $P(X = k) = \\binom{n}{k} p^k (1 - p)^{n-k}$, s povprečjem $\\mu = n p$ in $\\sigma = \\sqrt{n p (1 - p)}$.\n- Normalna aproksimacija: kadar velja $np \\ge 10$ in $n(1 - p) \\ge 10$, lahko binomsko porazdelitev aproksimiramo z $N(\\mu = np, \\sigma = \\sqrt{np(1-p)})$. Popravek za zveznost (Continuity correction) zamakne mejo za $\\pm 0,5$.',
      mnemonic: {
        eli5: 'Binomska formula je kot žrebanje ekipe: binomski koeficient (n nad k) pove, na koliko načinov lahko izbereš k zmagovalcev, p^k * (1-p)^(n-k) pa je verjetnost enega samega takega seznama.',
        anchor: 'Binomski pogoji: 1. Fiksen n, 2. Dva izida, 3. Enak p, 4. Neodvisnost. Normalna aproksimacija velja, ko sta np in n(1-p) vsaj 10.',
        fallacyWarning: {
          name: 'Pozabljanje na binomski koeficient (n nad k)',
          description: 'Računanje le verjetnosti enega samega zaporedja p^k * (1-p)^(n-k) brez upoštevanja vseh možnih permutacij.',
          example: 'Možnost, da med 4 prijatelji natanko 1 kadi, ni le (0,3)¹ * (0,7)³, ampak moramo to pomnožiti s 4, ker je lahko kadilec katerikoli od štirih!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko je poskusov veliko in sta np in n(1-p) vsaj 10, binomski stolpci gladko preidejo v Gaussov zvon.',
        simpleExplanation: 'Če v mestu kadi 15 % ljudi in vzamemo vzorec 400 prebivalcev, pričakujemo \\mu = 400 * 0,15 = 60 kadilcev s standardnim odklonom \\sigma = \\sqrt{400 * 0,15 * 0,85} = 7,14. Verjetnost, da jih bo 42 ali manj, izračunamo z Z-vrednostjo Z = (42 - 60) / 7,14 = -2,52 (kar ustreza p ≈ 0,0059).',
        practicalInsight: 'V političnih anketah in marketinških raziskavah binomska porazdelitev z normalno aproksimacijo omogoča takojšen izračun intervalov zaupanja in napak vzorčenja.',
        mathematicalTheory: 'De Moivre-Laplaceov izrek: Za binomsko porazdeljeno spremenljivko S_n \\sim \\text{Bin}(n, p) velja \\frac{S_n - np}{\\sqrt{np(1-p)}} \\xrightarrow{d} N(0, 1) ob n \\to \\infty.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko je poskusov veliko in sta np in n(1-p) vsaj 10, binomski stolpci gladko preidejo v Gaussov zvon.',
        simpleExplanation: 'Če v mestu kadi 15 % ljudi in vzamemo vzorec 400 prebivalcev, pričakujemo \\mu = 400 * 0,15 = 60 kadilcev s standardnim odklonom \\sigma = \\sqrt{400 * 0,15 * 0,85} = 7,14. Verjetnost, da jih bo 42 ali manj, izračunamo z Z-vrednostjo Z = (42 - 60) / 7,14 = -2,52 (kar ustreza p ≈ 0,0059).',
        practicalInsight: 'V političnih anketah in marketinških raziskavah binomska porazdelitev z normalno aproksimacijo omogoča takojšen izračun intervalov zaupanja in napak vzorčenja.',
        mathematicalTheory: 'De Moivre-Laplaceov izrek: Za binomsko porazdeljeno spremenljivko S_n \\sim \\text{Bin}(n, p) velja \\frac{S_n - np}{\\sqrt{np(1-p)}} \\xrightarrow{d} N(0, 1) ob n \\to \\infty.'
      },
      cueBannerText: 'Povečujte velikost vzorca n in opazujte, kako binomski stolpci sovpadejo z normalno krivuljo.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V vzorcu n = 100 odraslih Američanov želimo preveriti delež ljudi, ki so v otroštvu preboleli norice (p = 0,90). Ali je za ta primer varna uporaba normalne aproksimacije?',
        prompt: 'Preverite pogoj uspehov in neuspehov: np ≥ 10 in n(1 - p) ≥ 10:',
        options: [
          {
            id: 'opt-1',
            text: 'Ne, ker je pričakovano število neuspehov n(1 - p) = 100 * 0,10 = 10 na sami meji (premalo neuspehov), zato je porazdelitev opazno levo asimetrična.',
            isCorrect: true,
            explanation: 'Odlično! Ko je p blizu 1 ali 0, potrebujemo večji vzorec, da se izognemo asimetriji ob naravni meji.'
          },
          {
            id: 'opt-2',
            text: 'Da, ker je n = 100 več kot 30.',
            isCorrect: false,
            explanation: 'Napačno. Pravilo n ≥ 30 velja za povprečja zveznih podatkov, pri deležih pa moramo vedno preveriti OBA pogoja: np in n(1-p) ≥ 10!'
          },
          {
            id: 'opt-3',
            text: 'Da, ker je 100 * 0,90 = 90 veliko število.',
            isCorrect: false,
            explanation: 'Napačno. Izpolnjen mora biti tudi pogoj za neuspehe n(1-p).'
          }
        ],
        insight: 'Pri deležih morata biti VEDNO oba produkta np in n(1-p) vsaj 10 za varno normalno aproksimacijo!',
        followUpExperiment: 'V simulaciji spreminjajte p od 0,1 do 0,9 in opazujte asimetrijo pri robnih vrednostih.'
      },
      mathProof: {
        summaryLatex: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad \\mu = np, \\quad \\sigma = \\sqrt{np(1-p)}',
        steps: [
          {
            title: '1. Binomski koeficient (število razporeditev)',
            latex: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
            explanation: 'Število načinov za izbiro k uspešnih mest med n poskusi.'
          },
          {
            title: '2. Verjetnost posameznega niza',
            latex: 'P(\\text{posamezni niz}) = p^k (1-p)^{n-k}',
            explanation: 'Zaradi neodvisnosti zmnožimo verjetnosti posameznih izidov.'
          },
          {
            title: '3. Normalna aproksimacija z Z-vrednostjo',
            latex: 'Z \\approx \\frac{k - np}{\\sqrt{np(1-p)}} \\sim N(0, 1) \\quad (\\text{ob } np \\ge 10, \\, n(1-p) \\ge 10)',
            explanation: 'Prehod iz diskretnega seštevanja na zvezni integral standardne normalne krivulje.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava natančnega binomskega izračuna in normalne aproksimacije',
        defaultCode: `import scipy.stats as stats
import numpy as np

n = 400
p = 0.15
k = 42 # Želimo P(X <= 42)

# Natančni binomski izračun
p_tocno = stats.binom.cdf(k, n, p)

# Normalna aproksimacija
mu = n * p
sigma = np.sqrt(n * p * (1 - p))
z = (k - mu) / sigma
p_norm = stats.norm.cdf(z)

# Normalna aproksimacija s popravkom za zveznost (+0.5)
z_popravek = (k + 0.5 - mu) / sigma
p_norm_popravljen = stats.norm.cdf(z_popravek)

print(f"Natančna binomska verjetnost P(X <= 42): {p_tocno:.5f}")
print(f"Navadna normalna aproksimacija:         {p_norm:.5f}")
print(f"Normalna aproksimacija s popravkom +0.5: {p_norm_popravljen:.5f}")`,
        description: 'Primerjajte natančno binomsko verjetnost z normalno aproksimacijo.',
        runCode: (code: string) => {
          return {
            output: `Natančna binomska verjetnost P(X <= 42): 0.00540\nNavadna normalna aproksimacija:         0.00585\nNormalna aproksimacija s popravkom +0.5: 0.00538\nSklep: Popravek za zveznost da skoraj popolno ujemanje!`,
            metrics: { p_exact: 0.00540, p_norm: 0.00585, p_corr: 0.00538 }
          };
        }
      }
    },
    {
      id: 'unit-4-4',
      unitNumber: '4.4',
      chapterId: 'chapter-4',
      title: 'Negativna binomska in Poissonova porazdelitev',
      subtitle: 'Čakanje na k-ti uspeh ter modeliranje redkih dogodkov na časovno enoto (λ)',
      leadParagraph: 'Kaj če želimo vedeti, koliko poskusov bo potrebnih za dosego k-tega uspeha (npr. nogometni strelec, ki trenira, dokler ne zadene 4 golov)? Ali pa koliko srčnih kapi se zgodi v bolnišnici v enem dnevu? Za te pojave uporabljamo negativno binomsko in Poissonovo porazdelitev.',
      deepDive: 'Negativna binomska in Poissonova porazdelitev modelirata zapletenejše procese štetja:\n1. Negativna binomska porazdelitev: opisuje verjetnost, da bo $k$-ti uspeh dosežen natanko v $n$-tem poskusu: $P(X = n) = \\binom{n - 1}{k - 1} p^k (1 - p)^{n - k}$.\n2. Poissonova porazdelitev $\\text{Poisson}(\\lambda)$: modelira število redkih, medsebojno neodvisnih dogodkov v določenem časovnem ali prostorskem intervalu ob povprečni stopnji $\\lambda$.\n3. Verjetnostna funkcija: $P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$.\n4. Enakost parametrov: Poissonova porazdelitev ima izjemno lastnost, da sta pričakovana vrednost in varianca natanko enaki: $E(X) = \\text{Var}(X) = \\lambda$, standardni odklon pa je $\\sqrt{\\lambda}$.',
      mnemonic: {
        eli5: 'Poissonova porazdelitev je kot čakanje na zvezdne utrinke: v povprečju jih vidiš 4 na uro (λ = 4). Lahko ne vidiš nobenega, lahko pa v izjemni uri kar 8!',
        anchor: 'Negativna binomska = k-ti uspeh ob n-tem poskusu; Poisson = štetje redkih dogodkov ob znani stopnji λ (E = Var = λ).',
        fallacyWarning: {
          name: 'Predpostavka neodvisnosti pri skupinskem prihodu',
          description: 'Uporaba Poissonove porazdelitve za štetje ljudi v trgovini, ko ljudje prihajajo v skupinah (družine z avtomobili).',
          example: 'Če avtomobili pripeljejo povprečno 2 človeka, posamezniki niso neodvisni in Poissonova predpostavka odpove!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko dogodki kapljajo naključno in neodvisno skozi čas, jim vlada Poissonov zakon z eno samo številko: stopnjo λ.',
        simpleExplanation: 'V New Yorku se v povprečju zgodi 4,4 srčnih kapi na dan (\\lambda = 4,4). Z Poissonovo formulo lahko takoj izračunamo verjetnost, da bodo reševalci v nekem dnevu imeli natanko 5 klicev ali pa nobenega.',
        practicalInsight: 'Spletni strežniki (npr. Google, AWS) dimenzionirajo svojo infrastrukturo na podlagi Poissonovega procesa prihodov zahtevkov na sekundo.',
        mathematicalTheory: 'Poissonov limitni izrek: Ko n \\to \\infty in p \\to 0 tako, da np \\to \\lambda, binomska porazdelitev \\text{Bin}(n, p) konvergira k \\text{Poisson}(\\lambda). P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko dogodki kapljajo naključno in neodvisno skozi čas, jim vlada Poissonov zakon z eno samo številko: stopnjo λ.',
        simpleExplanation: 'V New Yorku se v povprečju zgodi 4,4 srčnih kapi na dan (\\lambda = 4,4). Z Poissonovo formulo lahko takoj izračunamo verjetnost, da bodo reševalci v nekem dnevu imeli natanko 5 klicev ali pa nobenega.',
        practicalInsight: 'Spletni strežniki (npr. Google, AWS) dimenzionirajo svojo infrastrukturo na podlagi Poissonovega procesa prihodov zahtevkov na sekundo.',
        mathematicalTheory: 'Poissonov limitni izrek: Ko n \\to \\infty in p \\to 0 tako, da np \\to \\lambda, binomska porazdelitev \\text{Bin}(n, p) konvergira k \\text{Poisson}(\\lambda). P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}.'
      },
      cueBannerText: 'Spreminjajte stopnjo dogodkov λ in opazujte prehod iz asimetrične v bolj simetrično obliko.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V kavarni strežejo v jutranji konici v povprečju 6,5 vozil na uro (λ = 6,5). Kolikšna je verjetnost, da v naslednji uri pripelje natanko 5 vozil?',
        prompt: 'Uporabite Poissonovo formulo P(X = 5) = (6,5⁵ * e^(-6,5)) / 5!:',
        options: [
          {
            id: 'opt-1',
            text: 'Približno 14,5 % (0,1454).',
            isCorrect: true,
            explanation: 'Odlično! P(X = 5) = (6,5⁵ * e^(-6,5)) / 120 = (11602,9 * 0,001503) / 120 ≈ 0,1454 ali 14,5 %.'
          },
          {
            id: 'opt-2',
            text: '76,9 % (5 / 6,5 = 0,769).',
            isCorrect: false,
            explanation: 'Napačno. Preprosto deljenje nima nobene zveze s Poissonovo verjetnostjo.'
          },
          {
            id: 'opt-3',
            text: '50 %.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Poissonova porazdelitev natančno modelira nihanja v tokovih strank, klicev in naročil!',
        followUpExperiment: 'V naslednjem poglavju 5 boste spoznali, kako na podlagi teh porazdelitev gradimo statistično sklepanje.'
      },
      mathProof: {
        summaryLatex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad E[X] = \\lambda, \\quad \\text{Var}(X) = \\lambda',
        steps: [
          {
            title: '1. Poissonova verjetnostna funkcija',
            latex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!} \\quad \\text{za } k \\in \\{0, 1, 2, \\dots\\}',
            explanation: 'Verjetnost natanko k dogodkov ob povprečni stopnji \\lambda.'
          },
          {
            title: '2. Enakost pričakovane vrednosti in variance',
            latex: 'E[X] = \\lambda, \\quad \\text{Var}(X) = E[X(X-1)] + E[X] - (E[X])^2 = \\lambda^2 + \\lambda - \\lambda^2 = \\lambda',
            explanation: 'Einstvena matematična lastnost: varianca je natanko enaka povprečju.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Poissonovih verjetnosti in porazdelitve dogodkov',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Povprečna stopnja dogodkov lambda = 4.4 (dnevne srčne kapi v NYC)
lam = 4.4

# Verjetnosti za 0, 1, ..., 8 dogodkov
k_vrednosti = np.arange(0, 9)
verjetnosti = stats.poisson.pmf(k_vrednosti, lam)

print("K | Verjetnost P(X = k)")
print("-" * 25)
for k, p in zip(k_vrednosti, verjetnosti):
    print(f"{k} | {p:.4f} ({p*100:.2f} %)")

print("-" * 25)
print(f"P(0 do 2 kapi na dan): {stats.poisson.cdf(2, lam):.4f}")
print(f"P(več kot 6 kapi na dan): {1 - stats.poisson.cdf(6, lam):.4f}")`,
        description: 'Izračunajte verjetnosti Poissonovega procesa za različna števila dogodkov.',
        runCode: (code: string) => {
          return {
            output: `K | Verjetnost P(X = k)\n-------------------------\n0 | 0.0123 (1.23 %)\n1 | 0.0540 (5.40 %)\n2 | 0.1188 (11.88 %)\n3 | 0.1743 (17.43 %)\n4 | 0.1917 (19.17 %)\n5 | 0.1687 (16.87 %)\n6 | 0.1237 (12.37 %)\n7 | 0.0778 (7.78 %)\n8 | 0.0428 (4.28 %)\n-------------------------\nP(0 do 2 kapi na dan): 0.1851\nP(več kot 6 kapi na dan): 0.1554`,
            metrics: { p_mode: 0.1917, p_low: 0.1851, p_high: 0.1554 }
          };
        }
      }
    }
  ]
};
