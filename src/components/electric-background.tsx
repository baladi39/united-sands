"use client";

import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface Arc {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  life: number;
  maxLife: number;
  opacity: number;
}

export default function ElectricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const arcsRef = useRef<Arc[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const spawnLimitRef = useRef<number | null>(null);
  const isMutedRef = useRef(false);

  const initParticles = useCallback(
    (width: number, height: number, spawnHeight?: number) => {
      const particles: Particle[] = [];
      const limit = Math.max(
        20,
        Math.min(
          typeof spawnHeight === "number" ? spawnHeight : height * 0.6,
          height,
        ),
      );
      const particleCount = Math.floor((width * limit) / 15000);

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * limit;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    },
    [],
  );

  const drawLightningSegment = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    opacity: number,
  ) => {
    const segments = 5;
    const dx = (x2 - x1) / segments;
    const dy = (y2 - y1) / segments;
    const displacement = 15;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    for (let i = 1; i < segments; i++) {
      const nextX = x1 + dx * i + (Math.random() - 0.5) * displacement;
      const nextY = y1 + dy * i + (Math.random() - 0.5) * displacement;
      ctx.lineTo(nextX, nextY);
    }
    ctx.lineTo(x2, y2);

    // Glow effect
    ctx.shadowColor = `rgba(199, 146, 234, ${opacity})`;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = `rgba(199, 146, 234, ${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Core lightning
    ctx.shadowBlur = 5;
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.shadowBlur = 0;
  };

  const animate = useCallback(function frame() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;
    const particles = particlesRef.current;
    const arcs = arcsRef.current;
    const time = Date.now() * 0.001;
    const maxY = spawnLimitRef.current ?? height * 0.65;
    const interactionEnabled = !isMutedRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Floating motion
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary check - keep in upper portion
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > maxY) particle.vy *= -1;

      // Mouse interaction - attraction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200;

      let glowIntensity = 1;

      if (interactionEnabled && distance < maxDistance && distance > 0) {
        const force = (maxDistance - distance) / maxDistance;
        particle.x += dx * force * 0.02;
        particle.y += dy * force * 0.02;
        glowIntensity = 1 + force * 2;

        // Chance to create arc to nearby particle
        if (Math.random() < 0.01 * force) {
          // Find nearby particle
          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const arcDx = other.x - particle.x;
            const arcDy = other.y - particle.y;
            const arcDist = Math.sqrt(arcDx * arcDx + arcDy * arcDy);

            if (arcDist < 100 && arcDist > 20) {
              arcs.push({
                startX: particle.x,
                startY: particle.y,
                endX: other.x,
                endY: other.y,
                life: 1,
                maxLife: 1,
                opacity: 0.8,
              });
              break;
            }
          }
        }
      }

      // Gentle return to base position
      particle.x += (particle.baseX - particle.x) * 0.001;
      particle.y += (particle.baseY - particle.y) * 0.001;

      // Pulsing opacity
      const pulse = Math.sin(
        time * particle.pulseSpeed * 10 + particle.pulseOffset,
      );
      const currentOpacity =
        particle.opacity * (0.7 + pulse * 0.3) * glowIntensity;

      // Draw particle glow
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 4 * glowIntensity,
      );
      gradient.addColorStop(0, `rgba(199, 146, 234, ${currentOpacity})`);
      gradient.addColorStop(0.4, `rgba(155, 89, 182, ${currentOpacity * 0.5})`);
      gradient.addColorStop(1, "rgba(155, 89, 182, 0)");

      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius * 4 * glowIntensity,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw particle core
      ctx.beginPath();
      ctx.arc(
        particle.x,
        particle.y,
        particle.radius * glowIntensity,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
      ctx.fill();
    });

    // Draw and update arcs
    for (let i = arcs.length - 1; i >= 0; i--) {
      const arc = arcs[i];
      arc.life -= 0.05;

      if (arc.life <= 0) {
        arcs.splice(i, 1);
        continue;
      }

      const arcOpacity = arc.opacity * (arc.life / arc.maxLife);
      drawLightningSegment(
        ctx,
        arc.startX,
        arc.startY,
        arc.endX,
        arc.endY,
        arcOpacity,
      );
    }

    // Occasional random arc near mouse
    if (
      interactionEnabled &&
      Math.random() < 0.02 &&
      mouse.x > 0 &&
      mouse.y > 0 &&
      mouse.y < maxY
    ) {
      const nearbyParticles = particles.filter((p) => {
        const d = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2);
        return d < 150 && d > 30;
      });

      if (nearbyParticles.length > 0) {
        const target =
          nearbyParticles[Math.floor(Math.random() * nearbyParticles.length)];
        arcs.push({
          startX: mouse.x + (Math.random() - 0.5) * 20,
          startY: mouse.y + (Math.random() - 0.5) * 20,
          endX: target.x,
          endY: target.y,
          life: 1,
          maxLife: 1,
          opacity: 0.6,
        });
      }
    }

    animationRef.current = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const computeSpawnLimit = () => {
      const safeZone = document.querySelector(
        "[data-electric-safezone]",
      ) as HTMLElement | null;
      if (!safeZone) return canvas.height * 0.6;

      const rect = safeZone.getBoundingClientRect();
      // Keep dots above the subheader with a small buffer
      const limit = Math.max(0, rect.top - 32);
      return Math.min(limit, canvas.height * 0.7);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spawnLimitRef.current = computeSpawnLimit();
      const limit = spawnLimitRef.current ?? canvas.height * 0.6;
      particlesRef.current = initParticles(canvas.width, canvas.height, limit);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMutedRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const attachMuteZone = () => {
      const target = document.querySelector(
        "[data-electric-mute]",
      ) as HTMLElement | null;
      if (!target) return () => undefined;

      const muteOn = () => {
        isMutedRef.current = true;
        mouseRef.current = { x: -1000, y: -1000 };
        arcsRef.current = [];
      };

      const muteOff = () => {
        isMutedRef.current = false;
      };

      target.addEventListener("mouseenter", muteOn);
      target.addEventListener("focus", muteOn);
      target.addEventListener("mouseleave", muteOff);
      target.addEventListener("blur", muteOff);

      return () => {
        target.removeEventListener("mouseenter", muteOn);
        target.removeEventListener("focus", muteOn);
        target.removeEventListener("mouseleave", muteOff);
        target.removeEventListener("blur", muteOff);
      };
    };

    handleResize();
    const cleanupMuteZone = attachMuteZone();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cleanupMuteZone?.();
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-1"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
