import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FormattedMathText } from './FormattedMathText';
import {
  Eye,
  EyeOff,
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Circle,
  RefreshCw,
  Sparkles,
  Info,
  Maximize2,
  HelpCircle,
  Split,
  Layers,
  Palette,
  LayoutGrid,
  Target,
  LineChart,
  Table as TableIcon
} from 'lucide-react';

interface DataVizLabProps {
  onBack?: () => void;
  onSelectUnit?: (unitId: string) => void;
}

type VizSubTab = 'cleveland' | 'anscombe' | 'dualAxis' | 'colorVision' | 'faceting' | 'modelViz';

export const DataVizLab: React.FC<DataVizLabProps> = ({ onBack, onSelectUnit }) => {
  const [activeSubTab, setActiveSubTab] = useState<VizSubTab>('cleveland');

  // =========================================================================
  // 5. FACETING & SPAGHETTI PLOT STATE
  // =========================================================================
  type FacetMode = 'spaghetti' | 'highlight' | 'facets';
  const [facetMode, setFacetMode] = useState<FacetMode>('facets');
  const [focusCountry, setFocusCountry] = useState<string>('Slovenija');
  const [showEUBenchmark, setShowEUBenchmark] = useState<boolean>(true);

  const countriesData = useMemo(() => [
    { name: 'Slovenija', color: '#6366f1', values: [100, 103.2, 106.5, 111.8, 116.4, 120.5, 114.8, 124.2, 127.3, 129.8, 132.5] },
    { name: 'Nemčija', color: '#e11d48', values: [100, 101.8, 104.1, 106.8, 108.2, 109.5, 104.5, 107.8, 109.2, 108.9, 109.1] },
    { name: 'Avstrija', color: '#f59e0b', values: [100, 101.2, 103.4, 106.1, 108.9, 110.4, 103.2, 108.1, 113.2, 112.5, 113.8] },
    { name: 'Francija', color: '#06b6d4', values: [100, 101.1, 102.5, 105.1, 107.0, 108.9, 100.2, 106.8, 109.5, 110.8, 111.9] },
    { name: 'Italija', color: '#10b981', values: [100, 100.8, 102.3, 104.0, 105.2, 105.9, 96.4, 104.5, 108.4, 109.5, 110.2] },
    { name: 'Španija', color: '#8b5cf6', values: [100, 103.8, 107.0, 110.2, 112.8, 115.0, 102.1, 108.8, 115.1, 118.0, 121.2] },
    { name: 'Poljska', color: '#ec4899', values: [100, 104.2, 107.5, 113.1, 119.2, 124.8, 122.3, 130.6, 137.5, 139.2, 143.5] },
    { name: 'Švedska', color: '#14b8a6', values: [100, 104.5, 106.8, 109.2, 111.4, 113.6, 111.1, 117.8, 119.5, 118.9, 120.4] },
    { name: 'Združeno kraljestvo', color: '#f97316', values: [100, 102.4, 104.5, 106.9, 108.5, 110.1, 98.6, 107.2, 111.8, 112.1, 113.0] },
    { name: 'Nizozemska', color: '#84cc16', values: [100, 102.0, 104.3, 107.4, 110.1, 112.3, 108.0, 114.6, 119.6, 120.2, 121.5] },
    { name: 'Češka', color: '#3b82f6', values: [100, 105.4, 108.2, 113.8, 117.4, 121.0, 114.5, 118.6, 121.4, 120.8, 122.1] },
    { name: 'Irska', color: '#22c55e', values: [100, 125.2, 128.4, 140.2, 152.1, 160.4, 170.2, 194.5, 212.8, 208.5, 215.2] }
  ], []);

  const yearsList = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const euAverageValues = [100, 102.2, 104.5, 107.5, 109.8, 111.9, 105.1, 111.3, 115.1, 115.8, 117.2];

  // =========================================================================
  // 6. MODEL UNCERTAINTY & FOREST PLOTS STATE (Healy Ch. 6)
  // =========================================================================
  type ModelViewMode = 'forest' | 'table';
  const [modelViewMode, setModelViewMode] = useState<ModelViewMode>('forest');
  const [confidenceLevel, setConfidenceLevel] = useState<90 | 95 | 99>(95);
  const [activeModelSelection, setActiveModelSelection] = useState<'both' | 'm1' | 'm2'>('both');

  const zCrit = confidenceLevel === 90 ? 1.645 : confidenceLevel === 95 ? 1.96 : 2.576;

  const regressionPredictors = useMemo(() => [
    {
      id: 'educ',
      name: 'Izobrazba (leta šolanja)',
      m1: { estimate: 8.4, se: 1.1, p: '< 0.001' },
      m2: { estimate: 5.1, se: 0.9, p: '< 0.001' },
      note: 'Po kontroli za delovne izkušnje in veščine se ocena učinka zmanjša, a ostaja krepko pozitivna.'
    },
    {
      id: 'exper',
      name: 'Delovne izkušnje (leta)',
      m1: { estimate: 4.8, se: 0.8, p: '< 0.001' },
      m2: { estimate: 3.4, se: 0.6, p: '< 0.001' },
      note: 'Pozitiven donos na vsako leto izkušenj ob enaki ravni izobrazbe.'
    },
    {
      id: 'skills',
      name: 'Tehnične & Digitalne veščine',
      m1: null,
      m2: { estimate: 14.6, se: 2.2, p: '< 0.001' },
      note: 'Močan neodvisni napovednik višjega dohodka.'
    },
    {
      id: 'leader',
      name: 'Vodstvene kompetence',
      m1: null,
      m2: { estimate: 7.2, se: 1.6, p: '< 0.001' },
      note: 'Statistično značilna premija za vodenje projektov.'
    },
    {
      id: 'age',
      name: 'Starost (leta)',
      m1: null,
      m2: { estimate: -0.3, se: 0.5, p: '0.548 (n.s.)' },
      note: 'Interval prečka ničlo! Ko kontroliramo za delovne izkušnje, starost nima samostojnega učinka.'
    },
    {
      id: 'urban',
      name: 'Regija: Urbano središče (vs. Podeželje)',
      m1: { estimate: 17.5, se: 3.2, p: '< 0.001' },
      m2: { estimate: 6.8, se: 2.8, p: '0.015' },
      note: 'Surova razlika 17.5 % pade na 6.8 %, ko upoštevamo koncentracijo višje izobraženih v mestih.'
    }
  ], []);

  // =========================================================================
  // 1. CLEVELAND-MCGILL PERCEPTUAL EXPERIMENT STATE
  // =========================================================================
  type TaskType = 'position' | 'length' | 'angle' | 'area';
  const [taskType, setTaskType] = useState<TaskType>('position');
  const [valA, setValA] = useState<number>(76);
  const [valB, setValB] = useState<number>(32);
  const [userGuess, setUserGuess] = useState<number>(50);
  const [checked, setChecked] = useState<boolean>(false);
  const [history, setHistory] = useState<
    { task: TaskType; trueVal: number; guess: number; absErr: number; logErr: number }[]
  >([]);

  const clevelandCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate new random task
  const generateNewTask = (type = taskType) => {
    // Generate two values where one is larger
    const big = Math.floor(65 + Math.random() * 30);
    const smallRatio = 0.2 + Math.random() * 0.65; // ratio between 20% and 85%
    const small = Math.round(big * smallRatio);
    setValA(big);
    setValB(small);
    setUserGuess(50);
    setChecked(false);
    setTaskType(type);
  };

  const trueRatioPct = Math.round((Math.min(valA, valB) / Math.max(valA, valB)) * 100);

  const handleCheckGuess = () => {
    if (checked) return;
    const absErr = Math.abs(userGuess - trueRatioPct);
    const logErr = Math.log2(absErr + 0.125);
    setHistory(prev => [
      { task: taskType, trueVal: trueRatioPct, guess: userGuess, absErr, logErr },
      ...prev.slice(0, 9)
    ]);
    setChecked(true);
  };

  // Render Cleveland canvas
  useEffect(() => {
    const canvas = clevelandCanvasRef.current;
    if (!canvas || activeSubTab !== 'cleveland') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background styling
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    const bigVal = Math.max(valA, valB);
    const smallVal = Math.min(valA, valB);

    if (taskType === 'position') {
      // 1. Position on common baseline
      const baselineY = h - 60;
      const barW = 55;
      const maxH = h - 130;

      const h1 = (bigVal / 100) * maxH;
      const h2 = (smallVal / 100) * maxH;

      // Draw baseline
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, baselineY);
      ctx.lineTo(w - 40, baselineY);
      ctx.stroke();

      // Bar 1 (Big)
      const x1 = w * 0.35 - barW / 2;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x1, baselineY - h1, barW, h1);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Lik A (100 %)', x1 + barW / 2, baselineY + 25);
      if (checked) {
        ctx.fillStyle = '#a5b4fc';
        ctx.fillText(`${bigVal} enot`, x1 + barW / 2, baselineY - h1 - 10);
      }

      // Bar 2 (Small)
      const x2 = w * 0.65 - barW / 2;
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(x2, baselineY - h2, barW, h2);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Lik B (?)', x2 + barW / 2, baselineY + 25);
      if (checked) {
        ctx.fillStyle = '#fbcfe8';
        ctx.fillText(`${smallVal} enot (${trueRatioPct} %)`, x2 + barW / 2, baselineY - h2 - 10);
      }
    } else if (taskType === 'length') {
      // 2. Length (unaligned baseline)
      const barW = 50;
      const maxH = h - 140;

      const h1 = (bigVal / 100) * maxH;
      const h2 = (smallVal / 100) * maxH;

      // Bar 1 at arbitrary y
      const yBase1 = h - 50;
      const x1 = w * 0.35 - barW / 2;
      ctx.fillStyle = '#6366f1';
      ctx.fillRect(x1, yBase1 - h1, barW, h1);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Lik A (100 %)', x1 + barW / 2, yBase1 + 25);
      if (checked) {
        ctx.fillStyle = '#a5b4fc';
        ctx.fillText(`${bigVal} enot`, x1 + barW / 2, yBase1 - h1 - 10);
      }

      // Bar 2 at DIFFERENT baseline (floating)
      const yBase2 = h - 95;
      const x2 = w * 0.65 - barW / 2;
      ctx.fillStyle = '#ec4899';
      ctx.fillRect(x2, yBase2 - h2, barW, h2);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('Lik B (?)', x2 + barW / 2, yBase2 + 25);
      if (checked) {
        ctx.fillStyle = '#fbcfe8';
        ctx.fillText(`${smallVal} enot (${trueRatioPct} %)`, x2 + barW / 2, yBase2 - h2 - 10);
      }
    } else if (taskType === 'angle') {
      // 3. Angle / Pie Chart Slices
      const cx = w / 2;
      const cy = h / 2 - 10;
      const radius = Math.min(w, h) * 0.35;

      const totalVal = bigVal + smallVal + 60;
      const a1Angle = (bigVal / totalVal) * 2 * Math.PI;
      const a2Angle = (smallVal / totalVal) * 2 * Math.PI;
      const restAngle = 2 * Math.PI - a1Angle - a2Angle;

      let currentAngle = -Math.PI / 2;

      // Slice A
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, currentAngle, currentAngle + a1Angle);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3;
      ctx.stroke();

      currentAngle += a1Angle;

      // Slice B
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, currentAngle, currentAngle + a2Angle);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      currentAngle += a2Angle;

      // Rest
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, currentAngle, currentAngle + restAngle);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Legend
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Modra rezina = Lik A (100 %)', w * 0.3, h - 20);
      ctx.fillText('Rožnata rezina = Lik B (?)', w * 0.7, h - 20);
    } else if (taskType === 'area') {
      // 4. Bubble Area (2D circle area proportional to value)
      const cy = h / 2 - 10;
      const x1 = w * 0.33;
      const x2 = w * 0.67;

      const r1 = Math.sqrt(bigVal) * 9.5;
      const r2 = Math.sqrt(smallVal) * 9.5;

      // Circle A
      ctx.fillStyle = 'rgba(99, 102, 241, 0.85)';
      ctx.beginPath();
      ctx.arc(x1, cy, r1, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Krog A (100 %)', x1, h - 25);
      if (checked) {
        ctx.fillStyle = '#a5b4fc';
        ctx.fillText(`Ploščina: ${bigVal}`, x1, cy + 4);
      }

      // Circle B
      ctx.fillStyle = 'rgba(236, 72, 153, 0.85)';
      ctx.beginPath();
      ctx.arc(x2, cy, r2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText('Krog B (?)', x2, h - 25);
      if (checked) {
        ctx.fillStyle = '#fbcfe8';
        ctx.fillText(`Ploščina: ${smallVal} (${trueRatioPct} %)`, x2, cy + 4);
      }
    }
  }, [activeSubTab, taskType, valA, valB, checked, userGuess]);

  // =========================================================================
  // 2. ANSCOMBE & VANHOVE SCATTER & RESIDUALS STATE
  // =========================================================================
  type DatasetArchetype = 'normal' | 'parabola' | 'outlier' | 'heteroscedastic' | 'simpson' | 'sinusoid';
  const [selectedArchetype, setSelectedArchetype] = useState<DatasetArchetype>('normal');
  const [showResidualLines, setShowResidualLines] = useState<boolean>(true);

  const anscombeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const residualCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate 40 points with r ~ 0.60
  const getArchetypeData = (arch: DatasetArchetype): { x: number; y: number }[] => {
    const N = 40;
    const pts: { x: number; y: number }[] = [];

    if (arch === 'normal') {
      for (let i = 0; i < N; i++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.cos(2.0 * Math.PI * u2);
        const z1 = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.sin(2.0 * Math.PI * u2);
        const x = 50 + z0 * 15;
        const y = 50 + 0.6 * (x - 50) + z1 * (15 * Math.sqrt(1 - 0.36));
        pts.push({ x, y });
      }
    } else if (arch === 'parabola') {
      // Quadratic U-shape where linear correlation r ~ 0.6
      for (let i = 0; i < N; i++) {
        const x = 20 + (i / N) * 60;
        const normX = (x - 50) / 30;
        const y = 35 + normX * 18 + Math.pow(normX, 2) * 28 + (Math.random() - 0.5) * 6;
        pts.push({ x, y });
      }
    } else if (arch === 'outlier') {
      // Uncorrelated cloud at (45, 45) + single extreme leverage outlier at (95, 95)
      for (let i = 0; i < N - 1; i++) {
        const x = 35 + Math.random() * 25;
        const y = 35 + Math.random() * 25;
        pts.push({ x, y });
      }
      pts.push({ x: 95, y: 96 });
    } else if (arch === 'heteroscedastic') {
      // Variance expands with X
      for (let i = 0; i < N; i++) {
        const x = 20 + (i / N) * 60;
        const spread = ((x - 20) / 60) * 35 + 2;
        const y = 25 + 0.55 * (x - 20) + (Math.random() - 0.5) * spread;
        pts.push({ x, y });
      }
    } else if (arch === 'simpson') {
      // Two distinct clusters (Group 1: Low X, high relative Y; Group 2: High X, high relative Y)
      for (let i = 0; i < N / 2; i++) {
        const x = 25 + Math.random() * 18;
        const y = 30 + 0.2 * (x - 25) + (Math.random() - 0.5) * 8;
        pts.push({ x, y });
      }
      for (let i = 0; i < N / 2; i++) {
        const x = 60 + Math.random() * 22;
        const y = 65 + 0.2 * (x - 60) + (Math.random() - 0.5) * 8;
        pts.push({ x, y });
      }
    } else if (arch === 'sinusoid') {
      for (let i = 0; i < N; i++) {
        const x = 20 + (i / N) * 60;
        const y = 50 + 0.5 * (x - 50) + Math.sin(((x - 20) / 60) * 3 * Math.PI) * 16 + (Math.random() - 0.5) * 4;
        pts.push({ x, y });
      }
    }
    return pts;
  };

  const [currentPts, setCurrentPts] = useState<{ x: number; y: number }[]>(() =>
    getArchetypeData('normal')
  );

  const handleSelectArchetype = (arch: DatasetArchetype) => {
    setSelectedArchetype(arch);
    setCurrentPts(getArchetypeData(arch));
  };

  // Compute regression metrics
  const computeStats = (pts: { x: number; y: number }[]) => {
    const n = pts.length;
    if (n < 2) return { r: 0, r2: 0, slope: 0, intercept: 0, xMean: 0, yMean: 0, residuals: [] };

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    pts.forEach(p => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
      sumY2 += p.y * p.y;
    });

    const xMean = sumX / n;
    const yMean = sumY / n;

    const ssXX = sumX2 - n * xMean * xMean;
    const ssYY = sumY2 - n * yMean * yMean;
    const ssXY = sumXY - n * xMean * yMean;

    const slope = ssXX !== 0 ? ssXY / ssXX : 0;
    const intercept = yMean - slope * xMean;
    const r = (ssXX > 0 && ssYY > 0) ? ssXY / Math.sqrt(ssXX * ssYY) : 0;
    const r2 = r * r;

    const residuals = pts.map(p => {
      const yHat = intercept + slope * p.x;
      return { x: p.x, y: p.y, yHat, resid: p.y - yHat };
    });

    return { r, r2, slope, intercept, xMean, yMean, residuals };
  };

  const stats = computeStats(currentPts);

  // Render Anscombe Scatter & Residual Canvas
  useEffect(() => {
    const canvas = anscombeCanvasRef.current;
    const resCanvas = residualCanvasRef.current;
    if (!canvas || !resCanvas || activeSubTab !== 'anscombe') return;

    const ctx = canvas.getContext('2d');
    const resCtx = resCanvas.getContext('2d');
    if (!ctx || !resCtx) return;

    // 1. Draw Main Scatter Plot
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 40;
    const minVal = 10;
    const maxVal = 100;

    const mapX = (x: number) => pad + ((x - minVal) / (maxVal - minVal)) * (w - pad * 2);
    const mapY = (y: number) => h - pad - ((y - minVal) / (maxVal - minVal)) * (h - pad * 2);

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let v = 20; v <= 100; v += 20) {
      ctx.beginPath();
      ctx.moveTo(mapX(v), pad);
      ctx.lineTo(mapX(v), h - pad);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pad, mapY(v));
      ctx.lineTo(w - pad, mapY(v));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${v}`, mapX(v), h - pad + 15);
      ctx.textAlign = 'right';
      ctx.fillText(`${v}`, pad - 8, mapY(v) + 3);
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Regression Line
    const yHatMin = stats.intercept + stats.slope * minVal;
    const yHatMax = stats.intercept + stats.slope * maxVal;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mapX(minVal), mapY(yHatMin));
    ctx.lineTo(mapX(maxVal), mapY(yHatMax));
    ctx.stroke();

    // Residual lines from points to line
    if (showResidualLines) {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 2]);
      stats.residuals.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(mapX(p.x), mapY(p.y));
        ctx.lineTo(mapX(p.x), mapY(p.yHat));
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    // Data points
    stats.residuals.forEach(p => {
      ctx.fillStyle = '#818cf8';
      ctx.beginPath();
      ctx.arc(mapX(p.x), mapY(p.y), 4.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#c7d2fe';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 2. Draw Residual Plot (e_i vs yHat)
    const rw = resCanvas.width;
    const rh = resCanvas.height;
    resCtx.clearRect(0, 0, rw, rh);

    const maxResid = 35;
    const mapResX = (yHat: number) => pad + ((yHat - minVal) / (maxVal - minVal)) * (rw - pad * 2);
    const mapResY = (e: number) => rh / 2 - (e / maxResid) * (rh / 2 - 20);

    // Zero residual baseline
    resCtx.strokeStyle = '#10b981';
    resCtx.lineWidth = 1.8;
    resCtx.beginPath();
    resCtx.moveTo(pad, rh / 2);
    resCtx.lineTo(rw - pad, rh / 2);
    resCtx.stroke();

    // Zero text
    resCtx.fillStyle = '#10b981';
    resCtx.font = '10px sans-serif';
    resCtx.textAlign = 'right';
    resCtx.fillText('e = 0', pad - 5, rh / 2 + 3);

    // Residual points
    stats.residuals.forEach(p => {
      const isOutlier = Math.abs(p.resid) > 15;
      resCtx.fillStyle = isOutlier ? '#f43f5e' : '#f59e0b';
      resCtx.beginPath();
      resCtx.arc(mapResX(p.yHat), mapResY(p.resid), 4, 0, 2 * Math.PI);
      resCtx.fill();
    });

    resCtx.fillStyle = '#94a3b8';
    resCtx.font = '11px sans-serif';
    resCtx.textAlign = 'center';
    resCtx.fillText('Prilagojene vrednosti ŷ (Fitted)', rw / 2, rh - 5);
  }, [activeSubTab, currentPts, stats, showResidualLines]);

  // =========================================================================
  // 3. DUAL Y-AXIS ILLUSION STATE
  // =========================================================================
  const [dualAxisMin2, setDualAxisMin2] = useState<number>(1200);
  const [dualAxisMax2, setDualAxisMax2] = useState<number>(4500);
  const [dualMode, setDualMode] = useState<'dual' | 'indexed'>('dual');
  const dualCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Time series mock data: 2009 - 2016
  const timeData = [
    { year: 2009, sp500: 750, monBase: 1600 },
    { year: 2010, sp500: 1100, monBase: 2000 },
    { year: 2011, sp500: 1250, monBase: 2650 },
    { year: 2012, sp500: 1400, monBase: 2700 },
    { year: 2013, sp500: 1750, monBase: 3600 },
    { year: 2014, sp500: 2050, monBase: 4000 },
    { year: 2015, sp500: 2080, monBase: 3900 },
    { year: 2016, sp500: 2200, monBase: 3850 },
  ];

  useEffect(() => {
    const canvas = dualCanvasRef.current;
    if (!canvas || activeSubTab !== 'dualAxis') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padL = 55;
    const padR = 55;
    const padT = 30;
    const padB = 40;

    const mapX = (idx: number) => padL + (idx / (timeData.length - 1)) * (w - padL - padR);

    if (dualMode === 'dual') {
      // S&P on left (600 - 2400)
      const min1 = 600;
      const max1 = 2400;
      const mapY1 = (val: number) => h - padB - ((val - min1) / (max1 - min1)) * (h - padT - padB);

      // MonBase on right (user controlled dualAxisMin2 - dualAxisMax2)
      const min2 = dualAxisMin2;
      const max2 = dualAxisMax2;
      const mapY2 = (val: number) => h - padB - ((val - min2) / (max2 - min2)) * (h - padT - padB);

      // Left axis (Blue)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, h - padB);
      ctx.stroke();

      // Right axis (Rose)
      ctx.strokeStyle = '#fb7185';
      ctx.beginPath();
      ctx.moveTo(w - padR, padT);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      // Baseline grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      // Draw Series 1: S&P 500 (Cyan line)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      timeData.forEach((d, i) => {
        const x = mapX(i);
        const y = mapY1(d.sp500);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Series 2: Monetary Base (Rose line)
      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 3;
      ctx.beginPath();
      timeData.forEach((d, i) => {
        const x = mapX(i);
        const y = mapY2(d.monBase);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Labels on bottom
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      timeData.forEach((d, i) => {
        ctx.fillText(`${d.year}`, mapX(i), h - padB + 18);
      });

      // Axis labels
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText('S&P 500 (točke)', padL - 10, padT - 12);

      ctx.fillStyle = '#fb7185';
      ctx.textAlign = 'right';
      ctx.fillText('Denarna masa (mrd $)', w - padR + 10, padT - 12);
    } else {
      // Indexed Mode: Base 100 in 2009
      const baseSP = timeData[0].sp500;
      const baseMB = timeData[0].monBase;

      const indexedData = timeData.map(d => ({
        year: d.year,
        spIdx: (d.sp500 / baseSP) * 100,
        mbIdx: (d.monBase / baseMB) * 100
      }));

      const minIdx = 80;
      const maxIdx = 320;
      const mapYIdx = (val: number) => h - padB - ((val - minIdx) / (maxIdx - minIdx)) * (h - padT - padB);

      // Base 100 reference line
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, mapYIdx(100));
      ctx.lineTo(w - padR, mapYIdx(100));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Baza 100', padL - 8, mapYIdx(100) + 3);

      // Axis
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, h - padB);
      ctx.lineTo(w - padR, h - padB);
      ctx.stroke();

      // Line 1: S&P Indexed (Cyan)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      indexedData.forEach((d, i) => {
        const x = mapX(i);
        const y = mapYIdx(d.spIdx);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Line 2: MonBase Indexed (Rose)
      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 3;
      ctx.beginPath();
      indexedData.forEach((d, i) => {
        const x = mapX(i);
        const y = mapYIdx(d.mbIdx);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Year labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      indexedData.forEach((d, i) => {
        ctx.fillText(`${d.year}`, mapX(i), h - padB + 18);
      });

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Indeks rasti (leto 2009 = 100 %)', padL, padT - 10);
    }
  }, [activeSubTab, dualAxisMin2, dualAxisMax2, dualMode]);

  // =========================================================================
  // 4. COLOR VISION ACCESSIBILITY STATE
  // =========================================================================
  type CVDMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome';
  const [cvdMode, setCvdMode] = useState<CVDMode>('normal');
  const [paletteType, setPaletteType] = useState<'viridis' | 'dark2' | 'rainbow' | 'diverging'>('viridis');

  // Palette color definitions
  const palettes = {
    viridis: ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'],
    dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'],
    rainbow: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff'],
    diverging: ['#b2182b', '#ef8a62', '#f7f7f7', '#67a9cf', '#2166ac']
  };

  // Color vision transforms (Simulated RGB)
  const applyCVD = (hex: string, mode: CVDMode): string => {
    if (mode === 'normal') return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    let nr = r, ng = g, nb = b;

    if (mode === 'protanopia') {
      nr = 0.567 * r + 0.433 * g;
      ng = 0.558 * r + 0.442 * g;
      nb = 0.242 * g + 0.758 * b;
    } else if (mode === 'deuteranopia') {
      nr = 0.625 * r + 0.375 * g;
      ng = 0.700 * r + 0.300 * g;
      nb = 0.300 * g + 0.700 * b;
    } else if (mode === 'tritanopia') {
      nr = 0.950 * r + 0.050 * g;
      ng = 0.433 * g + 0.567 * b;
      nb = 0.475 * g + 0.525 * b;
    } else if (mode === 'monochrome') {
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      nr = gray;
      ng = gray;
      nb = gray;
    }

    const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
    return `#${clamp(nr).toString(16).padStart(2, '0')}${clamp(ng).toString(16).padStart(2, '0')}${clamp(nb).toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Explanation */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-slate-100 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Didaktika vizualizacije podatkov (Healy / Cleveland / Tufte)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Laboratorij vizualnega zaznavanja & diagnostike grafov
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Preizkusite natančnost človeških možganov pri branju različnih tipov grafov, odkrijte skrivnost Anscombovega kvarteta z analizo ostankov ter spoznajte pasti dveh Y-osi in barvnih lestvic.
            </p>
          </div>

          {onSelectUnit && (
            <button
              onClick={() => onSelectUnit('unit-0-4')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
            >
              <Info className="h-3.5 w-3.5" />
              <span>Odpri lekcijo 0.4</span>
            </button>
          )}
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 border-t border-slate-800/80 mt-5">
          <button
            onClick={() => setActiveSubTab('cleveland')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'cleveland'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>1. Cleveland-McGill preizkus zaznavanja</span>
          </button>

          <button
            onClick={() => setActiveSubTab('anscombe')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'anscombe'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>2. Anscombov kvartet & Ostanki (r = 0.60)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dualAxis')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'dualAxis'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Split className="h-3.5 w-3.5" />
            <span>3. Past dveh Y-osi (Dual Axis Illusion)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('colorVision')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'colorVision'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>4. Barvna dostopnost & Slepota</span>
          </button>

          <button
            onClick={() => setActiveSubTab('faceting')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'faceting'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>5. Fasetiranje & »Špageti« reševalec</span>
          </button>

          <button
            onClick={() => setActiveSubTab('modelViz')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'modelViz'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            <span>6. Vizualizacija modelov & Negotovost</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SUBTAB 1: CLEVELAND-MCGILL PSYCHOPHYSICAL CHALLENGE */}
      {/* ===================================================================== */}
      {activeSubTab === 'cleveland' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Canvas Interactive Area */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Interaktivni psihofizikalni poskus
              </span>
              <button
                onClick={() => generateNewTask()}
                className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 font-medium"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Nova naloga</span>
              </button>
            </div>

            {/* Task Type Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => generateNewTask('position')}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                  taskType === 'position'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>1. Skupna os (Položaj)</span>
              </button>

              <button
                onClick={() => generateNewTask('length')}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                  taskType === 'length'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>2. Neporavnana dolžina</span>
              </button>

              <button
                onClick={() => generateNewTask('angle')}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                  taskType === 'angle'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <PieChart className="h-4 w-4" />
                <span>3. Kot (Torta)</span>
              </button>

              <button
                onClick={() => generateNewTask('area')}
                className={`px-2.5 py-2 rounded-xl text-xs font-medium flex flex-col items-center gap-1 border transition-all ${
                  taskType === 'area'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Circle className="h-4 w-4" />
                <span>4. Površina kroga</span>
              </button>
            </div>

            {/* Canvas */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
              <canvas
                ref={clevelandCanvasRef}
                width={560}
                height={260}
                className="w-full h-auto block"
              />
            </div>

            {/* User Slider & Guess Input */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>Vaša ocena: Kolikšen % večjega (A) predstavlja manjši (B)?</span>
                <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  {userGuess} %
                </span>
              </div>

              <input
                type="range"
                min={5}
                max={95}
                step={1}
                value={userGuess}
                disabled={checked}
                onChange={e => setUserGuess(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />

              <div className="flex items-center gap-3 pt-1">
                {!checked ? (
                  <button
                    onClick={handleCheckGuess}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Preveri oceno in izračunaj napako</span>
                  </button>
                ) : (
                  <button
                    onClick={() => generateNewTask()}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Poskusi naslednji primer</span>
                  </button>
                )}
              </div>

              {/* Feedback box */}
              {checked && (
                <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-800 dark:text-slate-200">
                      Prava vrednost: <strong className="text-indigo-600 dark:text-indigo-300">{trueRatioPct} %</strong>
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      Vaša napaka: <strong className="text-rose-500 font-mono">±{Math.abs(userGuess - trueRatioPct)} odst. točk</strong>
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    {Math.abs(userGuess - trueRatioPct) <= 3
                      ? '🎯 Izjemno natančno! Vaše oko je pravilno dekodiralo geometrijski lik.'
                      : '💡 Opazujte, kako težje je bilo oceniti razmerje, če oblika ni bila na skupni poravnani osi.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cleveland-McGill Scientific Ranking Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Eye className="h-4 w-4 text-indigo-500" />
                <span>Hierarhija zaznavnih nalog (Cleveland & McGill)</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Empirične raziskave dokazujejo, da človeški vid različne vizualne lastnosti procesira z dramatično različno natančnostjo:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">1. Položaj na skupni osi</span>
                  <span className="text-[10px] font-mono bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded-full text-emerald-900 dark:text-emerald-200">
                    Najnižja napaka (1.0x)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 flex items-center justify-between">
                  <span className="font-medium text-teal-800 dark:text-teal-300">2. Položaj na neporavnani osi</span>
                  <span className="text-[10px] font-mono bg-teal-200 dark:bg-teal-900 px-2 py-0.5 rounded-full text-teal-900 dark:text-teal-200">
                    Nizka napaka (~1.4x)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between">
                  <span className="font-medium text-blue-800 dark:text-blue-300">3. Dolžina brez osi</span>
                  <span className="text-[10px] font-mono bg-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded-full text-blue-900 dark:text-blue-200">
                    Zmerna napaka (~1.8x)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
                  <span className="font-medium text-amber-800 dark:text-amber-300">4. Kot in naklon (torte)</span>
                  <span className="text-[10px] font-mono bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded-full text-amber-900 dark:text-amber-200">
                    Visoka napaka (~2.3x)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 flex items-center justify-between">
                  <span className="font-medium text-rose-800 dark:text-rose-300">5. Dvodimenzionalna površina</span>
                  <span className="text-[10px] font-mono bg-rose-200 dark:bg-rose-900 px-2 py-0.5 rounded-full text-rose-900 dark:text-rose-200">
                    Zelo visoka napaka (~2.8x)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-900 flex items-center justify-between">
                  <span className="font-bold text-red-900 dark:text-red-200">6. 3D Volumen in sence</span>
                  <span className="text-[10px] font-mono bg-red-200 dark:bg-red-900 px-2 py-0.5 rounded-full text-red-900 dark:text-red-100">
                    Ekstremno popačenje
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <strong>💡 Praktično vodilo za statistika:</strong>
                <p>
                  Kadar je cilj grafa natančna primerjava vrednosti med skupinami, vedno izberite vodoravni točkovni graf (Cleveland dotplot) ali stolpčni grafikon z ničelno izhodiščno črto namesto tortnih ali 3D diagramov.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 2: ANSCOMBE & VANHOVE CORRELATION PATTERNS */}
      {/* ===================================================================== */}
      {activeSubTab === 'anscombe' && (
        <div className="space-y-6">
          {/* Archetype Selector */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-500" />
                <span>Izberite podatkovni vzorec (Vsi imajo enak r ≈ 0.60 in R² ≈ 0.36!):</span>
              </h3>
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showResidualLines}
                  onChange={e => setShowResidualLines(e.target.checked)}
                  className="rounded border-slate-400 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Prikaži daljice ostankov (e_i)</span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {[
                { id: 'normal', label: '1. Standardna normalna', desc: 'Linearni model velja' },
                { id: 'parabola', label: '2. Kvadratna krivulja', desc: 'Nelinearni lok' },
                { id: 'outlier', label: '3. En sam osamelec', desc: 'Vzvodna točka' },
                { id: 'heteroscedastic', label: '4. Heteroscedastičnost', desc: 'Lihasta razpršenost' },
                { id: 'simpson', label: '5. Dve podskupini', desc: 'Simpsonova past' },
                { id: 'sinusoid', label: '6. Sinusoidno nihanje', desc: 'Periodični šum' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectArchetype(item.id as DatasetArchetype)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedArchetype === item.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold leading-snug">{item.label}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      selectedArchetype === item.id ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Canvas: Scatter Plot + Residual Diagnostic Plot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Visual Canvases */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              {/* Upper Canvas: Scatter + OLS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Razsevni grafikon (Scatterplot) z OLS regresijsko premico:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">
                    r = {stats.r.toFixed(3)} | R² = {(stats.r2 * 100).toFixed(1)} %
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                  <canvas ref={anscombeCanvasRef} width={620} height={240} className="w-full h-auto block" />
                </div>
              </div>

              {/* Lower Canvas: Residual Diagnostic */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Diagnostika ostankov: Residuals (e_i) vs. Fitted (ŷ_i)</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Ideal: naključno razpršeni okrog zelene črte e = 0
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
                  <canvas ref={residualCanvasRef} width={620} height={140} className="w-full h-auto block" />
                </div>
              </div>
            </div>

            {/* Right Column: Diagnostic Interpretation Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Kaj razkrijejo ostanki?
                </div>

                {selectedArchetype === 'normal' && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      Primeren linearni model
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Ostanki so enakomerno in naključno razporejeni nad in pod ničlo brez kakršnegakoli vzorca. Predpostavki o linearnosti in homoscedastičnosti sta izpolnjeni.
                    </p>
                  </div>
                )}

                {selectedArchetype === 'parabola' && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                      Kršitev linearnosti!
                    </strong>
                    <div className="text-[11px] leading-relaxed">
                      <FormattedMathText text="Kljub $r = 0.60$ graf ostankov jasno kaže U-obliko. Pravilen model bi moral vključiti kvadratni člen: $\hat{y} = \beta_0 + \beta_1 x + \beta_2 x^2$." />
                    </div>
                  </div>
                )}

                {selectedArchetype === 'outlier' && (
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Vzvodni osamelec (High Leverage)!
                    </strong>
                    <div className="text-[11px] leading-relaxed">
                      <FormattedMathText text="Oblak točk na levi nima nobene korelacije ($r \approx 0$). Ena sama skrajna točka na desnem robu umetno ustvari $r = 0.60$." />
                    </div>
                  </div>
                )}

                {selectedArchetype === 'heteroscedastic' && (
                  <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-xs text-orange-800 dark:text-orange-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Heteroscedastičnost napak
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Razpršenost ostankov se z naraščajočim ŷ dramatično širi (pahljača). Potrebna je logaritemska transformacija ali utežena regresija (WLS).
                    </p>
                  </div>
                )}

                {selectedArchetype === 'simpson' && (
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-800 dark:text-purple-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-purple-500" />
                      Prikrita podskupina (Clustering)
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Združili smo dve ločeni populaciji. Znotraj vsake je naklon nizek, navidezno močna korelacija pa je le posledica razmika med skupinama.
                    </p>
                  </div>
                )}

                {selectedArchetype === 'sinusoid' && (
                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 space-y-1">
                    <strong className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      Periodično valovanje
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Ostanki kažejo valovanje, kar kaže na manjkajočo sezonsko ali ciklično komponento v podatkih.
                    </p>
                  </div>
                )}

                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">Zlato pravilo analitike:</div>
                  <FormattedMathText text="Nikoli ne zaupajte zgolj Pearsonovemu $r$ ali $R^2$. Vedno preglejte razsevni grafikon in grafikon ostankov!" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 3: DUAL Y-AXIS ILLUSION */}
      {/* ===================================================================== */}
      {activeSubTab === 'dualAxis' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Area */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Prikaz časovnih vrst: Dve ločeni Y-osi vs. Indeksiranje
              </span>

              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setDualMode('dual')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    dualMode === 'dual'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Dve Y-osi (Zavajajoče)
                </button>
                <button
                  onClick={() => setDualMode('indexed')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    dualMode === 'indexed'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Indeksirano (Pošteno)
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-950">
              <canvas ref={dualCanvasRef} width={620} height={280} className="w-full h-auto block" />
            </div>

            {/* Interactive Manipulator for Dual Axis Mode */}
            {dualMode === 'dual' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-rose-500" />
                  <span>Prilagodite desno Y-os (Denarna masa) in opazujte manipulacijo:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Minimum desne osi:</span>
                      <span className="font-bold font-mono text-rose-500">{dualAxisMin2} mrd $</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={2000}
                      step={100}
                      value={dualAxisMin2}
                      onChange={e => setDualAxisMin2(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Maksimum desne osi:</span>
                      <span className="font-bold font-mono text-rose-500">{dualAxisMax2} mrd $</span>
                    </div>
                    <input
                      type="range"
                      min={3500}
                      max={8000}
                      step={250}
                      value={dualAxisMax2}
                      onChange={e => setDualAxisMax2(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theory Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
                <span>Zakaj so dvojne Y-osi prepovedane?</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Kadar narišemo dve časovni vrsti z dvema neodvisnima navpičnima osema, ima avtor grafa polno svobodo pri izbiri min/max vrednosti. Z zgolj minimalnim premikom skale lahko dosežemo:
              </p>

              <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                <li>Popolno navidezno prekrivanje dveh nepovezanih serij.</li>
                <li>Navidezno presečišče v poljubno izbranem letu.</li>
                <li>Umetno ustvarjanje vtisa, da ena serija »prehiteva« drugo.</li>
              </ul>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 space-y-1">
                <strong>✅ Pravilna alternativa:</strong>
                <div className="text-[11px]">
                  <FormattedMathText text="Pretvorba v **indeksno število s skupnim izhodiščem ($100 = \\text{leto } 2009$)** ali dva ločena vertikalno usklajena podgrafa s tekočo diferenco (Healy & Cleveland)." />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 4: COLOR VISION ACCESSIBILITY & PALETTES */}
      {/* ===================================================================== */}
      {activeSubTab === 'colorVision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Znanost o barvah v statistiki (HCL barvni prostor & Viridis)
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Simulacija barvne slepote na znanstvenih paletah
              </h3>
            </div>

            {/* CVD Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Izberite tip vida (Simulacija barvne motnje):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'normal', label: 'Normalen vid', desc: 'Standardni RGB' },
                  { id: 'deuteranopia', label: 'Devteranopija', desc: 'Zelena slepota (~6 %)' },
                  { id: 'protanopia', label: 'Protanopija', desc: 'Rdeča slepota (~2 %)' },
                  { id: 'tritanopia', label: 'Tritanopija', desc: 'Modra motnja (~0.1 %)' },
                  { id: 'monochrome', label: 'Monokromatski', desc: 'Sivinski tisk' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCvdMode(item.id as CVDMode)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      cvdMode === item.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className={`text-[10px] ${cvdMode === item.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Palettes Comparison */}
            <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Primerjava obnašanja različnih palet ob izbrani motnji vida:
              </div>

              {/* 1. Viridis */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Viridis (Perceptivno enakomerna zvezna paleta)</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">Zlati standard v znanosti</span>
                </div>
                <div className="flex h-8 rounded-lg overflow-hidden border border-slate-700">
                  {palettes.viridis.map((col, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-colors duration-300"
                      style={{ backgroundColor: applyCVD(col, cvdMode) }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Svetlost (luminanca) enakomerno narašča od leve proti desni. Tudi pri popolni barvni slepoti ali črno-belem tisku so razmerja med vrednostmi popolnoma ohranjena.
                </p>
              </div>

              {/* 2. ColorBrewer Dark2 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>ColorBrewer Dark2 (Kakovostna kategorična paleta)</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">Za diskretne skupine</span>
                </div>
                <div className="flex h-8 rounded-lg overflow-hidden border border-slate-700">
                  {palettes.dark2.map((col, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-colors duration-300"
                      style={{ backgroundColor: applyCVD(col, cvdMode) }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Barve imajo enako vizualno težo (valence), tako da nobena kategorija podzavestno ne dominira nad drugimi.
                </p>
              </div>

              {/* 3. Rainbow / Jet (Bad) */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-rose-500" />
                    <span>Mavrična / Jet paleta (Znanstveno neprimerna)</span>
                  </span>
                  <span className="text-[10px] font-normal text-rose-500 font-mono">NE UPORABLJAJ</span>
                </div>
                <div className="flex h-8 rounded-lg overflow-hidden border border-slate-700">
                  {palettes.rainbow.map((col, i) => (
                    <div
                      key={i}
                      className="flex-1 transition-colors duration-300"
                      style={{ backgroundColor: applyCVD(col, cvdMode) }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-rose-600 dark:text-rose-400">
                  Rumena barva na sredini ima bistveno višjo svetlost kot rdeča in modra na robovih, kar ustvari umetne vizualne meje (lažne prelome), ki v podatkih ne obstajajo.
                </p>
              </div>
            </div>
          </div>

          {/* Theory Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-indigo-500" />
                <span>Tri vrste barvnih lestvic</span>
              </h3>

              <div className="space-y-2.5 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-800 dark:text-slate-200 block">1. Sekvenčne (Sequential):</strong>
                  <FormattedMathText text="Od svetlega do temnega zveznega odtenka (npr. gostota prebivalstva $0 \\to 1000$)." />
                </div>

                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-800 dark:text-slate-200 block">2. Divergentne (Diverging):</strong>
                  <FormattedMathText text="Z nevtralno sredino in dvema barvama na polih (npr. politični odklon od sredine ali temperature $\\pm 0$)." />
                </div>

                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-800 dark:text-slate-200 block">3. Kvalitativne (Qualitative):</strong>
                  Različni odtenki za neurejene kategorije (npr. celine, spol, regije).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 5: FACETING & SPAGHETTI PLOT SOLVER (Healy Ch. 5) */}
      {/* ===================================================================== */}
      {activeSubTab === 'faceting' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Kieran Healy & Edward Tufte: Primerjava 12 časovnih vrst
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Preobremenjen »špageti« grafikon proti fasetirani mreži (Small Multiples)
                </h3>
              </div>

              {/* Mode Toggle */}
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0">
                <button
                  onClick={() => setFacetMode('spaghetti')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    facetMode === 'spaghetti'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-200'
                  }`}
                >
                  1. Špageti graf (Kaos)
                </button>
                <button
                  onClick={() => setFacetMode('highlight')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    facetMode === 'highlight'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-200'
                  }`}
                >
                  2. Fokusno poudarjanje
                </button>
                <button
                  onClick={() => setFacetMode('facets')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    facetMode === 'facets'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-200'
                  }`}
                >
                  3. Fasetiranje (Small Multiples)
                </button>
              </div>
            </div>

            {/* Sub-controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Izberite državo v fokusu:</span>
                <select
                  value={focusCountry}
                  onChange={e => setFocusCountry(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  {countriesData.map(c => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                <input
                  type="checkbox"
                  checked={showEUBenchmark}
                  onChange={e => setShowEUBenchmark(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Prikaži povprečje EU-27 (referenčna črta)</span>
              </label>
            </div>

            {/* View 1 & 2: Single Canvas Plot (Spaghetti or Highlight) */}
            {(facetMode === 'spaghetti' || facetMode === 'highlight') && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-hidden">
                  <svg viewBox="0 0 760 320" className="w-full h-auto block">
                    {/* Y Gridlines (from 90 to 220, base 100) */}
                    {[100, 120, 140, 160, 180, 200, 220].map(val => {
                      const y = 280 - ((val - 90) / (220 - 90)) * 240;
                      return (
                        <g key={val}>
                          <line
                            x1={50}
                            y1={y}
                            x2={660}
                            y2={y}
                            stroke={val === 100 ? '#475569' : '#334155'}
                            strokeDasharray={val === 100 ? '4,4' : '2,2'}
                            strokeWidth={val === 100 ? 1.5 : 1}
                          />
                          <text x={42} y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* X Gridlines (years) */}
                    {yearsList.map((yr, idx) => {
                      const x = 50 + (idx / 10) * 610;
                      return (
                        <g key={yr}>
                          <line x1={x} y1={40} x2={x} y2={280} stroke="#1e293b" strokeWidth="1" />
                          <text x={x} y={298} fill="#94a3b8" fontSize="10" textAnchor="middle">
                            {yr}
                          </text>
                        </g>
                      );
                    })}

                    {/* EU Benchmark Line */}
                    {showEUBenchmark && (
                      <polyline
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2.5"
                        strokeDasharray="6,4"
                        points={euAverageValues
                          .map((val, idx) => {
                            const x = 50 + (idx / 10) * 610;
                            const y = 280 - ((val - 90) / (220 - 90)) * 240;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    )}

                    {/* Country Lines */}
                    {countriesData.map(c => {
                      const isFocal = c.name === focusCountry;
                      const isHighlightMode = facetMode === 'highlight';
                      const strokeColor = isHighlightMode
                        ? isFocal
                          ? '#6366f1'
                          : '#475569'
                        : c.color;
                      const strokeW = isHighlightMode ? (isFocal ? 3.5 : 1.2) : 2.2;
                      const strokeOp = isHighlightMode ? (isFocal ? 1 : 0.25) : 0.85;

                      const points = c.values
                        .map((val, idx) => {
                          const x = 50 + (idx / 10) * 610;
                          const y = 280 - ((val - 90) / (220 - 90)) * 240;
                          return `${x},${y}`;
                        })
                        .join(' ');

                      const lastX = 660;
                      const lastVal = c.values[10];
                      const lastY = 280 - ((lastVal - 90) / (220 - 90)) * 240;

                      return (
                        <g key={c.name} opacity={strokeOp} className="transition-all duration-300">
                          <polyline fill="none" stroke={strokeColor} strokeWidth={strokeW} points={points} />
                          {/* Direct Labeling on right edge for focal series or spaghetti */}
                          {(isFocal || !isHighlightMode) && (
                            <text
                              x={lastX + 6}
                              y={lastY + 3}
                              fill={strokeColor}
                              fontSize={isFocal ? '11' : '9'}
                              fontWeight={isFocal ? 'bold' : 'normal'}
                            >
                              {c.name}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {facetMode === 'spaghetti' && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                    <strong className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                      Problem »Špageti« grafikona (Spaghetti Plot):
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Ko narišemo 12 barvnih črt eno čez drugo, človeški možgani ne morejo ločiti posameznih krivulj. Nastane vizualni šum, kjer barve tekmujejo za pozornost, bralec pa mora nenehno pogledovati v 12-delno legendo.
                    </p>
                  </div>
                )}

                {facetMode === 'highlight' && (
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-300 space-y-1">
                    <strong className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                      Prednost fokusnega poudarjanja (Healy Direct Focus):
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Z zmanjšanjem motnosti in obarvanjem 11 primerjalnih serij v nevtralno sivo barvo takoj izpostavimo zgodbo (fokus na <strong>{focusCountry}</strong>), ob tem pa ohranimo celotni populacijski kontekst!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* View 3: Faceted Grid (Small Multiples) */}
            {facetMode === 'facets' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {countriesData.map(c => {
                    const isFocal = c.name === focusCountry;
                    return (
                      <div
                        key={c.name}
                        onClick={() => setFocusCountry(c.name)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isFocal
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className={`font-bold ${isFocal ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                            {c.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            +{((c.values[10] - 100)).toFixed(1)} %
                          </span>
                        </div>

                        {/* Mini SVG Sparkline */}
                        <svg viewBox="0 0 160 70" className="w-full h-auto bg-slate-900 rounded-lg p-1">
                          {/* Base 100 dashed line */}
                          <line x1={0} y1={55} x2={160} y2={55} stroke="#475569" strokeDasharray="2,2" strokeWidth="1" />

                          {/* EU benchmark in muted gray */}
                          {showEUBenchmark && (
                            <polyline
                              fill="none"
                              stroke="#64748b"
                              strokeWidth="1.2"
                              strokeDasharray="3,2"
                              points={euAverageValues
                                .map((val, idx) => {
                                  const x = (idx / 10) * 160;
                                  const y = 60 - ((val - 90) / (220 - 90)) * 55;
                                  return `${x},${y}`;
                                })
                                .join(' ')}
                            />
                          )}

                          {/* Country line */}
                          <polyline
                            fill="none"
                            stroke={isFocal ? '#6366f1' : c.color}
                            strokeWidth={isFocal ? 2.5 : 1.8}
                            points={c.values
                              .map((val, idx) => {
                                const x = (idx / 10) * 160;
                                const y = 60 - ((val - 90) / (220 - 90)) * 55;
                                return `${x},${y}`;
                              })
                              .join(' ')}
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
                  <strong className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Zakaj je fasetiranje (Small Multiples) zmagovalna tehnika?
                  </strong>
                  <p className="text-[11px] leading-relaxed">
                    Vsaka država dobi svoj ločen prostor z identično Y-osjo. Bralec lahko z enim pogledom primerja posamezne dinamike (npr. izjemen poskok Irske ali stabilno rast Poljske) brez prepletanja linij in brez vizualnega kaosa.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 6: VISUALIZING MODEL UNCERTAINTY (Forest Plots - Healy Ch. 6) */}
      {/* ===================================================================== */}
      {activeSubTab === 'modelViz' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Healy 6. poglavje: Kako predstaviti regresijske modele
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Grafikon modelskih koeficientov (Forest / Dot-and-Whisker Plot)
                </h3>
              </div>

              {/* View Switcher: Forest Plot vs Table */}
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 shrink-0">
                <button
                  onClick={() => setModelViewMode('forest')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    modelViewMode === 'forest'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Target className="h-3.5 w-3.5" />
                  <span>Grafikon koeficientov (Forest)</span>
                </button>
                <button
                  onClick={() => setModelViewMode('table')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    modelViewMode === 'table'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <TableIcon className="h-3.5 w-3.5" />
                  <span>Tabela številk (Stara šola)</span>
                </button>
              </div>
            </div>

            {/* Interactive Model Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Izberite modele za prikaz:</label>
                <div className="flex gap-1.5">
                  {[
                    { id: 'both', label: 'Oba modela (M1 & M2)' },
                    { id: 'm1', label: 'Model 1 (Surovi)' },
                    { id: 'm2', label: 'Model 2 (Polni)' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setActiveModelSelection(m.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        activeModelSelection === m.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Stopnja zaupanja intervalov:</label>
                <div className="flex gap-1.5">
                  {[90, 95, 99].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setConfidenceLevel(lvl as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        confidenceLevel === lvl
                          ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 font-bold'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {lvl} % (z = {lvl === 90 ? '1.645' : lvl === 95 ? '1.96' : '2.576'})
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="inline-block w-3 h-3 rounded-full bg-cyan-500" />
                  <span><strong>Model 1:</strong> Enostavna regresija</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="inline-block w-3 h-3 rounded-full bg-indigo-500" />
                  <span><strong>Model 2:</strong> Z vsemi kontrolami</span>
                </div>
              </div>
            </div>

            {/* View A: Forest Plot Canvas / SVG */}
            {modelViewMode === 'forest' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 overflow-x-auto">
                  <svg viewBox="0 0 760 360" className="w-full min-w-[600px] h-auto block">
                    {/* Grid lines (-5 to +25) */}
                    {[-5, 0, 5, 10, 15, 20, 25].map(val => {
                      const x = 240 + ((val - -5) / (25 - -5)) * 480;
                      return (
                        <g key={val}>
                          <line
                            x1={x}
                            y1={30}
                            x2={x}
                            y2={320}
                            stroke={val === 0 ? '#ef4444' : '#334155'}
                            strokeDasharray={val === 0 ? 'none' : '2,2'}
                            strokeWidth={val === 0 ? 2 : 1}
                          />
                          <text
                            x={x}
                            y={336}
                            fill={val === 0 ? '#ef4444' : '#94a3b8'}
                            fontSize="10"
                            fontWeight={val === 0 ? 'bold' : 'normal'}
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {val === 0 ? '0 (Ničelni učinek)' : `${val} %`}
                          </text>
                        </g>
                      );
                    })}

                    {/* Rows */}
                    {regressionPredictors.map((item, idx) => {
                      const yCenter = 55 + idx * 45;
                      const hasM1 = item.m1 && (activeModelSelection === 'both' || activeModelSelection === 'm1');
                      const hasM2 = item.m2 && (activeModelSelection === 'both' || activeModelSelection === 'm2');

                      return (
                        <g key={item.id}>
                          {/* Row background alternate */}
                          <rect
                            x={10}
                            y={yCenter - 20}
                            width={740}
                            height={40}
                            fill={idx % 2 === 0 ? '#0f172a' : 'transparent'}
                            rx={6}
                          />

                          {/* Variable Label */}
                          <text x={20} y={yCenter + 4} fill="#e2e8f0" fontSize="11" fontWeight="600">
                            {item.name}
                          </text>

                          {/* Model 1 Whisper and Dot (Cyan) */}
                          {hasM1 && item.m1 && (
                            <g>
                              {(() => {
                                const offset = hasM2 ? -6 : 0;
                                const est = item.m1.estimate;
                                const margin = zCrit * item.m1.se;
                                const xCenter = 240 + ((est - -5) / 30) * 480;
                                const xMin = 240 + ((est - margin - -5) / 30) * 480;
                                const xMax = 240 + ((est + margin - -5) / 30) * 480;

                                return (
                                  <>
                                    <line
                                      x1={xMin}
                                      y1={yCenter + offset}
                                      x2={xMax}
                                      y2={yCenter + offset}
                                      stroke="#38bdf8"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                    />
                                    <circle cx={xCenter} cy={yCenter + offset} r={4.5} fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                                  </>
                                );
                              })()}
                            </g>
                          )}

                          {/* Model 2 Whisper and Dot (Indigo) */}
                          {hasM2 && item.m2 && (
                            <g>
                              {(() => {
                                const offset = hasM1 ? 6 : 0;
                                const est = item.m2.estimate;
                                const margin = zCrit * item.m2.se;
                                const xCenter = 240 + ((est - -5) / 30) * 480;
                                const xMin = 240 + ((est - margin - -5) / 30) * 480;
                                const xMax = 240 + ((est + margin - -5) / 30) * 480;
                                const crossesZero = est - margin <= 0 && est + margin >= 0;

                                return (
                                  <>
                                    <line
                                      x1={xMin}
                                      y1={yCenter + offset}
                                      x2={xMax}
                                      y2={yCenter + offset}
                                      stroke={crossesZero ? '#94a3b8' : '#818cf8'}
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                    />
                                    <circle
                                      cx={xCenter}
                                      cy={yCenter + offset}
                                      r={4.5}
                                      fill={crossesZero ? '#475569' : '#4f46e5'}
                                      stroke={crossesZero ? '#cbd5e1' : '#a5b4fc'}
                                      strokeWidth="2"
                                    />
                                  </>
                                );
                              })()}
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-indigo-500" />
                    <span>Zakaj je grafikon koeficientov znanstveno boljši od tabel z zvezdicami (*, **, ***)?</span>
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                    <li>
                      <strong>Vidna negotovost in preciznost:</strong> Dolžina vodoravne črtice neposredno razkrije širino intervala zaupanja (natančnost ocene).
                    </li>
                    <li>
                      <strong>Primerjava več modelov naenkrat:</strong> Takoj vidimo, kako se koeficient izobrazbe premakne z 8.4 % na 5.1 %, ko vključimo kontrolne spremenljivke.
                    </li>
                    <li>
                      <strong>Jasna ničelna referenca:</strong> Za spremenljivko <em>Starost</em> interval prečka rdečo ničelno črto ($\beta = 0$), kar takoj razkrije odsotnost statistično značilnega učinka.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* View B: Traditional Table View */}
            {modelViewMode === 'table' && (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">Spremenljivka</th>
                        <th className="p-3">Model 1 (Surovi)</th>
                        <th className="p-3">Model 2 (Polni)</th>
                        <th className="p-3">Komentar & Vsebinski pomen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                      {regressionPredictors.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="p-3 font-semibold text-slate-900 dark:text-slate-200">{p.name}</td>
                          <td className="p-3 font-mono">
                            {p.m1 ? (
                              <div>
                                <span className="font-bold text-cyan-600 dark:text-cyan-400">{p.m1.estimate.toFixed(1)}***</span>
                                <span className="text-[10px] text-slate-400 block">({p.m1.se.toFixed(1)})</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 font-mono">
                            {p.m2 ? (
                              <div>
                                <span className={`font-bold ${p.m2.p.includes('n.s.') ? 'text-slate-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                  {p.m2.estimate.toFixed(1)}{p.m2.p.includes('n.s.') ? '' : '***'}
                                </span>
                                <span className="text-[10px] text-slate-400 block">({p.m2.se.toFixed(1)})</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-[11px]">{p.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
