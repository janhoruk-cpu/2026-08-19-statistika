import { ChapterConfig } from '../../types';

export const chapter5: ChapterConfig = {
  id: 'chapter-5',
  chapterNumber: 5,
  title: '5. Poglavje: Temelji statističnega sklepanja',
  subtitle: 'Centralni limitni izrek, intervali zaupanja, p-vrednosti in testiranje hipotez',
  description: 'Kako na podlagi nepopolnega vzorca z matematično gotovostjo sklepati o celotni populaciji? Spoznajte centralni limitni izrek (CLT), obvladajte gradnjo 95 % intervalov zaupanja, izračunajte standardno napako (SE) ter obvladajte preverjanje hipotez in tveganja napak tipa I in tipa II.',
  iconName: 'Compass',
  color: '#d97706',
  units: [
    {
      id: 'unit-5-1',
      unitNumber: '5.1',
      chapterId: 'chapter-5',
      title: 'Točkovne ocene in Centralni limitni izrek (CLT)',
      subtitle: 'Vzorčna porazdelitev povprečij in standardna napaka (SE = σ / √n)',
      leadParagraph: 'Ko izberemo naključni vzorec iz populacije, je vzorčno povprečje \\bar{x} naša najboljša točkovna ocena za pravo populacijsko povprečje \\mu. Če bi vzorčenje ponovili tisočkrat, bi vsak vzorec dal nekoliko drugačno povprečje. Porazdelitev vseh teh vzorčnih povprečij imenujemo vzorčna porazdelitev.',
      deepDive: 'Centralni limitni izrek (CLT) zagotavlja, da vzorčna porazdelitev povprečij $\\bar{x}$ pri velikem vzorcu ($n \\ge 30$) konvergira k normalni porazdelitvi $N(\\mu, \\text{SE})$.\n\nTemeljne značilnosti vzorčne porazdelitve:\n1. Središče porazdelitve: pričakovana vrednost vzorčnega povprečja je natanko enaka pravemu populacijskemu parametru $E[\\bar{X}] = \\mu$.\n2. Standardna napaka (SE): $\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$ meri povprečno nihanje ocene okoli pravega parametra.\n3. Pravilo kvadratnega korena: za prepolovitev standardne napake moramo velikost vzorca povečati za 4-krat ($2^2 = 4$).',
      mnemonic: {
        eli5: 'Predstavljaj si zbor pevcev: posamezni pevci lahko pojejo precej neubrano ali piskavo. Ko pa poje zbor 100 pevcev skupaj (povprečje), se vsi posamezni zdrsi med seboj izničijo in nastane popolnoma čist, gladek zvonast zvok!',
        anchor: 'CLT: Vzorčna povprečja vedno tvorijo normalno krivuljo N(μ, σ/√n), ko je n dovolj velik.',
        fallacyWarning: {
          name: 'Zamenjava standardnega odklona (SD) in standardne napake (SE)',
          description: 'Zamenjava razpršenosti posameznikov (SD) z natančnostjo vzorčnega povprečja (SE).',
          example: 'Standardni odklon SD opisuje, kako različni so ljudje med seboj (npr. višine: SD = 7 cm). Standardna napaka SE pa meri natančnost naše ocene povprečja (za vzorec 100 ljudi: SE = 7 / √100 = 0,7 cm)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Posamezniki so lahko divji in nepredvidljivi, njihova povprečja pa se vedno podredijo Gaussovemu zvonu.',
        simpleExplanation: 'Če merimo čas teka na 10 km, kjer je populacija močno desno asimetrična s povprečjem \\mu = 55 min in \\sigma = 12 min, bo vzorec 100 tekačev imel vzorčno povprečje \\bar{x}, ki sledi skoraj popolni normalni porazdelitvi s povprečjem 55 min in standardno napako SE = 12 / \\sqrt{100} = 1,2 minute.',
        practicalInsight: 'Brez CLT statistično sklepanje v resničnem svetu ne bi bilo mogoče, saj skoraj noben naravni pojav v populaciji ni strogo idealno normalno porazdeljen.',
        mathematicalTheory: 'Centralni limitni izrek: Za neodvisne, enako porazdeljene slučajne spremenljivke X_1, \\dots, X_n s končnim povprečjem \\mu in varianco \\sigma^2 velja: \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} N(0, 1) ob n \\to \\infty.'
      },
      textbookWisdom: {
        simpleQuote: 'Posamezniki so lahko divji in nepredvidljivi, njihova povprečja pa se vedno podredijo Gaussovemu zvonu.',
        simpleExplanation: 'Če merimo čas teka na 10 km, kjer je populacija močno desno asimetrična s povprečjem \\mu = 55 min in \\sigma = 12 min, bo vzorec 100 tekačev imel vzorčno povprečje \\bar{x}, ki sledi skoraj popolni normalni porazdelitvi s povprečjem 55 min in standardno napako SE = 12 / \\sqrt{100} = 1,2 minute.',
        practicalInsight: 'Brez CLT statistično sklepanje v resničnem svetu ne bi bilo mogoče, saj skoraj noben naravni pojav v populaciji ni strogo idealno normalno porazdeljen.',
        mathematicalTheory: 'Centralni limitni izrek: Za neodvisne, enako porazdeljene slučajne spremenljivke X_1, \\dots, X_n s končnim povprečjem \\mu in varianco \\sigma^2 velja: \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} N(0, 1) ob n \\to \\infty.'
      },
      cueBannerText: 'Spreminjajte velikost vzorca n in opazujte, kako vzorčna porazdelitev konvergira v gladek zvon.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi dohodkov z vzorcem n = 100 je standardna napaka ocene povprečja znašala SE = 100 €. Kolikšen mora biti vzorec n, če želimo standardno napako zmanjšati na 50 €?',
        prompt: 'Pomislite na korensko odvisnost SE = σ / √n:',
        options: [
          {
            id: 'opt-1',
            text: 'n = 400 (vzorec moramo povečati za 4-krat, ker je √400 = 20, kar prepolovi napako).',
            isCorrect: true,
            explanation: 'Odlično! Ker je n pod kvadratnim korenom, zmanjšanje napake na polovico (faktor 2) zahteva 2² = 4-krat večji vzorec: 100 * 4 = 400.'
          },
          {
            id: 'opt-2',
            text: 'n = 200 (preprosto podvojimo vzorec).',
            isCorrect: false,
            explanation: 'Napačno. Podvojitev vzorca zmanjša napako le za faktor √2 ≈ 1,41, ne pa za 2.'
          },
          {
            id: 'opt-3',
            text: 'n = 50.',
            isCorrect: false,
            explanation: 'Napačno. Manjši vzorec bi napako povečal, ne zmanjšal.'
          }
        ],
        insight: 'Zakon padajočih donosov pri vzorčenju: za vsako podvojitev natančnosti potrebujemo 4-krat več podatkov!',
        followUpExperiment: 'V simulaciji spreminjajte n med 25, 100 in 400 ter opazujte oženje zvonaste krivulje.'
      },
      mathProof: {
        summaryLatex: '\\bar{X} \\sim N\\left(\\mu, \\, \\text{SE} = \\frac{\\sigma}{\\sqrt{n}}\\right), \\quad \\text{SE} \\approx \\frac{s}{\\sqrt{n}}',
        steps: [
          {
            title: '1. Pričakovana vrednost vzorčnega povprečja',
            latex: 'E[\\bar{X}] = E\\left[\\frac{1}{n} \\sum_{i=1}^n X_i\\right] = \\frac{1}{n} \\sum_{i=1}^n E[X_i] = \\frac{1}{n} (n \\mu) = \\mu',
            explanation: 'Vzorčno povprečje je nepristranska točkovna ocena populacijskega povprečja.'
          },
          {
            title: '2. Izpeljava standardne napake (SE)',
            latex: '\\text{Var}(\\bar{X}) = \\text{Var}\\left(\\frac{1}{n} \\sum X_i\\right) = \\frac{1}{n^2} \\sum \\text{Var}(X_i) = \\frac{n\\sigma^2}{n^2} = \\frac{\\sigma^2}{n} \\implies \\text{SE} = \\frac{\\sigma}{\\sqrt{n}}',
            explanation: 'Zaradi neodvisnosti se variance seštejejo, deljenje z n² pa da varianco vzorčnega povprečja \\sigma²/n.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Demonstracija centralnega limitnega izreka (CLT)',
        defaultCode: `import numpy as np

# Populacija z močno eksponentno asimetrijo (populacijsko povprečje = 5.0)
n_poskusov = 5000
velikosti_vzorca = [5, 30, 100]

print("Velikost n | Povprečje vzorčnih povprečij | Teoretični SE | Simulirani SE")
print("-" * 70)

for n in velikosti_vzorca:
    # 5.000 vzorcev velikosti n
    vzorci = np.random.exponential(scale=5.0, size=(n_poskusov, n))
    povprecja = vzorci.mean(axis=1)
    
    sim_mean = np.mean(povprecja)
    sim_se = np.std(povprecja, ddof=1)
    teor_se = 5.0 / np.sqrt(n)
    
    print(f"n = {n:3d}    | {sim_mean:27.3f} | {teor_se:13.3f} | {sim_se:13.3f}")`,
        description: 'Simulirajte tisoče vzorcev iz asimetrične populacije in opazujte normalizacijo ter SE.',
        runCode: (code: string) => {
          return {
            output: `Velikost n | Povprečje vzorčnih povprečij | Teoretični SE | Simulirani SE\n----------------------------------------------------------------------\nn =   5    |                       4.992 |         2.236 |         2.241\nn =  30    |                       5.004 |         0.913 |         0.911\nn = 100    |                       4.998 |         0.500 |         0.498\nSklep: Že pri n = 30 je vzorčna porazdelitev skoraj popolnoma normalna!`,
            metrics: { se_5: 2.236, se_30: 0.913, se_100: 0.500 }
          };
        }
      }
    },
    {
      id: 'unit-5-2',
      unitNumber: '5.2',
      chapterId: 'chapter-5',
      title: 'Intervali zaupanja za povprečje',
      subtitle: 'Točkovna ocena ± meja napake (z* × SE) ter pravilna interpretacija 95 % zaupanja',
      leadParagraph: 'Točkovna ocena (npr. \\bar{x} = 24,8 let) je le ena sama številka, ki skoraj nikoli ne zadene natančnega populacijskega parametra. Zato zgradimo interval zaupanja (Confidence Interval), ki z izbrano stopnjo gotovosti (npr. 95 %) uokviri neznani parameter.',
      deepDive: 'Interval zaupanja za povprečje izračunamo po formuli: $\\text{Interval} = \\text{Točkovna ocena} \\pm \\text{Meja napake} = \\bar{x} \\pm z^* \\cdot \\text{SE}$.\n\nKljučni nivoji zaupanja in kritične vrednosti:\n1. 90 % zaupanje: $z^* = 1,645$\n2. 95 % zaupanje: $z^* = 1,960$\n3. 99 % zaupanje: $z^* = 2,576$\n\nPravilna interpretacija: z 95 % gotovostjo trdimo, da metoda pri večkratnem ponavljanju v 95 od 100 primerov zanesljivo zajame fiksni neznani parameter $\\mu$.',
      mnemonic: {
        eli5: 'Predstavljaj si metanje obroča na fiksiran količek v temi: količek (pravi parameter) se nikoli ne premika. Vsak tvoj met (interval) je nekoliko drugačen. Pri 95 % zaupanju tvoj obroč uspešno zajame količek v 95 od 100 metov!',
        anchor: 'Interval = Točkovna ocena ± z* * SE; 95 % zaupanje → z* = 1.96; 99 % zaupanje → z* = 2.58.',
        fallacyWarning: {
          name: 'Napačna verjetnostna interpretacija izračunanega intervala',
          description: 'Trditev, da po izračunu intervala npr. [15, 25] obstaja »95 % verjetnost, da je μ med 15 in 25«.',
          example: 'Ko je interval enkrat izračunan, parameter bodisi JE v njem (100 %) bodisi NI (0 %). 95 % se nanaša na zanesljivost METODE na dolgi rok!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Interval zaupanja je ribiška mreža: širša kot je mreža (višje zaupanje), večja je gotovost, da smo ujeli resnico.',
        simpleExplanation: 'Če je vzorčno povprečje študentov \\bar{x} = 44,2 ure študija tedensko (s = 18,1 h, n = 100), je SE = 18,1 / 10 = 1,81 h. 95 % interval zaupanja je: 44,2 ± 1,96 * 1,81 = [40,65 h; 47,75 h]. Z 95 % zaupanjem trdimo, da je povprečni čas študija vseh študentov med 40,65 in 47,75 ure.',
        practicalInsight: 'V farmaciji regulatorne agencije (EMA, FDA) zahtevajo 95 % intervale zaupanja za dokazovanje, da novo zdravilo zniža krvni tlak vsaj za določen prag.',
        mathematicalTheory: 'P(\\bar{X} - z^* \\text{SE} \\le \\mu \\le \\bar{X} + z^* \\text{SE}) = 1 - \\alpha. Zahtevana velikost vzorca za izbrano mejo napake ME: n = \\left(\\frac{z^* \\sigma}{\\text{ME}}\\right)^2.'
      },
      textbookWisdom: {
        simpleQuote: 'Interval zaupanja je ribiška mreža: širša kot je mreža (višje zaupanje), večja je gotovost, da smo ujeli resnico.',
        simpleExplanation: 'Če je vzorčno povprečje študentov \\bar{x} = 44,2 ure študija tedensko (s = 18,1 h, n = 100), je SE = 18,1 / 10 = 1,81 h. 95 % interval zaupanja je: 44,2 ± 1,96 * 1,81 = [40,65 h; 47,75 h]. Z 95 % zaupanjem trdimo, da je povprečni čas študija vseh študentov med 40,65 in 47,75 ure.',
        practicalInsight: 'V farmaciji regulatorne agencije (EMA, FDA) zahtevajo 95 % intervale zaupanja za dokazovanje, da novo zdravilo zniža krvni tlak vsaj za določen prag.',
        mathematicalTheory: 'P(\\bar{X} - z^* \\text{SE} \\le \\mu \\le \\bar{X} + z^* \\text{SE}) = 1 - \\alpha. Zahtevana velikost vzorca za izbrano mejo napake ME: n = \\left(\\frac{z^* \\sigma}{\\text{ME}}\\right)^2.'
      },
      cueBannerText: 'Spreminjajte stopnjo zaupanja (90 %, 95 %, 99 %) in opazujte širjenje intervala ter zajem parametra.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Politik želi oceniti svojo podporo z mejo napake ME = ±2 % pri 95 % zaupanju (z* = 1,96). Ob predpostavki najvišje negotovosti p = 0,5, koliko volivcev mora vključiti v anketo?',
        prompt: 'Uporabite formulo n = (z* / ME)² * p(1 - p):',
        options: [
          {
            id: 'opt-1',
            text: 'n ≈ 2.401 volivcev ((1,96 / 0,02)² * 0,25 = 98² * 0,25 = 2.401).',
            isCorrect: true,
            explanation: 'Odlično! n = (1,96 / 0,02)² * 0,5 * 0,5 = 98² * 0,25 = 9604 * 0,25 = 2.401 anketirancev.'
          },
          {
            id: 'opt-2',
            text: 'n = 500 volivcev.',
            isCorrect: false,
            explanation: 'Napačno. Pri 500 anketirancih bi bila meja napake kar ±4,4 %.'
          },
          {
            id: 'opt-3',
            text: 'n = 100 volivcev.',
            isCorrect: false,
            explanation: 'Napačno. Premalo za mejo napake ±2 %.'
          }
        ],
        insight: 'Za majhno mejo napake (±2 %) je potreben reprezentativen vzorec več tisoč enot!',
        followUpExperiment: 'V simulaciji preizkusite različne meje napake in izračunajte potreben n.'
      },
      mathProof: {
        summaryLatex: '\\text{CI}_{95\\%} = \\left[ \\bar{x} - 1.96 \\frac{s}{\\sqrt{n}}, \\, \\bar{x} + 1.96 \\frac{s}{\\sqrt{n}} \\right]',
        steps: [
          {
            title: '1. Standardizacija pod centralnim limitnim izrekom',
            latex: 'P\\left(-1.96 \\le \\frac{\\bar{X} - \\mu}{\\text{SE}} \\le +1.96\\right) = 0.95',
            explanation: 'Področje med -1,96 in +1,96 zajema natanko 95 % ploščine normalne porazdelitve.'
          },
          {
            title: '2. Preurejanje neenačbe za populacijski parameter',
            latex: 'P(\\bar{X} - 1.96 \\cdot \\text{SE} \\le \\mu \\le \\bar{X} + 1.96 \\cdot \\text{SE}) = 0.95',
            explanation: 'Z algebarskim preureditvijo uokvirimo fiksni neznani parameter \\mu.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Gradnja 100 intervalov zaupanja in preverjanje stopnje pokritja',
        defaultCode: `import numpy as np

# Populacijski parameter mu = 100, sigma = 15
mu_resnicni = 100.0
sigma = 15.0
n = 50
z_star = 1.96
se = sigma / np.sqrt(n)

n_sim = 100
np.random.seed(42)
zajeti_intervali = 0

for _ in range(n_sim):
    vzorec = np.random.normal(loc=mu_resnicni, scale=sigma, size=n)
    x_bar = vzorec.mean()
    spodnja = x_bar - z_star * se
    zgornja = x_bar + z_star * se
    
    if spodnja <= mu_resnicni <= zgornja:
        zajeti_intervali += 1

print(f"Število simuliranih intervalov: {n_sim}")
print(f"Število intervalov, ki so uokvirili mu=100: {zajeti_intervali}")
print(f"Dejanski delež pokritja: {zajeti_intervali / n_sim * 100:.1f} % (teoretično 95 %)")`,
        description: 'Preizkusite simulacijo 100 intervalov zaupanja in opazujte delež zadetkov.',
        runCode: (code: string) => {
          return {
            output: `Število simuliranih intervalov: 100\nŠtevilo intervalov, ki so uokvirili mu=100: 96\nDejanski delež pokritja: 96.0 % (teoretično 95 %)\nSklep: 95 % intervalov v praksi res zajame pravi parameter!`,
            metrics: { n_sim: 100, covered: 96, pct: 96.0 }
          };
        }
      }
    },
    {
      id: 'unit-5-3',
      unitNumber: '5.3',
      chapterId: 'chapter-5',
      title: 'Preverjanje hipotez in p-vrednost',
      subtitle: 'Ničelna hipoteza H₀, alternativa Hₐ, testna statistika Z ter prag značilnosti α',
      leadParagraph: 'Preverjanje hipotez je temelj znanstvene metode. Predstavlja postopek, s katerim na podlagi podatkov ocenimo, ali je določen učinek (npr. znižanje holesterola z novim zdravilom) resničen ali pa gre zgolj za naključno nihanje.',
      deepDive: 'Preverjanje hipotez primerja empirične podatke z ničelno domnevo:\n1. Ničelna hipoteza $H_0$: privzeta trditev brez učinka ali spremembe (status quo, $\\mu = \\mu_0$).\n2. Alternativna hipoteza $H_A$: trditev raziskovalca o obstoju učinka ($\\mu \\ne \\mu_0$ ali $\\mu < \\mu_0$).\n3. Testna statistika $Z$: $Z = \\frac{\\text{Točkovna ocena} - \\text{Ničelna vrednost}}{\\text{SE}} = \\frac{\\bar{x} - \\mu_0}{\\text{SE}}$.\n4. P-vrednost in odločitev: verjetnost, da bi ob veljavni $H_0$ dobili tako ali še bolj skrajno odstopanje. Če je $p < \\alpha$ (npr. $\\alpha = 0,05$), zavrnemo $H_0$ v prid $H_A$.',
      mnemonic: {
        eli5: 'Preverjanje hipotez je kot sojenje na sodišču: obtoženec velja za nedolžnega (H0), dokler tožilstvo ne predloži tako prepričljivih dokazov, da bi bilo njihovo naključno pojavljanje skrajno neverjetno (p < 0,05). Če ni dovolj dokazov, sodišče reče »ni dokazano kriv«, ne pa »dokazano nedolžen«!',
        anchor: 'Z = (x̄ - μ₀) / SE; Če je p < α → Zavrni H₀; Če je p ≥ α → Ne zavrni H₀.',
        fallacyWarning: {
          name: 'Trditev, da smo z ne-zavrnitvijo »dokazali ničelno hipotezo«',
          description: 'Zmotno prepričanje, da p ≥ 0,05 dokazuje, da razlike sploh ni.',
          example: 'Odsotnost dokaza o razliki ni dokaz o odsotnosti razlike! Morda je bil vzorec le premajhen, da bi zaznal majhen učinek.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če je p-vrednost majhna, se je zgodil statistični čudež pod H₀ – zato ničelno hipotezo zavržemo.',
        simpleExplanation: 'Študenti trdijo, da spijo manj kot priporočenih 8 ur na noč (H0: \\mu = 8 h proti HA: \\mu < 8 h). V vzorcu 110 študentov je povprečje \\bar{x} = 7,42 h (s = 1,75 h, SE = 0,167 h). Testna statistika je Z = (7,42 - 8) / 0,167 = -3,47. P-vrednost je 0,0003. Ker je 0,0003 krepko manj kot 0,05, odločno zavrnemo H0: študenti statistično značilno spijo manj kot 8 ur.',
        practicalInsight: 'V A/B testiranju tehnoloških podjetij (Netflix, Amazon, Booking) p-vrednosti odločajo o tem, ali bo nova oblika gumba ali priporočilni algoritem poslan vsem uporabnikom.',
        mathematicalTheory: 'Za dvostranski test: p\\text{-vrednost} = 2 \\cdot P(Z \\ge |Z_{obs}|) = 2(1 - \\Phi(|Z_{obs}|)). Zveznost z intervali zaupanja: Za dvostranski test z nivojem \\alpha zavrnemo H0: \\mu = \\mu_0 natanko tedaj, ko \\mu_0 leži izven (1 - \\alpha) intervala zaupanja.'
      },
      textbookWisdom: {
        simpleQuote: 'Če je p-vrednost majhna, se je zgodil statistični čudež pod H₀ – zato ničelno hipotezo zavržemo.',
        simpleExplanation: 'Študenti trdijo, da spijo manj kot priporočenih 8 ur na noč (H0: \\mu = 8 h proti HA: \\mu < 8 h). V vzorcu 110 študentov je povprečje \\bar{x} = 7,42 h (s = 1,75 h, SE = 0,167 h). Testna statistika je Z = (7,42 - 8) / 0,167 = -3,47. P-vrednost je 0,0003. Ker je 0,0003 krepko manj kot 0,05, odločno zavrnemo H0: študenti statistično značilno spijo manj kot 8 ur.',
        practicalInsight: 'V A/B testiranju tehnoloških podjetij (Netflix, Amazon, Booking) p-vrednosti odločajo o tem, ali bo nova oblika gumba ali priporočilni algoritem poslan vsem uporabnikom.',
        mathematicalTheory: 'Za dvostranski test: p\\text{-vrednost} = 2 \\cdot P(Z \\ge |Z_{obs}|) = 2(1 - \\Phi(|Z_{obs}|)). Zveznost z intervali zaupanja: Za dvostranski test z nivojem \\alpha zavrnemo H0: \\mu = \\mu_0 natanko tedaj, ko \\mu_0 leži izven (1 - \\alpha) intervala zaupanja.'
      },
      cueBannerText: 'Izračunajte testno statistiko Z ter opazujte senčenje površine p-vrednosti v repih.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Pri dvostranskem testu hipotez H0: μ = 100 proti HA: μ ≠ 100 dobimo testno statistiko Z = +2,33. Kakšna je p-vrednost in kakšen je sklep pri α = 0,05?',
        prompt: 'P(Z ≥ 2,33) = 0,01. Ker je test dvostranski, pomnožite verjetnost repa z 2:',
        options: [
          {
            id: 'opt-1',
            text: 'p = 0,02 (2 * 0,01 = 0,02); Ker je p = 0,02 < 0,05, zavrnemo ničelno hipotezo H0.',
            isCorrect: true,
            explanation: 'Odlično! Pri dvostranskem testu seštejemo oba repa: 2 * 0,0099 ≈ 0,02. Ker je p < 0,05, imamo statistično značilen dokaz za razliko od 100.'
          },
          {
            id: 'opt-2',
            text: 'p = 0,01; Ne uspemo zavrniti H0.',
            isCorrect: false,
            explanation: 'Napačno. Pozabili ste podvojiti rep za dvostranski test, poleg tega pa 0,01 pomeni zavrnitev H0.'
          },
          {
            id: 'opt-3',
            text: 'p = 0,98; Sprejmemo H0.',
            isCorrect: false,
            explanation: 'Napačno. 0,98 je leva površina pod krivuljo, p-vrednost pa merijo repi.'
          }
        ],
        insight: 'Pri dvostranskih testih moramo vedno upoštevati odstopanja v obe smeri (2 * rep)!',
        followUpExperiment: 'V simulaciji primerjajte enostranski in dvostranski test za isto vrednost Z.'
      },
      mathProof: {
        summaryLatex: 'Z = \\frac{\\bar{x} - \\mu_0}{\\text{SE}}, \\quad p\\text{-vrednost} = 2 \\cdot (1 - \\Phi(|Z|))',
        steps: [
          {
            title: '1. Standardizacija pod predpostavko veljavnosti H0',
            latex: 'Z = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}',
            explanation: 'Izmerjeno razliko med vzorčnim povprečjem in predpostavljeno ničelno vrednostjo delimo s standardno napako.'
          },
          {
            title: '2. Izračun ploščine repov (dvostranski test)',
            latex: 'p = P(Z \\le -|Z_{obs}|) + P(Z \\ge +|Z_{obs}|) = 2 \\Phi(-|Z_{obs}|)',
            explanation: 'Verjetnost, da bi po čistem naključju dobili vsaj tako ekstremno razliko v katerokoli smer.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Dvostranski Z-test hipotez za povprečje',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Primer: ali študenti spijo manj kot 8 ur?
mu_0 = 8.0 # Ničelna vrednost
x_bar = 7.42 # Vzorčno povprečje
s = 1.75 # Vzorčni odklon
n = 110 # Velikost vzorca

se = s / np.sqrt(n)
z_stat = (x_bar - mu_0) / se

# Enostranska p-vrednost (HA: mu < 8)
p_enostranska = stats.norm.cdf(z_stat)

# Dvostranska p-vrednost (HA: mu != 8)
p_dvostranska = 2 * stats.norm.cdf(-abs(z_stat))

print(f"Standardna napaka SE:    {se:.4f} h")
print(f"Testna statistika Z:     {z_stat:+.2f}")
print(f"Enostranska p-vrednost:  {p_enostranska:.5f}")
print(f"Dvostranska p-vrednost:  {p_dvostranska:.5f}")
if p_dvostranska < 0.05:
    print("Sklep: Zavrnemo H0 pri alfa = 0.05! Študenti statistično značilno spijo manj.")`,
        description: 'Izračunajte testno statistiko Z in p-vrednost za eno- in dvostranski test.',
        runCode: (code: string) => {
          return {
            output: `Standardna napaka SE:    0.1669 h\nTestna statistika Z:     -3.48\nEnostranska p-vrednost:  0.00025\nDvostranska p-vrednost:  0.00051\nSklep: Zavrnemo H0 pri alfa = 0.05! Študenti statistično značilno spijo manj.`,
            metrics: { se: 0.1669, z: -3.48, p_val: 0.00051 }
          };
        }
      }
    },
    {
      id: 'unit-5-4',
      unitNumber: '5.4',
      chapterId: 'chapter-5',
      title: 'Statistične napake (Tip I in Tip II) in moč testa',
      subtitle: 'Lažni alarm (α), spregledan učinek (β) ter verjetnost uspešnega odkritja (1 - β)',
      leadParagraph: 'Ker statistično odločanje temelji na vzorcih z naključnimi nihanji, nobena odločitev ni 100 % imuna pred napako. Poznamo dve vrsti napak: napako tipa I (lažni alarm) in napako tipa II (spregledan učinek).',
      deepDive: 'Pri statističnem odločanju se soočamo z dvema vrstama napak in močjo testa:\n1. Napaka tipa I (Type I Error, $\\alpha$): zavrnitev resnične ničelne hipoteze $H_0$ (lažno pozitiven izvid).\n2. Napaka tipa II (Type II Error, $\\beta$): ne-zavrnitev napačne ničelne hipoteze $H_0$ (spregledana resnična razlika).\n3. Statistična moč (Power, $1 - \\beta$): verjetnost, da pravilno zaznamo resnični učinek (običajno načrtujemo $\\ge 80\\,\\%$).\n4. Povečanje moči: moč testa povečamo z večjim vzorcem $n$, večjim dejanskim učinkom ali višjim pragom $\\alpha$.',
      mnemonic: {
        eli5: 'Napaka tipa I je lažni požarni alarm (ni požara, a vsi tečejo ven). Napaka tipa II pa je odpoved alarma (hiša gori, a alarm molči). Moč testa (1 - β) je zanesljivost alarma, da bo res zapiskal ob pravem ognju!',
        anchor: 'Tip I = Zavrnitev resnične H₀ (α); Tip II = Ne-zavrnitev napačne H₀ (β); Moč testa = 1 - β.',
        fallacyWarning: {
          name: 'Nezadostna moč študije (Underpowered Studies)',
          description: 'Izvedba poskusa na premajhnem vzorcu (npr. n = 15), kjer je moč testa le 20 %.',
          example: 'Če je moč študije le 20 %, bo raziskovalec v 80 % primerov zgrešil resnično delujoče zdravilo in napačno sklenil, da ne deluje!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Večji vzorec je kot močnejši mikroskop: z njim zanesljivo zaznamo tudi najmanjše delce resnice.',
        simpleExplanation: 'Če znižamo nivo tveganja \\alpha z 0,05 na 0,01, zmanjšamo možnost lažnega alarma, a s tem otežimo zavrnitev H0 in s tem neizogibno povečamo verjetnost napake tipa II (\\beta), razen če hkrati povečamo velikost vzorca n.',
        practicalInsight: 'Klinične študije novih zdravil morajo pred začetkom vnaprej dokazati, da imajo z izbranim številom bolnikov vsaj 80 % moč za zaznavo klinično pomembnega izboljšanja.',
        mathematicalTheory: 'Moč testa: 1 - \\beta = P\\left(Z \\ge z_{1-\\alpha} - \\frac{|\\mu_A - \\mu_0|}{\\sigma / \\sqrt{n}}\\right). Za dosego moči 1 - \\beta pri učinku \\delta: n = \\frac{(z_{1-\\alpha/2} + z_{1-\\beta})^2 \\sigma^2}{\\delta^2}.'
      },
      textbookWisdom: {
        simpleQuote: 'Večji vzorec je kot močnejši mikroskop: z njim zanesljivo zaznamo tudi najmanjše delce resnice.',
        simpleExplanation: 'Če znižamo nivo tveganja \\alpha z 0,05 na 0,01, zmanjšamo možnost lažnega alarma, a s tem otežimo zavrnitev H0 in s tem neizogibno povečamo verjetnost napake tipa II (\\beta), razen če hkrati povečamo velikost vzorca n.',
        practicalInsight: 'Klinične študije novih zdravil morajo pred začetkom vnaprej dokazati, da imajo z izbranim številom bolnikov vsaj 80 % moč za zaznavo klinično pomembnega izboljšanja.',
        mathematicalTheory: 'Moč testa: 1 - \\beta = P\\left(Z \\ge z_{1-\\alpha} - \\frac{|\\mu_A - \\mu_0|}{\\sigma / \\sqrt{n}}\\right). Za dosego moči 1 - \\beta pri učinku \\delta: n = \\frac{(z_{1-\\alpha/2} + z_{1-\\beta})^2 \\sigma^2}{\\delta^2}.'
      },
      cueBannerText: 'Spreminjajte velikost učinka in velikost vzorca ter opazujte povečanje moči testa (1 - β).',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če v raziskavi zvišamo nivo značilnosti α z 0,01 na 0,05 (lažje zavrnemo H0), kaj se zgodi z verjetnostjo napake tipa II (β) in močjo testa (1 - β)?',
        prompt: 'Pomislite na kompromis med strogostjo in občutljivostjo testa:',
        options: [
          {
            id: 'opt-1',
            text: 'Verjetnost napake tipa II (β) se zmanjša, moč testa (1 - β) pa se poveča.',
            isCorrect: true,
            explanation: 'Odlično! Ko zvišamo prag α, je test bolj občutljiv, zato lažje zazna resnične učinke (manj spregledov, večja moč).'
          },
          {
            id: 'opt-2',
            text: 'Obe napaki se hkrati zmanjšata.',
            isCorrect: false,
            explanation: 'Napačno. Obe napaki se lahko hkrati zmanjšata le, če povečamo velikost vzorca n!'
          },
          {
            id: 'opt-3',
            text: 'Moč testa se zmanjša.',
            isCorrect: false,
            explanation: 'Napačno. Moč se poveča.'
          }
        ],
        insight: 'Brez povečanja vzorca je zmanjšanje ene napake vedno plačano s povečanjem druge!',
        followUpExperiment: 'V naslednjem poglavju 6 boste spoznali uporabo teh konceptov na kategoričnih podatkih.'
      },
      mathProof: {
        summaryLatex: '\\text{Moč} = 1 - \\beta = \\Phi\\left( \\frac{|\\mu_A - \\mu_0|}{\\sigma/\\sqrt{n}} - z_{1-\\alpha/2} \\right)',
        steps: [
          {
            title: '1. Meja zavrnitve pod ničelno porazdelitvijo H0',
            latex: 'x_{\\text{kritično}} = \\mu_0 + z_{1-\\alpha} \\frac{\\sigma}{\\sqrt{n}}',
            explanation: 'Vrednost vzorčnega povprečja, pri kateri ravno presežemo prag tveganja \\alpha.'
          },
          {
            title: '2. Verjetnost preseganja meje pod pravo alternativo HA',
            latex: '1 - \\beta = P\\left(\\bar{X} > x_{\\text{kritično}} \\mid \\mu = \\mu_A\\right) = 1 - \\Phi\\left( \\frac{x_{\\text{kritično}} - \\mu_A}{\\sigma/\\sqrt{n}} \\right)',
            explanation: 'Ploščina pod krivuljo alternativne porazdelitve desno od kritične meje.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun moči testa in zahtevane velikosti vzorca',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Parametri: želimo zaznati razliko delta = 3.0 točke ob sigma = 10.0
delta = 3.0
sigma = 10.0
alpha = 0.05
ciljna_moc = 0.80

z_alpha = stats.norm.ppf(1 - alpha / 2) # 1.96
z_beta = stats.norm.ppf(ciljna_moc)     # 0.8416

# Zahtevana velikost vzorca
n_potreben = ((z_alpha + z_beta) * sigma / delta)**2

print(f"Z_alpha/2: {z_alpha:.3f}")
print(f"Z_beta:    {z_beta:.3f}")
print(f"Zahtevana velikost vzorca za 80 % moč: n = {int(np.ceil(n_potreben))} oseb")`,
        description: 'Izračunajte potrebno število oseb v poskusu za dosego 80 % moči testa.',
        runCode: (code: string) => {
          return {
            output: `Z_alpha/2: 1.960\nZ_beta:    0.842\nZahtevana velikost vzorca za 80 % moč: n = 88 oseb\nSklep: Z vsaj 88 osebami v vzorcu imamo 80 % možnost za uspešno potrditev učinka.`,
            metrics: { z_a: 1.96, z_b: 0.842, n_req: 88 }
          };
        }
      }
    },
    {
      id: 'unit-5-5',
      unitNumber: '5.5',
      chapterId: 'chapter-5',
      title: 'Načrtovanje poskusov: Izračun velikosti vzorca in statistična moč',
      subtitle: 'Analiza moči (Power Analysis), določanje minimalne klinične razlike Δ in načelo Intention-to-Treat (ITT)',
      leadParagraph: 'Pred začetkom vsakega kliničnega preskušanja ali biomedicinske raziskave moramo odgovoriti na ključno etično in finančno vprašanje: koliko pacientov ali vzorcev potrebujemo, da bomo imeli visoko verjetnost (običajno 80 % ali 90 %) zaznave resničnega terapevtskega učinka?',
      deepDive: 'Načrtovanje poskusov in izračun velikosti vzorca temeljita na analizi moči:\n1. Statistična moč ($1 - \\beta$): verjetnost, da pravilno zavrnemo napačno ničelno hipotezo $H_0$, kadar učinek dejansko obstaja.\n2. Minimalna klinična razlika $\\Delta = |\\mu_1 - \\mu_2|$: zahtevana velikost vzorca na skupino je $n = \\frac{2 \\sigma^2 (z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}$.\n3. Načelo analize po namenu zdravljenja (Intention-to-Treat / ITT): vsi randomizirani bolniki se analizirajo v dodeljeni skupini; ob predvidenem osipu $k$ je prilagojeni vzorec $n_{\\text{adj}} = \\frac{n}{1 - k}$.',
      mnemonic: {
        eli5: 'Analiza moči je kot nastavitev ločljivosti mikroskopa: če je učinek zdravila majhen (drobna bakterija), potrebuješ veliko večje število pacientov (višjo povečavo), da ga zanesljivo opaziš!',
        anchor: 'Moč (1 - β) = verjetnost zaznave resničnega učinka; Manjša kot je razlika Δ ali večji kot je šum σ, večji vzorec n potrebujemo (n ∝ σ²/Δ²).',
        fallacyWarning: {
          name: 'Podhranjene raziskave (Underpowered Studies)',
          description: 'Izvedba študije s premajhnim vzorcem (npr. moč 30 %), kjer zaradi pomanjkanja statistične moči ne zaznamo resnično učinkovitega zdravila (visoko tveganje napake tipa II).',
          example: 'Če je v študiji le 15 bolnikov na skupino, bo test skoraj vedno dal p > 0,05, čeprav bi zdravilo v resnici reševalo življenja.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Premajhen vzorec je zapravljanje denarja in tveganje za paciente; prevelik vzorec pa po nepotrebnem izpostavlja ljudi poskusnemu zdravljenju.',
        simpleExplanation: 'Če novo zdravilo za znižanje krvnega tlaka zniža sistolični tlak za Δ = 5 mmHg pri standardnem odklonu σ = 12 mmHg, ob α = 0,05 in moči 80 % potrebujemo približno n = 2 * (12)² * 7,84 / (5)² ≈ 91 pacientov v kontrolni in 91 pacientov v testni skupini (skupaj 182 bolnikov).',
        practicalInsight: 'Etične komisije in agencije za zdravila (npr. EMA in FDA) pred odobritvijo klinične študije zahtevajo natančen vnaprejšnji matematični izračun velikosti vzorca.',
        mathematicalTheory: 'Splošna formula za dve skupini z različnima variancama: n = \\frac{(\\sigma_1^2 + \\sigma_2^2)(z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}. Za en vzorec: n = \\frac{\\sigma^2 (z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}. Ob upoštevanju predvidenega osipa k (npr. 10 %) je končni n_adj = n / (1 - k).'
      },
      textbookWisdom: {
        simpleQuote: 'Premajhen vzorec je zapravljanje denarja in tveganje za paciente; prevelik vzorec pa po nepotrebnem izpostavlja ljudi poskusnemu zdravljenju.',
        simpleExplanation: 'Če novo zdravilo za znižanje krvnega tlaka zniža sistolični tlak za Δ = 5 mmHg pri standardnem odklonu σ = 12 mmHg, ob α = 0,05 in moči 80 % potrebujemo približno n = 2 * (12)² * 7,84 / (5)² ≈ 91 pacientov v kontrolni in 91 pacientov v testni skupini (skupaj 182 bolnikov).',
        practicalInsight: 'Etične komisije in agencije za zdravila (npr. EMA in FDA) pred odobritvijo klinične študije zahtevajo natančen vnaprejšnji matematični izračun velikosti vzorca.',
        mathematicalTheory: 'Splošna formula za dve skupini z različnima variancama: n = \\frac{(\\sigma_1^2 + \\sigma_2^2)(z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}. Za en vzorec: n = \\frac{\\sigma^2 (z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}. Ob upoštevanju predvidenega osipa k (npr. 10 %) je končni n_adj = n / (1 - k).'
      },
      cueBannerText: 'Nastavite želeno moč (80 % ali 90 %) in klinično razliko ter izračunajte potreben n.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če želimo minimalno klinično razliko Δ, ki jo želimo zaznati, prepoloviti (iz 10 enot na 5 enot) pri nespremenjeni varianci in moči, kako se spremeni zahtevana velikost vzorca n?',
        prompt: 'Upoštevajte kvadratno odvisnost n ∝ 1 / Δ²:',
        options: [
          {
            id: 'opt-1',
            text: 'Vzorec n moramo povečati za 4-krat (zaradi deljenja z (Δ/2)² = Δ²/4).',
            isCorrect: true,
            explanation: 'Pravilno! Ker je Δ v imenovalcu na kvadrat, prepolovitev zaznavne razlike zahteva 4-krat več pacientov v študiji.'
          },
          {
            id: 'opt-2',
            text: 'Vzorec n se podvoji (2-krat večji).',
            isCorrect: false,
            explanation: 'Napačno. Razmerje ni linearno, ampak kvadratno.'
          },
          {
            id: 'opt-3',
            text: 'Vzorec n ostane enak.',
            isCorrect: false,
            explanation: 'Napačno. Za odkrivanje manjših razlik vedno potrebujemo večji vzorec.'
          }
        ],
        insight: 'Zaznava drobnih terapevtskih prednosti zahteva eksponentno večje klinične kohorte.',
        followUpExperiment: 'V 6. poglavju boste to znanje uporabili pri primerjavi deležev in epidemioloških študijah primerov s kontrolami.'
      },
      mathProof: {
        summaryLatex: 'n = \\frac{2 \\sigma^2 (z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}, \\quad \\text{kjer je } \\Delta = |\\mu_1 - \\mu_2|',
        steps: [
          {
            title: '1. Standardizacija pod ničelno in alternativno hipotezo',
            latex: '\\bar{X}_1 - \\bar{X}_2 \\sim N\\left(0, \\frac{2\\sigma^2}{n}\\right) \\text{ pod } H_0, \\quad \\bar{X}_1 - \\bar{X}_2 \\sim N\\left(\\Delta, \\frac{2\\sigma^2}{n}\\right) \\text{ pod } H_A',
            explanation: 'Kritična meja zavrnitve je določena z z_{1-\\alpha/2}, moč pa z z_{1-\\beta}.'
          },
          {
            title: '2. Izenačitev kritične točke',
            latex: 'z_{1-\\alpha/2} \\sqrt{\\frac{2\\sigma^2}{n}} = \\Delta - z_{1-\\beta} \\sqrt{\\frac{2\\sigma^2}{n}} \\implies \\sqrt{n} = \\frac{\\sqrt{2\\sigma^2}(z_{1-\\alpha/2} + z_{1-\\beta})}{\\Delta}',
            explanation: 'Kvadriranje obeh strani da natančno formulo za velikost vzorca.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Klinični izračun vzorca za dve skupini in ITT popravek',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Klinični poskus za znižanje krvnega tlaka
delta = 4.0        # Želimo zaznati znižanje za 4 mmHg
sigma = 11.5       # Standardni odklon v populaciji
alpha = 0.05       # Dvo-stranski prag značilnosti (95 % zaupanje)
power = 0.90       # Želena moč testa 90 %
osip_delez = 0.15  # Predviden 15 % osip pacientov med študijo

z_alpha = stats.norm.ppf(1 - alpha / 2) # 1.960
z_beta = stats.norm.ppf(power)          # 1.282

# Osnovna velikost vzorca na skupino
n_skupina = (2 * (sigma**2) * (z_alpha + z_beta)**2) / (delta**2)
n_skupina_int = int(np.ceil(n_skupina))

# Prilagoditev za ITT z osipom
n_skupina_itt = int(np.ceil(n_skupina_int / (1 - osip_delez)))

print(f"Potrebno število pacientov na skupino (brez osipa): {n_skupina_int}")
print(f"Začetno število pacientov z 15 % ITT osipom:       {n_skupina_itt}")
print(f"Skupaj vseh pacientov v poskusu (2 skupini):       {n_skupina_itt * 2}")`,
        description: 'Izračunajte velikost vzorca za klinično študijo s predvidenim osipom.',
        runCode: (code: string) => {
          return {
            output: `Potrebno število pacientov na skupino (brez osipa): 174\nZačetno število pacientov z 15 % ITT osipom:       205\nSkkupaj vseh pacientov v poskusu (2 skupini):       410\nSklep: Za 90 % moč ob 15 % osipu moramo randomizirati 410 bolnikov.`,
            metrics: { n_per_arm: 174, n_itt: 205, total: 410 }
          };
        }
      }
    }
  ]
};
