import { ChapterConfig } from '../../types';

export const chapter11: ChapterConfig = {
  id: 'chapter-11',
  chapterNumber: 11,
  title: '11. Poglavje: Ponovnovzorčenje & Robustna neparametrična statistika',
  subtitle: 'Efronova teorija bootstrapa, BCa intervali, točni permutacijski testi in rank-sum metode',
  description:
    'Kadar parametrične predpostavke o normalnosti odpovedo ali imamo kompleksne statistike brez analitičnih formul za standardno napako (mediane, razmerja, lastne vrednosti), uporabimo sodobne računalniško intenzivne metode ponovnega vzorčenja (Resampling).',
  iconName: 'Sparkles',
  color: '#ec4899',
  units: [
    {
      id: 'unit-11-1',
      unitNumber: '11.1',
      chapterId: 'chapter-11',
      title: 'Teorija bootstrapa & BCa intervali zaupanja',
      subtitle: 'Vzorčenje z vračanjem (Plug-in princip), ocena pristranskosti in pospeška',
      leadParagraph:
        'Bradley Efron je leta 1979 vpeljal metodo bootstrapa kot revolucionaren način ocenjevanja porazdelitve poljubne vzorčne statistike $\\hat{\\theta}$ z večkratnim ponovnim vzorčenjem iz samih opazovanih podatkov z vračanjem.',
      deepDive:
        'Naj bo $\\mathbf{x} = (x_1, \\dots, x_n)$ vzorec iz neznane porazdelitve $F$. Empirična porazdelitev $\\hat{F}_n$ pripiše vsaki opazovani točki verjetnost $1/n$. Z generiranjem $B$ neodvisnih bootstrap vzorcev $\\mathbf{x}^{*b} = (x_1^{*b}, \\dots, x_n^{*b})$ z vračanjem iz $\\hat{F}_n$ izračunamo $B$ bootstrap ocen $\\hat{\\theta}^{*b} = T(\\mathbf{x}^{*b})$. Bootstrap ocena standardne napake je preprosto empirični standardni odklon: $\\widehat{\\text{SE}}_B(\\hat{\\theta}) = \\sqrt{\\frac{1}{B-1}\\sum_{b=1}^B (\\hat{\\theta}^{*b} - \\bar{\\theta}^*)^2}$. Za natančne intervale zaupanja uporabljamo **BCa (Bias-Corrected and Accelerated)** metodo, ki popravi asimetrijo porazdelitve in odvisnost variance od pravega parametra z dvema korekcijskima parametroma: faktorjem pristranskosti $z_0$ in faktorjem pospeška $a$. BCa intervali dosegajo natančnost drugega reda $\\mathcal{O}(1/n)$ v primerjavi s standardnim $\\mathcal{O}(1/\\sqrt{n})$!',
      mnemonic: {
        eli5: 'Če ne morete potegniti novih vzorcev iz celotnega oceana, vzamete svoj ujeti akvarij in iz njega znova in znova z zaprtimi očmi lovite ribe ter jih vračate nazaj. S tem simulirate obnašanje narave!',
        anchor: 'Bootstrap: vzorčenje z vračanjem; BCa: popravi pristranskost in asimetrijo; natančnost O(1/n).',
        fallacyWarning: {
          name: 'Naivni percentilni bootstrap pri majhnih asimetričnih vzorcih',
          description: 'Enostavna uporaba percentilov 2.5 % in 97.5 % brez BCa korekcije ima pogosto prenizko stopnjo pokritja.',
          example: 'Pri majhnih vzorcih vedno uporabite BCa ali studentizirani bootstrap!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Bootstrap je statistični ekvivalent potegovanja samega sebe iz močvirja za lastne škornje.',
        simpleExplanation: 'Z računalnikom naredimo 2.000 novih vzorcev enake velikosti iz naših podatkov, na vsakem izračunamo želeno statistiko (npr. mediano ali korelacijo) ter iz njihove porazdelitve odčitamo interval zaupanja.',
        practicalInsight: 'R paket `boot` ali Python `scipy.stats.bootstrap` omogočata enovrstični izračun BCa intervalov za katerokoli kompleksno funkcijo.',
        mathematicalTheory: 'BCa interval zaupanja: $(\\hat{\\theta}^{*(\\alpha_1)}, \\hat{\\theta}^{*(\\alpha_2)})$, kjer je $\\alpha_1 = \\Phi\\left(z_0 + \\frac{z_0 + z_{\\alpha/2}}{1 - a(z_0 + z_{\\alpha/2})}\\right)$.'
      },
      textbookWisdom: {
        simpleQuote: 'Bootstrap ocenjuje negotovost brez kakršnihkoli parametričnih predpostavk o obliki porazdelitve.',
        simpleExplanation: 'Ponovno vzorčenje z vračanjem omogoča konstrukcijo intervalov zaupanja za poljubne nelinearne statistike.',
        practicalInsight: 'Ključno orodje v sodobni podatkovni znanosti, ko podatki niso normalno porazdeljeni.',
        mathematicalTheory: 'BCa bootstrap doseže asimptotično pokritje drugega reda brez predpostavke simetrije.'
      },
      cueBannerText: 'Opazujte, kako se z večanjem števila ponovitev B stabilizira bootstrap porazdelitev.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Zakaj pri bootstrapu vzorčimo natanko n opazovanj z vračanjem in ne brez vračanja?',
        prompt: 'Pomislite, kaj bi se zgodilo pri vzorčenju n elementov iz n brez vračanja:',
        options: [
          {
            id: 'opt-1',
            text: 'Brez vračanja bi vsakič dobili popolnoma identičen začetni nabor podatkov brez kakršnekoli variabilnosti.',
            isCorrect: true,
            explanation: 'Točno! Vzorčenje z vračanjem omogoča, da se nekatere točke ponovijo, nekatere pa izpadejo, kar simulira naravno naključno nihanje.'
          },
          {
            id: 'opt-2',
            text: 'Zato, ker je vzorčenje z vračanjem matematično hitrejše.',
            isCorrect: false,
            explanation: 'Napačno.'
          },
          {
            id: 'opt-3',
            text: 'Zato, ker brez vračanja ne bi mogli izračunati povprečja.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Vzorčenje z vračanjem predstavlja diskretno aproksimacijo vzorčenja iz prave zvezne populacije!',
        followUpExperiment: 'V orodju za kartice preverite pogoje veljavnosti bootstrap metod.'
      },
      mathProof: {
        summaryLatex: '\\widehat{\\text{SE}}_B(\\hat{\\theta}) = \\left[ \\frac{1}{B-1}\\sum_{b=1}^B \\left(\\hat{\\theta}^{*b} - \\frac{1}{B}\\sum_{j=1}^B \\hat{\\theta}^{*j}\\right)^2 \\right]^{1/2}',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Plug-in princip:</strong> Parameter $\\theta = T(F)$ ocenimo z $\\hat{\\theta} = T(\\hat{F}_n)$.</p>
            <p><strong>2. Bootstrap ocena:</strong> $\\hat{\\theta}^* = T(\\hat{F}_n^*)$, kjer $\\hat{F}_n^*$ generiramo z $\\text{Multinomial}\\left(n, \\left(\\frac{1}{n},\\dots,\\frac{1}{n}\\right)\\right)$.</p>
            <p><strong>3. Ocena pristranskosti:</strong> $\\widehat{\\text{Bias}}(\\hat{\\theta}) = \\frac{1}{B}\\sum_{b=1}^B \\hat{\\theta}^{*b} - \\hat{\\theta}$.</p>
          </div>
        `
      },
      pythonSnippet: `# BCa Bootstrap v Pythonu z uporabo scipy.stats
import numpy as np
from scipy import stats

np.random.seed(42)
data = (np.random.exponential(scale=2.0, size=50),)

# 95% BCa interval za mediano
res = stats.bootstrap(data, np.median, confidence_level=0.95, n_resamples=2000, method='BCa')

print(f"Točkovna mediana: {np.median(data[0]):.3f}")
print(f"95% BCa CI: ({res.confidence_interval.low:.3f}, {res.confidence_interval.high:.3f})")
`,
      rSnippet: `# BCa Bootstrap v R s paketom boot
library(boot)
set.seed(42)
x <- rexp(50, rate=0.5)

med_fn <- function(d, i) median(d[i])
b_out <- boot(x, med_fn, R=2000)
b_ci  <- boot.ci(b_out, type="bca")
print(b_ci)
`,
      learningObjectives: [
        'Razumeti Efronov plug-in princip in mehaniko vzorčenja z vračanjem.',
        'Razlikovati med standardnim, percentilnim in BCa bootstrap intervalom zaupanja.',
        'Uporabiti bootstrap za oceno standardnih napak poljubnih nelinearnih statistik.'
      ]
    },
    {
      id: 'unit-11-2',
      unitNumber: '11.2',
      chapterId: 'chapter-11',
      title: 'Permutacijski & Točni randomizacijski testi',
      subtitle: 'Ničelna hipoteza izmenljivosti (Exchangeability), točne p-vrednosti in Fisherjev točni test',
      leadParagraph:
        'Kadar želimo preveriti, ali dve skupini izhajata iz iste porazdelitve, ne potrebujemo predpostavk o normalnosti. Pod ničelno hipotezo so oznake skupin izmenljive (exchangeable).',
      deepDive:
        'Naj bosta vzorca $X = (x_1, \\dots, x_n)$ in $Y = (y_1, \\dots, y_m)$. Ničelna hipoteza trdi $H_0: F_X = F_Y$. Pod $H_0$ lahko vseh $N = n + m$ opazovanj združimo v eno množico. Število vseh možnih razdelitev v skupini velikosti $n$ in $m$ je $\\binom{N}{n}$. Za vsako razdelitev izračunamo testno statistiko $T(\\pi) = \\bar{X}_\\pi - \\bar{Y}_\\pi$. **Točna permutacijska p-vrednost** je delež permutacij, pri katerih je testna statistika vsaj tako ekstremna kot opazovana: $p = \\frac{1}{\\binom{N}{n}} \\sum_{\\pi} \\mathbb{I}(|T(\\pi)| \\ge |T_{\\text{obs}}|)$. Kadar je $\\binom{N}{n}$ prevelik za popolno permutacijo (npr. pri $N=100$), uporabimo Monte Carlo permutacijski test z $R = 10.000$ naključnimi preureditvami. Poseben primer za kontingenčne tabele $2 \\times 2$ je **Fisherjev točni test**, ki temelji na hipergeometrijski porazdelitvi.',
      mnemonic: {
        eli5: 'Predstavljajte si, da imate 10 rdečih in 10 modrih kart. Če zdravilo ne deluje, je povsem vseeno, kateri bolnik je dobil rdečo in kateri modro karto. Z mešanjem kart preprosto preštejemo, kolikokrat bi tak rezultat nastal po čisti sreči!',
        anchor: 'H0: enoti sta izmenljivi; p = delež permutacij z |T| >= |T_obs|; točen test brez predpostavk.',
        fallacyWarning: {
          name: 'Zamenjava permutacijskega testa z bootstrapom',
          description: 'Permutacijski testi vzorčijo BREZ vračanja (premešajo obstoječe oznake), bootstrap pa vzorči Z vračanjem.',
          example: 'Permutacija je namenjena testiranju hipotez o enakosti porazdelitev, bootstrap pa ocenjevanju intervalov zaupanja in standardnih napak!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Permutacijski test ponuja matematično točno p-vrednost, ne glede na to, kako nenavadna je oblika podatkov.',
        simpleExplanation: 'Združimo podatke obeh skupin, jih dobro premešamo in naključno razdelimo nazaj v dve novi skupini ter ponovimo 10.000-krat.',
        practicalInsight: 'V A/B testiranju tehnoloških podjetij (Netflix, Spotify, Amazon) so permutacijski testi standard za analizo vedenjskih metrik z dolgimi repi.',
        mathematicalTheory: 'Fisherjev točni test izračuna hipergeometrijsko verjetnost $P(X=k) = \\frac{\\binom{a+b}{a}\\binom{c+d}{c}}{\\binom{n}{a+c}}$ pri fiksnih robnih vsotah.'
      },
      textbookWisdom: {
        simpleQuote: 'Permutacijski test ponuja matematično točno p-vrednost brez parametričnih predpostavk.',
        simpleExplanation: 'Mešanje oznak skupin pod ničelno hipotezo razkrije točno porazdelitev testne statistike.',
        practicalInsight: 'Zlati standard v kliničnih študijah z majhnimi vzorci in redkimi dogodki.',
        mathematicalTheory: 'Točni p-vrednost: $p = \\frac{1}{M} \\sum_{m=1}^M \\mathbb{I}(T_m \\ge T_{\\text{obs}})$.'
      },
      cueBannerText: 'Premešajte oznake skupin in opazujte generiranje ničelne permutacijske porazdelitve.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če v 10.000 naključnih permutacijah natanko 120-krat opazimo razliko v povprečjih, ki je večja ali enaka opazovani razliki v poskusu, kolikšna je enostranska empirična p-vrednost?',
        prompt: 'Uporabite razmerje p = (število ekstremnih permutacij) / (skupno število permutacij):',
        options: [
          {
            id: 'opt-1',
            text: 'p = 120 / 10000 = 0,012 (statistično značilno pri α = 0,05).',
            isCorrect: true,
            explanation: 'Odlično! Delež ekstremnih permutacij pod ničelno hipotezo je natanko definicija p-vrednosti.'
          },
          {
            id: 'opt-2',
            text: 'p = 0,120 (neznačilno).',
            isCorrect: false,
            explanation: 'Napačno. 120 / 10.000 je 0,012 ali 1,2 %.'
          },
          {
            id: 'opt-3',
            text: 'p = 0,0012.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Permutacijski test ne potrebuje nobene tabele t ali z, saj empirično zgradi točno ničelno porazdelitev!',
        followUpExperiment: 'V modulu primerov si oglejte primer diskriminacije pri zaposlovanju.'
      },
      mathProof: {
        summaryLatex: 'p_{\\text{perm}} = \\frac{1}{B} \\sum_{b=1}^B \\mathbb{I}\\left( |T(\\mathbf{z}^{*b})| \\ge |T(\\mathbf{z}_{\\text{obs}})| \\right)',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Izmenljivost pod $H_0$:</strong> Vektor $\\mathbf{z} = (x_1,\\dots,x_n, y_1,\\dots,y_m)$ ima enako verjetnost pod katerokoli permutacijo $\\pi \\in S_N$.</p>
            <p><strong>2. Testna statistika:</strong> $T(\\mathbf{z}) = \\frac{1}{n}\\sum_{i=1}^n z_i - \\frac{1}{m}\\sum_{j=n+1}^N z_j$.</p>
            <p><strong>3. Točna p-vrednost:</strong> $p = \\frac{\\#\\{\\pi \\in S_N : |T(\\pi(\\mathbf{z}))| \\ge |T(\\mathbf{z})|\\}}{N!}$.</p>
          </div>
        `
      },
      pythonSnippet: `# Dvo-vzorčni permutacijski test v Pythonu
import numpy as np

np.random.seed(42)
group_A = np.array([12, 15, 14, 11, 16, 18, 14])
group_B = np.array([8, 9, 11, 10, 12, 9, 10])

obs_diff = np.mean(group_A) - np.mean(group_B)
combined = np.concatenate([group_A, group_B])
n_A = len(group_A)

B = 10000
diffs = np.empty(B)
for i in range(B):
    perm = np.random.permutation(combined)
    diffs[i] = np.mean(perm[:n_A]) - np.mean(perm[n_A:])

p_value = np.mean(np.abs(diffs) >= np.abs(obs_diff))
print(f"Opazovana razlika: {obs_diff:.3f}, Permutacijski p-val: {p_value:.4f}")
`,
      rSnippet: `# Permutacijski test v R
set.seed(42)
gA <- c(12, 15, 14, 11, 16, 18, 14)
gB <- c(8, 9, 11, 10, 12, 9, 10)
obs_diff <- mean(gA) - mean(gB)
combined <- c(gA, gB)

B <- 10000
diffs <- replicate(B, {
  perm <- sample(combined)
  mean(perm[1:length(gA)]) - mean(perm[(length(gA)+1):length(combined)])
})

p_val <- mean(abs(diffs) >= abs(obs_diff))
cat(sprintf("Opazovana razlika: %.3f, p-vrednost: %.4f\\n", obs_diff, p_val))
`,
      learningObjectives: [
        'Definirati koncept izmenljivosti pod ničelno hipotezo in izpeljati permutacijski test.',
        'Razumeti razliko med točnim permutacijskim testom in Monte Carlo aproksimacijo.',
        'Uporabiti permutacijske teste za preizkušanje hipotez o poljubnih statistikah.'
      ]
    },
    {
      id: 'unit-11-3',
      unitNumber: '11.3',
      chapterId: 'chapter-11',
      title: 'Robustne rank-sum metode: Wilcoxon, Mann-Whitney & Kruskal-Wallis',
      subtitle: 'Sklepanje na podlagi ordinalnih rangov brez občutljivosti na osamelce in asimetrijo',
      leadParagraph:
        'Kadar so podatki močno asimetrični ali vsebujejo ekstremne osamelce, parametrični t-test in ANOVA izgubita moč. Rešitev je pretvorba surovih vrednosti v njihove range (od 1 do N).',
      deepDive:
        '1. **Wilcoxonov test predznanih rangov (Signed-Rank Test)** za parne podatke: Razlike $d_i = x_i - y_i$ uredimo po absolutni vrednosti $|d_i|$ in jim pripišemo range $R_i$. Testna statistika $W^+$ je vsota rangov pozitivnih razlik: $W^+ = \\sum_{d_i > 0} R_i$.\\n2. **Mann-Whitney U / Wilcoxon Rank-Sum test** za neodvisna vzorca: Združimo oba vzorca, določimo range in seštejemo range v prvi skupini $R_1$. Mann-Whitneyeva statistika $U_1 = R_1 - \\frac{n_1(n_1+1)}{2}$ meri verjetnost, da je naključno izbrana vrednost iz skupine 1 večja od vrednosti iz skupine 2: $P(X > Y) = \\frac{U_1}{n_1 n_2}$.\\n3. **Kruskal-Wallisov test** (ne-parametrična alternativa enosmerni ANOVA za $k \\ge 3$ skupin): Testna statistika $H = \\frac{12}{N(N+1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N+1)$ asimptotično sledi $\\chi^2_{k-1}$. Vse rank-sum metode so popolnoma invariantne na monotono naraščajoče transformacije (npr. $\\ln x, x^3$) in 100 % odporne na poljubno ekstremne osamelce!',
      mnemonic: {
        eli5: 'Namesto da primerjamo, koliko točno evrov imajo ljudje v denarnici (kjer en milijarder popači povprečje), ljudi preprosto postavimo v vrsto od najrevnejšega do najbogatejšega in primerjamo njihova mesta v vrsti!',
        anchor: 'Pretvorba v range 1..N; Odporno na osamelce; Invariantno na monotone transformacije.',
        fallacyWarning: {
          name: 'Domneva, da Mann-Whitney test vedno primerja mediani',
          description: 'Mann-Whitney test strogo testira enakost median le, če imata obe skupini popolnoma enako obliko porazdelitve.',
          example: 'V splošnem testira stohastično prevlado P(X > Y) > 0.5!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Pretvorba podatkov v range nevtralizira vpliv ekstremnih osamelcev brez izgube informacij o vrstnem redu.',
        simpleExplanation: 'Če se vrednost 100 spremeni v 10.000.000, se njen rang ne spremeni niti za eno mesto, t-test pa bi popolnoma odpovedal.',
        practicalInsight: 'V analizi uporabniških ocen (zvezdice 1 do 5) ali Likertovih lestvic sta Mann-Whitney in Kruskal-Wallis metodi prve izbire.',
        mathematicalTheory: 'Pod $H_0$ velja $\\mathbb{E}[U] = \\frac{n_1 n_2}{2}$ in $\\text{Var}(U) = \\frac{n_1 n_2 (n_1 + n_2 + 1)}{12}$. Za velike vzorce velja $Z = \\frac{U - \\mathbb{E}[U]}{\\sqrt{\\text{Var}(U)}} \\sim \\mathcal{N}(0, 1)$.'
      },
      textbookWisdom: {
        simpleQuote: 'Pretvorba podatkov v range nevtralizira vpliv ekstremnih osamelcev.',
        simpleExplanation: 'Ne-parametrične metode na podlagi rangov ohranjajo visoko moč tudi pri hudih odstopanjih od normalnosti.',
        practicalInsight: 'Standard za analizo kliničnih vprašalnikov in ordinalnih podatkov.',
        mathematicalTheory: 'Kruskal-Wallis $H \\sim \\chi^2_{k-1}$ testira stohastično homogenost več skupin.'
      },
      cueBannerText: 'Preverite, kako pretvorba podatkov v range odstrani vpliv ekstremnih osamelcev.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Kaj se zgodi z vrednostjo testne statistike Mann-Whitney U, če največjo vrednost v vzorcu pomnožimo s 1.000?',
        prompt: 'Upoštevajte, da metoda uporablja le vrstni red (range) podatkov:',
        options: [
          {
            id: 'opt-1',
            text: 'Vrednost U ostane popolnoma nespremenjena, saj se vrstni red (rang) največjega elementa ni spremenil.',
            isCorrect: true,
            explanation: 'Bravo! Rank-sum metode so popolnoma odporne na ekstremne osamelce, ker je pomemben le vrstni red, ne pa absolutna velikost.'
          },
          {
            id: 'opt-2',
            text: 'Vrednost U se poveča za 1000-krat.',
            isCorrect: false,
            explanation: 'Napačno. Rang največjega elementa ostane N.'
          },
          {
            id: 'opt-3',
            text: 'Vrednost U se zmanjša na nič.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Zaradi te robustnosti so rank metode idealne za podatke z močnimi osamelci ali asimetričnimi porazdelitvami!',
        followUpExperiment: 'V slovarju poiščite geslo za Wilcoxonov rank-sum test.'
      },
      mathProof: {
        summaryLatex: 'U_1 = R_1 - \\frac{n_1(n_1+1)}{2}, \\quad H = \\frac{12}{N(N+1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N+1) \\xrightarrow{d} \\chi^2_{k-1}',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Skupno rangiranje:</strong> Združimo $N = n_1 + n_2$ opazovanj in jim določimo range $1, \\dots, N$.</p>
            <p><strong>2. Vsota rangov:</strong> $R_1 = \\sum_{i=1}^{n_1} \\text{rank}(x_i)$.</p>
            <p><strong>3. Mann-Whitney U:</strong> $U_1 = \\sum_{i=1}^{n_1}\\sum_{j=1}^{n_2} \\mathbb{I}(x_i > y_j) = R_1 - \\frac{n_1(n_1+1)}{2}$.</p>
            <p><strong>4. Povezava:</strong> $U_1 + U_2 = n_1 n_2$.</p>
          </div>
        `
      },
      pythonSnippet: `# Mann-Whitney U in Kruskal-Wallis v Pythonu
from scipy import stats
import numpy as np

# Podatki z osamelci
skupina1 = [1.2, 1.5, 1.8, 1.4, 2.1, 50.0]  # osamelec 50.0
skupina2 = [0.8, 0.9, 1.1, 1.0, 1.2, 0.9]

# Mann-Whitney U test
stat_u, p_u = stats.mannwhitneyu(skupina1, skupina2, alternative='two-sided')
print(f"Mann-Whitney U: {stat_u:.1f}, p-vrednost: {p_u:.4f}")

# Kruskal-Wallis za 3 skupine
skupina3 = [2.5, 2.8, 3.1, 2.9, 3.4, 3.0]
stat_h, p_h = stats.kruskal(skupina1, skupina2, skupina3)
print(f"Kruskal-Wallis H: {stat_h:.3f}, p-vrednost: {p_h:.4f}")
`,
      rSnippet: `# Mann-Whitney in Kruskal-Wallis v R
s1 <- c(1.2, 1.5, 1.8, 1.4, 2.1, 50.0)
s2 <- c(0.8, 0.9, 1.1, 1.0, 1.2, 0.9)
s3 <- c(2.5, 2.8, 3.1, 2.9, 3.4, 3.0)

# Wilcoxon / Mann-Whitney
wilcox.test(s1, s2)

# Kruskal-Wallis
kruskal.test(list(s1, s2, s3))
`,
      learningObjectives: [
        'Razložiti mehanizem pretvorbe podatkov v range in izračun vsot rangov.',
        'Izvesti Mann-Whitney U test za dve neodvisni skupini in Wilcoxonov test za parne podatke.',
        'Uporabiti Kruskal-Wallisov test kot neparametrično alternativo enosmerni ANOVA.'
      ]
    }
  ]
};
