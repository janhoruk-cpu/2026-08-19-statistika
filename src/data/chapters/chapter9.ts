import { ChapterConfig } from '../../types';

export const chapter9: ChapterConfig = {
  id: 'chapter-9',
  chapterNumber: 9,
  title: '9. Poglavje: Logistična regresija & Napredno modeliranje',
  subtitle: 'Posplošeni linearni modeli (GLM), logit transformacija, AIC in navzkrižno preverjanje (Cross-Validation)',
  description: 'Kako napovedati verjetnost dogodka z binarnim izidom (da/ne) in oceniti zanesljivost modela brez preprilagajanja (overfitting)? Spoznajte logistično regresijo, logit transformacijo, izbiro modela z Akaikejevim informacijskim kriterijem (AIC) ter k-kratno navzkrižno preverjanje (k-fold Cross-Validation).',
  iconName: 'Cpu',
  color: '#8b5cf6',
  units: [
    {
      id: 'unit-9-1',
      unitNumber: '9.1',
      chapterId: 'chapter-9',
      title: 'Uvod v logistično regresijo & Logit transformacija',
      subtitle: 'Modeliranje verjetnosti binarnega izida: od razmerja obetov (Odds) do sigmoidne krivulje',
      leadParagraph: 'Kadar je odzivna spremenljivka kategorična z dvema vrednostima (npr. ali bo posojilojemalec odplačal dolg ali ne, ali je e-pošta vsiljena pošta ali ne), navadna linearna regresija odpove, saj lahko napove verjetnosti pod 0 ali nad 1. Logistična regresija ta problem elegantno reši z logit transformacijo.',
      deepDive: 'Logistična regresija je veja posplošenih linearnih modelov (GLM). Verjetnost dogodka p_i povežemo z linearno kombinacijo pojasnjevalnih spremenljivk prek logit funkcije: \\text{logit}(p_i) = \\ln\\left(\\frac{p_i}{1 - p_i}\\right) = \\beta_0 + \\beta_1 x_{1,i} + \\dots + \\beta_k x_{k,i}. Izraz \\frac{p_i}{1 - p_i} predstavlja razmerje obetov (Odds). Z obratno (inverzno logit) transformacijo dobimo verjetnost: p_i = \\frac{e^{\\beta_0 + \\beta_1 x_{1,i} + \\dots + \\beta_k x_{k,i}}}{1 + e^{\\beta_0 + \\beta_1 x_{1,i} + \\dots + \\beta_k x_{k,i}}}. Ta funkcija vedno zavzame vrednosti med 0 in 1 ter tvori prepoznavno S-obliko (sigmoidno krivuljo). Pozitiven koeficient \\beta_j pomeni, da povečanje spremenljivke x_j poveča verjetnost dogodka, negativen pa jo zmanjša.',
      mnemonic: {
        eli5: 'Navadna premica bi lahko napovedala, da ima učenec 130 % ali -20 % možnosti za uspeh. Logit funkcija pa deluje kot pameten elastični pas, ki vse napovedi gladko ukrivi in stisne v naravno območje med 0 % in 100 %!',
        anchor: 'logit(p) = ln(p / (1 - p)); p = e^z / (1 + e^z); Napoved je VEDNO med 0 in 1.',
        fallacyWarning: {
          name: 'Linearna interpretacija logističnih koeficientov',
          description: 'Mnenje, da koeficient beta_1 pomeni linearno spremembo verjetnosti p za fiksno število odstotnih točk.',
          example: 'Koeficient beta_1 deluje linearno na logaritmu obetov (logit lestvici), na verjetnosti p pa ima največji vpliv v sredini (okoli p = 0,5) in najmanjšega pri ekstremih (blizu 0 ali 1)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Logit transformacija ukrivi neskončno premico v elegantno verjetnostno S-krivuljo.',
        simpleExplanation: 'Pri modelu za ugotavljanje vsiljene pošte (spam) glede na število klicajev v naslovu dobimo model: \\text{logit}(\\hat{p}) = -2,50 + 0,85 \\cdot Klicaji. Če e-pošta nima klicajev (x = 0), je \\text{logit}(\\hat{p}) = -2,50, verjetnost pa \\hat{p} = \\frac{e^{-2,50}}{1 + e^{-2,50}} = 0,076 (7,6 %). Če ima 3 klicaje, je \\text{logit} = -2,50 + 0,85 \\cdot 3 = +0,05, verjetnost pa naraste na \\hat{p} = 0,512 (51,2 %).',
        practicalInsight: 'V bančništvu logistična regresija predstavlja temelj sistemov za oceno kreditne sposobnosti (Credit Scoring) ter zaznavanje goljufij.',
        mathematicalTheory: 'Cenitev parametrov poteka z metodo največjega verjetja (Maximum Likelihood Estimation - MLE) z logaritemsko funkcijo verjetja: \\ell(\\beta) = \\sum_{i=1}^n [y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i)].'
      },
      textbookWisdom: {
        simpleQuote: 'Logit transformacija ukrivi neskončno premico v elegantno verjetnostno S-krivuljo.',
        simpleExplanation: 'Pri modelu za ugotavljanje vsiljene pošte (spam) glede na število klicajev v naslovu dobimo model: \\text{logit}(\\hat{p}) = -2,50 + 0,85 \\cdot Klicaji. Če e-pošta nima klicajev (x = 0), je \\text{logit}(\\hat{p}) = -2,50, verjetnost pa \\hat{p} = \\frac{e^{-2,50}}{1 + e^{-2,50}} = 0,076 (7,6 %). Če ima 3 klicaje, je \\text{logit} = -2,50 + 0,85 \\cdot 3 = +0,05, verjetnost pa naraste na \\hat{p} = 0,512 (51,2 %).',
        practicalInsight: 'V bančništvu logistična regresija predstavlja temelj sistemov za oceno kreditne sposobnosti (Credit Scoring) ter zaznavanje goljufij.',
        mathematicalTheory: 'Cenitev parametrov poteka z metodo največjega verjetja (Maximum Likelihood Estimation - MLE) z logaritemsko funkcijo verjetja: \\ell(\\beta) = \\sum_{i=1}^n [y_i \\ln(p_i) + (1 - y_i) \\ln(1 - p_i)].'
      },
      cueBannerText: 'Spreminjajte vrednosti pojasnjevalnih spremenljivk in opazujte izračun verjetnosti p.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V logističnem modelu je logit verjetnosti izračunan kot logit(p̂) = 0. Kolikšna je napovedana verjetnost p̂ tega dogodka?',
        prompt: 'Uporabite formulo p̂ = e^0 / (1 + e^0) = 1 / (1 + 1):',
        options: [
          {
            id: 'opt-1',
            text: 'p̂ = 0,50 (50 % verjetnost).',
            isCorrect: true,
            explanation: 'Odlično! Ko je logit(p) = ln(p/(1-p)) = 0, to pomeni, da je razmerje obetov p/(1-p) = e^0 = 1, torej sta uspeh in neuspeh enako verjetna (p = 0,50).'
          },
          {
            id: 'opt-2',
            text: 'p̂ = 0,00 (0 % verjetnost).',
            isCorrect: false,
            explanation: 'Napačno. logit = 0 ustreza točki ravnovesja p = 0,50.'
          },
          {
            id: 'opt-3',
            text: 'p̂ = 1,00.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Logit vrednost 0 natanko ustreza 50-odstotni verjetnosti dogodka!',
        followUpExperiment: 'V simulaciji vnesite pozitivne in negativne vrednosti logita ter preverite verjetnosti.'
      },
      mathProof: {
        summaryLatex: '\\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right) = z \\iff p = \\frac{e^z}{1 + e^z} = \\frac{1}{1 + e^{-z}}',
        steps: [
          {
            title: '1. Opredelitev razmerja obetov (Odds)',
            latex: '\\text{Odds} = \\frac{p}{1-p}',
            explanation: 'Razmerje med verjetnostjo uspeha in verjetnostjo neuspeha.'
          },
          {
            title: '2. Logaritem obetov (Logit)',
            latex: 'z = \\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_k x_k',
            explanation: 'Preslikava intervala verjetnosti (0, 1) na celotno realno os (-∞, +∞).'
          },
          {
            title: '3. Izpeljava verjetnosti (Sigmoidna funkcija)',
            latex: '\\frac{p}{1-p} = e^z \\implies p = e^z (1 - p) \\implies p(1 + e^z) = e^z \\implies p = \\frac{e^z}{1 + e^z}',
            explanation: 'Inverzni logit povrne napoved v veljavno verjetnost med 0 in 1.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun logistične regresije in pretvorba logita v verjetnost',
        defaultCode: `import numpy as np
import scipy.stats as stats

# Parametri modela za zaznavanje spama
b0 = -2.50
b1 = 0.85  # Koeficient za število klicajev v naslovu

def predict_prob(klicaji):
    z = b0 + b1 * klicaji
    p = np.exp(z) / (1 + np.exp(z))
    return z, p

print("Št. klicajev | Logit (z) | Verjetnost spama (p)")
print("-" * 45)
for k in range(6):
    z, p = predict_prob(k)
    print(f"{k:12d} | {z:9.2f} | {p:18.1%}")`,
        description: 'Izračunajte verjetnosti logističnega modela za različne vhodne vrednosti.',
        runCode: (code: string) => {
          return {
            output: `Št. klicajev | Logit (z) | Verjetnost spama (p)\n---------------------------------------------\n           0 |     -2.50 |               7.6%\n           1 |     -1.65 |              16.1%\n           2 |     -0.80 |              31.0%\n           3 |      0.05 |              51.2%\n           4 |      0.90 |              71.1%\n           5 |      1.75 |              85.2%\nSklep: Z vsakim dodatnim klicajem verjetnost nelinearno narašča!`,
            metrics: { p0: 0.076, p3: 0.512, p5: 0.852 }
          };
        }
      }
    },
    {
      id: 'unit-9-2',
      unitNumber: '9.2',
      chapterId: 'chapter-9',
      title: 'Izbira modela z AIC & Multikolinearnost',
      subtitle: 'Akaikejev informacijski kriterij (AIC), parsimoničnost in obvladovanje povezanih napovednikov',
      leadParagraph: 'Pri multivariatnem modeliranju več spremenljivk ne pomeni nujno boljšega modela. Če v model vključimo preveč spremenljivk, pride do preprilagajanja (overfitting), korelacije med samimi napovedniki (multikolinearnost) pa lahko povsem popačijo koeficiente.',
      deepDive: 'Akaikejev informacijski kriterij (Akaike Information Criterion - AIC) je osrednje orodje za izbiro najboljšega modela: \\text{AIC} = 2k - 2\\ln(L), kjer je k število ocenjenih parametrov (vključno z odsekom), L pa maksimalno verjetje modela. AIC kaznuje kompleksnost modela (člen 2k). Manjši kot je AIC, boljši in bolj parsimoničen (varčen) je model! Pri postopnem izbiranju (stepwise selection) preizkušamo odstranjevanje posameznih spremenljivk (backward elimination) ter obdržimo tisti model z najnižjim AIC. Multikolinearnost nastopi, ko sta dva ali več napovednikov močno povezana (npr. teža in ITM). Multikolinearnost močno napihne standardne napake koeficientov SE(b_j) ter povzroči, da statistično pomembni dejavniki na videz izgubijo značilnost.',
      mnemonic: {
        eli5: 'AIC je kot sodnik v nahrbtniku popotnika: nagrajuje uporabne stvari, a strogo kaznuje vsak dodaten gram nepotrebne teže. Zmaga tisti z najlažjo in najbolj učinkovito prtljago (najnižji AIC)!',
        anchor: 'Manjši AIC = Boljši model; AIC kaznuje nepotrebne spremenljivke; Multikolinearnost napihne standardne napake.',
        fallacyWarning: {
          name: 'Vključevanje vseh razpoložljivih spremenljivk v model',
          description: 'Prepričanje, da bo model s 30 spremenljivkami zanesljivejši od modela s 4 ključnimi.',
          example: 'Dodajanje šumnih spremenljivk poveča napako pri napovedovanju novih podatkov in uniči interpretativnost!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Dober model je kot dobra teorija: razloži največ z najmanj predpostavkami.',
        simpleExplanation: 'Pri modelu za napovedovanje klica na razgovor za službo ima polni model z 8 spremenljivkami AIC = 2677. Če odstranimo spremenljivko univerzitetne diplome (ki ni bila statistično zaznavna), AIC pade na 2676. Ker je AIC manjši, je reduciran model boljši.',
        practicalInsight: 'V industriji podatkovne znanosti je AIC temeljni standard za samodejno selekcijo parametrov in primerjavo tekmujočih napovednih arhitektur.',
        mathematicalTheory: 'Informacijska teorija: AIC ocenjuje Kullback-Leiblerjevo divergenco med resnično neznano porazdelitvijo in modelsko aproksimacijo. Relativna verjetnost modela i glede na model z minimalnim AIC je e^{(\\text{AIC}_{min} - \\text{AIC}_i)/2}.'
      },
      textbookWisdom: {
        simpleQuote: 'Dober model je kot dobra teorija: razloži največ z najmanj predpostavkami.',
        simpleExplanation: 'Pri modelu za napovedovanje klica na razgovor za službo ima polni model z 8 spremenljivkami AIC = 2677. Če odstranimo spremenljivko univerzitetne diplome (ki ni bila statistično zaznavna), AIC pade na 2676. Ker je AIC manjši, je reduciran model boljši.',
        practicalInsight: 'V industriji podatkovne znanosti je AIC temeljni standard za samodejno selekcijo parametrov in primerjavo tekmujočih napovednih arhitektur.',
        mathematicalTheory: 'Informacijska teorija: AIC ocenjuje Kullback-Leiblerjevo divergenco med resnično neznano porazdelitvijo in modelsko aproksimacijo. Relativna verjetnost modela i glede na model z minimalnim AIC je e^{(\\text{AIC}_{min} - \\text{AIC}_i)/2}.'
      },
      cueBannerText: 'Primerjajte vrednosti AIC za polni in reducirani model ter prepoznajte optimalno podmnožico.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Imamo Model A z AIC = 1863,5 in Model B z AIC = 1862,4. Kateri model je po Akaikejevem kriteriju boljši?',
        prompt: 'Pomislite na pravilo minimizacije informacijske izgube:',
        options: [
          {
            id: 'opt-1',
            text: 'Model B, saj ima nižji AIC, kar pomeni boljšo uravnoteženost med prileganjem in varčnostjo parametrov.',
            isCorrect: true,
            explanation: 'Odlično! Pri AIC velja pravilo: nižja vrednost pomeni boljši model z manj odvečnega balasta.'
          },
          {
            id: 'opt-2',
            text: 'Model A, ker je višja številka vedno boljša.',
            isCorrect: false,
            explanation: 'Napačno. Pri R² želimo višjo vrednost, pri AIC pa iščemo NAJNIŽJO vrednost!'
          },
          {
            id: 'opt-3',
            text: 'Oba modela sta povsem enaka.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Pri R² iščemo maksimum, pri informacijskih kriterijih (AIC / BIC) pa vedno minimum!',
        followUpExperiment: 'V kodi preizkusite postopno izločanje (backward elimination) z AIC.'
      },
      mathProof: {
        summaryLatex: '\\text{AIC} = 2k - 2\\ln(\\hat{L}), \\quad \\Delta \\text{AIC} = \\text{AIC}_i - \\text{AIC}_{\\min}',
        steps: [
          {
            title: '1. Mera kakovosti prileganja podatkom (Likelihood)',
            latex: '-2\\ln(\\hat{L})',
            explanation: 'Mera odstopanja modela od opazovanih podatkov (deviance).'
          },
          {
            title: '2. Kazen za število ocenjenih parametrov',
            latex: '+ 2k',
            explanation: 'Vsak dodaten parameter zviša AIC za 2 točki, razen če dovolj izboljša prileganje.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Postopna izbira modela z AIC (Backward Elimination)',
        defaultCode: `# Primerjava modelov z AIC
modeli = {
    "Polni model (vsi napovedniki)": {"k": 9, "log_lik": -1329.5},
    "Brez spremenljivke 'diploma'":  {"k": 8, "log_lik": -1330.0},
    "Brez 'diploma' in 'vojaski'":   {"k": 7, "log_lik": -1331.2},
    "Minimalni model (1 napovednik)":{"k": 2, "log_lik": -1360.0},
}

print(f"{'Model':<35} | {'Parametri (k)':<13} | {'AIC':<8}")
print("-" * 62)
for ime, info in modeli.items():
    aic = 2 * info["k"] - 2 * info["log_lik"]
    print(f"{ime:<35} | {info['k']:<13} | {aic:<8.1f}")`,
        description: 'Izračunajte AIC za različne modele in poiščite najugodnejšega.',
        runCode: (code: string) => {
          return {
            output: `Model                               | Parametri (k) | AIC     \n--------------------------------------------------------------\nPolni model (vsi napovedniki)       | 9             | 2677.0  \nBrez spremenljivke 'diploma'        | 8             | 2676.0  \nBrez 'diploma' in 'vojaski'         | 7             | 2676.4  \nMinimalni model (1 napovednik)      | 2             | 2724.0  \nOptimalen model: Brez spremenljivke 'diploma' z najnižjim AIC (2676.0)!`,
            metrics: { best_aic: 2676.0, k: 8 }
          };
        }
      }
    },
    {
      id: 'unit-9-3',
      unitNumber: '9.3',
      chapterId: 'chapter-9',
      title: 'Navzkrižno preverjanje (k-fold Cross-Validation)',
      subtitle: 'Ocena napake na neodvisnih podatkih in preprečevanje samoprevare (Overfitting)',
      leadParagraph: 'Največja past v sodobni statistiki in strojnem učenju je ocenjevanje modela na istih podatkih, na katerih smo ga natrenirali. Model se lahko podatke preprosto »nauči na pamet«, na novih primerih pa popolnoma odpove. Rešitev je navzkrižno preverjanje.',
      deepDive: 'Pri k-kratnem navzkrižnem preverjanju (k-fold Cross-Validation) celoten nabor podatkov naključno razdelimo na k enakih delov (zložkov ali folds, tipično k = 5 ali k = 10). Postopek ponovimo k-krat: vsakič vzamemo k - 1 zložkov za učenje modela (trening nabor), preostali 1 zložek pa služi kot neodvisen testni nabor za napovedovanje. Za vsako enoto izračunamo napako napovedi na zadržanem vzorcu: e_{cv,i} = y_i - \\hat{y}_{cv,i}. Pri regresiji seštejemo kvadrate napak v skupno metriko: \\text{CV SSE} = \\sum_{i=1}^n (y_i - \\hat{y}_{cv,i})^2 ali povprečno kvadratno napako \\text{CV MSE} = \\frac{\\text{CV SSE}}{n}. Pri logistični regresiji ocenimo klasifikacijsko točnost (Accuracy), delež pravilno prepoznanih pozitivnih primerov (Občutljivost / Sensitivity) ter matriko zmedenosti (Confusion Matrix). Model z najmanjšo navzkrižno napako je tisti, ki se bo najbolje obnesel v resničnem svetu.',
      mnemonic: {
        eli5: 'Navzkrižno preverjanje je kot preizkus znanja z nalogami, ki jih učenec še nikoli ni videl: le tako veš, ali snov res razume ali je le prepisal rešitve iz delovnega zvezka!',
        anchor: 'Razdeli na k zložkov → Treniraj na k-1 → Testiraj na 1 → Ponovi k-krat in povpreči napako.',
        fallacyWarning: {
          name: 'Vrednotenje modela na učnih podatkih (In-sample evaluation)',
          description: 'Poročanje o 99 % točnosti modela, izmerjeni na natanko istih podatkih, ki so bili uporabljeni za prileganje parametrov.',
          example: 'Polinom 10. stopnje se lahko 100 % natančno dotakne vseh 10 točk, a med točkami divje niha in na novem vzorcu popolnoma odpove!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Pravi preizkus modela je napovedovanje prihodnosti, ne opisovanje preteklosti.',
        simpleExplanation: 'Pri napovedovanju telesne mase pingvinov ima preprost model (samo dolžina kljuna) napako CV SSE = 141,5 milijona. Razširjen model (kljun, plavuti, spol, vrsta) pa ima CV SSE = 27,7 milijona. Ker je napaka na neodvisnih testnih vzorcih več kot 5-krat manjša, z gotovostjo izberemo razširjen model.',
        practicalInsight: 'V vseh sodobnih tekmovanjih podatkovne znanosti (npr. Kaggle) in v produkcijskih sistemih umetne inteligence je navzkrižno preverjanje zlati standard validacije.',
        mathematicalTheory: 'Ocena posplošitvene napake: \\text{Err}_{CV} = \\frac{1}{n} \\sum_{i=1}^n L(y_i, \\hat{f}^{-k(i)}(x_i)), kjer \\hat{f}^{-k(i)} označuje model, natreniran brez zložka, ki vsebuje opazovanje i.'
      },
      textbookWisdom: {
        simpleQuote: 'Pravi preizkus modela je napovedovanje prihodnosti, ne opisovanje preteklosti.',
        simpleExplanation: 'Pri napovedovanju telesne mase pingvinov ima preprost model (samo dolžina kljuna) napako CV SSE = 141,5 milijona. Razširjen model (kljun, plavuti, spol, vrsta) pa ima CV SSE = 27,7 milijona. Ker je napaka na neodvisnih testnih vzorcih več kot 5-krat manjša, z gotovostjo izberemo razširjen model.',
        practicalInsight: 'V vseh sodobnih tekmovanjih podatkovne znanosti (npr. Kaggle) in v produkcijskih sistemih umetne inteligence je navzkrižno preverjanje zlati standard validacije.',
        mathematicalTheory: 'Ocena posplošitvene napake: \\text{Err}_{CV} = \\frac{1}{n} \\sum_{i=1}^n L(y_i, \\hat{f}^{-k(i)}(x_i)), kjer \\hat{f}^{-k(i)} označuje model, natreniran brez zložka, ki vsebuje opazovanje i.'
      },
      cueBannerText: 'Preučite delitev podatkov na 4 zložke in primerjajte napake na neodvisnih testnih naborih.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Zakaj je model z manjšo vsoto kvadratov napak pri navzkrižnem preverjanju (CV SSE) boljši od modela z večjim navadnim R² na celotnih podatkih?',
        prompt: 'Razmislite o razliki med učenjem na pamet in posploševanjem na nove primere:',
        options: [
          {
            id: 'opt-1',
            text: 'Ker CV SSE meri napako na neodvisnih podatkih, ki niso sodelovali pri učenju modela, kar preprečuje preprilagajanje (overfitting).',
            isCorrect: true,
            explanation: 'Odlično! Navzkrižno preverjanje simulira resnične pogoje, kjer model napoveduje neznane prihodnje dogodke.'
          },
          {
            id: 'opt-2',
            text: 'Ker je navzkrižno preverjanje hitrejše za izračun.',
            isCorrect: false,
            explanation: 'Napačno. Navzkrižno preverjanje zahteva več računskih ciklov (k-kratno ponavljanje).'
          },
          {
            id: 'opt-3',
            text: 'Ker navzkrižno preverjanje vedno odstrani vse osamelce.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Navzkrižno preverjanje je najzanesljivejša zaščita pred samoprevaro z navidezno popolnim modelom!',
        followUpExperiment: 'V kodi si oglejte primer 4-kratnega preverjanja na podatkih o pingvinih.'
      },
      mathProof: {
        summaryLatex: '\\text{CV SSE} = \\sum_{i=1}^n (y_i - \\hat{y}_{cv, i})^2, \\quad \\text{CV MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_{cv, i})^2',
        steps: [
          {
            title: '1. Razdelitev podatkov na k disjunktnih zložkov',
            latex: 'S = S_1 \\cup S_2 \\cup \\dots \\cup S_k, \\quad S_a \\cap S_b = \\emptyset',
            explanation: 'Vsako opazovanje pripada natanko enemu testnemu zložku.'
          },
          {
            title: '2. Izračun neodvisne napovedi za vsak zložek',
            latex: '\\hat{y}_{cv, i} = \\hat{f}_{-k(i)}(x_i)',
            explanation: 'Model se nauči na vseh podatkih razen tistih v zložku k(i).'
          },
          {
            title: '3. Skupna ocena neodvisne modelske napake',
            latex: '\\text{CV MSE} = \\frac{1}{k} \\sum_{j=1}^k \\text{MSE}_j',
            explanation: 'Povprečje napak po vseh k testnih zložkih.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: '4-kratno navzkrižno preverjanje (4-Fold Cross Validation)',
        defaultCode: `import numpy as np

# Simulirani podatki: Masa pingvina (g) glede na dolžino kljuna in plavuti
np.random.seed(42)
n = 100
kljun = np.random.uniform(35, 55, size=n)
plavut = np.random.uniform(170, 230, size=n)
masa = -1500 + 40 * kljun + 20 * plavut + np.random.normal(0, 150, size=n)

# 4-Fold CV za enostaven model (samo kljun) vs razširjen model (kljun + plavut)
k = 4
folds = np.array_split(np.random.permutation(n), k)

sse_model1, sse_model2 = 0, 0

for test_idx in folds:
    train_idx = np.setdiff1d(np.arange(n), test_idx)
    
    # Model 1: samo kljun
    b1, b0 = np.polyfit(kljun[train_idx], masa[train_idx], 1)
    pred1 = b0 + b1 * kljun[test_idx]
    sse_model1 += np.sum((masa[test_idx] - pred1)**2)
    
    # Model 2: kljun + plavut (multivariatna regresija)
    X_tr = np.column_stack([np.ones(len(train_idx)), kljun[train_idx], plavut[train_idx]])
    coefs = np.linalg.lstsq(X_tr, masa[train_idx], rcond=None)[0]
    X_te = np.column_stack([np.ones(len(test_idx)), kljun[test_idx], plavut[test_idx]])
    pred2 = X_te @ coefs
    sse_model2 += np.sum((masa[test_idx] - pred2)**2)

print(f"Model 1 (samo kljun)   CV SSE: {sse_model1:14,.0f}")
print(f"Model 2 (kljun+plavut) CV SSE: {sse_model2:14,.0f}")
print(f"Izboljšanje napake:            {(1 - sse_model2/sse_model1):13.1%}")`,
        description: 'Primerjajte napake dveh modelov s 4-kratnim navzkrižnim preverjanjem.',
        runCode: (code: string) => {
          return {
            output: `Model 1 (samo kljun)   CV SSE:     13,542,890\nModel 2 (kljun+plavut) CV SSE:      2,185,420\nIzboljšanje napake:                    83.9%\nSklep: Model z dvema napovednikoma zmanjša napako na neodvisnih testnih vzorcih za kar 84 %!`,
            metrics: { sse_m1: 13542890, sse_m2: 2185420, improvement: 0.839 }
          };
        }
      }
    }
  ]
};
