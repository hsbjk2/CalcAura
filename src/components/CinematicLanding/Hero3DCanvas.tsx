import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // Graceful fallback
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 5.2);
    camera.lookAt(0, 0, 0);

    // Group for all rotating elements
    const group = new THREE.Group();
    scene.add(group);

    // Create Mathematical Hyperbolic Surface z = (x^2 - y^2) / 3
    const size = 3.6;
    const segments = 48;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = (x * x - y * y) / 3.4;
      pos.setZ(i, z);
    }
    geometry.computeVertexNormals();

    // Solid surface material with violet specular lighting
    const surfaceMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1a1738'),
      emissive: new THREE.Color('#100b29'),
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      wireframe: false,
      side: THREE.DoubleSide,
    });
    const surfaceMesh = new THREE.Mesh(geometry, surfaceMat);
    surfaceMesh.rotation.x = -Math.PI / 2.8;
    group.add(surfaceMesh);

    // Wireframe overlay in violet & cyan
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#7957F5'),
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    wireframeMesh.rotation.x = -Math.PI / 2.8;
    group.add(wireframeMesh);

    // Floating coordinate circles / orbital rings
    const ringGeo = new THREE.RingGeometry(2.4, 2.42, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D94BCB'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.2;
    group.add(ringMesh);

    // Subtle coordinate grid plane underneath
    const gridHelper = new THREE.GridHelper(5, 16, '#5558E8', '#222044');
    gridHelper.position.y = -1.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.4;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight('#7957F5', 18, 15);
    violetLight.position.set(3, 4, 3);
    scene.add(violetLight);

    const magentaLight = new THREE.PointLight('#D94BCB', 14, 15);
    magentaLight.position.set(-3, -2, 2);
    scene.add(magentaLight);

    const cyanLight = new THREE.DirectionalLight('#38BDF8', 1.2);
    cyanLight.position.set(0, 5, -2);
    scene.add(cyanLight);

    // Render loop with subtle auto-rotation and mouse interaction
    let animId: number;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.4;
      targetRotX = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Pause when outside viewport to conserve GPU resources
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Subtle base rotation + smooth mouse tilt
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      group.rotation.y = elapsed * 0.15 + currentRotY;
      group.rotation.x = Math.sin(elapsed * 0.2) * 0.08 + currentRotX;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      surfaceMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] pointer-events-auto select-none ${className}`}
      aria-label="3D Mathematical Hyperbolic Surface Visualization"
    />
  );
};
