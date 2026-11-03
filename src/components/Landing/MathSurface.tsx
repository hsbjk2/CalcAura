import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { evaluateExpressionXY } from '../../math/parser.ts';

interface MathSurfaceProps {
  expression?: string;
  className?: string;
  interactive?: boolean;
  accent?: string;
  amplitude?: number;
  ariaLabel?: string;
}

const SEGMENTS = 44;
const SPAN = 6;

function sampleSurface(expression: string, x: number, y: number): number {
  const value = evaluateExpressionXY(expression, x, y);
  return Number.isFinite(value) ? value : 0;
}

/**
 * A small, self-contained Three.js surface. It reads the same expression parser as
 * the calculator, pauses when it leaves the viewport, and falls back to a drawn
 * SVG if the browser has no WebGL or the visitor asked for reduced motion.
 */
export const MathSurface: React.FC<MathSurfaceProps> = ({
  expression = 'sin(x) * cos(y)',
  className = '',
  interactive = true,
  accent = '#c9f04e',
  amplitude = 1.9,
  ariaLabel,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setFailed(true);
      return;
    }

    setFailed(false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, -7.2, 5.6);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.PlaneGeometry(SPAN, SPAN, SEGMENTS, SEGMENTS);
    const position = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      const raw = sampleSurface(expression, x * 0.9, y * 0.9);
      const z = THREE.MathUtils.clamp(raw, -amplitude, amplitude) * 0.62;
      position.setZ(i, z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();

    const solid = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent),
      transparent: true,
      opacity: 0.075,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const wire = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent),
      transparent: true,
      opacity: 0.58,
      wireframe: true,
      depthWrite: false,
    });

    const solidMesh = new THREE.Mesh(geometry, solid);
    const wireMesh = new THREE.Mesh(geometry, wire);
    group.add(solidMesh, wireMesh);

    // A quiet frame around the plot: four hairlines drawn in 3D, not CSS borders.
    const framePoints = [
      -SPAN / 2, -SPAN / 2, 0, SPAN / 2, -SPAN / 2, 0,
      SPAN / 2, -SPAN / 2, 0, SPAN / 2, SPAN / 2, 0,
      SPAN / 2, SPAN / 2, 0, -SPAN / 2, SPAN / 2, 0,
      -SPAN / 2, SPAN / 2, 0, -SPAN / 2, -SPAN / 2, 0,
    ];
    const frameGeometry = new THREE.BufferGeometry();
    frameGeometry.setAttribute('position', new THREE.Float32BufferAttribute(framePoints, 3));
    const frameMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(accent),
      transparent: true,
      opacity: 0.22,
    });
    group.add(new THREE.LineSegments(frameGeometry, frameMaterial));

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reduced) renderer.render(scene, camera);
    };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(host);
    resize();

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (!interactive || reduced) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      host.style.cursor = 'grabbing';
      host.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!interactive || reduced || !dragging) return;
      target.y += (event.clientX - lastX) * 0.006;
      target.x += (event.clientY - lastY) * 0.004;
      target.x = THREE.MathUtils.clamp(target.x, -0.55, 0.55);
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
      host.style.cursor = interactive ? 'grab' : 'default';
    };

    if (interactive) {
      host.style.cursor = 'grab';
      host.style.touchAction = 'pan-y';
      host.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    let visible = true;
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
        }, { rootMargin: '120px' })
      : null;
    io?.observe(host);

    let raf = 0;
    let started = performance.now();
    const loop = (now: number) => {
      raf = window.requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = (now - started) / 1000;
      current.x += (target.x - current.x) * 0.055;
      current.y += (target.y - current.y) * 0.055;
      group.rotation.x = current.x;
      group.rotation.y = current.y + Math.sin(t * 0.18) * 0.16;
      group.rotation.z = Math.sin(t * 0.12) * 0.035;
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      io?.disconnect();
      observer?.disconnect();
      if (interactive) {
        host.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      }
      geometry.dispose();
      frameGeometry.dispose();
      solid.dispose();
      wire.dispose();
      frameMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
      host.style.cursor = '';
      host.style.touchAction = '';
    };
  }, [expression, accent, amplitude, interactive, reduced]);

  const fallbackPaths = (() => {
    const lines: string[] = [];
    for (let i = 0; i <= 8; i += 1) {
      const y = 8 + (i / 8) * 84;
      lines.push(`M 6 ${y.toFixed(1)} H 194`);
    }
    for (let i = 0; i <= 10; i += 1) {
      const x = 6 + (i / 10) * 188;
      lines.push(`M ${x.toFixed(1)} 8 V 92`);
    }
    let path = '';
    for (let i = 0; i <= 60; i += 1) {
      const x = -3 + (i / 60) * 6;
      const value = sampleSurface(expression, x, 0.75);
      const px = 6 + (i / 60) * 188;
      const py = 50 - THREE.MathUtils.clamp(value, -2.4, 2.4) * 12;
      path += `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)} `;
    }
    return { lines, path };
  })();

  return (
    <div
      ref={hostRef}
      className={`math-surface ${className}`.trim()}
      role="img"
      aria-label={ariaLabel || `Live three-dimensional surface of ${expression}`}
    >
      {failed && (
        <svg className="math-surface__fallback" viewBox="0 0 200 100" aria-hidden="true" preserveAspectRatio="none">
          {fallbackPaths.lines.map((d, index) => (
            <path key={index} d={d} fill="none" stroke={accent} strokeOpacity="0.16" strokeWidth="0.6" />
          ))}
          <path d={fallbackPaths.path} fill="none" stroke={accent} strokeOpacity="0.85" strokeWidth="1.4" />
        </svg>
      )}
    </div>
  );
};
