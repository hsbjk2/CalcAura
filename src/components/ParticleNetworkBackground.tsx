import React, { useEffect, useRef } from 'react';

interface ParticleNetworkBackgroundProps {
  darkMode: boolean;
  activeTab?: string;
}

interface NodePoint {
  // Base parametric positions
  baseX: number;
  baseY: number;
  z: number; // depth: -100 to 100
  // Dynamic offsets
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Wave parameters
  strandIndex: number;
  nodeIndex: number;
  phaseX: number;
  phaseY: number;
  speedMultiplier: number;
  // Node visual attributes
  radius: number;
  isLuminous: boolean; // Brighter anchor node with glowing halo
  luminousPhase: number;
  colorType: 'cyan' | 'teal' | 'turquoise' | 'bright';
  // Floating particle flag (ambient dust)
  isFloating: boolean;
}

export const ParticleNetworkBackground: React.FC<ParticleNetworkBackgroundProps> = ({
  darkMode,
  activeTab,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; active: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  // Track dark mode in ref to avoid recreating the animation loop
  const darkModeRef = useRef<boolean>(darkMode);
  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  // Smooth page scroll tracking for organic depth parallax
  const targetScrollYRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize with current scroll
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFactor = prefersReducedMotion ? 0.15 : 1.0;

    // Detect screen density & mobile device
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Configuration
    const STRAND_COUNT = isMobile ? 3 : isTablet ? 4 : 5;
    const NODES_PER_STRAND = isMobile ? 16 : isTablet ? 22 : 28;
    const FLOATING_PARTICLE_COUNT = isMobile ? 24 : isTablet ? 36 : 52;
    const MAX_CONNECT_DISTANCE = isMobile ? 85 : isTablet ? 105 : 125;
    const MAX_CONNECTIONS_PER_NODE = 4;

    // Generate network nodes
    let nodes: NodePoint[] = [];

    const initializeNodes = () => {
      nodes = [];
      const centerY = height * 0.62; // Center wave in lower-middle section (matching reference image)
      const paddingX = 140;
      const totalWidth = width + paddingX * 2;

      // 1. WAVE MESH NODES (Organized in flowing topological strands)
      for (let s = 0; s < STRAND_COUNT; s++) {
        const strandOffset = (s - STRAND_COUNT / 2) * (isMobile ? 28 : 42);
        const strandDepth = (s - STRAND_COUNT / 2) * 35;

        for (let i = 0; i < NODES_PER_STRAND; i++) {
          const ratio = i / (NODES_PER_STRAND - 1);
          const baseX = -paddingX + ratio * totalWidth;
          const jitterX = (Math.random() - 0.5) * (isMobile ? 18 : 28);
          const jitterY = (Math.random() - 0.5) * (isMobile ? 22 : 36);

          const isLuminous = Math.random() < (isMobile ? 0.14 : 0.12);
          const colorTypes: ('cyan' | 'teal' | 'turquoise' | 'bright')[] = ['cyan', 'teal', 'turquoise', 'bright'];
          const colorType = isLuminous ? 'bright' : colorTypes[Math.floor(Math.random() * colorTypes.length)];

          nodes.push({
            baseX: baseX + jitterX,
            baseY: centerY + strandOffset + jitterY,
            z: strandDepth + (Math.random() - 0.5) * 30,
            x: baseX + jitterX,
            y: centerY + strandOffset + jitterY,
            vx: 0,
            vy: 0,
            strandIndex: s,
            nodeIndex: i,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            speedMultiplier: 0.8 + Math.random() * 0.4,
            radius: isLuminous ? (isMobile ? 2.5 : 3.4) : 1.2 + Math.random() * 1.4,
            isLuminous,
            luminousPhase: Math.random() * Math.PI * 2,
            colorType,
            isFloating: false,
          });
        }
      }

      // 2. CELESTIAL FLOATING PARTICLES (Ambient dust drifting throughout the space)
      for (let f = 0; f < FLOATING_PARTICLE_COUNT; f++) {
        const fx = Math.random() * width;
        const fy = Math.random() * height;
        const isLuminous = Math.random() < 0.08;

        nodes.push({
          baseX: fx,
          baseY: fy,
          z: (Math.random() - 0.5) * 90,
          x: fx,
          y: fy,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          strandIndex: -1,
          nodeIndex: f,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          speedMultiplier: 0.6 + Math.random() * 0.6,
          radius: isLuminous ? (isMobile ? 2.2 : 2.8) : 0.8 + Math.random() * 1.2,
          isLuminous,
          luminousPhase: Math.random() * Math.PI * 2,
          colorType: isLuminous ? 'bright' : Math.random() > 0.5 ? 'cyan' : 'turquoise',
          isFloating: true,
        });
      }
    };

    initializeNodes();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initializeNodes();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pointer move handler (subtle mouse deflection & parallax)
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      mouseRef.current.targetX = clientX;
      mouseRef.current.targetY = clientY;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    // Visibility change handler (pause animation when tab hidden)
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Main animation loop with dynamic frame-rate throttling
    let lastTime = performance.now();
    let lastRenderTimestamp = 0;
    let elapsed = 0;

    const render = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(render);
      if (!isTabVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += dt * speedFactor;

      // Smooth scroll tracking with organic damping
      const scrollDelta = targetScrollYRef.current - scrollYRef.current;
      scrollYRef.current += scrollDelta * 0.12;
      const currentScrollY = scrollYRef.current;
      const scrollParallaxY = -currentScrollY * 0.42;

      const isDark = darkModeRef.current;

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // --- ATMOSPHERIC BACKGROUND RADIAL GLOW (Displaced gently by page scroll) ---
      const waveCenterY = height * 0.62 + scrollParallaxY * 0.22;
      const waveCenterX = width * 0.55;

      if (isDark) {
        // Deep Obsidian Background (#05080D)
        ctx.fillStyle = '#05080D';
        ctx.fillRect(0, 0, width, height);

        // Soft Cyan Atmospheric Haze along the wave ridge
        const atmosphericGrad = ctx.createRadialGradient(
          waveCenterX,
          waveCenterY,
          50,
          waveCenterX,
          waveCenterY,
          width * 0.65
        );
        atmosphericGrad.addColorStop(0, 'rgba(6, 182, 212, 0.09)');
        atmosphericGrad.addColorStop(0.35, 'rgba(20, 184, 166, 0.05)');
        atmosphericGrad.addColorStop(0.7, 'rgba(14, 116, 144, 0.02)');
        atmosphericGrad.addColorStop(1, 'rgba(5, 8, 13, 0)');

        ctx.fillStyle = atmosphericGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Clean off-white / light slate background
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(0, 0, width, height);

        // Soft teal-cyan atmospheric haze for light theme
        const atmosphericGrad = ctx.createRadialGradient(
          waveCenterX,
          waveCenterY,
          50,
          waveCenterX,
          waveCenterY,
          width * 0.6
        );
        atmosphericGrad.addColorStop(0, 'rgba(13, 148, 136, 0.06)');
        atmosphericGrad.addColorStop(0.4, 'rgba(2, 132, 199, 0.04)');
        atmosphericGrad.addColorStop(1, 'rgba(248, 250, 252, 0)');

        ctx.fillStyle = atmosphericGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Mouse Parallax Offset
      const mouseParallaxX = mouse.active ? ((mouse.x / width) - 0.5) * 22 : 0;
      const mouseParallaxY = mouse.active ? ((mouse.y / height) - 0.5) * 16 : 0;

      // Update Node Positions
      const t = elapsed;
      const nodeCount = nodes.length;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        if (!node.isFloating) {
          // --- ORGANIC FLOWING WAVE FORMATIONS WITH DEPTH SCROLL PARALLAX ---
          const normX = node.baseX / width;
          const k1 = 2.4;
          const k2 = 4.2;
          const k3 = 1.1;

          const waveAmp1 = (isMobile ? 32 : 55);
          const waveAmp2 = (isMobile ? 18 : 28);
          const waveAmp3 = (isMobile ? 12 : 20);

          const w1 = t * 0.75 * node.speedMultiplier;
          const w2 = t * 1.05 * node.speedMultiplier;
          const w3 = t * 0.45;

          const strandOffset = node.strandIndex * 0.35;

          const waveY =
            Math.sin(normX * k1 * Math.PI + w1 + strandOffset) * waveAmp1 +
            Math.cos(normX * k2 * Math.PI - w2 + strandOffset * 1.5) * waveAmp2 +
            Math.sin(normX * k3 * Math.PI * 0.5 + w3) * waveAmp3;

          const localDriftX = Math.cos(t * 0.9 + node.phaseX) * (isMobile ? 6 : 10);
          const localDriftY = Math.sin(t * 1.1 + node.phaseY) * (isMobile ? 7 : 12);

          // Apply vertical scroll displacement according to 3D depth z
          const nodeScrollDisplacement = scrollParallaxY * (1 + node.z * 0.005);

          let targetX = node.baseX + localDriftX + mouseParallaxX * (1 + node.z * 0.005);
          let targetY = node.baseY + waveY + localDriftY + nodeScrollDisplacement + mouseParallaxY * (1 + node.z * 0.005);

          // Mouse proximity reaction (gentle elastic deflection)
          if (mouse.active) {
            const dx = targetX - mouse.x;
            const dy = targetY - mouse.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 140;

            if (dist < influenceRadius && dist > 1) {
              const pushForce = Math.pow(1 - dist / influenceRadius, 2) * 35;
              targetX += (dx / dist) * pushForce;
              targetY += (dy / dist) * pushForce;
            }
          }

          node.x = targetX;
          node.y = targetY;
        } else {
          // --- CELESTIAL FLOATING DUST PARTICLES (Streaming with scroll velocity) ---
          node.x += node.vx * (1 + Math.sin(t + node.phaseX) * 0.3);
          // Stream particles upward when scrolling down, and downward when scrolling up
          node.y += node.vy * (1 + Math.cos(t + node.phaseY) * 0.3) - scrollDelta * 0.28;

          if (node.x < -30) node.x = width + 30;
          if (node.x > width + 30) node.x = -30;
          if (node.y < -50) node.y = height + 50;
          if (node.y > height + 50) node.y = -50;

          if (mouse.active) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 120;
            if (dist < influenceRadius && dist > 1) {
              const push = (1 - dist / influenceRadius) * 20;
              node.x += (dx / dist) * push;
              node.y += (dy / dist) * push;
            }
          }
        }
      }

      // --- DRAW CONNECTING LINES (Interconnected Plexus Filaments) ---
      const currentConnectDist = MAX_CONNECT_DISTANCE;
      const currentMaxConnections = MAX_CONNECTIONS_PER_NODE;

      const sortedIndices = nodes.map((_, idx) => idx).sort((a, b) => nodes[a].x - nodes[b].x);
      const connectionCount = new Uint8Array(nodeCount);

      ctx.lineWidth = isMobile ? 0.75 : 0.9;

      for (let i = 0; i < nodeCount; i++) {
        const idxA = sortedIndices[i];
        const nodeA = nodes[idxA];

        if (connectionCount[idxA] >= currentMaxConnections) continue;

        for (let j = i + 1; j < nodeCount; j++) {
          const idxB = sortedIndices[j];
          const nodeB = nodes[idxB];

          const dx = nodeB.x - nodeA.x;
          if (dx > currentConnectDist) break;

          const dy = nodeB.y - nodeA.y;
          if (Math.abs(dy) > currentConnectDist) continue;

          const dist = Math.hypot(dx, dy);
          if (dist >= currentConnectDist) continue;

          if (connectionCount[idxB] >= currentMaxConnections) continue;

          const distFactor = 1 - dist / currentConnectDist;
          let alpha = Math.pow(distFactor, 1.4);

          const isLuminousLine = nodeA.isLuminous || nodeB.isLuminous;
          if (isLuminousLine) {
            alpha = Math.min(1, alpha * 1.5);
          }

          if (isDark) {
            const baseAlpha = isLuminousLine ? 0.32 : 0.18;
            const lineAlpha = (alpha * baseAlpha).toFixed(3);
            ctx.strokeStyle = isLuminousLine
              ? `rgba(34, 211, 238, ${lineAlpha})`
              : `rgba(20, 184, 166, ${lineAlpha})`;
          } else {
            const baseAlpha = isLuminousLine ? 0.22 : 0.12;
            const lineAlpha = (alpha * baseAlpha).toFixed(3);
            ctx.strokeStyle = isLuminousLine
              ? `rgba(2, 132, 199, ${lineAlpha})`
              : `rgba(13, 148, 136, ${lineAlpha})`;
          }

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();

          connectionCount[idxA]++;
          connectionCount[idxB]++;
        }
      }

      // --- DRAW PARTICLES & GLOWING NODES ---
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        let currentRadius = node.radius;
        if (node.isLuminous) {
          const pulse = Math.sin(t * 2.2 + node.luminousPhase) * 0.45;
          currentRadius += pulse;
        }

        if (isDark) {
          if (node.isLuminous) {
            const haloRadius = currentRadius * (isMobile ? 4.5 : 6.0);

            // High-fidelity multi-stop radial gradient
            const glow = ctx.createRadialGradient(
              node.x,
              node.y,
              0,
              node.x,
              node.y,
              haloRadius
            );
            glow.addColorStop(0, 'rgba(0, 242, 254, 0.7)');
            glow.addColorStop(0.3, 'rgba(34, 211, 238, 0.35)');
            glow.addColorStop(0.7, 'rgba(20, 184, 166, 0.12)');
            glow.addColorStop(1, 'rgba(5, 8, 13, 0)');

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
            ctx.fill();

            // Radiant Core
            ctx.fillStyle = '#E0FCFC';
            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius * 0.85, 0, Math.PI * 2);
            ctx.fill();
          } else {
            let color = 'rgba(34, 211, 238, 0.75)';
            if (node.colorType === 'teal') {
              color = 'rgba(20, 184, 166, 0.7)';
            } else if (node.colorType === 'turquoise') {
              color = 'rgba(45, 212, 191, 0.8)';
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, Math.max(0.7, currentRadius), 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          if (node.isLuminous) {
            const haloRadius = currentRadius * 4.5;
            const glow = ctx.createRadialGradient(
              node.x,
              node.y,
              0,
              node.x,
              node.y,
              haloRadius
            );
            glow.addColorStop(0, 'rgba(13, 148, 136, 0.35)');
            glow.addColorStop(0.4, 'rgba(2, 132, 199, 0.18)');
            glow.addColorStop(1, 'rgba(248, 250, 252, 0)');

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#0F766E';
            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius * 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const color =
              node.colorType === 'teal'
                ? 'rgba(13, 148, 136, 0.65)'
                : 'rgba(2, 132, 199, 0.6)';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, Math.max(0.7, currentRadius), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden w-full h-full select-none"
    >
      <canvas
        ref={canvasRef}
        className="particle-background-canvas w-full h-full block"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
};
