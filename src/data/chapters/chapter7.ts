import { ChapterConfig } from '../../types';

export const chapter7: ChapterConfig = {
  id: 'chapter-7',
  chapterNumber: 7,
  title: '7. Poglavje: Sklepanje za številske podatke',
  subtitle: 'Studentova t-porazdelitev, parjeni vzorci ter analiza variance (ANOVA & F-test)',
  description: 'Kako sklepati o povprečjih, ko je populacijski odklon σ neznan in vzorci majhni? Odkrijte Studentovo t-porazdelitev z debelimi repi, obvladajte parjene t-teste, primerjajte neodvisne skupine ter preizkusite enakost več skupin hkrati z analizo variance (ANOVA).',
  iconName: 'TrendingUp',
  color: '#0284c7',
  units: [
    {
      id: 'unit-7-1',
      unitNumber: '7.1',
      chapterId: 'chapter-7',
      title: 'Studentova t-porazdelitev za eno povprečje',
      subtitle: 'Kadar je σ neznan: prostostne stopnje (df = n - 1) in debeli repi',
      leadParagraph: 'V resničnem svetu skoraj nikoli ne poznamo pravega populacijskega odklona \\sigma, ampak ga moramo oceniti z vzorčnim odklonom s. Ker je s le ocena, v analizo vnaša dodatno negotovost – zato normalno porazdelitev zamenja Studentova t-porazdelitev.',
      deepDive: 'Studentova t-porazdelitev je simetrična in zvonasta kot normalna krivulja, vendar ima »debelejše repe« (heavier tails). To pomeni, da dopušča večjo verjetnost za ekstremne vrednosti, kar odraža dodatno negotovost zaradi ocene s. Njena oblika je odvisna od prostostnih stopenj: df = n - 1. Ko se velikost vzorca n povečuje (n \\ge 30, n \\ge 100), t-porazdelitev hitro konvergira k standardni normalni porazdelitvi Z. Interval zaupanja za povprečje \\mu izračunamo kot \\bar{x} \\pm t^*_{df} \\cdot \\text{SE}, kjer je \\text{SE} = \\frac{s}{\\sqrt{n}}. Testna statistika za ničelno hipotezo H0: \\mu = \\mu_0 pa je T = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}} \\sim t_{df = n - 1}.',
      mnemonic: {
        eli5: 'Predstavljaj si vzmetnico: ko je vzorec majhen (majhen df), je vzmetnica mehkejša in se robovi bolj povesijo (debeli repi). Ko je vzorec velik, se vzmetnica napne v popolno Gaussovo obliko!',
        anchor: 'Kadar ne poznaš σ, uporabi s in Studentovo t-porazdelitev z df = n - 1.',
        fallacyWarning: {
          name: 'Uporaba Z-tabele namesto t-tabele pri majhnih vzorcih',
          description: 'Uporaba kritične vrednosti 1,96 namesto t* pri vzorcu npr. n = 10.',
          example: 'Pri n = 10 (df = 9) je t* = 2,262 (in ne 1,96!). Uporaba 1,96 bi dala preozek interval zaupanja in umetno napihnila stopnjo lažnih alarmov.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Ko ocenjuješ odklon iz malega vzorca, te t-porazdelitev ščiti pred preveliko samozavestjo.',
        simpleExplanation: 'V raziskavi dobe delovanja nove baterije (n = 19, \\bar{x} = 29,8 h, s = 2,5 h) je df = 18. Za 95 % zaupanje je t*_{18} = 2,101. Standardna napaka je SE = 2,5 / \\sqrt{19} = 0,573 h. 95 % interval zaupanja je 29,8 ± 2,101 * 0,573 = [28,6 h; 31,0 h].',
        practicalInsight: 'William Gosset je t-porazdelitev razvil leta 1908 med vodenjem kontrole kakovosti v pivovarni Guinness, objavil pa jo je pod psevdonimom »Student«.',
        mathematicalTheory: 'Definicija t-spremenljivke: T = \\frac{Z}{\\sqrt{V / df}}, kjer je Z \\sim N(0, 1) in V \\sim \\chi^2_{df} neodvisni. Gostota: f(t) = \\frac{\\Gamma((df+1)/2)}{\\sqrt{\\pi df} \\Gamma(df/2)} \\left(1 + \\frac{t^2}{df}\\right)^{-\\frac{df+1}{2}}.'
      },
      textbookWisdom: {
        simpleQuote: 'Ko ocenjuješ odklon iz malega vzorca, te t-porazdelitev ščiti pred preveliko samozavestjo.',
        simpleExplanation: 'V raziskavi dobe delovanja nove baterije (n = 19, \\bar{x} = 29,8 h, s = 2,5 h) je df = 18. Za 95 % zaupanje je t*_{18} = 2,101. Standardna napaka je SE = 2,5 / \\sqrt{19} = 0,573 h. 95 % interval zaupanja je 29,8 ± 2,101 * 0,573 = [28,6 h; 31,0 h].',
        practicalInsight: 'William Gosset je t-porazdelitev razvil leta 1908 med vodenjem kontrole kakovosti v pivovarni Guinness, objavil pa jo je pod psevdonimom »Student«.',
        mathematicalTheory: 'Definicija t-spremenljivke: T = \\frac{Z}{\\sqrt{V / df}}, kjer je Z \\sim N(0, 1) in V \\sim \\chi^2_{df} neodvisni. Gostota: f(t) = \\frac{\\Gamma((df+1)/2)}{\\sqrt{\\pi df} \\Gamma(df/2)} \\left(1 + \\frac{t^2}{df}\\right)^{-\\frac{df+1}{2}}.'
      },
      cueBannerText: 'Spreminjajte prostostne stopnje df in opazujte, kako t-krivulja prehaja v standardno normalno porazdelitev.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Pri vzorcu n = 16 opazovanj želimo zgraditi 95 % interval zaupanja. Koliko znašajo prostostne stopnje df in ali je kritična vrednost t* večja ali manjša od 1,96?',
        prompt: 'df = n - 1 = 16 - 1 = 15. Pomislite na debelost repov:',
        options: [
          {
            id: 'opt-1',
            text: 'df = 15; t* = 2,131, kar je večje od 1,96 (interval je nekoliko širši zaradi negotovosti vzorčnega odklona s).',
            isCorrect: true,
            explanation: 'Odlično! Pri df = 15 je t* = 2,131. Večja vrednost kompenzira negotovost ocene s in zagotovi pravo 95 % pokritje.'
          },
          {
            id: 'opt-2',
            text: 'df = 16; t* = 1,960.',
            isCorrect: false,
            explanation: 'Napačno. Prostostne stopnje so n - 1 = 15, t* pa je večji od 1,96.'
          },
          {
            id: 'opt-3',
            text: 'df = 15; t* = 1,645.',
            isCorrect: false,
            explanation: 'Napačno. 1,645 ustreza 90 % zaupanju pri normalni krivulji.'
          }
        ],
        insight: 'Pri manjših vzorcih je t* vedno večji od 1,96, kar razširi interval zaupanja in zaščiti pred napako!',
        followUpExperiment: 'V simulaciji primerjajte površini repov za N(0,1) in t(df=5).'
      },
      mathProof: {
        summaryLatex: 'T = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}} \\sim t_{df = n - 1}, \\quad \\text{CI}_{95\\%} = \\bar{x} \\pm t^*_{df} \\frac{s}{\\sqrt{n}}',
        steps: [
          {
            title: '1. Vzorčna ocena standardnega odklona',
            latex: 's = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2}',
            explanation: 'Besselov popravek n-1 zagotovi nepristranskost ocene variance.'
          },
          {
            title: '2. Izračun t-statistike',
            latex: 'T = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}',
            explanation: 'Razliko med vzorčnim povprečjem in ničelno vrednostjo delimo z oceno standardne napake.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Enovzorčni t-test z določitvijo prostostnih stopenj',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Podatki: trajanje baterije v urah (n = 19)
podatki = np.array([28.5, 31.2, 29.0, 30.5, 27.8, 32.1, 29.4, 30.0, 28.9, 
                    31.0, 29.5, 30.8, 28.2, 31.5, 29.9, 30.2, 28.7, 31.8, 29.1])

n = len(podatki)
df = n - 1
x_bar = np.mean(podatki)
s = np.std(podatki, ddof=1)
se = s / np.sqrt(n)

t_star = stats.t.ppf(0.975, df=df)
ci_spodnja = x_bar - t_star * se
ci_zgornja = x_bar + t_star * se

# Test H0: mu = 30.0 proti HA: mu != 30.0
t_stat, p_val = stats.ttest_1samp(podatki, popmean=30.0)

print(f"Vzorčno povprečje x̄:    {x_bar:.2f} h")
print(f"Vzorčni odklon s:        {s:.2f} h")
print(f"Prostostne stopnje df:   {df}")
print(f"Kritični t* (95 %):      {t_star:.3f}")
print(f"95 % Interval zaupanja:  [{ci_spodnja:.2f}, {ci_zgornja:.2f}] h")
print(f"Testna statistika T:     {t_stat:+.2f}")
print(f"Dvostranska p-vrednost:  {p_val:.4f}")`,
        description: 'Izračunajte t-interval zaupanja in izvedite enovzorčni t-test.',
        runCode: (code: string) => {
          return {
            output: `Vzorčno povprečje x̄:    29.89 h\nVzorčni odklon s:        1.24 h\nProstostne stopnje df:   18\nKritični t* (95 %):      2.101\n95 % Interval zaupanja:  [29.29, 30.49] h\nTestna statistika T:     -0.37\nDvostranska p-vrednost:  0.7161\nSklep: P-vrednost > 0.05, ne moremo zavrniti H0 (baterija v povprečju traja 30 h).`,
            metrics: { x_bar: 29.89, t_stat: -0.37, p_val: 0.7161 }
          };
        }
      }
    },
    {
      id: 'unit-7-2',
      unitNumber: '7.2',
      chapterId: 'chapter-7',
      title: 'Parjeni podatki & Parjeni t-test',
      subtitle: 'Meritve pred in po posegu ter analiza razlik (dᵢ = x₁ᵢ - x₂ᵢ)',
      leadParagraph: 'Kadar dve meritvi izvirata iz iste enote (npr. krvni tlak istega pacienta pred in po zaužitju zdravila ali ocena cene istih učbenikov v dveh spletnih trgovinah), podatka nista neodvisna. Takšne podatke imenujemo parjeni podatki.',
      deepDive: 'Pri parjenih podatkih se ne ukvarjamo z dvema ločenima porazdelitvama, temveč za vsak par izračunamo razliko: d_i = x_{1i} - x_{2i}. S tem parjeni problem takoj pretvorimo v enostaven enovzorčni problem z enim samim stolpcem razlik! Izračunamo povprečje razlik \\bar{x}_{diff} in standardni odklon razlik s_{diff}. Standardna napaka je \\text{SE}_{diff} = \\frac{s_{diff}}{\\sqrt{n_{parov}}}. Testna statistika za ničelno hipotezo H0: \\mu_{diff} = 0 (ni spremembe med stanjema) je: T = \\frac{\\bar{x}_{diff} - 0}{s_{diff} / \\sqrt{n_{parov}}} s prostostnimi stopnjami df = n_{parov} - 1. Parjeni načrt je izjemno učinkovit, saj z odštevanjem izniči vso naravno variabilnost med posamezniki (npr. nekateri ljudje imajo naravno višji tlak kot drugi).',
      mnemonic: {
        eli5: 'Predstavljaj si dieto: če primerjaš težo 50 različnih športnikov s 50 različnimi nešportniki, je šum ogromen. Če pa izmeriš težo ISTIH 50 ljudi pred in po dieti ter gledaš le izgubljene kilograme (razlike d), takoj vidiš resnični učinek diete!',
        anchor: 'Parjeni podatki: Izračunaj dᵢ = Pred - Po → Izvedi navaden enovzorčni t-test na razlikah d!',
        fallacyWarning: {
          name: 'Obravnava parjenih podatkov kot dveh neodvisnih skupin',
          description: 'Uporaba dvovzorčnega testa neodvisnih skupin na parjenih podatkih.',
          example: 'Če pozabiš na parjenost, naravne razlike med posamezniki umetno napihnejo varianco in zgrešiš statistično značilen učinek!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Z odštevanjem posameznikovega izhodišča odstraniš ves zunanji hrup in izostriš učinek posega.',
        simpleExplanation: 'Primerjava cen 73 učbenikov na Amazonu in v univerzitetni knjigarni je pokazala, da je Amazon v povprečju cenejši za \\bar{x}_{diff} = 12,76 $ (s_{diff} = 14,26 $, n = 73). SE = 14,26 / \\sqrt{73} = 1,67 $. T = 12,76 / 1,67 = 7,64 (p < 0,0001). Razlika v ceni je izrazito statistično značilna.',
        practicalInsight: 'Študije na enojajčnih dvojčkih in poskusi »pred/po« v psihologiji ter medicini skoraj izključno uporabljajo parjene t-teste.',
        mathematicalTheory: 'Transformacija: D = X_1 - X_2. Pod H0: \\mu_D = 0 velja T = \\frac{\\bar{D}}{\\text{SE}_D} \\sim t_{n-1}. Varianca razlik: \\text{Var}(X_1 - X_2) = \\sigma_1^2 + \\sigma_2^2 - 2\\text{Cov}(X_1, X_2). Ker je kovarianca parov močno pozitivna, je \\text{Var}(D) bistveno manjša od vsote ločenih varianc!'
      },
      textbookWisdom: {
        simpleQuote: 'Z odštevanjem posameznikovega izhodišča odstraniš ves zunanji hrup in izostriš učinek posega.',
        simpleExplanation: 'Primerjava cen 73 učbenikov na Amazonu in v univerzitetni knjigarni je pokazala, da je Amazon v povprečju cenejši za \\bar{x}_{diff} = 12,76 $ (s_{diff} = 14,26 $, n = 73). SE = 14,26 / \\sqrt{73} = 1,67 $. T = 12,76 / 1,67 = 7,64 (p < 0,0001). Razlika v ceni je izrazito statistično značilna.',
        practicalInsight: 'Študije na enojajčnih dvojčkih in poskusi »pred/po« v psihologiji ter medicini skoraj izključno uporabljajo parjene t-teste.',
        mathematicalTheory: 'Transformacija: D = X_1 - X_2. Pod H0: \\mu_D = 0 velja T = \\frac{\\bar{D}}{\\text{SE}_D} \\sim t_{n-1}. Varianca razlik: \\text{Var}(X_1 - X_2) = \\sigma_1^2 + \\sigma_2^2 - 2\\text{Cov}(X_1, X_2). Ker je kovarianca parov močno pozitivna, je \\text{Var}(D) bistveno manjša od vsote ločenih varianc!'
      },
      cueBannerText: 'Opazujte, kako izračun razlik parov zmanjša razpršenost in omogoči zaznavo učinka.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi učinkovitosti tečaja hitrega branja 25 udeležencev opravi preizkus pred in po tečaju. Povprečno izboljšanje je 45 besed/min s standardnim odklonom razlik s_diff = 20 besed/min. Kolikšna je testna statistika T za test H0: μ_diff = 0?',
        prompt: 'Uporabite SE = s_diff / √n = 20 / √25 = 20 / 5 = 4 in izračunajte T = (45 - 0) / 4:',
        options: [
          {
            id: 'opt-1',
            text: 'T = +11,25; P-vrednost je praktično 0, tečaj izjemno zanesljivo poveča hitrost branja.',
            isCorrect: true,
            explanation: 'Odlično! SE = 20 / 5 = 4. T = 45 / 4 = +11,25. Pri df = 24 je to izjemno prepričljiv statistični dokaz za učinkovitost tečaja.'
          },
          {
            id: 'opt-2',
            text: 'T = +2,25 (45 / 20).',
            isCorrect: false,
            explanation: 'Napačno. Pozabili ste deliti s √n = 5.'
          },
          {
            id: 'opt-3',
            text: 'T = 0; Učinka ni.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Parjeni načrt zmanjša standardno napako in drastično poveča moč statističnega testa!',
        followUpExperiment: 'V simulaciji vnesite pare točk in opazujte izračun porazdelitve razlik.'
      },
      mathProof: {
        summaryLatex: 'd_i = x_{1i} - x_{2i}, \\quad T = \\frac{\\bar{d} - 0}{s_d / \\sqrt{n}} \\sim t_{n-1}',
        steps: [
          {
            title: '1. Izračun razlik za vsak posamezni par',
            latex: 'd_i = x_{\\text{pred}, i} - x_{\\text{po}, i}',
            explanation: 'Vsakemu paru priredimo eno samo številko – razliko med obema meritvama.'
          },
          {
            title: '2. Enovzorčni t-test na stolpcu razlik',
            latex: '\\bar{d} = \\frac{1}{n} \\sum_{i=1}^n d_i, \\quad s_d = \\sqrt{\\frac{1}{n-1} \\sum (d_i - \\bar{d})^2}, \\quad \\text{SE} = \\frac{s_d}{\\sqrt{n}}',
            explanation: 'Standardni izračun t-statistike na novonastali spremenljivki razlik.'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Parjeni t-test za analizo cen učbenikov (Amazon proti knjigarni)',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Simulirani podatki za cene 20 učbenikov v knjigarni in na Amazonu
np.random.seed(42)
cene_knjigarna = np.random.uniform(50, 180, size=20)
cene_amazon = cene_knjigarna - np.random.normal(12.5, 8.0, size=20)

razlike = cene_knjigarna - cene_amazon
n = len(razlike)
df = n - 1

mean_diff = np.mean(razlike)
s_diff = np.std(razlike, ddof=1)
se_diff = s_diff / np.sqrt(n)

t_stat, p_val = stats.ttest_rel(cene_knjigarna, cene_amazon)

print(f"Povprečna razlika v ceni (Knjigarna - Amazon): {mean_diff:.2f} $")
print(f"Standardni odklon razlik:                      {s_diff:.2f} $")
print(f"Standardna napaka SE:                          {se_diff:.2f} $")
print(f"Testna statistika T:                           {t_stat:+.2f}")
print(f"Dvostranska p-vrednost:                        {p_val:.2e}")`,
        description: 'Izvedite parjeni t-test in preverite razliko v cenah.',
        runCode: (code: string) => {
          return {
            output: `Povprečna razlika v ceni (Knjigarna - Amazon): 12.01 $\nStandardni odklon razlik:                      7.77 $\nStandardna napaka SE:                          1.74 $\nTestna statistika T:                           +6.91\nDvostranska p-vrednost:                        1.35e-06\nSklep: P-vrednost < 0.001! Amazon je statistično značilno cenejši od knjigarne.`,
            metrics: { mean_diff: 12.01, t_stat: 6.91, p_val: 1.35e-06 }
          };
        }
      }
    },
    {
      id: 'unit-7-3',
      unitNumber: '7.3',
      chapterId: 'chapter-7',
      title: 'Razlika dveh neodvisnih povprečij',
      subtitle: 'Primerjava dveh ločenih skupin ter Welchov t-test',
      leadParagraph: 'Kaj storiti, ko želimo primerjati povprečji dveh popolnoma ločenih skupin (npr. povprečni čas teka moških in žensk ali raven bolečine med skupino z novim zdravilom in placebo skupino)? V tem primeru sta vzorca neodvisna.',
      deepDive: 'Točkovna ocena razlike dveh neodvisnih povprečij je \\bar{x}_1 - \\bar{x}_2. Ker sta skupini neodvisni, se njuni vzorčni varianci seštejeta: \\text{SE}_{\\bar{x}_1 - \\bar{x}_2} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}. Testna statistika za ničelno hipotezo H0: \\mu_1 - \\mu_2 = 0 je T = \\frac{(\\bar{x}_1 - \\bar{x}_2) - 0}{\\text{SE}}. Pri določanju prostostnih stopenj v moderni statistiki uporabljamo Welchov t-test, ki ne predpostavlja enakih populacijskih varianc. Konzervativno pravilo za ročni izračun prostostnih stopenj je df = \\min(n_1 - 1, n_2 - 1), medtem ko programska oprema izračuna natančno Welch-Satterthwaitovo formulo.',
      mnemonic: {
        eli5: 'Predstavljaj si dva ločena otoka: na vsakem otoku izmeriš povprečno višino dreves. Negotovosti obeh otokov se seštejeta v skupno standardno napako √(s₁²/n₁ + s₂²/n₂).',
        anchor: 'Neodvisni skupini: SE = √(s₁²/n₁ + s₂²/n₂); T = (x̄₁ - x̄₂) / SE.',
        fallacyWarning: {
          name: 'Zmotna predpostavka o enakih variancah (Pooled t-test)',
          description: 'Avtomatično združevanje varianc (pooled variance), ko imata skupini močno različni razpršenosti.',
          example: 'Če ima ena skupina 5-krat večji odklon kot druga, združeni t-test popači stopnjo tveganja α – Welchov t-test pa deluje brezhibno!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Dve ločeni skupini pomenita dve ločeni varianci, ki ju pod korenom seštejemo v skupno negotovost.',
        simpleExplanation: 'V poskusu z zmanjševanjem stresa je skupina z meditacijo (n1 = 45, \\bar{x}_1 = 62 točk, s1 = 8,2) dosegla nižjo raven kortizola kot kontrolna skupina (n2 = 45, \\bar{x}_2 = 71 točk, s2 = 9,1). Razlika je 9 točk, SE = \\sqrt{8,2²/45 + 9,1²/45} = 1,83. T = -9 / 1,83 = -4,92 (p < 0,0001). Meditacija statistično značilno zniža stres.',
        practicalInsight: 'To je standardni analitični postopek za vrednotenje kliničnih poskusov faze III v farmaciji.',
        mathematicalTheory: 'Welch-Satterthwaitov izrek za prostostne stopnje: df = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1-1} + \\frac{(s_2^2/n_2)^2}{n_2-1}}.'
      },
      textbookWisdom: {
        simpleQuote: 'Dve ločeni skupini pomenita dve ločeni varianci, ki ju pod korenom seštejemo v skupno negotovost.',
        simpleExplanation: 'V poskusu z zmanjševanjem stresa je skupina z meditacijo (n1 = 45, \\bar{x}_1 = 62 točk, s1 = 8,2) dosegla nižjo raven kortizola kot kontrolna skupina (n2 = 45, \\bar{x}_2 = 71 točk, s2 = 9,1). Razlika je 9 točk, SE = \\sqrt{8,2²/45 + 9,1²/45} = 1,83. T = -9 / 1,83 = -4,92 (p < 0,0001). Meditacija statistično značilno zniža stres.',
        practicalInsight: 'To je standardni analitični postopek za vrednotenje kliničnih poskusov faze III v farmaciji.',
        mathematicalTheory: 'Welch-Satterthwaitov izrek za prostostne stopnje: df = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1-1} + \\frac{(s_2^2/n_2)^2}{n_2-1}}.'
      },
      cueBannerText: 'Primerjajte dve neodvisni porazdelitvi in spremljajte Welchov t-test.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V skupini A (n1 = 50) je x̄1 = 105, s1 = 10. V skupini B (n2 = 50) je x̄2 = 100, s2 = 10. Kolikšna je standardna napaka razlike SE in testna statistika T?',
        prompt: 'SE = √(10²/50 + 10²/50) = √(2 + 2) = √4 = 2. T = (105 - 100) / 2:',
        options: [
          {
            id: 'opt-1',
            text: 'SE = 2,0; T = +2,50; p-vrednost je približno 0,014, zato zavrnemo H0.',
            isCorrect: true,
            explanation: 'Odlično! SE = √(100/50 + 100/50) = √4 = 2,0. T = 5 / 2 = +2,50. Ker je T > 2,0 (p = 0,014 < 0,05), je razlika med skupinama statistično značilna.'
          },
          {
            id: 'opt-2',
            text: 'SE = 4,0; T = +1,25.',
            isCorrect: false,
            explanation: 'Napačno. Pozabili ste vzeti kvadratni koren iz vsote varianc.'
          },
          {
            id: 'opt-3',
            text: 'SE = 0,5; T = +10,0.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Standardna napaka razlike dveh neodvisnih povprečij združuje variabilnost obeh skupin!',
        followUpExperiment: 'V simulaciji spreminjajte vzorčni velikosti n1 in n2 ter opazujte Welchove prostostne stopnje.'
      },
      mathProof: {
        summaryLatex: '\\text{SE} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}, \\quad T = \\frac{(\\bar{x}_1 - \\bar{x}_2) - 0}{\\text{SE}} \\sim t_{df}',
        steps: [
          {
            title: '1. Varianca razlike neodvisnih vzorčnih povprečij',
            latex: '\\text{Var}(\\bar{X}_1 - \\bar{X}_2) = \\text{Var}(\\bar{X}_1) + \\text{Var}(\\bar{X}_2) = \\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}',
            explanation: 'Zaradi neodvisnosti obeh vzorcev je kovarianca enaka 0, varianci pa se seštejeta.'
          },
          {
            title: '2. Izračun Welchove t-statistike',
            latex: 'T = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}',
            explanation: 'Populacijski varianci nadomestimo z vzorčnima ocename s_1² in s_2².'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Welchov t-test za primerjavo dveh neodvisnih skupin',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Meritve dveh skupin (učinek prehranskega dodatka na vzdržljivost v min)
skupina_A = np.array([45.2, 48.0, 46.5, 52.1, 49.3, 47.8, 51.0, 48.5, 50.2, 47.0])
skupina_B = np.array([41.0, 43.5, 42.1, 40.8, 44.2, 42.9, 41.5, 43.0, 40.5, 42.0])

# Welchov dvovzorčni t-test (equal_var=False)
t_stat, p_val = stats.ttest_ind(skupina_A, skupina_B, equal_var=False)

print(f"Skupina A (dodatek): x̄ = {np.mean(skupina_A):.2f}, s = {np.std(skupina_A, ddof=1):.2f}")
print(f"Skupina B (placebo): x̄ = {np.mean(skupina_B):.2f}, s = {np.std(skupina_B, ddof=1):.2f}")
print(f"Razlika v povprečjih: {np.mean(skupina_A) - np.mean(skupina_B):+.2f} min")
print(f"Welchova T-statistika: {t_stat:+.2f}")
print(f"P-vrednost:            {p_val:.2e}")`,
        description: 'Izvedite Welchov dvovzorčni t-test na dveh neodvisnih vzorcih.',
        runCode: (code: string) => {
          return {
            output: `Skupina A (dodatek): x̄ = 48.56, s = 2.13\nSkupina B (placebo): x̄ = 42.15, s = 1.25\nRazlika v povprečjih: +6.41 min\nWelchova T-statistika: +8.20\nDvostranska p-vrednost: 1.54e-06\nSklep: P-vrednost < 0.001! Prehranski dodatek statistično značilno poveča vzdržljivost.`,
            metrics: { diff: 6.41, t_stat: 8.20, p_val: 1.54e-06 }
          };
        }
      }
    },
    {
      id: 'unit-7-4',
      unitNumber: '7.4',
      chapterId: 'chapter-7',
      title: 'Primerjava več skupin: Analiza variance (ANOVA & F-test)',
      subtitle: 'Razmerje med varianco med skupinami (MSG) in znotraj skupin (MSE) ter Bonferronijev popravek',
      leadParagraph: 'Kaj storiti, ko želimo primerjati povprečja treh ali več skupin hkrati (npr. učinek 4 različnih odmerkov zdravila)? Če bi izvedli več posameznih t-testov med pari, bi drastično napihnili skupno stopnjo napake tipa I. Zato uporabimo analizo variance (ANOVA).',
      deepDive: 'Analiza variance (Analysis of Variance - ANOVA) testira ničelno hipotezo H0: \\mu_1 = \\mu_2 = \\dots = \\mu_k (vsa populacijska povprečja so enaka) proti alternativi HA: vsaj eno povprečje se razlikuje od ostalih. Celotno variabilnost podatkov razdelimo na dva dela: 1. Variabilnost med skupinami (Mean Square Between Groups - MSG, prostostne stopnje df1 = k - 1), 2. Variabilnost znotraj skupin (Mean Square Error - MSE, prostostne stopnje df2 = n_skupaj - k). Testna statistika je F-razmerje: F = \\frac{\\text{MSG}}{\\text{MSE}}. Če ničelna hipoteza drži, je F blizu 1. Če so skupine med seboj zelo različne glede na notranji šum, je F bistveno večji od 1. Če je F statistično značilen (p < 0,05), izvedemo naknadne post-hoc parne t-teste z Bonferronijevim popravkom nivoja značilnosti \\alpha^* = \\frac{\\alpha}{K}, kjer je K = \\binom{k}{2} število vseh možnih parov.',
      mnemonic: {
        eli5: 'ANOVA je kot preverjanje, ali se trije razredi učencev res razlikujejo po znanju: primerja razdaljo med povprečji razredov (signal MSG) z običajnim nihanjem ocen znotraj posameznega razreda (šum MSE). F = Signal / Šum!',
        anchor: 'F = MSG / MSE; df₁ = k - 1, df₂ = N - k; Bonferronijev popravek: α* = α / K.',
        fallacyWarning: {
          name: 'Izvajanje številnih t-testov brez popravka za večkratno testiranje',
          description: 'Izvedba vseh možnih parnih t-testov pri α = 0,05 med 10 skupinami (kar je 45 parov!).',
          example: 'Pri 45 parnih testih brez popravka je verjetnost vsaj enega lažnega alarma kar 1 - (0,95)⁴⁵ ≈ 90 %!'
        }
      },
      explanationLevels: {
        simpleQuote: 'ANOVA primerja varianco med skupinami z varianco znotraj skupin – če je razmerje F veliko, skupine niso enake.',
        simpleExplanation: 'V študiji učinkovitosti 3 diet (Keto, Mediteranska, Nizkomaščobna) na 90 osebah (30 na skupino) dobimo MSG = 145,2 in MSE = 22,4. F = 145,2 / 22,4 = 6,48. Pri df1 = 2 in df2 = 87 je p-vrednost 0,0023. Sklenemo, da med dietami obstaja statistično značilna razlika v izgubi teže.',
        practicalInsight: 'ANOVA je osrednje orodje v agronomiji, proizvodnem inženiringu in psiholoških poskusih z več obravnavanimi skupinami.',
        mathematicalTheory: 'Vsota kvadratov: SST = SSG + SSE, kjer je SSG = \\sum n_i (\\bar{x}_i - \\bar{x}_{grand})^2 in SSE = \\sum (n_i - 1) s_i^2. F-statistika: F = \\frac{SSG / (k - 1)}{SSE / (N - k)} \\sim F_{k-1, N-k}.'
      },
      textbookWisdom: {
        simpleQuote: 'ANOVA primerja varianco med skupinami z varianco znotraj skupin – če je razmerje F veliko, skupine niso enake.',
        simpleExplanation: 'V študiji učinkovitosti 3 diet (Keto, Mediteranska, Nizkomaščobna) na 90 osebah (30 na skupino) dobimo MSG = 145,2 in MSE = 22,4. F = 145,2 / 22,4 = 6,48. Pri df1 = 2 in df2 = 87 je p-vrednost 0,0023. Sklenemo, da med dietami obstaja statistično značilna razlika v izgubi teže.',
        practicalInsight: 'ANOVA je osrednje orodje v agronomiji, proizvodnem inženiringu in psiholoških poskusih z več obravnavanimi skupinami.',
        mathematicalTheory: 'Vsota kvadratov: SST = SSG + SSE, kjer je SSG = \\sum n_i (\\bar{x}_i - \\bar{x}_{grand})^2 in SSE = \\sum (n_i - 1) s_i^2. F-statistika: F = \\frac{SSG / (k - 1)}{SSE / (N - k)} \\sim F_{k-1, N-k}.'
      },
      cueBannerText: 'Spreminjajte povprečja skupin in opazujte rast F-statistike ter upad p-vrednosti.',
      hasSimulation: true,
      poeQuiz: {
        question: 'V raziskavi primerjamo k = 4 skupine z enakimi velikostmi vzorcev (skupaj N = 40 udeležencev). Koliko prostostnih stopenj imata števec (df1) in imenovalec (df2) F-statistike?',
        prompt: 'df1 = k - 1 = 4 - 1; df2 = N - k = 40 - 4:',
        options: [
          {
            id: 'opt-1',
            text: 'df1 = 3 in df2 = 36.',
            isCorrect: true,
            explanation: 'Odlično! df1 (med skupinami) = 4 - 1 = 3; df2 (znotraj skupin) = 40 - 4 = 36.'
          },
          {
            id: 'opt-2',
            text: 'df1 = 4 in df2 = 40.',
            isCorrect: false,
            explanation: 'Napačno. Prostostne stopnje zahtevajo odštetje števila parametrov.'
          },
          {
            id: 'opt-3',
            text: 'df1 = 1 in df2 = 39.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'F-statistika ima vedno dva para prostostnih stopenj: za varianco med skupinami in za varianco znotraj skupin!',
        followUpExperiment: 'V simulaciji si oglejte F-porazdelitev za različne pare prostostnih stopenj.'
      },
      mathProof: {
        summaryLatex: 'F = \\frac{\\text{MSG}}{\\text{MSE}} = \\frac{\\text{SSG} / (k - 1)}{\\text{SSE} / (N - k)} \\sim F_{k-1, N-k}',
        steps: [
          {
            title: '1. Vsota kvadratov med skupinami (SSG)',
            latex: '\\text{SSG} = \\sum_{i=1}^k n_i (\\bar{x}_i - \\bar{x}_{\\text{skupno}})^2',
            explanation: 'Meri odstopanje povprečij posameznih skupin od skupnega povprečja vseh podatkov.'
          },
          {
            title: '2. Vsota kvadratov znotraj skupin (SSE)',
            latex: '\\text{SSE} = \\sum_{i=1}^k \\sum_{j=1}^{n_i} (x_{ij} - \\bar{x}_i)^2 = \\sum_{i=1}^k (n_i - 1) s_i^2',
            explanation: 'Meri naravni šum in variabilnost enot znotraj vsake posamezne skupine.'
          },
          {
            title: '3. Izračun F-razmerja',
            latex: 'F = \\frac{\\text{MSG}}{\\text{MSE}} = \\frac{\\text{SSG} / (k - 1)}{\\text{SSE} / (N - k)}',
            explanation: 'Primerjava povprečnih kvadratov (razmerje signala proti šumu).'
          }
        ]
      },
      miniJupyter: {
        language: 'python',
        title: 'Enosmerna analiza variance (One-Way ANOVA)',
        defaultCode: `import scipy.stats as stats
import numpy as np

# Primerjava 3 diet (izguba teže v kg po 6 mesecih)
dieta_A = np.array([4.2, 5.1, 3.8, 6.0, 4.9, 5.5, 4.0, 5.8, 4.6, 5.2])
dieta_B = np.array([7.1, 6.5, 8.0, 7.4, 6.9, 8.2, 7.0, 7.8, 6.8, 7.5])
dieta_C = np.array([3.1, 4.0, 2.9, 3.5, 4.2, 3.8, 3.0, 4.5, 3.6, 3.4])

# Izvedba ANOVA
f_stat, p_val = stats.f_oneway(dieta_A, dieta_B, dieta_C)

print(f"Dieta A: x̄ = {np.mean(dieta_A):.2f} kg, s = {np.std(dieta_A, ddof=1):.2f}")
print(f"Dieta B: x̄ = {np.mean(dieta_B):.2f} kg, s = {np.std(dieta_B, ddof=1):.2f}")
print(f"Dieta C: x̄ = {np.mean(dieta_C):.2f} kg, s = {np.std(dieta_C, ddof=1):.2f}")
print("-" * 45)
print(f"F-statistika: {f_stat:.3f}")
print(f"P-vrednost:   {p_val:.2e}")
if p_val < 0.05:
    print("Sklep: Zavrnemo H0! Med dietami obstaja statistično značilna razlika.")`,
        description: 'Izvedite analizo variance (ANOVA) za primerjavo treh diet.',
        runCode: (code: string) => {
          return {
            output: `Dieta A: x̄ = 4.89 kg, s = 0.74\nDieta B: x̄ = 7.32 kg, s = 0.58\nDieta C: x̄ = 3.60 kg, s = 0.49\n---------------------------------------------\nF-statistika: 98.412\nP-vrednost:   1.04e-13\nSklep: Zavrnemo H0! Med dietami obstaja statistično značilna razlika.`,
            metrics: { f_stat: 98.41, p_val: 1.04e-13 }
          };
        }
      }
    }
  ]
};
