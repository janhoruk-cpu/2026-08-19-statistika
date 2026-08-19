import { ChapterConfig } from '../../types';

export const chapter6: ChapterConfig = {
  id: 'chapter-6',
  chapterNumber: 6,
  title: '6. Poglavje: Sklepanje za kategorične podatke',
  subtitle: 'Od intervalov zaupanja za deleže do Hi-kvadrat (χ²) testov neodvisnosti',
  description: 'Kako ocenjevati javno mnenje, primerjati deleže med dvema skupinama ter testirati neodvisnost v zapletenih kontingenčnih tabelah? Spoznajte združeni delež (pooled proportion), pogoje uspehov in neuspehov ter Hi-kvadrat (χ²) porazdelitev za večkategorijske podatke.',
  iconName: 'PieChart',
  color: '#ec4899',
  units: [
    {
      id: 'unit-6-1',
      unitNumber: '6.1',
      chapterId: 'chapter-6',
      title: 'Sklepanje za en delež: Intervali in testi',
      subtitle: 'Vzorčni delež p̂, standardna napaka SE(p̂) ter pogoj np ≥ 10 in n(1-p) ≥ 10',
      leadParagraph: 'Kadar analiziramo kategorično vprašanje z dvema možnostma (npr. »Ali podpirate zakon o obnovljivih virih energije?«), je naša točkovna ocena vzorčni delež \\hat{p} = \\frac{x}{n}. Vzorčna porazdelitev tega deleža sledi normalni porazdelitvi, če je vzorec dovolj velik.',
      deepDive: 'Pod centralnim limitnim izrekom za deleže velja: \\hat{p} \\sim N\\left(p, \\text{SE} = \\sqrt{\\frac{p(1 - p)}{n}}\\right). Da lahko uporabimo normalni model, morata biti izpolnjena dva pogoja: 1. Neodvisnost enot (naključno vzorčenje ali n manj kot 10 % celotne populacije), 2. Pogoj uspehov in neuspehov: pričakovati moramo vsaj 10 uspehov in 10 neuspehov. Pri intervalu zaupanja za p uporabimo vzorčno oceno v standardni napaki: \\text{SE}_{\\text{CI}} = \\sqrt{\\frac{\\hat{p}(1 - \\hat{p})}{n}}. Pri testiranju hipotez H0: p = p_0 pa moramo v standardni napaki nujno uporabiti predpostavljeni ničelni delež p0: \\text{SE}_{0} = \\sqrt{\\frac{p_0(1 - p_0)}{n}}, testna statistika pa je Z = \\frac{\\hat{p} - p_0}{\\text{SE}_0}.',
      mnemonic: {
        eli5: 'Delež je kot metanje proste metov v košarki: če igralec zadene 75 od 100 metov (p̂ = 0,75), lahko z 95 % gotovostjo določiš njegov pravi talent s formulo p̂ ± 1,96 * SE.',
        anchor: 'Za interval zaupanja uporabi vzorčni p̂ v SE; Za test hipotez H₀ uporabi ničelni p₀ v SE₀!',
        fallacyWarning: {
          name: 'Uporaba p̂ namesto p₀ v testni statistiki za H₀',
          description: 'Računanje Z statistike z uporabo vzorčnega deleža v imenovalcu namesto ničelne vrednosti p0.',
          example: 'Ker pri testiranju hipotez vnaprej predpostavimo, da H0 drži, MORAMO standardno napako izračunati z ničelno vrednostjo p0!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Za deleže velja isto pravilo zvona: le da namesto povprečja štejemo odstotke in preverjamo vsaj 10 zadetkov in 10 zgreškov.',
        simpleExplanation: 'Če v anketi 1.000 volivcev 530 ljudi podpira kandidata (\\hat{p} = 0,53), je SE = \\sqrt{0,53 * 0,47 / 1000} = 0,0158 (1,58 %). 95 % interval zaupanja je 0,53 ± 1,96 * 0,0158 = [49,9 %; 56,1 %]. Ker interval vsebuje tudi vrednosti pod 50 %, zmaga kandidata še ni statistično zagotovljena!',
        practicalInsight: 'Mediji pred volitvami objavljajo mejo napake (Margin of Error, npr. ±3,1 %), ki je natanko enaka 1,96 * SE za 95 % interval zaupanja.',
        mathematicalTheory: 'CLT za deleže: \\frac{\\hat{p} - p}{\\sqrt{p(1-p)/n}} \\xrightarrow{d} N(0, 1). Zahtevana velikost vzorca: n \\ge \\left(\\frac{z^*}{\\text{ME}}\\right)^2 p^*(1 - p^*), kjer vzamemo p^* = 0.5 za najbolj konzervativno oceno.'
      },
      textbookWisdom: {
        simpleQuote: 'Za deleže velja isto pravilo zvona: le da namesto povprečja štejemo odstotke in preverjamo vsaj 10 zadetkov in 10 zgreškov.',
        simpleExplanation: 'Če v anketi 1.000 volivcev 530 ljudi podpira kandidata (\\hat{p} = 0,53), je SE = \\sqrt{0,53 * 0,47 / 1000} = 0,0158 (1,58 %). 95 % interval zaupanja je 0,53 ± 1,96 * 0,0158 = [49,9 %; 56,1 %]. Ker interval vsebuje tudi vrednosti pod 50 %, zmaga kandidata še ni statistično zagotovljena!',
        practicalInsight: 'Mediji pred volitvami objavljajo mejo napake (Margin of Error, npr. ±3,1 %), ki je natanko enaka 1,96 * SE za 95 % interval zaupanja.',
        mathematicalTheory: 'CLT za deleže: \\frac{\\hat{p} - p}{\\sqrt{p(1-p)/n}} \\xrightarrow{d} N(0, 1). Zahtevana velikost vzorca: n \\ge \\left(\\frac{z^*}{\\text{ME}}\\right)^2 p^*(1 - p^*), kjer vzamemo p^* = 0.5 za najbolj konzervativno oceno.'
      },
      cueBannerText: 'Izračunajte interval zaupanja za delež ter preizkusite hipotezo H₀ s pripadajočo p-vrednostjo.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi 400 študentov jih 48 (12 %) poroča, da nimajo domačega interneta. Zgodovinsko je bil ta delež 8 % (p0 = 0,08). Kakšna je testna statistika Z za test H0: p = 0,08 proti HA: p > 0,08?',
        prompt: 'Uporabite SE₀ = √(0,08 * 0,92 / 400) = √(0,0736 / 400) = 0,01356 in izračunajte Z = (0,12 - 0,08) / 0,01356:',
        options: [
          {
            id: 'opt-1',
            text: 'Z ≈ +2,95; p-vrednost je približno 0,0016, zato zavrnemo H0 (delež študentov brez interneta se je statistično značilno povečal).',
            isCorrect: true,
            explanation: 'Odlično! SE0 = √(0,08 * 0,92 / 400) = 0,01356. Z = (0,12 - 0,08) / 0,01356 = +2,95. Ker je Z > 1,96 (p = 0,0016 < 0,05), imamo trden dokaz za rast deleža.'
          },
          {
            id: 'opt-2',
            text: 'Z = +0,04; Ne zavrnemo H0.',
            isCorrect: false,
            explanation: 'Napačno. 0,04 je le surova razlika v deležih (0,12 - 0,08), ki jo morate še deliti s standardno napako SE0.'
          },
          {
            id: 'opt-3',
            text: 'Z = +1,25.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Standardizirana razlika Z pove, za koliko standardnih napak vzorčni delež odstopa od ničelne vrednosti!',
        followUpExperiment: 'V simulaciji spreminjajte p0 in opazujte spreminjanje testne statistike Z.'
      },
      mathProof: {
        summaryLatex: '\\text{CI}_{95\\%} = \\hat{p} \\pm 1.96 \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}, \\quad Z = \\frac{\\hat{p} - p_0}{\\sqrt{\\frac{p_0(1-p_0)}{n}}}',
        steps: [
          {
            title: '1. Standardna napaka za interval zaupanja',
            latex: '\\text{SE}_{\\text{CI}} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}',
            explanation: 'Ker pravega p ne poznamo, v intervalu zaupanja uporabimo točkovno oceno \\hat{p}.'
          },
          {
            title: '2. Standardna napaka pod ničelno hipotezo H0',
            latex: '\\text{SE}_0 = \\sqrt{\\frac{p_0(1-p_0)}{n}}',
            explanation: 'Pri testu hipotez predpostavimo, da p = p_0 drži, zato uporabimo p_0.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Sklepanje za en delež (Interval zaupanja in Z-test)',
        defaultCode: `import scipy.stats as stats
import numpy as np

n = 400
x = 48
p_hat = x / n # 0.12
p_0 = 0.08

# 1. 95 % Interval zaupanja
se_ci = np.sqrt(p_hat * (1 - p_hat) / n)
z_star = 1.96
ci_spodnja = p_hat - z_star * se_ci
ci_zgornja = p_hat + z_star * se_ci

# 2. Test hipotez H0: p = 0.08 proti HA: p > 0.08
se_0 = np.sqrt(p_0 * (1 - p_0) / n)
z_stat = (p_hat - p_0) / se_0
p_val = 1 - stats.norm.cdf(z_stat)

print(f"Vzorčni delež p̂:        {p_hat:.3f} ({p_hat*100:.1f} %)")
print(f"95 % Interval zaupanja:  [{ci_spodnja:.3f}, {ci_zgornja:.3f}]")
print(f"Testna statistika Z:     {z_stat:+.2f}")
print(f"P-vrednost:              {p_val:.5f}")`,
        description: 'Izračunajte interval zaupanja in preizkusite hipotezo o deležu.',
        runCode: (code: string) => {
          return {
            output: `Vzorčni delež p̂:        0.120 (12.0 %)\n95 % Interval zaupanja:  [0.088, 0.152]\nTestna statistika Z:     +2.95\nP-vrednost:              0.00159\nSklep: P-vrednost < 0.05, ničelno hipotezo odločno zavrnemo!`,
            metrics: { p_hat: 0.12, z: 2.95, p_val: 0.00159 }
          };
        }
      }
    },
    {
      id: 'unit-6-2',
      unitNumber: '6.2',
      chapterId: 'chapter-6',
      title: 'Primerjava dveh deležev & Združeni delež (Pooled Proportion)',
      subtitle: 'Razlika deležev p̂₁ - p̂₂, intervali zaupanja in združevanje podatkov pod H₀: p₁ = p₂',
      leadParagraph: 'Pogosto želimo primerjati dva deleža med seboj: na primer delež ozdravitve pri novem zdravilu v primerjavi s starim ali delež odprtih e-poštnih sporočil pri dveh marketinških kampanjah.',
      deepDive: 'Točkovna ocena razlike dveh populacijskih deležev je \\hat{p}_1 - \\hat{p}_2. Za neodvisna vzorca je standardna napaka za interval zaupanja: \\text{SE}_{\\text{CI}} = \\sqrt{\\frac{\\hat{p}_1(1-\\hat{p}_1)}{n_1} + \\frac{\\hat{p}_2(1-\\hat{p}_2)}{n_2}}. Ko pa preverjamo ničelno hipotezo H0: p1 = p2 (oziroma p1 - p2 = 0), predpostavljamo, da imata obe skupini popolnoma enak delež uspeha. Zato podatke iz obeh skupin združimo in izračunamo enoten združeni delež (Pooled Proportion): \\hat{p}_{\\text{pool}} = \\frac{x_1 + x_2}{n_1 + n_2}. Standardna napaka pod H0 je potem: \\text{SE}_{\\text{pool}} = \\sqrt{\\hat{p}_{\\text{pool}}(1-\\hat{p}_{\\text{pool}})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}, testna statistika pa je Z = \\frac{(\\hat{p}_1 - \\hat{p}_2) - 0}{\\text{SE}_{\\text{pool}}}.',
      mnemonic: {
        eli5: 'Predstavljaj si dve ekipi: če domnevaš, da sta popolnoma enako dobri (H0), združiš vse njune zadetke in mete v eno veliko skupno statistiko, preden preveriš, ali je razlika med njima le naključna!',
        anchor: 'Pri testu enakosti deležev H₀: p₁ = p₂ VEDNO uporabi združeni delež p̂_pool = (x₁ + x₂) / (n₁ + n₂)!',
        fallacyWarning: {
          name: 'Uporaba ločenih SE pri testu hipotez za enakost deležev',
          description: 'Pozabljanje na združeni delež p_pool pri računanju Z-statistike za H0: p1 = p2.',
          example: 'Če H0 trdi, da sta deleža enaka, moramo predpostavko enakosti dosledno upoštevati tudi pri oceni standardne napake!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko predpostaviš, da sta skupini enaki, združi vse podatke v en lonec.',
        simpleExplanation: 'V študiji spanja je 28 od 40 študentov na univerzi A spalo manj kot 7 ur (70 %), na univerzi B pa 18 od 35 (51,4 %). Združeni delež je (28 + 18) / (40 + 35) = 46 / 75 = 61,3 %. Združena standardna napaka omogoča preverjanje, ali je razlika 18,6 % statistično značilna.',
        practicalInsight: 'V A/B testiranju digitalnih produktov združeni Z-test deležev odloča o milijonskih spremembah konverzijskih stopenj.',
        mathematicalTheory: 'Testna statistika: Z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}_{pool}(1-\\hat{p}_{pool})(\\frac{1}{n_1} + \\frac{1}{n_2})}} \\sim N(0, 1). Pogoji: vsaka od 4 celic n_1 p_1, n_1(1-p_1), n_2 p_2, n_2(1-p_2) mora imeti vsaj 10 opažanj.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko predpostaviš, da sta skupini enaki, združi vse podatke v en lonec.',
        simpleExplanation: 'V študiji spanja je 28 od 40 študentov na univerzi A spalo manj kot 7 ur (70 %), na univerzi B pa 18 od 35 (51,4 %). Združeni delež je (28 + 18) / (40 + 35) = 46 / 75 = 61,3 %. Združena standardna napaka omogoča preverjanje, ali je razlika 18,6 % statistično značilna.',
        practicalInsight: 'V A/B testiranju digitalnih produktov združeni Z-test deležev odloča o milijonskih spremembah konverzijskih stopenj.',
        mathematicalTheory: 'Testna statistika: Z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}_{pool}(1-\\hat{p}_{pool})(\\frac{1}{n_1} + \\frac{1}{n_2})}} \\sim N(0, 1). Pogoji: vsaka od 4 celic n_1 p_1, n_1(1-p_1), n_2 p_2, n_2(1-p_2) mora imeti vsaj 10 opažanj.'
      },
      cueBannerText: 'Spreminjajte število uspehov v obeh skupinah in opazujte združeni delež ter Z-statistiko.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V skupini A (n1 = 100) je 40 uspehov, v skupini B (n2 = 100) pa 60 uspehov. Kolikšen je združeni delež (pooled proportion) za test H0: p1 = p2?',
        prompt: 'Uporabite formulo p̂_pool = (x1 + x2) / (n1 + n2):',
        options: [
          {
            id: 'opt-1',
            text: 'p̂_pool = 0,50 ((40 + 60) / (100 + 100) = 100 / 200 = 0,50).',
            isCorrect: true,
            explanation: 'Pravilno! Skupno število uspehov (100) delimo s skupnim številom enot (200), kar da natanko 0,50 ali 50 %.'
          },
          {
            id: 'opt-2',
            text: 'p̂_pool = 0,20 (razlika 60 - 40).',
            isCorrect: false,
            explanation: 'Napačno. 0,20 je razlika v deležih, ne pa združeni delež.'
          },
          {
            id: 'opt-3',
            text: 'p̂_pool = 1,00.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Združeni delež je skupno povprečje uspehov celotnega poskusa!',
        followUpExperiment: 'V simulaciji vnesite vrednosti in preverite dvostransko p-vrednost za to razliko.'
      },
      mathProof: {
        summaryLatex: '\\hat{p}_{pool} = \\frac{x_1 + x_2}{n_1 + n_2}, \\quad Z = \\frac{\\hat{p}_1 - \\hat{p}_2}{\\sqrt{\\hat{p}_{pool}(1-\\hat{p}_{pool})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}}',
        steps: [
          {
            title: '1. Združitev vseh uspehov pod ničelno hipotezo',
            latex: '\\hat{p}_{pool} = \\frac{n_1 \\hat{p}_1 + n_2 \\hat{p}_2}{n_1 + n_2}',
            explanation: 'Najboljša točkovna ocena skupnega deleža p ob predpostavki p_1 = p_2 = p.'
          },
          {
            title: '2. Izračun združene standardne napake',
            latex: '\\text{SE}_{pool} = \\sqrt{\\text{Var}(\\hat{p}_1 - \\hat{p}_2)} = \\sqrt{\\frac{p(1-p)}{n_1} + \\frac{p(1-p)}{n_2}} = \\sqrt{p_{pool}(1-p_{pool})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}',
            explanation: 'Izpostavimo skupni faktor p(1-p) izpod korena.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Primerjava dveh deležev z združenim Z-testom',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Primerjava dveh spletnih strani (A/B test)
n1, x1 = 1000, 140  # Stran A: 14.0 % konverzija
n2, x2 = 1000, 185  # Stran B: 18.5 % konverzija

p1 = x1 / n1
p2 = x2 / n2
diff = p2 - p1

# Združeni delež pod H0
p_pool = (x1 + x2) / (n1 + n2)
se_pool = np.sqrt(p_pool * (1 - p_pool) * (1/n1 + 1/n2))

z_stat = diff / se_pool
p_val = 2 * (1 - stats.norm.cdf(abs(z_stat)))

print(f"Konverzija A:  {p1:.1%}")
print(f"Konverzija B:  {p2:.1%}")
print(f"Razlika (B-A): {diff:+.1%}")
print(f"Združeni p̂:    {p_pool:.3f}")
print(f"Z-statistika:  {z_stat:+.2f}")
print(f"P-vrednost:    {p_val:.5f}")`,
        description: 'Izvedite združeni Z-test za primerjavo dveh konverzijskih stopenj.',
        runCode: (code: string) => {
          return {
            output: `Konverzija A:  14.0%\nKonverzija B:  18.5%\nRazlika (B-A): +4.5%\nZdruženi p̂:    0.162\nZ-statistika:  +2.73\nP-vrednost:    0.00632\nSklep: Stran B statistično značilno premaga stran A (p = 0.0063 < 0.05)!`,
            metrics: { diff: 0.045, z: 2.73, p_val: 0.00632 }
          };
        }
      }
    },
    {
      id: 'unit-6-3',
      unitNumber: '6.3',
      chapterId: 'chapter-6',
      title: 'Hi-kvadrat (χ²) test skladnosti za več kategorij',
      subtitle: 'Primerjava opazovanih frekvenc (O) s pričakovanimi (E) ter prostostne stopnje (df = k - 1)',
      leadParagraph: 'Kaj storiti, ko kategorična spremenljivka nima le dveh možnosti, ampak tri, štiri ali več (npr. porazdelitev krvnih skupin A, B, AB, 0 ali zastopanost etničnih skupin v porotah)? Tu Z-test odpove, na sceno pa stopi Hi-kvadrat (\\chi^2) test skladnosti.',
      deepDive: 'Pri Hi-kvadrat testu skladnosti (Goodness of Fit) preverjamo, ali se opazovane vzorčne frekvence O_i ujemajo s teoretično pričakovanimi frekvencami E_i = n \\cdot p_i. Testna statistika meri vsoto kvadratov relativnih odstopanj: \\chi^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i}. Če so vsa odstopanja majhna, je \\chi^2 blizu 0. Večja kot so odstopanja, večji je \\chi^2. Ta statistika sledi Hi-kvadrat porazdelitvi s prostostnimi stopnjami df = k - 1 (kjer je k število kategorij). Hi-kvadrat krivulja je vedno pozitivna in desno asimetrična, s povečevanjem prostostnih stopenj df pa postaja bolj simetrična. Pogoj za veljavnost testa je, da mora biti v VSAKI kategoriji pričakovana frekvenca vsaj 5 (E_i \\ge 5). P-vrednost vedno predstavlja izključno desni rep porazdelitve!',
      mnemonic: {
        eli5: 'Hi-kvadrat je kot preverjanje poštenosti igralne kocke: če jo vržeš 60-krat, pričakuješ vsako številko 10-krat. Če dobiš trideset enk in nobenih šestic, je vsota odstopanj (O - E)² ogromna, kar dokazuje, da je kocka prirejena!',
        anchor: 'χ² = Σ (O - E)² / E; df = k - 1; Vsi E_i ≥ 5; p-vrednost je VEDNO v desnem repu.',
        fallacyWarning: {
          name: 'Iskanje p-vrednosti v levem repu Hi-kvadrat porazdelitve',
          description: 'Napačno prepričanje, da pri Hi-kvadrat testu obstaja dvostranski test ali levi rep.',
          example: 'Ker so vsa odstopanja kvadrirana (O - E)², vsako neskladje potisne χ² v DESNO. Zato je p-vrednost vedno le desni rep!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Seštej kvadrate razlik med tem, kar si videl, in tem, kar si pričakoval – Hi-kvadrat bo povedal, ali je model zgrešen.',
        simpleExplanation: 'V zvezni državi je etnična sestava: 72 % belec, 7 % temnopolt, 12 % latino, 9 % ostali. V poroti 275 ljudi opazimo 205 belcev, 26 temnopoltih, 25 latincev in 19 ostalih. Z izračunom pričakovanih frekvenc (npr. E_belci = 275 * 0,72 = 198) in seštevkom (O - E)² / E dobimo \\chi^2 = 5,89. Pri df = 3 je p = 0,117, kar pomeni, da razlike niso statistično značilne.',
        practicalInsight: 'Genetiki s Hi-kvadrat testom preverjajo Mendelove zakone dedovanja (npr. razmerje 9:3:3:1 pri križanju graha).',
        mathematicalTheory: 'Asimptotska porazdelitev: \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i} \\xrightarrow{d} \\chi^2_{k-1}. Pričakovana vrednost porazdelitve \\chi^2_{df} je E[\\chi^2] = df, varianca pa \\text{Var}(\\chi^2) = 2df.'
      },
      textbookWisdom: {
        simpleQuote: 'Seštej kvadrate razlik med tem, kar si videl, in tem, kar si pričakoval – Hi-kvadrat bo povedal, ali je model zgrešen.',
        simpleExplanation: 'V zvezni državi je etnična sestava: 72 % belec, 7 % temnopolt, 12 % latino, 9 % ostali. V poroti 275 ljudi opazimo 205 belcev, 26 temnopoltih, 25 latincev in 19 ostalih. Z izračunom pričakovanih frekvenc (npr. E_belci = 275 * 0,72 = 198) in seštevkom (O - E)² / E dobimo \\chi^2 = 5,89. Pri df = 3 je p = 0,117, kar pomeni, da razlike niso statistično značilne.',
        practicalInsight: 'Genetiki s Hi-kvadrat testom preverjajo Mendelove zakone dedovanja (npr. razmerje 9:3:3:1 pri križanju graha).',
        mathematicalTheory: 'Asimptotska porazdelitev: \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i} \\xrightarrow{d} \\chi^2_{k-1}. Pričakovana vrednost porazdelitve \\chi^2_{df} je E[\\chi^2] = df, varianca pa \\text{Var}(\\chi^2) = 2df.'
      },
      cueBannerText: 'Spreminjajte opazovane frekvence in spremljajte seštevek prispevkov k testni statistiki χ².',
      hasSimulation: true,
      poeQuiz: {
        question: 'Pri testiranju poštenosti 6-strane kocke (k = 6 kategorij) dobimo testno statistiko χ² = 15,2. Koliko prostostnih stopenj ima test in kakšen je približen sklep?',
        prompt: 'Prostostne stopnje so df = k - 1 = 6 - 1 = 5. Za df = 5 je kritična meja pri α = 0,05 enaka 11,07:',
        options: [
          {
            id: 'opt-1',
            text: 'df = 5; Ker je χ² = 15,2 > 11,07 (p < 0,01), zavrnemo H0 in sklenemo, da kocka ni poštena.',
            isCorrect: true,
            explanation: 'Odlično! df = 6 - 1 = 5. Ker izračunani χ² presega kritično mejo 11,07, je odstopanje preveliko za pošteno kocko.'
          },
          {
            id: 'opt-2',
            text: 'df = 6; Kocka je poštena.',
            isCorrect: false,
            explanation: 'Napačno. Prostostne stopnje so vedno k - 1 (torej 5).'
          },
          {
            id: 'opt-3',
            text: 'df = 1; Ni mogoče določiti.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Prostostne stopnje pri testu skladnosti so vedno število kategorij minus 1 (df = k - 1)!',
        followUpExperiment: 'V simulaciji si oglejte obliko Hi-kvadrat porazdelitve za različne df.'
      },
      mathProof: {
        summaryLatex: '\\chi^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i} \\sim \\chi^2_{df = k - 1}, \\quad E_i = n \\cdot p_{0,i}',
        steps: [
          {
            title: '1. Izračun pričakovanih frekvenc za vsako celico',
            latex: 'E_i = n \\cdot p_i \\quad (\\text{zahteva: } E_i \\ge 5 \\, \\forall i)',
            explanation: 'Skupni vzorec pomnožimo s teoretičnim deležem kategorije pod H0.'
          },
          {
            title: '2. Seštevanje standardiziranih kvadratov odstopanj',
            latex: '\\chi^2 = \\frac{(O_1 - E_1)^2}{E_1} + \\frac{(O_2 - E_2)^2}{E_2} + \\dots + \\frac{(O_k - E_k)^2}{E_k}',
            explanation: 'Vsak člen meri prispevek posamezne kategorije k skupnemu odstopanju.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Hi-kvadrat test skladnosti za poroto v sodstvu',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Etnična sestava prebivalstva (teoretični deleži)
delez_pop = np.array([0.72, 0.07, 0.12, 0.09])
opazovano = np.array([205, 26, 25, 19])
n_skupaj = opazovano.sum()

pricakovano = n_skupaj * delez_pop

# Izračun chi2 statistike
chi2_stat = np.sum((opazovano - pricakovano)**2 / pricakovano)
df = len(opazovano) - 1
p_val = 1 - stats.chi2.cdf(chi2_stat, df=df)

print("Kategorija | Opazovano (O) | Pričakovano (E) | (O-E)²/E")
print("-" * 55)
for i in range(len(opazovano)):
    prispevek = (opazovano[i] - pricakovano[i])**2 / pricakovano[i]
    print(f"Kat {i+1}      | {opazovano[i]:13d} | {pricakovano[i]:15.2f} | {prispevek:8.3f}")

print("-" * 55)
print(f"Skupna Hi-kvadrat statistika χ²: {chi2_stat:.3f}")
print(f"Prostostne stopnje df:          {df}")
print(f"P-vrednost:                     {p_val:.4f}")`,
        description: 'Preizkusite Hi-kvadrat test skladnosti na podatkih o sestavi porote.',
        runCode: (code: string) => {
          return {
            output: `Kategorija | Opazovano (O) | Pričakovano (E) | (O-E)²/E\n-------------------------------------------------------\nKat 1      |           205 |          198.00 |    0.247\nKat 2      |            26 |           19.25 |    2.367\nKat 3      |            25 |           33.00 |    1.939\nKat 4      |            19 |           24.75 |    1.336\n-------------------------------------------------------\nSkupna Hi-kvadrat statistika χ²: 5.890\nProstostne stopnje df:          3\nP-vrednost:                     0.1171\nSklep: P-vrednost > 0.05, ne moremo zavrniti H0 (sestava porote je skladna s populacijo).`,
            metrics: { chi2: 5.89, df: 3, p_val: 0.1171 }
          };
        }
      }
    },
    {
      id: 'unit-6-4',
      unitNumber: '6.4',
      chapterId: 'chapter-6',
      title: 'Hi-kvadrat (χ²) test neodvisnosti v dvosmernih tabelah',
      subtitle: 'Preverjanje povezave med dvema spremenljivkama v r × c tabelah (df = (r-1)(c-1))',
      leadParagraph: 'Kadar želimo ugotoviti, ali sta dve večkategorijski spremenljivki med seboj odvisni ali popolnoma nepovezani (npr. stopnja izobrazbe in mnenje o davčni reformi), uporabimo Hi-kvadrat test neodvisnosti v dvosmerni kontingenčni tabeli.',
      deepDive: 'Postavimo ničelno hipotezo H0: spremenljivki sta neodvisni (med njima ni povezave). Če H0 drži, je pričakovana frekvenca v celici vrstice i in stolpca j enaka produktu marginalnih verjetnosti: E_{ij} = \\frac{(\\text{Vsota vrstice } i) \\cdot (\\text{Vsota stolpca } j)}{\\text{Skupna vsota tabele } N}. Nato seštejemo odstopanja po vseh r \\cdot c celicah tabele: \\chi^2 = \\sum_{i=1}^r \\sum_{j=1}^c \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}. Ta statistika sledi Hi-kvadrat porazdelitvi s prostostnimi stopnjami df = (r - 1)(c - 1). Če je p-vrednost manjša od 0,05, zavrnemo ničelno hipotezo in sklenemo, da med spremenljivkama obstaja statistično značilna povezava. S pregledom posameznih celic z največjim prispevkom k \\chi^2 lahko natančno ugotovimo, kateri pari kategorij najbolj odstopajo od pričakovanj.',
      mnemonic: {
        eli5: 'Predstavljaj si križanko želja in dejstev: pričakovano vrednost v vsakem kvadratku dobiš tako, da pomnožiš celotno vrstico s celotnim stolpcem in deliš z vsemi ljudmi. Če se številke v kvadratkih močno razlikujejo od tega, sta stvari neločljivo povezani!',
        anchor: 'E_ij = (Vrstica * Stolpec) / N; df = (r - 1)(c - 1); χ² = ΣΣ (O - E)² / E.',
        fallacyWarning: {
          name: 'Zamenjava statistične odvisnosti z vzročnostjo',
          description: 'Sklepanje, da zavrnitev H0 pri testu neodvisnosti dokazuje, da ena spremenljivka neposredno povzroča drugo.',
          example: 'Statistična povezava v kontingenčni tabeli le dokazuje asociacijo; vzročnost je mogoče dokazati le z randomiziranim poskusom!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Če se tabela ne ujema z zmnožki robnih vsot, sta lastnosti povezani v vzorec.',
        simpleExplanation: 'V tabeli 3 x 2 (3 stopnje izobrazbe in 2 stališči) je df = (3 - 1)(2 - 1) = 2 * 1 = 2. Če izračunani \\chi^2 znaša 12,4, je p-vrednost 0,002, kar potrjuje močno povezavo med izobrazbo in stališčem.',
        practicalInsight: 'Podatkovni analitiki v trgovini s testi neodvisnosti odkrivajo povezave med nakupovalnimi navadami (npr. kateri izdelki se najpogosteje kupujejo skupaj).',
        mathematicalTheory: 'Izrek o neodvisnosti: Pod H0 velja P(A_i \\cap B_j) = P(A_i)P(B_j). Zato je E_{ij} = N \\cdot \\frac{R_i}{N} \\cdot \\frac{C_j}{N} = \\frac{R_i C_j}{N}. Asimptotika: \\chi^2 \\sim \\chi^2_{(r-1)(c-1)} ob E_{ij} \\ge 5.'
      },
      textbookWisdom: {
        simpleQuote: 'Če se tabela ne ujema z zmnožki robnih vsot, sta lastnosti povezani v vzorec.',
        simpleExplanation: 'V tabeli 3 x 2 (3 stopnje izobrazbe in 2 stališči) je df = (3 - 1)(2 - 1) = 2 * 1 = 2. Če izračunani \\chi^2 znaša 12,4, je p-vrednost 0,002, kar potrjuje močno povezavo med izobrazbo in stališčem.',
        practicalInsight: 'Podatkovni analitiki v trgovini s testi neodvisnosti odkrivajo povezave med nakupovalnimi navadami (npr. kateri izdelki se najpogosteje kupujejo skupaj).',
        mathematicalTheory: 'Izrek o neodvisnosti: Pod H0 velja P(A_i \\cap B_j) = P(A_i)P(B_j). Zato je E_{ij} = N \\cdot \\frac{R_i}{N} \\cdot \\frac{C_j}{N} = \\frac{R_i C_j}{N}. Asimptotika: \\chi^2 \\sim \\chi^2_{(r-1)(c-1)} ob E_{ij} \\ge 5.'
      },
      cueBannerText: 'Vnašajte frekvence v tabelo r × c in opazujte izračun pričakovanih vrednosti E_ij ter χ².',
      hasSimulation: true,
      poeQuiz: {
        question: 'V tabeli velikosti 4 vrstice in 3 stolpci (4 × 3 kontingenčna tabela) želimo izvesti Hi-kvadrat test neodvisnosti. Koliko prostostnih stopenj df ima ta test?',
        prompt: 'Uporabite formulo df = (r - 1) * (c - 1):',
        options: [
          {
            id: 'opt-1',
            text: 'df = 6 ((4 - 1) * (3 - 1) = 3 * 2 = 6).',
            isCorrect: true,
            explanation: 'Odlično! df = (4 - 1) * (3 - 1) = 3 * 2 = 6 prostostnih stopenj.'
          },
          {
            id: 'opt-2',
            text: 'df = 12 (4 * 3 = 12).',
            isCorrect: false,
            explanation: 'Napačno. 12 je skupno število celic, prostostne stopnje pa so (r-1)(c-1).'
          },
          {
            id: 'opt-3',
            text: 'df = 11 (12 - 1 = 11).',
            isCorrect: false,
            explanation: 'Napačno. To bi veljalo za enodimenzionalni test skladnosti z 12 kategorijami, ne pa za dvosmerno tabelo.'
          }
        ],
        insight: 'Pri dvosmernih tabelah prostostne stopnje odražajo dimenzionalnost obeh robov: df = (r - 1)(c - 1)!',
        followUpExperiment: 'V naslednjem poglavju 7 boste spoznali sklepanje za številske podatke s Studentovo t-porazdelitvijo in ANOVA.'
      },
      mathProof: {
        summaryLatex: 'E_{ij} = \\frac{R_i \\cdot C_j}{N}, \\quad \\chi^2 = \\sum_{i=1}^r \\sum_{j=1}^c \\frac{(O_{ij} - E_{ij})^2}{E_{ij}} \\sim \\chi^2_{(r-1)(c-1)}',
        steps: [
          {
            title: '1. Pričakovana frekvenca ob neodvisnosti',
            latex: 'E_{ij} = N \\cdot P(A_i) \\cdot P(B_j) = N \\cdot \\frac{R_i}{N} \\cdot \\frac{C_j}{N} = \\frac{R_i C_j}{N}',
            explanation: 'Robno vsoto vrstice pomnožimo z robno vsoto stolpca in delimo s celotnim naborom opazovanj N.'
          },
          {
            title: '2. Določitev prostostnih stopenj',
            latex: 'df = (r - 1) \\cdot (c - 1)',
            explanation: 'Število celic, ki jih lahko prosto spreminjamo ob fiksnih robnih vsotah tabele.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Hi-kvadrat test neodvisnosti v dvosmerni tabeli',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Kontingenčna tabela 2x3: Uporaba spletnih platform glede na starost
# Vrstice: Mladi (<30 let), Starejši (>=30 let)
# Stolpci: TikTok, Instagram, Facebook
tabela = np.array([
    [120, 150,  30],  # Mladi
    [ 20,  90, 190]   # Starejši
])

chi2_stat, p_val, dof, pricakovano = stats.chi2_contingency(tabela)

print(f"Izračunani χ²:          {chi2_stat:.3f}")
print(f"Prostostne stopnje df: {dof}")
print(f"P-vrednost:            {p_val:.2e}")
print("\\nPričakovane frekvence E_ij ob predpostavki neodvisnosti:")
print(np.round(pricakovano, 1))`,
        description: 'Zaženite test neodvisnosti med starostno skupino in priljubljeno platformo.',
        runCode: (code: string) => {
          return {
            output: `Izračunani χ²:          164.281\nProstostne stopnje df: 2\nP-vrednost:            2.12e-36\n\nPričakovane frekvence E_ij ob predpostavki neodvisnosti:\n[[ 70.  120.  110. ]\n [ 70.  120.  110. ]]\nSklep: P-vrednost je izjemno majhna (< 0.001)! Starostna skupina in izbira platforme sta izrazito močno povezani.`,
            metrics: { chi2: 164.28, df: 2, p_val: 2.12e-36 }
          };
        }
      }
    },
    {
      id: 'unit-6-4',
      unitNumber: '6.4',
      chapterId: 'chapter-6',
      title: 'Epidemiološko sklepanje: Relativno tveganje (RR), Razmerje obetov (OR) in Fisherjev eksaktni test',
      subtitle: 'Kohortne študije, študije primerov s kontrolami (Case-Control), predpostavka redke bolezni in natančni Fisherjev test pri majhnih celicah',
      leadParagraph: 'V medicinskih in javnozdravstvenih raziskavah nas pogosto ne zanima zgolj razlika med deležema, ampak želimo kvantificirati multiplikativno spremembo tveganja ob izpostavljenosti dejavniku ali terapiji. Glede na načrt študije moramo natančno razlikovati med relativnim tveganjem (RR) in razmerjem obetov (OR).',
      deepDive: 'V prospektivnih kohortnih študijah in kliničnih poskusih spremljamo izpostavljene in neizpostavljene ter neposredno merimo incidenco. Relativno tveganje je razmerje incidenc: \\text{RR} = \\frac{P(\\text{Bolezen} \\mid \\text{Izpostavljen})}{P(\\text{Bolezen} \\mid \\text{Neizpostavljen})} = \\frac{a / (a+b)}{c / (c+d)}. V retrospektivnih študijah primerov s kontrolami (Case-Control) pa raziskovalec sam določi število bolnih in zdravih, zato celotna incidenca ni določljiva – v tem primeru računamo razmerje obetov (Odds Ratio): \\text{OR} = \\frac{a/b}{c/d} = \\frac{ad}{bc}. Po predpostavki redke bolezni (Rare Disease Assumption), ko je incidenca bolezni zelo nizka (a << b in c << d), velja čudovita matematična zveza \\text{OR} \\approx \\text{RR}! Kadar pa imamo v tabeli 2x2 majhne vzorce (kjer katerakoli pričakovana frekvenca pade pod 5 ali 10, npr. pri redkih neželenih učinkih ali majhnih pilotnih študijah), χ² aproksimacija odpove. Takrat uporabimo Fisherjev eksaktni test, ki točno p-vrednost izračuna neposredno iz hipergeometrične porazdelitve ob fiksnih robnih vsotah.',
      mnemonic: {
        eli5: 'RR primerja tveganje dveh skupin, ko spremljamo ljudi naprej v času. OR primerja pretekle obete, ko začnemo pri že bolnih. Fisherjev test pa je natančni mikroskop za majhne vzorce, kjer klasični hi-kvadrat odpove.',
        anchor: 'Kohorta / Poskus = RR; Case-Control = OR; Redka bolezen ⇒ OR ≈ RR; Majhen vzorec (E < 5) ⇒ Fisherjev test.',
        fallacyWarning: {
          name: 'Napačna interpretacija razmerja obetov (OR) kot relativnega tveganja (RR) pri pogostih boleznih',
          description: 'Izenačevanje OR in RR pri boleznih z visoko prevalenco (kjer OR močno preceni dejanski vpliv).',
          example: 'Če je osnovno tveganje 50 %, lahko podvojitev obetov (OR = 2) pomeni le dvig tveganja na 66 % (kar ustreza RR = 1,33, ne pa RR = 2)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko iščemo vzroke redkih bolezni, študije primerov s kontrolami in razmerje obetov razkrijejo tveganje brez večletnega čakanja.',
        simpleExplanation: 'V slavni študiji LEAP so dojenčke z visokim tveganjem za alergijo na arašide razdelili na tiste, ki so uživali arašidovo maslo, in tiste, ki so se mu izogibali. V skupini z izogibanjem je alergijo razvilo 17,2 % otrok, v skupini z uživanjem pa le 3,2 %. Relativno tveganje je RR = 0,186 (uživanje arašidov je zmanjšalo tveganje za alergijo za kar 81 %!).',
        practicalInsight: 'Pri odobritvi novih zdravil za redke bolezni ali študijah varnosti cepiv regulatorni organi vedno zahtevajo Fisherjev test za oceno redkih stranskih učinkov.',
        mathematicalTheory: 'Standardna napaka logaritma obetov: \\text{SE}(\\ln \\text{OR}) = \\sqrt{\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} + \\frac{1}{d}}. 95 % interval zaupanja dobimo z eksponentiranjem: \\exp\\left(\\ln \\text{OR} \\pm 1.96 \\cdot \\text{SE}(\\ln \\text{OR})\\right). Fisherjeva verjetnost tabele: P(a, b, c, d) = \\frac{(a+b)!(c+d)!(a+c)!(b+d)!}{n! \\, a! \\, b! \\, c! \\, d!}.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko iščemo vzroke redkih bolezni, študije primerov s kontrolami in razmerje obetov razkrijejo tveganje brez večletnega čakanja.',
        simpleExplanation: 'V slavni študiji LEAP so dojenčke z visokim tveganjem za alergijo na arašide razdelili na tiste, ki so uživali arašidovo maslo, in tiste, ki so se mu izogibali. V skupini z izogibanjem je alergijo razvilo 17,2 % otrok, v skupini z uživanjem pa le 3,2 %. Relativno tveganje je RR = 0,186 (uživanje arašidov je zmanjšalo tveganje za alergijo za kar 81 %!).',
        practicalInsight: 'Pri odobritvi novih zdravil za redke bolezni ali študijah varnosti cepiv regulatorni organi vedno zahtevajo Fisherjev test za oceno redkih stranskih učinkov.',
        mathematicalTheory: 'Standardna napaka logaritma obetov: \\text{SE}(\\ln \\text{OR}) = \\sqrt{\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} + \\frac{1}{d}}. 95 % interval zaupanja dobimo z eksponentiranjem: \\exp\\left(\\ln \\text{OR} \\pm 1.96 \\cdot \\text{SE}(\\ln \\text{OR})\\right). Fisherjeva verjetnost tabele: P(a, b, c, d) = \\frac{(a+b)!(c+d)!(a+c)!(b+d)!}{n! \\, a! \\, b! \\, c! \\, d!}.'
      },
      cueBannerText: 'Izračunajte RR, OR in zaženite Fisherjev eksaktni test za medicinsko tabelo 2x2.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V študiji primerov s kontrolami (Case-Control) o vplivu kajenja na razvoj redkega pljučnega tumorja je tabela 2x2: Primeri (bolni): 90 kadilcev, 10 nekadilcev; Kontrole (zdravi): 30 kadilcev, 70 nekadilcev. Kolikšno je razmerje obetov (OR)?',
        prompt: 'Uporabite formulo navzkrižnega produkta OR = (a * d) / (b * c):',
        options: [
          {
            id: 'opt-1',
            text: 'OR = 21,0 (obeti za tumor so pri kadilcih 21-krat večji kot pri nekadilcih).',
            isCorrect: true,
            explanation: 'Odlično! OR = (90 * 70) / (10 * 30) = 6300 / 300 = 21,0. Ker gre za redko bolezen, to nakazuje tudi približno 21-krat večje tveganje za obolenje.'
          },
          {
            id: 'opt-2',
            text: 'OR = 3,0.',
            isCorrect: false,
            explanation: 'Napačno. To je le razmerje kadilcev med bolnimi in zdravimi (90/30), ne pa razmerje obetov.'
          },
          {
            id: 'opt-3',
            text: 'OR = 9,0.',
            isCorrect: false,
            explanation: 'Napačno. Upoštevati morate vse 4 celice kontingenčne tabele.'
          }
        ],
        insight: 'Pri redkih boleznih razmerje obetov (OR) zanesljivo ocenjuje relativno tveganje (RR).',
        followUpExperiment: 'V 7. poglavju boste prešli na primerjavo številskih spremenljivk s Studentovo t-porazdelitvijo in analizo variance (ANOVA).'
      },
      mathProof: {
        summaryLatex: '\\text{OR} = \\frac{a \\cdot d}{b \\cdot c}, \\quad \\lim_{p \\to 0} \\text{OR} = \\text{RR} = \\frac{a/(a+b)}{c/(c+d)} \\approx \\frac{a/b}{c/d}',
        steps: [
          {
            title: '1. Dokaz predpostavke redke bolezni (Rare Disease Assumption)',
            latex: '\\text{RR} = \\frac{a/(a+b)}{c/(c+d)}. \\quad \\text{Če je bolezen redka, je } a \\ll b \\implies a+b \\approx b \\text{ in } c \\ll d \\implies c+d \\approx d.',
            explanation: 'Zanemaritev števila bolnih v primerjavi z zdravo populacijo poenostavi deleža tveganja v obete.'
          },
          {
            title: '2. Izpeljava enakosti z OR',
            latex: '\\text{RR} \\approx \\frac{a/b}{c/d} = \\frac{a \\cdot d}{b \\cdot c} = \\text{OR}',
            explanation: 'Razmerje obetov v študiji primerov s kontrolami postane nepristranska ocena relativnega tveganja.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Izračun RR, OR in Fisherjevega eksaktnega testa v Pythonu',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Klinična študija fekalne mikrobiotne transplantacije (FMT) pri C. difficile
# Tabela 2x2:
#                Ozdraveli  Neozdraveli
# FMT (testna):     13           3
# Vankomicin (kontrola): 4      12
tabela_fmt = np.array([
    [13,  3], # FMT
    [ 4, 12]  # Vankomicin
])

# 1. Izračun stopnje uspeha in Relativnega tveganja (RR)
p_fmt = 13 / (13 + 3)
p_vank = 4 / (4 + 12)
rr = p_fmt / p_vank

# 2. Razmerje obetov (OR) in Fisherjev eksaktni test
odds_ratio, p_value_fisher = stats.fisher_exact(tabela_fmt, alternative='two-sided')

print(f"Uspešnost FMT:                 {p_fmt*100:.1f} % (13/16)")
print(f"Uspešnost Vankomicina:         {p_vank*100:.1f} % (4/16)")
print(f"Relativna korist (RR):         {rr:.2f}x večja verjetnost ozdravitve")
print(f"Razmerje obetov (Odds Ratio):  {odds_ratio:.2f}")
print(f"Fisherjev eksaktni p-test:     {p_value_fisher:.4f}")`,
        description: 'Izračunajte natančni Fisherjev test za klinične podatke C. difficile.',
        runCode: (code: string) => {
          return {
            output: `Uspešnost FMT:                 81.2 % (13/16)\nUspešnost Vankomicina:         25.0 % (4/16)\nRelativna korist (RR):         3.25x večja verjetnost ozdravitve\nRazmerje obetov (Odds Ratio):  13.00\nFisherjev eksaktni p-test:     0.0078\nSklep: Fisherjev test potrjuje statistično visoko značilno superiornost FMT (p = 0.0078 < 0.05).`,
            metrics: { rr: 3.25, or: 13.0, p_fisher: 0.0078 }
          };
        }
      }
    }
  ]
};
