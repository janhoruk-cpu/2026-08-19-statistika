import { ChapterConfig } from '../../types';

export const chapter10: ChapterConfig = {
  id: 'chapter-10',
  chapterNumber: 10,
  title: '10. Poglavje: Teorija ocenjevanja & Asimptotično sklepanje',
  subtitle: 'Metoda največjega verjetja (MLE), Fisherjeva informacija, test razmerja verjetij (LRT) in Waldov test',
  description:
    'Rigorozni matematični temelji statističnega sklepanja: zakaj je cenilka največjega verjetja asimptotično optimalna, kako merimo količino informacije v podatkih s Fisherjevo informacijo in kako izvajamo teste razmerja verjetij (LRT) pri kompleksnih parametričnih modelih.',
  iconName: 'Sigma',
  color: '#0284c7',
  units: [
    {
      id: 'unit-10-1',
      unitNumber: '10.1',
      chapterId: 'chapter-10',
      title: 'Metoda največjega verjetja (MLE) & Fisherjeva informacija',
      subtitle: 'Optimizacija log-verjetja, ocena parametrov in Cramér-Raojeva meja učinkovitosti',
      leadParagraph:
        'Kadar imamo parametrični model $f(x; \\theta)$, želimo poiskati vrednost parametra $\\theta$, pri kateri so opazovani podatki najbolj verjetni. To dosežemo z metodo največjega verjetja (Maximum Likelihood Estimation - MLE).',
      deepDive:
        'Funkcija verjetja za neodvisne enako porazdeljene (i.i.d.) opazovane vrednosti $x_1, \\dots, x_n$ je definirana kot produkt verjetnostnih gostot: $L(\\theta) = \\prod_{i=1}^n f(x_i; \\theta)$. V praksi maksimiziramo logaritemsko funkcijo verjetja: $\\ell(\\theta) = \\ln L(\\theta) = \\sum_{i=1}^n \\ln f(x_i; \\theta)$. Cenilka MLE $\\hat{\\theta}_{\\text{MLE}}$ je rešitev enačbe verjetja $S(\\theta) = \\frac{\\partial \\ell(\\theta)}{\\partial \\theta} = 0$. Fisherjeva informacija meri ukrivljenost log-verjetja: $I_n(\\theta) = -\\mathbb{E}\\left[\\frac{\\partial^2 \\ell(\\theta)}{\\partial \\theta^2}\\right] = n I_1(\\theta)$. Po Cramér-Raojevem izreku je varianca katerekoli nepristranske cenilke omejena navzdol z obratno vrednostjo Fisherjeve informacije: $\\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I_n(\\theta)}$. MLE doseže to mejo asimptotično, ko $n \\to \\infty$, kar pomeni, da je asimptotično učinkovita!',
      mnemonic: {
        eli5: 'Predstavljajte si, da imate radio in vrtite gumb za frekvenco. Funkcija verjetja je jakost signala: MLE je natanko tista frekvenca, pri kateri je zvok najbolj čist in glasen!',
        anchor: 'ℓ(θ) = ln L(θ); Rešitev S(θ) = 0 da MLE; Asimptotična varianca = 1 / I(θ).',
        fallacyWarning: {
          name: 'Zamenjava verjetnosti parametra in verjetja podatkov',
          description: 'Mnenje, da L(θ) pomeni verjetnost, da je parameter θ resničen.',
          example: 'L(θ) meri verjetnost opazovanih podatkov pri danem θ, ne pa verjetnosti parametra θ samega (za slednje potrebujemo Bayesov pristop)!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Cenilka največjega verjetja izbere tisto razlago sveta, pod katero so naši podatki najmanj presenetljivi.',
        simpleExplanation: 'Pri Bernoullijevem poskusu z $k$ uspehi v $n$ metih je funkcija verjetja $L(p) = p^k (1-p)^{n-k}$. Z odvajanjem log-verjetja $\\ell(p) = k \\ln(p) + (n-k) \\ln(1-p)$ in izenačitvijo z 0 dobimo intuitivno cenilko $\\hat{p} = \\frac{k}{n}$.',
        practicalInsight: 'Vse sodobne knjižnice strojnega učenja (Scikit-Learn, PyTorch, R glm, statsmodels) uporabljajo numerično maksimizacijo log-verjetja (BFGS, Newton-Raphson) za prilagajanje nevronskih mrež in GLM modelov.',
        mathematicalTheory: 'Pod regularnostnimi pogoji velja asimptotična normalnost: $\\sqrt{n}(\\hat{\\theta}_n - \\theta_0) \\xrightarrow{d} \\mathcal{N}\\left(0, I_1(\\theta_0)^{-1}\\right)$.'
      },
      textbookWisdom: {
        simpleQuote: 'Cenilka največjega verjetja izbere tisto razlago sveta, pod katero so naši podatki najmanj presenetljivi.',
        simpleExplanation: 'Pri Bernoullijevem poskusu z $k$ uspehi v $n$ metih je funkcija verjetja $L(p) = p^k (1-p)^{n-k}$. Z odvajanjem log-verjetja $\\ell(p) = k \\ln(p) + (n-k) \\ln(1-p)$ in izenačitvijo z 0 dobimo intuitivno cenilko $\\hat{p} = \\frac{k}{n}$.',
        practicalInsight: 'Vse sodobne knjižnice strojnega učenja uporabljajo numerično maksimizacijo log-verjetja za prilagajanje kompleksnih modelov.',
        mathematicalTheory: 'Pod regularnostnimi pogoji velja asimptotična normalnost: $\\sqrt{n}(\\hat{\\theta}_n - \\theta_0) \\xrightarrow{d} \\mathcal{N}\\left(0, I_1(\\theta_0)^{-1}\\right)$.'
      },
      cueBannerText: 'Preučite ukrivljenost log-verjetja in pomen Fisherjeve informacije za natančnost ocene.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Kaj se zgodi s Fisherjevo informacijo I_n(θ) in asimptotično standardno napako MLE, ko podvojimo velikost vzorca (n → 2n)?',
        prompt: 'Upoštevajte, da je I_n(θ) = n · I_1(θ) in SE(θ̂) = 1 / sqrt(I_n(θ)):',
        options: [
          {
            id: 'opt-1',
            text: 'Informacija se podvoji (2x), standardna napaka pa se zmanjša za faktor sqrt(2) ≈ 1.414.',
            isCorrect: true,
            explanation: 'Pravilno! Fisherjeva informacija je linearna v n, standardna napaka pa pada s hitrostjo 1/sqrt(n).'
          },
          {
            id: 'opt-2',
            text: 'Informacija ostane enaka, standardna napaka pa se prepolovi.',
            isCorrect: false,
            explanation: 'Napačno. Informacija raste sorazmerno z velikostjo vzorca n.'
          },
          {
            id: 'opt-3',
            text: 'Informacija se poveča za 4-krat.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Fisherjeva informacija neposredno določa teoretično najmanjšo možno negotovost kateregakoli statističnega modela!',
        followUpExperiment: 'V simulaciji preverite vpliv števila podatkov na strmost vrha log-verjetja.'
      },
      mathProof: {
        summaryLatex: '\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_{\\theta} \\sum_{i=1}^n \\ln f(x_i; \\theta), \\quad \\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I_n(\\theta)}',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Log-verjetje:</strong> $\\ell(\\theta) = \\sum_{i=1}^n \\ln f(x_i; \\theta)$.</p>
            <p><strong>2. Pogoj prvega reda:</strong> $S(\\hat{\\theta}) = \\left. \\frac{\\partial \\ell}{\\partial \\theta} \\right|_{\\theta = \\hat{\\theta}} = 0$.</p>
            <p><strong>3. Fisherjeva informacija:</strong> $I_n(\\theta) = -\\mathbb{E}\\left[\\frac{\\partial^2 \\ell}{\\partial \\theta^2}\\right] = \\mathbb{E}\\left[\\left(\\frac{\\partial \\ell}{\\partial \\theta}\\right)^2\\right]$.</p>
            <p><strong>4. Asimptotična porazdelitev:</strong> $\\hat{\\theta} \\sim \\mathcal{N}\\left(\\theta_0, \\frac{1}{I_n(\\theta_0)}\\right)$.</p>
          </div>
        `
      },
      pythonSnippet: `# Ocena parametrov normalne porazdelitve z MLE v Pythonu
import numpy as np
from scipy.optimize import minimize

np.random.seed(42)
data = np.random.normal(loc=5.0, scale=2.0, size=100)

def neg_log_likelihood(params):
    mu, sigma = params
    if sigma <= 0: return np.inf
    n = len(data)
    ll = -n/2 * np.log(2 * np.pi * sigma**2) - np.sum((data - mu)**2) / (2 * sigma**2)
    return -ll

res = minimize(neg_log_likelihood, [0.0, 1.0], method='L-BFGS-B', bounds=[(None, None), (1e-4, None)])
print(f"MLE mu: {res.x[0]:.3f}, sigma: {res.x[1]:.3f}")
`,
      rSnippet: `# MLE v R z funkcijo optim
set.seed(42)
data <- rnorm(100, mean=5, sd=2)

nll <- function(params) {
  mu <- params[1]
  sigma <- params[2]
  if(sigma <= 0) return(Inf)
  -sum(dnorm(data, mean=mu, sd=sigma, log=TRUE))
}

fit <- optim(c(mu=0, sigma=1), nll)
cat(sprintf("MLE mu: %.3f, sigma: %.3f\\n", fit$par[1], fit$par[2]))
`,
      learningObjectives: [
        'Razumeti konstrukcijo funkcije verjetja in log-verjetja za poljuben verjetnostni model.',
        'Definirati Fisherjevo informacijo in Cramér-Raojevo spodnjo mejo variance.',
        'Razložiti asimptotično konsistentnost, normalnost in učinkovitost cenilk MLE.'
      ]
    },
    {
      id: 'unit-10-2',
      unitNumber: '10.2',
      chapterId: 'chapter-10',
      title: 'Trojica asimptotičnih testov: LRT, Wald & Score (Rao)',
      subtitle: 'Kako preizkušati kompleksne hipoteze s testom razmerja verjetij in kvadratičnimi formami',
      leadParagraph:
        'V napredni statistiki za preverjanje hipotez $H_0: \\theta \\in \\Theta_0$ proti $H_1: \\theta \\notin \\Theta_0$ uporabljamo tri med seboj asimptotično ekvivalentne teste: test razmerja verjetij (LRT), Waldov test in Score (Rao) test.',
      deepDive:
        '1. **Test razmerja verjetij (Likelihood Ratio Test - LRT)**: Primerja maksimalno doseženo log-verjetje pod ničelno hipotezo z neomejenim modelom: $\\Lambda = 2 \\left[ \\ell(\\hat{\\theta}) - \\ell(\\hat{\\theta}_0) \\right]$. Po Wilksovem izreku velja pod $H_0$: $\\Lambda \\xrightarrow{d} \\chi^2_r$, kjer je $r = \\dim(\\Theta) - \\dim(\\Theta_0)$ število testiranih omejitev.\\n2. **Waldov test**: Meri razdaljo med ocenjenim parametrom in ničelno vrednostjo, uteženo z oceno kovariančne matrike: $W = (\\hat{\\theta} - \\theta_0)^T [\\widehat{\\text{Var}}(\\hat{\\theta})]^{-1} (\\hat{\\theta} - \\theta_0) \\sim \\chi^2_r$.\\n3. **Score / Rao test**: Ocenjuje naklon log-verjetja (gradient $S(\\theta)$) izključno pri ničelni vrednosti $\\theta_0$, zato ne zahteva izračuna neomejene cenilke $\\hat{\\theta}$. Vsi trije testi so asimptotično ekvivalentni pod ničelno hipotezo, pri končnih vzorcih pa velja znana neenakost: $W \\ge \\Lambda \\ge LM$ (v linearni regresiji).',
      mnemonic: {
        eli5: 'Predstavljajte si goro: LRT meri razliko v višini med vrhom in omejeno točko; Wald meri vodoravno razdaljo med njima; Score pa meri strmino pobočja natanko na mestu ničelne hipoteze!',
        anchor: 'LRT: primerja vi višini 2(l(θ̂) - l(θ₀)); Wald: meri razdaljo (θ̂-θ₀); Score: meri naklon pri θ₀.',
        fallacyWarning: {
          name: 'Zanašanje na Waldov test pri nelinearnih parametrih (Hauck-Donnerjev efekt)',
          description: 'Pri logistični regresiji z zelo močnim učinkom lahko Waldov test paradoksalno da visoko p-vrednost zaradi napihnjene standardne napake.',
          example: 'V takih primerih je LRT test zanesljivejši in odporen proti Hauck-Donnerjevemu efektu!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Wilksov izrek spremeni razliko v log-verjetju neposredno v hi-kvadrat distribucijo.',
        simpleExplanation: 'Če imamo poln model z 5 parametri in zožen model z 2 parametroma, razlika $2(\\ell_{\\text{poln}} - \\ell_{\\text{zožen}})$ sledi $\\chi^2$ porazdelitvi s $5 - 2 = 3$ prostostnimi stopnjami.',
        practicalInsight: 'Funkcija `anova(model1, model2, test="Chisq")` v R ali `lrtest` v Pythonu izračunata natanko LRT test za primerjavo gnezdenih modelov.',
        mathematicalTheory: 'Wilksov teorem: pod $H_0$ velja $-2 \\ln \\lambda \\xrightarrow{d} \\chi^2_{p - q}$, kjer je $\\lambda = \\frac{\\sup_{\\Theta_0} L(\\theta)}{\\sup_{\\Theta} L(\\theta)}$.'
      },
      textbookWisdom: {
        simpleQuote: 'Wilksov izrek spremeni razliko v log-verjetju neposredno v hi-kvadrat distribucijo.',
        simpleExplanation: 'Razlika med maksimalnim log-verjetjem polnega in zoženega modela sledi hi-kvadrat porazdelitvi.',
        practicalInsight: 'LRT je standard pri primerjavi gnezdenih hierarhičnih modelov v bioinformatiki in ekonometriji.',
        mathematicalTheory: 'Wilksov teorem: $-2 \\ln \\lambda \\xrightarrow{d} \\chi^2_r$, kjer je r število omejitev.'
      },
      cueBannerText: 'Primerjajte vrednosti LRT in Waldove statistike za gnezdeni model.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Koliko prostostnih stopenj ima test razmerja verjetij (LRT), če polni model vsebuje 6 parametrov, ničelna hipoteza pa fiksira 2 izmed njih na nič (torej ima zoženi model 4 parametre)?',
        prompt: 'Uporabite formulo df = dim(poln) - dim(zožen):',
        options: [
          {
            id: 'opt-1',
            text: 'df = 2 (število testiranih omejitev 6 - 4 = 2).',
            isCorrect: true,
            explanation: 'Odlično! Število prostostnih stopenj je enako številu neodvisnih omejitev pod ničelno hipotezo.'
          },
          {
            id: 'opt-2',
            text: 'df = 6 (celotno število parametrov).',
            isCorrect: false,
            explanation: 'Napačno.'
          },
          {
            id: 'opt-3',
            text: 'df = 4.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'LRT test omogoča sočasno preverjanje celotnega sklopa parametrov v enem samem elegantnem koraku!',
        followUpExperiment: 'V orodju za kalkulatorje preverite kritične meje hi-kvadrat porazdelitve za različne stopnje prostosti.'
      },
      mathProof: {
        summaryLatex: '\\Lambda = 2 \\left[ \\ell(\\hat{\\theta}) - \\ell(\\hat{\\theta}_0) \\right] \\xrightarrow{d} \\chi^2_r, \\quad W = (\\hat{\\theta} - \\theta_0)^T I_n(\\hat{\\theta}) (\\hat{\\theta} - \\theta_0) \\xrightarrow{d} \\chi^2_r',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Taylorjev razvoj log-verjetja okoli $\\hat{\\theta}$:</strong></p>
            <p>$\\ell(\\theta_0) \\approx \\ell(\\hat{\\theta}) + S(\\hat{\\theta})^T(\\theta_0 - \\hat{\\theta}) - \\frac{1}{2}(\\theta_0 - \\hat{\\theta})^T I_n(\\hat{\\theta})(\\theta_0 - \\hat{\\theta})$.</p>
            <p>Ker je $S(\\hat{\\theta}) = 0$, sledi:</p>
            <p>$2[\\ell(\\hat{\\theta}) - \\ell(\\theta_0)] \\approx (\\hat{\\theta} - \\theta_0)^T I_n(\\hat{\\theta})(\\hat{\\theta} - \\theta_0) = W$.</p>
            <p>Ker $\\sqrt{n}(\\hat{\\theta} - \\theta_0) \\sim \\mathcal{N}(0, I_1^{-1})$, kvadratna forma asimptotično sledi $\\chi^2_r$.</p>
          </div>
        `
      },
      pythonSnippet: `# Primerjava gnezdenih modelov z LRT testom v Pythonu
import statsmodels.api as sm
import statsmodels.formula.api as smf
import scipy.stats as stats
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'x1': np.random.randn(100),
    'x2': np.random.randn(100),
    'y': np.random.randn(100)
})

m_full = smf.ols('y ~ x1 + x2', data=df).fit()
m_red = smf.ols('y ~ x1', data=df).fit()

# LRT statistika: 2 * (llf_full - llf_reduced)
lrt_stat = 2 * (m_full.llf - m_red.llf)
df_diff = m_full.df_model - m_red.df_model
p_val = stats.chi2.sf(lrt_stat, df=df_diff)

print(f"LRT Stat: {lrt_stat:.3f}, df: {df_diff}, p-val: {p_val:.4f}")
`,
      rSnippet: `# LRT test v R z lmtest paketom
# install.packages("lmtest")
library(lmtest)

df <- data.frame(x1 = rnorm(100), x2 = rnorm(100), y = rnorm(100))
m_full <- lm(y ~ x1 + x2, data=df)
m_red  <- lm(y ~ x1, data=df)

lrtest(m_full, m_red)
`,
      learningObjectives: [
        'Razumeti geometrijsko in verjetnostno povezavo med testi LRT, Wald in Score.',
        'Uporabiti Wilksov izrek za določitev asimptotične porazdelitve testne statistike.',
        'Prepoznati prednosti in slabosti posameznega testa pri končnih vzorcih in nelinearnih parametrih.'
      ]
    },
    {
      id: 'unit-10-3',
      unitNumber: '10.3',
      chapterId: 'chapter-10',
      title: 'Večrazsežna normalna porazdelitev & Mahalanobisova razdalja',
      subtitle: 'Kovariančne matrike, elipsoidi zaupanja in geometrija multivariatnih podatkov',
      leadParagraph:
        'Kadar sočasno merimo $p$ zveznih spremenljivk, jih modeliramo z večrazsežno normalno porazdelitvijo $\\mathcal{N}_p(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$. Razdalje med točkami v večdimenzionalnem prostoru merimo z Mahalanobisovo razdaljo, ki upošteva korelacije.',
      deepDive:
        'Gostota $p$-razsežnega normalnega slučajnega vektorja $\\mathbf{X} \\in \\mathbb{R}^p$ je podana z: $f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left( -\\frac{1}{2} (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu}) \\right)$. Kvadratni člen v eksponentu $D_M^2 = (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})$ predstavlja **kvadrat Mahalanobisove razdalje**. Krivulje konstantne gostote tvorijo elipsoide v $\\mathbb{R}^p$. Če so spremenljivke nekorelirane in normirane ($\\boldsymbol{\\Sigma} = \\mathbf{I}$), se Mahalanobisova razdalja poenostavi v standardno Evklidsko razdaljo. Za normalno porazdeljene podatke kvadrat Mahalanobisove razdalje sledi hi-kvadrat porazdelitvi s $p$ prostostnimi stopnjami: $D_M^2 \\sim \\chi^2_p$. To omogoča zanesljivo zaznavanje večrazsežnih osamelcev (multivariate outliers), ki so lahko v posameznih enodimenzionalnih projekcijah povsem neopazni!',
      mnemonic: {
        eli5: 'Če merite višino in težo, točka z višino 195 cm in težo 55 kg ni osamelec ne po višini ne po teži posebej, je pa izjemen večrazsežni osamelec v njunem skupnem prostoru! Mahalanobisova razdalja to takoj opazi.',
        anchor: 'D_M^2 = (x - μ)^T Σ^(-1) (x - μ) ~ χ^2_p; Upošteva korelacije in razpršenost.',
        fallacyWarning: {
          name: 'Zanašanje na Evklidsko razdaljo pri koreliranih podatkih',
          description: 'Merjenje razdalje brez upoštevanja kovariančne matrike povzroči napačno razvrščanje in zgrešene osamelce.',
          example: 'Evklidska razdalja predpostavlja okrogel oblak točk, podatki v praksi pa so skoraj vedno raztegnjeni v poševne elipsoide!'
        }
      },
      explanationLevels: {
        simpleQuote: 'Mahalanobisova razdalja meri oddaljenost točke od središča v enotah standardnega odklona vzdolž glavnih osi razpršenosti.',
        simpleExplanation: 'Kovariančna matrika $\\boldsymbol{\\Sigma}$ deluje kot metrična matrika prostora: raztegne in zavrti koordinatni sistem tako, da so spremenljivke neodvisne.',
        practicalInsight: 'V farmacevtski kontroli kakovosti in bančnem nadzoru se Mahalanobisova razdalja uporablja za avtomatsko zaznavanje anomalij v realnem času.',
        mathematicalTheory: 'Spektralni razcep $\\boldsymbol{\\Sigma} = \\mathbf{V} \\boldsymbol{\\Lambda} \\mathbf{V}^T$ omogoča pretvorbo $\\mathbf{Y} = \\boldsymbol{\\Lambda}^{-1/2} \\mathbf{V}^T (\\mathbf{X} - \\boldsymbol{\\mu}) \\sim \\mathcal{N}_p(\\mathbf{0}, \\mathbf{I})$.'
      },
      textbookWisdom: {
        simpleQuote: 'Mahalanobisova razdalja meri oddaljenost točke od središča v enotah standardnega odklona vzdolž osi.',
        simpleExplanation: 'Upošteva korelacije med spremenljivkami za natančno določitev večrazsežnih osamelcev.',
        practicalInsight: 'Nepogrešljiva pri multivariatni analizi variance (MANOVA) in analizi glavnih komponent (PCA).',
        mathematicalTheory: 'D_M^2 = (x - μ)^T Σ^(-1) (x - μ) sledi χ^2 porazdelitvi s p prostostnimi stopnjami.'
      },
      cueBannerText: 'Raziščite vpliv korelacije na obliko elipsoida konstantne gostote.',
      hasSimulation: true,
      poeQuiz: {
        question: 'Če imamo 3-razsežno normalno porazdelitev (p = 3), kateri porazdelitvi sledi kvadrat Mahalanobisove razdalje D_M^2 posamezne opazovane točke od povprečja?',
        prompt: 'Upoštevajte lastnost D_M^2 ~ χ^2_p:',
        options: [
          {
            id: 'opt-1',
            text: 'χ² porazdelitvi s 3 prostostnimi stopnjami (χ²_3).',
            isCorrect: true,
            explanation: 'Pravilno! Kvadrat Mahalanobisove razdalje za p-razsežni normalni vektor natanko sledi hi-kvadrat porazdelitvi z df = p.'
          },
          {
            id: 'opt-2',
            text: 'Standardni normalni porazdelitvi N(0, 1).',
            isCorrect: false,
            explanation: 'Napačno. Gre za vsoto kvadratov p standardiziranih komponent, torej hi-kvadrat.'
          },
          {
            id: 'opt-3',
            text: 'Studentovi t-porazdelitvi z df = 2.',
            isCorrect: false,
            explanation: 'Napačno.'
          }
        ],
        insight: 'Zaradi te lastnosti lahko teoretični 95-% elipsoid zaupanja določimo z mejo χ²_{p, 0.95}!',
        followUpExperiment: 'V formulariju preverite vrednost χ² za p=2 in p=3 pri 95 % zaupanju.'
      },
      mathProof: {
        summaryLatex: 'f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2} |\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left( -\\frac{1}{2} D_M^2(\\mathbf{x}) \\right), \\quad D_M^2(\\mathbf{X}) \\sim \\chi^2_p',
        fullDerivationHtml: `
          <div class="space-y-3 font-mono text-xs">
            <p><strong>1. Mahalanobisova razdalja:</strong> $D_M^2 = (\\mathbf{x} - \\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})$.</p>
            <p><strong>2. Transformacija v standardno obliko:</strong> Naj bo $\\mathbf{Z} = \\boldsymbol{\\Sigma}^{-1/2}(\\mathbf{X} - \\boldsymbol{\\mu}) \\sim \\mathcal{N}_p(\\mathbf{0}, \\mathbf{I})$.</p>
            <p><strong>3. Kvadratna forma:</strong> $D_M^2 = \\mathbf{Z}^T \\mathbf{Z} = \\sum_{i=1}^p Z_i^2$.</p>
            <p>Ker so $Z_i \\stackrel{\\text{i.i.d.}}{\\sim} \\mathcal{N}(0, 1)$, vsota $p$ neodvisnih kvadratov sledi $\\chi^2_p$.</p>
          </div>
        `
      },
      pythonSnippet: `# Izračun Mahalanobisove razdalje v Pythonu
import numpy as np
from scipy.spatial.distance import mahalanobis

data = np.array([
    [175, 70],
    [180, 80],
    [165, 60],
    [190, 85],
    [195, 55]  # osamelec (zelo visok, zelo lahek)
])

mean = np.mean(data, axis=0)
cov = np.cov(data, rowvar=False)
inv_cov = np.linalg.inv(cov)

for i, pt in enumerate(data):
    d_m = mahalanobis(pt, mean, inv_cov)
    print(f"Oseba {i+1}: D_M = {d_m:.3f}, D_M^2 = {d_m**2:.3f}")
`,
      rSnippet: `# Mahalanobisova razdalja v R
data <- matrix(c(
  175, 70,
  180, 80,
  165, 60,
  190, 85,
  195, 55
), ncol=2, byrow=TRUE)

mu <- colMeans(data)
sigma <- cov(data)

d2 <- mahalanobis(data, center=mu, cov=sigma)
print(round(d2, 3))
`,
      learningObjectives: [
        'Zapisati gostoto večrazsežne normalne porazdelitve in razumeti vlogo kovariančne matrike.',
        'Izračunati Mahalanobisovo razdaljo in razumeti njeno geometrijsko interpretacijo.',
        'Uporabiti hi-kvadrat porazdelitev za odkrivanje večrazsežnih osamelcev in določanje elipsoidov zaupanja.'
      ]
    }
  ]
};
