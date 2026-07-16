"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
};

export default function DialogParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const mobile = window.matchMedia("(max-width: 800px), (pointer: coarse)").matches;
    if (mobile) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000, active: false };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let pageVisible = !document.hidden;
    let siteIdle = document.documentElement.classList.contains("is-site-idle");

    const createParticle = (fromEdge = false): Particle => {
      const speed = 0.45 + Math.random() * 1.15;
      return {
        x: fromEdge ? width + 30 + Math.random() * 140 : Math.random() * width,
        y: fromEdge ? -60 - Math.random() * 160 : Math.random() * height,
        vx: -speed,
        vy: speed * (0.72 + Math.random() * 0.45),
        baseVx: -speed,
        baseVy: speed * (0.72 + Math.random() * 0.45),
        size: 0.7 + Math.random() * 2.2,
        opacity: 0.16 + Math.random() * 0.38
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const targetCount = Math.max(55, Math.min(130, Math.round((width * height) / 13000)));
      particles.length = 0;
      for (let index = 0; index < targetCount; index += 1) particles.push(createParticle());
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const draw = () => {
      frame = 0;
      if (!running || !pageVisible || siteIdle) return;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reducedMotion) {
          if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 150) {
              const force = (1 - distance / 150) * 0.38;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.vx += (particle.baseVx - particle.vx) * 0.035;
          particle.vy += (particle.baseVy - particle.vy) * 0.035;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -80 || particle.y > height + 80) {
            Object.assign(particle, createParticle(true));
          }
        }

        const streakLength = 8 + Math.abs(particle.vx) * 8;
        const gradient = context.createLinearGradient(
          particle.x + streakLength,
          particle.y - streakLength,
          particle.x,
          particle.y
        );
        gradient.addColorStop(0, "rgba(170, 152, 255, 0)");
        gradient.addColorStop(1, `rgba(201, 190, 255, ${particle.opacity})`);
        context.strokeStyle = gradient;
        context.lineWidth = particle.size;
        context.beginPath();
        context.moveTo(particle.x + streakLength, particle.y - streakLength);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (!running || !pageVisible || siteIdle || frame) return;
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    const onIdleChange = (event: Event) => {
      siteIdle = Boolean((event as CustomEvent<{ idle?: boolean }>).detail?.idle);
      if (siteIdle) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("portfolio-idle-change", onIdleChange);
    resize();
    start();

    return () => {
      running = false;
      stop();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("portfolio-idle-change", onIdleChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="dialog-particles" aria-hidden="true" />;
}
