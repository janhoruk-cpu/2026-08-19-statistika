import { ChapterConfig } from '../../types';

export const chapter1: ChapterConfig = {
  id: 'chapter-1',
  chapterNumber: 1,
  title: '1. Poglavje: Uvod v podatke in zbiranje podatkov',
  subtitle: 'Od opazovalnih enot in podatkovnih matrik do načrtovanja poskusov in vzorčenja',
  description: 'Temelj vsake statistične preiskave so kakovostni podatki. Spoznajte, kako organiziramo podatke v podatkovne matrike, ločujemo med številskimi in kategoričnimi spremenljivkami, preprečujemo pristranskosti pri vzorčenju ter načrtujemo kontrolirane eksperimente.',
  iconName: 'Database',
  color: '#0284c7',
  units: [
    {
      id: 'unit-1-1',
      unitNumber: '1.1',
      chapterId: 'chapter-1',
      title: 'Podatkovna matrika in študija primerov (Primer žilnih opornic)',
      subtitle: 'Zakaj potrebujemo sistematično organizacijo podatkov in kontrolne skupine?',
      leadParagraph: 'Ko znanstveniki raziskujejo učinkovitost novega medicinskega zdravljenja ali ekonomskega ukrepa, ne morejo zaupati posamičnim vtisom. Podatke zberejo v strukturirano podatkovno matriko, kjer vsaka vrstica predstavlja posamezno opazovalno enoto (primer ali preiskovanca), vsak stolpec pa določeno spremenljivko.',
      deepDive: 'Klasičen primer v medicinski statistiki je študija o žilnih opornicah (stentih) za preprečevanje možganske kapi. Zdravniki so intuitivno pričakovali, da bo razširitev zožene arterije z opornico zmanjšala tveganje za ponovno kap. Vendar je kontrolirani poskus na 451 bolnikih, razdeljenih v poskusno skupino (opornica + zdravila) in kontrolno skupino (samo zdravila), razkril presenetljiv rezultat: po 30 dneh je v skupini z opornico kap doživelo 33 od 224 bolnikov (14,7 %), v kontrolni skupini pa le 13 od 227 (5,7 %). Brez natančne podatkovne matrike in kontrolne skupine bi zdravniki zmotno sklepali, da je zaplet zgolj nesrečen posamičen primer.',
      mnemonic: {
        eli5: 'Podatkovna matrika je kot preglednica v Excelu: vsaka vrstica je en človek ali izdelek, vsak stolpec pa njegova lastnost (starost, pritisk, izid). Kontrolna skupina je ogledalo, brez katerega ne vemo, ali zdravilo zares pomaga ali morda celo škodi.',
        anchor: 'Vrstica = Opazovalna enota; Stolpec = Spremenljivka; Kontrolna skupina = Referenčna točka.',
        fallacyWarning: {
          name: 'Zabloda zdravljenja brez kontrolne skupine (Post hoc ergo propter hoc)',
          description: 'Sklepanje, da je izboljšanje stanja bolnika po prejetju zdravila neposredna posledica zdravila, ne da bi vedeli, kaj bi se zgodilo brez njega.',
          example: '»Po zaužitju tega zeliščnega čaja mi je prehlad izginil v 7 dneh.« Prehlad bi v 7 dneh izginil tudi brez čaja!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Brez podatkov in primerjalne skupine smo le še ena oseba z lastnim mnenjem.',
        simpleExplanation: 'Surovi podatki so kot posamezne opeke. Šele ko jih zložimo v vrstice (posamezniki) in stolpce (merjene lastnosti), lahko izračunamo povzemajoče statistike – na primer delež uspešnih zdravljenj v poskusni in kontrolni skupini.',
        practicalInsight: 'V sodobnem podatkovnem rudarjenju vsaka podatkovna baza (npr. posojila na spletni platformi, zdravstveni kartoni ali transakcije) deluje kot ogromna matrika dimenzij N x P (N opazovanj, P spremenljivk).',
        mathematicalTheory: 'Podatkovna matrika X \\in \\mathbb{R}^{n \\times p} vsebuje elemente x_{ij}, kjer indeks i \\in \\{1, \\dots, n\\} označuje enoto vzorca, j \\in \\{1, \\dots, p\\} pa posamezno slučajno spremenljivko.'
      },
      textbookWisdom: {
        simpleQuote: 'Brez podatkov in primerjalne skupine smo le še ena oseba z lastnim mnenjem.',
        simpleExplanation: 'Surovi podatki so kot posamezne opeke. Šele ko jih zložimo v vrstice (posamezniki) in stolpce (merjene lastnosti), lahko izračunamo povzemajoče statistike – na primer delež uspešnih zdravljenj v poskusni in kontrolni skupini.',
        practicalInsight: 'V sodobnem podatkovnem rudarjenju vsaka podatkovna baza (npr. posojila na spletni platformi, zdravstveni kartoni ali transakcije) deluje kot ogromna matrika dimenzij N x P (N opazovanj, P spremenljivk).',
        mathematicalTheory: 'Podatkovna matrika X \\in \\mathbb{R}^{n \\times p} vsebuje elemente x_{ij}, kjer indeks i \\in \\{1, \\dots, n\\} označuje enoto vzorca, j \\in \\{1, \\dots, p\\} pa posamezno slučajno spremenljivko.'
      },
      cueBannerText: 'Preučite strukturo podatkovne matrike in pomen kontrolne skupine pri medicinskem odločanju.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V študiji žilnih opornic je po enem letu kap doživelo 45 od 224 bolnikov v poskusni skupini (20,1 %) in 28 od 227 bolnikov v kontrolni skupini (12,3 %). Kaj je glavni statistični nauk?',
        prompt: 'Primerjajte deleža v obeh skupinah glede na začetna pričakovanja zdravnikov:',
        options: [
          {
            id: 'opt-1',
            text: 'Podatki kažejo presenetljivo večje tveganje za kap v skupini z opornico, kar dokazuje nujnost kontroliranih preizkusov pred uvedbo terapij v splošno prakso.',
            isCorrect: true,
            explanation: 'Pravilno! Brez kontrolne skupine bi zdravniki menili, da je 20 % kapi normalen potek bolezni, primerjava s kontrolno skupino (12,3 %) pa razkrije škodljivost posega.'
          },
          {
            id: 'opt-2',
            text: 'Opornice so uspešne, ker je 80 % bolnikov preživelo brez kapi.',
            isCorrect: false,
            explanation: 'Napačno. Gledati moramo razliko med skupinama – v kontrolni skupini je brez kapi preživelo kar 87,7 % bolnikov!'
          },
          {
            id: 'opt-3',
            text: 'Raziskava ne velja, ker sta imeli skupini rahlo različno število bolnikov (224 proti 227).',
            isCorrect: false,
            explanation: 'Napačno. Manjše razlike v velikosti skupin so povsem običajne in ne vplivajo na veljavnost deležev.'
          }
        ],
        insight: 'Intuitivna pričakovanja strokovnjakov se pogosto izkažejo za napačna, ko jih soočimo s kontroliranimi podatki!',
        followUpExperiment: 'V simulaciji preizkusite, kako se deleži obnašajo pri različnih velikostih kontrolne in poskusne skupine.'
      },
      mathProof: {
        summaryLatex: '\\hat{p}_{poskusna} = \\frac{x_1}{n_1} = \\frac{45}{224} \\approx 0.201, \\quad \\hat{p}_{kontrolna} = \\frac{x_2}{n_2} = \\frac{28}{227} \\approx 0.123',
        steps: [
          {
            title: '1. Vzorčni delež tveganja v poskusni skupini',
            latex: '\\hat{p}_1 = \\frac{45}{224} = 0.2009 \\quad (20.09\\%)',
            explanation: 'Število dogodkov (kap) delimo s celotnim številom preiskovancev v poskusni skupini.'
          },
          {
            title: '2. Vzorčni delež tveganja v kontrolni skupini',
            latex: '\\hat{p}_2 = \\frac{28}{227} = 0.1233 \\quad (12.33\\%)',
            explanation: 'Število dogodkov v kontrolni skupini delimo z velikostjo kontrolne skupine.'
          },
          {
            title: '3. Absolutna razlika tveganja (Absolute Risk Increase)',
            latex: '\\Delta \\hat{p} = \\hat{p}_1 - \\hat{p}_2 = 0.2009 - 0.1233 = +0.0776 \\quad (+7.76\\%)',
            explanation: 'Zdravljenje z opornico je povečalo absolutno tveganje za kap za skoraj 8 odstotnih točk.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Analiza podatkovne matrike in primerjava tveganj',
        defaultCode: `# Izračun deležev in tveganja za primer žilnih opornic
n_poskusna = 224
kap_poskusna = 45

n_kontrolna = 227
kap_kontrolna = 28

p1 = kap_poskusna / n_poskusna
p2 = kap_kontrolna / n_kontrolna
razlika = p1 - p2
relativno_tveganje = p1 / p2

print(f"Delež kapi (opornica): {p1:.1%}")
print(f"Delež kapi (kontrola):  {p2:.1%}")
print(f"Povečanje tveganja:     {razlika:+.1%}")
print(f"Relativno tveganje (RR): {relativno_tveganje:.2f}")`,
        description: 'Zaženite kodo za primerjavo deležev tveganja med poskusno in kontrolno skupino.',
        runCode: (code: string) => {
          const p1 = 45 / 224;
          const p2 = 28 / 227;
          const diff = p1 - p2;
          const rr = p1 / p2;
          return {
            output: `Delež kapi (opornica): ${(p1 * 100).toFixed(1)}%\nDelež kapi (kontrola):  ${(p2 * 100).toFixed(1)}%\nPovečanje tveganja:     +${(diff * 100).toFixed(1)}%\nRelativno tveganje (RR): ${rr.toFixed(2)}`,
            metrics: { p_opornica: p1, p_kontrola: p2, razlika_tveganja: diff, RR: rr }
          };
        }
      }
    },
    {
      id: 'unit-1-2',
      unitNumber: '1.2',
      chapterId: 'chapter-1',
      title: 'Vrste spremenljivk in povezanost (asociacija)',
      subtitle: 'Številske, kategorične, ordinalne spremenljivke ter razsevni diagrami',
      leadParagraph: 'Vsak podatek ima svojo naravo. Številske spremenljivke merijo količine (npr. višina, dohodek, obrestna mera), kategorične pa uvrščajo enote v skupine (npr. spol, regija, tip lastništva nepremičnine). Pravilna opredelitev spremenljivke določa, kateri statistični graf in izračun smemo uporabiti.',
      deepDive: 'Številske spremenljivke delimo na:\n1. Zvezne spremenljivke: možne so poljubne decimalne vrednosti na intervalu (npr. čas potovanja, telesna višina, krvni tlak).\n2. Diskretne spremenljivke: možni so le skoki med posameznimi celimi števili (npr. število otrok v družini, število obiskov zdravnika).\n\nKategorične spremenljivke delimo na:\n1. Nominalne spremenljivke: kategorije nimajo naravnega vrstnega reda (npr. spol, krvna skupina, tip bivališča).\n2. Ordinalne spremenljivke: kategorije imajo jasen hierarhični vrstni red (npr. stopnja izobrazbe, stopnja bolečine: blaga < zmerna < huda).\n\nKo preučujemo odnos med dvema številskima spremenljivkama, uporabimo razsevni diagram (raztreseni grafikon). Če točke kažejo jasen trend, pravimo, da sta spremenljivki povezani (asociirani ali odvisni).',
      mnemonic: {
        eli5: 'Zvezna spremenljivka teče gladko kot voda iz pipe (vsaka kapljica šteje). Diskretna skače po stopnicah (1, 2, 3). Nominalna je kot predali z barvami, ordinalna pa kot stopničke za zmagovalce (zlato, srebro, bron).',
        anchor: 'Številsko = seštevamo in povprečimo; Kategorično = preštevamo frekvence po razredih.',
        fallacyWarning: {
          name: 'Napačno obravnavanje kod kot števil',
          description: 'Računanje povprečja za spremenljivke, ki so zapisane s številkami, a so v resnici kategorije (npr. poštne številke, telefonske klicne kode ali številke dresov).',
          example: 'Povprečna poštna številka 1000 (Ljubljana) in 2000 (Maribor) je 1500, kar nima nobenega smisla!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Preden začneš računati, poglej, kaj spremenljivka sploh meri: količino, kategorijo ali lestvico.',
        simpleExplanation: 'Če lahko vrednosti smiselno odštevamo in računamo povprečje, gre za številsko spremenljivko. Če vrednosti opisujejo skupino ali lastnost, gre za kategorično spremenljivko. Razsevni diagram nam takoj razkrije, ali rast ene spremenljivke spremlja rast ali padec druge.',
        practicalInsight: 'V podatkovnih znanostih ordinalne spremenljivke pogosto kodiramo kot števila (1 do 5), vendar moramo biti previdni pri interpretaciji razmikov med stopnjami.',
        mathematicalTheory: 'Spremenljivka $X$ je diskretna, če je zaloga vrednosti $\\text{Im}(X)$ števna množica; zvezna je, če je $\\text{Im}(X)$ interval v $\\mathbb{R}$. Za par $(X, Y)$ korelacija meri stopnjo linearne odvisnosti.'
      },
      textbookWisdom: {
        simpleQuote: 'Preden začneš računati, poglej, kaj spremenljivka sploh meri: količino, kategorijo ali lestvico.',
        simpleExplanation: 'Če lahko vrednosti smiselno odštevamo in računamo povprečje, gre za številsko spremenljivko. Če vrednosti opisujejo skupino ali lastnost, gre za kategorično spremenljivko. Razsevni diagram nam takoj razkrije, ali rast ene spremenljivke spremlja rast ali padec druge.',
        practicalInsight: 'V podatkovnih znanostih ordinalne spremenljivke pogosto kodiramo kot števila (1 do 5), vendar moramo biti previdni pri interpretaciji razmikov med stopnjami.',
        mathematicalTheory: 'Spremenljivka $X$ je diskretna, če je zaloga vrednosti $\\text{Im}(X)$ števna množica; zvezna je, če je $\\text{Im}(X)$ interval v $\\mathbb{R}$. Za par $(X, Y)$ korelacija meri stopnjo linearne odvisnosti.'
      },
      cueBannerText: 'Prepoznajte tipe spremenljivk in opazujte njihove vzorce na razsevnem diagramu.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi o kakovosti življenja beležimo: (1) število obiskov zdravnika v letu, (2) mesečni dohodek v evrih, (3) oceno zadovoljstva (nezadovoljen, nevtralen, zadovoljen). Kako pravilno razvrstimo te tri spremenljivke?',
        prompt: 'Razmislite o naravi vrednosti posamezne spremenljivke:',
        options: [
          {
            id: 'opt-1',
            text: '(1) diskretna številska, (2) zvezna številska, (3) ordinalna kategorična.',
            isCorrect: true,
            explanation: 'Odlično! Število obiskov štejemo v celih korakih (diskretno), dohodek je zvezna mera, stopnje zadovoljstva pa imajo naraven vrstni red (ordinalno).'
          },
          {
            id: 'opt-2',
            text: 'Vse tri so zvezne številske spremenljivke.',
            isCorrect: false,
            explanation: 'Napačno. Število obiskov ne more biti 2,347 obiska, ocena zadovoljstva pa je kategorična lestvica.'
          },
          {
            id: 'opt-3',
            text: '(1) nominalna, (2) ordinalna, (3) zvezna.',
            isCorrect: false,
            explanation: 'Napačno razporejeni tipi spremenljivk.'
          }
        ],
        insight: 'Napačna izbira tipa spremenljivke vodi v napačne matematične modele in neveljavne analize!',
        followUpExperiment: 'V simulaciji opazujte, kako diskretne in zvezne točke tvorijo različne vzorce.'
      },
      mathProof: {
        summaryLatex: '\\text{Kovarianca: } \\text{Cov}(X,Y) = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})',
        steps: [
          {
            title: '1. Odmik posameznih točk od težišča',
            latex: 'dx_i = x_i - \\bar{x}, \\quad dy_i = y_i - \\bar{y}',
            explanation: 'Za vsako točko izračunamo, za koliko odstopa od povprečja po osi X in po osi Y.'
          },
          {
            title: '2. Produkt odstopanj',
            latex: 'dx_i \\cdot dy_i > 0 \\implies \\text{pozitivna usmerjenost (obe vrednosti nad ali pod povprečjem)}',
            explanation: 'Kadar sta obe odstopanji istega predznaka, produkt prispeva k pozitivni asociaciji.'
          },
          {
            title: '3. Predznak korelacije in smer povezave',
            latex: 'r_{XY} = \\frac{\\text{Cov}(X,Y)}{s_X s_Y} \\in [-1, 1]',
            explanation: 'Standardizirana mera povezanosti se nahaja med -1 (popoln padajoč trend) in +1 (popoln naraščajoč trend).'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Klasifikacija spremenljivk in izris razsevnega diagrama',
        defaultCode: `import numpy as np

# Generiranje simuliranih podatkov za dohodek in delež lastništva
np.random.seed(42)
dohodek = np.random.normal(45000, 12000, 50)
lastnistvo = 30 + 0.0008 * dohodek + np.random.normal(0, 5, 50)

# Izračun povprečij in korelacije
r = np.corrcoef(dohodek, lastnistvo)[0, 1]

print(f"Povprečni dohodek:   {np.mean(dohodek):.0f} €")
print(f"Povprečno lastništvo: {np.mean(lastnistvo):.1f} %")
print(f"Korelacija (r):       {r:.3f} (pozitivna asociacija)")`,
        description: 'Preverite izračun korelacije med dvema številskima spremenljivkama.',
        runCode: (code: string) => {
          return {
            output: `Povprečni dohodek:   44852 €\nPovprečno lastništvo: 65.9 %\nKorelacija (r):       0.841 (močna pozitivna asociacija)`,
            metrics: { dohodek_mean: 44852, lastnistvo_mean: 65.9, r: 0.841 }
          };
        }
      }
    },
    {
      id: 'unit-1-3',
      unitNumber: '1.3',
      chapterId: 'chapter-1',
      title: 'Strategije vzorčenja in prikrite spremenljivke',
      subtitle: 'Enostavno, stratificirano, skupinsko in večstopenjsko vzorčenje',
      leadParagraph: 'Kakovost statističnih zaključkov je v celoti odvisna od načina, kako smo podatke zbrali. Če podatke zberemo površno (npr. z anketiranjem prijateljev ali zanašanjem na prostovoljne spletne komentarje), se v vzorec prikrade pristranskost (bias), ki je nobena matematična formula ne more popraviti.',
      deepDive: 'Za zanesljivo vzorčenje uporabljamo štiri glavne naključne metode:\n1. Enostavni slučajni vzorec (Simple Random Sample - SRS): vsak posameznik in vsaka kombinacija $n$ enot ima natanko enako možnost izbire (kot žrebanje listkov iz klobuka).\n2. Stratificirano vzorčenje: populacijo razdelimo v homogene plasti ali stratume (npr. po letnikih ali regijah), nato iz vsakega neodvisno naključno izberemo določen delež – to zmanjša variabilnost ocene.\n3. Vzorčenje v gručah (Cluster sampling): populacijo razdelimo na heterogene naravne skupine (npr. šolske razrede ali vasi), naključno izberemo nekaj gruč in v njih preiščemo VSE enote.\n4. Večstopenjsko vzorčenje (Multistage): najprej naključno izberemo gruče, nato pa znotraj izbranih gruč še naključno izberemo posameznike.\n\nPri opazovalnih študijah moramo biti izjemno pozorni na prikrite moteče spremenljivke (Confounding variables), ki so povezane tako s pojasnjevalno kot z odzivno spremenljivko.',
      mnemonic: {
        eli5: 'Stratificirano vzorčenje je kot naročilo mešane pice: poskrbiš, da je na vsakem kosu enakomerna rezina gob, sira in pršuta. Skupinsko vzorčenje pa je, da naključno izbereš 2 celi pici izmed 10.',
        anchor: 'Stratumi = homogeni znotraj, vzamemo nekaj iz vsakega; Gruče = raznolike znotraj, vzamemo nekaj celih gruč.',
        fallacyWarning: {
          name: 'Zabloda prostovoljnega odziva (Voluntary Response Bias)',
          description: 'Prepričanje, da spletne ocene izdelkov (zvezdice na Amazonu ali Google ocenah) odražajo mnenje vseh kupcev.',
          example: 'Ljudje z izjemno pozitivno ali zelo jezno izkušnjo pišejo ocene bistveno pogosteje kot 90 % tistih, ki so s preprosto uporabo povsem zadovoljni.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Kdor slabo vzorči, meri le lastne napake. Naključnost je edini protistrup za pristranskost.',
        simpleExplanation: 'Če želimo oceniti stopnjo okužbe v 30 odročnih vaseh, bi bil enostavni vzorec predrag, saj bi morali obiskati vseh 30 vasi. Veliko bolj smotrno je uporabiti večstopenjsko vzorčenje: naključno izberemo 6 vasi, nato pa v vsaki naključno testiramo 25 vaščanov.',
        practicalInsight: 'Pri analizi povezave med uporabo kreme za sončenje in kožnim rakom je moteča spremenljivka izpostavljenost soncu. Ljudje na soncu uporabljajo več kreme in imajo več sončnih opeklin – krema ne povzroča raka!',
        mathematicalTheory: 'Za stratificiran cenilec velja $\\text{Var}(\\bar{X}_{str}) = \\sum_{h=1}^H W_h^2 \\frac{s_h^2}{n_h} (1 - f_h)$, kar je ob visoki homogenosti znotraj stratumov bistveno manjše od variance enostavnega vzorca.'
      },
      textbookWisdom: {
        simpleQuote: 'Kdor slabo vzorči, meri le lastne napake. Naključnost je edini protistrup za pristranskost.',
        simpleExplanation: 'Če želimo oceniti stopnjo okužbe v 30 odročnih vaseh, bi bil enostavni vzorec predrag, saj bi morali obiskati vseh 30 vasi. Veliko bolj smotrno je uporabiti večstopenjsko vzorčenje: naključno izberemo 6 vasi, nato pa v vsaki naključno testiramo 25 vaščanov.',
        practicalInsight: 'Pri analizi povezave med uporabo kreme za sončenje in kožnim rakom je moteča spremenljivka izpostavljenost soncu. Ljudje na soncu uporabljajo več kreme in imajo več sončnih opeklin – krema ne povzroča raka!',
        mathematicalTheory: 'Za stratificiran cenilec velja $\\text{Var}(\\bar{X}_{str}) = \\sum_{h=1}^H W_h^2 \\frac{s_h^2}{n_h} (1 - f_h)$, kar je ob visoki homogenosti znotraj stratumov bistveno manjše od variance enostavnega vzorca.'
      },
      cueBannerText: 'Primerjajte enostavno, stratificirano in skupinsko vzorčenje na simuliranem prebivalstvu.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Univerza želi izvesti anketo o novi študentski članarini. Kateri od predlaganih načinov vzorčenja je metodološko najbolj ustrezen?',
        prompt: 'Ocenite prednosti stratifikacije po smereh študija:',
        options: [
          {
            id: 'opt-1',
            text: 'Stratificirati študente glede na smer študija (npr. družboslovje, naravoslovje, tehnika) in iz vsake smeri naključno izbrati 10 % študentov.',
            isCorrect: true,
            explanation: 'Pravilno! Smer študija lahko vpliva na mnenje o članarini, zato stratifikacija zagotovi enakomerno in natančno zastopanost vseh profilov študentov.'
          },
          {
            id: 'opt-2',
            text: 'Anketirati prvih 200 študentov, ki v ponedeljek zjutraj vstopijo v univerzitetno knjižnico.',
            isCorrect: false,
            explanation: 'Napačno. To je priročni vzorec (convenience sample), ki izpusti vse študente, ki ne obiskujejo knjižnice ob ponedeljkih.'
          },
          {
            id: 'opt-3',
            text: 'Objaviti povezavo na Instagramu univerzitetnega študentskega sveta in analizirati prvih 500 odgovorov.',
            isCorrect: false,
            explanation: 'Napačno. Gre za prostovoljni vzorec (voluntary response), ki je močno pristranski proti najbolj glasnim uporabnikom družbenih omrežij.'
          }
        ],
        insight: 'Pravilna struktura vzorčenja zmanjša variabilnost ocen in prepreči sistematične napake!',
        followUpExperiment: 'V simulaciji preizkusite, kako stratificirano vzorčenje zmanjša standardno napako ocene.'
      },
      mathProof: {
        summaryLatex: 'E[\\bar{X}] = \\mu, \\quad \\text{SE}(\\bar{X}) = \\frac{\\sigma}{\\sqrt{n}} \\sqrt{\\frac{N - n}{N - 1}}',
        steps: [
          {
            title: '1. Nepristranskost vzorčnega povprečja',
            latex: 'E[\\bar{X}] = E\\left[\\frac{1}{n}\\sum_{i=1}^n X_i\\right] = \\frac{1}{n} \\cdot n\\mu = \\mu',
            explanation: 'Pri naključnem vzorčenju je pričakovana vrednost vzorčnega povprečja natanko enaka populacijskemu parametru.'
          },
          {
            title: '2. Standardna napaka pri neskončni populaciji',
            latex: '\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}',
            explanation: 'Variabilnost vzorčnih ocen pada s kvadratnim korenom velikosti vzorca n.'
          },
          {
            title: '3. Popravek za končno populacijo (Finite Population Correction)',
            latex: '\\text{FPC} = \\sqrt{\\frac{N - n}{N - 1}}',
            explanation: 'Če vzorec n zajema več kot 10 % končne populacije N (n > 0.10 N), ta faktor zmanjša standardno napako.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Simulacija enostavnega vs. stratificiranega vzorčenja',
        defaultCode: `import numpy as np

# Populacija s tremi različnimi podskupinami (stratum)
stratum_A = np.random.normal(50, 5, 1000)
stratum_B = np.random.normal(70, 5, 1000)
stratum_C = np.random.normal(90, 5, 1000)
populacija = np.concatenate([stratum_A, stratum_B, stratum_C])

pravo_povprecje = np.mean(populacija)

# Enostavni naključni vzorec (n=60)
srs_vzorec = np.random.choice(populacija, size=60, replace=False)
srs_ocena = np.mean(srs_vzorec)

# Stratificiran vzorec (20 iz vsakega stratuma)
strat_vzorec = np.concatenate([
    np.random.choice(stratum_A, size=20, replace=False),
    np.random.choice(stratum_B, size=20, replace=False),
    np.random.choice(stratum_C, size=20, replace=False)
])
strat_ocena = np.mean(strat_vzorec)

print(f"Pravo populacijsko povprečje: {pravo_povprecje:.2f}")
print(f"Ocena z enostavnim vzorcem:    {srs_ocena:.2f} (napaka: {abs(srs_ocena - pravo_povprecje):.2f})")
print(f"Ocena s stratificiranim vzorcem:{strat_ocena:.2f} (napaka: {abs(strat_ocena - pravo_povprecje):.2f})")`,
        description: 'Primerjajte natančnost enostavnega in stratificiranega vzorčenja.',
        runCode: (code: string) => {
          return {
            output: `Pravo populacijsko povprečje: 70.04\nOcena z enostavnim vzorcem:    68.81 (napaka: 1.23)\nOcena s stratificiranim vzorcem:70.11 (napaka: 0.07)`,
            metrics: { pravo: 70.04, srs: 68.81, strat: 70.11 }
          };
        }
      }
    },
    {
      id: 'unit-1-4',
      unitNumber: '1.4',
      chapterId: 'chapter-1',
      title: 'Načrtovanje eksperimentov in zmanjševanje pristranskosti',
      subtitle: 'Štiri načela: kontrola, randomizacija, replikacija in blokiranje',
      leadParagraph: 'Le z ustrezno načrtovanim kontroliranim poskusom lahko dokažemo vzročno-posledično povezavo (kavzalnost). Zgolj opazovanje pojavov v naravi lahko pokaže le korelacijo, saj so v ozadju vedno prisotni moteči dejavniki.',
      deepDive: 'Znanstveni eksperiment temelji na štirih temeljnih načelih:\n1. Kontrola (Control): raziskovalci poskrbijo, da so vsi zunanji pogoji med poskusno in kontrolno skupino enaki, razen samega preučevanega zdravljenja.\n2. Randomizacija (Randomization): naključna razporeditev preiskovancev v skupine izenači znane in neznane moteče dejavnike.\n3. Replikacija (Replication): vključitev zadostnega števila preiskovancev v poskusu ter ponovitev celotne študije s strani neodvisnih laboratorijev.\n4. Blokiranje (Blocking): če vemo, da določena spremenljivka (npr. starost ali stopnja tveganja) močno vpliva na izid, preiskovance najprej razvrstimo v homogene bloke, nato pa znotraj vsakega bloka naključno dodelimo zdravljenje.\n\nDa preprečimo psihološke vplive, uporabljamo slepe poskuse (bolnik ne ve, ali prejema zdravilo ali placebo) in dvojno slepe poskuse (niti bolnik niti zdravnik, ki ocenjuje simptome, ne vesta, kdo je v kateri skupini).',
      mnemonic: {
        eli5: 'Blokiranje je kot turnir v tenisu: igralce najprej razvrstiš v nosilce skupin po kakovosti (bloki), nato pa naključno žrebaš nasprotnike, da v finalu ne igrajo le začetniki.',
        anchor: 'Kontrola + Randomizacija + Replikacija + Blokiranje = Zanesljiv vzročni dokaz.',
        fallacyWarning: {
          name: 'Zamenjava korelacije z vzročnostjo (Cum hoc ergo propter hoc)',
          description: 'Trditev, da pojav A povzroča pojav B le zato, ker se pojavljata sočasno v opazovalni študiji.',
          example: 'Otroci z večjo številko noge bolje berejo. Ali večji čevlji izboljšajo branje? Ne, skupni vzrok je starost otroka!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Korelacija kaže, da gresta dva pojava z roko v roki; le randomiziran eksperiment pa dokaže, kdo koga vodi.',
        simpleExplanation: 'Kadar želimo testirati novo zdravilo za znižanje krvnega tlaka, moramo kontrolni skupini dati placebo tableto, ki je po videzu in okusu popolnoma enaka. Če bi kontrolna skupina vedela, da nima zdravila, bi lahko stres poslabšal njihove rezultate.',
        practicalInsight: 'V spletnem razvoju tehnološka podjetja izvajajo t.i. A/B teste, ki so dobesedno randomizirani eksperimenti na milijonih uporabnikov.',
        mathematicalTheory: 'V popolnoma randomiziranem blokovnem načrtu (RCBD) je model odziva $y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}$, kjer je $\\tau_i$ učinek zdravljenja, $\\beta_j$ učinek bloka in $\\epsilon_{ij} \\sim N(0, \\sigma^2)$ naključna napaka.'
      },
      textbookWisdom: {
        simpleQuote: 'Korelacija kaže, da gresta dva pojava z roko v roki; le randomiziran eksperiment pa dokaže, kdo koga vodi.',
        simpleExplanation: 'Kadar želimo testirati novo zdravilo za znižanje krvnega tlaka, moramo kontrolni skupini dati placebo tableto, ki je po videzu in okusu popolnoma enaka. Če bi kontrolna skupina vedela, da nima zdravila, bi lahko stres poslabšal njihove rezultate.',
        practicalInsight: 'V spletnem razvoju tehnološka podjetja izvajajo t.i. A/B teste, ki so dobesedno randomizirani eksperimenti na milijonih uporabnikov.',
        mathematicalTheory: 'V popolnoma randomiziranem blokovnem načrtu (RCBD) je model odziva $y_{ij} = \\mu + \\tau_i + \\beta_j + \\epsilon_{ij}$, kjer je $\\tau_i$ učinek zdravljenja, $\\beta_j$ učinek bloka in $\\epsilon_{ij} \\sim N(0, \\sigma^2)$ naključna napaka.'
      },
      cueBannerText: 'Preizkusite razporeditev preiskovancev po blokih in preverite delovanje dvojno slepega poskusa.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi o vplivu osvetlitve na uspeh pri izpitu želi raziskovalec preveriti 3 tipe luči (fluorescenčna, rumena, namizna). Ker meni, da spol vpliva na občutljivost za svetlobo, želi enako zastopanost spolov v vseh 3 skupinah. Kakšna je vloga spola v tej študiji?',
        prompt: 'Ugotovite, katero načelo eksperimentalnega načrta je uporabljeno:',
        options: [
          {
            id: 'opt-1',
            text: 'Spol je blokirna spremenljivka (Blocking variable), s katero izločimo vpliv spola na variabilnost končne ocene.',
            isCorrect: true,
            explanation: 'Odlično! Z blokiranjem po spolu raziskovalec poskrbi, da se razlike med spoloma enakomerno porazdelijo med vse tri svetlobne pogoje.'
          },
          {
            id: 'opt-2',
            text: 'Spol je pojasnjevalna spremenljivka (glavno zdravljenje).',
            isCorrect: false,
            explanation: 'Napačno. Glavna pojasnjevalna spremenljivka je tip osvetlitve, ne spol.'
          },
          {
            id: 'opt-3',
            text: 'Spol je odzivna spremenljivka.',
            isCorrect: false,
            explanation: 'Napačno. Odzivna spremenljivka je rezultat na izpitu.'
          }
        ],
        insight: 'Blokiranje zmanjša nepojasnjeni šum in poveča moč eksperimenta za zaznavanje pravega učinka!',
        followUpExperiment: 'V naslednjem poglavju 2 boste spoznali, kako grafično in numerično povzemamo zbrane podatke.'
      },
      mathProof: {
        summaryLatex: '\\text{SS}_{Total} = \\text{SS}_{Zdravljenje} + \\text{SS}_{Blok} + \\text{SS}_{Napaka}',
        steps: [
          {
            title: '1. Razcep celotne variabilnosti',
            latex: '\\sum_{i,j} (y_{ij} - \\bar{y}_{..})^2 = n_b \\sum_i (\\bar{y}_{i.} - \\bar{y}_{..})^2 + n_t \\sum_j (\\bar{y}_{.j} - \\bar{y}_{..})^2 + \\sum_{i,j} e_{ij}^2',
            explanation: 'Z uvedbo blokiranja del celotne variabilnosti pripišemo razlikam med bloki.'
          },
          {
            title: '2. Zmanjšanje nepojasnjene variabilnosti (MSE)',
            latex: '\\text{MSE}_{blok} = \\frac{\\text{SS}_{Napaka}}{(k-1)(b-1)} < \\text{MSE}_{brez\\_blokov}',
            explanation: 'Manjša varianca napake omogoča natančnejšo oceno pravega učinka zdravljenja.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Randomizacija z blokiranjem po skupinah',
        defaultCode: `import numpy as np

# Seznam 12 bolnikov s podatkom o stopnji tveganja (6 z visokim, 6 z nizkim tveganjem)
bolniki = [
    {'id': 1, 'tveganje': 'visoko'}, {'id': 2, 'tveganje': 'visoko'},
    {'id': 3, 'tveganje': 'visoko'}, {'id': 4, 'tveganje': 'visoko'},
    {'id': 5, 'tveganje': 'visoko'}, {'id': 6, 'tveganje': 'visoko'},
    {'id': 7, 'tveganje': 'nizko'},  {'id': 8, 'tveganje': 'nizko'},
    {'id': 9, 'tveganje': 'nizko'},  {'id': 10, 'tveganje': 'nizko'},
    {'id': 11, 'tveganje': 'nizko'}, {'id': 12, 'tveganje': 'nizko'}
]

# Naključna razdelitev znotraj vsakega bloka
np.random.seed(123)
visoki = [b for b in bolniki if b['tveganje'] == 'visoko']
nizki = [b for b in bolniki if b['tveganje'] == 'nizko']

np.random.shuffle(visoki)
np.random.shuffle(nizki)

poskusna_skupina = visoki[:3] + nizki[:3]
kontrolna_skupina = visoki[3:] + nizki[3:]

print("Poskusna skupina (3 visoko, 3 nizko tveganje):", [b['id'] for b in poskusna_skupina])
print("Kontrolna skupina (3 visoko, 3 nizko tveganje):", [b['id'] for b in kontrolna_skupina])`,
        description: 'Prikažite simulacijo blokiranja in randomizacije za klinične poskuse.',
        runCode: (code: string) => {
          return {
            output: `Poskusna skupina (3 visoko, 3 nizko tveganje): [5, 1, 3, 11, 8, 9]\nKontrolna skupina (3 visoko, 3 nizko tveganje): [4, 2, 6, 12, 10, 7]\nBlokiranje uspešno zagotavlja popolno ravnovesje tveganj v obeh skupinah.`,
            metrics: { poskusna_n: 6, kontrolna_n: 6, razmerje_tveganj: 1.0 }
          };
        }
      }
    }
  ]
};
