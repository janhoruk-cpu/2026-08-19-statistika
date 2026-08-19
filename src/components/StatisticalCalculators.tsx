import React, { useState, useEffect, useRef } from 'react';
import { FormattedMathText } from './FormattedMathText';
import {
  Calculator,
  ArrowLeft,
  Activity,
  GitFork,
  Target,
  BookOpen,
  Info,
  CheckCircle2,
  RefreshCw,
  Layers,
  Table,
  TrendingUp,
  Split,
  GitCompare,
  FileSearch,
  AlertTriangle,
  Check,
  XCircle,
  BarChart3,
  Sliders,
  Sparkles,
  PieChart,
  Zap,
  Crosshair,
} from 'lucide-react';

interface StatisticalCalculatorsProps {
  onBack: () => void;
  onOpenGlossary?: (termId?: string) => void;
  onSelectUnit?: (unitId: string) => void;
}

type CalculatorTab =
  | 'normal'
  | 'ttest'
  | 'chisquare'
  | 'bayes'
  | 'sampleSize'
  | 'logistic'
  | 'lineDiag'
  | 'crossVal'
  | 'twoProps'
  | 'anova'
  | 'poisson'
  | 'transform'
  | 'regIntervals';

export const StatisticalCalculators: React.FC<StatisticalCalculatorsProps> = ({
  onBack,
  onOpenGlossary,
  onSelectUnit,
}) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('normal');

  // ----------------------------------------------------
  // 1. NORMAL DISTRIBUTION & Z-SCORE STATE
  // ----------------------------------------------------
  const [normMean, setNormMean] = useState<number>(0);
  const [normSd, setNormSd] = useState<number>(1);
  const [normX, setNormX] = useState<number>(1.96);
  const [normTail, setNormTail] = useState<'left' | 'right' | 'twoSided' | 'center'>('right');
  const normalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Standard Normal CDF approximation (Abramowitz & Stegun)
  const normCdf = (z: number) => {
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c2 = 0.39894228;

    if (z >= 0.0) {
      const t = 1.0 / (1.0 + p * z);
      return 1.0 - c2 * Math.exp((-z * z) / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
    } else {
      const t = 1.0 / (1.0 - p * z);
      return c2 * Math.exp((-z * z) / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
    }
  };

  const currentZ = normSd > 0 ? (normX - normMean) / normSd : 0;
  const pLeft = normCdf(currentZ);
  const pRight = 1 - pLeft;
  const pTwoSided = 2 * Math.min(pLeft, pRight);
  const pCenter = Math.max(0, 1 - 2 * (1 - normCdf(Math.abs(currentZ))));

  let displayProb = pRight;
  if (normTail === 'left') displayProb = pLeft;
  if (normTail === 'twoSided') displayProb = pTwoSided;
  if (normTail === 'center') displayProb = pCenter;

  // Draw Normal Curve Canvas
  useEffect(() => {
    const canvas = normalCanvasRef.current;
    if (!canvas || activeTab !== 'normal') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const minX = normMean - 4 * normSd;
    const maxX = normMean + 4 * normSd;
    const rangeX = maxX - minX;

    const mapX = (x: number) => ((x - minX) / rangeX) * (width - 60) + 30;
    const maxPdf = 1 / (normSd * Math.sqrt(2 * Math.PI));
    const mapY = (y: number) => height - 35 - (y / maxPdf) * (height - 70);

    const pdf = (x: number) => {
      const z = (x - normMean) / normSd;
      return (1 / (normSd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    };

    // Shading
    ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
    ctx.beginPath();
    ctx.moveTo(mapX(minX), height - 35);

    const steps = 200;
    let shadedAny = false;

    for (let i = 0; i <= steps; i++) {
      const xVal = minX + (i / steps) * rangeX;
      let shouldShade = false;

      if (normTail === 'left' && xVal <= normX) shouldShade = true;
      if (normTail === 'right' && xVal >= normX) shouldShade = true;
      if (normTail === 'twoSided' && Math.abs(xVal - normMean) >= Math.abs(normX - normMean)) shouldShade = true;
      if (normTail === 'center' && Math.abs(xVal - normMean) <= Math.abs(normX - normMean)) shouldShade = true;

      if (shouldShade) {
        if (!shadedAny) {
          ctx.moveTo(mapX(xVal), height - 35);
          shadedAny = true;
        }
        ctx.lineTo(mapX(xVal), mapY(pdf(xVal)));
      }
    }
    ctx.lineTo(mapX(normTail === 'left' ? normX : maxX), height - 35);
    ctx.closePath();
    ctx.fill();

    // Baseline axis
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, height - 35);
    ctx.lineTo(width - 20, height - 35);
    ctx.stroke();

    // Curve
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const xVal = minX + (i / steps) * rangeX;
      const px = mapX(xVal);
      const py = mapY(pdf(xVal));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Cutoff Marker Line
    const cutoffPx = mapX(normX);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cutoffPx, 20);
    ctx.lineTo(cutoffPx, height - 35);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cutoff Label
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`x = ${normX}`, cutoffPx, 15);

    // Mean Tick
    const meanPx = mapX(normMean);
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText(`μ = ${normMean}`, meanPx, height - 15);
  }, [normMean, normSd, normX, normTail, activeTab]);

  // ----------------------------------------------------
  // 2. TWO-SAMPLE T-TEST STATE & CALCULATIONS
  // ----------------------------------------------------
  const [tN1, setTN1] = useState<number>(30);
  const [tMean1, setTMean1] = useState<number>(75.4);
  const [tSd1, setTSd1] = useState<number>(8.5);

  const [tN2, setTN2] = useState<number>(30);
  const [tMean2, setTMean2] = useState<number>(70.8);
  const [tSd2, setTSd2] = useState<number>(9.2);

  const [tAlpha, setTAlpha] = useState<number>(0.05);

  const diffMean = tMean1 - tMean2;
  const se1 = (tSd1 * tSd1) / Math.max(1, tN1);
  const se2 = (tSd2 * tSd2) / Math.max(1, tN2);
  const seDiff = Math.sqrt(se1 + se2);
  const tStat = seDiff > 0 ? diffMean / seDiff : 0;

  // Welch-Satterthwaite degrees of freedom
  const welchDf =
    se1 + se2 > 0
      ? Math.pow(se1 + se2, 2) / (Math.pow(se1, 2) / (tN1 - 1) + Math.pow(se2, 2) / (tN2 - 1))
      : 1;

  // Approximate p-value for Student t
  const tPValueApprox = 2 * (1 - normCdf(Math.abs(tStat)));
  const tCritical = 1.96 + 2.38 / Math.max(1, welchDf); // quick approximation of t*
  const tCiMargin = tCritical * seDiff;
  const tCiLow = diffMean - tCiMargin;
  const tCiHigh = diffMean + tCiMargin;

  // ----------------------------------------------------
  // 3. CHI-SQUARE 2x2 / 3x2 CONTINGENCY TABLE STATE
  // ----------------------------------------------------
  const [o11, setO11] = useState<number>(45);
  const [o12, setO12] = useState<number>(15);
  const [o21, setO21] = useState<number>(25);
  const [o22, setO22] = useState<number>(35);

  const r1 = o11 + o12;
  const r2 = o21 + o22;
  const c1 = o11 + o21;
  const c2 = o12 + o22;
  const grandTotal = r1 + r2;

  const e11 = grandTotal > 0 ? (r1 * c1) / grandTotal : 0;
  const e12 = grandTotal > 0 ? (r1 * c2) / grandTotal : 0;
  const e21 = grandTotal > 0 ? (r2 * c1) / grandTotal : 0;
  const e22 = grandTotal > 0 ? (r2 * c2) / grandTotal : 0;

  const chi11 = e11 > 0 ? Math.pow(o11 - e11, 2) / e11 : 0;
  const chi12 = e12 > 0 ? Math.pow(o12 - e12, 2) / e12 : 0;
  const chi21 = e21 > 0 ? Math.pow(o21 - e21, 2) / e21 : 0;
  const chi22 = e22 > 0 ? Math.pow(o22 - e22, 2) / e22 : 0;

  const chiSquareStat = chi11 + chi12 + chi21 + chi22;
  // df = (2-1)*(2-1) = 1. p-value approx for df=1 using standard normal sqrt(chi^2)
  const chiPValue = 2 * (1 - normCdf(Math.sqrt(Math.max(0, chiSquareStat))));

  // ----------------------------------------------------
  // 4. BAYES' DIAGNOSTIC CALCULATOR STATE (3 METHODS)
  // ----------------------------------------------------
  type BayesMethod = 'table100k' | 'tree' | 'algebra';
  const [bayesMethod, setBayesMethod] = useState<BayesMethod>('table100k');
  const [prevalencePercent, setPrevalencePercent] = useState<number>(0.35); // Default: Harvard Mammography example (0.35%)
  const [sensitivityPercent, setSensitivityPercent] = useState<number>(89.0); // Sensitivity: 89%
  const [specificityPercent, setSpecificityPercent] = useState<number>(93.0); // Specificity: 93%
  const [bayesPopulation, setBayesPopulation] = useState<number>(100000);
  const bayesTreeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const prev = Math.max(0.0001, prevalencePercent / 100);
  const sens = Math.max(0.01, sensitivityPercent / 100);
  const spec = Math.max(0.01, specificityPercent / 100);

  // Natural frequencies on population N
  const diseaseCount = bayesPopulation * prev;
  const healthyCount = bayesPopulation * (1 - prev);
  const bayesTP = diseaseCount * sens; // True Positive
  const bayesFN = diseaseCount * (1 - sens); // False Negative
  const bayesFP = healthyCount * (1 - spec); // False Positive
  const bayesTN = healthyCount * spec; // True Negative

  const bayesTestPos = bayesTP + bayesFP;
  const bayesTestNeg = bayesFN + bayesTN;

  const bayesPPV = bayesTestPos > 0 ? (bayesTP / bayesTestPos) * 100 : 0;
  const bayesNPV = bayesTestNeg > 0 ? (bayesTN / bayesTestNeg) * 100 : 0;
  const bayesLRPlus = 1 - spec > 0 ? sens / (1 - spec) : 0;
  const bayesLRMinus = spec > 0 ? (1 - sens) / spec : 0;
  const bayesDOR = bayesLRMinus > 0 ? bayesLRPlus / bayesLRMinus : 0;

  // Preset setter for Bayes diagnostic scenarios
  const setBayesPreset = (preset: 'mammogram' | 'trisomy21' | 'lupus' | 'hiv' | 'drugtest') => {
    if (preset === 'mammogram') {
      setPrevalencePercent(0.35);
      setSensitivityPercent(89.0);
      setSpecificityPercent(93.0);
    } else if (preset === 'trisomy21') {
      setPrevalencePercent(0.125); // 1 in 800 births
      setSensitivityPercent(98.0);
      setSpecificityPercent(99.5);
    } else if (preset === 'lupus') {
      setPrevalencePercent(2.0);
      setSensitivityPercent(98.0);
      setSpecificityPercent(74.0);
    } else if (preset === 'hiv') {
      setPrevalencePercent(25.9); // Esvatini / high prevalence
      setSensitivityPercent(99.7);
      setSpecificityPercent(92.6);
    } else if (preset === 'drugtest') {
      setPrevalencePercent(5.0);
      setSensitivityPercent(99.0);
      setSpecificityPercent(98.8);
    }
  };

  // Render Bayes Probability Tree Canvas
  useEffect(() => {
    const canvas = bayesTreeCanvasRef.current;
    if (!canvas || activeTab !== 'bayes' || bayesMethod !== 'tree') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Root node
    const rootX = 50;
    const rootY = h / 2;

    // First layer: Disease vs No Disease
    const dX = 230;
    const dYesY = 70;
    const dNoY = h - 70;

    // Second layer: Test Results (+ / -)
    const tX = 460;
    const tpY = 35;
    const fnY = 105;
    const fpY = h - 105;
    const tnY = h - 35;

    // Helper to draw connecting line with text
    const drawBranch = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      label: string,
      probStr: string,
      color: string
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Branch label
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      ctx.fillStyle = color;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${label} (${probStr})`, midX, midY - 6);
    };

    // Helper to draw node box
    const drawNode = (x: number, y: number, text1: string, text2: string, bg: string, border: string) => {
      const boxW = 140;
      const boxH = 34;
      ctx.fillStyle = bg;
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x - boxW / 2, y - boxH / 2, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(text1, x, y - 2);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText(text2, x, y + 10);
    };

    // Draw branches
    drawBranch(rootX + 30, rootY, dX - 70, dYesY, 'Bolezen D', `${prevalencePercent}%`, '#f43f5e');
    drawBranch(rootX + 30, rootY, dX - 70, dNoY, 'Brez bolezni Dᶜ', `${(100 - prevalencePercent).toFixed(2)}%`, '#10b981');

    drawBranch(dX + 70, dYesY, tX - 70, tpY, 'Test Pozitiven (T⁺)', `${sensitivityPercent}%`, '#f59e0b');
    drawBranch(dX + 70, dYesY, tX - 70, fnY, 'Test Negativen (T⁻)', `${(100 - sensitivityPercent).toFixed(1)}%`, '#64748b');

    drawBranch(dX + 70, dNoY, tX - 70, fpY, 'Test Pozitiven (T⁺)', `${(100 - specificityPercent).toFixed(1)}%`, '#ef4444');
    drawBranch(dX + 70, dNoY, tX - 70, tnY, 'Test Negativen (T⁻)', `${specificityPercent}%`, '#10b981');

    // Draw Nodes
    drawNode(rootX, rootY, 'Populacija', `N = ${bayesPopulation.toLocaleString()}`, '#1e293b', '#475569');
    drawNode(dX, dYesY, 'Bolezen (D)', `${Math.round(diseaseCount).toLocaleString()} oseb`, '#881337', '#f43f5e');
    drawNode(dX, dNoY, 'Zdravi (Dᶜ)', `${Math.round(healthyCount).toLocaleString()} oseb`, '#064e3b', '#10b981');

    drawNode(tX, tpY, 'Pravilno poz. (TP)', `n = ${Math.round(bayesTP).toLocaleString()}`, '#78350f', '#f59e0b');
    drawNode(tX, fnY, 'Lažno neg. (FN)', `n = ${Math.round(bayesFN).toLocaleString()}`, '#1e293b', '#64748b');
    drawNode(tX, fpY, 'Lažno poz. (FP)', `n = ${Math.round(bayesFP).toLocaleString()}`, '#7f1d1d', '#ef4444');
    drawNode(tX, tnY, 'Pravilno neg. (TN)', `n = ${Math.round(bayesTN).toLocaleString()}`, '#064e3b', '#10b981');

    // Summary callout on right side
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`PPV = P(D | T⁺) = ${bayesPPV.toFixed(2)} %`, 540, h / 2 - 10);
    ctx.fillText(`NPV = P(Dᶜ | T⁻) = ${bayesNPV.toFixed(2)} %`, 540, h / 2 + 10);
  }, [prevalencePercent, sensitivityPercent, specificityPercent, bayesPopulation, bayesMethod, activeTab, bayesPPV, bayesNPV]);

  // ----------------------------------------------------
  // 5. SAMPLE SIZE & POWER CALCULATOR STATE (HARVARD 5.4 & 8.1.3)
  // ----------------------------------------------------
  type SampleSizeMode = 'means' | 'proportions';
  const [sampleSizeMode, setSampleSizeMode] = useState<SampleSizeMode>('means');

  // Means mode state
  const [powerEffectDelta, setPowerEffectDelta] = useState<number>(3.0); // e.g. blood pressure difference Δ = 3 mmHg
  const [powerSd1, setPowerSd1] = useState<number>(12.0); // SD group 1 (σ1 = 12)
  const [powerSd2, setPowerSd2] = useState<number>(12.0); // SD group 2 (σ2 = 12)
  const [powerAlpha, setPowerAlpha] = useState<number>(0.05); // Significance level
  const [powerTarget, setPowerTarget] = useState<number>(80); // Target power 80% / 90% / 95%
  const [powerIsTwoSided, setPowerIsTwoSided] = useState<boolean>(true);
  const powerCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Proportions mode state
  const [propMarginError, setPropMarginError] = useState<number>(3.0); // Margin of error m (e.g. 3%)
  const [propConfidence, setPropConfidence] = useState<number>(95); // 90%, 95%, 99%
  const [propBaselineP, setPropBaselineP] = useState<number>(50.0); // Expected p (50% for conservative)

  // Calculations for Means Sample Size & Power
  const zAlpha = powerIsTwoSided
    ? powerAlpha === 0.01
      ? 2.576
      : powerAlpha === 0.1
      ? 1.645
      : 1.96
    : powerAlpha === 0.01
    ? 2.326
    : powerAlpha === 0.1
    ? 1.282
    : 1.645;
  const zBeta = powerTarget === 95 ? 1.645 : powerTarget === 90 ? 1.282 : 0.842;

  const requiredNPerGroupMeans = Math.ceil(
    ((powerSd1 * powerSd1 + powerSd2 * powerSd2) * Math.pow(zAlpha + zBeta, 2)) /
      Math.max(0.0001, powerEffectDelta * powerEffectDelta)
  );

  const seGroupMeans = Math.sqrt(
    (powerSd1 * powerSd1) / Math.max(1, requiredNPerGroupMeans) +
      (powerSd2 * powerSd2) / Math.max(1, requiredNPerGroupMeans)
  );
  const achievedPowerZ = seGroupMeans > 0 ? -zAlpha + Math.abs(powerEffectDelta) / seGroupMeans : 0;
  const achievedPowerPercent = Math.min(99.9, Math.max(0.1, normCdf(achievedPowerZ) * 100));

  // Calculations for Proportions Sample Size
  const zPropCrit = propConfidence === 99 ? 2.576 : propConfidence === 90 ? 1.645 : 1.96;
  const pPropVal = Math.max(0.01, Math.min(0.99, propBaselineP / 100));
  const mPropVal = Math.max(0.001, propMarginError / 100);
  const requiredSampleSizeProp = Math.ceil((zPropCrit * zPropCrit * pPropVal * (1 - pPropVal)) / (mPropVal * mPropVal));
  const conservativeSampleSizeProp = Math.ceil((zPropCrit * zPropCrit * 0.25) / (mPropVal * mPropVal));

  // Preset setter for Power & Sample Size scenarios
  const setPowerPreset = (preset: 'bloodPressure' | 'cornYield' | 'stemCells' | 'lungTransplant' | 'congress') => {
    if (preset === 'bloodPressure') {
      setSampleSizeMode('means');
      setPowerEffectDelta(3.0);
      setPowerSd1(12.0);
      setPowerSd2(12.0);
      setPowerAlpha(0.05);
      setPowerTarget(80);
      setPowerIsTwoSided(true);
    } else if (preset === 'cornYield') {
      setSampleSizeMode('means');
      setPowerEffectDelta(40.0);
      setPowerSd1(94.0);
      setPowerSd2(94.0);
      setPowerAlpha(0.05);
      setPowerTarget(90);
      setPowerIsTwoSided(true);
    } else if (preset === 'stemCells') {
      setSampleSizeMode('means');
      setPowerEffectDelta(7.83);
      setPowerSd1(5.17);
      setPowerSd2(2.76);
      setPowerAlpha(0.05);
      setPowerTarget(80);
      setPowerIsTwoSided(true);
    } else if (preset === 'lungTransplant') {
      setSampleSizeMode('proportions');
      setPropMarginError(10.0);
      setPropConfidence(95);
      setPropBaselineP(50.0);
    } else if (preset === 'congress') {
      setSampleSizeMode('proportions');
      setPropMarginError(4.0);
      setPropConfidence(95);
      setPropBaselineP(19.0);
    }
  };

  // Render Overlapping Power Curves (Null H0 and Alternative HA)
  useEffect(() => {
    const canvas = powerCanvasRef.current;
    if (!canvas || activeTab !== 'sampleSize' || sampleSizeMode !== 'means') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padX = 50;
    const padY = 35;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const delta = powerEffectDelta;
    const se = seGroupMeans || 1.7;
    const minX = -3.5 * se;
    const maxX = delta + 3.5 * se;
    const rangeX = maxX - minX || 1;

    const mapX = (x: number) => padX + ((x - minX) / rangeX) * plotW;
    const maxPdf = 1 / (se * Math.sqrt(2 * Math.PI));
    const mapY = (dens: number) => h - padY - (dens / maxPdf) * (plotH * 0.9);

    const pdfH0 = (x: number) => (1 / (se * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow(x / se, 2));
    const pdfHA = (x: number) => (1 / (se * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - delta) / se, 2));

    const critCutoff = zAlpha * se;

    // 1. Shade Power (1 - beta) under HA (Green)
    ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.beginPath();
    ctx.moveTo(mapX(critCutoff), h - padY);
    for (let x = critCutoff; x <= maxX; x += rangeX / 100) {
      ctx.lineTo(mapX(x), mapY(pdfHA(x)));
    }
    ctx.lineTo(mapX(maxX), h - padY);
    ctx.closePath();
    ctx.fill();

    // 2. Shade Beta (Type II error) under HA (Orange/Rose)
    ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
    ctx.beginPath();
    ctx.moveTo(mapX(minX), h - padY);
    for (let x = minX; x <= critCutoff; x += rangeX / 100) {
      ctx.lineTo(mapX(x), mapY(pdfHA(x)));
    }
    ctx.lineTo(mapX(critCutoff), h - padY);
    ctx.closePath();
    ctx.fill();

    // 3. Shade Alpha (Type I error) under H0 (Amber/Red)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.beginPath();
    ctx.moveTo(mapX(critCutoff), h - padY);
    for (let x = critCutoff; x <= maxX; x += rangeX / 100) {
      ctx.lineTo(mapX(x), mapY(pdfH0(x)));
    }
    ctx.lineTo(mapX(maxX), h - padY);
    ctx.closePath();
    ctx.fill();

    // Draw H0 Bell Curve (Blue)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = minX + (i / 100) * rangeX;
      if (i === 0) ctx.moveTo(mapX(x), mapY(pdfH0(x)));
      else ctx.lineTo(mapX(x), mapY(pdfH0(x)));
    }
    ctx.stroke();

    // Draw HA Bell Curve (Purple)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = minX + (i / 100) * rangeX;
      if (i === 0) ctx.moveTo(mapX(x), mapY(pdfHA(x)));
      else ctx.lineTo(mapX(x), mapY(pdfHA(x)));
    }
    ctx.stroke();

    // Draw Critical Cutoff Line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(mapX(critCutoff), padY);
    ctx.lineTo(mapX(critCutoff), h - padY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Text labels
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('H₀: μ = 0', mapX(0), mapY(pdfH0(0)) - 10);

    ctx.fillStyle = '#a855f7';
    ctx.fillText(`Hₐ: μ = ${delta}`, mapX(delta), mapY(pdfHA(delta)) - 10);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`Kritična meja = ${critCutoff.toFixed(2)}`, mapX(critCutoff), padY - 8);

    // Baseline axis
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();
  }, [powerEffectDelta, powerSd1, powerSd2, powerAlpha, powerTarget, powerIsTwoSided, requiredNPerGroupMeans, seGroupMeans, sampleSizeMode, activeTab]);

  // ----------------------------------------------------
  // 6. LOGISTIC REGRESSION & SIGMOID STATE
  // ----------------------------------------------------
  const [logitBeta0, setLogitBeta0] = useState<number>(-2.0);
  const [logitBeta1, setLogitBeta1] = useState<number>(0.8);
  const [logitX, setLogitX] = useState<number>(3.0);
  const [logitThreshold, setLogitThreshold] = useState<number>(0.5);
  const logisticCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const logitZ = logitBeta0 + logitBeta1 * logitX;
  const logitP = 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, logitZ))));
  const logitOdds = Math.exp(Math.max(-50, Math.min(50, logitZ)));
  const logitOddsRatio = Math.exp(Math.max(-50, Math.min(50, logitBeta1)));

  // Preset scenarios
  const setLogitPreset = (preset: 'challenger' | 'credit' | 'spam') => {
    if (preset === 'challenger') {
      setLogitBeta0(11.663);
      setLogitBeta1(-0.2162);
      setLogitX(31); // 31°F launch temperature
      setLogitThreshold(0.5);
    } else if (preset === 'credit') {
      setLogitBeta0(-4.0);
      setLogitBeta1(0.08);
      setLogitX(60); // DTI %
      setLogitThreshold(0.3);
    } else if (preset === 'spam') {
      setLogitBeta0(-2.5);
      setLogitBeta1(1.2);
      setLogitX(3); // klicaji
      setLogitThreshold(0.5);
    }
  };

  // Draw Sigmoid Canvas
  useEffect(() => {
    const canvas = logisticCanvasRef.current;
    if (!canvas || activeTab !== 'logistic') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Calculate domain for X
    const inflectionX = logitBeta1 !== 0 ? -logitBeta0 / logitBeta1 : 0;
    const spread = Math.abs(logitBeta1) > 0.001 ? 6 / Math.abs(logitBeta1) : 10;
    const minX = Math.min(inflectionX - spread, logitX - spread * 0.5);
    const maxX = Math.max(inflectionX + spread, logitX + spread * 0.5);
    const rangeX = maxX - minX || 1;

    const mapX = (x: number) => ((x - minX) / rangeX) * (width - 70) + 40;
    const mapY = (p: number) => height - 35 - p * (height - 65);

    // Gridlines & 0, 0.5, 1.0 probability lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    [0, 0.25, 0.5, 0.75, 1.0].forEach(pLevel => {
      ctx.beginPath();
      ctx.moveTo(40, mapY(pLevel));
      ctx.lineTo(width - 30, mapY(pLevel));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(pLevel.toFixed(2), 35, mapY(pLevel) + 3);
    });

    // Threshold Line
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    ctx.moveTo(40, mapY(logitThreshold));
    ctx.lineTo(width - 30, mapY(logitThreshold));
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Prag odločitve (${(logitThreshold * 100).toFixed(0)} %)`, 45, mapY(logitThreshold) - 5);

    ctx.setLineDash([]);

    // Draw Sigmoid Curve
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const steps = 150;
    for (let i = 0; i <= steps; i++) {
      const xVal = minX + (i / steps) * rangeX;
      const zVal = logitBeta0 + logitBeta1 * xVal;
      const pVal = 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, zVal))));
      if (i === 0) ctx.moveTo(mapX(xVal), mapY(pVal));
      else ctx.lineTo(mapX(xVal), mapY(pVal));
    }
    ctx.stroke();

    // Draw Active Point (logitX, logitP)
    const currentPtX = mapX(logitX);
    const currentPtY = mapY(logitP);

    // Vertical projection
    ctx.strokeStyle = logitP >= logitThreshold ? '#10b981' : '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(currentPtX, height - 35);
    ctx.lineTo(currentPtX, currentPtY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Point dot
    ctx.fillStyle = logitP >= logitThreshold ? '#10b981' : '#ef4444';
    ctx.beginPath();
    ctx.arc(currentPtX, currentPtY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`x = ${logitX.toFixed(1)}`, currentPtX, height - 15);
    ctx.fillText(`p(x) = ${(logitP * 100).toFixed(1)} %`, currentPtX, currentPtY - 12);
  }, [logitBeta0, logitBeta1, logitX, logitThreshold, activeTab]);

  // ----------------------------------------------------
  // 7. LINE REGRESSION DIAGNOSTICS STATE
  // ----------------------------------------------------
  type LineScenario = 'ideal' | 'nonlinear' | 'heteroscedastic' | 'outliers' | 'autocorrelation';
  const [lineScenario, setLineScenario] = useState<LineScenario>('ideal');
  const lineFitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lineResCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate synthetic points based on LINE scenario
  const getLineData = (scenario: LineScenario) => {
    const points: { x: number; y: number; isOutlier?: boolean }[] = [];
    const n = 45;
    for (let i = 0; i < n; i++) {
      const x = 5 + (i / n) * 40;
      let noise = (Math.sin(i * 12.3) + Math.cos(i * 7.7)) * 2.5;

      if (scenario === 'ideal') {
        const y = 10 + 1.2 * x + noise;
        points.push({ x, y });
      } else if (scenario === 'nonlinear') {
        const y = 40 - 0.08 * Math.pow(x - 25, 2) + noise * 0.8;
        points.push({ x, y });
      } else if (scenario === 'heteroscedastic') {
        const fanNoise = noise * (0.2 + (x / 45) * 2.2);
        const y = 8 + 1.1 * x + fanNoise;
        points.push({ x, y });
      } else if (scenario === 'outliers') {
        if (i === 42) {
          points.push({ x: 44, y: 15, isOutlier: true }); // High leverage, highly influential
        } else if (i === 43) {
          points.push({ x: 43, y: 18, isOutlier: true });
        } else {
          const y = 10 + 1.3 * x + noise * 0.7;
          points.push({ x, y });
        }
      } else if (scenario === 'autocorrelation') {
        const cyclical = Math.sin((i / n) * Math.PI * 4) * 6;
        const y = 12 + 1.0 * x + cyclical + noise * 0.3;
        points.push({ x, y });
      }
    }
    return points;
  };

  const linePoints = getLineData(lineScenario);

  // Compute OLS on linePoints
  const lineStats = (() => {
    const n = linePoints.length;
    const meanX = linePoints.reduce((acc, p) => acc + p.x, 0) / n;
    const meanY = linePoints.reduce((acc, p) => acc + p.y, 0) / n;
    let ssxx = 0;
    let ssxy = 0;
    let ssyy = 0;

    linePoints.forEach(p => {
      ssxx += Math.pow(p.x - meanX, 2);
      ssxy += (p.x - meanX) * (p.y - meanY);
      ssyy += Math.pow(p.y - meanY, 2);
    });

    const b1 = ssxx !== 0 ? ssxy / ssxx : 0;
    const b0 = meanY - b1 * meanX;
    const r = ssxx > 0 && ssyy > 0 ? ssxy / Math.sqrt(ssxx * ssyy) : 0;
    const r2 = Math.pow(r, 2);

    const residuals = linePoints.map(p => {
      const yHat = b0 + b1 * p.x;
      const e = p.y - yHat;
      return { x: p.x, y: p.y, yHat, e, isOutlier: p.isOutlier };
    });

    const sse = residuals.reduce((acc, r) => acc + Math.pow(r.e, 2), 0);
    const se = Math.sqrt(sse / (n - 2));

    return { b0, b1, r, r2, sse, se, residuals, meanX, meanY };
  })();

  // Render LINE canvases (Fit plot & Residuals plot)
  useEffect(() => {
    if (activeTab !== 'lineDiag') return;

    // 1. Fit Canvas
    const fitCanvas = lineFitCanvasRef.current;
    if (fitCanvas) {
      const ctx = fitCanvas.getContext('2d');
      if (ctx) {
        const w = fitCanvas.width;
        const h = fitCanvas.height;
        ctx.clearRect(0, 0, w, h);

        const padX = 40;
        const padY = 30;
        const minX = 0;
        const maxX = 50;
        const minY = 0;
        const maxY = 70;

        const mapX = (x: number) => padX + (x / maxX) * (w - padX * 2);
        const mapY = (y: number) => h - padY - (y / maxY) * (h - padY * 2);

        // Grid
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        for (let x = 10; x <= 40; x += 10) {
          ctx.beginPath();
          ctx.moveTo(mapX(x), padY);
          ctx.lineTo(mapX(x), h - padY);
          ctx.stroke();
        }
        for (let y = 10; y <= 60; y += 15) {
          ctx.beginPath();
          ctx.moveTo(padX, mapY(y));
          ctx.lineTo(w - padX, mapY(y));
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Points
        lineStats.residuals.forEach(p => {
          ctx.fillStyle = p.isOutlier ? '#ef4444' : '#6366f1';
          ctx.beginPath();
          ctx.arc(mapX(p.x), mapY(p.y), p.isOutlier ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Fitted Line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(lineStats.b0));
        ctx.lineTo(mapX(50), mapY(lineStats.b0 + lineStats.b1 * 50));
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText('Napovednik (x)', w / 2 - 25, h - 8);
        ctx.fillText('Odziv (y)', 8, 20);
      }
    }

    // 2. Residuals Canvas
    const resCanvas = lineResCanvasRef.current;
    if (resCanvas) {
      const ctx = resCanvas.getContext('2d');
      if (ctx) {
        const w = resCanvas.width;
        const h = resCanvas.height;
        ctx.clearRect(0, 0, w, h);

        const padX = 40;
        const padY = 30;
        const minFit = 0;
        const maxFit = 70;
        const maxE = 20;

        const mapX = (yHat: number) => padX + (yHat / maxFit) * (w - padX * 2);
        const mapY = (e: number) => h / 2 - (e / maxE) * (h / 2 - padY);

        // Zero line
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(padX, h / 2);
        ctx.lineTo(w - padX, h / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Residual points
        lineStats.residuals.forEach(p => {
          ctx.fillStyle = p.isOutlier ? '#ef4444' : '#10b981';
          ctx.beginPath();
          ctx.arc(mapX(p.yHat), mapY(p.e), p.isOutlier ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Connect residual stick to 0
          ctx.strokeStyle = p.isOutlier ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.25)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mapX(p.yHat), h / 2);
          ctx.lineTo(mapX(p.yHat), mapY(p.e));
          ctx.stroke();
        });

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText('Prilegane vrednosti (ŷ)', w / 2 - 40, h - 8);
        ctx.fillText('Ostanek (e = y - ŷ)', 8, 20);
      }
    }
  }, [lineScenario, activeTab]);

  // ----------------------------------------------------
  // 8. CROSS-VALIDATION (K-FOLD) SIMULATION STATE
  // ----------------------------------------------------
  type CvModelType = 'simple' | 'multivariate' | 'overfit';
  const [cvModelType, setCvModelType] = useState<CvModelType>('multivariate');
  const [cvSelectedFold, setCvSelectedFold] = useState<number>(1);
  const cvCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synthetic 4-fold data representing Palmer Penguins or Mario Kart
  const cvFoldsData = [
    { fold: 1, trainN: 75, testN: 25, trainSse: { simple: 2840, multivariate: 1420, overfit: 410 }, testSse: { simple: 1050, multivariate: 490, overfit: 2190 } },
    { fold: 2, trainN: 75, testN: 25, trainSse: { simple: 2910, multivariate: 1390, overfit: 390 }, testSse: { simple: 990, multivariate: 510, overfit: 2450 } },
    { fold: 3, trainN: 75, testN: 25, trainSse: { simple: 2790, multivariate: 1460, overfit: 420 }, testSse: { simple: 1120, multivariate: 480, overfit: 2310 } },
    { fold: 4, trainN: 75, testN: 25, trainSse: { simple: 2880, multivariate: 1410, overfit: 380 }, testSse: { simple: 1020, multivariate: 530, overfit: 2600 } },
  ];

  const totalCvSse = cvFoldsData.reduce((acc, f) => acc + f.testSse[cvModelType], 0);
  const avgTestR2 = cvModelType === 'simple' ? 0.42 : cvModelType === 'multivariate' ? 0.74 : 0.28;
  const trainR2 = cvModelType === 'simple' ? 0.45 : cvModelType === 'multivariate' ? 0.76 : 0.94;

  // Draw Cross-Validation Architecture Canvas
  useEffect(() => {
    const canvas = cvCanvasRef.current;
    if (!canvas || activeTab !== 'crossVal') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padLeft = 40;
    const padTop = 30;
    const foldHeight = 34;
    const gap = 16;
    const totalW = w - 80;
    const blockW = totalW / 4;

    for (let f = 1; f <= 4; f++) {
      const y = padTop + (f - 1) * (foldHeight + gap);
      const isCurrent = cvSelectedFold === f;

      // Label for Iteration
      ctx.fillStyle = isCurrent ? '#818cf8' : '#94a3b8';
      ctx.font = isCurrent ? 'bold 11px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Iteracija ${f}:`, 8, y + 21);

      for (let b = 1; b <= 4; b++) {
        const x = padLeft + (b - 1) * blockW;
        const isTestFold = b === f;

        ctx.fillStyle = isTestFold
          ? isCurrent
            ? '#f43f5e'
            : '#e11d48'
          : isCurrent
          ? '#4f46e5'
          : '#334155';

        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(x + 3, y, blockW - 6, foldHeight, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          isTestFold ? `TEST (Zadržan ${b})` : `UČENJE (Del ${b})`,
          x + blockW / 2,
          y + 21
        );
      }
    }
  }, [cvSelectedFold, cvModelType, activeTab]);

  // ----------------------------------------------------
  // 9. TWO-PROPORTIONS Z-TEST WITH POOLED PROPORTION STATE
  // ----------------------------------------------------
  const [p1Count, setP1Count] = useState<number>(14); // successes in group 1
  const [p1Total, setP1Total] = useState<number>(40); // n1
  const [p2Count, setP2Count] = useState<number>(11); // successes in group 2
  const [p2Total, setP2Total] = useState<number>(50); // n2
  const [twoPropTail, setTwoPropTail] = useState<'twoSided' | 'greater' | 'less'>('twoSided');
  const twoPropCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Presets from IMS2
  const setTwoPropPreset = (preset: 'cpr' | 'fishoil' | 'mammogram' | 'oppcost') => {
    if (preset === 'cpr') {
      setP1Count(14);
      setP1Total(40); // Treatment: 35%
      setP2Count(11);
      setP2Total(50); // Control: 22%
      setTwoPropTail('twoSided');
    } else if (preset === 'fishoil') {
      setP1Count(145);
      setP1Total(12933);
      setP2Count(200);
      setP2Total(12938);
      setTwoPropTail('twoSided');
    } else if (preset === 'mammogram') {
      setP1Count(500);
      setP1Total(44925);
      setP2Count(505);
      setP2Total(44910);
      setTwoPropTail('twoSided');
    } else if (preset === 'oppcost') {
      setP1Count(34);
      setP1Total(75); // 45.3%
      setP2Count(19);
      setP2Total(75); // 25.3%
      setTwoPropTail('twoSided');
    }
  };

  // Two proportions calculations
  const twoPropStats = (() => {
    const phat1 = p1Total > 0 ? p1Count / p1Total : 0;
    const phat2 = p2Total > 0 ? p2Count / p2Total : 0;
    const diff = phat1 - phat2;

    const totalSuccess = p1Count + p2Count;
    const totalN = p1Total + p2Total;
    const phatPool = totalN > 0 ? totalSuccess / totalN : 0;

    // Conditions check: n1*p_pool, n1*(1-p_pool), n2*p_pool, n2*(1-p_pool) >= 10
    const cond1 = p1Total * phatPool >= 10 && p1Total * (1 - phatPool) >= 10;
    const cond2 = p2Total * phatPool >= 10 && p2Total * (1 - phatPool) >= 10;
    const conditionsMet = cond1 && cond2;

    // Standard error for Hypothesis Test (Pooled)
    const sePool =
      phatPool > 0 && phatPool < 1 && p1Total > 0 && p2Total > 0
        ? Math.sqrt(phatPool * (1 - phatPool) * (1 / p1Total + 1 / p2Total))
        : 0.0001;

    // Standard error for Confidence Interval (Unpooled)
    const seCi =
      p1Total > 0 && p2Total > 0
        ? Math.sqrt((phat1 * (1 - phat1)) / p1Total + (phat2 * (1 - phat2)) / p2Total)
        : 0.0001;

    const zScore = sePool > 0 ? diff / sePool : 0;

    // Compute p-value
    let pValue = 0;
    const zAbs = Math.abs(zScore);
    const oneTailP = 1 - normCdf(zAbs);

    if (twoPropTail === 'twoSided') {
      pValue = 2 * oneTailP;
    } else if (twoPropTail === 'greater') {
      pValue = 1 - normCdf(zScore);
    } else {
      pValue = normCdf(zScore);
    }
    pValue = Math.min(1.0, Math.max(0.0, pValue));

    // 95% Confidence Interval for difference
    const zCrit = 1.96;
    const ciLower = diff - zCrit * seCi;
    const ciUpper = diff + zCrit * seCi;

    return {
      phat1,
      phat2,
      diff,
      phatPool,
      conditionsMet,
      sePool,
      seCi,
      zScore,
      pValue,
      ciLower,
      ciUpper,
    };
  })();

  // Render Two Proportions Z-curve
  useEffect(() => {
    const canvas = twoPropCanvasRef.current;
    if (!canvas || activeTab !== 'twoProps') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padX = 40;
    const padY = 30;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const minZ = -4.0;
    const maxZ = 4.0;
    const rangeZ = maxZ - minZ;

    const mapX = (z: number) => padX + ((z - minZ) / rangeZ) * plotW;
    const mapY = (dens: number) => h - padY - (dens / 0.42) * plotH;

    const normPdf = (z: number) => Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);

    // Shading P-value tails
    ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
    const zVal = twoPropStats.zScore;

    if (twoPropTail === 'twoSided') {
      const absZ = Math.abs(zVal);
      // Left tail (-4 to -absZ)
      ctx.beginPath();
      ctx.moveTo(mapX(-4), mapY(0));
      for (let z = -4; z <= -absZ; z += 0.05) {
        ctx.lineTo(mapX(z), mapY(normPdf(z)));
      }
      ctx.lineTo(mapX(-absZ), mapY(0));
      ctx.closePath();
      ctx.fill();

      // Right tail (absZ to 4)
      ctx.beginPath();
      ctx.moveTo(mapX(absZ), mapY(0));
      for (let z = absZ; z <= 4; z += 0.05) {
        ctx.lineTo(mapX(z), mapY(normPdf(z)));
      }
      ctx.lineTo(mapX(4), mapY(0));
      ctx.closePath();
      ctx.fill();
    } else if (twoPropTail === 'greater') {
      ctx.beginPath();
      ctx.moveTo(mapX(Math.max(-4, zVal)), mapY(0));
      for (let z = Math.max(-4, zVal); z <= 4; z += 0.05) {
        ctx.lineTo(mapX(z), mapY(normPdf(z)));
      }
      ctx.lineTo(mapX(4), mapY(0));
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(mapX(-4), mapY(0));
      for (let z = -4; z <= Math.min(4, zVal); z += 0.05) {
        ctx.lineTo(mapX(z), mapY(normPdf(z)));
      }
      ctx.lineTo(mapX(Math.min(4, zVal)), mapY(0));
      ctx.closePath();
      ctx.fill();
    }

    // Draw standard normal curve
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const z = minZ + (i / 120) * rangeZ;
      if (i === 0) ctx.moveTo(mapX(z), mapY(normPdf(z)));
      else ctx.lineTo(mapX(z), mapY(normPdf(z)));
    }
    ctx.stroke();

    // Draw Z test statistic line
    if (Math.abs(zVal) <= 4.0) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(mapX(zVal), padY);
      ctx.lineTo(mapX(zVal), h - padY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Z = ${zVal.toFixed(2)}`, mapX(zVal), padY + 12);
    }
  }, [p1Count, p1Total, p2Count, p2Total, twoPropTail, activeTab]);

  // ----------------------------------------------------
  // 10. ANOVA & POST-HOC (TUKEY HSD & BONFERRONI) STATE
  // ----------------------------------------------------
  interface AnovaGroupItem {
    id: string;
    name: string;
    n: number;
    mean: number;
    sd: number;
  }

  const [anovaGroups, setAnovaGroups] = useState<AnovaGroupItem[]>([
    { id: '1', name: 'Lovilec (Catcher)', n: 30, mean: 0.248, sd: 0.025 },
    { id: '2', name: 'Notranje polje (Infielder)', n: 35, mean: 0.262, sd: 0.024 },
    { id: '3', name: 'Zunanje polje (Outfielder)', n: 32, mean: 0.271, sd: 0.028 },
    { id: '4', name: 'Določeni odbijalec (DH)', n: 28, mean: 0.278, sd: 0.030 },
  ]);
  const anovaCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const setAnovaPreset = (preset: 'baseball' | 'teaching' | 'dosage') => {
    if (preset === 'baseball') {
      setAnovaGroups([
        { id: '1', name: 'Lovilec (Catcher)', n: 30, mean: 0.248, sd: 0.025 },
        { id: '2', name: 'Notranje polje (Infielder)', n: 35, mean: 0.262, sd: 0.024 },
        { id: '3', name: 'Zunanje polje (Outfielder)', n: 32, mean: 0.271, sd: 0.028 },
        { id: '4', name: 'Določeni odbijalec (DH)', n: 28, mean: 0.278, sd: 0.030 },
      ]);
    } else if (preset === 'teaching') {
      setAnovaGroups([
        { id: '1', name: 'Klasično predavanje', n: 40, mean: 68.4, sd: 9.2 },
        { id: '2', name: 'Hibridno učenje', n: 42, mean: 74.8, sd: 8.8 },
        { id: '3', name: 'Interaktivni simulatorji', n: 38, mean: 81.5, sd: 7.9 },
      ]);
    } else if (preset === 'dosage') {
      setAnovaGroups([
        { id: '1', name: 'Placebo kontrola', n: 25, mean: 12.1, sd: 3.4 },
        { id: '2', name: 'Nizek odmerek (10mg)', n: 25, mean: 14.8, sd: 3.6 },
        { id: '3', name: 'Visok odmerek (50mg)', n: 25, mean: 19.6, sd: 4.1 },
      ]);
    }
  };

  // F distribution p-value approximation
  const calcFpValue = (f: number, df1: number, df2: number): number => {
    if (f <= 0) return 1.0;
    // Wilson-Hilferty transformation approximation for F to Z
    const a = 2 / (9 * df1);
    const b = 2 / (9 * df2);
    const y = Math.abs((1 - b) * Math.pow(f, 1 / 3) - (1 - a));
    const denom = Math.sqrt(b * Math.pow(f, 2 / 3) + a);
    const z = y / denom;
    return 1 - normCdf(z);
  };

  const anovaStats = (() => {
    const k = anovaGroups.length;
    const totalN = anovaGroups.reduce((acc, g) => acc + g.n, 0);
    const grandMean = anovaGroups.reduce((acc, g) => acc + g.n * g.mean, 0) / (totalN || 1);

    const ssg = anovaGroups.reduce((acc, g) => acc + g.n * Math.pow(g.mean - grandMean, 2), 0);
    const dfG = Math.max(1, k - 1);
    const msg = ssg / dfG;

    const sse = anovaGroups.reduce((acc, g) => acc + Math.max(0, g.n - 1) * Math.pow(g.sd, 2), 0);
    const dfE = Math.max(1, totalN - k);
    const mse = sse / dfE;

    const sst = ssg + sse;
    const dfT = Math.max(1, totalN - 1);
    const fStat = mse > 0 ? msg / mse : 0;
    const pValue = calcFpValue(fStat, dfG, dfE);

    // Pairwise comparisons
    const numPairs = (k * (k - 1)) / 2;
    const bonferroniAlpha = 0.05 / (numPairs || 1);

    const pairs: {
      g1: string;
      g2: string;
      diff: number;
      se: number;
      tVal: number;
      significantBonf: boolean;
      ciLower: number;
      ciUpper: number;
    }[] = [];

    for (let i = 0; i < k; i++) {
      for (let j = i + 1; j < k; j++) {
        const g1 = anovaGroups[i];
        const g2 = anovaGroups[j];
        const diff = g1.mean - g2.mean;
        const se = Math.sqrt(mse * (1 / g1.n + 1 / g2.n));
        const tVal = se > 0 ? Math.abs(diff) / se : 0;
        // Critical t approximation for dfE
        const critT = 2.0 + 3.0 / dfE;
        // Critical t with Bonferroni correction approx
        const critTBonf = critT + Math.log(numPairs) * 0.4;
        const significantBonf = tVal > critTBonf;
        const me = critT * se;

        pairs.push({
          g1: g1.name,
          g2: g2.name,
          diff,
          se,
          tVal,
          significantBonf,
          ciLower: diff - me,
          ciUpper: diff + me,
        });
      }
    }

    return {
      k,
      totalN,
      grandMean,
      ssg,
      dfG,
      msg,
      sse,
      dfE,
      mse,
      sst,
      dfT,
      fStat,
      pValue,
      pairs,
      numPairs,
      bonferroniAlpha,
    };
  })();

  // ANOVA Canvas Draw Hook
  useEffect(() => {
    const canvas = anovaCanvasRef.current;
    if (!canvas || activeTab !== 'anova') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const df1 = anovaStats.dfG;
    const df2 = anovaStats.dfE;
    const fObs = anovaStats.fStat;

    const maxF = Math.max(7, fObs * 1.3);
    const padX = 40;
    const padY = 25;

    const mapX = (f: number) => padX + (f / maxF) * (w - padX * 2);

    // Simple F density function representation
    const fPdf = (f: number) => {
      if (f <= 0) return 0;
      const num = Math.pow(df1 * f, df1) * Math.pow(df2, df2);
      const den = Math.pow(df1 * f + df2, df1 + df2);
      return Math.sqrt(num / den) / f;
    };

    // Find peak
    let peakY = 0.001;
    for (let f = 0.1; f <= maxF; f += 0.05) {
      peakY = Math.max(peakY, fPdf(f));
    }

    const mapY = (val: number) => h - padY - (val / peakY) * (h - padY * 2 - 10);

    // Background Grid & Baseline
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();

    // Rejection / P-value Shading (f > fObs)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.beginPath();
    ctx.moveTo(mapX(Math.min(maxF, fObs)), h - padY);
    for (let f = Math.min(maxF, fObs); f <= maxF; f += 0.05) {
      ctx.lineTo(mapX(f), mapY(fPdf(f)));
    }
    ctx.lineTo(mapX(maxF), h - padY);
    ctx.closePath();
    ctx.fill();

    // Draw F curve
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let f = 0.05; f <= maxF; f += 0.05) {
      const xPos = mapX(f);
      const yPos = mapY(fPdf(f));
      if (!started) {
        ctx.moveTo(xPos, yPos);
        started = true;
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.stroke();

    // Draw observed F line
    if (fObs <= maxF) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(mapX(fObs), padY);
      ctx.lineTo(mapX(fObs), h - padY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`F = ${fObs.toFixed(2)}`, mapX(fObs), padY + 12);
    }

    // Critical F marker (approx alpha = 0.05)
    const critF = 1 + 2.5 / Math.sqrt(df1);
    if (critF <= maxF) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(mapX(critF), h - padY - 30);
      ctx.lineTo(mapX(critF), h - padY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#10b981';
      ctx.font = '9px sans-serif';
      ctx.fillText(`F* (0.05)`, mapX(critF), h - padY + 14);
    }
  }, [anovaGroups, activeTab, anovaStats]);

  // ----------------------------------------------------
  // 11. POISSON REGRESSION (GLM) & RATE RATIOS STATE
  // ----------------------------------------------------
  const [poissonBeta0, setPoissonBeta0] = useState<number>(0.6);
  const [poissonBeta1, setPoissonBeta1] = useState<number>(0.28);
  const [poissonX, setPoissonX] = useState<number>(3.5);
  const [poissonPreset, setPoissonPreset] = useState<'traffic' | 'hospital' | 'radiation'>('traffic');
  const poissonCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const setPoissonModelPreset = (preset: 'traffic' | 'hospital' | 'radiation') => {
    setPoissonPreset(preset);
    if (preset === 'traffic') {
      setPoissonBeta0(0.4);
      setPoissonBeta1(0.32);
      setPoissonX(3.0);
    } else if (preset === 'hospital') {
      setPoissonBeta0(1.2);
      setPoissonBeta1(0.18);
      setPoissonX(4.0);
    } else if (preset === 'radiation') {
      setPoissonBeta0(0.1);
      setPoissonBeta1(0.45);
      setPoissonX(2.5);
    }
  };

  const poissonStats = (() => {
    const currentRate = Math.exp(poissonBeta0 + poissonBeta1 * poissonX);
    const rateRatio = Math.exp(poissonBeta1);
    const pctChange = (rateRatio - 1) * 100;

    // Poisson PMF distribution up to k = 12
    const pmf: { k: number; prob: number }[] = [];
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

    for (let k = 0; k <= 12; k++) {
      const prob = (Math.pow(currentRate, k) * Math.exp(-currentRate)) / factorial(k);
      pmf.push({ k, prob });
    }

    return {
      currentRate,
      rateRatio,
      pctChange,
      pmf,
    };
  })();

  // Poisson Canvas Draw Hook
  useEffect(() => {
    const canvas = poissonCanvasRef.current;
    if (!canvas || activeTab !== 'poisson') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padX = 40;
    const padY = 25;
    const maxX = 8.0;

    const mapX = (x: number) => padX + (x / maxX) * (w * 0.55 - padX);
    const maxRate = Math.exp(poissonBeta0 + poissonBeta1 * maxX);
    const mapY = (rate: number) => h - padY - (rate / (maxRate * 1.1)) * (h - padY * 2);

    // Left Panel: Rate Exponential Curve
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(w * 0.55, h - padY);
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, h - padY);
    ctx.stroke();

    // Curve
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let x = 0; x <= maxX; x += 0.1) {
      const rate = Math.exp(poissonBeta0 + poissonBeta1 * x);
      const px = mapX(x);
      const py = mapY(rate);
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Selected Point
    const curPx = mapX(poissonX);
    const curPy = mapY(poissonStats.currentRate);

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(curPx, curPy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([3, 2]);
    ctx.beginPath();
    ctx.moveTo(curPx, curPy);
    ctx.lineTo(curPx, h - padY);
    ctx.moveTo(curPx, curPy);
    ctx.lineTo(padX, curPy);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px sans-serif';
    ctx.fillText(`x = ${poissonX.toFixed(1)}`, curPx - 10, h - padY + 14);
    ctx.fillText(`λ = ${poissonStats.currentRate.toFixed(2)}`, padX + 5, curPy - 4);

    // Right Panel: Discrete Poisson PMF Bars P(Y=k)
    const rightX = w * 0.6;
    const rightW = w * 0.36;
    const maxProb = Math.max(0.35, ...poissonStats.pmf.map(p => p.prob));
    const barW = (rightW / poissonStats.pmf.length) - 3;

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`P(Y = k | λ = ${poissonStats.currentRate.toFixed(2)})`, rightX, padY + 5);

    poissonStats.pmf.forEach((p, idx) => {
      const bx = rightX + idx * (barW + 3);
      const bh = (p.prob / maxProb) * (h - padY * 2 - 20);
      const by = h - padY - bh;

      ctx.fillStyle = p.k === Math.round(poissonStats.currentRate) ? '#10b981' : '#6366f1';
      ctx.fillRect(bx, by, barW, bh);

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${p.k}`, bx + barW / 2, h - padY + 12);
    });
  }, [poissonBeta0, poissonBeta1, poissonX, activeTab, poissonStats]);

  // ----------------------------------------------------
  // 12. DATA TRANSFORMATIONS & TUKEY POWER LADDER STATE
  // ----------------------------------------------------
  const [transformLambda, setTransformLambda] = useState<number>(0); // -1: 1/y, 0: ln(y), 0.5: sqrt(y), 1: raw, 2: y^2
  const [transformDataset, setTransformDataset] = useState<'house_prices' | 'stopping' | 'bacteria'>('house_prices');
  const transformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preset raw data generators
  const rawPoints = (() => {
    const pts: { x: number; y: number }[] = [];
    if (transformDataset === 'house_prices') {
      // Exponential price growth with square footage
      for (let i = 0; i < 45; i++) {
        const x = 50 + i * 4.5;
        const noise = (Math.sin(i * 99) + 1) * 0.4 - 0.2;
        const y = Math.exp(1.8 + 0.018 * x + noise);
        pts.push({ x, y });
      }
    } else if (transformDataset === 'stopping') {
      // Quadratic braking distance with speed
      for (let i = 0; i < 40; i++) {
        const x = 20 + i * 2.5;
        const noise = Math.cos(i * 37) * 4;
        const y = 0.045 * x * x + noise + 10;
        pts.push({ x, y: Math.max(1, y) });
      }
    } else {
      // Exponential bacteria decay or growth
      for (let i = 0; i < 35; i++) {
        const x = 1 + i * 0.5;
        const noise = Math.sin(i * 13) * 0.2;
        const y = 800 / (x + noise + 1);
        pts.push({ x, y: Math.max(0.5, y) });
      }
    }
    return pts;
  })();

  const transformFunc = (y: number, lambda: number) => {
    if (lambda === 0) return Math.log(Math.max(0.001, y));
    if (lambda === 0.5) return Math.sqrt(Math.max(0, y));
    if (lambda === -1) return -1 / Math.max(0.001, y);
    if (lambda === 2) return Math.pow(y, 2) / 1000;
    return y;
  };

  const transformStats = (() => {
    const transformedPts = rawPoints.map(p => ({
      x: p.x,
      rawY: p.y,
      transY: transformFunc(p.y, transformLambda),
    }));

    const n = transformedPts.length;
    const meanX = transformedPts.reduce((s, p) => s + p.x, 0) / n;
    const meanY = transformedPts.reduce((s, p) => s + p.transY, 0) / n;

    let sxx = 0;
    let syy = 0;
    let sxy = 0;

    transformedPts.forEach(p => {
      sxx += Math.pow(p.x - meanX, 2);
      syy += Math.pow(p.transY - meanY, 2);
      sxy += (p.x - meanX) * (p.transY - meanY);
    });

    const r = syy > 0 && sxx > 0 ? sxy / Math.sqrt(sxx * syy) : 0;
    const r2 = r * r;
    const slope = sxx > 0 ? sxy / sxx : 0;
    const intercept = meanY - slope * meanX;

    // Skewness of y vs transY
    const meanRawY = rawPoints.reduce((s, p) => s + p.y, 0) / n;
    const sdRawY = Math.sqrt(rawPoints.reduce((s, p) => s + Math.pow(p.y - meanRawY, 2), 0) / (n - 1));
    const skewRaw = sdRawY > 0 ? rawPoints.reduce((s, p) => s + Math.pow((p.y - meanRawY) / sdRawY, 3), 0) / n : 0;

    const sdTransY = Math.sqrt(syy / (n - 1));
    const skewTrans = sdTransY > 0 ? transformedPts.reduce((s, p) => s + Math.pow((p.transY - meanY) / sdTransY, 3), 0) / n : 0;

    return {
      transformedPts,
      r,
      r2,
      slope,
      intercept,
      skewRaw,
      skewTrans,
    };
  })();

  // Transform Canvas Hook
  useEffect(() => {
    const canvas = transformCanvasRef.current;
    if (!canvas || activeTab !== 'transform') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padX = 40;
    const padY = 25;
    const halfW = w / 2;

    // Left Panel: Raw Y vs X
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, h - padY);
    ctx.lineTo(halfW - 20, h - padY);
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, h - padY);
    ctx.stroke();

    const minX = Math.min(...rawPoints.map(p => p.x));
    const maxX = Math.max(...rawPoints.map(p => p.x));
    const minRawY = Math.min(...rawPoints.map(p => p.y));
    const maxRawY = Math.max(...rawPoints.map(p => p.y));

    const mapRawX = (x: number) => padX + ((x - minX) / (maxX - minX || 1)) * (halfW - 20 - padX);
    const mapRawY = (y: number) => h - padY - ((y - minRawY) / (maxRawY - minRawY || 1)) * (h - padY * 2);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('1. Izvirni podatki (Nelinearno)', padX, padY - 5);

    rawPoints.forEach(p => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(mapRawX(p.x), mapRawY(p.y), 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Right Panel: Transformed Y vs X
    const rightPadX = halfW + 20;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rightPadX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.moveTo(rightPadX, padY);
    ctx.lineTo(rightPadX, h - padY);
    ctx.stroke();

    const minTransY = Math.min(...transformStats.transformedPts.map(p => p.transY));
    const maxTransY = Math.max(...transformStats.transformedPts.map(p => p.transY));

    const mapTransX = (x: number) => rightPadX + ((x - minX) / (maxX - minX || 1)) * (w - padX - rightPadX);
    const mapTransY = (y: number) => h - padY - ((y - minTransY) / (maxTransY - minTransY || 1)) * (h - padY * 2);

    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`2. Transformirano f(Y, λ=${transformLambda}) — R² = ${(transformStats.r2 * 100).toFixed(1)} %`, rightPadX, padY - 5);

    // Fitted regression line
    const yHatStart = transformStats.intercept + transformStats.slope * minX;
    const yHatEnd = transformStats.intercept + transformStats.slope * maxX;

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapTransX(minX), mapTransY(yHatStart));
    ctx.lineTo(mapTransX(maxX), mapTransY(yHatEnd));
    ctx.stroke();

    transformStats.transformedPts.forEach(p => {
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(mapTransX(p.x), mapTransY(p.transY), 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [transformLambda, transformDataset, activeTab, transformStats, rawPoints]);

  // ----------------------------------------------------
  // 13. REGRESSION CONFIDENCE & PREDICTION INTERVALS STATE
  // ----------------------------------------------------
  type RegIntPresetType = 'height' | 'bloodPressure' | 'mileage' | 'custom';
  const [regIntPreset, setRegIntPreset] = useState<RegIntPresetType>('height');
  const [regIntN, setRegIntN] = useState<number>(24);
  const [regIntSlope, setRegIntSlope] = useState<number>(0.74);
  const [regIntIntercept, setRegIntIntercept] = useState<number>(45.0);
  const [regIntNoise, setRegIntNoise] = useState<number>(4.5);
  const [regIntX0, setRegIntX0] = useState<number>(175);
  const [regIntConfidence, setRegIntConfidence] = useState<number>(95);
  const [regIntSeed, setRegIntSeed] = useState<number>(42);
  const regIntCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preset switch handler
  const handleRegIntPreset = (preset: RegIntPresetType) => {
    setRegIntPreset(preset);
    if (preset === 'height') {
      setRegIntN(24);
      setRegIntSlope(0.74);
      setRegIntIntercept(45.0);
      setRegIntNoise(4.5);
      setRegIntX0(175);
      setRegIntConfidence(95);
    } else if (preset === 'bloodPressure') {
      setRegIntN(30);
      setRegIntSlope(0.55);
      setRegIntIntercept(3.2);
      setRegIntNoise(3.8);
      setRegIntX0(25);
      setRegIntConfidence(95);
    } else if (preset === 'mileage') {
      setRegIntN(20);
      setRegIntSlope(3.4);
      setRegIntIntercept(2.1);
      setRegIntNoise(0.85);
      setRegIntX0(1.6);
      setRegIntConfidence(95);
    }
  };

  // Student-t critical value approximation
  const getStudentTCritical = (conf: number, df: number): number => {
    const validDf = Math.max(1, df);
    let z = 1.95996;
    if (conf === 90) z = 1.64485;
    if (conf === 99) z = 2.57583;
    const t =
      z +
      (Math.pow(z, 3) + z) / (4 * validDf) +
      (5 * Math.pow(z, 5) + 16 * Math.pow(z, 3) + 3 * z) / (96 * Math.pow(validDf, 2));
    return Math.max(z, t);
  };

  // Generate dataset and perform full regression & interval analytics
  const regIntData = React.useMemo(() => {
    let minX = 160;
    let maxX = 190;
    let xUnit = 'cm';
    let yUnit = 'cm';
    let xLabel = 'Višina očeta (x)';
    let yLabel = 'Višina sina (y)';

    if (regIntPreset === 'bloodPressure') {
      minX = 5;
      maxX = 45;
      xUnit = 'mg';
      yUnit = 'mmHg';
      xLabel = 'Odmerek zdravila (x)';
      yLabel = 'Znižanje krvnega tlaka (y)';
    } else if (regIntPreset === 'mileage') {
      minX = 1.0;
      maxX = 2.4;
      xUnit = 't';
      yUnit = 'L/100km';
      xLabel = 'Masa vozila (x)';
      yLabel = 'Poraba goriva (y)';
    } else if (regIntPreset === 'custom') {
      minX = 10;
      maxX = 90;
      xUnit = '';
      yUnit = '';
      xLabel = 'Prediktor (x)';
      yLabel = 'Odziv (y)';
    }

    // Deterministic RNG
    const pts: { x: number; y: number }[] = [];
    let s = regIntSeed;
    const rng = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const normalRng = () => {
      const u1 = Math.max(1e-6, rng());
      const u2 = rng();
      return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };

    for (let i = 0; i < regIntN; i++) {
      const frac = (i + 0.5) / regIntN;
      const xVal = minX + frac * (maxX - minX) + (rng() - 0.5) * ((maxX - minX) / (regIntN * 1.2));
      const eps = normalRng() * regIntNoise;
      const yVal = regIntIntercept + regIntSlope * xVal + eps;
      pts.push({ x: Number(xVal.toFixed(2)), y: Number(yVal.toFixed(2)) });
    }

    const n = pts.length;
    const xBar = pts.reduce((acc, p) => acc + p.x, 0) / n;
    const yBar = pts.reduce((acc, p) => acc + p.y, 0) / n;
    const ssX = pts.reduce((acc, p) => acc + Math.pow(p.x - xBar, 2), 0);
    const ssY = pts.reduce((acc, p) => acc + Math.pow(p.y - yBar, 2), 0);
    const ssXY = pts.reduce((acc, p) => acc + (p.x - xBar) * (p.y - yBar), 0);

    const b1 = ssX !== 0 ? ssXY / ssX : regIntSlope;
    const b0 = yBar - b1 * xBar;

    const sse = pts.reduce((acc, p) => {
      const yHat = b0 + b1 * p.x;
      return acc + Math.pow(p.y - yHat, 2);
    }, 0);

    const df = Math.max(1, n - 2);
    const se = Math.sqrt(sse / df);
    const r2 = ssY !== 0 ? Math.max(0, 1 - sse / ssY) : 0;
    const r = (b1 >= 0 ? 1 : -1) * Math.sqrt(r2);

    // Target query x0 analytics
    const tCrit = getStudentTCritical(regIntConfidence, df);
    const yHat0 = b0 + b1 * regIntX0;
    const leverage0 = 1 / n + (ssX !== 0 ? Math.pow(regIntX0 - xBar, 2) / ssX : 0);

    const seMean = se * Math.sqrt(leverage0);
    const sePred = se * Math.sqrt(1 + leverage0);

    const ciMeanLower = yHat0 - tCrit * seMean;
    const ciMeanUpper = yHat0 + tCrit * seMean;
    const ciMeanWidth = ciMeanUpper - ciMeanLower;

    const piIndivLower = yHat0 - tCrit * sePred;
    const piIndivUpper = yHat0 + tCrit * sePred;
    const piIndivWidth = piIndivUpper - piIndivLower;

    const widthRatio = ciMeanWidth > 0 ? piIndivWidth / ciMeanWidth : 1;

    return {
      pts,
      minX,
      maxX,
      xUnit,
      yUnit,
      xLabel,
      yLabel,
      n,
      df,
      xBar,
      yBar,
      ssX,
      ssY,
      b1,
      b0,
      se,
      r2,
      r,
      tCrit,
      yHat0,
      leverage0,
      seMean,
      sePred,
      ciMeanLower,
      ciMeanUpper,
      ciMeanWidth,
      piIndivLower,
      piIndivUpper,
      piIndivWidth,
      widthRatio,
    };
  }, [regIntN, regIntSlope, regIntIntercept, regIntNoise, regIntX0, regIntConfidence, regIntSeed, regIntPreset]);

  // Canvas hook for Regression Confidence & Prediction Intervals
  useEffect(() => {
    const canvas = regIntCanvasRef.current;
    if (!canvas || activeTab !== 'regIntervals') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padLeft = 60;
    const padRight = 40;
    const padTop = 35;
    const padBottom = 45;
    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;

    const xRange = regIntData.maxX - regIntData.minX || 1;
    const plotMinX = regIntData.minX - xRange * 0.08;
    const plotMaxX = regIntData.maxX + xRange * 0.08;
    const plotRangeX = plotMaxX - plotMinX;

    // Calculate Y bounds taking into account all points and prediction interval curves
    const steps = 80;
    let minBandY = Infinity;
    let maxBandY = -Infinity;

    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const seP = regIntData.se * Math.sqrt(1 + lev);
      const piLow = yFit - regIntData.tCrit * seP;
      const piHigh = yFit + regIntData.tCrit * seP;
      if (piLow < minBandY) minBandY = piLow;
      if (piHigh > maxBandY) maxBandY = piHigh;
    }

    regIntData.pts.forEach(p => {
      if (p.y < minBandY) minBandY = p.y;
      if (p.y > maxBandY) maxBandY = p.y;
    });

    const yMargin = (maxBandY - minBandY) * 0.08 || 1;
    const plotMinY = minBandY - yMargin;
    const plotMaxY = maxBandY + yMargin;
    const plotRangeY = plotMaxY - plotMinY;

    const mapX = (x: number) => padLeft + ((x - plotMinX) / plotRangeX) * plotW;
    const mapY = (y: number) => h - padBottom - ((y - plotMinY) / plotRangeY) * plotH;

    // Draw Gridlines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const gridYVal = plotMinY + (i / 5) * plotRangeY;
      const yPx = mapY(gridYVal);
      ctx.beginPath();
      ctx.moveTo(padLeft, yPx);
      ctx.lineTo(w - padRight, yPx);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(gridYVal.toFixed(1), padLeft - 8, yPx + 3);
    }

    for (let i = 0; i <= 5; i++) {
      const gridXVal = plotMinX + (i / 5) * plotRangeX;
      const xPx = mapX(gridXVal);
      ctx.beginPath();
      ctx.moveTo(xPx, padTop);
      ctx.lineTo(xPx, h - padBottom);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(gridXVal.toFixed(1), xPx, h - padBottom + 16);
    }

    // 1. Shaded Wide Prediction Band for Individual Observations (Purple)
    ctx.fillStyle = 'rgba(168, 85, 247, 0.14)';
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const piHigh = yFit + regIntData.tCrit * (regIntData.se * Math.sqrt(1 + lev));
      const px = mapX(curX);
      const py = mapY(piHigh);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = steps; i >= 0; i--) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const piLow = yFit - regIntData.tCrit * (regIntData.se * Math.sqrt(1 + lev));
      const px = mapX(curX);
      const py = mapY(piLow);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // 2. Shaded Narrow Confidence Band for Mean Response E(Y|x) (Emerald/Green)
    ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const ciHigh = yFit + regIntData.tCrit * (regIntData.se * Math.sqrt(lev));
      const px = mapX(curX);
      const py = mapY(ciHigh);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    for (let i = steps; i >= 0; i--) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const ciLow = yFit - regIntData.tCrit * (regIntData.se * Math.sqrt(lev));
      const px = mapX(curX);
      const py = mapY(ciLow);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // 3. Draw Upper/Lower Prediction Band Boundary Lines (Dotted Purple)
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const piHigh = yFit + regIntData.tCrit * (regIntData.se * Math.sqrt(1 + lev));
      if (i === 0) ctx.moveTo(mapX(curX), mapY(piHigh));
      else ctx.lineTo(mapX(curX), mapY(piHigh));
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const piLow = yFit - regIntData.tCrit * (regIntData.se * Math.sqrt(1 + lev));
      if (i === 0) ctx.moveTo(mapX(curX), mapY(piLow));
      else ctx.lineTo(mapX(curX), mapY(piLow));
    }
    ctx.stroke();

    // 4. Draw Upper/Lower Confidence Band Boundary Lines (Solid/Dashed Emerald)
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([3, 2]);

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const ciHigh = yFit + regIntData.tCrit * (regIntData.se * Math.sqrt(lev));
      if (i === 0) ctx.moveTo(mapX(curX), mapY(ciHigh));
      else ctx.lineTo(mapX(curX), mapY(ciHigh));
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const curX = plotMinX + (i / steps) * plotRangeX;
      const yFit = regIntData.b0 + regIntData.b1 * curX;
      const lev = 1 / regIntData.n + (regIntData.ssX !== 0 ? Math.pow(curX - regIntData.xBar, 2) / regIntData.ssX : 0);
      const ciLow = yFit - regIntData.tCrit * (regIntData.se * Math.sqrt(lev));
      if (i === 0) ctx.moveTo(mapX(curX), mapY(ciLow));
      else ctx.lineTo(mapX(curX), mapY(ciLow));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Draw Fitted Regression Line (Indigo)
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const yStart = regIntData.b0 + regIntData.b1 * plotMinX;
    const yEnd = regIntData.b0 + regIntData.b1 * plotMaxX;
    ctx.moveTo(mapX(plotMinX), mapY(yStart));
    ctx.lineTo(mapX(plotMaxX), mapY(yEnd));
    ctx.stroke();

    // 6. Draw Sample Scatter Points
    regIntData.pts.forEach(p => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(mapX(p.x), mapY(p.y), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 7. Center of Gravity Marker (xBar, yBar)
    const xBarPx = mapX(regIntData.xBar);
    const yBarPx = mapY(regIntData.yBar);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(xBarPx, yBarPx, 7, 0, Math.PI * 2);
    ctx.stroke();

    // 8. Target Query Point x0 Guide & Error Bars
    const x0Px = mapX(regIntX0);
    const y0Px = mapY(regIntData.yHat0);
    const piLowPx = mapY(regIntData.piIndivLower);
    const piHighPx = mapY(regIntData.piIndivUpper);
    const ciLowPx = mapY(regIntData.ciMeanLower);
    const ciHighPx = mapY(regIntData.ciMeanUpper);

    // Vertical dashed crosshair
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(x0Px, padTop);
    ctx.lineTo(x0Px, h - padBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Prediction Interval Whisker (Purple outer bar)
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x0Px - 8, piLowPx);
    ctx.lineTo(x0Px + 8, piLowPx);
    ctx.moveTo(x0Px - 8, piHighPx);
    ctx.lineTo(x0Px + 8, piHighPx);
    ctx.stroke();

    // Confidence Interval Whisker (Emerald inner bar)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(x0Px, ciLowPx);
    ctx.lineTo(x0Px, ciHighPx);
    ctx.moveTo(x0Px - 5, ciLowPx);
    ctx.lineTo(x0Px + 5, ciLowPx);
    ctx.moveTo(x0Px - 5, ciHighPx);
    ctx.lineTo(x0Px + 5, ciHighPx);
    ctx.stroke();

    // Center point yHat0 dot
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(x0Px, y0Px, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [regIntData, regIntX0, activeTab]);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-y-auto select-none">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Nazaj v učilnico</span>
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>Interaktivni statistični kalkulatorji</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Natančni izračuni Z-vrednosti, dvovzorčnih t-testov, hi-kvadrata, Bayesovih testov in velikosti vzorca
            </p>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setActiveTab('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'normal'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Normalna (Z-score)</span>
          </button>

          <button
            onClick={() => setActiveTab('ttest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'ttest'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Dvovzorčni t-test</span>
          </button>

          <button
            onClick={() => setActiveTab('chisquare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'chisquare'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Table className="h-3.5 w-3.5" />
            <span>Hi-kvadrat (χ²)</span>
          </button>

          <button
            onClick={() => setActiveTab('bayes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'bayes'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GitFork className="h-3.5 w-3.5" />
            <span>Bayesov test</span>
          </button>

          <button
            onClick={() => setActiveTab('sampleSize')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'sampleSize'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>Velikost vzorca & moč</span>
          </button>

          <button
            onClick={() => setActiveTab('logistic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'logistic'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Logistična regresija</span>
          </button>

          <button
            onClick={() => setActiveTab('lineDiag')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'lineDiag'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileSearch className="h-3.5 w-3.5" />
            <span>LINE Diagnostika</span>
          </button>

          <button
            onClick={() => setActiveTab('crossVal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'crossVal'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Split className="h-3.5 w-3.5" />
            <span>Prečno preverjanje (CV)</span>
          </button>

          <button
            onClick={() => setActiveTab('twoProps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'twoProps'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GitCompare className="h-3.5 w-3.5" />
            <span>Dva deleža (Z & p_pool)</span>
          </button>

          <button
            onClick={() => setActiveTab('anova')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'anova'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>ANOVA (F & Post-Hoc)</span>
          </button>

          <button
            onClick={() => setActiveTab('poisson')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'poisson'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Poisson (GLM & RR)</span>
          </button>

          <button
            onClick={() => setActiveTab('transform')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'transform'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Transformacije (Tukey)</span>
          </button>

          <button
            onClick={() => setActiveTab('regIntervals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'regIntervals'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Crosshair className="h-3.5 w-3.5" />
            <span>Regresijski intervali (CI vs. PI)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* ==================================================== */}
        {/* TAB 1: NORMAL DISTRIBUTION CALCULATOR */}
        {/* ==================================================== */}
        {activeTab === 'normal' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Normalna porazdelitev & Z-vrednosti
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Izračun verjetnosti, kritičnih vrednosti in standardizacije $Z = (X - \mu) / \sigma$.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-4 py-2.5 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                      Izračunana verjetnost P
                    </span>
                    <span className="text-base font-extrabold text-indigo-700 dark:text-indigo-300 font-mono">
                      {(displayProb * 100).toFixed(4)} % (P = {displayProb.toFixed(4)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Canvas Interactive Plot */}
              <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                <canvas
                  ref={normalCanvasRef}
                  width={680}
                  height={220}
                  className="w-full max-w-[680px] h-[220px]"
                />
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Povprečje (μ)
                  </label>
                  <input
                    type="number"
                    value={normMean}
                    onChange={e => setNormMean(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Standardni odklon (σ)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.5"
                    value={normSd}
                    onChange={e => setNormSd(Math.max(0.01, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Mejna točka (x)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={normX}
                    onChange={e => setNormX(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Območje senčenja
                  </label>
                  <select
                    value={normTail}
                    onChange={e => setNormTail(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="right">Desni rep: P(X ≥ x)</option>
                    <option value="left">Levi rep: P(X ≤ x)</option>
                    <option value="twoSided">Dvostransko: |X - μ| ≥ |x - μ|</option>
                    <option value="center">Osrednje območje: |X - μ| ≤ |x - μ|</option>
                  </select>
                </div>
              </div>

              {/* Z-Score Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Standardizirana Z-vrednost:
                  </span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    Z = ({normX} - {normMean}) / {normSd} = {currentZ.toFixed(3)}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Vrednost $x = {normX}$ leži <strong>{Math.abs(currentZ).toFixed(2)}</strong> standardnih odklonov {currentZ >= 0 ? 'nad' : 'pod'} povprečjem. 
                  Po pravilu 68-95-99,7 leži 95 % vseh podatkov v območju $Z \in [-1.96, +1.96]$.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: TWO-SAMPLE T-TEST */}
        {/* ==================================================== */}
        {activeTab === 'ttest' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Dvovzorčni t-test (Welchov in Studentov)
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Primerjava povprečij dveh neodvisnih vzorcev: $H_0: \mu_1 = \mu_2$ proti $H_1: \mu_1 \ne \mu_2$.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-4 py-2.5 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                      Dvostranska p-vrednost
                    </span>
                    <span className="text-base font-extrabold text-indigo-700 dark:text-indigo-300 font-mono">
                      p = {tPValueApprox < 0.0001 ? '< 0.0001' : tPValueApprox.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sample Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Group 1 Card */}
                <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    1. Skupina (Vzorec A)
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Velikost (n₁)</label>
                      <input
                        type="number"
                        min="2"
                        value={tN1}
                        onChange={e => setTN1(Math.max(2, parseInt(e.target.value, 10) || 2))}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Povprečje (x̄₁)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={tMean1}
                        onChange={e => setTMean1(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Odklon (s₁)</label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.1"
                        value={tSd1}
                        onChange={e => setTSd1(Math.max(0.01, parseFloat(e.target.value) || 1))}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Group 2 Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    2. Skupina (Vzorec B)
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Velikost (n₂)</label>
                      <input
                        type="number"
                        min="2"
                        value={tN2}
                        onChange={e => setTN2(Math.max(2, parseInt(e.target.value, 10) || 2))}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Povprečje (x̄₂)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={tMean2}
                        onChange={e => setTMean2(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Odklon (s₂)</label>
                      <input
                        type="number"
                        min="0.01"
                        step="0.1"
                        value={tSd2}
                        onChange={e => setTSd2(Math.max(0.01, parseFloat(e.target.value) || 1))}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] text-slate-500 block">Razlika v povprečjih (x̄₁ - x̄₂)</span>
                  <span className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 block">
                    {diffMean.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">SE = {seDiff.toFixed(3)}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] text-slate-500 block">Testna statistika (t) & df</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 block">
                    t = {tStat.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">df(Welch) ≈ {welchDf.toFixed(1)}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
                  <span className="text-[11px] text-slate-500 block">95 % IZ za razliko (μ₁ - μ₂)</span>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 block mt-1">
                    [{tCiLow.toFixed(2)}, {tCiHigh.toFixed(2)}]
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {tCiLow > 0 || tCiHigh < 0 ? '0 ni v intervalu (značilno)' : 'Vsebuje 0 (neznačilno)'}
                  </span>
                </div>
              </div>

              {/* Statistical Decision */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                tPValueApprox < tAlpha
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                <strong>Sklep pri α = {tAlpha}: </strong>
                {tPValueApprox < tAlpha ? (
                  <span>
                    Ker je $p = {tPValueApprox.toFixed(4)} &lt; {tAlpha}$, <strong>zavrnemo ničelno hipotezo $H_0$</strong>. Razlika med skupinama je statistično značilna.
                  </span>
                ) : (
                  <span>
                    Ker je $p = {tPValueApprox.toFixed(4)} \ge {tAlpha}$, <strong>ne moremo zavrniti $H_0$</strong>. Ni dovolj statističnih dokazov za razliko v populacijskih povprečjih.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: CHI-SQUARE CONTINGENCY TABLE */}
        {/* ==================================================== */}
        {activeTab === 'chisquare' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Hi-kvadrat (χ²) test neodvisnosti za 2x2 tabelo
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Preizkusite povezanost med dvema kategoričnima spremenljivkama (opazovane vs. pričakovane frekvence).
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-2xl">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                      Testna statistika χ² in p-vrednost
                    </span>
                    <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                      χ² = {chiSquareStat.toFixed(2)} (p = {chiPValue.toFixed(4)})
                    </span>
                  </div>
                </div>
              </div>

              {/* 2x2 Contingency Table Input */}
              <div className="overflow-x-auto">
                <table className="w-full max-w-xl mx-auto text-xs text-center border-collapse border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr>
                      <th className="p-3 border border-slate-200 dark:border-slate-700 text-left">Kategorija</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Stolpec 1</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700">Stolpec 2</th>
                      <th className="p-3 border border-slate-200 dark:border-slate-700 bg-slate-200/60 dark:bg-slate-700">Vsota vrstice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-semibold text-left border border-slate-200 dark:border-slate-700">Vrstica 1</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min="0"
                          value={o11}
                          onChange={e => setO11(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="w-20 p-2 text-center font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">E = {e11.toFixed(1)}</div>
                      </td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min="0"
                          value={o12}
                          onChange={e => setO12(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="w-20 p-2 text-center font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">E = {e12.toFixed(1)}</div>
                      </td>
                      <td className="p-3 font-mono font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                        {r1}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-left border border-slate-200 dark:border-slate-700">Vrstica 2</td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min="0"
                          value={o21}
                          onChange={e => setO21(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="w-20 p-2 text-center font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">E = {e21.toFixed(1)}</div>
                      </td>
                      <td className="p-2 border border-slate-200 dark:border-slate-700">
                        <input
                          type="number"
                          min="0"
                          value={o22}
                          onChange={e => setO22(Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="w-20 p-2 text-center font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        />
                        <div className="text-[10px] text-slate-400 mt-1">E = {e22.toFixed(1)}</div>
                      </td>
                      <td className="p-3 font-mono font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                        {r2}
                      </td>
                    </tr>
                    <tr className="bg-slate-200/60 dark:bg-slate-700 font-bold">
                      <td className="p-3 text-left border border-slate-200 dark:border-slate-700">Vsota stolpca</td>
                      <td className="p-3 font-mono border border-slate-200 dark:border-slate-700">{c1}</td>
                      <td className="p-3 font-mono border border-slate-200 dark:border-slate-700">{c2}</td>
                      <td className="p-3 font-mono text-indigo-600 dark:text-indigo-300 border border-slate-200 dark:border-slate-700">N = {grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Chi-Square Output Explanation */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Stopnje prostosti: df = (2 - 1) × (2 - 1) = 1
                  </span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">
                    Kritična vrednost (α = 0.05) = 3.841
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {chiSquareStat > 3.841 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Statistično značilna odvisnost: χ² = {chiSquareStat.toFixed(2)} &gt; 3.841 (p = {chiPValue.toFixed(4)} &lt; 0.05). Zavrnemo ničelno hipotezo o neodvisnosti.
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      ✗ Ni statistično značilne povezave: χ² = {chiSquareStat.toFixed(2)} ≤ 3.841 (p = {chiPValue.toFixed(4)} ≥ 0.05). Ne moremo zavrniti neodvisnosti.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: BAYES' THEOREM & DIAGNOSTIC TESTING SUITE     */}
        {/* ==================================================== */}
        {activeTab === 'bayes' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header & Harvard Presets */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Bayesov diagnostični kalkulator & Presejalni testi</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pretvorba med občutljivostjo (senzitivnostjo), specifičnostjo in aposteriorno verjetnostjo $P(D \mid T^+)$ s tremi komplementarnimi metodami.
                  </p>
                </div>

                {/* Preset Scenarios from Harvard Biostatistics Textbook */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">Harvard primeri:</span>
                  <button
                    onClick={() => setBayesPreset('mammogram')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                      prevalencePercent === 0.35
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Mamografija (0.35%)
                  </button>
                  <button
                    onClick={() => setBayesPreset('trisomy21')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                      prevalencePercent === 0.125
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Trisomija 21 cfDNA
                  </button>
                  <button
                    onClick={() => setBayesPreset('lupus')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                      prevalencePercent === 2.0
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Lupus (2%)
                  </button>
                  <button
                    onClick={() => setBayesPreset('hiv')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                      prevalencePercent === 25.9
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    HIV ELISA (25.9%)
                  </button>
                  <button
                    onClick={() => setBayesPreset('drugtest')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                      prevalencePercent === 5.0
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Test na droge
                  </button>
                </div>
              </div>

              {/* KPI Scorecard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                    Pozitivna napovedna vrednost (PPV)
                  </span>
                  <span className="text-xl font-mono font-black text-emerald-700 dark:text-emerald-300">
                    {bayesPPV.toFixed(2)} %
                  </span>
                  <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 block mt-1">
                    P(Bolezen | Test +)
                  </span>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                    Negativna napovedna vrednost (NPV)
                  </span>
                  <span className="text-xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                    {bayesNPV.toFixed(2)} %
                  </span>
                  <span className="text-[10px] text-indigo-500/80 dark:text-indigo-400/80 block mt-1">
                    P(Zdrav | Test -)
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Razmerje verjetja (LR⁺)
                  </span>
                  <span className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {bayesLRPlus.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Sens / (1 - Spec)
                  </span>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200/80 dark:border-purple-800/80">
                  <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">
                    Diagnostično razmerje obetov (DOR)
                  </span>
                  <span className="text-xl font-mono font-black text-purple-700 dark:text-purple-300">
                    {bayesDOR > 1000 ? bayesDOR.toExponential(2) : bayesDOR.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-purple-500/80 dark:text-purple-400/80 block mt-1">
                    LR⁺ / LR⁻ (Moč ločevanja)
                  </span>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Prevalenca P(D)
                    </span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {prevalencePercent} %
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="30"
                    step="0.05"
                    value={prevalencePercent}
                    onChange={e => setPrevalencePercent(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Apriorna verjetnost bolezni v preučevani populaciji.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Občutljivost P(T⁺ | D)
                    </span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {sensitivityPercent} %
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99.9"
                    step="0.1"
                    value={sensitivityPercent}
                    onChange={e => setSensitivityPercent(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Senzitivnost: Verjetnost, da je test pozitiven, če je oseba bolna.
                  </p>
                </div>

                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Specifičnost P(T⁻ | Dᶜ)
                    </span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {specificityPercent} %
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99.9"
                    step="0.1"
                    value={specificityPercent}
                    onChange={e => setSpecificityPercent(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    Specifičnost: Verjetnost, da je test negativen pri zdravi osebi.
                  </p>
                </div>
              </div>

              {/* 3 Pedagogy Methods Switcher */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Izberite metodo razlage:
                  </span>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                    <button
                      onClick={() => setBayesMethod('table100k')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        bayesMethod === 'table100k'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      1. Naravne frekvence (100k tabela)
                    </button>
                    <button
                      onClick={() => setBayesMethod('tree')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        bayesMethod === 'tree'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      2. Drevesni diagram (Tree)
                    </button>
                    <button
                      onClick={() => setBayesMethod('algebra')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        bayesMethod === 'algebra'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      3. Bayesova algebra
                    </button>
                  </div>
                </div>

                {/* METHOD 1: 100k Natural Frequencies Table */}
                {bayesMethod === 'table100k' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-center border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                            <th className="p-3 text-left">Dejansko stanje</th>
                            <th className="p-3 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400">
                              Test Pozitiven (T⁺)
                            </th>
                            <th className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
                              Test Negativen (T⁻)
                            </th>
                            <th className="p-3">Vsota vrstice</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          <tr>
                            <td className="p-3 text-left font-bold text-rose-700 dark:text-rose-400">
                              Bolezen prisotna (D)
                            </td>
                            <td className="p-3 font-mono font-bold bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                              {Math.round(bayesTP).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Pravilno poz. (TP)</span>
                            </td>
                            <td className="p-3 font-mono bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400">
                              {Math.round(bayesFN).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Lažno neg. (FN)</span>
                            </td>
                            <td className="p-3 font-mono font-bold bg-slate-50 dark:bg-slate-800/40">
                              {Math.round(diseaseCount).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">P(D) = {prevalencePercent}%</span>
                            </td>
                          </tr>

                          <tr>
                            <td className="p-3 text-left font-bold text-emerald-700 dark:text-emerald-400">
                              Zdravi / Brez bolezni (Dᶜ)
                            </td>
                            <td className="p-3 font-mono font-bold bg-rose-100/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                              {Math.round(bayesFP).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Lažno poz. (FP)</span>
                            </td>
                            <td className="p-3 font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                              {Math.round(bayesTN).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Pravilno neg. (TN)</span>
                            </td>
                            <td className="p-3 font-mono font-bold bg-slate-50 dark:bg-slate-800/40">
                              {Math.round(healthyCount).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">P(Dᶜ) = {(100 - prevalencePercent).toFixed(2)}%</span>
                            </td>
                          </tr>

                          <tr className="bg-slate-100 dark:bg-slate-800/80 font-bold border-t-2 border-slate-300 dark:border-slate-700">
                            <td className="p-3 text-left">Vsota stolpca</td>
                            <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">
                              {Math.round(bayesTestPos).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Vsi pozitivni izvid</span>
                            </td>
                            <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                              {Math.round(bayesTestNeg).toLocaleString()}
                              <span className="block text-[10px] font-normal text-slate-400">Vsi negativni izvid</span>
                            </td>
                            <td className="p-3 font-mono text-indigo-600 dark:text-indigo-300">
                              N = {bayesPopulation.toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5">
                      <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
                        Intuitiven izračun z naravnimi frekvencami:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        Od vseh <strong>{Math.round(bayesTestPos).toLocaleString()}</strong> ljudi, ki so prejeli pozitiven izvid (T⁺), jih je dejansko bolnih le <strong>{Math.round(bayesTP).toLocaleString()}</strong>.
                        Torej je verjetnost bolezni:
                      </p>
                      <div className="font-mono font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                        PPV = {Math.round(bayesTP).toLocaleString()} / {Math.round(bayesTestPos).toLocaleString()} = {bayesPPV.toFixed(2)} %
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 2: Interactive Decision Tree */}
                {bayesMethod === 'tree' && (
                  <div className="space-y-4">
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                      <canvas
                        ref={bayesTreeCanvasRef}
                        width={680}
                        height={280}
                        className="w-full max-w-full rounded-xl bg-slate-950"
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 flex justify-between px-2">
                      <span>Rdeča/Zelena veja 1. stopnje: Dejanski status bolezni $P(D)$ in $P(D^c)$.</span>
                      <span>Rumena/Siva veja 2. stopnje: Verjetnost testa ob danem stanju.</span>
                    </div>
                  </div>
                )}

                {/* METHOD 3: Formal Bayes Algebra */}
                {bayesMethod === 'algebra' && (
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-3 font-mono">
                    <div className="font-bold text-slate-800 dark:text-slate-200 font-sans text-sm mb-2">
                      Formalni izrek po Bayesovem obrazcu:
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <FormattedMathText
                        text={
                          '$$P(D \\mid T^+) = \\frac{P(T^+ \\mid D) \\cdot P(D)}{P(T^+ \\mid D) \\cdot P(D) + P(T^+ \\mid D^c) \\cdot P(D^c)}$$'
                        }
                      />
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
                      <div>1. Števec (Pravi pozitivni): $P(T^+ \mid D) \cdot P(D) = {(sensitivityPercent/100).toFixed(3)} \times {(prevalencePercent/100).toFixed(4)} = {((sensitivityPercent/100) * (prevalencePercent/100)).toFixed(6)}$</div>
                      <div>2. Imenovalec (Skupna verjetnost T⁺): ${((sensitivityPercent/100) * (prevalencePercent/100)).toFixed(6)} + {((1 - specificityPercent/100) * (1 - prevalencePercent/100)).toFixed(6)} = {((sensitivityPercent/100) * (prevalencePercent/100) + (1 - specificityPercent/100) * (1 - prevalencePercent/100)).toFixed(6)}$</div>
                      <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm pt-2">
                        P(D | T⁺) = {bayesPPV.toFixed(4)} %
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: STATISTICAL POWER & SAMPLE SIZE CALCULATOR    */}
        {/* ==================================================== */}
        {activeTab === 'sampleSize' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header & Harvard Presets */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Statistična moč & Velikost vzorca (Harvard Pogl. 5.4 & 8.1.3)</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Načrtovanje kliničnih preskušanj in anket: določitev potrebnega $n$ za zaznavo učinka $\Delta$ z močjo $1 - \beta$.
                  </p>
                </div>

                {/* Mode Selector (Means vs Proportions) */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setSampleSizeMode('means')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      sampleSizeMode === 'means'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Primerjava 2 povprečij (μ₁ vs μ₂)
                  </button>
                  <button
                    onClick={() => setSampleSizeMode('proportions')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      sampleSizeMode === 'proportions'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Ocena deleža (Ankete p̂)
                  </button>
                </div>
              </div>

              {/* Harvard Presets Toolbar */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Primeri iz učbenika:</span>
                <button
                  onClick={() => setPowerPreset('bloodPressure')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Krvni tlak (Δ=3, σ=12)
                </button>
                <button
                  onClick={() => setPowerPreset('cornYield')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Pridelava koruze (Δ=40, 90% moč)
                </button>
                <button
                  onClick={() => setPowerPreset('stemCells')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Matične celice pri ovcah (Δ=7.83)
                </button>
                <button
                  onClick={() => setPowerPreset('lungTransplant')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Presaditev pljuč (m=10%)
                </button>
                <button
                  onClick={() => setPowerPreset('congress')}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Podpora Kongresu (m=4%, p=19%)
                </button>
              </div>

              {/* MODE 1: COMPARISON OF TWO MEANS */}
              {sampleSizeMode === 'means' && (
                <div className="space-y-6">
                  {/* Results Scorecards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        Potrebno na posamezno skupino
                      </span>
                      <span className="text-2xl font-mono font-black text-emerald-700 dark:text-emerald-300">
                        n = {requiredNPerGroupMeans.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 block mt-1">
                        Skupaj za cel poskus: N = {(requiredNPerGroupMeans * 2).toLocaleString()} oseb
                      </span>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80">
                      <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                        Dosežena moč (1 - β)
                      </span>
                      <span className="text-2xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                        {achievedPowerPercent.toFixed(1)} %
                      </span>
                      <span className="text-[10px] text-indigo-500/80 dark:text-indigo-400/80 block mt-1">
                        Verjetnost zavrnitve H₀, če učinek drži
                      </span>
                    </div>

                    <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200/80 dark:border-rose-800/80">
                      <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block mb-1">
                        Tveganje napake tipa II (β)
                      </span>
                      <span className="text-2xl font-mono font-black text-rose-700 dark:text-rose-300">
                        {(100 - achievedPowerPercent).toFixed(1)} %
                      </span>
                      <span className="text-[10px] text-rose-500/80 dark:text-rose-400/80 block mt-1">
                        Verjetnost spregledanja resničnega učinka
                      </span>
                    </div>
                  </div>

                  {/* Overlapping Distribution Power Curves Canvas */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center">
                    <canvas
                      ref={powerCanvasRef}
                      width={680}
                      height={240}
                      className="w-full max-w-full rounded-xl bg-slate-950"
                    />
                    <div className="w-full flex flex-wrap items-center justify-between text-[11px] text-slate-400 mt-2 px-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                        <span>Ničelna porazdelitev H₀: μ = 0</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
                        <span>Alternativna porazdelitev Hₐ: μ = {powerEffectDelta}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                        <span>Zelena površina: Moč (1 - β) = {achievedPowerPercent.toFixed(1)} %</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span>Rdeča: α = {(powerAlpha * 100).toFixed(0)} %</span>
                      </span>
                    </div>
                  </div>

                  {/* Input Parameters Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Minimalni klinični učinek (Δ = |μ₁ - μ₂|)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.1"
                        value={powerEffectDelta}
                        onChange={e => setPowerEffectDelta(Math.max(0.01, parseFloat(e.target.value) || 1))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Najmanjša razlika, ki jo želimo zanesljivo zaznati.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Standardni odkloni (σ₁ / σ₂)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          step="0.5"
                          min="0.1"
                          value={powerSd1}
                          onChange={e => setPowerSd1(Math.max(0.01, parseFloat(e.target.value) || 1))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                          placeholder="σ1"
                        />
                        <input
                          type="number"
                          step="0.5"
                          min="0.1"
                          value={powerSd2}
                          onChange={e => setPowerSd2(Math.max(0.01, parseFloat(e.target.value) || 1))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                          placeholder="σ2"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Predvidena variabilnost v skupinah.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Ciljna statistična moč (1 - β)
                      </label>
                      <select
                        value={powerTarget}
                        onChange={e => setPowerTarget(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={80}>80 % moč (Klinični standard, z_β = 0.842)</option>
                        <option value={90}>90 % moč (Visoka gotovost, z_β = 1.282)</option>
                        <option value={95}>95 % moč (Izjemna gotovost, z_β = 1.645)</option>
                      </select>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Standard FDA in EMA zahteva vsaj 80 % ali 90 %.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Stopnja značilnosti (α)
                      </label>
                      <select
                        value={powerAlpha}
                        onChange={e => setPowerAlpha(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={0.05}>α = 0.05 (Dvosmerno z* = 1.96)</option>
                        <option value={0.01}>α = 0.01 (Dvosmerno z* = 2.576)</option>
                        <option value={0.10}>α = 0.10 (Dvosmerno z* = 1.645)</option>
                      </select>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Dovoljeno tveganje za napako tipa I.
                      </span>
                    </div>
                  </div>

                  {/* Harvard Formula Callout */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-bold block font-sans">
                      Harvardova formula za velikost skupin (Pogl. 5.4.1):
                    </span>
                    <div className="text-indigo-600 dark:text-indigo-300 font-bold text-sm">
                      n = [ (σ₁² + σ₂²) · (z_α + z_β)² ] / Δ²
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-sans pt-1">
                      Za zaznavo razlike Δ = {powerEffectDelta} pri σ₁ = {powerSd1}, σ₂ = {powerSd2} in moči {powerTarget} % potrebujemo vsaj <strong>{requiredNPerGroupMeans}</strong> oseb na skupino (skupaj <strong>{requiredNPerGroupMeans * 2}</strong>).
                    </p>
                  </div>
                </div>
              )}

              {/* MODE 2: ESTIMATING PROPORTIONS */}
              {sampleSizeMode === 'proportions' && (
                <div className="space-y-6">
                  {/* Results Scorecards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 dark:bg-indigo-950/40 p-5 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80">
                      <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                        Priporočena velikost vzorca (n)
                      </span>
                      <span className="text-3xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                        n ≥ {requiredSampleSizeProp.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 block mt-1.5">
                        Izračunano pri pričakovanem deležu p̂ = {propBaselineP} % in meji napake m = ±{propMarginError} %.
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        Konzervativna zgornja meja (p = 0.5)
                      </span>
                      <span className="text-3xl font-mono font-black text-slate-800 dark:text-slate-200">
                        n_max = {conservativeSampleSizeProp.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1.5">
                        Največji možni n (zagotavlja mejo napake tudi ob popolni negotovosti).
                      </span>
                    </div>
                  </div>

                  {/* Input Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        Želeni rob napake (Margin of Error m)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.5"
                          min="0.2"
                          max="20"
                          value={propMarginError}
                          onChange={e => setPropMarginError(Math.max(0.1, parseFloat(e.target.value) || 3))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Npr. ±3 % za javnomnenjske ankete.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        Stopnja zaupanja (1 - α)
                      </label>
                      <select
                        value={propConfidence}
                        onChange={e => setPropConfidence(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={90}>90 % (z* = 1.645)</option>
                        <option value={95}>95 % (z* = 1.960 - Standard)</option>
                        <option value={99}>99 % (z* = 2.576)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        Pričakovani osnovni delež (p̂)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="5"
                          min="1"
                          max="99"
                          value={propBaselineP}
                          onChange={e => setPropBaselineP(Math.max(1, Math.min(99, parseFloat(e.target.value) || 50)))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-400 font-bold">%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Pri 50 % dobimo maksimalno varianco p(1-p) = 0.25.
                      </span>
                    </div>
                  </div>

                  {/* Proportions Formula Callout */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5 font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-bold block font-sans">
                      Harvardova formula za vzorčenje deleža (Pogl. 8.1.3):
                    </span>
                    <div className="text-indigo-600 dark:text-indigo-300 font-bold text-sm">
                      n = [ (z*)² · p · (1 - p) ] / m²
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] font-sans pt-1">
                      Za oceno deleža z mejo napake ±{propMarginError} % pri 95 % zaupanju potrebujemo natanko <strong>{requiredSampleSizeProp.toLocaleString()}</strong> anketirancev.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: LOGISTIC REGRESSION & SIGMOID CALCULATOR */}
        {/* ==================================================== */}
        {activeTab === 'logistic' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Logistična regresija, Sigmoid & Razmerje obetov (Odds Ratio)
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText
                      text={
                        'Pretvorba med linearnim logitom $z = \\beta_0 + \\beta_1 x$, obeti $\\text{Odds} = e^z$ in verjetnostjo $p(x) = \\frac{1}{1 + e^{-z}}$.'
                      }
                    />
                  </div>
                </div>

                {/* Preset quick buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">Primeri:</span>
                  <button
                    onClick={() => setLogitPreset('challenger')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Challenger O-obroči
                  </button>
                  <button
                    onClick={() => setLogitPreset('credit')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Kreditno tveganje
                  </button>
                  <button
                    onClick={() => setLogitPreset('spam')}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Spam filter
                  </button>
                </div>
              </div>

              {/* Real-time KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Linearni indeks (z)
                  </span>
                  <span className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {logitZ.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    logit(p) = β₀ + β₁x
                  </span>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                    Verjetnost p(x)
                  </span>
                  <span className="text-xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                    {(logitP * 100).toFixed(2)} %
                  </span>
                  <span className="text-[10px] text-indigo-500/80 dark:text-indigo-400/80 block mt-1">
                    p = 1 / (1 + e⁻ᶻ)
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Obeti (Odds)
                  </span>
                  <span className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {logitOdds > 1000 ? logitOdds.toExponential(2) : logitOdds.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Odds = p / (1 - p) = eᶻ
                  </span>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200/80 dark:border-purple-800/80">
                  <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">
                    Razmerje obetov (OR za Δx=1)
                  </span>
                  <span className="text-xl font-mono font-black text-purple-700 dark:text-purple-300">
                    {logitOddsRatio > 1000 ? logitOddsRatio.toExponential(2) : logitOddsRatio.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-purple-500/80 dark:text-purple-400/80 block mt-1">
                    OR = e^β₁ (faktor povečanja)
                  </span>
                </div>
              </div>

              {/* Canvas Visualizer */}
              <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center border border-slate-800">
                <canvas
                  ref={logisticCanvasRef}
                  width={680}
                  height={260}
                  className="w-full max-w-full rounded-xl bg-slate-950"
                />
                <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mt-2 px-2">
                  <span>Modra krivulja: Sigmoidna funkcija $p(x)$</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span>Rumena črta: Prag odločitve ($c = {logitThreshold}$)</span>
                  </span>
                </div>
              </div>

              {/* Input Sliders & Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Odsek (β₀)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={logitBeta0}
                    onChange={e => setLogitBeta0(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Izhodiščni logit pri $x=0$.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Naklon (β₁)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={logitBeta1}
                    onChange={e => setLogitBeta1(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Sprememba logitov na enoto $x$.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Vrednost napovednika (x)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={logitX}
                    onChange={e => setLogitX(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Vrednost, za katero napovedujemo $p$.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Prag klasifikacije (Threshold)
                  </label>
                  <select
                    value={logitThreshold}
                    onChange={e => setLogitThreshold(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={0.1}>0.10 (Zelo občutljiv / Visok Recall)</option>
                    <option value={0.3}>0.30 (Konzervativno zaznavanje tveganj)</option>
                    <option value={0.5}>0.50 (Standardni simetrični prag)</option>
                    <option value={0.7}>0.70 (Visoka specifičnost / Visok Precision)</option>
                    <option value={0.9}>0.90 (Le ob ekstremni gotovosti)</option>
                  </select>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Klasifikacija: {logitP >= logitThreshold ? '🟢 RAZRED 1 (POZITIVNO)' : '🔴 RAZRED 0 (NEGATIVNO)'}
                  </span>
                </div>
              </div>

              {/* Interpretation Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Matematična razlaga koeficientov logistične regresije:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>Presečišče 50 % verjetnosti:</strong>{' '}
                    <FormattedMathText
                      text={`Krivulja doseže natanko $p = 0.5$ pri $x_{0.5} = -\\frac{\\beta_0}{\\beta_1} = ${
                        logitBeta1 !== 0 ? (-logitBeta0 / logitBeta1).toFixed(2) : 'N/A'
                      }$.`}
                    />
                  </li>
                  <li>
                    <strong>Razmerje obetov (Odds Ratio):</strong>{' '}
                    <FormattedMathText
                      text={`Vsaka dodatna enota spremenljivke $x$ pomnoži obete za nastanek dogodka s faktorjem $e^{\\beta_1} = ${logitOddsRatio.toFixed(
                        3
                      )}$. ${
                        logitBeta1 > 0
                          ? `(To pomeni ${((logitOddsRatio - 1) * 100).toFixed(1)} % povečanje obetov).`
                          : `(To pomeni ${((1 - logitOddsRatio) * 100).toFixed(1)} % zmanjšanje obetov).`
                      }`}
                    />
                  </li>
                  <li>
                    <strong>Povezava s Poglavjem 9 & 10:</strong> Ocenjevanje parametrov $\beta_0, \beta_1$ se izvaja z metodo največjega verjetja (MLE) preko Fisherjevega točkovanja (Iterative Reweighted Least Squares).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 7: LINE REGRESSION DIAGNOSTICS */}
        {/* ==================================================== */}
        {activeTab === 'lineDiag' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>LINE Diagnostika & Analiza ostankov linearne regresije</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Preverjanje 4 ključnih pogojev za veljavnost sklepov v linearni regresiji: <strong>L</strong>inearnost, <strong>I</strong>ndependenca, <strong>N</strong>ormalnost ostankov in <strong>E</strong>nakost varianc (homoskedastičnost).
                  </p>
                </div>

                {/* Scenario Selector */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setLineScenario('ideal')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      lineScenario === 'ideal'
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Idealen model
                  </button>
                  <button
                    onClick={() => setLineScenario('nonlinear')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      lineScenario === 'nonlinear'
                        ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Nelinearnost (L kršena)
                  </button>
                  <button
                    onClick={() => setLineScenario('heteroscedastic')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      lineScenario === 'heteroscedastic'
                        ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Heteroskedastičnost (E kršena)
                  </button>
                  <button
                    onClick={() => setLineScenario('outliers')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      lineScenario === 'outliers'
                        ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Vzvod & vplivni osamelci
                  </button>
                  <button
                    onClick={() => setLineScenario('autocorrelation')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      lineScenario === 'autocorrelation'
                        ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Avtokorelacija (I kršena)
                  </button>
                </div>
              </div>

              {/* Dual Canvas Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Fitted Line Plot */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>1. Graf podatkov & regresijske premice</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">
                      ŷ = {lineStats.b0.toFixed(2)} + {lineStats.b1.toFixed(2)}x (R² = {(lineStats.r2 * 100).toFixed(1)} %)
                    </span>
                  </div>
                  <div className="h-56 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                    <canvas
                      ref={lineFitCanvasRef}
                      width={480}
                      height={210}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 2. Residuals Plot */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>2. Graf ostankov (Residuals vs. Fitted)</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">
                      s_e = {lineStats.se.toFixed(2)} | SSE = {lineStats.sse.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-56 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                    <canvas
                      ref={lineResCanvasRef}
                      width={480}
                      height={210}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* LINE Checklist Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* L */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lineScenario === 'nonlinear'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs">L — Linearnost</span>
                    {lineScenario === 'nonlinear' ? (
                      <XCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lineScenario === 'nonlinear'
                      ? 'KRŠENO: V grafu ostankov je jasen parabolični lok. Potrebna je transformacija (log, sqrt) ali polinomski model.'
                      : 'IZPOLNJENO: Točke v grafu ostankov so naključno razpršene okoli ničle brez očitne ukrivljenosti.'}
                  </p>
                </div>

                {/* I */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lineScenario === 'autocorrelation'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs">I — Neodvisnost</span>
                    {lineScenario === 'autocorrelation' ? (
                      <XCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lineScenario === 'autocorrelation'
                      ? 'KRŠENO: Opazovanja kažejo ciklično valovanje (avtokorelacija časovnih vrst). Standardne napake so podcenjene!'
                      : 'IZPOLNJENO: Meritve izhajajo iz preprostega slučajnega vzorčenja brez medsebojne odvisnosti.'}
                  </p>
                </div>

                {/* N */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lineScenario === 'outliers'
                    ? 'bg-rose-500/10 border-rose-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs">N — Normalnost ostankov</span>
                    {lineScenario === 'outliers' ? (
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lineScenario === 'outliers'
                      ? 'OPOZORILO: Ekstremni osamelci z visokim vzvodom (rdeče pike) močno premaknejo naklon b₁. Priporočena analiza z in brez osamelcev.'
                      : 'IZPOLNJENO: Ostanki so simetrično zvonasto razporejeni okoli ničle brez ekstremnih osamelcev.'}
                  </p>
                </div>

                {/* E */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  lineScenario === 'heteroscedastic'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs">E — Enakost varianc</span>
                    {lineScenario === 'heteroscedastic' ? (
                      <XCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lineScenario === 'heteroscedastic'
                      ? 'KRŠENO: Razpršenost ostankov se povečuje z višjimi vrednostmi x (lijakasti vzorec). Potrebna utežena regresija (WLS) ali robustni SE.'
                      : 'IZPOLNJENO: Širina razpršenosti ostankov je konstantna po celotnem območju napovednika (homoskedastičnost).'}
                  </p>
                </div>
              </div>

              {/* Teaching Guide Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Zlata pravila diagnostike iz IMS2 (Poglavje 24):</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Vzvodne točke (Leverage points):** Točke, ki so horizontalno oddaljene od povprečja $\bar{x}$. Imajo potencial, da močno povlečejo premico." />
                  </li>
                  <li>
                    <FormattedMathText text="**Vplivne točke (Influential points):** Vzvodne točke, ki dejansko spremenijo naklon regresijske premice $b_1$. Če bi premico priredili brez njih, bi bil ostanek te točke izjemno velik." />
                  </li>
                  <li>
                    <FormattedMathText text="**Zakaj je graf ostankov boljši od surovega razsevnega grafa?** Graf ostankov »odstrani« linearni trend in postavi regresijsko premico v vodoravno lego ($e = 0$), kar človeškemu očesu omogoča takojšnje zaznavanje subtilne ukrivljenosti ali neenakomerne variance." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 8: K-FOLD CROSS-VALIDATION */}
        {/* ==================================================== */}
        {activeTab === 'crossVal' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Split className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>K-kratno prečno preverjanje (K-Fold Cross-Validation)</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText text="Ocenjevanje posplošljivosti modela na neodvisnih testnih vzorcih ter preprečevanje prenaučenosti (Overfitting) z izračunom $CV\text{ }SSE$." />
                  </p>
                </div>

                {/* Model Complexity Selector */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setCvModelType('simple')}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      cvModelType === 'simple'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    1. Enostavni model (1 napovednik)
                  </button>
                  <button
                    onClick={() => setCvModelType('multivariate')}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      cvModelType === 'multivariate'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    2. Optimalni model (3 napovedniki)
                  </button>
                  <button
                    onClick={() => setCvModelType('overfit')}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      cvModelType === 'overfit'
                        ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    3. Prenaučen model (8 parametrov)
                  </button>
                </div>
              </div>

              {/* Fold Partition Canvas */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Razdelitev podatkov na 4 pregibe (K = 4)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-normal">Izberi aktivni korak:</span>
                    {[1, 2, 3, 4].map(f => (
                      <button
                        key={f}
                        onClick={() => setCvSelectedFold(f)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                          cvSelectedFold === f
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-52 bg-slate-900 rounded-2xl border border-slate-800 p-3 flex items-center justify-center relative overflow-hidden">
                  <canvas
                    ref={cvCanvasRef}
                    width={560}
                    height={190}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Metrics Grid comparing in-sample vs out-of-sample */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Učni R² (In-Sample Training)
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100 font-mono block">
                    {(trainR2 * 100).toFixed(1)} %
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {cvModelType === 'overfit'
                      ? '⚠️ Lažno visok (model se le »pifla« podatke)'
                      : 'Prileganje na učnih podatkih'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Testni R² (Out-of-Sample Test)
                  </span>
                  <span className={`text-xl font-extrabold font-mono block ${
                    avgTestR2 > 0.6 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {(avgTestR2 * 100).toFixed(1)} %
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Dejanska sposobnost napovedovanja novih enot
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Skupni CV SSE (Vsota kvadratov napak)
                  </span>
                  <span className={`text-xl font-extrabold font-mono block ${
                    cvModelType === 'multivariate'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {totalCvSse.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    <FormattedMathText text="$\\sum_{i=1}^n (\\hat{y}_{cv,i} - y_i)^2$" /> (manjši je boljši)
                  </span>
                </div>
              </div>

              {/* Interpretation Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Zakaj IMS2 poudarja prečno preverjanje pred samimi p-vrednostmi?</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Past pretirane zapletenosti:** Model z 8 napovedniki doseže osupljiv $R^2 = 94\\text{ }\\%$, a ko napoveduje na novih zadržanih podatkih, njegova napaka eksplodira ($CV\\text{ }SSE$ poskoči na preko 9.500)." />
                  </li>
                  <li>
                    <FormattedMathText text="**Parsimonija (Varčnost modela):** Optimalni model (z zmernimi, relevantnimi napovedniki) doseže najnižjo napako $CV\\text{ }SSE = 2.010$, ker se ne prilagaja naključnemu šumu v učnem vzorcu." />
                  </li>
                  <li>
                    <FormattedMathText text="**Ocena napovedovanja:** Prečno preverjanje zagotavlja neodvisno oceno točnosti napovedi brez potrebe po zbiranju popolnoma novega terenskega vzorca." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 9: TWO PROPORTIONS Z-TEST WITH POOLED PROPORTION */}
        {/* ==================================================== */}
        {activeTab === 'twoProps' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <GitCompare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Z-test za primerjavo dveh deležev z združenim deležem (p̂_pool)</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText text="Preizkušanje domneve $H_0: p_1 - p_2 = 0$ z uporabo združenega deleža $\hat{p}_{\text{pool}} = \frac{x_1 + x_2}{n_1 + n_2}$ ter 95 % interval zaupanja." />
                  </p>
                </div>

                {/* Case Study Presets from IMS2 */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setTwoPropPreset('cpr')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    CPR & strdki
                  </button>
                  <button
                    onClick={() => setTwoPropPreset('fishoil')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    Ribje olje & infarkt
                  </button>
                  <button
                    onClick={() => setTwoPropPreset('mammogram')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    Mamografija
                  </button>
                  <button
                    onClick={() => setTwoPropPreset('oppcost')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    Izgubljena priložnost
                  </button>
                </div>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Skupina 1: Uspehi (x₁)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={p1Total}
                    value={p1Count}
                    onChange={e => setP1Count(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm"
                  />
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Skupina 1: Velikost (n₁)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={p1Total}
                    onChange={e => setP1Total(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm"
                  />
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 block">
                    p̂₁ = {(twoPropStats.phat1 * 100).toFixed(2)} %
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Skupina 2: Uspehi (x₂)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={p2Total}
                    value={p2Count}
                    onChange={e => setP2Count(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm"
                  />
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Skupina 2: Velikost (n₂)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={p2Total}
                    onChange={e => setP2Total(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm"
                  />
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 block">
                    p̂₂ = {(twoPropStats.phat2 * 100).toFixed(2)} %
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Alternativna hipoteza (HA)
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'twoSided', label: 'p₁ - p₂ ≠ 0 (Dvostranska)' },
                      { id: 'greater', label: 'p₁ - p₂ > 0 (Desnostranska)' },
                      { id: 'less', label: 'p₁ - p₂ < 0 (Levostranska)' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setTwoPropTail(opt.id as any)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          twoPropTail === opt.id
                            ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 space-y-2">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block">
                    Ključni izračuni
                  </span>
                  <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-mono">
                    <div>Razlika: {(twoPropStats.diff * 100).toFixed(2)} %</div>
                    <div>p̂_pool: {(twoPropStats.phatPool * 100).toFixed(2)} %</div>
                    <div>SE_pool: {twoPropStats.sePool.toFixed(4)}</div>
                    <div className="font-bold text-rose-600 dark:text-rose-400">
                      Z-stat: {twoPropStats.zScore.toFixed(3)}
                    </div>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                      p-vrednost: {twoPropStats.pValue < 0.0001 ? '< 0.0001' : twoPropStats.pValue.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Z-Distribution Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <FormattedMathText text="Ničelna vzorčna porazdelitev pod $H_0: p_1 - p_2 = 0$ ($Z \sim N(0, 1)$)" />
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    95 % IZ za (p₁ - p₂): [{(twoPropStats.ciLower * 100).toFixed(2)} %, {(twoPropStats.ciUpper * 100).toFixed(2)} %]
                  </span>
                </div>
                <div className="h-52 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                  <canvas
                    ref={twoPropCanvasRef}
                    width={560}
                    height={190}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Interpretation Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Pomembno razlikovanje med SE za testiranje in SE za interval zaupanja (IMS2 Poglavje 17):</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Pri preizkusu hipotez ($H_0: p_1 = p_2$):** Ker privzamemo, da sta deleža enaka, moramo podatke združiti v enotni $\hat{p}_{\text{pool}} = \frac{x_1 + x_2}{n_1 + n_2}$ ter izračunati $SE_{\text{pool}} = \sqrt{\hat{p}_{\text{pool}}(1-\hat{p}_{\text{pool}})(\frac{1}{n_1} + \frac{1}{n_2})}$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Pri intervalu zaupanja:** Ne privzemamo veljavnosti $H_0$, temveč želimo oceniti neznano razliko $p_1 - p_2$, zato uporabimo ločeni oceni: $SE_{\text{CI}} = \sqrt{\frac{\hat{p}_1(1-\hat{p}_1)}{n_1} + \frac{\hat{p}_2(1-\hat{p}_2)}{n_2}}$." />
                  </li>
                  <li>
                    <FormattedMathText text={`**Pogoj uspehov in neuspehov:** V vsaki skupini mora biti vsaj 10 pričakovanih uspehov in 10 neuspehov ($n_1\\hat{p}_{\\text{pool}} \\ge 10$, $n_1(1-\\hat{p}_{\\text{pool}}) \\ge 10$, $n_2\\hat{p}_{\\text{pool}} \\ge 10$, $n_2(1-\\hat{p}_{\\text{pool}}) \\ge 10$). Pogoji so trenutno: ${
                      twoPropStats.conditionsMet ? '✅ IZPOLNJENI' : '⚠️ KRŠENI (uporabi randomizacijski test!)'
                    }.`} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 10: ANOVA & POST-HOC COMPARISONS (TUKEY / BONF) */}
        {/* ==================================================== */}
        {activeTab === 'anova' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Enosmerna analiza variance (ANOVA) & Post-Hoc testi</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText text="Primerjava povprečij $k \ge 3$ skupin z razcepom variabilnosti ($SST = SSG + SSE$) in nadzorom napake prve vrste ($FWER$)." />
                  </p>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setAnovaPreset('baseball')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    Položaji v baseballu
                  </button>
                  <button
                    onClick={() => setAnovaPreset('teaching')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    3 učne metode
                  </button>
                  <button
                    onClick={() => setAnovaPreset('dosage')}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    Odmerki zdravila
                  </button>
                </div>
              </div>

              {/* Group Inputs Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Skupine vzorcev (k = {anovaStats.k}, Skupni N = {anovaStats.totalN}, Skupno povprečje x̄ = {anovaStats.grandMean.toFixed(3)})</span>
                  <button
                    onClick={() => {
                      if (anovaGroups.length < 5) {
                        setAnovaGroups([
                          ...anovaGroups,
                          { id: String(Date.now()), name: `Skupina ${anovaGroups.length + 1}`, n: 30, mean: 50.0, sd: 8.0 },
                        ]);
                      }
                    }}
                    disabled={anovaGroups.length >= 5}
                    className="text-xs px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 disabled:opacity-40"
                  >
                    + Dodaj skupino (maks 5)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {anovaGroups.map((g, idx) => (
                    <div key={g.id} className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={g.name}
                          onChange={e => {
                            const val = e.target.value;
                            setAnovaGroups(anovaGroups.map(item => item.id === g.id ? { ...item, name: val } : item));
                          }}
                          className="font-bold text-xs bg-transparent border-b border-dashed border-slate-400 dark:border-slate-600 text-slate-900 dark:text-slate-100 w-36 outline-hidden"
                        />
                        {anovaGroups.length > 3 && (
                          <button
                            onClick={() => setAnovaGroups(anovaGroups.filter(item => item.id !== g.id))}
                            className="text-slate-400 hover:text-rose-500 text-xs font-bold"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 block">n</span>
                          <input
                            type="number"
                            min={2}
                            value={g.n}
                            onChange={e => {
                              const val = Math.max(2, parseInt(e.target.value) || 2);
                              setAnovaGroups(anovaGroups.map(item => item.id === g.id ? { ...item, n: val } : item));
                            }}
                            className="w-full px-1.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">x̄</span>
                          <input
                            type="number"
                            step="0.01"
                            value={g.mean}
                            onChange={e => {
                              const val = parseFloat(e.target.value) || 0;
                              setAnovaGroups(anovaGroups.map(item => item.id === g.id ? { ...item, mean: val } : item));
                            }}
                            className="w-full px-1.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">s</span>
                          <input
                            type="number"
                            min={0.001}
                            step="0.01"
                            value={g.sd}
                            onChange={e => {
                              const val = Math.max(0.001, parseFloat(e.target.value) || 0.001);
                              setAnovaGroups(anovaGroups.map(item => item.id === g.id ? { ...item, sd: val } : item));
                            }}
                            className="w-full px-1.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ANOVA Summary Table & F-distribution Canvas */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    ANOVA Tabela razcepa variabilnosti
                  </span>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="p-2.5">Vir</th>
                          <th className="p-2.5 font-mono">df</th>
                          <th className="p-2.5 font-mono">Vsota kvadratov (SS)</th>
                          <th className="p-2.5 font-mono">Povpr. kvadrat (MS)</th>
                          <th className="p-2.5 font-mono">F-stat</th>
                          <th className="p-2.5 font-mono">p-vrednost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-800 dark:text-slate-200">
                        <tr className="bg-indigo-50/40 dark:bg-indigo-950/20">
                          <td className="p-2.5 font-sans font-bold text-indigo-700 dark:text-indigo-300">Med skupinami (MSG)</td>
                          <td className="p-2.5">{anovaStats.dfG}</td>
                          <td className="p-2.5">{anovaStats.ssg.toFixed(4)}</td>
                          <td className="p-2.5">{anovaStats.msg.toFixed(4)}</td>
                          <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">{anovaStats.fStat.toFixed(3)}</td>
                          <td className="p-2.5 font-bold text-indigo-600 dark:text-indigo-400">
                            {anovaStats.pValue < 0.0001 ? '< 0.0001' : anovaStats.pValue.toFixed(4)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-sans">Znotraj skupin (MSE)</td>
                          <td className="p-2.5">{anovaStats.dfE}</td>
                          <td className="p-2.5">{anovaStats.sse.toFixed(4)}</td>
                          <td className="p-2.5">{anovaStats.mse.toFixed(4)}</td>
                          <td className="p-2.5 text-slate-400">—</td>
                          <td className="p-2.5 text-slate-400">—</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800/40 font-bold">
                          <td className="p-2.5 font-sans">Skupaj (SST)</td>
                          <td className="p-2.5">{anovaStats.dfT}</td>
                          <td className="p-2.5">{anovaStats.sst.toFixed(4)}</td>
                          <td className="p-2.5 text-slate-400">—</td>
                          <td className="p-2.5 text-slate-400">—</td>
                          <td className="p-2.5 text-slate-400">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>F-porazdelitev (df₁={anovaStats.dfG}, df₂={anovaStats.dfE})</span>
                    <span className={`text-xs font-semibold ${anovaStats.pValue < 0.05 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {anovaStats.pValue < 0.05 ? 'Zavrnemo H₀ (Razlika obstaja)' : 'Ni dokaza za razliko'}
                    </span>
                  </div>
                  <div className="h-44 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                    <canvas
                      ref={anovaCanvasRef}
                      width={440}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Post-Hoc Pairwise Comparisons Matrix */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Post-Hoc Parne primerjave (Bonferronijev popravek: α* = 0.05 / {anovaStats.numPairs} = {anovaStats.bonferroniAlpha.toFixed(4)})
                  </span>
                  <span className="text-[11px] text-slate-500">
                    SE_diff = √(MSE · (1/n₁ + 1/n₂)) = {anovaStats.pairs[0]?.se.toFixed(4) || '—'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {anovaStats.pairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                        pair.significantBonf
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[170px]">
                          {pair.g1} vs. {pair.g2}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pair.significantBonf
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {pair.significantBonf ? 'ZNAČILNO' : 'Neznačilno'}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400 space-y-0.5">
                        <div>Razlika (x̄₁ - x̄₂): {pair.diff.toFixed(3)}</div>
                        <div>t-vrednost: {pair.tVal.toFixed(3)}</div>
                        <div className="text-[11px]">95% IZ: [{pair.ciLower.toFixed(3)}, {pair.ciUpper.toFixed(3)}]</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Guide Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Ključna načela analize variance iz IMS2 (Poglavje 22):</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Zakaj ne naredimo preprosto več t-testov?** Če imamo $k=4$ skupine (6 parov) in pri vsakem testiramo z $\alpha = 0.05$, naraste skupna verjetnost vsaj ene lažne pozitivne ugotovitve (FWER) na $1 - (1-0.05)^6 = 26.5\\%$! ANOVA najprej z enim globalnim testom $F$ preveri, ali sploh obstajajo razlike." />
                  </li>
                  <li>
                    <FormattedMathText text="**Pogoj enakosti varianc:** Skupine morajo imeti primerljive standardne odklone. Praktično pravilo IMS2 določa: $s_{\\max} / s_{\\min} < 2$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Tukey HSD vs. Bonferroni:** Bonferronijev popravek ($\alpha^* = \alpha / m$) je konzervativen, a univerzalno veljaven; Tukeyjeva metoda HSD pa zagotavlja natančne intervale zaupanja ob ohranjanju skupne stopnje napake $\alpha = 0.05$." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 11: POISSON REGRESSION (GLM & RATE RATIOS) */}
        {/* ==================================================== */}
        {activeTab === 'poisson' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Poissonova regresija & Stopnje dogodkov (GLM)</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText text="Modeliranje števnih podatkov ($Y \in \{0, 1, 2, \dots\}$) z logaritemsko povezovalno funkcijo $\ln(\lambda) = \beta_0 + \beta_1 x$ in razmerji stopenj ($RR = e^{\beta_1}$)." />
                  </p>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setPoissonModelPreset('traffic')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      poissonPreset === 'traffic'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Prometne nesreče
                  </button>
                  <button
                    onClick={() => setPoissonModelPreset('hospital')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      poissonPreset === 'hospital'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Obiski urgence (PM2.5)
                  </button>
                  <button
                    onClick={() => setPoissonModelPreset('radiation')}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      poissonPreset === 'radiation'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Celične mutacije
                  </button>
                </div>
              </div>

              {/* Controls & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Začetna stopnja (β₀ = {poissonBeta0.toFixed(2)})
                  </label>
                  <input
                    type="range"
                    min={-1.5}
                    max={2.0}
                    step={0.05}
                    value={poissonBeta0}
                    onChange={e => setPoissonBeta0(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                    Izhodišče: e^β₀ = {Math.exp(poissonBeta0).toFixed(2)} dogodkov
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Koeficient naklona (β₁ = {poissonBeta1.toFixed(2)})
                  </label>
                  <input
                    type="range"
                    min={-0.8}
                    max={0.8}
                    step={0.02}
                    value={poissonBeta1}
                    onChange={e => setPoissonBeta1(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                    Razmerje stopenj RR = {poissonStats.rateRatio.toFixed(3)}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Raven napovednika (x = {poissonX.toFixed(1)})
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={8.0}
                    step={0.1}
                    value={poissonX}
                    onChange={e => setPoissonX(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 block font-mono font-bold">
                    Pričakovana stopnja λ = {poissonStats.currentRate.toFixed(2)}
                  </span>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 space-y-1.5 text-xs">
                  <span className="font-bold text-indigo-950 dark:text-indigo-200 block">
                    Interpretacija stopnje (RR)
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 font-mono text-[11px] leading-relaxed">
                    Vsako povečanje x za +1 enoto spremeni stopnjo dogodkov za:{' '}
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {poissonStats.pctChange >= 0 ? `+${poissonStats.pctChange.toFixed(1)} %` : `${poissonStats.pctChange.toFixed(1)} %`}
                    </span>{' '}
                    (multiplikator {poissonStats.rateRatio.toFixed(3)}×).
                  </div>
                </div>
              </div>

              {/* Dual Canvas: Rate Curve & Discrete Poisson PMF */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Levo: Eksponentna krivulja stopnje λ(x) | Desno: Verjetnostna porazdelitev P(Y = k | λ = {poissonStats.currentRate.toFixed(2)})</span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    Modalna vrednost (najbolj verjetno število): {Math.floor(poissonStats.currentRate)} dogodkov
                  </span>
                </div>
                <div className="h-56 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                  <canvas
                    ref={poissonCanvasRef}
                    width={600}
                    height={210}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Teaching Guide Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Kdaj in zakaj uporabiti Poissonovo regresijo (IMS2 Poglavje 26)?</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Nezmožnost linearne regresije za števce:** Linearna regresija bi lahko napovedala negativno število dogodkov ($\hat{y} < 0$), kar je pri števnih podatkih (prometne nesreče, klici na pomoč) nesmiselno. Logaritemska povezovalna funkcija $\lambda = e^{\beta_0 + \beta_1 x}$ garantira $\lambda > 0$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Lastnost enakosti povprečja in variance:** Poissonov model privzema $\text{Var}(Y) = \text{E}(Y) = \lambda$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Prekomerna razpršenost (Overdispersion):** Če v podatkih velja $\text{Var}(Y) > \text{E}(Y)$ (zelo pogosto v praksi), so standardne napake Poissonovega modela podcenjene. Rešitev na doktorski ravni je prehod na kvazi-Poissonov model ali negativno binomsko regresijo." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 12: DATA TRANSFORMATIONS & TUKEY POWER LADDER */}
        {/* ==================================================== */}
        {activeTab === 'transform' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Transformacije podatkov & Tukeyjeva lestvica potenc</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText text="Linealizacija nelinearnih zvez in stabilizacija variance z uporabo Box-Cox/Tukeyjeve lestvice ($y' = y^2, y, \sqrt{y}, \ln(y), -1/y$)." />
                  </p>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
                  <button
                    onClick={() => { setTransformDataset('house_prices'); setTransformLambda(0); }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      transformDataset === 'house_prices'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Cene nepremičnin
                  </button>
                  <button
                    onClick={() => { setTransformDataset('stopping'); setTransformLambda(0.5); }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      transformDataset === 'stopping'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Zavorna pot vozila
                  </button>
                  <button
                    onClick={() => { setTransformDataset('bacteria'); setTransformLambda(-1); }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      transformDataset === 'bacteria'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Obratno upadanje (-1/y)
                  </button>
                </div>
              </div>

              {/* Power Ladder Selector */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Izbira transformacije na Tukeyjevi lestvici (Trenutno: λ = {transformLambda})
                  </span>
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {transformLambda === 2 && 'y² (Kvadratna)'}
                    {transformLambda === 1 && 'y (Brez transformacije — Izvirni podatki)'}
                    {transformLambda === 0.5 && '√y (Kvadratni koren)'}
                    {transformLambda === 0 && 'ln(y) (Naravni logaritem — Najbolj pogosto)'}
                    {transformLambda === -1 && '-1/y (Obratna vrednost)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { lambda: -1, label: '-1/y (Obratna)', desc: 'Ekstremna desna asimetrija' },
                    { lambda: 0, label: 'ln(y) (Log)', desc: 'Multiplikativna rast, cene' },
                    { lambda: 0.5, label: '√y (Koren)', desc: 'Števni podatki, površine' },
                    { lambda: 1, label: 'y (Linearno)', desc: 'Brez spremembe' },
                    { lambda: 2, label: 'y² (Kvadrat)', desc: 'Leva asimetrija' },
                  ].map(item => (
                    <button
                      key={item.lambda}
                      onClick={() => setTransformLambda(item.lambda)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        transformLambda === item.lambda
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-xs">{item.label}</div>
                      <div className={`text-[10px] ${transformLambda === item.lambda ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Canvas Visualizer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Primerjava: Izvirna nelinearna porazdelitev (levo) proti Transformiranemu modelu (desno)</span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                    Izboljšava R²: {(transformStats.r2 * 100).toFixed(1)} % (Korelacija r = {transformStats.r.toFixed(3)})
                  </span>
                </div>
                <div className="h-56 bg-slate-900 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                  <canvas
                    ref={transformCanvasRef}
                    width={600}
                    height={210}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Metrics Grid before and after */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Asimetrija izvirnih podatkov (Skewness)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-amber-600 dark:text-amber-400 block">
                    {transformStats.skewRaw.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {transformStats.skewRaw > 1 ? 'Močna desna asimetrija' : 'Zmerna asimetrija'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Asimetrija po transformaciji
                  </span>
                  <span className={`text-xl font-extrabold font-mono block ${
                    Math.abs(transformStats.skewTrans) < 0.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {transformStats.skewTrans.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {Math.abs(transformStats.skewTrans) < 0.5 ? '✅ Približno simetrično (Gaussovo)' : 'Še vedno prisotna asimetrija'}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                    Prileganje premice (R²)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
                    {(transformStats.r2 * 100).toFixed(1)} %
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Delež pojasnjene variabilnosti po transformaciji
                  </span>
                </div>
              </div>

              {/* Teaching Guide Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Pravila interpretacije logaritemskih regresijskih modelov (IMS2 Poglavje 24):</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                  <li>
                    <FormattedMathText text="**Log-Linearni model ($\ln(y) = \beta_0 + \beta_1 x$):** Vsaka sprememba $x$ za $+1$ enoto v povprečju povzroči $(e^{\beta_1} - 1) \cdot 100\\%$ (približno $100 \cdot \beta_1\\%$) relativno spremembo odzivne spremenljivke $y$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Log-Log model ($\ln(y) = \beta_0 + \beta_1 \ln(x)$):** Naklon $\beta_1$ predstavlja neposredno **elastičnost**: $1\\%$ sprememba $x$ povzroči $\beta_1\\%$ spremembo $y$." />
                  </li>
                  <li>
                    <FormattedMathText text="**Opozorilo pri nazaj-transformaciji (Back-transformation):** Preprosto eksponentiranje napovedi $\hat{y} = e^{\widehat{\ln(y)}}$ oceni mediano namesto povprečja (zaradi Jensenove neenakosti: $\text{E}[e^X] \ge e^{\text{E}[X]}$)." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 13: REGRESSION CONFIDENCE & PREDICTION INTERVALS */}
        {/* ==================================================== */}
        {activeTab === 'regIntervals' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header & Harvard Scenarios */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Crosshair className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <FormattedMathText text="Regresijski intervali: Zaupanje za $E(Y|x)$ proti Predikciji za posameznika $\\hat{Y}|x$" />
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <FormattedMathText
                      text="Harvard Poglavje 7.3.3 & 8.5: Razlika med negotovostjo same premice $\\text{SE}_{\\text{mean}} = s_e \\sqrt{\\frac{1}{n} + \\frac{(x_0 - \\bar{x})^2}{\\text{SS}_x}}$ in negotovostjo posameznega bodočega opazovanja $\\text{SE}_{\\text{pred}} = s_e \\sqrt{1 + \\frac{1}{n} + \\frac{(x_0 - \\bar{x})^2}{\\text{SS}_x}}$."
                    />
                  </div>
                </div>

                {/* Preset buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">Primeri:</span>
                  <button
                    onClick={() => handleRegIntPreset('height')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      regIntPreset === 'height'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Višina sinov (Galton)
                  </button>
                  <button
                    onClick={() => handleRegIntPreset('bloodPressure')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      regIntPreset === 'bloodPressure'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Krvni tlak & Odmerek
                  </button>
                  <button
                    onClick={() => handleRegIntPreset('mileage')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      regIntPreset === 'mileage'
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    Masa & Poraba goriva
                  </button>
                  <button
                    onClick={() => setRegIntSeed(s => s + 1)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                    title="Generiraj nov naključen vzorec"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Real-time KPI Comparison Scorecards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Point Estimate */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    <FormattedMathText text="Točkovna napoved $\\hat{y}_0$" />
                  </span>
                  <div className="text-xl font-mono font-black text-slate-900 dark:text-slate-100">
                    {regIntData.yHat0.toFixed(2)} {regIntData.yUnit}
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    pri x₀ = {regIntX0} {regIntData.xUnit} (Premica: ŷ = {regIntData.b0.toFixed(2)} + {regIntData.b1.toFixed(2)}x)
                  </span>
                </div>

                {/* 2. Confidence Interval for Mean Response */}
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
                    <FormattedMathText text={`**${regIntConfidence} % CI za Povprečje $E(Y|x_0)$**`} />
                  </span>
                  <div className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-300">
                    [{regIntData.ciMeanLower.toFixed(2)}; {regIntData.ciMeanUpper.toFixed(2)}]
                  </div>
                  <span className="text-[10px] text-emerald-600/90 dark:text-emerald-400/90 block">
                    Širina = <strong>{regIntData.ciMeanWidth.toFixed(2)}</strong> {regIntData.yUnit} (SE = {regIntData.seMean.toFixed(2)})
                  </span>
                </div>

                {/* 3. Prediction Interval for Individual Observation */}
                <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200/80 dark:border-purple-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 block">
                    <FormattedMathText text={`**${regIntConfidence} % Predikcijski za posameznika $\\hat{Y}|x_0$**`} />
                  </span>
                  <div className="text-sm font-mono font-black text-purple-800 dark:text-purple-300">
                    [{regIntData.piIndivLower.toFixed(2)}; {regIntData.piIndivUpper.toFixed(2)}]
                  </div>
                  <span className="text-[10px] text-purple-600/90 dark:text-purple-400/90 block">
                    Širina = <strong>{regIntData.piIndivWidth.toFixed(2)}</strong> {regIntData.yUnit} (SE = {regIntData.sePred.toFixed(2)})
                  </span>
                </div>

                {/* 4. Ratio of Widths */}
                <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 block">
                    <FormattedMathText text="Faktor razširitve ($W_{\\text{pred}} / W_{\\text{mean}}$)" />
                  </span>
                  <div className="text-xl font-mono font-black text-indigo-700 dark:text-indigo-300">
                    {regIntData.widthRatio.toFixed(2)} × širši
                  </div>
                  <span className="text-[10px] text-indigo-500/80 dark:text-indigo-400/80 block">
                    Zaradi naravnega šuma se = {regIntData.se.toFixed(2)} posameznika
                  </span>
                </div>
              </div>

              {/* Canvas Visualizer */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Vizualizacija hiperboličnih intervalskih pasov (R² = {(regIntData.r2 * 100).toFixed(1)} %, n = {regIntData.n}, df = {regIntData.df}):
                  </span>
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-emerald-500/40 border border-emerald-500 inline-block"></span>
                      <FormattedMathText text="CI za povprečje $E(Y|x)$" />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-purple-500/20 border border-purple-400 border-dashed inline-block"></span>
                      <FormattedMathText text="Predikcijski pas $\\hat{Y}|x$" />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-indigo-500 inline-block"></span>
                      <span className="text-slate-600 dark:text-slate-400">Regresijska premica</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                      <FormattedMathText text="Podatki ($x_i, y_i$)" />
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                      <FormattedMathText text="Poizvedba $x_0$" />
                    </span>
                  </div>
                </div>

                <div className="h-72 sm:h-80 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
                  <canvas
                    ref={regIntCanvasRef}
                    width={720}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Interactive Control Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                {/* Control 1: Query point x0 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <label className="text-slate-700 dark:text-slate-300">
                      <FormattedMathText text="Točka poizvedbe $x_0$:" />
                    </label>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">
                      {regIntX0} {regIntData.xUnit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={regIntData.minX}
                    max={regIntData.maxX}
                    step={regIntPreset === 'mileage' ? 0.05 : 1}
                    value={regIntX0}
                    onChange={e => setRegIntX0(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Razdalja od povprečja |x₀ - x̄| = {Math.abs(regIntX0 - regIntData.xBar).toFixed(2)}
                  </span>
                </div>

                {/* Control 2: Sample size n */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <label className="text-slate-700 dark:text-slate-300">
                      <FormattedMathText text="Velikost vzorca ($n$):" />
                    </label>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">
                      {regIntN}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={60}
                    step={2}
                    value={regIntN}
                    onChange={e => setRegIntN(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Prostostne stopnje: df = n - 2 = {regIntData.df}
                  </span>
                </div>

                {/* Control 3: Residual Standard Error s_e */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <label className="text-slate-700 dark:text-slate-300">
                      <FormattedMathText text="Rezidualni šum ($s_e$):" />
                    </label>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">
                      {regIntNoise.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={regIntPreset === 'mileage' ? 0.2 : 1.0}
                    max={regIntPreset === 'mileage' ? 2.5 : 12.0}
                    step={regIntPreset === 'mileage' ? 0.05 : 0.2}
                    value={regIntNoise}
                    onChange={e => setRegIntNoise(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    <FormattedMathText text="Variabilnost točk okoli premice $\\sigma_\\epsilon$" />
                  </span>
                </div>

                {/* Control 4: Confidence Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    <FormattedMathText text="Stopnja zaupanja ($1 - \\alpha$):" />
                  </label>
                  <select
                    value={regIntConfidence}
                    onChange={e => setRegIntConfidence(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={90}>90 % (Kritični t* = {getStudentTCritical(90, regIntData.df).toFixed(3)})</option>
                    <option value={95}>95 % (Kritični t* = {getStudentTCritical(95, regIntData.df).toFixed(3)})</option>
                    <option value={99}>99 % (Kritični t* = {getStudentTCritical(99, regIntData.df).toFixed(3)})</option>
                  </select>
                  <span className="text-[10px] text-slate-400 block">
                    <FormattedMathText text="$t^*_{df}$ za obojestranski interval" />
                  </span>
                </div>
              </div>

              {/* Mathematical Theory & Pedagogical Insight Box */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-3">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-indigo-500" />
                  <span>Matematična razlika med intervalom za povprečje in predikcijskim intervalom (Harvard Pogl. 8.5):</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Left: Confidence Interval Formula */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <FormattedMathText text="**1. Interval zaupanja za povprečni odziv $E(Y \mid x_0)$**" />
                    </div>
                    <div className="font-mono text-emerald-800 dark:text-emerald-300 text-xs">
                      <FormattedMathText text="$\\hat{y}_0 \\pm t^*_{df} \\cdot s_e \\sqrt{\\frac{1}{n} + \\frac{(x_0 - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}$" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Kadar želimo oceniti <strong>povprečje celotne populacije</strong> enot z določeno vrednostjo $x_0$ (npr. povprečna višina vseh sinov očetov z višino 175 cm). Z naraščanjem vzorca $n \to \infty$ se ta interval skrči proti točki (širina $\to 0$).
                    </p>
                  </div>

                  {/* Right: Prediction Interval Formula */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 space-y-2">
                    <div className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <FormattedMathText text="**2. Predikcijski interval za novega posameznika $\\hat{Y} \\mid x_0$**" />
                    </div>
                    <div className="font-mono text-purple-800 dark:text-purple-300 text-xs">
                      <FormattedMathText text="$\\hat{y}_0 \\pm t^*_{df} \\cdot s_e \\sqrt{\\mathbf{1} + \\frac{1}{n} + \\frac{(x_0 - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}$" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Kadar napovedujemo izid za <strong>enega samega novega bolnika ali enoto</strong>. Dodatni člen $1$ pod korenom predstavlja neizogibni intrinzični šum posameznika ($\sigma_\epsilon$). Tudi če imamo neskončen vzorec ($n = \infty$), je širina intervala še vedno vsaj $\pm t^* s_e$!
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-[11px] space-y-1">
                  <strong>💡 Zakaj sta oba pasova hiperbolične (ukrivljene) oblike?</strong>
                  <p>
                    <FormattedMathText text={`Člen $\\frac{(x_0 - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}$ povzroči, da sta oba intervala *najožja točno na težišču vzorca* ($x_0 = \\bar{x} = ${regIntData.xBar.toFixed(1)}$). Bolj ko se oddaljujemo od sredine podatkov proti robom (ali izven območja meritev — nevarna ekstrapolacija), bolj se negotovost nagiba premice povečuje in intervali eksponentno razširijo!`} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
