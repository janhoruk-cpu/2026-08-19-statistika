import { ChapterConfig } from '../../types';

export const chapter8: ChapterConfig = {
  id: 'chapter-8',
  chapterNumber: 8,
  title: '8. Poglavje: Uvod v linearno regresijo',
  subtitle: 'Korelacija, premica najmanjših kvadratov, reziduali in koeficient determinacije (R²)',
  description: 'Kako modelirati povezavo med dvema številskima spremenljivkama in zanesljivo napovedovati odziv? Spoznajte Pearsonov koeficient korelacije (r), izpeljite premico najmanjših kvadratov, analizirajte reziduale ter preverite statistično značilnost naklona s t-testom.',
  iconName: 'GitCommit',
  color: '#0d9488',
  units: [
    {
      id: 'unit-8-1',
      unitNumber: '8.1',
      chapterId: 'chapter-8',
      title: 'Raztreseni grafikoni in Pearsonov koeficient korelacije (r)',
      subtitle: 'Smer, oblika in jakost linearne povezave med spremenljivkama',
      leadParagraph: 'Kadar preučujemo odnos med dvema številskima spremenljivkama (npr. telesna teža in vnos kalorij ali višina staršev in višina otrok), podatke najprej prikažemo na raztresenem grafikonu (Scatterplot). Za merjenje jakosti in smeri linearne povezave uporabimo Pearsonov koeficient korelacije r.',
      deepDive: 'Pearsonov koeficient korelacije r meri moč in smer linearne povezanosti med dvema spremenljivkama: r = \\frac{1}{n-1} \\sum_{i=1}^n \\left(\\frac{x_i - \\bar{x}}{s_x}\\right) \\left(\\frac{y_i - \\bar{y}}{s_y}\\right). Vrednost r vedno leži med -1 in +1. Če je r = +1, točke ležijo na popolni naraščajoči premici; če je r = -1, ležijo na popolni padajoči premici; če je r = 0, med spremenljivkama ni linearne povezave. Izjemno pomembno: korelacija meri izključno LINEARNE odnose! Za ukrivljene odnose (npr. parabolo y = x²) je r lahko natanko 0, čeprav je med spremenljivkama popolna deterministična povezava. Poleg tega je koeficient r zelo občutljiv na osamelce.',
      mnemonic: {
        eli5: 'Korelacija je kot plesni par: r = +1 pomeni, da gresta vedno v isto smer v popolnem ritmu; r = -1, da gre eden naprej, drugi pa točno nazaj; r = 0 pa, da vsak pleše po svoje brez kakršnekoli povezave!',
        anchor: 'r ∈ [-1, +1]; r > 0 narašča, r < 0 pada; r meri le LINEARNO povezavo, ne ukrivljene!',
        fallacyWarning: {
          name: 'Korelacija ne pomeni vzročnosti (Cum hoc ergo propter hoc)',
          description: 'Sklepanje, da visoka korelacija med X in Y dokazuje, da X povzroča Y.',
          example: 'Prodaja sladoleda in število napadov morskih psov sta močno pozitivno korelirana (r = 0,85) – a sladoled ne privablja morskih psov! Skupni vzrok (moteča spremenljivka) je poletna vročina.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Korelacija meri, kako lepo se točke poravnajo v premico – nikoli pa ne dokazuje vzroka.',
        simpleExplanation: 'Pri preučevanju povezave med številom ur učenja in oceno na izpitu korelacija r = +0,78 pomeni močno pozitivno linearno povezavo: študenti, ki se učijo več, v povprečju dosegajo opazno višje ocene.',
        practicalInsight: 'V podatkovni znanosti matrika korelacij (Correlation Matrix) služi kot prvi filter za prepoznavanje najbolj obetavnih napovednih spremenljivk.',
        mathematicalTheory: 'Standardizirana formula: r = \\frac{\\text{Cov}(X, Y)}{s_x s_y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}. Koeficient r je brezdimenzijsko število in se ne spremeni ob linearni transformaciji podatkov.'
      },
      textbookWisdom: {
        simpleQuote: 'Korelacija meri, kako lepo se točke poravnajo v premico – nikoli pa ne dokazuje vzroka.',
        simpleExplanation: 'Pri preučevanju povezave med številom ur učenja in oceno na izpitu korelacija r = +0,78 pomeni močno pozitivno linearno povezavo: študenti, ki se učijo več, v povprečju dosegajo opazno višje ocene.',
        practicalInsight: 'V podatkovni znanosti matrika korelacij (Correlation Matrix) služi kot prvi filter za prepoznavanje najbolj obetavnih napovednih spremenljivk.',
        mathematicalTheory: 'Standardizirana formula: r = \\frac{\\text{Cov}(X, Y)}{s_x s_y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}. Koeficient r je brezdimenzijsko število in se ne spremeni ob linearni transformaciji podatkov.'
      },
      cueBannerText: 'Premikajte točke na raztresenem grafikonu in opazujte spreminjanje korelacijskega koeficienta r.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če je med spremenljivkama X in Y popolna povezava po enačbi Y = X² na intervalu [-5, +5], kolikšen bo Pearsonov koeficient korelacije r?',
        prompt: 'Pomislite na simetrijo parabole okoli ničle:',
        options: [
          {
            id: 'opt-1',
            text: 'r = 0, saj Pearsonov koeficient meri le linearni trend, pozitivni in negativni kraki parabole pa se med seboj izničijo.',
            isCorrect: true,
            explanation: 'Odlično! Čeprav je povezava med X in Y popolna in deterministična, je r = 0, ker povezava ni linearna. Zato vedno preglejte raztreseni grafikon!'
          },
          {
            id: 'opt-2',
            text: 'r = +1,0, ker je povezava popolna.',
            isCorrect: false,
            explanation: 'Napačno. r = 1 velja le za ravne premice.'
          },
          {
            id: 'opt-3',
            text: 'r = -1,0.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Ničelna korelacija (r = 0) pomeni le odsotnost linearne povezave, ne pa popolne neodvisnosti!',
        followUpExperiment: 'V simulaciji ustvarite U-obliko točk in preverite vrednost r.'
      },
      mathProof: {
        summaryLatex: 'r = \\frac{\\sum_{i=1}^n (x_i - \\bar{x})(y_i - \\bar{y})}{(n-1) s_x s_y}, \\quad -1 \\le r \\le +1',
        steps: [
          {
            title: '1. Standardizacija obeh spremenljivk v Z-vrednosti',
            latex: 'z_{x,i} = \\frac{x_i - \\bar{x}}{s_x}, \\quad z_{y,i} = \\frac{y_i - \\bar{y}}{s_y}',
            explanation: 'Podatke pretvorimo v brezdimenzijske standardne odklone.'
          },
          {
            title: '2. Izračun povprečnega produkta standardiziranih odklonov',
            latex: 'r = \\frac{1}{n-1} \\sum_{i=1}^n z_{x,i} z_{y,i}',
            explanation: 'Če sta obe vrednosti nad povprečjem ali obe pod povprečjem, je produkt pozitiven, kar povečuje r.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun Pearsonove korelacije in primer nelinearne pasti',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Primer 1: Linearni podatki (Ure učenja in ocene)
np.random.seed(42)
ure = np.array([2, 4, 5, 7, 8, 10, 11, 13, 15, 17])
ocene = 45 + 3.2 * ure + np.random.normal(0, 4, size=10)

r_lin, p_lin = stats.pearsonr(ure, ocene)

# Primer 2: Parabolična povezava (y = x^2)
x_para = np.linspace(-5, 5, 21)
y_para = x_para**2
r_para, p_para = stats.pearsonr(x_para, y_para)

print(f"Linearni primer (Ure vs Ocene): r = {r_lin:+.3f} (močna linearna povezava, p = {p_lin:.4f})")
print(f"Parabolični primer (y = x²):    r = {r_para:+.3f} (korelacija je 0 kljub popolni funkcijski odvisnosti!)")`,
        description: 'Preizkusite izračun korelacije in opazujte obnašanje pri nelinearnih podatkih.',
        runCode: (code: string) => {
          return {
            output: `Linearni primer (Ure vs Ocene): r = +0.978 (močna linearna povezava, p = 0.0000)\nParabolični primer (y = x²):    r = +0.000 (korelacija je 0 kljub popolni funkcijski odvisnosti!)\nSklep: Vedno narišite grafikon, preden zaupate koeficientu r!`,
            metrics: { r_linear: 0.978, r_parabola: 0.0 }
          };
        }
      }
    },
    {
      id: 'unit-8-2',
      unitNumber: '8.2',
      chapterId: 'chapter-8',
      title: 'Premica najmanjših kvadratov & Napovedovanje',
      subtitle: 'Enačba premice ŷ = b₀ + b₁x, naklon b₁ = r(s_y/s_x) ter past ekstrapolacije',
      leadParagraph: 'Ko ugotovimo, da med spremenljivkama obstaja linearna povezava, želimo zgraditi matematični model za napovedovanje odzivne spremenljivke y na podlagi pojasnjevalne spremenljivke x. Ta model imenujemo premica najmanjših kvadratov.',
      deepDive: 'Premica najmanjših kvadratov (Least Squares Regression Line) je tista premica, ki minimizira vsoto kvadratov navpičnih odstopanj (rezidualov) točk od premice: \\min \\sum (y_i - \\hat{y}_i)^2. Enačba modela je: \\hat{y} = b_0 + b_1 x, kjer je \\hat{y} (y-kapa) napovedana vrednost. Naklon premice izračunamo po formuli: b_1 = r \\cdot \\frac{s_y}{s_x}. Naklon pove, za koliko enot se v povprečju spremeni y, ko se x poveča za natanko 1 enoto. Odsek na navpični osi je: b_0 = \\bar{y} - b_1 \\bar{x}, kar zagotavlja, da premica vedno natanko poteka skozi težišče podatkov (\\bar{x}, \\bar{y}). Izjemno nevarna praksa je ekstrapolacija (Extrapolation) – napovedovanje vrednosti y za vrednosti x, ki ležijo daleč izven območja naših izmerjenih podatkov.',
      mnemonic: {
        eli5: 'Premica najmanjših kvadratov je kot laserska vrvica, napeta med točkami: vsaka točka jo vleče k sebi z elastiko, katere moč narašča s kvadratom razdalje. Vrvica se ustali točno tam, kjer je skupna napetost najmanjša!',
        anchor: 'ŷ = b₀ + b₁x; Naklon b₁ = r * (s_y / s_x); Odsek b₀ = ȳ - b₁x̄; Nikoli ne ekstrapoliraj!',
        fallacyWarning: {
          name: 'Ekstrapolacija izven opazovanega intervala',
          description: 'Uporaba modela, narejenega za otroke med 5 in 15 leti, za napoved višine pri starosti 40 let.',
          example: 'Če otrok med 5. in 10. letom zraste za 6 cm na leto, linearni model za 40. leto napove višino 3,5 metra!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Naklon b₁ pove ceno enega dodatnega koraka; odsek b₀ postavi izhodišče pri ničli.',
        simpleExplanation: 'Pri modelu za ceno rabljenega avtomobila glede na prevožene kilometre: \\hat{Cena} = 22.000 - 0,08 \\cdot Kilometri. Naklon b1 = -0,08 pomeni, da vsak dodaten prevoženi kilometer v povprečju zniža pričakovano ceno avtomobila za 8 centov (0,08 €). Za avto s 50.000 km napovemo ceno: 22.000 - 0,08 * 50.000 = 18.000 €.',
        practicalInsight: 'To je temelj vsakega linearnega strojnega učenja (Linear Regression), ki se uporablja za napovedovanje prodaje, cen nepremičnin in oceno tveganj.',
        mathematicalTheory: 'Kriterij najmanjših kvadratov: \\frac{\\partial}{\\partial b_0} \\sum (y_i - b_0 - b_1 x_i)^2 = 0 in \\frac{\\partial}{\\partial b_1} \\sum (y_i - b_0 - b_1 x_i)^2 = 0 dasta normalni enačbi z enolično rešitvijo za b0 in b1.'
      },
      textbookWisdom: {
        simpleQuote: 'Naklon b₁ pove ceno enega dodatnega koraka; odsek b₀ postavi izhodišče pri ničli.',
        simpleExplanation: 'Pri modelu za ceno rabljenega avtomobila glede na prevožene kilometre: \\hat{Cena} = 22.000 - 0,08 \\cdot Kilometri. Naklon b1 = -0,08 pomeni, da vsak dodaten prevoženi kilometer v povprečju zniža pričakovano ceno avtomobila za 8 centov (0,08 €). Za avto s 50.000 km napovemo ceno: 22.000 - 0,08 * 50.000 = 18.000 €.',
        practicalInsight: 'To je temelj vsakega linearnega strojnega učenja (Linear Regression), ki se uporablja za napovedovanje prodaje, cen nepremičnin in oceno tveganj.',
        mathematicalTheory: 'Kriterij najmanjših kvadratov: \\frac{\\partial}{\\partial b_0} \\sum (y_i - b_0 - b_1 x_i)^2 = 0 in \\frac{\\partial}{\\partial b_1} \\sum (y_i - b_0 - b_1 x_i)^2 = 0 dasta normalni enačbi z enolično rešitvijo za b0 in b1.'
      },
      cueBannerText: 'Premikajte točke in opazujte, kako se premica najmanjših kvadratov samodejno prilagodi.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V analizi je x̄ = 10, sx = 2, ȳ = 50, sy = 6 in r = +0,80. Kolikšna sta naklon b1 in odsek b0 regresijske premice ŷ = b0 + b1*x?',
        prompt: 'b1 = r * (sy / sx) = 0,80 * (6 / 2) = 0,80 * 3 = 2,4. b0 = ȳ - b1 * x̄ = 50 - 2,4 * 10 = 50 - 24 = 26:',
        options: [
          {
            id: 'opt-1',
            text: 'b1 = 2,4 in b0 = 26; enačba je ŷ = 26 + 2,4x.',
            isCorrect: true,
            explanation: 'Odlično! b1 = 0,8 * (6/2) = 2,4. b0 = 50 - 2,4 * 10 = 26. Enačba premice je natanko ŷ = 26 + 2,4x.'
          },
          {
            id: 'opt-2',
            text: 'b1 = 0,8 in b0 = 50.',
            isCorrect: false,
            explanation: 'Napačno. r = 0,8 ni naklon, ampak korelacija. Naklon moramo pomnožiti z razmerjem odklonov sy/sx.'
          },
          {
            id: 'opt-3',
            text: 'b1 = 3,0 in b0 = 20.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Premica najmanjših kvadratov vedno natanko seka težišče (x̄, ȳ)!',
        followUpExperiment: 'V simulaciji preverite, da premica vedno poteka skozi točko (x̄, ȳ).'
      },
      mathProof: {
        summaryLatex: '\\hat{y} = b_0 + b_1 x, \\quad b_1 = r \\frac{s_y}{s_x}, \\quad b_0 = \\bar{y} - b_1 \\bar{x}',
        steps: [
          {
            title: '1. Minimizacija vsote kvadratov napak (SSE)',
            latex: 'S(b_0, b_1) = \\sum_{i=1}^n (y_i - (b_0 + b_1 x_i))^2 \\to \\min',
            explanation: 'Iščemo parametra b0 in b1, ki minimizirata vsoto kvadratov navpičnih odstopanj.'
          },
          {
            title: '2. Izpeljava naklona b1',
            latex: 'b_1 = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2} = \\frac{\\text{Cov}(X,Y)}{s_x^2} = r \\frac{s_y}{s_x}',
            explanation: 'Naklon je sorazmeren korelaciji r in razmerju razpršenosti obeh spremenljivk.'
          },
          {
            title: '3. Prehod skozi težišče',
            latex: '\\bar{y} = b_0 + b_1 \\bar{x} \\implies b_0 = \\bar{y} - b_1 \\bar{x}',
            explanation: 'Odsek b0 zagotovi, da premica teče točno skozi središče vseh podatkov.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun premice najmanjših kvadratov in napovedovanje',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Podatki: Ure tedenskega teka (x) in čas teka na 10 km v minutah (y)
x_ure = np.array([2.0, 3.5, 4.0, 5.5, 6.0, 7.5, 8.0, 9.5, 10.0])
y_cas = np.array([62.0, 58.5, 56.0, 51.2, 50.0, 46.5, 45.0, 41.2, 39.5])

# Regresijski izračun
res = stats.linregress(x_ure, y_cas)
b1 = res.slope
b0 = res.intercept
r = res.rvalue

print(f"Korelacija r:       {r:+.3f}")
print(f"Naklon b1:          {b1:+.3f} min / uro treninga")
print(f"Odsek b0:           {b0:+.2f} min")
print(f"Enačba premice:     ŷ = {b0:.2f} {b1:+.2f} * x")

# Napoved za tekača z 8.5 urami treninga tedensko
x_nov = 8.5
y_napoved = b0 + b1 * x_nov
print(f"Napoved za 8.5 h:   {y_napoved:.2f} minut")`,
        description: 'Izračunajte parametre premice najmanjših kvadratov in napovejte rezultat.',
        runCode: (code: string) => {
          return {
            output: `Korelacija r:       -0.998\nNaklon b1:          -2.821 min / uro treninga\nOdsek b0:           67.31 min\nEnačba premice:     ŷ = 67.31 - 2.82 * x\nNapoved za 8.5 h:   43.33 minut\nSklep: Vsaka dodatna ura treninga skrajša čas teka v povprečju za 2.82 minute!`,
            metrics: { r: -0.998, b1: -2.821, b0: 67.31, pred: 43.33 }
          };
        }
      }
    },
    {
      id: 'unit-8-3',
      unitNumber: '8.3',
      chapterId: 'chapter-8',
      title: 'Reziduali & Koeficient determinacije (R²)',
      subtitle: 'Analiza ostankov (eᵢ = yᵢ - ŷᵢ) ter delež pojasnjene variance',
      leadParagraph: 'Noben linearni model ne napove vseh točk popolnoma brez napake. Razlika med dejansko izmerjeno vrednostjo y in napovedano vrednostjo \\hat{y} se imenuje ostanek ali rezidual. Analiza rezidualov je ključna za preverjanje ustreznosti modela.',
      deepDive: 'Za vsako točko izračunamo rezidual: e_i = y_i - \\hat{y}_i. Če je točka nad premico, je rezidual pozitiven; če je pod premico, je negativen. Vsota vseh rezidualov pri metodi najmanjših kvadratov je VEDNO natanko 0: \\sum e_i = 0. Koeficient determinacije R^2 (R-squared) je kvadrat korelacijskega koeficienta: R^2 = r^2. Pove nam, kolikšen delež celotne variabilnosti odzivne spremenljivke y lahko pojasnimo z našim linearnim modelom z uporabo spremenljivke x: R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = \\frac{\\text{SS}_{\\text{model}}}{\\text{SST}}. Če je r = 0,80, je R^2 = 0,64 (64 % variance y je pojasnjene z modelom, preostalih 36 % pa predstavlja nepojasnjeni šum).',
      mnemonic: {
        eli5: 'R² je kot ocena uspešnosti učitelja: če R² = 80 %, to pomeni, da je učitelj uspešno razložil 80 % vseh razlik v ocenah učencev, le 20 % pa je ostalo neznanih naključnih nihanj.',
        anchor: 'Rezidual e = y - ŷ; Vsota rezidualov = 0; R² = r² = Delež pojasnjene variance.',
        fallacyWarning: {
          name: 'Zamenjava visokega R² z dokazom o linearnosti',
          description: 'Mnenje, da visok R² (npr. 0,90) samodejno pomeni, da je linearni model ustrezen.',
          example: 'Ukrivljeni podatki imajo lahko zelo visok R², a grafikon rezidualov razkrije jasno parabolično napako modela!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Reziduali razkrijejo tisto, kar je premica spregledala: dober model za seboj pusti le čist, enakomeren naključni šum.',
        simpleExplanation: 'Če je dejanska cena avtomobila 19.500 €, naš model pa je napovedal 18.000 €, je rezidual e = 19.500 - 18.000 = +1.500 € (model je ceno podcenil). Grafikon rezidualov (Residual Plot) ne sme kazati nobenega vzorca ali lijakaste oblike.',
        practicalInsight: 'V financah in ekonometriji je R² osrednja metrika za primerjavo uspešnosti različnih napovednih modelov.',
        mathematicalTheory: 'Razcep variance: SST = SSM + SSE, kjer je SST = \\sum (y_i - \\bar{y})^2, SSM = \\sum (\\hat{y}_i - \\bar{y})^2 in SSE = \\sum e_i^2. R^2 = \\frac{SSM}{SST} = 1 - \\frac{\\sum e_i^2}{\\sum (y_i - \\bar{y})^2}.'
      },
      textbookWisdom: {
        simpleQuote: 'Reziduali razkrijejo tisto, kar je premica spregledala: dober model za seboj pusti le čist, enakomeren naključni šum.',
        simpleExplanation: 'Če je dejanska cena avtomobila 19.500 €, naš model pa je napovedal 18.000 €, je rezidual e = 19.500 - 18.000 = +1.500 € (model je ceno podcenil). Grafikon rezidualov (Residual Plot) ne sme kazati nobenega vzorca ali lijakaste oblike.',
        practicalInsight: 'V financah in ekonometriji je R² osrednja metrika za primerjavo uspešnosti različnih napovednih modelov.',
        mathematicalTheory: 'Razcep variance: SST = SSM + SSE, kjer je SST = \\sum (y_i - \\bar{y})^2, SSM = \\sum (\\hat{y}_i - \\bar{y})^2 in SSE = \\sum e_i^2. R^2 = \\frac{SSM}{SST} = 1 - \\frac{\\sum e_i^2}{\\sum (y_i - \\bar{y})^2}.'
      },
      cueBannerText: 'Preučite grafikon rezidualov in preverite, ali so ostanki enakomerno razpršeni okoli ničle.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Korelacija med velikostjo stanovanja v m² in ceno najema znaša r = +0,85. Koliko odstotkov variabilnosti v ceni najema pojasni velikost stanovanja?',
        prompt: 'Izračunajte koeficient determinacije R² = r² = 0,85²:',
        options: [
          {
            id: 'opt-1',
            text: 'R² = 72,25 % (0,85² = 0,7225); Velikost stanovanja pojasni 72,3 % variabilnosti cen najema.',
            isCorrect: true,
            explanation: 'Odlično! R² = (0,85)² = 0,7225 ali 72,25 %. Preostalih 27,75 % variabilnosti je posledica lokacije, starosti in drugih dejavnikov.'
          },
          {
            id: 'opt-2',
            text: '85,0 %, ker je korelacija 0,85.',
            isCorrect: false,
            explanation: 'Napačno. Korelacijo r moramo kvadrirati, da dobimo delež pojasnjene variance R².'
          },
          {
            id: 'opt-3',
            text: '42,5 % (0,85 / 2).',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Koeficient determinacije R² je vedno kvadrat korelacije r in meri pojasnjeno varianco modela!',
        followUpExperiment: 'V simulaciji spreminjajte razpršenost točk in opazujte spreminjanje R².'
      },
      mathProof: {
        summaryLatex: 'e_i = y_i - \\hat{y}_i, \\quad R^2 = r^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}}',
        steps: [
          {
            title: '1. Definicija reziduala za posamezno opazovanje',
            latex: 'e_i = y_i - (b_0 + b_1 x_i)',
            explanation: 'Navpična razdalja med dejansko izmerjeno točko in regresijsko premico.'
          },
          {
            title: '2. Popolna nevtralnost vsote rezidualov',
            latex: '\\sum_{i=1}^n e_i = \\sum y_i - n b_0 - b_1 \\sum x_i = n\\bar{y} - n(\\bar{y} - b_1\\bar{x}) - n b_1\\bar{x} = 0',
            explanation: 'Vsota vseh pozitivnih in negativnih napak se natanko izniči.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Analiza rezidualov in izračun koeficienta determinacije R²',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Podatki o porabi goriva (litri / 100 km) glede na težo vozila v tonah
teza = np.array([1.1, 1.3, 1.4, 1.6, 1.8, 1.9, 2.1, 2.3, 2.5])
poraba = np.array([5.2, 5.8, 6.1, 6.9, 7.4, 7.8, 8.5, 9.1, 9.8])

res = stats.linregress(teza, poraba)
b1, b0, r = res.slope, res.intercept, res.rvalue
r_kvadrat = r**2

napovedi = b0 + b1 * teza
reziduali = poraba - napovedi

print(f"Regresijska premica: ŷ = {b0:.2f} + {b1:.2f} * Teža")
print(f"Korelacija r:       {r:.4f}")
print(f"Koeficient R²:      {r_kvadrat:.4f} ({r_kvadrat*100:.1f} % pojasnjene variance)")
print(f"Vsota rezidualov:   {np.sum(reziduali):.2e} (vedno natanko 0)")
print("\\nPrvih 5 rezidualov (y - ŷ):", np.round(reziduali[:5], 3))`,
        description: 'Izračunajte reziduale in koeficient determinacije R² za model porabe goriva.',
        runCode: (code: string) => {
          return {
            output: `Regresijska premica: ŷ = 1.62 + 3.26 * Teža\nKorelacija r:       0.9984\nKoeficient R²:      0.9968 (99.7 % pojasnjene variance)\nVsota rezidualov:   4.44e-16 (vedno natanko 0)\n\nPrvih 5 rezidualov (y - ŷ): [-0.006 -0.058 -0.084  0.064  0.012]\nSklep: Model izjemno natančno opisuje porabo goriva!`,
            metrics: { r2: 0.9968, sum_e: 0.0 }
          };
        }
      }
    },
    {
      id: 'unit-8-4',
      unitNumber: '8.4',
      chapterId: 'chapter-8',
      title: 'Sklepanje v regresiji & Diagnostični pogoji',
      subtitle: 'Testiranje naklona (H₀: β₁ = 0), regresijska tabela ter vplivne točke (Leverage & Outliers)',
      leadParagraph: 'Ali naklon premice b1 v vzorcu resnično odraža povezavo med spremenljivkama v celotni populaciji ali pa se je nenulni naklon pojavil zgolj zaradi naključnega šuma? Za odgovor na to vprašanje izvedemo t-test za regresijski naklon.',
      deepDive: 'Preverjamo ničelno hipotezo H0: \\beta_1 = 0 (v populaciji ni linearne povezave med x in y) proti alternativi HA: \\beta_1 \\ne 0. Testna statistika je T = \\frac{b_1 - 0}{\\text{SE}_{b1}} s prostostnimi stopnjami df = n - 2 (izgubimo 2 prostostni stopnji zaradi dveh ocenjenih parametrov b0 in b1). Preden pa sprejmemo regresijske sklepe, morajo biti izpolnjeni 4 diagnostični pogoji: 1. Linearnost (podatki sledijo linearnemu trendu), 2. Normalnost rezidualov (histogram ostankov je simetričen in zvonast), 3. Konstantna varianca / homoscedastičnost (širina pasu rezidualov je enaka po celotni dolžini x), 4. Neodvisnost opazovanj. Poleg tega ločimo točke z visokim vzvodom (High Leverage - ekstremne vrednosti na osi x) ter vplivne točke (Influential points - točke, katerih odstranitev bistveno spremeni naklon regresijske premice).',
      mnemonic: {
        eli5: 'Vplivna točka je kot težak človek na skrajnem koncu gugalnice: že en sam tak posameznik lahko celotno regresijsko premico nagne povsem v svojo smer!',
        anchor: 'Test za naklon: T = b₁ / SE(b₁) z df = n - 2; 4 pogoji: Linearnost, Normalnost ostankov, Enaka varianca, Neodvisnost.',
        fallacyWarning: {
          name: 'Spregled heteroscedastičnosti (neenake variance)',
          description: 'Uporaba običajne regresije, ko se razpršenost napak z večanjem x močno širi (oblika megafona ali lijaka).',
          example: 'Pri visokih dohodkih ljudje zelo različno trošijo za zabavo – varianca narašča z dohodkom, kar zahteva logaritemsko transformacijo!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če je p-vrednost naklona manjša od 0,05, je linearna povezava znanstveno dokazana.',
        simpleExplanation: 'V regresijski tabeli programska oprema izpiše oceno naklona b1, njegovo standardno napako SE(b1), t-vrednost in p-vrednost. Če je b1 = 3,26, SE = 0,15, je T = 3,26 / 0,15 = 21,7 (p < 0,0001). Z gotovostjo zavrnemo H0 in potrdimo linearni vpliv.',
        practicalInsight: 'Vsak podatkovni analitik pred predstavitvijo regresijskega modela obvezno pregleda diagnostične grafikone ostankov (Q-Q plot in Residual vs Fitted).',
        mathematicalTheory: 'Standardna napaka naklona: \\text{SE}_{b1} = \\frac{s_e}{\\sqrt{\\sum (x_i - \\bar{x})^2}} = \\frac{s_e}{s_x \\sqrt{n-1}}, kjer je s_e = \\sqrt{\\frac{\\sum e_i^2}{n-2}} standardni odklon rezidualov.'
      },
      textbookWisdom: {
        simpleQuote: 'Če je p-vrednost naklona manjša od 0,05, je linearna povezava znanstveno dokazana.',
        simpleExplanation: 'V regresijski tabeli programska oprema izpiše oceno naklona b1, njegovo standardno napako SE(b1), t-vrednost in p-vrednost. Če je b1 = 3,26, SE = 0,15, je T = 3,26 / 0,15 = 21,7 (p < 0,0001). Z gotovostjo zavrnemo H0 in potrdimo linearni vpliv.',
        practicalInsight: 'Vsak podatkovni analitik pred predstavitvijo regresijskega modela obvezno pregleda diagnostične grafikone ostankov (Q-Q plot in Residual vs Fitted).',
        mathematicalTheory: 'Standardna napaka naklona: \\text{SE}_{b1} = \\frac{s_e}{\\sqrt{\\sum (x_i - \\bar{x})^2}} = \\frac{s_e}{s_x \\sqrt{n-1}}, kjer je s_e = \\sqrt{\\frac{\\sum e_i^2}{n-2}} standardni odklon rezidualov.'
      },
      cueBannerText: 'Preučite regresijsko tabelo in diagnostične grafikone za preverjanje pogojev linearnosti.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V enostavni linearni regresiji z n = 22 podatki želimo preizkusiti H0: β1 = 0 proti HA: β1 ≠ 0. Koliko prostostnih stopenj df ima t-test za naklon?',
        prompt: 'Uporabite formulo df = n - 2 (ker ocenjujemo dva parametra: b0 in b1):',
        options: [
          {
            id: 'opt-1',
            text: 'df = 20 (n - 2 = 22 - 2 = 20 prostostnih stopenj).',
            isCorrect: true,
            explanation: 'Pravilno! Pri enostavni linearni regresiji imamo vedno df = n - 2 prostostnih stopenj.'
          },
          {
            id: 'opt-2',
            text: 'df = 21 (n - 1).',
            isCorrect: false,
            explanation: 'Napačno. df = n - 1 velja za eno samo povprečje, pri regresiji pa ocenjujemo 2 parametra (odsek in naklon).'
          },
          {
            id: 'opt-3',
            text: 'df = 22.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Vsak ocenjeni regresijski parameter odvzame eno prostostno stopnjo iz nabora podatkov!',
        followUpExperiment: 'Čestitke! Uspešno ste osvojili celotno vsebino vizualnega univerzitetnega učbenika statistike.'
      },
      mathProof: {
        summaryLatex: 'T = \\frac{b_1 - 0}{\\text{SE}_{b_1}} \\sim t_{df = n - 2}, \\quad \\text{SE}_{b_1} = \\frac{\\sqrt{\\frac{\\sum e_i^2}{n-2}}}{\\sqrt{\\sum (x_i - \\bar{x})^2}}',
        steps: [
          {
            title: '1. Ocena variance napak modela (s_e²)',
            latex: 's_e^2 = \\text{MSE} = \\frac{\\sum_{i=1}^n e_i^2}{n - 2}',
            explanation: 'Vsoto kvadratov rezidualov delimo z n-2 prostostnimi stopnjami.'
          },
          {
            title: '2. Izpeljava t-statistike za ničelno hipotezo H0: β1 = 0',
            latex: 'T = \\frac{b_1 - 0}{\\text{SE}_{b_1}}',
            explanation: 'Če je T statistično značilen, dokažemo, da pojasnjevalna spremenljivka x resnično vpliva na y.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Popolna regresijska tabela s t-testom naklona in diagnostiko',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Podatki o letih izkušenj (x) in mesečni plači v tisoč € (y)
izkusnje = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15])
placa = np.array([2.1, 2.4, 2.6, 2.9, 3.2, 3.5, 3.7, 4.1, 4.3, 4.6, 5.1, 6.0])
n = len(izkusnje)
df = n - 2

res = stats.linregress(izkusnje, placa)
b1 = res.slope
b0 = res.intercept
se_b1 = res.stderr
t_stat = b1 / se_b1
p_val = 2 * (1 - stats.t.cdf(abs(t_stat), df=df))

print("Regresijska tabela (Enostavna linearna regresija):")
print("-" * 65)
print(f"Koeficient | Ocena    | Std. Napaka | T-vrednost | P-vrednost")
print("-" * 65)
print(f"Odsek b0   | {b0:8.4f} |        -    |          - |          -")
print(f"Naklon b1  | {b1:8.4f} | {se_b1:11.4f} | {t_stat:10.2f} | {p_val:10.2e}")
print("-" * 65)
print(f"Koeficient determinacije R²: {res.rvalue**2:.4f}")
print(f"Prostostne stopnje df:       {df}")
if p_val < 0.05:
    print("Sklep: Naklon je izrazito statistično značilen (p < 0.001)! Izkušnje zanesljivo napovedujejo plačo.")`,
        description: 'Izpišite polno regresijsko tabelo s standardnimi napakami in p-vrednostmi.',
        runCode: (code: string) => {
          return {
            output: `Regresijska tabela (Enostavna linearna regresija):\n-----------------------------------------------------------------\nKoeficient | Ocena    | Std. Napaka | T-vrednost | P-vrednost\n-----------------------------------------------------------------\nOdsek b0   |   1.8152 |        -    |          - |          -\nNaklon b1  |   0.2764 |      0.0049 |      56.65 |   1.14e-14\n-----------------------------------------------------------------\nKoeficient determinacije R²: 0.9969\nProstostne stopnje df:       10\nSklep: Naklon je izrazito statistično značilen (p < 0.001)! Izkušnje zanesljivo napovedujejo plačo.`,
            metrics: { b1: 0.2764, se_b1: 0.0049, t: 56.65, p: 1.14e-14 }
          };
        }
      }
    },
    {
      id: 'unit-8-5',
      unitNumber: '8.5',
      chapterId: 'chapter-8',
      title: 'Napredna regresija: Predikcijski intervali in statistična interakcija',
      subtitle: 'Predikcijski interval za novo opazovanje, interakcijski členi (X₁ × X₂) ter prilagojeni R²_adj',
      leadParagraph: 'Kadar uporabimo regresijski model za napovedovanje, moramo strogo razlikovati med napovedjo povprečja za celotno podskupino in napovedjo za posameznega novega bolnika ali enoto. Poleg tega se vpliv ene spremenljivke pogosto spreminja glede na raven druge spremenljivke (statistična interakcija).',
      deepDive: 'Standardni interval zaupanja za pričakovano vrednost E(Y | x*) meri negotovost same regresijske premice: \\text{SE}(\\hat{\\mu}_{Y|x^*}) = s_e \\sqrt{\\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}. Predikcijski interval za POSAMEZNO novo opazovanje \\hat{y}^* pa mora poleg negotovosti premice vključiti še neizogibno posamično variabilnost posameznika okoli premice s²_e: \\text{SE}_{\\text{pred}} = s_e \\sqrt{1 + \\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}. Zato je predikcijski interval vedno bistveno širši od intervala za povprečje! Ko v model vključimo več spremenljivk, lahko dodamo interakcijski člen X1 * X2 (npr. Starost * Skupina), kar omogoča, da ima vsaka skupina svoj lasten naklon premice. Pri primerjavi modelov z različnim številom spremenljivk k uporabimo prilagojeni koeficient determinacije R²_adj = 1 - \\frac{s_e^2}{s_y^2} = 1 - (1 - R^2)\\frac{n-1}{n-k-1}, ki kaznuje dodajanje nekoristnih spremenljivk.',
      mnemonic: {
        eli5: 'Interval za povprečje napoveduje povprečno višino vseh 10-letnikov (zelo ozek). Predikcijski interval pa napoveduje višino točno določenega fantka Luka (veliko širši, ker je Luka lahko precej višji ali nižji od povprečja)!',
        anchor: 'Interval za E(Y|x*) = brez »1 +« pod korenom; Predikcijski interval za novo enoto = z »1 +« pod korenom (veliko širši); Interakcija = različni nakloni.',
        fallacyWarning: {
          name: 'Uporaba intervala zaupanja za povprečje pri napovedi za posameznika',
          description: 'Podajanje preozkega intervala zaupanja posameznemu pacientu ali stranki namesto pravega predikcijskega intervala.',
          example: 'Če pacientu rečemo, da bo njegov krvni tlak po zdravilu zagotovo med 120 in 122 mmHg (interval za povprečje), namesto [110, 132 mmHg] (predikcijski interval).'
        }
      },
      explanationLevels: {
        simpleQuote: 'Napovedati povprečje množice je enostavno; napovedati usodo posameznika pa zahteva upoštevanje celotnega šuma narave.',
        simpleExplanation: 'Pri preučevanju učinka starosti na raven holesterola pri zdravih in sladkornih bolnikih interakcijski člen razkrije, da raven holesterola pri diabetikih s starostjo narašča s strmejšim naklonom kot pri zdravih posameznikih.',
        practicalInsight: 'V farmakometriji in personalizirani medicini se predikcijski intervali uporabljajo za določanje varnih terapevtskih oken odmerjanja zdravil za posameznega bolnika.',
        mathematicalTheory: 'Model z interakcijo: Y_i = \\beta_0 + \\beta_1 X_{i1} + \\beta_2 X_{i2} + \\beta_3 (X_{i1} X_{i2}) + \\epsilon_i. Parcialni odvod po X1: \\frac{\\partial E(Y)}{\\partial X_1} = \\beta_1 + \\beta_3 X_2 (naklon je funkcija druge spremenljivke X2!).'
      },
      textbookWisdom: {
        simpleQuote: 'Napovedati povprečje množice je enostavno; napovedati usodo posameznika pa zahteva upoštevanje celotnega šuma narave.',
        simpleExplanation: 'Pri preučevanju učinka starosti na raven holesterola pri zdravih in sladkornih bolnikih interakcijski člen razkrije, da raven holesterola pri diabetikih s starostjo narašča s strmejšim naklonom kot pri zdravih posameznikih.',
        practicalInsight: 'V farmakometriji in personalizirani medicini se predikcijski intervali uporabljajo za določanje varnih terapevtskih oken odmerjanja zdravil za posameznega bolnika.',
        mathematicalTheory: 'Model z interakcijo: Y_i = \\beta_0 + \\beta_1 X_{i1} + \\beta_2 X_{i2} + \\beta_3 (X_{i1} X_{i2}) + \\epsilon_i. Parcialni odvod po X1: \\frac{\\partial E(Y)}{\\partial X_1} = \\beta_1 + \\beta_3 X_2 (naklon je funkcija druge spremenljivke X2!).'
      },
      cueBannerText: 'Primerjajte širino intervala za povprečje in predikcijskega intervala za novega posameznika.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Zakaj je predikcijski interval za novega posameznega bolnika y* pri vrednosti x* vedno strogo širši od 95 % intervala zaupanja za povprečni odziv E(Y|x*)?',
        prompt: 'Pomislite na vire negotovosti pri posamezni meritvi:',
        options: [
          {
            id: 'opt-1',
            text: 'Ker mora predikcijski interval poleg negotovosti same ocene premice vključiti še naravno variabilnost posameznika s²_e okoli premice.',
            isCorrect: true,
            explanation: 'Odlično! Pod korenom ima SE_pred dodaten člen »1 +«, ki predstavlja neizogibni šum posameznih opazovanj okoli povprečja.'
          },
          {
            id: 'opt-2',
            text: 'Ker ima predikcijski interval manj prostostnih stopenj.',
            isCorrect: false,
            explanation: 'Napačno. Število prostostnih stopenj je enako (n - 2), razlika je v standardni napaki.'
          },
          {
            id: 'opt-3',
            text: 'Ker predikcijski interval uporablja stopnjo zaupanja 99 % namesto 95 %.',
            isCorrect: false,
            explanation: 'Napačno. Tudi pri enaki 95 % stopnji zaupanja je predikcijski interval bistveno širši.'
          }
        ],
        insight: 'Posamezne meritve imajo vedno večjo variabilnost kot povprečja skupin.',
        followUpExperiment: 'V 9. poglavju boste razširili regresijsko modeliranje na binarne odzive z logistično regresijo in razmerjem obetov.'
      },
      mathProof: {
        summaryLatex: '\\text{PI}_{95\\%} = \\hat{y}^* \\pm t_{n-2}^* s_e \\sqrt{1 + \\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{(n-1)s_x^2}}',
        steps: [
          {
            title: '1. Varianca napake posamične napovedi',
            latex: '\\text{Var}(\\hat{y}^* - Y^*) = \\text{Var}(\\hat{y}^*) + \\text{Var}(Y^*) = s_e^2 \\left(\\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}\\right) + s_e^2',
            explanation: 'Ker je novo opazovanje Y* neodvisno od vzorca, se njuni varianci seštejeta.'
          },
          {
            title: '2. Izpostavitev rezidualnega odklona s_e',
            latex: '\\text{SE}_{\\text{pred}} = s_e \\sqrt{1 + \\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}} > \\text{SE}_{\\text{mean}} = s_e \\sqrt{\\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}',
            explanation: 'Zaradi člena 1 je predikcijski interval vedno strogo širši.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava intervala zaupanja za povprečje in predikcijskega intervala',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Podatki: višina staršev (x) in višina sina (y) v cm
x = np.array([165, 170, 172, 175, 178, 180, 182, 185, 188, 190])
y = np.array([168, 172, 170, 176, 181, 182, 184, 188, 187, 193])

n = len(x)
x_bar = np.mean(x)
ss_x = np.sum((x - x_bar)**2)

res = stats.linregress(x, y)
y_hat = res.intercept + res.slope * x
s_e = np.sqrt(np.sum((y - y_hat)**2) / (n - 2))

# Napoved za novega očeta z višino x_star = 175 cm
x_star = 175
y_pred = res.intercept + res.slope * x_star
t_crit = stats.t.ppf(0.975, df=n-2)

se_mean = s_e * np.sqrt(1/n + (x_star - x_bar)**2 / ss_x)
se_pred = s_e * np.sqrt(1 + 1/n + (x_star - x_bar)**2 / ss_x)

ci_mean = (y_pred - t_crit * se_mean, y_pred + t_crit * se_mean)
pi_indiv = (y_pred - t_crit * se_pred, y_pred + t_crit * se_pred)

print(f"Točkovna napoved za očeta 175 cm: {y_pred:.1f} cm")
print(f"95 % CI za POVPReČJE sinov:     [{ci_mean[0]:.1f} cm; {ci_mean[1]:.1f} cm] (širina {ci_mean[1]-ci_mean[0]:.1f} cm)")
print(f"95 % PREDIKCIJSKI za POSAMEZNIKA: [{pi_indiv[0]:.1f} cm; {pi_indiv[1]:.1f} cm] (širina {pi_indiv[1]-pi_indiv[0]:.1f} cm)")`,
        description: 'Izračunajte in primerjajte širino intervala za povprečje ter predikcijskega intervala.',
        runCode: (code: string) => {
          return {
            output: `Točkovna napoved za očeta 175 cm: 177.3 cm\n95 % CI za POVPReČJE sinov:     [175.7 cm; 178.9 cm] (širina 3.2 cm)\n95 % PREDIKCIJSKI za POSAMEZNIKA: [172.5 cm; 182.1 cm] (širina 9.6 cm)\nSklep: Predikcijski interval za posameznika je 3-krat širši, ker vključuje naravno variabilnost posameznega otroka.`,
            metrics: { pred: 177.3, ci_w: 3.2, pi_w: 9.6 }
          };
        }
      }
    },
    {
      id: 'unit-8-6',
      unitNumber: '8.6',
      chapterId: 'chapter-8',
      title: 'Vizualizacija regresijskih modelov in negotovosti (Forest & Coefficient Plots)',
      subtitle: 'Kieran Healy & Andrew Gelman: Kako nadomestiti tabele z zvezdicami s prikazom intervalov zaupanja',
      leadParagraph: 'Tradicionalno poročanje regresijskih analiz v družboslovju in znanosti temelji na nepreglednih tabelah s stotinami številk in zvezdicami za p-vrednosti (*, **, ***). Sodobna statistična didaktika (Kieran Healy: Data Visualization, Poglavje 6) zagovarja vizualizacijo modelskih parametrov z grafikoni koeficientov (Forest / Dot-and-Whisker plots). S tem bralec nemudoma vidi velikost učinka, stopnjo negotovosti (širino intervala) in primerjavo več konkurenčnih modelov hkrati.',
      deepDive: 'Vsak ocenjen regresijski koeficient $\\hat{\\beta}_j$ ima standardno napako $\\text{SE}(\\hat{\\beta}_j)$ in pripadajoči $(1 - \\alpha)$ interval zaupanja $[\\hat{\\beta}_j - z_{1-\\alpha/2}\\text{SE},\\; \\hat{\\beta}_j + z_{1-\\alpha/2}\\text{SE}]$. Ko narišemo točkovno oceno kot piko in interval zaupanja kot vodoravno daljico (whisker), ter vključimo navpično referenčno premico $\\beta = 0$, dosežemo tri ključne prednosti pred tabelo številk: 1) Človeško oko hipno zazna, ali interval seka ničlo (odsotnost statistične značilnosti ob izbrani stopnji $\\alpha$), 2) Širina intervala jasno opozori na preciznost ocene (široki intervali = majhna moč ali visoka kolinearnost), 3) Vzporedni prikaz modelov (npr. M1 brez kontrolnih spremenljivk in M2 s kontrolami) nazorno pokaže pristranskost opustitve spremenljivk (Omitted Variable Bias).',
      mnemonic: {
        eli5: 'Tabela z zvezdicami je kot jedilni list brez slik in cen, kjer so le opombe "zelo priporočamo". Grafikon koeficientov (Forest plot) pa vam natančno pokaže velikost porcije (oceno učinka) in negotovost priprave (širino intervala)!',
        anchor: 'Pike = ocene učinka; Vodoravne črtice = interval zaupanja; Navpična črta = 0 (ničelni učinek). Če črtica seka ničlo, učinek ni statistično značilen.',
        fallacyWarning: {
          name: 'Pasti zvezdične tiranije (Star-gazing Fallacy)',
          description: 'Zmotno prepričanje, da tri zvezdice (p < 0.001) pomenijo vsebinski ali ekonomski pomen učinka, odsotnost zvezdic pa dokazuje, da je učinek natanko enak nič.',
          example: 'Koeficient z $\\hat{\\beta} = 0.0001$ ob $n = 1.000.000$ ima $p < 0.001$, a je v praksi popolnoma nepomemben. Nasprotno ima ključni učinek $\\hat{\\beta} = 15.0$ ob $n = 20$ lahko $p = 0.08$ in je izjemno pomemben, a zgreši mejo $p < 0.05$.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Prikaz ocen z intervali zaupanja (Forest plot) premaga vsako tabelo številk z zvezdicami.',
        simpleExplanation: 'Namesto da bralca prisilimo k primerjanju 40 številk v tabeli, narišemo vsako spremenljivko na vertikalni osi, na horizontalni osi pa njen vpliv s 95 % intervalom zaupanja.',
        practicalInsight: 'V paketu R s funkcijami broom::tidy(model) in ggplot2 zlahka ustvarimo objavljive grafikone koeficientov z geom_pointrange() ali geom_errorbarh(). V Pythonu to omogoča seaborn ali statsmodels.',
        mathematicalTheory: 'V večkratni linearni regresiji $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ je ocena $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}$ z variančno-kovariančno matriko $\\text{Var}(\\hat{\\boldsymbol{\\beta}}) = \\sigma^2 (\\mathbf{X}^T\\mathbf{X})^{-1}$. Interval zaupanja za $\\beta_j$ je $\\hat{\\beta}_j \\pm t_{n-k-1, 1-\\alpha/2} \\sqrt{[\\text{Var}(\\hat{\\boldsymbol{\\beta}})]_{jj}}$.'
      },
      textbookWisdom: {
        simpleQuote: 'Prikaz ocen z intervali zaupanja (Forest plot) premaga vsako tabelo številk z zvezdicami.',
        simpleExplanation: 'Namesto da bralca prisilimo k primerjanju 40 številk v tabeli, narišemo vsako spremenljivko na vertikalni osi, na horizontalni osi pa njen vpliv s 95 % intervalom zaupanja.',
        practicalInsight: 'V sodobnem poročanju podatkovne znanosti grafikoni koeficientov drastično zmanjšajo kognitivno obremenitev odločevalcev in preprečijo napačno interpretacijo mejnih p-vrednosti.',
        mathematicalTheory: 'Standardna napaka ocene: $\\text{SE}(\\hat{\\beta}_j) = \\frac{s_e}{\\sqrt{\\sum (x_{ij} - \\bar{x}_j)^2 (1 - R_j^2)}}$, kjer $R_j^2$ meri kolinearnost spremenljivke $x_j$ z vsemi ostalimi prediktorji (VIF faktor).'
      },
      cueBannerText: 'Preučite razliko med predstavitvijo regresijskega modela s tabelo številk in modernim grafikonom koeficientov.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Kaj neposredno razberemo iz grafikona regresijskih koeficientov (Forest plot), če 95 % interval zaupanja za spremenljivko "Starost" sega od -1.2 do +2.4?',
        prompt: 'Upoštevajte lego intervala glede na navpično ničelno premico (ničelni učinek):',
        options: [
          {
            id: 'opt-1',
            text: 'Interval vsebuje vrednost 0, zato ob stopnji značilnosti α = 0.05 ne moremo zavrniti ničelne hipoteze (učinek ni statistično značilen).',
            isCorrect: true,
            explanation: 'Pravilno! Ker interval prečka vrednost 0, podatki niso nezdružljivi z ničelnim učinkom ob 95 % zaupanju (p > 0.05).'
          },
          {
            id: 'opt-2',
            text: 'Ker je zgornja meja (+2.4) večja od spodnje (-1.2), je učinek zagotovo pozitiven in statistično značilen.',
            isCorrect: false,
            explanation: 'Napačno. Prisotnost negativnih in pozitivnih vrednosti v intervalu pomeni, da je negotovost prevelika, da bi določili smer učinka z 95 % gotovostjo.'
          },
          {
            id: 'opt-3',
            text: 'Model je neveljaven in ga moramo v celoti zavreči.',
            isCorrect: false,
            explanation: 'Napačno. Neveljavnost enega koeficienta le pomeni, da ta spremenljivka ob prisotnosti ostalih ne prispeva k napovedi.'
          }
        ],
        insight: 'Vizualizacija intervala zaupanja nemudoma pokaže tako točkovno oceno kot tudi njeno statistično (ne)značilnost glede na ničlo!',
        followUpExperiment: 'V Laboratoriju za vizualizacijo odprite zavihek "6. Vizualizacija modelov & Negotovost" in preizkusite spreminjanje stopnje zaupanja z 90 % na 99 %.'
      },
      mathProof: {
        summaryLatex: '\\beta_j \\in [\\hat{\\beta}_j - t_{n-k-1, \\alpha/2} \\text{SE}(\\hat{\\beta}_j), \\; \\hat{\\beta}_j + t_{n-k-1, \\alpha/2} \\text{SE}(\\hat{\\beta}_j)]',
        steps: [
          {
            title: '1. Matrični zapis OLS ocene',
            latex: '\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{y}',
            explanation: 'Optimalni vektor ocen, ki minimizira vsoto kvadratov odstopanj v večrazsežnem prostoru.'
          },
          {
            title: '2. Izpeljava standardne napake posameznega koeficienta',
            latex: '\\text{SE}(\\hat{\\beta}_j) = \\sqrt{s^2 ((\\mathbf{X}^T\\mathbf{X})^{-1})_{jj}}',
            explanation: 'Diagonala inverzne matrike določa individualno variabilnost vsakega ocenjenega parametra.'
          },
          {
            title: '3. Konstrukcija simetričnega intervala zaupanja',
            latex: 'P\\left( \\hat{\\beta}_j - t_{crit} \\text{SE}(\\hat{\\beta}_j) \\le \\beta_j \\le \\hat{\\beta}_j + t_{crit} \\text{SE}(\\hat{\\beta}_j) \\right) = 1 - \\alpha',
            explanation: 'V 95 % naključnih vzorcev bo tako skonstruiran interval zaobjel pravo populacijsko vrednost parametra.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava več regresijskih modelov in izris koeficientov',
        defaultCode: `import statsmodels.api as sm
import numpy as np
import pandas as pd

# Simulacija podatkov: Plača glede na izobrazbo, izkušnje in veščine
np.random.seed(42)
n = 200
izobrazba = np.random.normal(14, 2.5, n)
izkusnje = np.random.uniform(1, 25, n)
vescine = 0.5 * izobrazba + np.random.normal(10, 3, n)
placa = 800 + 45 * izobrazba + 25 * izkusnje + 35 * vescine + np.random.normal(0, 50, n)

df = pd.DataFrame({'Placa': placa, 'Izobrazba': izobrazba, 'Izkusnje': izkusnje, 'Vescine': vescine})

# Model 1: Enostavni (samo izobrazba)
X1 = sm.add_constant(df[['Izobrazba']])
m1 = sm.OLS(df['Placa'], X1).fit()

# Model 2: Večkratni (z izkušnjami in veščinami)
X2 = sm.add_constant(df[['Izobrazba', 'Izkusnje', 'Vescine']])
m2 = sm.OLS(df['Placa'], X2).fit()

print("=== MODEL 1 (Surova ocena izobrazbe) ===")
print(f"Koeficient Izobrazbe: {m1.params['Izobrazba']:.2f} (SE: {m1.bse['Izobrazba']:.2f})")
print(f"95% CI: [{m1.conf_int().loc['Izobrazba', 0]:.2f}, {m1.conf_int().loc['Izobrazba', 1]:.2f}]")

print("\\n=== MODEL 2 (Po kontroli za izkušnje in veščine) ===")
print(f"Koeficient Izobrazbe: {m2.params['Izobrazba']:.2f} (SE: {m2.bse['Izobrazba']:.2f})")
print(f"95% CI: [{m2.conf_int().loc['Izobrazba', 0]:.2f}, {m2.conf_int().loc['Izobrazba', 1]:.2f}]")
print(f"Koeficient Veščin:    {m2.params['Vescine']:.2f} (SE: {m2.bse['Vescine']:.2f})")`,
        description: 'Preučite, kako vključitev kontrolnih spremenljivk vpliva na ocene koeficientov in njihove intervale zaupanja.',
        runCode: (code: string) => {
          return {
            output: `=== MODEL 1 (Surova ocena izobrazbe) ===\nKoeficient Izobrazbe: 62.45 (SE: 4.12)\n95% CI: [54.38, 70.52]\n\n=== MODEL 2 (Po kontroli za izkušnje in veščine) ===\nKoeficient Izobrazbe: 44.18 (SE: 3.85)\n95% CI: [36.63, 51.73]\nKoeficient Veščin:    36.12 (SE: 2.94)\n95% CI: [30.36, 41.88]\n\nUgotovitev: V Modelu 1 je bila izobrazba precenjena (62.45 vs 44.18), ker je prevzela del vpliva koreliranih tehničnih veščin (Omitted Variable Bias). Forest plot to spremembo prikaže nemudoma!`,
            metrics: { m1_beta: 62.45, m2_beta: 44.18, omitted_bias: 18.27 }
          };
        }
      }
    }
  ]
};
