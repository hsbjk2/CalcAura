import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { RotateCw, Eye, Sparkles, Sliders } from 'lucide-react';

export type SurfaceShape = 'saddle' | 'ripple' | 'paraboloid' | 'torus';

interface SurfaceMeta {
  id: SurfaceShape;
  name: string;
  formula: string;
  property: string;
}

const SURFACES: SurfaceMeta[] = [
  {
    id: 'saddle',
    name: 'Hyperbolic Paraboloid',
    formula: 'z = (x² - y²) / 3',
    property: 'Gaussian Curvature K < 0',
  },
  {
    id: 'ripple',
    name: 'Bessel Harmonic Wave',
    formula: 'z = 0.6·sin(3.2√(x²+y²))',
    property: 'Radial Circular Eigenmode',
  },
  {
    id: 'paraboloid',
    name: 'Elliptic Paraboloid',
    formula: 'z = (x² + y²) / 3.4 - 1',
    property: 'Convex Quadric Surface K > 0',
  },
  {
    id: 'torus',
    name: 'Trefoil Torus Knot',
    formula: 'T(p=2, q=3)',
    property: 'Closed Continuous Manifold',
  },
];

export const Interactive3DWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeShape, setActiveShape] = useState<SurfaceShape>('saddle');
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scrollCameraY = useTransform(scrollYProgress, [0, 1], [3.2, 1.4]);
  const scrollCameraZ = useTransform(scrollYProgress, [0, 1], [6.2, 4.8]);

  // Three.js Scene References
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const surfaceMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const animIdRef = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const previousMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRot = useRef<{ x: number; y: number }>({ x: 0.25, y: 0 });

  // Generate geometry based on selected shape
  const buildGeometry = (shape: SurfaceShape): THREE.BufferGeometry => {
    if (shape === 'torus') {
      return new THREE.TorusKnotGeometry(1.2, 0.35, 128, 24, 2, 3);
    }

    const size = 4.4;
    const segments = 56;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      let z = 0;

      if (shape === 'saddle') {
        z = (x * x - y * y) / 3.2;
      } else if (shape === 'ripple') {
        const r = Math.sqrt(x * x + y * y);
        z = 0.6 * Math.sin(3.2 * r);
      } else if (shape === 'paraboloid') {
        z = (x * x + y * y) / 3.4 - 1.2;
      }

      pos.setZ(i, z);
    }

    geo.computeVertexNormals();
    return geo;
  };

  // Re-build geometry on shape change
  useEffect(() => {
    if (!meshGroupRef.current) return;

    // Remove old meshes
    if (surfaceMeshRef.current) {
      meshGroupRef.current.remove(surfaceMeshRef.current);
      surfaceMeshRef.current.geometry.dispose();
    }
    if (wireframeMeshRef.current) {
      meshGroupRef.current.remove(wireframeMeshRef.current);
      wireframeMeshRef.current.geometry.dispose();
    }

    const newGeo = buildGeometry(activeShape);

    // Physical Material
    const surfaceMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#141328'),
      emissive: new THREE.Color('#0d0a1f'),
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });
    const sMesh = new THREE.Mesh(newGeo, surfaceMat);
    sMesh.rotation.x = activeShape === 'torus' ? 0 : -Math.PI / 2.6;
    meshGroupRef.current.add(sMesh);
    surfaceMeshRef.current = sMesh;

    // Wireframe Mesh
    const wfGeo = new THREE.WireframeGeometry(newGeo);
    const wfMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#7957F5'),
      transparent: true,
      opacity: wireframeMode ? 0.45 : 0.0,
    });
    const wfMesh = new THREE.LineSegments(wfGeo, wfMat);
    wfMesh.rotation.x = activeShape === 'torus' ? 0 : -Math.PI / 2.6;
    meshGroupRef.current.add(wfMesh);
    wireframeMeshRef.current = wfMesh;
  }, [activeShape, wireframeMode]);

  // Initialize Three.js scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 450;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 5.6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Ambient & Directional Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const violetLight = new THREE.PointLight('#7957F5', 20, 20);
    violetLight.position.set(4, 5, 4);
    scene.add(violetLight);

    const magentaLight = new THREE.PointLight('#D94BCB', 15, 20);
    magentaLight.position.set(-4, -3, 3);
    scene.add(magentaLight);

    const cyanLight = new THREE.DirectionalLight('#38BDF8', 1.4);
    cyanLight.position.set(0, 6, -3);
    scene.add(cyanLight);

    // Initial build
    const initGeo = buildGeometry(activeShape);
    const surfaceMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#141328'),
      emissive: new THREE.Color('#0d0a1f'),
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });
    const sMesh = new THREE.Mesh(initGeo, surfaceMat);
    sMesh.rotation.x = -Math.PI / 2.6;
    group.add(sMesh);
    surfaceMeshRef.current = sMesh;

    const wfGeo = new THREE.WireframeGeometry(initGeo);
    const wfMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#7957F5'),
      transparent: true,
      opacity: 0.45,
    });
    const wfMesh = new THREE.LineSegments(wfGeo, wfMat);
    wfMesh.rotation.x = -Math.PI / 2.6;
    group.add(wfMesh);
    wireframeMeshRef.current = wfMesh;

    // Mouse / Touch rotation event handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMousePos.current.x;
      const dy = e.clientY - previousMousePos.current.y;
      manualRot.current.y += dx * 0.008;
      manualRot.current.x += dy * 0.008;
      previousMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Visibility Observer
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Camera smoothly updates position based on scroll position
      if (cameraRef.current && !shouldReduceMotion) {
        cameraRef.current.position.y = scrollCameraY.get();
        cameraRef.current.position.z = scrollCameraZ.get();
        cameraRef.current.lookAt(0, 0, 0);
      }

      if (meshGroupRef.current) {
        if (autoRotate && !isDragging.current) {
          manualRot.current.y += 0.006;
        }
        meshGroupRef.current.rotation.y = manualRot.current.y;
        meshGroupRef.current.rotation.x = manualRot.current.x;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  const currentMeta = SURFACES.find((s) => s.id === activeShape) || SURFACES[0];

  return (
    <section
      ref={sectionRef}
      id="interactive-world"
      className="relative py-24 sm:py-36 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono font-semibold tracking-wider text-[#7957F5] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Mathematical World</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
            From Symbolic Equations to Spatial Form
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
            Rotate, inspect, and transform continuous quadric surfaces and manifold geometries rendered in real time.
          </p>

          {/* Surface Preset Selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {SURFACES.map((surf) => {
              const isActive = surf.id === activeShape;
              return (
                <button
                  key={surf.id}
                  onClick={() => setActiveShape(surf.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white shadow-[0_0_15px_rgba(121,87,245,0.35)] font-semibold'
                      : 'bg-white dark:bg-[#111321] text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <span>{surf.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Visualizer Canvas Frame */}
        <div className="relative rounded-3xl bg-white dark:bg-[#111321] border border-slate-200 dark:border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_0_60px_rgba(121,87,245,0.18)] p-4 sm:p-6 overflow-hidden">
          {/* Top Bar with Formula & Curvature Readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7957F5] animate-ping" />
              <div>
                <span className="text-sm font-mono font-bold text-slate-900 dark:text-[#F6F7FB]">
                  {currentMeta.formula}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#A6A9B8] block font-mono">
                  {currentMeta.property}
                </span>
              </div>
            </div>

            {/* Quick interactive controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  wireframeMode
                    ? 'bg-[#7957F5]/15 text-[#7957F5] dark:text-white dark:bg-[#7957F5]/20 border border-[#7957F5]/30'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Toggle Wireframe Mesh"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  autoRotate
                    ? 'bg-[#D94BCB]/15 text-[#D94BCB] dark:text-white dark:bg-[#D94BCB]/20 border border-[#D94BCB]/30'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Spin</span>
              </button>
            </div>
          </div>

          {/* Three.js Canvas Container */}
          <div
            ref={canvasContainerRef}
            className="w-full h-[380px] sm:h-[480px] cursor-grab active:cursor-grabbing select-none"
            title="Drag to orbit in 3D"
          />

          {/* Interactive instruction cue */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-[#A6A9B8]">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#7957F5]" />
              <span>Click and drag to rotate surface freely in 3D space</span>
            </div>
            <span className="text-slate-400 dark:text-white/60">
              Calculated directly from continuous mathematical topology
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
