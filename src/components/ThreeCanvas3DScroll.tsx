import React, { useEffect, useRef, useState, useId } from 'react';
import * as THREE from 'three';
import { RotateCw, Layers, Compass, Eye, Sliders, Maximize2 } from 'lucide-react';
import { Translations } from '../i18n/translations.ts';
import { MathView } from './MathView.tsx';

export type SurfaceType = 'saddle' | 'ripple' | 'paraboloid' | 'torus';

interface ThreeCanvas3DScrollProps {
  t: Translations;
  onSelectStage?: (stageId: string) => void;
}

interface SurfaceMeta {
  id: SurfaceType;
  name: string;
  latex: string;
  curvature: string;
  topology: string;
  description: string;
}

const SURFACES: SurfaceMeta[] = [
  {
    id: 'saddle',
    name: 'Hyperbolic Paraboloid',
    latex: 'z = \\frac{x^2 - y^2}{3}',
    curvature: 'K < 0 (Hyperbolic)',
    topology: 'Euler χ = 1',
    description: 'Saddle surface with negative Gaussian curvature at origin.',
  },
  {
    id: 'ripple',
    name: 'Bessel Harmonic Wave',
    latex: 'z = 0.5\\sin(3.4\\sqrt{x^2 + y^2})',
    curvature: 'K varies radially',
    topology: 'Cylindrical Symmetry',
    description: 'Radial circular membrane harmonic vibration eigenmode.',
  },
  {
    id: 'paraboloid',
    name: 'Elliptic Paraboloid',
    latex: 'z = \\frac{x^2 + y^2}{3.6} - 1.1',
    curvature: 'K > 0 (Elliptic)',
    topology: 'Non-degenerate Bowl',
    description: 'Convex quadric surface with positive Gaussian curvature.',
  },
  {
    id: 'torus',
    name: 'Trefoil Torus Knot T(2,3)',
    latex: 'T(p=2,\\, q=3)',
    curvature: 'Compact 2-Manifold',
    topology: 'Genus g = 1',
    description: 'Non-trivial closed continuous mathematical knot manifold.',
  },
];

export const ThreeCanvas3DScroll: React.FC<ThreeCanvas3DScrollProps> = ({ t }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [surfaceType, setSurfaceType] = useState<SurfaceType>('saddle');
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [camCoords, setCamCoords] = useState<{ x: string; y: string; z: string }>({
    x: '0.0',
    y: '3.2',
    z: '5.8',
  });

  const scrubberId = useId();

  // References for Three.js render loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const surfaceMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number | null>(null);
  const scrollProgress = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRot = useRef<{ x: number; y: number }>({ x: 0.35, y: 0.5 });

  const activeSurface = SURFACES.find((s) => s.id === surfaceType) || SURFACES[0];

  // Procedural surface generator
  const createSurfaceGeometry = (type: SurfaceType): THREE.BufferGeometry => {
    const size = 4.2;
    const segments = 56;

    if (type === 'torus') {
      return new THREE.TorusKnotGeometry(1.2, 0.35, 120, 20, 2, 3);
    }

    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      let z = 0;

      if (type === 'saddle') {
        z = (u * u - v * v) / 3.0;
      } else if (type === 'ripple') {
        const r = Math.sqrt(u * u + v * v);
        z = 0.5 * Math.sin(r * 3.4);
      } else if (type === 'paraboloid') {
        z = (u * u + v * v) / 3.6 - 1.1;
      }

      pos.setZ(i, z);
    }

    geometry.computeVertexNormals();
    return geometry;
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 900;
    const height = container.clientHeight || 520;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isHeadless, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x0284c7, 2.4);
    keyLight.position.set(5, 9, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x64748b, 1.6);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    // Root Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Subtle coordinate plane grid
    const grid = new THREE.GridHelper(6, 12, 0x0284c7, 0x1e293b);
    grid.position.y = -1.4;
    scene.add(grid);

    // Orbit Ring
    const ringGeom = new THREE.TorusGeometry(2.4, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.25 });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    meshGroup.add(ringMesh);

    // Initial Surface Mesh
    const geom = createSurfaceGeometry(surfaceType);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.35,
      roughness: 0.25,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });
    const surfaceMesh = new THREE.Mesh(geom, material);
    surfaceMesh.rotation.x = -Math.PI / 2.6;
    meshGroup.add(surfaceMesh);
    surfaceMeshRef.current = surfaceMesh;

    // Wireframe overlay
    const wireGeom = new THREE.WireframeGeometry(geom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const wireframeMesh = new THREE.LineSegments(wireGeom, wireMat);
    wireframeMesh.rotation.copy(surfaceMesh.rotation);
    meshGroup.add(wireframeMesh);
    wireframeMeshRef.current = wireframeMesh;

    // Window scroll listener for 3D Perspective Scrolling
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      scrollProgress.current = progress;
      setScrollPct(Math.round(progress * 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mouse drag interaction
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - dragStart.current.x) * 0.005;
      const dy = (e.clientY - dragStart.current.y) * 0.005;
      manualRot.current.y += dx;
      manualRot.current.x += dy;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch interaction
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - dragStart.current.x) * 0.005;
      const dy = (e.touches[0].clientY - dragStart.current.y) * 0.005;
      manualRot.current.y += dx;
      manualRot.current.x += dy;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let lastTime = performance.now();
    let tickCount = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (isHeadless) {
        tickCount++;
        if (tickCount % 2 !== 0) return;
      }

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const scroll = scrollProgress.current;

      if (meshGroupRef.current && cameraRef.current) {
        // Continuous 3D perspective camera travel through manifold dimensions
        const targetCamY = 3.2 + Math.sin(scroll * Math.PI) * 2.2;
        const targetCamZ = 5.8 - scroll * 2.2;
        const targetCamX = Math.sin(scroll * Math.PI * 1.5) * 2.6;

        cameraRef.current.position.y += (targetCamY - cameraRef.current.position.y) * 0.06;
        cameraRef.current.position.z += (targetCamZ - cameraRef.current.position.z) * 0.06;
        cameraRef.current.position.x += (targetCamX - cameraRef.current.position.x) * 0.06;
        cameraRef.current.lookAt(0, scroll * 0.4, 0);

        if (autoRotate && !isDragging.current) {
          manualRot.current.y += delta * 0.28;
        }

        meshGroupRef.current.rotation.y = manualRot.current.y + scroll * Math.PI * 1.8;
        meshGroupRef.current.rotation.x = manualRot.current.x * 0.3 + scroll * 0.25;

        // Periodic update of telemetry
        if (tickCount % 10 === 0) {
          setCamCoords({
            x: cameraRef.current.position.x.toFixed(1),
            y: cameraRef.current.position.y.toFixed(1),
            z: cameraRef.current.position.z.toFixed(1),
          });
        }
        tickCount++;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geom.dispose();
      material.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
    };
  }, []);

  // Update geometry when surfaceType changes
  useEffect(() => {
    if (!sceneRef.current || !surfaceMeshRef.current) return;

    const newGeom = createSurfaceGeometry(surfaceType);
    surfaceMeshRef.current.geometry.dispose();
    surfaceMeshRef.current.geometry = newGeom;

    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.geometry.dispose();
      wireframeMeshRef.current.geometry = new THREE.WireframeGeometry(newGeom);
    }
  }, [surfaceType]);

  // Toggle wireframe visibility
  useEffect(() => {
    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.visible = wireframe;
    }
  }, [wireframe]);

  const handleScrubberChange = (val: number) => {
    scrollProgress.current = val / 100;
    setScrollPct(val);
  };

  const resetCamera = () => {
    manualRot.current = { x: 0.35, y: 0.5 };
    scrollProgress.current = 0;
    setScrollPct(0);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl select-none transition-all">
      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[460px] md:h-[540px]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top Left: Clean Real-World Engineering Telemetry Header */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="font-bold text-slate-200 uppercase tracking-wider">3D Coordinate Engine</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-sky-400 font-semibold">{activeSurface.name}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>WebGL 60FPS</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>Pos: [{camCoords.x}, {camCoords.y}, {camCoords.z}]</span>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span>Scroll Depth: <strong className="text-slate-200">{scrollPct}%</strong></span>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <span className="text-slate-400">{activeSurface.curvature}</span>
          </div>
        </div>

        {/* Top Right: Live Mathematical Formulation Chip */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex flex-col items-end gap-1 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-300 font-mono shadow-md backdrop-blur-sm">
            <MathView math={activeSurface.latex} displayMode={false} />
          </div>
          <span className="text-[10px] font-mono text-slate-500">{activeSurface.topology}</span>
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-16 sm:bottom-20 left-4 z-10 pointer-events-none hidden md:block">
          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Click & drag to rotate · Scroll page to travel depth</span>
          </div>
        </div>

        {/* Bottom Control Dock: Clean, Real-World Minimalist Toolstrip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-2xl">
          <div className="p-2 sm:p-2.5 bg-white/95 dark:bg-slate-900/95 rounded-xl border border-slate-300/80 dark:border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Surface Selector Pills */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5">
              {SURFACES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSurfaceType(s.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    surfaceType === s.id
                      ? 'bg-sky-500 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Depth Scrubber + Actions */}
            <div className="flex items-center gap-3">
              {/* Depth Scrubber Slider */}
              <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                <label htmlFor={scrubberId} className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-slate-400" />
                  <span>Depth</span>
                </label>
                <input
                  id={scrubberId}
                  type="range"
                  min="0"
                  max="100"
                  value={scrollPct}
                  onChange={(e) => handleScrubberChange(Number(e.target.value))}
                  className="w-20 accent-sky-500 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded"
                  title="Manually scrub 3D depth position"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    wireframe
                      ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800 border border-sky-500/30'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Toggle Wireframe Grid Overlay"
                >
                  <Layers className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    autoRotate
                      ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800 border border-sky-500/30'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Toggle Auto Orbit"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  onClick={resetCamera}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Reset Camera Coordinates"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
