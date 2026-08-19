import { ChapterConfig } from '../../types';

export const chapter12: ChapterConfig = {
  id: 'chapter-12',
  chapterNumber: 12,
  title: '12. Poglavje: Bayesovo modeliranje & MCMC vzorčenje',
  subtitle: 'Konjugirane apriorne porazdelitve, Metropolis-Hastings, Gibbsovo vzorčenje in hierarhični modeli',
  description:
    'Vrhunec sodobnega statističnega modeliranja za doktorske raziskave: prehod od točkovnih ocen v celotne posteriorne porazdelitve parametrov $p(\\theta | y)$, vzorčenje po Markovih verigah (MCMC) ter hierarhični modeli s krčenjem ocen (Shrinkage).',
  iconName: 'Brain',
  color: '#f59e0b',
  units: [
    {
      id: 'unit-12-1',
      unitNumber: '12.1',
      chapterId: 'chapter-12',
      title: 'Konjugirano Bayesovo posodabljanje & Apriorno znanje',
      subtitle: 'Beta-Binomski in Normalno-Normalni modeli, verodostojni intervali (Credible Intervals)',
      leadParagraph:
        'V Bayesovem okviru parameter $\\theta$ ni fiksna neznana konstanta, temveč slučajna spremenljivka z lastno verjetnostno porazdelitvijo. Ko opazimo nove podatke $y$, posodobimo naše apriorno prepričanje $p(\\theta)$ v aposteriorno porazdelitev $p(\\theta|y)$.',
      deepDive:
        'Bayesov izrek za parametre se glasi: $p(\\theta | y) = \\frac{p(y | \\theta) p(\\theta)}{p(y)} = \\frac{p(y | \\theta) p(\\theta)}{\\int p(y | \\theta) p(\\theta) d\\theta} \\propto p(y | \\theta) p(\\theta)$.\\n1. **Beta-Binomski konjugirani par**: Če je $y \\sim \\text{Binomial}(n, \\theta)$ in $\\theta \\sim \\text{Beta}(\\alpha, \\beta)$, je posteriorna porazdelitev natanko $\\theta | y \\sim \\text{Beta}(\\alpha + y, \\beta + n - y)$. Apriorni parametri $\\alpha$ in $\\beta$ delujejo kot fiktivna pretekla opazovanja (psevdo-opazovanja).\\n2. **Bayesov verodostojni interval (Credible Interval)**: Območje $[a, b]$, za katero velja $\\int_a^b p(\\theta | y) d\\theta = 1 - \\alpha$. V nasprotju s frekventističnim intervalom zaupanja ima Bayesov verodostojni interval popolnoma intuitivno neposredno razlago: »Verjetnost, da se pravi parameter nahaja v tem intervalu, znaša točno 95 %!«',
      mnemonic: {
        eli5: 'Posterior = Verjetje (kaj pravijo podatki) × Prior (kaj smo vedeli prej). Z vsakim novim podatkom se naša ocena premakne bližje resnici!',
        anchor: 'p(θ|y) ∝ Likelihood × Prior; Beta(α+y, β+n-y); Verodostojni interval = resnična verjetnost parametra.',
        fallacyWarning: {
          name: 'Zamenjava verodostojnega intervala (Bayes) z intervalom zaupanja (Frequentist)',
          description: 'Trditev, da frekventistični 95% interval zaupanja pomeni 95% verjetnost, da je parameter v njem.',
          example: 'To drži le za Bayesov verodostojni interval (Credible Interval), pri frekventističnem pa gre za dolgoročni delež ponovitev poskusa!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Danes je posterior včerajšnjega dne in prior jutrišnjega.',
        simpleExplanation: 'Če pred poskusom menimo, da ima kovanec verjetnost za cifro okoli 50 % (Prior = Beta(10, 10)), in v 10 metih dobimo 8 cifer, bo naš novi posterior Beta(18, 12) z novim povprečjem 18/30 = 60 %.',
        practicalInsight: 'V farmaciji in A/B testiranju Bayesovo posodabljanje omogoča sprotno ustavljanje poskusov brez penalizacije večkratnega testiranja (multiplicity issues).',
        mathematicalTheory: 'Za normalni model z znano varianco $\\sigma^2$ in priorjem $\\mu \\sim \\mathcal{N}(\\mu_0, \\sigma_0^2)$ je posterior $\\mu | y \\sim \\mathcal{N}(\\mu_n, \\sigma_n^2)$ z natančnostjo $\\frac{1}{\\sigma_n^2} = \\frac{1}{\\sigma_0^2} + \\frac{n}{\\sigma^2}$.'
      },
      textbookWisdom: {
        simpleQuote: 'Posteriorna porazdelitev združuje empirične dokaze z apriornim znanjem v optimalno celoto.',
        simpleExplanation: 'Konjugirani pari omogočajo eksaktno analitično posodabljanje verjetnosti brez numerične integracije.',
        practicalInsight: 'Nepogrešljivo pri modeliranju majhnih vzorcev s predhodnimi zgodovinskimi študijami.',
        mathematicalTheory: 'Posteriorna natančnost je natanko vsota apriorne natančnosti in podatkovne natančnosti.'
      },
      cueBannerText: 'Spreminjajte apriorna parametra α in β ter opazujte premik posteriorne porazdelitve.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če uporabimo enakomerni ne-informativni prior Beta(1, 1) in v n = 10 metih opazimo y = 7 cifer, kakšna je posteriorna porazdelitev verjetnosti za cifro θ?',
        prompt: 'Uporabite formulo Beta(α + y, β + n - y):',
        options: [
          {
            id: 'opt-1',
            text: 'Beta(1 + 7, 1 + 10 - 7) = Beta(8, 4) s povprečjem 8/12 = 0,667.',
            isCorrect: true,
            explanation: 'Odlično! Beta(8, 4) gladko posodobi začetno nevednost z opazovanimi 7 uspehi in 3 neuspehi.'
          },
          {
            id: 'opt-2',
            text: 'Beta(7, 3).',
            isCorrect: false,
            explanation: 'Napačno. Pozabili ste prišteti apriorna parametra 1 in 1.'
          },
          {
            id: 'opt-3',
            text: 'Normalna porazdelitev N(7, 3).',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Laplaceovo pravilo nasledstva (Rule of Succession) natanko izhaja iz posodabljanja Beta(1,1) priorja!',
        followUpExperiment: 'V kalkulatorjih preverite Bayesov izrek z različnimi apriornimi verjetnostmi.'
      },
      mathProof: {
        summaryLatex: 'p(\\theta | y) \\propto p(y | \\theta) p(\\theta), \\quad \\theta | y \\sim \\text{Beta}(\\alpha + y, \\beta + n - y)',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Verjetje:</strong> $p(y | \\theta) = \\binom{n}{y} \\theta^y (1-\\theta)^{n-y} \\propto \\theta^y (1-\\theta)^{n-y}$.</p>
            <p><strong>2. Prior:</strong> $p(\\theta) = \\frac{1}{B(\\alpha, \\beta)} \\theta^{\\alpha-1} (1-\\theta)^{\\beta-1} \\propto \\theta^{\\alpha-1} (1-\\theta)^{\\beta-1}$.</p>
            <p><strong>3. Posterior:</strong> $p(\\theta | y) \\propto \\theta^{y + \\alpha - 1} (1-\\theta)^{n - y + \\beta - 1}$, kar je jedro $\\text{Beta}(\\alpha + y, \\beta + n - y)$.</p>
          </div>
        `
      },
      pythonSnippet: `# Konjugirano Bayesovo posodabljanje v Pythonu (scipy.stats)
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

alpha_prior, beta_prior = 2, 2
n_trials, n_success = 20, 14

alpha_post = alpha_prior + n_success
beta_post = beta_prior + (n_trials - n_success)

# 95% verodostojni interval (Credible Interval)
ci_lower, ci_upper = stats.beta.ppf([0.025, 0.975], alpha_post, beta_post)
post_mean = alpha_post / (alpha_post + beta_post)

print(f"Posteriorno povprečje: {post_mean:.3f}")
print(f"95% Verodostojni interval: ({ci_lower:.3f}, {ci_upper:.3f})")
`,
      rSnippet: `# Bayesovo posodabljanje Beta-Binomial v R
a_prior <- 2; b_prior <- 2
n <- 20; y <- 14

a_post <- a_prior + y
b_post <- b_prior + (n - y)

ci <- qbeta(c(0.025, 0.975), a_post, b_post)
cat(sprintf("Posterior mean: %.3f, 95%% CI: (%.3f, %.3f)\\n", a_post/(a_post+b_post), ci[1], ci[2]))
`,
      learningObjectives: [
        'Izpeljati posteriorno porazdelitev za Beta-Binomski in Normalno-Normalni konjugirani model.',
        'Razumeti razliko med Bayesovim verodostojnim intervalom in frekventističnim intervalom zaupanja.',
        'Interpretirati vpliv apriornega znanja in velikosti vzorca na krčenje ocen.'
      ]
    },
    {
      id: 'unit-12-2',
      unitNumber: '12.2',
      chapterId: 'chapter-12',
      title: 'MCMC vzorčenje: Metropolis-Hastings & Gibbsov algoritem',
      subtitle: 'Markovske verige za numerično integracijo visokorazsežnih posteriornih porazdelitev',
      leadParagraph:
        'Kadar imamo model z več deset ali sto parametri, integral v imenovalcu Bayesovega izreka $\\int p(y|\\theta)p(\\theta)d\\theta$ postane analitično nerešljiv. Tu nastopijo algoritmi MCMC (Markov Chain Monte Carlo).',
      deepDive:
        'MCMC algoritmi generirajo zaporedje stanj $\\theta^{(1)}, \\theta^{(2)}, \\dots, \\theta^{(S)}$, ki tvorijo Markovsko verigo, katere stacionarna porazdelitev je natanko želena posteriorna porazdelitev $p(\\theta|y)$.\\n1. **Metropolis-Hastingsov algoritem**: V stanju $\\theta^{(t)}$ predlagamo novo stanje $\\theta^* \\sim q(\\theta^* | \\theta^{(t)})$. Novo stanje sprejmemo z verjetnostjo: $\\alpha = \\min\\left(1, \\frac{p(\\theta^* | y) q(\\theta^{(t)} | \\theta^*)}{p(\\theta^{(t)} | y) q(\\theta^* | \\theta^{(t)})}\\right) = \\min\\left(1, \\frac{p(y | \\theta^*) p(\\theta^*) q(\\theta^{(t)} | \\theta^*)}{p(y | \\theta^{(t)}) p(\\theta^{(t)}) q(\\theta^* | \\theta^{(t)})}\\right)$. Ker se neznana normalizacijska konstanta $p(y)$ v razmerju popolnoma pokrajša, integrala sploh ni treba računati!\\n2. **Gibbsovo vzorčenje**: Poseben primer MCMC, kjer zaporedoma vzorčimo vsak parameter posebej iz njegovega polnega pogojnega posteriora $p(\\theta_j | \\boldsymbol{\\theta}_{-j}, y)$, pri čemer je verjetnost sprejetja vedno 100 %!\\n3. **Diagnostika konvergence**: Za preverjanje stabilnosti verig uporabljamo **Gelman-Rubinovo statistiko $\\hat{R}$** (ki mora biti blizu 1.00) in **efektivno velikost vzorca (ESS - Effective Sample Size)**, ki upošteva avtokorelacijo med zaporednimi koraki.',
      mnemonic: {
        eli5: 'MCMC je kot slepi raziskovalec v megli na gori: z vsakim korakom vrže kovanec in se premakne v novo smer, pri čemer se pogosteje premika navzgor kot navzdol. Čez čas bo preživel največ časa na najvišjih vrhovih!',
        anchor: 'MCMC: raziskuje posterior brez integrala; α = min(1, ratio); Gelman-Rubin R̂ < 1.05 za konvergenco.',
        fallacyWarning: {
          name: 'Uporaba MCMC vzorcev pred zaključkom ogrevanja (Burn-in / Warmup)',
          description: 'Vključitev začetnih korakov, ko veriga še ni dosegla stacionarnega stanja, močno popači posteriorne ocene.',
          example: 'Vedno zavrzite prvih 1.000 korakov (burn-in faza) in preverite sled verige (trace plot)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'MCMC je omogočil Bayesovo revolucijo v 21. stoletju z reševanjem prej nerešljivih integralov.',
        simpleExplanation: 'Namesto zapletenega matematičnega računanja celotne formule računalnik preprosto »hodi« po verjetnostni pokrajini in zbere 10.000 točk, iz katerih narišemo histogram parametra.',
        practicalInsight: 'Sodobna programska orodja kot so Stan, PyMC in brms omogočajo formulacijo Bayesovih modelov v nekaj vrsticah kode z No-U-Turn Samplerjem (NUTS).',
        mathematicalTheory: 'Ergodični teorem garantira, da vzorčno povprečje $\\frac{1}{S}\\sum_{s=1}^S g(\\theta^{(s)}) \\xrightarrow{a.s.} \\mathbb{E}_{p(\\theta|y)}[g(\\theta)]$.'
      },
      textbookWisdom: {
        simpleQuote: 'MCMC vzorčenje pretvori analitično nerešljive integrale v enostavno štetje simuliranih točk.',
        simpleExplanation: 'Metropolis-Hastings in Gibbs vzorčevalniki omogočajo polno Bayesovo sklepanje pri poljubnem številu parametrov.',
        practicalInsight: 'Temelj sodobne astrofizike, genetike, kognitivnih znanosti in strojnega učenja.',
        mathematicalTheory: 'Zadostni pogoj za stacionarnost je podrobno ravnovesje (detailed balance).'
      },
      cueBannerText: 'Sledite poti Markovskih verig (Trace plot) in opazujte konvergenco k stacionarnemu posterioru.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Kaj pomeni, če je Gelman-Rubinova diagnostična statistika R̂ za parameter enaka 1.01?',
        prompt: 'Razmislite o primerjavi variabilnosti med več neodvisnimi verigami in znotraj njih:',
        options: [
          {
            id: 'opt-1',
            text: 'Verige so uspešno konvergirale k stacionarni porazdelitvi (R̂ < 1.05 označuje dobro konvergenco).',
            isCorrect: true,
            explanation: 'Tako je! Vrednost R̂ blizu 1.00 potrjuje, da se neodvisne verige med seboj ujemajo in vzorčijo iz istega posteriora.'
          },
          {
            id: 'opt-2',
            text: 'Veriga se je zataknila in potrebuje več korakov ogrevanja.',
            isCorrect: false,
            explanation: 'Napačno. Zataknjena veriga bi imela visoko vrednost R̂ (npr. > 1.20).'
          },
          {
            id: 'opt-3',
            text: 'V modelu je prišlo do napake deljenja z nič.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Diagnostika R̂ in efektivno število neodvisnih vzorcev (ESS) sta obvezna standarda vsake Bayesove objave!',
        followUpExperiment: 'V orodju za formule preverite definicijo Metropolis-Hastingsovega razmerja.'
      },
      mathProof: {
        summaryLatex: '\\alpha(\\theta^{(t)}, \\theta^*) = \\min\\left(1, \\frac{p(y|\\theta^*)p(\\theta^*) q(\\theta^{(t)}|\\theta^*)}{p(y|\\theta^{(t)})p(\\theta^{(t)}) q(\\theta^*|\\theta^{(t)})}\\right)',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Podrobno ravnovesje (Detailed balance):</strong> $p(\\theta|y) T(\\theta \\to \\theta^*) = p(\\theta^*|y) T(\\theta^* \\to \\theta)$.</p>
            <p><strong>2. Prehodna verjetnost:</strong> $T(\\theta \\to \\theta^*) = q(\\theta^* | \\theta) \\alpha(\\theta, \\theta^*)$.</p>
            <p><strong>3. Izpeljava:</strong> Če izberemo $\\alpha = \\min\\left(1, \\frac{p(\\theta^*|y)q(\\theta|\\theta^*)}{p(\\theta|y)q(\\theta^*|\\theta)}\\right)$, je podrobno ravnovesje zadoščeno za vsak par stanj.</p>
          </div>
        `
      },
      pythonSnippet: `# Preprost Metropolis-Hastings vzorčevalnik v Pythonu
import numpy as np

def target_posterior(theta):
    # npr. nestandardni posterior: mešanica dveh normalnih
    if theta < -10 or theta > 10: return 0.0
    return 0.3 * np.exp(-0.5 * (theta + 2)**2) + 0.7 * np.exp(-0.5 * (theta - 3)**2 / 0.5**2)

S = 5000
samples = np.empty(S)
current = 0.0

for s in range(S):
    proposal = current + np.random.normal(0, 1.0)
    alpha = min(1.0, target_posterior(proposal) / target_posterior(current))
    if np.random.rand() < alpha:
        current = proposal
    samples[s] = current

burn_in = samples[1000:]
print(f"Posteriorno povprečje: {np.mean(burn_in):.3f}, SD: {np.std(burn_in):.3f}")
`,
      rSnippet: `# Metropolis-Hastings v R
target <- function(theta) {
  0.3 * dnorm(theta, -2, 1) + 0.7 * dnorm(theta, 3, 0.5)
}

S <- 5000
samples <- numeric(S)
curr <- 0

for(s in 1:S) {
  prop <- curr + rnorm(1, 0, 1)
  alpha <- min(1, target(prop) / target(curr))
  if(runif(1) < alpha) curr <- prop
  samples[s] <- curr
}

burn <- samples[1001:S]
cat(sprintf("Mean: %.3f, SD: %.3f\\n", mean(burn), sd(burn)))
`,
      learningObjectives: [
        'Razumeti zakaj je MCMC potreben za večrazsežne Bayesove modele.',
        'Izpeljati Metropolis-Hastingsov sprejemni pogoj in Gibbsov algoritem.',
        'Oceniti konvergenco verig z Gelman-Rubinovo statistiko R̂ in trace grafi.'
      ]
    },
    {
      id: 'unit-12-3',
      unitNumber: '12.3',
      chapterId: 'chapter-12',
      title: 'Hierarhični Bayesovi modeli & Deljenje informacij (Shrinkage)',
      subtitle: 'Večnivojski modeli (Multilevel), delna združitev (Partial Pooling) in empirični Bayes',
      leadParagraph:
        'Kadar imamo podatke organizirane v skupine (npr. bolniki v različnih bolnišnicah, učenci v šolah), se soočamo z dilemo: ali analizirati vsako skupino povsem ločeno ali vse skupine združiti v eno? Hierarhični modeli ponujajo optimalni kompromis s krčenjem ocen.',
      deepDive:
        '1. **Popolna združitev (Complete Pooling)**: Vse skupine imajo identičen parameter $\\theta$. To ignorira resnične razlike med skupinami.\\n2. **Brez združitve (No Pooling)**: Vsaka skupina $j$ ima popolnoma neodvisno oceno $\\hat{\\theta}_j$. Pri majhnih skupinah (npr. bolnišnica s samo 3 operacijami) so ocene izjemno hrupne in nezanesljive.\\n3. **Delna združitev v hierarhičnem modelu (Partial Pooling)**: Privzamemo, da posamezni parametri skupin $\\theta_j$ izhajajo iz skupne nadrejene populacijske porazdelitve: $y_{ij} | \\theta_j \\sim \\mathcal{N}(\\theta_j, \\sigma^2)$ ter $\\theta_j | \\mu, \\tau \\sim \\mathcal{N}(\\mu, \\tau^2)$. Tu sta $\\mu$ (populacijsko povprečje) in $\\tau$ (variabilnost med skupinami) **hiperparametri** z lastnimi hiperpriorji. Posteriorna ocena za skupino $j$ je tehtana kombinacija njenega vzorčnega povprečja $\\bar{y}_j$ in celotnega povprečja $\\mu$: $\\hat{\\theta}_j = \\frac{n_j / \\sigma^2}{n_j / \\sigma^2 + 1/\\tau^2} \\bar{y}_j + \\frac{1/\\tau^2}{n_j / \\sigma^2 + 1/\\tau^2} \\mu$. Majhne skupine se močno skrčijo proti celotnemu povprečju (Borrowing strength), velike skupine pa ohranijo lastne specifičnosti!',
      mnemonic: {
        eli5: 'Če novinec v ligi odigra 1 tekmo in zadene 100 % metov, ne bomo rekli, da je najboljši košarkar vseh časov. Njegovo oceno bomo »skrčili« proti povprečju lige, dokler ne odigra več tekem. Točno to matematično počne hierarhični Bayes!',
        anchor: 'Hierarhični model: y_ij ~ f(θ_j); θ_j ~ f(μ, τ); Delna združitev krči majhne skupine k sredini.',
        fallacyWarning: {
          name: 'Prekomerna samozavest pri ocenjevanju majhnih podskupin',
          description: 'Razglašanje ekstremnih rezultatov v majhnih enotah za »najboljše« ali »najslabše« (npr. najmanjše šole z navideznimi rekordi).',
          example: 'Ekstremi v majhnih skupinah so skoraj vedno artefakt vzorčnega šuma, ki ga hierarhični model elegantno odpravi!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Hierarhični modeli omogočajo, da si sorodne skupine med seboj »sposojajo moč« in zmanjšujejo napako.',
        simpleExplanation: 'Sistem samodejno ugotovi, koliko si skupine sploh delijo skupnih lastnosti (prek parametra $\\tau$), in temu primerno prilagodi stopnjo krčenja.',
        practicalInsight: 'V NBA ligi, pri kliničnem ocenjevanju bolnišnic in v marketinških analizah so hierarhični modeli industrijski standard.',
        mathematicalTheory: 'James-Steinova cenilka je dokazala, da je pri $p \\ge 3$ dimenzijah običajno vzorčno povprečje nedopustno (inadmissible) in ga hierarhično krčenje zmeraj premaga v smislu MSE!'
      },
      textbookWisdom: {
        simpleQuote: 'Hierarhični modeli omogočajo, da si sorodne skupine med seboj sposojajo statistično moč.',
        simpleExplanation: 'Delna združitev zmanjšuje varianco ocen pri majhnih skupinah brez popačenja celotnega modela.',
        practicalInsight: 'James-Steinovo krčenje in večnivojsko modeliranje sta temelj analize strukturiranih podatkov.',
        mathematicalTheory: 'Posteriorni parameter je konveksna kombinacija skupinskega in populacijskega povprečja.'
      },
      cueBannerText: 'Opazujte, kako se točke majhnih skupin premikajo (krčijo) proti skupnemu povprečju.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Kaj se zgodi z oceno uspešnosti bolnišnice v hierarhičnem modelu, če ima ta bolnišnica le 2 pacienta v primerjavi z drugo bolnišnico z 2.000 pacienti?',
        prompt: 'Pomislite na tehtanje med lastnim povprečjem in populacijskim povprečjem:',
        options: [
          {
            id: 'opt-1',
            text: 'Ocena bolnišnice z 2 pacientoma se močno skrči (približa) k povprečju vseh bolnišnic, medtem ko ocena velike bolnišnice ostane skoraj enaka njenemu lastnemu povprečju.',
            isCorrect: true,
            explanation: 'Odlično! Majhen vzorec prinaša malo lastne informacije, zato model večino teže pripiše populacijskemu povprečju.'
          },
          {
            id: 'opt-2',
            text: 'Obe bolnišnici se skrčita za popolnoma enak delež.',
            isCorrect: false,
            explanation: 'Napačno. Stopnja krčenja je odvisna od velikosti vzorca n_j posamezne skupine.'
          },
          {
            id: 'opt-3',
            text: 'Majhna bolnišnica se sploh ne spremeni.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Delna združitev preprečuje prenagle in napačne zaključke pri analizi majhnih podskupin!',
        followUpExperiment: 'V študijah primerov si oglejte primer Ames Housing in modeliranje več skupin.'
      },
      mathProof: {
        summaryLatex: '\\hat{\\theta}_j = \\frac{\\frac{n_j}{\\sigma^2}}{\\frac{n_j}{\\sigma^2} + \\frac{1}{\\tau^2}} \\bar{y}_j + \\frac{\\frac{1}{\\tau^2}}{\\frac{n_j}{\\sigma^2} + \\frac{1}{\\tau^2}} \\mu',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Podatkovni nivo:</strong> $y_{ij} | \\theta_j \\sim \\mathcal{N}(\\theta_j, \\sigma^2)$.</p>
            <p><strong>2. Skupinski nivo:</strong> $\\theta_j | \\mu, \\tau \\sim \\mathcal{N}(\\mu, \\tau^2)$.</p>
            <p><strong>3. Posteriorna porazdelitev:</strong> $\\theta_j | \\mathbf{y}_j, \\mu, \\tau \\sim \\mathcal{N}(\\hat{\\theta}_j, V_j)$, kjer je $V_j = \\left(\\frac{n_j}{\\sigma^2} + \\frac{1}{\\tau^2}\\right)^{-1}$.</p>
          </div>
        `
      },
      pythonSnippet: `# Hierarhični Bayesov model z delnim krčenjem v Pythonu
import numpy as np

# Primer 8 šol (Rubin 1981)
y = np.array([28.0, 8.0, -3.0, 7.0, -1.0, 1.0, 18.0, 12.0])
sigma = np.array([15.0, 10.0, 16.0, 11.0, 9.0, 11.0, 10.0, 18.0])

mu_hat = np.sum(y / sigma**2) / np.sum(1 / sigma**2)
tau = 5.0 # predpostavljena variabilnost med šolami

weights = (1 / sigma**2) / (1 / sigma**2 + 1 / tau**2)
theta_shrunk = weights * y + (1 - weights) * mu_hat

for i in range(len(y)):
    print(f"Šola {i+1}: Surovo y={y[i]:5.1f} -> Skrčena ocena={theta_shrunk[i]:5.1f}")
`,
      rSnippet: `# Hierarhični model v R
y <- c(28, 8, -3, 7, -1, 1, 18, 12)
sigma <- c(15, 10, 16, 11, 9, 11, 10, 18)
mu_hat <- sum(y/sigma^2) / sum(1/sigma^2)
tau <- 5

w <- (1/sigma^2) / (1/sigma^2 + 1/tau^2)
theta_shrunk <- w * y + (1 - w) * mu_hat
data.frame(Surovo = y, Skrceno = round(theta_shrunk, 2))
`,
      learningObjectives: [
        'Razumeti razliko med Complete Pooling, No Pooling in Partial Pooling.',
        'Izpeljati formulo za krčenje ocen (Shrinkage) v hierarhičnem normalnem modelu.',
        'Prepoznati prednosti hierarhičnega modeliranja za preprečevanje artefaktov majhnih vzorcev.'
      ]
    }
  ]
};
