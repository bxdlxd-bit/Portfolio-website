"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  depth: number;
};

export default function LandingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let frame = 0;
    let lastDraw = 0;
    let isVisible = true;
    let pageVisible = !document.hidden;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let particles: Particle[] = [];

    const makeParticle = (fromRight = false): Particle => {
      const activeHeight = height * 0.9;
      const depth = 0.45 + Math.random() * 0.75;
      return {
        x: fromRight ? width + 40 + Math.random() * 180 : Math.random() * width,
        y: 14 + Math.random() * Math.max(48, activeHeight - 28),
        vx: -(0.12 + Math.random() * 0.28) * depth,
        vy: (Math.random() - 0.5) * 0.08,
        radius: (3.5 + Math.random() * 10.5) * depth,
        alpha: 0.08 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        depth
      };
    };

    const makeParticles = () => {
      const count = width < 700 ? 12 : width < 1200 ? 17 : 22;
      particles = Array.from({ length: count }, () => makeParticle(false));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width || window.innerWidth);
      height = Math.max(1, bounds.height || window.innerHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeParticles();
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerActive = pointerY >= 0 && pointerY <= height;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible && isVisible && !frame) frame = requestAnimationFrame(draw);
    };

    const draw = (time: number) => {
      frame = 0;
      if (!pageVisible || !isVisible) return;
      if (time - lastDraw < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const delta = Math.min(2, (time - lastDraw) / 16.667 || 1);
      lastDraw = time;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        const turbulence = Math.sin(time * 0.00062 + particle.phase + particle.x * 0.006) * 0.055;
        const secondary = Math.cos(time * 0.00041 + index * 0.83 + particle.y * 0.012) * 0.028;
        particle.vy += (turbulence + secondary - particle.vy) * 0.018 * delta;
        particle.vx += ((-0.16 - particle.depth * 0.17) - particle.vx) * 0.012 * delta;

        if (pointerActive) {
          const dx = particle.x - pointerX;
          const dy = particle.y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0.1 && distance < 190) {
            const force = (1 - distance / 190) * 0.038 * delta;
            particle.vx += (dx / distance) * force - (dy / distance) * force * 0.42;
            particle.vy += (dy / distance) * force + (dx / distance) * force * 0.42;
          }
        }

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        const topLimit = 10;
        const bottomLimit = height * 0.9;
        if (particle.y < topLimit) {
          particle.y = topLimit;
          particle.vy = Math.abs(particle.vy) * 0.55;
        } else if (particle.y > bottomLimit) {
          particle.y = bottomLimit;
          particle.vy = -Math.abs(particle.vy) * 0.55;
        }

        if (particle.x < -particle.radius * 4) {
          Object.assign(particle, makeParticle(true));
        }

        const pulse = 0.82 + Math.sin(time * 0.0011 + particle.phase) * 0.18;
        const radius = particle.radius * pulse;
        const gradientPosition = Math.max(0, Math.min(1, particle.x / Math.max(1, width)));
        const red = Math.round(184 + (255 - 184) * gradientPosition);
        const green = Math.round(156 + (158 - 156) * gradientPosition);
        const blue = Math.round(255 + (128 - 255) * gradientPosition);
        const gradient = context.createRadialGradient(
          particle.x - radius * 0.25,
          particle.y - radius * 0.25,
          0,
          particle.x,
          particle.y,
          radius
        );
        gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${particle.alpha * 1.2})`);
        gradient.addColorStop(0.42, `rgba(${red}, ${green}, ${blue}, ${particle.alpha})`);
        gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.shadowBlur = radius * 1.25;
        context.shadowColor = `rgba(${red}, ${green}, ${blue}, ${particle.alpha * 0.5})`;
        context.fill();
      });

      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && pageVisible && !frame) frame = requestAnimationFrame(draw);
      if (!isVisible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { threshold: 0.01 });

    observer.observe(canvas);
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="landing-particles" aria-hidden="true" />;
}
