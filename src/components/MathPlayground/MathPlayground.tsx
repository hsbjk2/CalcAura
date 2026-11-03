import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  Layers,
  Shapes,
  Scale,
  Activity,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  RotateCw,
  Sliders,
  CheckCircle2,
  Atom,
  TrendingUp,
  HelpCircle,
  Move3d,
  Waves
} from 'lucide-react';
import { VisualMathWorld } from '../VisualMathWorld/VisualMathWorld.tsx';
import { MultiplicationTablesWorkspace } from '../MultiplicationTables/MultiplicationTablesWorkspace.tsx';
import { useI18n } from '../../i18n/I18nContext.tsx';
import '../../styles/playground.css';
import {
  NumberQuestGame,
  FruitMarketGame,
  MultiplicationSpaceMissionGame,
  FractionKitchenGame,
  ShapeBuilderGame,
  MemoryMatchGame,
  PatternDetectiveGame,
  NumberMazeGame,
  LogicLabGame,
  MathBingoGame,
  CoordinateExplorerGame,
  MeasurementMissionGame,
} from './PlaygroundGames.tsx';

type PlaygroundTab = 'all' | 'little' | 'middle' | 'advanced';
type ActiveLab = null | 'tables' | 'visual_math' | 'algebra_balance' | 'geometry_lab' | 'calculus_lab' | 'surface_3d';
type SurfaceFormula = 'standing' | 'ripple' | 'saddle';
type ToyThemeKey = 'teddy' | 'cars' | 'puppy';

const TOY_THEMES: Record<
  ToyThemeKey,
  {
    name: string;
    unknownName: string;
    unknownIcon: string;
    constantName: string;
    constantIcon: string;
    targetName: string;
    targetIcon: string;
  }
> = {
  teddy: {
    name: 'Teddy & Apples',
    unknownName: 'Teddy Bear',
    unknownIcon: '🧸',
    constantName: 'Apples',
    constantIcon: '🍎',
    targetName: 'Gift Boxes',
    targetIcon: '🎁',
  },
  cars: {
    name: 'Cars & Balloons',
    unknownName: 'Toy Car',
    unknownIcon: '🚗',
    constantName: 'Balloons',
    constantIcon: '🎈',
    targetName: 'Rockets',
    targetIcon: '🚀',
  },
  puppy: {
    name: 'Puppies & Treats',
    unknownName: 'Puppy',
    unknownIcon: '🐶',
    constantName: 'Bones',
    constantIcon: '🦴',
    targetName: 'Bowls',
    targetIcon: '🍲',
  },
};

export const MathPlayground: React.FC = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('all');
  const [activeLab, setActiveLab] = useState<ActiveLab>(null);
  const [toyTheme, setToyTheme] = useState<ToyThemeKey>('teddy');
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

  // --- THREE.JS 3D HERO SCULPTURE ---
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const width = canvas.parentElement?.clientWidth || canvas.clientWidth || 380;
    const height = canvas.parentElement?.clientHeight || canvas.clientHeight || 280;
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xec4899, 2.0);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Group with Torus Knot and Icosahedron wireframe
    const group = new THREE.Group();

    // Torus Knot (Parametric Math Curve)
    const knotGeo = new THREE.TorusKnotGeometry(1, 0.32, 100, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    group.add(knotMesh);

    // Surrounding geometric wireframe cage
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    group.add(icoMesh);

    scene.add(group);

    // Interactive Mouse & Touch rotation
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };
    canvas.addEventListener('mousemove', handlePointerMove as EventListener);
    canvas.addEventListener('touchmove', handlePointerMove as EventListener, { passive: true });

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.x += 0.008;
      group.rotation.y += 0.012;

      // Subtle pointer follow
      group.rotation.x += (mouseY * 0.5 - group.rotation.x) * 0.05;
      group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.05;

      renderer?.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas || !renderer) return;
      const w = canvas.parentElement?.clientWidth || canvas.clientWidth;
      const h = canvas.parentElement?.clientHeight || canvas.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handlePointerMove as EventListener);
      canvas.removeEventListener('touchmove', handlePointerMove as EventListener);
      window.removeEventListener('resize', handleResize);
      renderer?.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
    };
  }, []);

  // --- INTERACTIVE LAB A: ALGEBRA BALANCE SCALE ---
  const [leftScaleWeights] = useState<{ x: number; const: number }>({ x: 2, const: 4 });
  const [rightScaleWeights] = useState<{ const: number }>({ const: 10 });
  const [scaleXValue, setScaleXValue] = useState<number>(3); // Solution: 2(3) + 4 = 10 -> balanced!

  const leftTotalWeight = leftScaleWeights.x * scaleXValue + leftScaleWeights.const;
  const rightTotalWeight = rightScaleWeights.const;
  const scaleTilt = Math.min(Math.max((rightTotalWeight - leftTotalWeight) * 4, -25), 25);
  const isScaleBalanced = leftTotalWeight === rightTotalWeight;

  // --- INTERACTIVE LAB B: DYNAMIC CALCULUS TANGENT & DERIVATIVE ---
  const [calculusX, setCalculusX] = useState<number>(1.5);
  // Function f(x) = 0.5 * x^2
  // Derivative f'(x) = x
  const calcFx = 0.5 * calculusX * calculusX;
  const calcSlope = calculusX; // slope = x

  // --- INTERACTIVE LAB C: 3D PARAMETRIC SURFACE WIRE ---
  const surfaceCanvasRef = useRef<HTMLCanvasElement>(null);
  const [surfaceWaveFreq, setSurfaceWaveFreq] = useState<number>(2);
  const [surfaceFormula, setSurfaceFormula] = useState<SurfaceFormula>('standing');

  useEffect(() => {
    // Only run if activeTab includes Experiment 3 and not in a fullscreen sub-lab
    if (activeLab !== null || (activeTab !== 'all' && activeTab !== 'advanced')) return;
    const canvas = surfaceCanvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const width = canvas.parentElement?.clientWidth || canvas.clientWidth || 500;
    const height = canvas.parentElement?.clientHeight || canvas.clientHeight || 340;
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 4.8);
    camera.lookAt(0, 0, 0);

    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dir.position.set(4, 6, 4);
    scene.add(dir);

    const dir2 = new THREE.DirectionalLight(0xa855f7, 1.8);
    dir2.position.set(-4, -2, -3);
    scene.add(dir2);

    // Plane geometry deformed as a 3D wave surface
    const planeGeo = new THREE.PlaneGeometry(3.6, 3.6, 36, 36);

    // Cyan holographic wireframe material with normal colors
    const planeMat = new THREE.MeshNormalMaterial({
      wireframe: true,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = -Math.PI / 2.4;
    scene.add(mesh);

    // Interactive Drag Orbit
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      mesh.rotation.z += deltaX * 0.008;
      mesh.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      mesh.rotation.z += deltaX * 0.008;
      mesh.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    let animId: number;
    let t = 0;
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      t += 0.025;

      const pos = planeGeo.attributes.position;
      const freq = surfaceWaveFreq;

      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        let z = 0;

        if (surfaceFormula === 'standing') {
          // Standing Wave: z = sin(f*u + t) * cos(f*v + t) * 0.45
          z = Math.sin(u * freq + t) * Math.cos(v * freq + t) * 0.45;
        } else if (surfaceFormula === 'ripple') {
          // Circular Ripple: z = cos(f * sqrt(u^2 + v^2) - 2t) * 0.4
          const r = Math.sqrt(u * u + v * v);
          z = Math.cos(r * freq * 1.5 - t * 2) * 0.38;
        } else {
          // Hyperbolic Saddle: z = ((u^2 - v^2)/4) * sin(t * 0.5)
          z = ((u * u - v * v) / 4) * Math.sin(t * 0.8) * 0.6;
        }

        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      // Slow gentle auto-spin when not dragging
      if (!isDragging) {
        mesh.rotation.z += 0.003;
      }

      renderer?.render(scene, camera);
    };
    renderLoop();

    const updateCanvasSize = () => {
      if (!canvas || !renderer) return;
      const w = canvas.parentElement?.clientWidth || canvas.clientWidth || 500;
      const h = canvas.parentElement?.clientHeight || canvas.clientHeight || 340;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };
    requestAnimationFrame(updateCanvasSize);

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      resizeObserver.disconnect();
      renderer?.dispose();
      planeGeo.dispose();
      planeMat.dispose();
    };
  }, [activeLab, activeTab, surfaceWaveFreq, surfaceFormula]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      {/* If a dedicated full lab is opened */}
      {activeLab === 'tables' && (
        <div className="space-y-4">
          <button
            onClick={() => setActiveLab(null)}
            className="pg-back"
          >
            ← Back to Math Playground
          </button>
          <MultiplicationTablesWorkspace />
        </div>
      )}

      {activeLab === 'visual_math' && (
        <div className="space-y-4">
          <button
            onClick={() => setActiveLab(null)}
            className="pg-back"
          >
            ← Back to Math Playground
          </button>
          <VisualMathWorld />
        </div>
      )}

      {/* Main Playground Overview when no sub-lab is full-screened */}
      {!activeLab && (
        <>
          {/* Playground hero: an ink band with a live parametric surface. */}
          <section className="pg-hero">
            <span className="pg-hero__grid" aria-hidden="true" />
            <span className="pg-hero__ring" aria-hidden="true" />
            <span className="pg-hero__glyph pg-hero__glyph--a" aria-hidden="true">π</span>
            <span className="pg-hero__glyph pg-hero__glyph--b" aria-hidden="true">∑</span>

            <div className="pg-hero__inner">
              <div className="pg-hero__copy">
                <span className="pg-hero__eyebrow">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  {t.playgroundHeroTag}
                </span>

                <h1 className="pg-hero__title">
                  {t.playgroundTitle}
                </h1>

                <p className="pg-hero__lead">{t.playgroundSubtitle}</p>

                <div className="pg-hero__actions">
                  <button type="button" className="btn" onClick={() => setActiveLab('tables')}>
                    <span>{t.kidsOpenTables}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button type="button" className="btn btn--ghost" onClick={() => setActiveLab('visual_math')}>
                    <span>{t.kidsOpenVisual}</span>
                  </button>
                </div>

                <ul className="pg-hero__facts">
                  <li><Shapes className="w-3.5 h-3.5" aria-hidden="true" /> 20+ experiments</li>
                  <li><Layers className="w-3.5 h-3.5" aria-hidden="true" /> Classes 1–12</li>
                  <li><Atom className="w-3.5 h-3.5" aria-hidden="true" /> Real WebGL surfaces</li>
                </ul>
              </div>

              <div className="pg-hero__stage">
                <div className="pg-hero__frame">
                  <span className="pg-hero__frame-label">Parametric torus knot</span>
                  <canvas ref={heroCanvasRef} className="pg-hero__canvas" />
                  <span className="pg-hero__frame-foot">
                    <Move3d className="w-3.5 h-3.5" aria-hidden="true" />
                    Drag or touch to rotate
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Level Filter Tabs */}
          <div className="pg-tabs" role="tablist" aria-label="Playground levels">
            {[
              { id: 'all', label: 'All experiments', count: '20' },
              { id: 'little', label: 'Little explorers', count: '1–5' },
              { id: 'middle', label: 'Math explorers', count: '6–9' },
              { id: 'advanced', label: 'Advanced lab', count: '10–12' },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as PlaygroundTab)}
                className={`pg-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              >
                <span>{tab.label}</span>
                <em>{tab.count}</em>
              </button>
            ))}
          </div>

          {/* =========================================================
              LITTLE EXPLORERS SUITE (CLASSES 1–5 & ALL)
              ========================================================= */}
          {(activeTab === 'all' || activeTab === 'little') && (
            <div className="space-y-6">
              <div className="pg-section-head">
                <div className="pg-section-head__left">
                  <span className="pg-section-head__dot" aria-hidden="true" />
                  <h3>Little explorers · Classes 1–5</h3>
                </div>
                <span className="pg-section-head__meta">8 playable games</span>
              </div>

              {/* Game 1: Number Quest */}
              <NumberQuestGame />

              {/* Game 2: Fruit Market */}
              <FruitMarketGame />

              {/* Game 3: Multiplication Space Mission */}
              <MultiplicationSpaceMissionGame />

              {/* Game 4: Fraction Kitchen */}
              <FractionKitchenGame />

              {/* Game 5: Shape Builder */}
              <ShapeBuilderGame />

              {/* Game 6: Memory Match */}
              <MemoryMatchGame />

              {/* Game 7: Pattern Detective */}
              <PatternDetectiveGame />

              {/* Game 8: Number Maze */}
              <NumberMazeGame />
            </div>
          )}

          {/* =========================================================
              MATH EXPLORERS SUITE (CLASSES 6–9 & ALL)
              ========================================================= */}
          {(activeTab === 'all' || activeTab === 'middle') && (
            <div className="space-y-6 pt-4">
              <div className="pg-section-head">
                <div className="pg-section-head__left">
                  <span className="pg-section-head__dot" aria-hidden="true" />
                  <h3>Math explorers · Classes 6–9</h3>
                </div>
                <span className="pg-section-head__meta">Algebra, logic &amp; coordinate games</span>
              </div>

              {/* Logic Lab */}
              <LogicLabGame />

              {/* Math Bingo */}
              <MathBingoGame />

              {/* Coordinate Explorer */}
              <CoordinateExplorerGame />

              {/* Measurement Mission */}
              <MeasurementMissionGame />
            </div>
          )}

          {/* EXPERIMENT 1: ALGEBRA BALANCE SCALE (Classes 6–9) WITH REAL-WORLD TOYS */}
          {(activeTab === 'all' || activeTab === 'middle') && (
            <div className="pg-lab">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0 text-xl">
                    {TOY_THEMES[toyTheme].unknownIcon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                      {t.playgroundScaleTitle}
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold">
                        Classes 6–9 Interactive Lab
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.playgroundScaleDesc} <strong>2x + 4 = 10</strong>
                    </p>
                  </div>
                </div>

                {/* Toy Theme Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-700/60 rounded-2xl self-start sm:self-auto">
                  {(Object.keys(TOY_THEMES) as ToyThemeKey[]).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => setToyTheme(themeKey)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        toyTheme === themeKey
                          ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <span>{TOY_THEMES[themeKey].unknownIcon}</span>
                      <span className="hidden sm:inline">{TOY_THEMES[themeKey].name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 transition-all ${
                  isScaleBalanced
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 shadow-sm animate-bounce-gentle'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{isScaleBalanced ? '🎉' : '⚖️'}</span>
                  <span>{isScaleBalanced ? t.playgroundScaleBalanced : t.playgroundScaleNotBalanced}</span>
                </div>
                <span className="font-mono font-bold text-xs shrink-0">
                  {leftTotalWeight} kg {isScaleBalanced ? '=' : '≠'} {rightTotalWeight} kg
                </span>
              </div>

              {/* The Visual Scale SVG with Real-World Toys */}
              <div className="p-4 sm:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 500 240" className="w-full max-w-md sm:max-w-lg h-auto max-h-60 drop-shadow-md">
                  {/* Fulcrum Stand */}
                  <polygon points="250,140 230,225 270,225" fill="#475569" />
                  <circle cx="250" cy="140" r="10" fill="#1e293b" />

                  {/* Tilting Beam with hanging pans & toys */}
                  <g
                    style={{
                      transformOrigin: '250px 140px',
                      transform: `rotate(${scaleTilt}deg)`,
                      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Beam Bar */}
                    <rect x="70" y="135" width="360" height="10" rx="4" fill="#3b82f6" />

                    {/* Left Hanger & Pan */}
                    <line x1="110" y1="140" x2="110" y2="185" stroke="#94a3b8" strokeWidth="2.5" />
                    <ellipse cx="110" cy="185" rx="55" ry="14" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />

                    {/* Left Pan Real-World Toys (2x Unknowns + 4 Constants) */}
                    <g transform="translate(110, 182)">
                      {/* 2 Unknown Toys (each weighing x) */}
                      <g transform="translate(-32, -26)">
                        <text x="0" y="0" fontSize="22" textAnchor="middle" dominantBaseline="middle">
                          {TOY_THEMES[toyTheme].unknownIcon}
                        </text>
                        <rect x="-10" y="5" width="20" height="12" rx="3" fill="#3b82f6" />
                        <text x="0" y="13" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                          x
                        </text>
                      </g>
                      <g transform="translate(-8, -26)">
                        <text x="0" y="0" fontSize="22" textAnchor="middle" dominantBaseline="middle">
                          {TOY_THEMES[toyTheme].unknownIcon}
                        </text>
                        <rect x="-10" y="5" width="20" height="12" rx="3" fill="#3b82f6" />
                        <text x="0" y="13" fontSize="9" fontWeight="bold" fill="#ffffff" textAnchor="middle">
                          x
                        </text>
                      </g>

                      {/* 4 Constant Real-World Objects */}
                      <g transform="translate(18, -14)">
                        <text x="0" y="0" fontSize="16" textAnchor="middle">
                          {TOY_THEMES[toyTheme].constantIcon}
                        </text>
                        <text x="14" y="0" fontSize="16" textAnchor="middle">
                          {TOY_THEMES[toyTheme].constantIcon}
                        </text>
                      </g>
                      <g transform="translate(18, -30)">
                        <text x="0" y="0" fontSize="16" textAnchor="middle">
                          {TOY_THEMES[toyTheme].constantIcon}
                        </text>
                        <text x="14" y="0" fontSize="16" textAnchor="middle">
                          {TOY_THEMES[toyTheme].constantIcon}
                        </text>
                      </g>
                    </g>

                    {/* Right Hanger & Pan */}
                    <line x1="390" y1="140" x2="390" y2="185" stroke="#94a3b8" strokeWidth="2.5" />
                    <ellipse cx="390" cy="185" rx="55" ry="14" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />

                    {/* Right Pan: 10 Target Real-World Toys */}
                    <g transform="translate(390, 182)">
                      {/* Bottom Row: 4 toys */}
                      <g transform="translate(0, -14)">
                        <text x="-27" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="-9" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="9" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="27" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                      </g>
                      {/* Middle Row: 3 toys */}
                      <g transform="translate(0, -30)">
                        <text x="-18" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="0" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="18" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                      </g>
                      {/* Top Row: 3 toys */}
                      <g transform="translate(0, -46)">
                        <text x="-18" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="0" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                        <text x="18" y="0" fontSize="16" textAnchor="middle">{TOY_THEMES[toyTheme].targetIcon}</text>
                      </g>
                    </g>
                  </g>
                </svg>

                {/* Real-World Toys Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-4">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold flex items-center justify-between">
                      <span>Left Pan (2x + 4)</span>
                      <span>{TOY_THEMES[toyTheme].unknownIcon} + {TOY_THEMES[toyTheme].constantIcon}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                      2 × ({scaleXValue}) + 4 = {leftTotalWeight} kg
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      2 {TOY_THEMES[toyTheme].unknownName}s + 4 {TOY_THEMES[toyTheme].constantName}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                    <div className="text-xs text-purple-700 dark:text-purple-300 font-semibold flex items-center justify-between">
                      <span>Right Pan (Target = 10)</span>
                      <span>{TOY_THEMES[toyTheme].targetIcon}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                      10 kg
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      10 {TOY_THEMES[toyTheme].targetName} (1 kg each)
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider for value of x */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <span>{TOY_THEMES[toyTheme].unknownIcon}</span>
                    <span>{t.playgroundAdjustTeddy.replace(/:$/, '')}:</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-mono text-sm font-extrabold">
                    x = {scaleXValue}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="7"
                  step="0.5"
                  value={scaleXValue}
                  onChange={(e) => setScaleXValue(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="text-xs text-center text-gray-500">
                  When <strong>x = 3</strong>: 2(3) + 4 = 6 + 4 = 10! The balance scale levels perfectly horizontally.
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 2: DYNAMIC CALCULUS TANGENT & DERIVATIVE LAB (Class 10, 12, STEM) */}
          {(activeTab === 'all' || activeTab === 'advanced') && (
            <div className="pg-lab">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                      Calculus Derivative & Tangent Line Lab
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 font-semibold">
                        Class 11–12 & Engineering
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Visualize the instantaneous rate of change and tangent line for <strong>f(x) = 0.5x²</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* SVG Curve & Dynamic Tangent */}
                <div className="lg:col-span-8 p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center min-w-0">
                  <svg viewBox="-50 -10 300 220" className="w-full max-w-md h-52 sm:h-56">
                    {/* Axes */}
                    <line x1="0" y1="180" x2="240" y2="180" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="20" y1="10" x2="20" y2="200" stroke="#94a3b8" strokeWidth="2" />
                    <text x="230" y="195" fontSize="11" fill="#64748b">x</text>
                    <text x="10" y="20" fontSize="11" fill="#64748b">y</text>

                    {/* Parabola: y = 0.5 x^2. Mapping: screenX = 20 + x*50, screenY = 180 - y*25 */}
                    <path
                      d="M 20,180 Q 120,180 220,30"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />

                    {/* Active point on curve */}
                    {(() => {
                      const px = 20 + calculusX * 50;
                      const py = 180 - calcFx * 25;
                      const dx = 40;
                      const dy = calcSlope * 20;
                      return (
                        <g>
                          {/* Tangent Line */}
                          <line
                            x1={px - dx}
                            y1={py + dy}
                            x2={px + dx}
                            y2={py - dy}
                            stroke="#ef4444"
                            strokeWidth="2.5"
                          />
                          {/* Red point */}
                          <circle cx={px} cy={py} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Controls and Instantaneous Math values */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="space-y-1">
                    <label className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <span>Slide Input Point x:</span>
                      <span className="text-rose-500 font-mono font-bold">{calculusX.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.2"
                      max="3.5"
                      step="0.05"
                      value={calculusX}
                      onChange={(e) => setCalculusX(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Function Value f(x):</span>
                      <span className="font-mono font-bold text-blue-600">{calcFx.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Derivative f&apos;(x) (Slope):</span>
                      <span className="font-mono font-bold text-rose-500">{calcSlope.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tangent Angle:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        {((Math.atan(calcSlope) * 180) / Math.PI).toFixed(1)}°
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EXPERIMENT 3: 3D PARAMETRIC SURFACE WIRE (Three.js WebGL Interactive) */}
          {(activeTab === 'all' || activeTab === 'advanced') && (
            <div className="pg-lab">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md shrink-0">
                    <Atom className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                      {t.playgroundWaveTitle}
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300 font-semibold">
                        WebGL 3D
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.playgroundWaveDesc}: <strong>{surfaceFormula === 'standing' ? 'z = sin(f·x) · cos(f·y)' : surfaceFormula === 'ripple' ? 'z = cos(f·r - 2t)' : 'z = (x² - y²)/4'}</strong>
                    </p>
                  </div>
                </div>

                {/* Formula & Frequency Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
                    <button
                      onClick={() => setSurfaceFormula('standing')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        surfaceFormula === 'standing'
                          ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Wave
                    </button>
                    <button
                      onClick={() => setSurfaceFormula('ripple')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        surfaceFormula === 'ripple'
                          ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Ripple
                    </button>
                    <button
                      onClick={() => setSurfaceFormula('saddle')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        surfaceFormula === 'saddle'
                          ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Saddle
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1.5, 2, 3, 4].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSurfaceWaveFreq(f)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                          surfaceWaveFreq === f
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {f}Hz
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* WebGL Surface Canvas */}
              <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center h-72 sm:h-80 md:h-96 relative overflow-hidden group">
                <canvas
                  ref={surfaceCanvasRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing block"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-teal-400/80 pointer-events-none">
                  <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Move3d className="w-3.5 h-3.5" /> Drag or touch to rotate in 3D
                  </span>
                  <span className="hidden sm:inline bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Frequency: {surfaceWaveFreq} Hz
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ADVANCED LAB: COORDINATE & LOGIC MATRIX */}
          {activeTab === 'advanced' && (
            <div className="space-y-6 pt-4">
              <div className="pg-section-head">
                <div className="pg-section-head__left">
                  <span className="pg-section-head__dot" aria-hidden="true" />
                  <h3>Advanced coordinate &amp; matrix challenges</h3>
                </div>
                <span className="pg-section-head__meta">STEM mathematical labs</span>
              </div>
              <CoordinateExplorerGame />
              <LogicLabGame />
            </div>
          )}
        </>
      )}
    </div>
  );
};
