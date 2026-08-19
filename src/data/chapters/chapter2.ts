import { ChapterConfig } from '../../types';

export const chapter2: ChapterConfig = {
  id: 'chapter-2',
  chapterNumber: 2,
  title: '2. Poglavje: Povzemanje in vizualizacija podatkov',
  subtitle: 'Od histogramov in škatel z brki do robustnih mer in simulacijskega testiranja hipotez',
  description: 'Kako iz surovih številk izluščiti bistvo: odkrijte mere sredine in razpršenosti, prepoznajte asimetrijo porazdelitev, obvladajte kontingenčne tabele in mozaične diagrame ter preučite prvi randomizacijski test na primeru cepiva proti malariji.',
  iconName: 'BarChart2',
  color: '#4f46e5',
  units: [
    {
      id: 'unit-2-1',
      unitNumber: '2.1',
      chapterId: 'chapter-2',
      title: 'Pregled številskih podatkov: Povprečje, histogrami in oblika',
      subtitle: 'Točkovni diagrami, težišče podatkov, simetrija in modalnost',
      leadParagraph: 'Ko imamo opravka z večjimi nizi številskih podatkov (npr. obrestne mere posojil, dohodki ali potovalni časi), posameznih številk ne moremo več pregledovati ročno. Podatke razvrstimo v razrede (bine) in izrišemo histogram, ki nam razkrije gostoto in obliko porazdelitve.',
      deepDive: 'Aritmetično povprečje (oznaka \\bar{x}) predstavlja fizikalno težišče podatkov. Če bi vsako točko postavili kot utež na prevesico, bi bila prevesica v ravnovesju ravno v povprečju. Vendar pa oblika porazdelitve pogosto ni simetrična: kadar imajo podatki dolg rep proti visokim vrednostim (kot pri dohodkih ali cenah nepremičnin), pravimo, da je porazdelitev desno asimetrična (angl. right skewed). Kadar se podatki raztezajo proti nizkim vrednostim, je levo asimetrična. Poleg asimetrije opazujemo še modalnost: unimodalne porazdelitve imajo en izrazit vrh, bimodalne dva (npr. višine odraslih in otrok skupaj), multimodalne pa več vrhov.',
      mnemonic: {
        eli5: 'Predstavljaj si dinozavra: rep mu določa asimetrijo. Če ima dolg rep na desni strani, je porazdelitev desno asimetrična (večina telesa je levo). Povprečje je točka, kjer bi dinozavra lahko uravnovesil na enem prstu.',
        anchor: 'Asimetrija sledi dolgemu repu (kjer so redki ekstremi). Povprečje je težišče prevesice.',
        fallacyWarning: {
          name: 'Zanašanje na povprečje pri močno asimetričnih podatkih',
          description: 'Uporaba aritmetičnega povprečja za opis »tipičnega« posameznika pri porazdelitvah z ekstremnimi vrednostmi.',
          example: 'Če v sobo z 9 brezposelnimi vstopi milijarder, povprečni dohodek v sobi poskoči na 100 milijonov evrov, čeprav 90 % ljudi nima niti za kavo!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Glej obliko porazdelitve in njen rep, preden slepo zaupaš eni sami številki.',
        simpleExplanation: 'Histogram nam pokaže, kje se gnete največ podatkov (visoki stolpci) in kje so osamljeni primeri. Če so podatki razdeljeni v različno velike skupine (npr. prebivalci po občinah), moramo namesto navadnega povprečja izračunati uteženo povprečje.',
        practicalInsight: 'Pri analizi dohodkov v državi ali obiskov spletnih strani so podatki skoraj vedno močno desno asimetrični, zato profesionalni analitiki vedno preverijo obliko porazdelitve.',
        mathematicalTheory: 'Aritmetično povprečje: \\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i. Uteženo povprečje: \\bar{x}_w = \\frac{\\sum w_i x_i}{\\sum w_i}. Koeficient asimetrije (Skewness): \\gamma_1 = \\frac{1}{n} \\sum \\left(\\frac{x_i - \\bar{x}}{s}\\right)^3.'
      },
      textbookWisdom: {
        simpleQuote: 'Glej obliko porazdelitve in njen rep, preden slepo zaupaš eni sami številki.',
        simpleExplanation: 'Histogram nam pokaže, kje se gnete največ podatkov (visoki stolpci) in kje so osamljeni primeri. Če so podatki razdeljeni v različno velike skupine (npr. prebivalci po občinah), moramo namesto navadnega povprečja izračunati uteženo povprečje.',
        practicalInsight: 'Pri analizi dohodkov v državi ali obiskov spletnih strani so podatki skoraj vedno močno desno asimetrični, zato profesionalni analitiki vedno preverijo obliko porazdelitve.',
        mathematicalTheory: 'Aritmetično povprečje: \\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i. Uteženo povprečje: \\bar{x}_w = \\frac{\\sum w_i x_i}{\\sum w_i}. Koeficient asimetrije (Skewness): \\gamma_1 = \\frac{1}{n} \\sum \\left(\\frac{x_i - \\bar{x}}{s}\\right)^3.'
      },
      cueBannerText: 'Opazujte, kako dodajanje točk premika težišče prevesice in spreminja obliko histograma.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V podjetju s 50 zaposlenimi ima 45 delavcev plačo 1.500 €, 4 vodje 4.000 €, direktor pa 50.000 €. Kakšna je oblika porazdelitve plač in kje leži povprečje glede na večino delavcev?',
        prompt: 'Pomislite na vpliv direktorjeve plače na težišče:',
        options: [
          {
            id: 'opt-1',
            text: 'Porazdelitev je močno desno asimetrična, povprečna plača (~2.660 €) pa je bistveno višja od plače 90 % vseh zaposlenih.',
            isCorrect: true,
            explanation: 'Pravilno! Direktorjeva plača deluje kot močan desni ekstrem, ki povleče povprečje navzgor, daleč nad plačo večine delavcev.'
          },
          {
            id: 'opt-2',
            text: 'Porazdelitev je simetrična, povprečna plača pa točno odraža tipičnega delavca.',
            isCorrect: false,
            explanation: 'Napačno. Porazdelitev je zelo nesimetrična zaradi enega samega ogromnega zneska.'
          },
          {
            id: 'opt-3',
            text: 'Porazdelitev je levo asimetrična, ker ima večina ljudi nizko plačo.',
            isCorrect: false,
            explanation: 'Napačno. Asimetrija se imenuje po smeri DOLGEGA REPA (desno), ne po gnezdenju podatkov.'
          }
        ],
        insight: 'Pri desno asimetričnih porazdelitvah povprečje vedno leži desno od večine podatkov!',
        followUpExperiment: 'V simulaciji dodajte eno ekstremno vrednost in opazujte, kako povprečje poskoči.'
      },
      mathProof: {
        summaryLatex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^n x_i, \\quad \\bar{x}_{uteženo} = \\frac{\\sum_{j=1}^k N_j \\bar{x}_j}{\\sum_{j=1}^k N_j}',
        steps: [
          {
            title: '1. Izračun običajnega aritmetičnega povprečja',
            latex: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
            explanation: 'Seštevek vseh meritev delimo s skupnim številom enot n.'
          },
          {
            title: '2. Past neuteženega povprečja podskupin',
            latex: '\\text{Če računamo povprečje občin z } N_1 = 5.000 \\text{ in } N_2 = 500.000, \\text{ navadno povprečje napačno enači obe občini!}',
            explanation: 'Enostavno povprečje občinskih dohodkov bi dalo napačno sliko o dohodku na prebivalca države.'
          },
          {
            title: '3. Natančno uteženo povprečje',
            latex: '\\bar{x}_w = \\frac{N_1 \\bar{x}_1 + N_2 \\bar{x}_2 + \\dots + N_k \\bar{x}_k}{N_1 + N_2 + \\dots + N_k}',
            explanation: 'Vsako povprečje podskupine pomnožimo z njenim deležem prebivalcev.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava običajnega in uteženega povprečja',
        defaultCode: `import numpy as np

# Dohodki dveh regij z različnim številom prebivalcev
obcina_A_prebivalci = 5000
obcina_A_dohodek = 18000

obcina_B_prebivalci = 200000
obcina_B_dohodek = 32000

# Navadno povprečje (napačno)
navadno_povprecje = (obcina_A_dohodek + obcina_B_dohodek) / 2

# Uteženo povprečje (pravilno)
skupni_prebivalci = obcina_A_prebivalci + obcina_B_prebivalci
utezeno_povprecje = (obcina_A_prebivalci * obcina_A_dohodek + obcina_B_prebivalci * obcina_B_dohodek) / skupni_prebivalci

print(f"Navadno povprečje občin:   {navadno_povprecje:.2f} € (zavajajoče)")
print(f"Pravo uteženo povprečje:    {utezeno_povprecje:.2f} € (dejanski dohodek na prebivalca)")`,
        description: 'Preizkusite razliko med navadnim in uteženim povprečjem.',
        runCode: (code: string) => {
          return {
            output: `Navadno povprečje občin:   25000.00 € (zavajajoče)\nPravo uteženo povprečje:    31658.54 € (dejanski dohodek na prebivalca)`,
            metrics: { navadno: 25000, utezeno: 31658.54 }
          };
        }
      }
    },
    {
      id: 'unit-2-2',
      unitNumber: '2.2',
      chapterId: 'chapter-2',
      title: 'Varianca, standardni odklon in robustne statistike',
      subtitle: 'Škatle z brki (Box plot), kvartili, IQR in prepoznavanje osamelcev',
      leadParagraph: 'Samo sredina podatkov ne pove celotne zgodbe – vedeti moramo tudi, kako močno so podatki razpršeni okoli sredine. Dve skupini imata lahko povsem enako povprečje, a se v eni vsi podatki gnetejo ob sredini, v drugi pa divje nihajo.',
      deepDive: 'Varianco (s²) izračunamo kot povprečje kvadratov odstopanj od povprečja, pri čemer delimo z (n - 1) za nepristranskost vzorca. Standardni odklon (s) je kvadratni koren variance in ima enake merske enote kot podatki. Kadar pa so v podatkih prisotni močni osamelci (outliers), sta povprečje in standardni odklon zelo občutljiva (nista robustna). V takih primerih uporabimo robustne statistike: mediano (srednjo vrednost urejenega niza) in medkvartilni razpon (IQR = Q3 - Q1). Pri škatli z brki (Box plot) škatla zajema srednjih 50 % podatkov, brki pa segajo največ do 1,5 x IQR stran od škatle. Vse točke izven tega območja označimo kot osamelce.',
      mnemonic: {
        eli5: 'Mediana je kot srednji otrok po višini v vrsti: tudi če se na konec vrste postavi 3-metrski velikan, srednji otrok ostane točno isti. Povprečje pa se takoj zmede in premakne!',
        anchor: 'Mediana in IQR = odporna na ekstreme (robustna); Povprečje in standardni odklon = občutljiva na osamelce.',
        fallacyWarning: {
          name: 'Pravilo 1,5 x IQR ni čarobni dokaz napake',
          description: 'Avtomatično brisanje osamelcev, ki padejo izven brkov, pod predpostavko, da gre za napako pri merjenju.',
          example: 'V finančnih podatkih ali naravnih nesrečah so ravno osamelci (npr. zlom borze ali tisočletna poplava) najpomembnejši dogodki, ki jih model ne sme spregledati!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Kjer vladajo ekstremi, zaupaj mediani in IQR; kjer je svet simetričen, uporabi povprečje in odklon.',
        simpleExplanation: 'Prvi kvartil Q1 odreže spodnjih 25 % podatkov, tretji kvartil Q3 pa zgornjih 25 %. Razlika IQR = Q3 - Q1 meri širino jedra podatkov. Če je točka oddaljena več kot 1,5 x IQR od roba škatle, jo narišemo kot ločeno piko (potencialni osamelec).',
        practicalInsight: 'Nepremičninski trg in statistični uradi vedno poročajo medianske cene stanovanj in medianske plače, saj nekaj luksuznih vil ne sme popačiti slike za povprečnega državljana.',
        mathematicalTheory: 'Vzorčna varianca: s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2. Medkvartilni razmik: \\text{IQR} = Q_3 - Q_1. Zgornja meja brkov: \\min(\\max(X), Q_3 + 1.5 \\cdot \\text{IQR}).'
      },
      textbookWisdom: {
        simpleQuote: 'Kjer vladajo ekstremi, zaupaj mediani in IQR; kjer je svet simetričen, uporabi povprečje in odklon.',
        simpleExplanation: 'Prvi kvartil Q1 odreže spodnjih 25 % podatkov, tretji kvartil Q3 pa zgornjih 25 %. Razlika IQR = Q3 - Q1 meri širino jedra podatkov. Če je točka oddaljena več kot 1,5 x IQR od roba škatle, jo narišemo kot ločeno piko (potencialni osamelec).',
        practicalInsight: 'Nepremičninski trg in statistični uradi vedno poročajo medianske cene stanovanj in medianske plače, saj nekaj luksuznih vil ne sme popačiti slike za povprečnega državljana.',
        mathematicalTheory: 'Vzorčna varianca: s^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2. Medkvartilni razmik: \\text{IQR} = Q_3 - Q_1. Zgornja meja brkov: \\min(\\max(X), Q_3 + 1.5 \\cdot \\text{IQR}).'
      },
      cueBannerText: 'Preučite škatlo z brki, izračunajte IQR ter opazujte stabilnost mediane ob premikanju ekstremov.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V vzorcu 5 števil: [3, 5, 7, 9, 11] je mediana 7, povprečje 7. Če zadnjo številko 11 spremenimo v 100, kaj se zgodi z mediano in povprečjem?',
        prompt: 'Razmislite o definiciji robustnosti:',
        options: [
          {
            id: 'opt-1',
            text: 'Mediana ostane natanko 7 (nespremenjena), povprečje pa poskoči s 7 na 24,8.',
            isCorrect: true,
            explanation: 'Odlično! Mediana je robustna na ekstreme, saj jo zanima le vrstni red na sredini. Povprečje pa upošteva absolutno vrednost vsakega števila in se močno premakne.'
          },
          {
            id: 'opt-2',
            text: 'Obe meri se povečata za enak znesek.',
            isCorrect: false,
            explanation: 'Napačno. Mediana se sploh ne premakne.'
          },
          {
            id: 'opt-3',
            text: 'Mediana se spremeni, povprečje pa ostane enako.',
            isCorrect: false,
            explanation: 'Napačno. Ravno obratno je.'
          }
        ],
        insight: 'Mediana in IQR varujeta analizo pred popačenjem zaradi osamelcev!',
        followUpExperiment: 'V simulaciji spremenite najbolj oddaljeno točko in preverite vrednosti s² in IQR.'
      },
      mathProof: {
        summaryLatex: 's = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n-1}}, \\quad \\text{IQR} = Q_3 - Q_1',
        steps: [
          {
            title: '1. Odkloni od povprečja in njihovi kvadrati',
            latex: 'd_i = (x_i - \\bar{x}) \\implies d_i^2 \\ge 0',
            explanation: 'Kvadriranje odstrani negativne predznake in močneje kaznuje večja odstopanja.'
          },
          {
            title: '2. Deljenje z (n - 1) (Besselov popravek)',
            latex: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^n d_i^2',
            explanation: 'Ker smo uporabili vzorčno povprečje \\bar{x} namesto pravega populacijskega \\mu, deljenje z n-1 zagotovi nepristranskost cenilca.'
          },
          {
            title: '3. Meje za osamelce na Box plotu',
            latex: '\\text{Spodnja meja} = Q_1 - 1.5 \\cdot \\text{IQR}, \\quad \\text{Zgornja meja} = Q_3 + 1.5 \\cdot \\text{IQR}',
            explanation: 'Vse vrednosti izven teh dveh mej veljajo za osamelce.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun 5 številskega povzetka in zaznava osamelcev',
        defaultCode: `import numpy as np

podatki = np.array([12, 15, 18, 19, 21, 22, 23, 25, 28, 31, 85])

q1 = np.percentile(podatki, 25)
mediana = np.median(podatki)
q3 = np.percentile(podatki, 75)
iqr = q3 - q1

spodnja_meja = q1 - 1.5 * iqr
zgornja_meja = q3 + 1.5 * iqr

osamelci = podatki[(podatki < spodnja_meja) | (podatki > zgornja_meja)]

print(f"Q1: {q1:.1f}, Mediana: {mediana:.1f}, Q3: {q3:.1f}")
print(f"IQR: {iqr:.1f}")
print(f"Dovoljene meje brkov: [{spodnja_meja:.1f}, {zgornja_meja:.1f}]")
print(f"Zaznani osamelci: {osamelci}")`,
        description: 'Izračunajte kvartile in poiščite točke, ki presegajo mejo 1,5 x IQR.',
        runCode: (code: string) => {
          return {
            output: `Q1: 18.5, Mediana: 22.0, Q3: 26.5\nIQR: 8.0\nDovoljene meje brkov: [6.5, 38.5]\nZaznani osamelci: [85] (točka je daleč nad zgornjim brkom)`,
            metrics: { q1: 18.5, mediana: 22.0, q3: 26.5, iqr: 8.0, outlier: 85 }
          };
        }
      }
    },
    {
      id: 'unit-2-3',
      unitNumber: '2.3',
      chapterId: 'chapter-2',
      title: 'Kategorični podatki: Kontingenčne tabele in mozaični diagrami',
      subtitle: 'Vrstični in stolpčni deleži, naloženi stolpci ter past tortnih grafov',
      leadParagraph: 'Kadar preučujemo dve kategorični spremenljivki hkrati (npr. tip posojila in status lastništva stanovanja), podatke združimo v dvosmerno kontingenčno tabelo. S pravilnim računanjem vrstičnih ali stolpčnih deležev lahko takoj ugotovimo, ali med kategorijama obstaja povezava.',
      deepDive: 'Kontingenčna tabela prikazuje frekvence križanja dveh spremenljivk. Za vizualizacijo uporabljamo:\n1. Naloženi stolpični diagram (Stacked Bar Plot): prikazuje absolutne frekvence posameznih kategorij.\n2. Standardizirani naloženi stolpec: vsi stolpci so enake višine (100 %), kar omogoča neposredno primerjavo deležev med skupinami.\n3. Mozaični diagram (Mosaic Plot): najpopolnejši prikaz, kjer širina stolpca ustreza velikosti prve skupine, višina polj pa deležu druge spremenljivke.\n\nNasprotno pa so tortni diagrami (Pie Charts) v sodobni statistiki odsvetovani, saj človeško oko zelo slabo ocenjuje kote in ukrivljene površine rezin.',
      mnemonic: {
        eli5: 'Mozaični diagram je kot razdeljena čokolada: širina tablice pove, koliko je katere vrste, višina kock pa delež nadeva v posameznem kosu. Torta (tortni graf) pa le zmede pogled!',
        anchor: 'Za primerjavo skupin vedno pogojuj na pojasnjevalno spremenljivko (stolpčni ali vrstični delež).',
        fallacyWarning: {
          name: 'Zamenjava vrstičnih in stolpčnih deležev',
          description: 'Zamenjava vprašanja »Kolikšen delež lastnikov stanovanj vzame skupno posojilo?« z vprašanjem »Kolikšen delež skupnih posojilodajalcev ima lastno stanovanje?«.',
          example: 'Delež A pri pogoju B ni enak deležu B pri pogoju A!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Kadar primerjaš neenako velike skupine, primerjaj procente (deleže), ne surovih števil.',
        simpleExplanation: 'Če je med 8.500 posameznimi prosilci 3.500 najemnikov (41 %), med 1.500 skupnimi prosilci pa 360 najemnikov (24 %), primerjava surovih številk (3500 proti 360) zavaja zaradi različne skupne velikosti skupin. Deleži (41 % proti 24 %) pa jasno pokažejo, da skupni prosilci bistveno redkeje najemajo.',
        practicalInsight: 'V spletnem trženju in e-poštnih filtrih kontingenčne tabele razkrijejo, ali format sporočila (HTML proti navadnemu besedilu) vpliva na verjetnost, da je sporočilo vsiljena pošta (spam).',
        mathematicalTheory: 'Vrstični delež: $p_{j|i} = n_{ij} / n_{i.}$. Stolpčni delež: $p_{i|j} = n_{ij} / n_{.j}$. Neodvisnost dveh kategoričnih spremenljivk pomeni, da za vse celice velja $p_{ij} = p_{i.} \\cdot p_{.j}$.'
      },
      textbookWisdom: {
        simpleQuote: 'Kadar primerjaš neenako velike skupine, primerjaj procente (deleže), ne surovih števil.',
        simpleExplanation: 'Če je med 8.500 posameznimi prosilci 3.500 najemnikov (41 %), med 1.500 skupnimi prosilci pa 360 najemnikov (24 %), primerjava surovih številk (3500 proti 360) zavaja zaradi različne skupne velikosti skupin. Deleži (41 % proti 24 %) pa jasno pokažejo, da skupni prosilci bistveno redkeje najemajo.',
        practicalInsight: 'V spletnem trženju in e-poštnih filtrih kontingenčne tabele razkrijejo, ali format sporočila (HTML proti navadnemu besedilu) vpliva na verjetnost, da je sporočilo vsiljena pošta (spam).',
        mathematicalTheory: 'Vrstični delež: $p_{j|i} = n_{ij} / n_{i.}$. Stolpčni delež: $p_{i|j} = n_{ij} / n_{.j}$. Neodvisnost dveh kategoričnih spremenljivk pomeni, da za vse celice velja $p_{ij} = p_{i.} \\cdot p_{.j}$.'
      },
      cueBannerText: 'Raziskujte kontingenčne tabele in opazujte, kako mozaični diagram razkriva povezave med kategorijami.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V bazi e-pošte je med 1.195 sporočili v obliki čistega besedila 209 vsiljenih sporočil (17,5 %), med 2.726 sporočili v obliki HTML pa 158 vsiljenih sporočil (5,8 %). Kateri delež je bolj uporaben za gradnjo filtra neželene pošte?',
        prompt: 'Razmislite, katera spremenljivka je pojasnjevalna (format) in katera odzivna (spam):',
        options: [
          {
            id: 'opt-1',
            text: 'Stolpčni delež (delež spama znotraj posameznega formata), saj nas zanima verjetnost spama ob znanem formatu prispelega sporočila.',
            isCorrect: true,
            explanation: 'Odlično! Ko prejmemo sporočilo, format že poznamo (pogoj). Zato nas zanima P(Spam | Besedilo) = 17,5 % proti P(Spam | HTML) = 5,8 %.'
          },
          {
            id: 'opt-2',
            text: 'Skupni delež vseh sporočil, ker format ne igra nobene vloge.',
            isCorrect: false,
            explanation: 'Napačno. Med formatoma je velika razlika (17,5 % proti 5,8 %).'
          },
          {
            id: 'opt-3',
            text: 'Tortni diagram celotne baze.',
            isCorrect: false,
            explanation: 'Napačno. Tortni diagram ne omogoča pogojne analize med dvema spremenljivkama.'
          }
        ],
        insight: 'Pogojenje na pojasnjevalno spremenljivko je temelj vsakega klasifikatorja in napovednega modela!',
        followUpExperiment: 'V simulaciji spremenite deleže v kontingenčni tabeli in opazujte spreminjanje mozaičnega diagrama.'
      },
      mathProof: {
        summaryLatex: 'P(\\text{Spam} \\mid \\text{Tekst}) = \\frac{209}{1195} \\approx 0.175, \\quad P(\\text{Spam} \\mid \\text{HTML}) = \\frac{158}{2726} \\approx 0.058',
        steps: [
          {
            title: '1. Pogojna verjetnost za tekstovni format',
            latex: 'P(\\text{Spam} \\mid \\text{Tekst}) = \\frac{n_{\\text{spam}, \\text{tekst}}}{n_{\\text{tekst}}} = \\frac{209}{1195} = 0.1749',
            explanation: 'Delež vsiljenih sporočil med vsemi sporočili z navadnim besedilom.'
          },
          {
            title: '2. Pogojna verjetnost za HTML format',
            latex: 'P(\\text{Spam} \\mid \\text{HTML}) = \\frac{n_{\\text{spam}, \\text{html}}}{n_{\\text{html}}} = \\frac{158}{2726} = 0.0580',
            explanation: 'Delež vsiljenih sporočil med vsemi HTML sporočili.'
          },
          {
            title: '3. Razmerje obetov (Odds Ratio)',
            latex: '\\text{OR} = \\frac{0.1749 / (1 - 0.1749)}{0.0580 / (1 - 0.0580)} \\approx 3.44',
            explanation: 'Sporočilo v navadnem besedilu ima skoraj 3,5-krat večje obete, da je vsiljena pošta.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Analiza kontingenčne tabele in pogojnih verjetnosti',
        defaultCode: `# Kontingenčna tabela za e-poštna sporočila
tabela = {
    'tekst': {'spam': 209, 'ni_spam': 986},
    'html':  {'spam': 158, 'ni_spam': 2568}
}

skupaj_tekst = tabela['tekst']['spam'] + tabela['tekst']['ni_spam']
skupaj_html  = tabela['html']['spam'] + tabela['html']['ni_spam']

p_spam_tekst = tabela['tekst']['spam'] / skupaj_tekst
p_spam_html  = tabela['html']['spam'] / skupaj_html

print(f"Vzorčni delež spama pri tekstu: {p_spam_tekst:.1%}")
print(f"Vzorčni delež spama pri HTML:  {p_spam_html:.1%}")
print(f"Razlika v deležih:              {p_spam_tekst - p_spam_html:+.1%}")`,
        description: 'Zaženite analizo kontingenčne tabele za izračun pogojnih deležev.',
        runCode: (code: string) => {
          return {
            output: `Vzorčni delež spama pri tekstu: 17.5%\nVzorčni delež spama pri HTML:  5.8%\nRazlika v deležih:              +11.7%\nSklep: Format sporočila je močno povezan s statusom vsiljene pošte.`,
            metrics: { p_tekst: 0.175, p_html: 0.058, diff: 0.117 }
          };
        }
      }
    },
    {
      id: 'unit-2-4',
      unitNumber: '2.4',
      chapterId: 'chapter-2',
      title: 'Primerjava skupin in študija primera: Randomizacijski test (cepivo proti malariji)',
      subtitle: 'Kako s simulacijo ugotoviti, ali je razlika med skupinama zgolj naključje?',
      leadParagraph: 'V medicinskem poskusu s cepivom proti malariji (PfSPZ) je 14 prostovoljcev prejelo cepivo, 6 pa placebo. Po izpostavitvi parazitu je med cepljenimi ostalo zdravih 9 od 14 (64,3 %), med necepljenimi pa nobeden (0 od 6, 0 %). Ali ta 64,3 % razlika dokazuje učinkovitost cepiva ali pa se je zgodila zgolj po čistem naključju?',
      deepDive: 'Za odgovor na to temeljno vprašanje uporabimo randomizacijski (permutacijski) test. Postavimo ničelno hipotezo (H0): cepivo nima nobenega vpliva, kar pomeni, da bi vseh 11 okuženih ljudi zbolelo ne glede na to, v kateri skupini so bili. Zamislimo si 20 kartic (11 z napisom »okužba«, 9 z napisom »brez okužbe«). Kartice dobro premešamo in jih naključno razdelimo v kupček 14 (simulirano cepivo) in kupček 6 (simuliran placebo). Ta postopek z računalnikom ponovimo 10.000-krat. Ugotovimo, da se razlika 64,3 % ali več pri naključnem mešanju pojavi le v približno 1,5 % vseh simulacij (p-vrednost ≈ 0,015). Ker je ta verjetnost zelo majhna (manjša od 5 %), zavrnemo ničelno hipotezo in z gotovostjo sprejmemo, da cepivo resnično deluje!',
      mnemonic: {
        eli5: 'Predstavljaj si čarovnika, ki trdi, da zna z mislimi uganiti rdeče in črne karte. Če 10-krat zapored zadane, ali je imel le srečo? Premešaš karte 1.000-krat in vidiš, da bi se 10 zaporednih zadetkov po naključju zgodilo manj kot enkrat na tisoč poskusov. Torej ne gre za naključje!',
        anchor: 'Premešaj kartice → Izračunaj razliko → Poglej, kako redka je bila dejanska razlika pod naključjem.',
        fallacyWarning: {
          name: 'Zamenjava p-vrednosti z verjetnostjo, da ničelna hipoteza drži',
          description: 'Napačno tolmačenje, da p-vrednost 0,015 pomeni »1,5 % možnost, da cepivo ne deluje«.',
          example: 'P-vrednost meri le verjetnost podatkov OB predpostavki naključja, ne pa verjetnosti same hipoteze!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če se opaženi rezultat pri naključnem mešanju skoraj nikoli ne ponovi, imamo v rokah znanstveni dokaz.',
        simpleExplanation: 'Randomizacijski test je najbolj intuitiven način statističnega sklepanja: ne potrebujemo zapletenih formul, temveč le simuliramo svet, v katerem zdravilo nima učinka, in preštejemo, kolikokrat bi se tak rezultat zgodil zgolj po sreči.',
        practicalInsight: 'To je temelj modernega računalniško podprtega sklepanja (Resampling / Permutation testing), ki ga podatkovni znanstveniki uporabljajo pri A/B testih in zapletenih modelih.',
        mathematicalTheory: 'Testna statistika: T = \\hat{p}_{cepivo} - \\hat{p}_{placebo}. Empirična p-vrednost: \\hat{p}_{val} = \\frac{1}{B} \\sum_{b=1}^B \\mathbb{I}(T^{*(b)} \\ge T_{obs}), kjer je B število permutacijskih vzorcev.'
      },
      textbookWisdom: {
        simpleQuote: 'Če se opaženi rezultat pri naključnem mešanju skoraj nikoli ne ponovi, imamo v rokah znanstveni dokaz.',
        simpleExplanation: 'Randomizacijski test je najbolj intuitiven način statističnega sklepanja: ne potrebujemo zapletenih formul, temveč le simuliramo svet, v katerem zdravilo nima učinka, in preštejemo, kolikokrat bi se tak rezultat zgodil zgolj po sreči.',
        practicalInsight: 'To je temelj modernega računalniško podprtega sklepanja (Resampling / Permutation testing), ki ga podatkovni znanstveniki uporabljajo pri A/B testih in zapletenih modelih.',
        mathematicalTheory: 'Testna statistika: T = \\hat{p}_{cepivo} - \\hat{p}_{placebo}. Empirična p-vrednost: \\hat{p}_{val} = \\frac{1}{B} \\sum_{b=1}^B \\mathbb{I}(T^{*(b)} \\ge T_{obs}), kjer je B število permutacijskih vzorcev.'
      },
      cueBannerText: 'Zaženite permutacijski simulacijski test in opazujte porazdelitev razlik pod ničelno hipotezo.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V 1.000 simulacijah naključnega mešanja 20 bolnikov se je razlika v deležu zdravih, ki je vsaj 64,3 %, pojavila natanko 15-krat. Kakšen je statistični sklep pri nivoju tveganja α = 0,05?',
        prompt: 'Izračunajte empirično p-vrednost (15 / 1000 = 0,015) in jo primerjajte z 0,05:',
        options: [
          {
            id: 'opt-1',
            text: 'Zavrnemo ničelno hipotezo (p = 0,015 < 0,05), saj je tako velik uspeh cepiva malo verjeten zgolj zaradi naključja.',
            isCorrect: true,
            explanation: 'Odlično! Ker je p-vrednost 1,5 % manjša od mejnih 5 %, imamo statistično značilen dokaz za učinkovitost cepiva.'
          },
          {
            id: 'opt-2',
            text: 'Sprejmemo ničelno hipotezo, ker je 15 več kot 0.',
            isCorrect: false,
            explanation: 'Napačno. 15 od 1000 pomeni le 1,5 %, kar je dovolj redek dogodek za zavrnitev ničelne hipoteze.'
          },
          {
            id: 'opt-3',
            text: 'Poskusa ni mogoče oceniti brez Gaussove krivulje.',
            isCorrect: false,
            explanation: 'Napačno. Permutacijski testi delujejo natančno tudi na zelo majhnih vzorcih brez predpostavke normalnosti!'
          }
        ],
        insight: 'Simulacijsko preverjanje hipotez omogoča neposredno razumevanje p-vrednosti brez matematičnih bližnjic!',
        followUpExperiment: 'V naslednjem poglavju 3 boste spoznali matematične zakonitosti verjetnosti, ki podpirajo tovrstne izračune.'
      },
      mathProof: {
        summaryLatex: 'H_0: p_{cepivo} = p_{placebo} \\implies p\\text{-vrednost} = P(T^* \\ge 0.643 \\mid H_0) \\approx 0.015',
        steps: [
          {
            title: '1. Dejanska opazovana razlika med skupinama',
            latex: 'T_{obs} = \\hat{p}_1 - \\hat{p}_2 = \\frac{9}{14} - \\frac{0}{6} = 0.6429 - 0.0000 = +0.6429',
            explanation: 'Med cepljenimi je bilo 64,3 % zdravih, med necepljenimi pa 0 %.'
          },
          {
            title: '2. Število vseh možnih razporeditev (kombinatorika)',
            latex: '\\binom{20}{14} = \\frac{20!}{14! \\, 6!} = 38.760 \\text{ kombinacij}',
            explanation: 'To je natančno število načinov, kako lahko 20 ljudi razdelimo v skupini velikosti 14 in 6.'
          },
          {
            title: '3. Natančni Fisherjev izrek (Hipergeometrijska verjetnost)',
            latex: 'P(X \\ge 9) = \\frac{\\binom{9}{9}\\binom{11}{5}}{\\binom{20}{14}} = \\frac{1 \\cdot 462}{38760} \\approx 0.0119',
            explanation: 'Natančna analitična p-vrednost je 0,0119, kar se odlično ujema z našo simulacijo (~0,015).'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Randomizacijski permutacijski test za cepivo proti malariji',
        defaultCode: `import numpy as np

# 11 okuženih (1) in 9 neokuženih (0)
bolniki = np.array([1]*11 + [0]*9)
n_sim = 10000
opazovana_razlika = 9/14 - 0/6 # 0.6429

razlike_pod_H0 = []
np.random.seed(42)

for _ in range(n_sim):
    premesano = np.random.permutation(bolniki)
    sim_cepivo = premesano[:14]
    sim_placebo = premesano[14:]
    
    # Delež zdravih (0)
    delez_cepivo = np.mean(sim_cepivo == 0)
    delez_placebo = np.mean(sim_placebo == 0)
    razlike_pod_H0.append(delez_cepivo - delez_placebo)

razlike_pod_H0 = np.array(razlike_pod_H0)
p_vrednost = np.mean(razlike_pod_H0 >= opazovana_razlika)

print(f"Opazovana razlika:   {opazovana_razlika:+.3f}")
print(f"Simulirana p-vrednost: {p_vrednost:.4f} ({p_vrednost*100:.2f} %)")
if p_vrednost < 0.05:
    print("Sklep: Zavrnemo H0! Cepivo statistično značilno zmanjša tveganje.")`,
        description: 'Izvedite 10.000 simulacij permutacijskega testa in izračunajte p-vrednost.',
        runCode: (code: string) => {
          return {
            output: `Opazovana razlika:   +0.643\nSimulirana p-vrednost: 0.0124 (1.24 %)\nSklep: Zavrnemo H0! Cepivo statistično značilno zmanjša tveganje.`,
            metrics: { diff_obs: 0.643, p_val: 0.0124 }
          };
        }
      }
    }
  ]
};
