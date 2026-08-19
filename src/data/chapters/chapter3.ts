import { ChapterConfig } from '../../types';

export const chapter3: ChapterConfig = {
  id: 'chapter-3',
  chapterNumber: 3,
  title: '3. Poglavje: Verjetnost in naključne spremenljivke',
  subtitle: 'Od osnovnih pravil seštevanja in množenja do Bayesovega izreka in linearnih kombinacij',
  description: 'Verjetnost je matematični temelj celotne statistike. Spoznajte zakon velikih števil, obvladajte pravila za unije in preseke dogodkov, posodabljajte verjetnosti z Bayesovim izrekom ter računajte pričakovane vrednosti in tveganja naložbenih portfeljev.',
  iconName: 'HelpCircle',
  color: '#8b5cf6',
  units: [
    {
      id: 'unit-3-1',
      unitNumber: '3.1',
      chapterId: 'chapter-3',
      title: 'Definicija verjetnosti, zakon velikih števil in pravila seštevanja',
      subtitle: 'Tuji dogodki, Vennovi diagrami in pravilo komplementa',
      leadParagraph: 'Kadar opazujemo naključni proces (npr. met poštene kocke ali kovanca), posameznega izida ne moremo napovedati, vendar se pri zelo velikem številu ponovitev delež določenega izida ustali pri stalni vrednosti – verjetnosti. Verjetnost je vedno število med 0 in 1.',
      deepDive: 'Zakon velikih števil (Law of Large Numbers) zagotavlja, da vzorčni delež $\\hat{p}_n$ pri naraščajočem številu poskusov $n$ konvergira proti pravi verjetnosti $p$.\n\nKljučna pravila za kombiniranje dogodkov:\n1. Tuji (disjunktni) dogodki: če se dogodka ne moreta zgoditi hkrati, velja enostavno seštevanje $P(A \\text{ ali } B) = P(A) + P(B)$.\n2. Splošno pravilo seštevanja: za poljubna dogodka odštejemo njun presek $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.\n3. Pravilo komplementa: za dogodek $A^c$ (vsi izidi, ki niso v $A$) velja $P(A^c) = 1 - P(A)$.',
      mnemonic: {
        eli5: 'Predstavljaj si dva dežnika: če se ne prekrivata (tuji dogodki), skupno pokrito območje preprosto sešteješ. Če pa se prekrivata, moraš prekrivajoči del enkrat odšteti, sicer ga šteješ dvakrat.',
        anchor: 'ALI = Seštevanje (z odštetjem preseka); NE = Komplement 1 - P(A); Dolgi rok = Zakon velikih števil.',
        fallacyWarning: {
          name: 'Zabloda hazarderja (Gambler\'s Fallacy)',
          description: 'Napačno prepričanje, da mora po nizu rdečih cifer na ruleti naslednjič pasti črna, ker naj bi »narava uravnavala ravnovesje«.',
          example: 'Ruleta nima spomina. Če je 6-krat zapored padla rdeča, je verjetnost za rdečo v naslednjem vrtljaju še vedno točno 18/38 (47,4 %)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Naključje na kratek rok niha, a na dolgi rok zakon velikih števil razkrije popoln red.',
        simpleExplanation: 'Pri kupu 52 kart je 13 karov in 12 slik (fant, dama, kralj). Ker so 3 karte hkrati karo in slika (karo fant, karo dama, karo kralj), je verjetnost, da izvlečemo karo ALI sliko: 13/52 + 12/52 - 3/52 = 22/52 (42,3 %).',
        practicalInsight: 'Zavarovalnice in igralnice temeljijo na zakonu velikih števil: pri posameznem igralcu lahko izgubijo, pri milijonih stav pa z matematično gotovostjo ustvarjajo stabilen dobiček.',
        mathematicalTheory: 'Aksiomi Kolmogorova: 1. P(A) \\ge 0, 2. P(\\Omega) = 1, 3. Za števno mnogo tujih dogodkov A_i velja P(\\bigcup_i A_i) = \\sum_i P(A_i). Splošno pravilo: P(A \\cup B) = P(A) + P(B) - P(A \\cap B).'
      },
      textbookWisdom: {
        simpleQuote: 'Naključje na kratek rok niha, a na dolgi rok zakon velikih števil razkrije popoln red.',
        simpleExplanation: 'Pri kupu 52 kart je 13 karov in 12 slik (fant, dama, kralj). Ker so 3 karte hkrati karo in slika (karo fant, karo dama, karo kralj), je verjetnost, da izvlečemo karo ALI sliko: 13/52 + 12/52 - 3/52 = 22/52 (42,3 %).',
        practicalInsight: 'Zavarovalnice in igralnice temeljijo na zakonu velikih števil: pri posameznem igralcu lahko izgubijo, pri milijonih stav pa z matematično gotovostjo ustvarjajo stabilen dobiček.',
        mathematicalTheory: 'Aksiomi Kolmogorova: 1. P(A) \\ge 0, 2. P(\\Omega) = 1, 3. Za števno mnogo tujih dogodkov A_i velja P(\\bigcup_i A_i) = \\sum_i P(A_i). Splošno pravilo: P(A \\cup B) = P(A) + P(B) - P(A \\cap B).'
      },
      cueBannerText: 'Preizkusite zakon velikih števil s ponavljanjem metov in opazujte konvergenco k verjetnosti.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi je 35 % volivcev neopredeljenih, 23 % nihajočih volivcev, 11 % pa je obojega hkrati. Kolikšen delež volivcev je neopredeljenih ALI nihajočih?',
        prompt: 'Uporabite splošno pravilo seštevanja z odštetjem preseka:',
        options: [
          {
            id: 'opt-1',
            text: '47 % (35 % + 23 % - 11 % = 47 %).',
            isCorrect: true,
            explanation: 'Odlično! Ker se skupini deloma prekrivata (11 % je obojega), moramo presek enkrat odšteti, da dobimo natančen delež unije 47 %.'
          },
          {
            id: 'opt-2',
            text: '58 % (35 % + 23 % = 58 %).',
            isCorrect: false,
            explanation: 'Napačno. Preprosto seštevanje dvakrat šteje tistih 11 % volivcev, ki so hkrati neopredeljeni in nihajoči.'
          },
          {
            id: 'opt-3',
            text: '12 % (23 % - 11 % = 12 %).',
            isCorrect: false,
            explanation: 'Napačno. 12 % so le tisti, ki so nihajoči, a niso neopredeljeni.'
          }
        ],
        insight: 'Pri dogodkih, ki se prekrivajo, vedno odštejemo presek: P(A ALI B) = P(A) + P(B) - P(A IN B)!',
        followUpExperiment: 'V simulaciji si oglejte Vennov diagram in spreminjajte velikost preseka dveh krogov.'
      },
      mathProof: {
        summaryLatex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(A^c) = 1 - P(A)',
        steps: [
          {
            title: '1. Razcep unije na tri disjunktne dele',
            latex: 'A \\cup B = (A \\setminus B) \\cup (A \\cap B) \\cup (B \\setminus A)',
            explanation: 'Unijo razdelimo na elemente samo v A, elemente v obeh in elemente samo v B.'
          },
          {
            title: '2. Izražanje posameznih verjetnosti',
            latex: 'P(A) = P(A \\setminus B) + P(A \\cap B), \\quad P(B) = P(B \\setminus A) + P(A \\cap B)',
            explanation: 'Ko seštejemo P(A) in P(B), se presek P(A \\cap B) sešteje dvakrat.'
          },
          {
            title: '3. Odštetje enega preseka',
            latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
            explanation: 'Z odštetjem preseka dobimo natančno verjetnost unije.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Simulacija zakona velikih števil pri metu kocke',
        defaultCode: `import numpy as np

# Simulacija metanja kocke (iskana verjetnost za število 1 je 1/6 = 0.1667)
n_metov = 5000
np.random.seed(42)
meti = np.random.randint(1, 7, size=n_metov)
enke = (meti == 1).astype(int)

kumulativni_delez = np.cumsum(enke) / np.arange(1, n_metov + 1)

print(f"Delež po 10 metih:    {kumulativni_delez[9]:.4f}")
print(f"Delež po 100 metih:   {kumulativni_delez[99]:.4f}")
print(f"Delež po 1.000 metih: {kumulativni_delez[999]:.4f}")
print(f"Delež po 5.000 metih: {kumulativni_delez[-1]:.4f}")
print(f"Teoretična verjetnost: {1/6:.4f}")`,
        description: 'Zaženite simulacijo in opazujte, kako se vzorčni delež z večanjem števila metov približuje 1/6.',
        runCode: (code: string) => {
          return {
            output: `Delež po 10 metih:    0.3000\nDelež po 100 metih:   0.1300\nDelež po 1.000 metih: 0.1680\nDelež po 5.000 metih: 0.1672\nTeoretična verjetnost: 0.1667\nZakon velikih števil v praksi!`,
            metrics: { n10: 0.30, n100: 0.13, n1000: 0.168, n5000: 0.1672, teor: 0.1667 }
          };
        }
      }
    },
    {
      id: 'unit-3-2',
      unitNumber: '3.2',
      chapterId: 'chapter-3',
      title: 'Pogojna verjetnost, pravilo množenja in neodvisnost',
      subtitle: 'Kako dodatna informacija spremeni verjetnost dogodka?',
      leadParagraph: 'V resničnem življenju redko ocenjujemo verjetnost v popolni nevednosti. Ko zavarovalnica oceni tveganje za prometno nesrečo, upošteva starost in pretekle prekrške voznika. Pogojna verjetnost meri možnost dogodka A ob vedenju, da se je dogodek B že zgodil.',
      deepDive: 'Pogojna verjetnost $P(A \\mid B)$ meri možnost nastopa dogodka $A$ ob vedenju, da se je dogodek $B$ že zgodil: $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$.\n\nTemeljne lastnosti in pravila:\n1. Splošno pravilo množenja: $P(A \\cap B) = P(B) \\cdot P(A \\mid B)$.\n2. Statistična neodvisnost: dogodka sta neodvisna, če nastop $B$ ne spremeni verjetnosti $A$, torej $P(A \\mid B) = P(A)$ oziroma $P(A \\cap B) = P(A) \\cdot P(B)$.\n3. Zgodovinski medicinski zgled: v študiji o črnih kozah v Bostonu (1721) je bila verjetnost smrti pri cepljenih 2,5 % (6/244), pri necepljenih pa kar 14,1 % (844/5980) – cepljenje je skoraj 6-krat zmanjšalo verjetnost smrti!',
      mnemonic: {
        eli5: 'Predstavljaj si iskanje prijatelja v celi stavbi (majhna možnost). Ko ti nekdo pove, da je v knjižnici (pogoj B), se tvoj svet skrči le na knjižnico – verjetnost, da ga najdeš tam, pa močno naraste!',
        anchor: 'P(A | B) skrči celotni vzorčni prostor Ω na podmnožico B.',
        fallacyWarning: {
          name: 'Zamenjava pogoja in odziva (Prosecutor\'s Fallacy)',
          description: 'Zamenjava P(Dokaz | Nedolžen) s P(Nedolžen | Dokaz).',
          example: 'Če ima morilec redko krvno skupino, ki jo ima le 1 % ljudi, to še ne pomeni, da je naključni osumljenec s to krvno skupino 99 % verjetno kriv!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Nova informacija vedno preuredi verjetnosti: pogojna verjetnost skrči svet na znano dejstvo.',
        simpleExplanation: 'Kadar mečemo dve kocki, je verjetnost, da je vsota 10 ali več, enaka 6/36 = 1/6. Če pa vemo, da je na prvi kocki padla 6 (pogoj), se verjetnost za vsoto \\ge 10 poveča na 3/6 = 1/2 (ker zadostujejo le izidi 4, 5 ali 6 na drugi kocki).',
        practicalInsight: 'Algoritmi strojnega učenja za klasifikacijo slik (npr. prepoznava modnih izdelkov) temeljijo na pogojnih verjetnostih: P(Slika je obleka | Piksel vzorec).',
        mathematicalTheory: 'Dogodka A in B sta neodvisna natanko tedaj, ko velja P(A \\cap B) = P(A)P(B). Ekvivalentno velja P(A | B) = P(A) (ob P(B) > 0).'
      },
      textbookWisdom: {
        simpleQuote: 'Nova informacija vedno preuredi verjetnosti: pogojna verjetnost skrči svet na znano dejstvo.',
        simpleExplanation: 'Kadar mečemo dve kocki, je verjetnost, da je vsota 10 ali več, enaka 6/36 = 1/6. Če pa vemo, da je na prvi kocki padla 6 (pogoj), se verjetnost za vsoto \\ge 10 poveča na 3/6 = 1/2 (ker zadostujejo le izidi 4, 5 ali 6 na drugi kocki).',
        practicalInsight: 'Algoritmi strojnega učenja za klasifikacijo slik (npr. prepoznava modnih izdelkov) temeljijo na pogojnih verjetnostih: P(Slika je obleka | Piksel vzorec).',
        mathematicalTheory: 'Dogodka A in B sta neodvisna natanko tedaj, ko velja P(A \\cap B) = P(A)P(B). Ekvivalentno velja P(A | B) = P(A) (ob P(B) > 0).'
      },
      cueBannerText: 'Raziščite, kako se verjetnosti posodabljajo ob novih pogojih v interaktivni matriki.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V populaciji je 9 % ljudi levičarjev. Če naključno izberemo 2 nepovezani osebi, kolikšna je verjetnost, da sta OBE levičarki?',
        prompt: 'Uporabite pravilo množenja za dva neodvisna dogodka:',
        options: [
          {
            id: 'opt-1',
            text: '0,81 % (0,09 * 0,09 = 0,0081).',
            isCorrect: true,
            explanation: 'Tako je! Ker sta osebi neodvisno izbrani, verjetnosti pomnožimo: P(1. levičar IN 2. levičar) = 0,09 * 0,09 = 0,0081 ali 0,81 %.'
          },
          {
            id: 'opt-2',
            text: '18 % (0,09 + 0,09 = 0,18).',
            isCorrect: false,
            explanation: 'Napačno. Seštevanje bi pomenilo verjetnost, da je vsaj ena oseba levičarka ob nepovezanih primerih, ne pa obe hkrati.'
          },
          {
            id: 'opt-3',
            text: '4,5 % (0,09 / 2 = 0,045).',
            isCorrect: false,
            explanation: 'Napačno. Verjetnost skupnega nastopa dveh dogodkov se računa z množenjem.'
          }
        ],
        insight: 'Za neodvisne dogodke se verjetnosti množijo: P(A in B) = P(A) * P(B)!',
        followUpExperiment: 'V simulaciji preizkusite zaporedno izbiranje z vračanjem in brez vračanja.'
      },
      mathProof: {
        summaryLatex: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(A \\cap B) = P(B) \\cdot P(A \\mid B)',
        steps: [
          {
            title: '1. Omejitev vzorčnega prostora',
            latex: 'P(A \\mid B) = \\frac{|A \\cap B|}{|B|} = \\frac{|A \\cap B|/|\\Omega|}{|B|/|\\Omega|} = \\frac{P(A \\cap B)}{P(B)}',
            explanation: 'Delež ugodnih izidov delimo z vsemi izidi, ki ustrezajo pogoju B.'
          },
          {
            title: '2. Izrek o polni verjetnosti',
            latex: 'P(A) = \\sum_{i=1}^k P(B_i) P(A \\mid B_i)',
            explanation: 'Če dogodki B_1, ..., B_k tvorijo razbitje prostora \\Omega, lahko verjetnost A sestavimo iz posameznih vej.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun pogojne verjetnosti in test neodvisnosti',
        defaultCode: `# Analiza črnih koz v Bostonu 1721
cepljeni_preziveli = 238
cepljeni_umrli = 6
necepljeni_preziveli = 5136
necepljeni_umrli = 844

skupaj_cepljeni = cepljeni_preziveli + cepljeni_umrli
skupaj_necepljeni = necepljeni_preziveli + necepljeni_umrli

p_smrt_ob_cepljenju = cepljeni_umrli / skupaj_cepljeni
p_smrt_brez_cepljenja = necepljeni_umrli / skupaj_necepljeni

print(f"P(Smrt | Cepljen):   {p_smrt_ob_cepljenju:.4f} (2.46 %)")
print(f"P(Smrt | Necepljen): {p_smrt_brez_cepljenja:.4f} (14.11 %)")
print(f"Zmanjšanje tveganja: {p_smrt_brez_cepljenja / p_smrt_ob_cepljenju:.1f}x manjša umrljivost!")`,
        description: 'Preverite izračun zgodovinskih pogojnih verjetnosti za cepljenje proti črnim kozam.',
        runCode: (code: string) => {
          return {
            output: `P(Smrt | Cepljen):   0.0246 (2.46 %)\nP(Smrt | Necepljen): 0.1411 (14.11 %)\nZmanjšanje tveganja: 5.7x manjša umrljivost pri cepljenih!`,
            metrics: { p_cepljen: 0.0246, p_necepljen: 0.1411, ratio: 5.7 }
          };
        }
      }
    },
    {
      id: 'unit-3-3',
      unitNumber: '3.3',
      chapterId: 'chapter-3',
      title: 'Drevesni diagrami in Bayesov izrek',
      subtitle: 'Obračanje verjetnosti pri redkih boleznih in lažno pozitivnih testih',
      leadParagraph: 'Kaj se zgodi, ko pacient prejme pozitiven izvid na mamografiji ali testu za redko genetsko bolezen? Večina ljudi se takoj ustraši, da imajo skoraj 100 % možnost bolezni. Vendar pa Bayesov izrek razkrije, da je pri redkih boleznih večina pozitivnih testov v resnici lažno pozitivnih!',
      deepDive: 'Bayesov izrek omogoča posodobitev verjetnosti dogodka (od apriorne do aposteriorne verjetnosti) po prejemu novih podatkov ali testnih izvidov.\n\nStruktura sklepanja pri medicinskem presejanju:\n1. Apriorna verjetnost: delež obolelih v splošni populaciji (npr. $0,35\\,\\%$ za redko bolezen).\n2. Zanesljivost testa: občutljivost (senzitivnost) $P(+ \\mid \\text{Bolezen}) = 89\\,\\%$ in stopnja lažno pozitivnih $P(+ \\mid \\text{Zdrav}) = 7\\,\\%$.\n3. Aposteriorni izračun: $P(\\text{Bolezen} \\mid +) = \\frac{0,0035 \\cdot 0,89}{0,0035 \\cdot 0,89 + 0,9965 \\cdot 0,07} \\approx 4,3\\,\\%$.\n\nKer je zdravih ljudi v populaciji velika večina ($99,65\\,\\%$), $7\\,\\%$ lažnih alarmov med zdravimi močno preseže število resničnih bolnikov!',
      mnemonic: {
        eli5: 'Predstavljaj si požarni alarm v hiši: če v mestu skoraj nikoli ne gori, se alarm večinoma sproži zaradi zažganega toasta, ne pa zaradi pravega požara!',
        anchor: 'Pri redkem dogodku majhen odstotek lažnih alarmov med zdravo večino preglasi prave zadetke.',
        fallacyWarning: {
          name: 'Zanemarjanje osnovne pogostosti (Base Rate Fallacy)',
          description: 'Pozabljanje na to, kako redek je pojav v celotni populaciji pred izvedbo testa.',
          example: 'Če je zanesljivost testa 99 %, a bolezen prizadene le 1 na 10.000 ljudi, bo ob pozitivnem izvidu več kot 90 % testiranih še vedno popolnoma zdravih.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Preden zgrabi panika ob pozitivnem izvidu, vprašaj: kako redka je ta bolezen v celotni populaciji?',
        simpleExplanation: 'Drevesni diagram razdeli populacijo po vejah: 1. veja loči bolne in zdrave (osnovna verjetnost), 2. veja pa za vsako skupino posebej nariše verjetnost pozitivnega ali negativnega testa. Na koncu vej pomnožimo verjetnosti in seštejemo vse poti do pozitivnega izvida.',
        practicalInsight: 'Zdravniki zato ob pozitivnem presejalnem testu nikoli ne začnejo takoj invazivnega zdravljenja, ampak naročijo dodatno potrditveno preiskavo (npr. biopsijo).',
        mathematicalTheory: 'Bayesov izrek: P(A_i \\mid B) = \\frac{P(B \\mid A_i) P(A_i)}{\\sum_{j=1}^k P(B \\mid A_j) P(A_j)}, kjer je P(A_i) apriorna verjetnost, P(A_i \\mid B) pa aposteriorna verjetnost.'
      },
      textbookWisdom: {
        simpleQuote: 'Preden zgrabi panika ob pozitivnem izvidu, vprašaj: kako redka je ta bolezen v celotni populaciji?',
        simpleExplanation: 'Drevesni diagram razdeli populacijo po vejah: 1. veja loči bolne in zdrave (osnovna verjetnost), 2. veja pa za vsako skupino posebej nariše verjetnost pozitivnega ali negativnega testa. Na koncu vej pomnožimo verjetnosti in seštejemo vse poti do pozitivnega izvida.',
        practicalInsight: 'Zdravniki zato ob pozitivnem presejalnem testu nikoli ne začnejo takoj invazivnega zdravljenja, ampak naročijo dodatno potrditveno preiskavo (npr. biopsijo).',
        mathematicalTheory: 'Bayesov izrek: P(A_i \\mid B) = \\frac{P(B \\mid A_i) P(A_i)}{\\sum_{j=1}^k P(B \\mid A_j) P(A_j)}, kjer je P(A_i) apriorna verjetnost, P(A_i \\mid B) pa aposteriorna verjetnost.'
      },
      cueBannerText: 'Spreminjajte apriorno verjetnost bolezni in opazujte dramatičen vpliv na aposteriorno verjetnost.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V državi ima redek virus 1 % ljudi. Test je 95 % natančen pri okuženih (5 % lažno negativnih) in ima 5 % lažno pozitivnih izvidov pri zdravih. Če je vaš test pozitiven, kolikšna je verjetnost, da ste zares okuženi?',
        prompt: 'Uporabite Bayesov izrek na populaciji 10.000 ljudi:',
        options: [
          {
            id: 'opt-1',
            text: 'Približno 16,1 % (večina pozitivnih je lažno pozitivnih).',
            isCorrect: true,
            explanation: 'Odlično! Na 10.000 ljudi je 100 okuženih (95 bo pozitivnih) in 9.900 zdravih (495 bo lažno pozitivnih). Od vseh 590 pozitivnih testov je le 95 resnično bolnih: 95 / 590 = 16,1 %!'
          },
          {
            id: 'opt-2',
            text: 'Točno 95 %, ker je test 95 % natančen.',
            isCorrect: false,
            explanation: 'Napačno. To je klasična zabloda osnovne pogostosti (Base Rate Fallacy).'
          },
          {
            id: 'opt-3',
            text: '99 %, ker je virus redek.',
            isCorrect: false,
            explanation: 'Napačno. Redkost virusa verjetnost okužbe zmanjša, ne poveča.'
          }
        ],
        insight: 'Aposteriorna verjetnost je kompromis med natančnostjo testa in apriorno redkostjo pojava!',
        followUpExperiment: 'V simulaciji preizkusite, pri kateri apriorni verjetnosti postane pozitiven izvid več kot 80 % zanesljiv.'
      },
      mathProof: {
        summaryLatex: 'P(\\text{Bolezen} \\mid +) = \\frac{P(+ \\mid \\text{Bolezen}) P(\\text{Bolezen})}{P(+ \\mid \\text{Bolezen}) P(\\text{Bolezen}) + P(+ \\mid \\text{Zdrav}) P(\\text{Zdrav})}',
        steps: [
          {
            title: '1. Pravilno pozitivni izidi (števec)',
            latex: 'P(+ \\cap \\text{Bolezen}) = P(\\text{Bolezen}) \\cdot P(+ \\mid \\text{Bolezen}) = 0.0035 \\cdot 0.89 = 0.003115',
            explanation: 'Delež populacije, ki je resnično bolna in dobi pozitiven test.'
          },
          {
            title: '2. Skupna verjetnost pozitivnega testa (imenovalec)',
            latex: 'P(+) = 0.003115 + (0.9965 \\cdot 0.07) = 0.003115 + 0.069755 = 0.07287',
            explanation: 'Seštevek pravih pozitivov in lažnih pozitivov v celotni populaciji.'
          },
          {
            title: '3. Končna Bayesova verjetnost',
            latex: 'P(\\text{Bolezen} \\mid +) = \\frac{0.003115}{0.07287} = 0.04275 \\quad (4.28\\%)',
            explanation: 'Pozitiven izvid pomeni le 4,3 % verjetnost dejanske bolezni.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Bayesove verjetnosti za medicinsko diagnostiko',
        defaultCode: `def bayes_diagnostika(prior, senzitivnost, lazno_pozitivni):
    # prior: P(Bolezen)
    # senzitivnost: P(+ | Bolezen)
    # lazno_pozitivni: P(+ | Zdrav)
    
    p_pravi_pozitiv = prior * senzitivnost
    p_lazni_pozitiv = (1 - prior) * lazno_pozitivni
    p_skupaj_pozitiv = p_pravi_pozitiv + p_lazni_pozitiv
    
    post = p_pravi_pozitiv / p_skupaj_pozitiv
    return post, p_skupaj_pozitiv

prior_rak = 0.0035
senz = 0.89
fp = 0.07

post_verjetnost, p_pos = bayes_diagnostika(prior_rak, senz, fp)

print(f"Apriorna verjetnost bolezni:    {prior_rak:.2%}")
print(f"Verjetnost pozitivnega izvida:  {p_pos:.2%}")
print(f"Aposteriorna verjetnost bolezni: {post_verjetnost:.2%}")`,
        description: 'Izračunajte aposteriorno verjetnost z Bayesovo formulo.',
        runCode: (code: string) => {
          return {
            output: `Apriorna verjetnost bolezni:    0.35%\nVerjetnost pozitivnega izvida:  7.29%\nAposteriorna verjetnost bolezni: 4.28%\nSklep: Kar 95.72 % vseh pozitivnih testov je v resnici lažno pozitivnih!`,
            metrics: { prior: 0.0035, p_poz: 0.0729, posterior: 0.0428 }
          };
        }
      }
    },
    {
      id: 'unit-3-4',
      unitNumber: '3.4',
      chapterId: 'chapter-3',
      title: 'Slučajne spremenljivke, pričakovana vrednost in linearne kombinacije',
      subtitle: 'E(X), Varianca Var(X) ter tveganje naložbenih portfeljev',
      leadParagraph: 'Slučajna spremenljivka X je pravilo, ki vsakemu naključnemu izidu priredi številsko vrednost (npr. znesek, ki ga študent porabi za učbenike, ali dobiček delnice). Pričakovana vrednost E(X) predstavlja dolgoročno povprečje te spremenljivke.',
      deepDive: 'Slučajna spremenljivka $X$ je pravilo, ki vsakemu naključnemu izidu priredi številsko vrednost.\n\nKljučne definicije in lastnosti:\n1. Pričakovana vrednost: $E(X) = \\sum x_i P(X = x_i)$ predstavlja dolgoročno težišče porazdelitve.\n2. Varianca in standardni odklon: $\\text{Var}(X) = \\sigma^2 = \\sum (x_i - \\mu)^2 P(X = x_i)$.\n3. Linearnost pričakovane vrednosti: za poljubni spremenljivki $X$ in $Y$ velja $E(aX + bY) = a E(X) + b E(Y)$.\n4. Varianca neodvisnih spremenljivk: $\\text{Var}(aX + bY) = a^2 \\text{Var}(X) + b^2 \\text{Var}(Y)$. Tudi pri odštevanju ($aX - bY$) se varianci seštevata, saj se skupna negotovost obeh virov povečuje!',
      mnemonic: {
        eli5: 'Pričakovana vrednost je kot težišče na gugalnici. Varianca pa pove, kako divje gugalnica niha. Če združiš dve negotovi stvari, nihanja ne moreš izničiti z odštevanjem – skupni nemir se vedno poveča!',
        anchor: 'E(aX + bY) = aE(X) + bE(Y); Za neodvisne spremenljivke: Var(aX + bY) = a²Var(X) + b²Var(Y).',
        fallacyWarning: {
          name: 'Napačno odštevanje varianc pri razlikah',
          description: 'Zmotno prepričanje, da je varianca razlike Var(X - Y) enaka Var(X) - Var(Y).',
          example: 'Če imaš negotovost pri prihodkih in negotovost pri stroških, je tvoj končni dobiček ŠE BOLJ nepredvidljiv, ne pa manj!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Pričakovanja se preprosto seštevajo; variance se kvadrirajo in vedno seštevajo.',
        simpleExplanation: 'Če vlagatelj vloži 6.000 € v delnico A (pričakovana rast 2,0 %, odklon 7,6 %) in 2.000 € v delnico B (pričakovana rast 0,2 %, odklon 4,5 %), je pričakovani mesečni donos portfelja: 6000 * 0,02 + 2000 * 0,002 = 124 €. Standardni odklon portfelja pa znaša kar 463 €, kar pomeni veliko nihanje.',
        practicalInsight: 'Celotna moderna teorija financ in optimizacije portfeljev (Harry Markowitz, Nobelova nagrada) temelji ravno na linearnih kombinacijah pričakovanj in varianc.',
        mathematicalTheory: 'Linearnost pričakovane vrednosti velja vedno: E[\\sum a_i X_i] = \\sum a_i E[X_i]. Za varianco velja \\text{Var}(\\sum a_i X_i) = \\sum a_i^2 \\text{Var}(X_i) + 2 \\sum_{i<j} a_i a_j \\text{Cov}(X_i, X_j).'
      },
      textbookWisdom: {
        simpleQuote: 'Pričakovanja se preprosto seštevajo; variance se kvadrirajo in vedno seštevajo.',
        simpleExplanation: 'Če vlagatelj vloži 6.000 € v delnico A (pričakovana rast 2,0 %, odklon 7,6 %) in 2.000 € v delnico B (pričakovana rast 0,2 %, odklon 4,5 %), je pričakovani mesečni donos portfelja: 6000 * 0,02 + 2000 * 0,002 = 124 €. Standardni odklon portfelja pa znaša kar 463 €, kar pomeni veliko nihanje.',
        practicalInsight: 'Celotna moderna teorija financ in optimizacije portfeljev (Harry Markowitz, Nobelova nagrada) temelji ravno na linearnih kombinacijah pričakovanj in varianc.',
        mathematicalTheory: 'Linearnost pričakovane vrednosti velja vedno: E[\\sum a_i X_i] = \\sum a_i E[X_i]. Za varianco velja \\text{Var}(\\sum a_i X_i) = \\sum a_i^2 \\text{Var}(X_i) + 2 \\sum_{i<j} a_i a_j \\text{Cov}(X_i, X_j).'
      },
      cueBannerText: 'Sestavite naložbeni portfelj in preučite vpliv uteži na pričakovano donosnost in varianco.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Dnevna vožnja na delo traja v povprečju 18 minut s standardnim odklonom 4 minute. Ob predpostavki neodvisnih dni, kakšen je pričakovani tedenski čas vožnje (5 dni) in njegov standardni odklon?',
        prompt: 'Uporabite pravila za vsoto 5 neodvisnih slučajnih spremenljivk W = X1 + X2 + X3 + X4 + X5:',
        options: [
          {
            id: 'opt-1',
            text: 'Pričakovani čas je 90 minut, standardni odklon pa je √80 ≈ 8,94 minute.',
            isCorrect: true,
            explanation: 'Odlično! E(W) = 5 * 18 = 90 minut. Varianca vsote je 5 * (4²) = 5 * 16 = 80, zato je standardni odklon √80 ≈ 8,94 minute (in NE 5 * 4 = 20 minut!).'
          },
          {
            id: 'opt-2',
            text: 'Pričakovani čas je 90 minut, standardni odklon pa 20 minut.',
            isCorrect: false,
            explanation: 'Napačno. Standardnih odklonov ne smemo preprosto sešteti! Seštevajo se variance.'
          },
          {
            id: 'opt-3',
            text: 'Pričakovani čas je 18 minut, standardni odklon 4 minute.',
            isCorrect: false,
            explanation: 'Napačno. To so podatki za en sam dan, ne za celoten teden.'
          }
        ],
        insight: 'Standardni odklon vsote neodvisnih dni raste s korenom števila dni: SD = σ * √n!',
        followUpExperiment: 'V simulaciji spreminjajte število dni in opazujte, kako se oži relativna razpršenost.'
      },
      mathProof: {
        summaryLatex: 'E(aX + bY) = aE(X) + bE(Y), \\quad \\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y)',
        steps: [
          {
            title: '1. Linearnost pričakovanja',
            latex: 'E[aX + bY] = \\sum (ax + by) P(X=x, Y=y) = a\\sum x P(X=x) + b\\sum y P(Y=y) = aE[X] + bE[Y]',
            explanation: 'Velja vedno, ne glede na to, ali sta spremenljivki odvisni ali neodvisni.'
          },
          {
            title: '2. Varianca linearne kombinacije za neodvisni spremenljivki',
            latex: '\\text{Var}(aX + bY) = E[((aX + bY) - (a\\mu_X + b\\mu_Y))^2] = a^2\\text{Var}(X) + b^2\\text{Var}(Y) + 2ab\\text{Cov}(X,Y)',
            explanation: 'Ker je pri neodvisnih spremenljivkah kovarianca \\text{Cov}(X,Y) = 0, se člen z medsebojnim vplivom izniči.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Pričakovana donosnost in volatilnost portfelja delnic',
        defaultCode: `import numpy as np

# Naložba v dve delnici (Caterpillar in ExxonMobil)
vloz_CAT = 6000
mu_CAT = 0.0204
sd_CAT = 0.0757
var_CAT = sd_CAT**2

vloz_XOM = 2000
mu_XOM = 0.0025
sd_XOM = 0.0455
var_XOM = sd_XOM**2

# Pričakovani mesečni donos
pricakovani_donos = vloz_CAT * mu_CAT + vloz_XOM * mu_XOM

# Varianca in standardni odklon portfelja (ob predpostavki neodvisnosti)
var_portfelj = (vloz_CAT**2) * var_CAT + (vloz_XOM**2) * var_XOM
sd_portfelj = np.sqrt(var_portfelj)

print(f"Pričakovani mesečni donos: {pricakovani_donos:.2f} €")
print(f"Varianca portfelja:        {var_portfelj:.0f} €²")
print(f"Standardni odklon (tveganje): {sd_portfelj:.2f} €")`,
        description: 'Izračunajte donosnost in standardni odklon linearne kombinacije delnic.',
        runCode: (code: string) => {
          return {
            output: `Pričakovani mesečni donos: 127.40 €\nVarianca portfelja:        213791 €²\nStandardni odklon (tveganje): 462.38 €\nSklep: Standardni odklon (462 €) krepko presega povprečni donos (127 €), kar pomeni visoko tveganje.`,
            metrics: { donos: 127.40, sd: 462.38 }
          };
        }
      }
    },
    {
      id: 'unit-3-5',
      unitNumber: '3.5',
      chapterId: 'chapter-3',
      title: 'Zvezne porazdelitve in funkcija gostote verjetnosti',
      subtitle: 'Zakaj je verjetnost točno določene točke pri zveznih podatkih enaka nič?',
      leadParagraph: 'Kadar merimo zvezne količine (npr. višino človeka ali čas do naslednjega klica), lahko vrednost zavzame neskončno mnogo decimalnih mest. Histogrami z vedno ožjimi stolpci preidejo v gladko krivuljo – funkcijo gostote verjetnosti (PDF).',
      deepDive: 'Pri zveznih spremenljivkah vrednosti zavzamejo zvezni kontinuum, zato histogrami preidejo v funkcijo gostote verjetnosti (PDF).\n\nTemeljna načela zveznih porazdelitev:\n1. Verjetnost kot ploščina: verjetnost predstavlja izključno ploščina pod krivuljo med dvema točkama: $P(a \\le X \\le b) = \\int_a^b f(x) \\, dx$.\n2. Celotna verjetnost: celotna ploščina pod krivuljo od $-\\infty$ do $+\\infty$ je natanko $1$.\n3. Verjetnost posamezne točke: za poljubno natančno točko $c$ je $P(X = c) = 0$, saj črta nima širine. Zato verjetnosti vedno računamo za intervale!',
      mnemonic: {
        eli5: 'Predstavljaj si torto: višina torte na enem samem atomu nima teže. Šele ko odrežeš kos torte določene širine (interval), dobiš oprijemljivo težo (verjetnost). Celotna torta tehta točno 1!',
        anchor: 'Zvezna verjetnost = Ploščina pod krivuljo; Verjetnost ene same točke = 0; Celotna površina = 1.',
        fallacyWarning: {
          name: 'Zamenjava vrednosti gostote f(x) z verjetnostjo',
          description: 'Prepričanje, da vrednost funkcije gostote f(x) ne sme preseči 1.',
          example: 'Gostota f(x) lahko doseže 5 ali celo 1.000 (npr. pri zelo ozki porazdelitvi), le celotna ploščina pod krivuljo mora biti enaka 1.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Pri zveznih spremenljivkah ne štejemo pik, ampak merimo površino pod zvonom.',
        simpleExplanation: 'Če preučujemo višine odraslih moških, je delež moških med 180 cm in 185 cm enak ploščini pod zvonasto krivuljo med tema dvema številkama (približno 11,6 %).',
        practicalInsight: 'Vse simulacije v fiziki, modeliranje čakalnih vrst v telekomunikacijah in ocene finančnih tveganj uporabljajo zvezne gostote verjetnosti.',
        mathematicalTheory: 'Funkcija gostote f(x) zadošča: f(x) \\ge 0 \\, \\forall x in \\int_{-\\infty}^\\infty f(x) dx = 1. Kumulativna porazdelitvena funkcija (CDF): F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t) dt.'
      },
      textbookWisdom: {
        simpleQuote: 'Pri zveznih spremenljivkah ne štejemo pik, ampak merimo površino pod zvonom.',
        simpleExplanation: 'Če preučujemo višine odraslih moških, je delež moških med 180 cm in 185 cm enak ploščini pod zvonasto krivuljo med tema dvema številkama (približno 11,6 %).',
        practicalInsight: 'Vse simulacije v fiziki, modeliranje čakalnih vrst v telekomunikacijah in ocene finančnih tveganj uporabljajo zvezne gostote verjetnosti.',
        mathematicalTheory: 'Funkcija gostote f(x) zadošča: f(x) \\ge 0 \\, \\forall x in \\int_{-\\infty}^\\infty f(x) dx = 1. Kumulativna porazdelitvena funkcija (CDF): F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t) dt.'
      },
      cueBannerText: 'Preizkusite glajenje histograma v gostoto verjetnosti in merite ploščino pod krivuljo.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če je čas čakanja na avtobus zvezno enakomerno porazdeljen med 0 in 20 minutami, kolikšna je verjetnost, da boste čakali natanko 7,00000 minut?',
        prompt: 'Pomislite na pravilo o verjetnosti posamezne točke pri zveznih podatkih:',
        options: [
          {
            id: 'opt-1',
            text: 'Točno 0, saj posamezna točka nima širine in zato zavzema ploščino 0 pod krivuljo gostote.',
            isCorrect: true,
            explanation: 'Pravilno! Pri zveznih spremenljivkah je P(X = c) = 0 za vsak posamezen c. Verjetnost obstaja le za intervale, npr. P(6,9 < X < 7,1) = 0,2 / 20 = 1 %.'
          },
          {
            id: 'opt-2',
            text: '5 % (1/20 = 0,05).',
            isCorrect: false,
            explanation: 'Napačno. 1/20 je višina funkcije gostote f(x), ne pa verjetnost ene točke!'
          },
          {
            id: 'opt-3',
            text: '35 % (7/20 = 0,35).',
            isCorrect: false,
            explanation: 'Napačno. 35 % je verjetnost, da boste čakali MANJ kot 7 minut (kumulativna verjetnost).'
          }
        ],
        insight: 'Pri zveznih porazdelitvah je verjetnost vedno ploščina intervala, nikoli višina posamezne točke!',
        followUpExperiment: 'V naslednjem poglavju 4 boste podrobno spoznali najslavnejšo zvezno porazdelitev: normalno zvonasto krivuljo.'
      },
      mathProof: {
        summaryLatex: 'P(a \\le X \\le b) = \\int_a^b f(x) \\, dx, \\quad P(X = c) = \\int_c^c f(x) \\, dx = 0',
        steps: [
          {
            title: '1. Verjetnost kot določeni integral',
            latex: 'P(a \\le X \\le b) = F(b) - F(a) = \\int_a^b f(x) dx',
            explanation: 'Verjetnost intervala je razlika kumulativnih porazdelitvenih funkcij.'
          },
          {
            title: '2. Verjetnost točke z limitnim procesom',
            latex: 'P(X = c) = \\lim_{\\epsilon \\to 0} P(c - \\epsilon \\le X \\le c + \\epsilon) = \\lim_{\\epsilon \\to 0} \\int_{c-\\epsilon}^{c+\\epsilon} f(x) dx = 0',
            explanation: 'Ker se širina intervala skrči na 0, je integral enak 0.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun ploščine pod funkcijo gostote verjetnosti',
        defaultCode: `import scipy.stats as stats

# Normalna porazdelitev višin odraslih (povprečje 175 cm, odklon 7 cm)
mu = 175
sigma = 7

# Verjetnost, da je naključna oseba visoka med 180 cm in 185 cm
p_180_185 = stats.norm.cdf(185, loc=mu, scale=sigma) - stats.norm.cdf(180, loc=mu, scale=sigma)

# Verjetnost, da je oseba višja od 190 cm
p_nad_190 = 1 - stats.norm.cdf(190, loc=mu, scale=sigma)

print(f"P(180 cm <= Višina <= 185 cm): {p_180_185:.4f} ({p_180_185*100:.2f} %)")
print(f"P(Višina > 190 cm):            {p_nad_190:.4f} ({p_nad_190*100:.2f} %)")
print(f"P(Višina == 180.000 cm):       0.0000 (točka nima ploščine)")`,
        description: 'Izračunajte verjetnosti intervalov pod zvezno normalno krivuljo.',
        runCode: (code: string) => {
          return {
            output: `P(180 cm <= Višina <= 185 cm): 0.1613 (16.13 %)\nP(Višina > 190 cm):            0.0161 (1.61 %)\nP(Višina == 180.000 cm):       0.0000 (točka nima ploščine)`,
            metrics: { p_int: 0.1613, p_tail: 0.0161, p_point: 0.0 }
          };
        }
      }
    },
    {
      id: 'unit-3-6',
      unitNumber: '3.6',
      chapterId: 'chapter-3',
      title: 'Specialne diskretne porazdelitve v naravoslovju in medicini',
      subtitle: 'Geometrijska, negativna binomska in hipergeometrična porazdelitev',
      leadParagraph: 'Poleg klasične binomske porazdelitve v naravoslovnih in kliničnih poskusih pogosto srečamo vprašanja čakalnega časa (npr. koliko pacientov moramo pregledati, da najdemo prvega primernega darovalca?) ali vzorčenja brez vračanja iz končne populacije.',
      deepDive: 'Specialne diskretne porazdelitve modelirajo specifične procese v biomedicini in naravoslovju:\n1. Geometrijska porazdelitev $\\text{Geom}(p)$: meri število neodvisnih poskusov $k$ do nastopa prvega uspeha: $P(X = k) = (1-p)^{k-1}p$, s pričakovano vrednostjo $E(X) = 1/p$.\n2. Negativna binomska porazdelitev $\\text{NB}(r, p)$: meri število poskusov $k$, potrebnih za dosego natanko $r$ uspehov: $P(X = k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}$, s pričakovano vrednostjo $E(X) = r/p$.\n3. Hipergeometrična porazdelitev $\\text{HGeom}(N, m, n)$: modelira vzorčenje $n$ enot iz končne populacije $N$ z $m$ primerki določene lastnosti BREZ vračanja: $P(X = k) = \\frac{\\binom{m}{k}\\binom{N-m}{n-k}}{\\binom{N}{n}}$, kar je temelj Fisherjevega eksaktnega testa.',
      mnemonic: {
        eli5: 'Geometrijska porazdelitev je čakanje na prvo zadeto trojko v košarki. Negativna binomska je čakanje na to, da zadaneš 4 trojke. Hipergeometrična pa je vlečenje kroglic iz klobuka, kjer izžrebanih kroglic ne vračaš nazaj!',
        anchor: 'Geom(p): čakanje na 1. uspeh (1/p); NB(r, p): čakanje na r-ti uspeh (r/p); HGeom: vzorčenje BREZ vračanja.',
        fallacyWarning: {
          name: 'Predpostavljanje neodvisnosti pri vzorčenju brez vračanja iz majhne populacije',
          description: 'Uporaba binomske formule namesto hipergeometrične pri majhnih končnih vzorcih brez vračanja.',
          example: 'Če je v ambulanti 10 bolnikov (4 s sladkorno boleznijo) in naključno izberemo 3, verjetnost drugega diabetika ni več 4/10, ampak 3/9!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če iščemo redko krvno skupino 0– (8 % populacije), moramo v povprečju pregledati 1 / 0,08 = 12,5 krvodajalcev.',
        simpleExplanation: 'Pri geometrijski porazdelitvi verjetnosti eksponentno padajo: največja možnost je, da uspemo v prvem poskusu (p), možnost za uspeh v 2. poskusu je (1-p)p, za uspeh v 3. poskusu pa (1-p)²p.',
        practicalInsight: 'V genetiki in ekologiji (npr. metoda capture-recapture za štetje prostoživečih živali) hipergeometrična porazdelitev omogoča natančno oceno celotne velikosti populacije.',
        mathematicalTheory: 'Za X ~ Geom(p) velja E(X) = 1/p in Var(X) = (1-p)/p². Za X ~ HGeom(N, m, n) velja E(X) = n(m/N) in Var(X) = n(m/N)(1 - m/N)((N-n)/(N-1)). Faktor (N-n)/(N-1) je popravek za končno populacijo (FPC).'
      },
      textbookWisdom: {
        simpleQuote: 'Če iščemo redko krvno skupino 0– (8 % populacije), moramo v povprečju pregledati 1 / 0,08 = 12,5 krvodajalcev.',
        simpleExplanation: 'Pri geometrijski porazdelitvi verjetnosti eksponentno padajo: največja možnost je, da uspemo v prvem poskusu (p), možnost za uspeh v 2. poskusu je (1-p)p, za uspeh v 3. poskusu pa (1-p)²p.',
        practicalInsight: 'V genetiki in ekologiji (npr. metoda capture-recapture za štetje prostoživečih živali) hipergeometrična porazdelitev omogoča natančno oceno celotne velikosti populacije.',
        mathematicalTheory: 'Za X ~ Geom(p) velja E(X) = 1/p in Var(X) = (1-p)/p². Za X ~ HGeom(N, m, n) velja E(X) = n(m/N) in Var(X) = n(m/N)(1 - m/N)((N-n)/(N-1)). Faktor (N-n)/(N-1) je popravek za končno populacijo (FPC).'
      },
      cueBannerText: 'Izračunajte verjetnosti čakalnega časa do uspeha in preučite vzorčenje brez vračanja.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V populaciji ima 20 % ljudi genetsko variacijo, ki povzroča zaznavanje okusa po milu pri koriandru (p = 0,20). Kolikšna je verjetnost, da je šele 3. testirana oseba prva, ki zazna ta okus?',
        prompt: 'Uporabite formulo geometrijske porazdelitve P(X = 3) = (1 - p)² * p:',
        options: [
          {
            id: 'opt-1',
            text: '12,8 % (0,80 * 0,80 * 0,20 = 0,128).',
            isCorrect: true,
            explanation: 'Odlično! Prva oseba nima variacije (0,80), druga nima (0,80), tretja pa jo ima (0,20). Skupna verjetnost je 0,80² * 0,20 = 12,8 %.'
          },
          {
            id: 'opt-2',
            text: '20,0 %, ker je verjetnost fiksna.',
            isCorrect: false,
            explanation: 'Napačno. 20 % je verjetnost, da uspe že PRVA oseba. Da uspemo šele v 3. poskusu, morata prvi dve zgrešiti.'
          },
          {
            id: 'opt-3',
            text: '6,4 %.',
            isCorrect: false,
            explanation: 'Napačno. To bi veljalo za štiri poskuse z drugačnimi parametri.'
          }
        ],
        insight: 'Pri geometrijski porazdelitvi je pričakovano število testiranj E(X) = 1/0,20 = 5 oseb.',
        followUpExperiment: 'V naslednjem poglavju 4 boste spoznali zvezne porazdelitve ter normalno aproksimacijo diskretnih modelov.'
      },
      mathProof: {
        summaryLatex: 'P(X = k) = (1-p)^{k-1}p, \\quad \\sum_{k=1}^\\infty (1-p)^{k-1}p = p \\frac{1}{1 - (1-p)} = 1',
        steps: [
          {
            title: '1. Vsota verjetnosti geometrijske vrste',
            latex: '\\sum_{k=1}^\\infty P(X = k) = p \\sum_{j=0}^\\infty (1-p)^j = p \\cdot \\frac{1}{1 - (1-p)} = \\frac{p}{p} = 1',
            explanation: 'Vsota vseh neskončno mnogo izidov geometrijske porazdelitve je natanko 1.'
          },
          {
            title: '2. Izpeljava pričakovane vrednosti',
            latex: 'E(X) = \\sum_{k=1}^\\infty k (1-p)^{k-1}p = p \\frac{d}{d(1-p)}\\left( \\sum_{k=0}^\\infty (1-p)^k \\right) = \\frac{1}{p}',
            explanation: 'Pričakovani čas do prvega uspeha je obratna vrednost verjetnosti uspeha.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Geometrijska in hipergeometrična porazdelitev v praksi',
        defaultCode: `import scipy.stats as stats

# 1. Geometrijska: iskanje darovalca s krvno skupino 0- (p = 0.08)
p_0neg = 0.08
p_tretji = stats.geom.pmf(3, p_0neg)
pricakovano_stevilo = 1 / p_0neg

# 2. Hipergeometrična: 4 označene srne med 9 v gozdu (N=9, m=4, n=3)
# Kolikšna je verjetnost, da v vzorcu 3 ujamemo točno 1 označeno?
p_hiper = stats.hypergeom.pmf(k=1, M=9, n=4, N=3)

print(f"P(prvi 0- darovalec je 3. v vrsti): {p_tretji:.4f} ({p_tretji*100:.2f} %)")
print(f"Pričakovano število darovalcev do 0-: {pricakovano_stevilo:.1f} oseb")
print(f"P(v vzorcu 3 srn je 1 označena):     {p_hiper:.4f} ({p_hiper*100:.2f} %)")`,
        description: 'Izračunajte verjetnosti geometrijske in hipergeometrične porazdelitve.',
        runCode: (code: string) => {
          return {
            output: `P(prvi 0- darovalec je 3. v vrsti): 0.0677 (6.77 %)\nPričakovano število darovalcev do 0-: 12.5 oseb\nP(v vzorcu 3 srn je 1 označena):     0.4762 (47.62 %)`,
            metrics: { p_geom: 0.0677, expected: 12.5, p_hyper: 0.4762 }
          };
        }
      }
    }
  ]
};
