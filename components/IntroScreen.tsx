"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type IntroPhase = "entering" | "ready" | "charging" | "releasing";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  angle: number;
  radius: number;
  orbitSpeed: number;
  releaseVx: number;
  releaseVy: number;
};

function IntroParticles({ phase }: { phase: IntroPhase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<IntroPhase>(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    let lastPhase: IntroPhase = phaseRef.current;
    let pointerX = width * 0.5;
    let pointerY = height * 0.5;
    let pointerActive = false;
    let pageVisible = !document.hidden;
    let particles: Particle[] = [];

    const makeParticles = () => {
      const count = width < 700 ? 54 : width < 1200 ? 76 : 96;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0.18 + Math.random() * 0.55,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.22 + Math.random() * 0.58,
        angle: (index / count) * Math.PI * 2 + Math.random() * 0.25,
        radius: Math.min(width, height) * (0.095 + Math.random() * 0.12),
        orbitSpeed: 0.007 + Math.random() * 0.009,
        releaseVx: 0,
        releaseVy: 0
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeParticles();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible && !frame) frame = requestAnimationFrame(draw);
    };

    const prepareRelease = () => {
      const centreX = width * 0.5;
      const centreY = height * 0.5;
      particles.forEach((particle) => {
        const direction = particle.x < centreX ? -1 : 1;
        particle.releaseVx = direction * (4.1 + Math.random() * 4.8);
        particle.releaseVy = (particle.y - centreY) * 0.008 + (Math.random() - 0.5) * 2.4;
      });
    };

    const draw = (time: number) => {
      frame = 0;
      if (!pageVisible) return;

      const activePhase = phaseRef.current;
      if (activePhase !== lastPhase) {
        if (activePhase === "releasing") prepareRelease();
        lastPhase = activePhase;
      }

      context.clearRect(0, 0, width, height);
      const centreX = width * 0.5;
      const centreY = height * 0.5;
      const gust = 0.46 + Math.sin(time * 0.00072) * 0.18 + Math.sin(time * 0.00193) * 0.08;

      particles.forEach((particle, index) => {
        if (activePhase === "entering" || activePhase === "ready") {
          const flow = Math.sin(particle.y * 0.017 + time * 0.00135 + index * 0.21);
          particle.vx += (gust + flow * 0.13 - particle.vx) * 0.024;
          particle.vy += (Math.sin(particle.x * 0.014 - time * 0.0011 + index) * 0.16 - particle.vy) * 0.035;

          if (pointerActive) {
            const dx = particle.x - pointerX;
            const dy = particle.y - pointerY;
            const distance = Math.hypot(dx, dy);
            if (distance < 145 && distance > 0.1) {
              const force = (1 - distance / 145) * 0.72;
              particle.vx += (dx / distance) * force + (-dy / distance) * force * 0.34;
              particle.vy += (dy / distance) * force + (dx / distance) * force * 0.34;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x > width + 18) particle.x = -18;
          if (particle.x < -24) particle.x = width + 18;
          if (particle.y > height + 18) particle.y = -18;
          if (particle.y < -18) particle.y = height + 18;
        } else if (activePhase === "charging") {
          particle.angle += particle.orbitSpeed;
          const radiusPulse = 1 + Math.sin(time * 0.004 + index) * 0.045;
          const targetX = centreX + Math.cos(particle.angle) * particle.radius * radiusPulse;
          const targetY = centreY + Math.sin(particle.angle) * particle.radius * 0.58 * radiusPulse;
          particle.x += (targetX - particle.x) * 0.075;
          particle.y += (targetY - particle.y) * 0.075;
          particle.vx *= 0.86;
          particle.vy *= 0.86;
        } else {
          particle.releaseVx *= 1.025;
          particle.x += particle.releaseVx;
          particle.y += particle.releaseVy;
          particle.releaseVy *= 0.997;
        }

        const releaseFade = activePhase === "releasing"
          ? Math.max(0, 1 - Math.abs(particle.x - centreX) / (width * 0.78))
          : 1;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(102, 54, 201, ${particle.alpha * releaseFade})`;
        context.shadowBlur = activePhase === "charging" ? 13 : 6;
        context.shadowColor = "rgba(117, 69, 220, .34)";
        context.fill();
      });

      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-particles" aria-hidden="true" />;
}

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("entering");
  const [showExploreHint, setShowExploreHint] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const html = document.documentElement;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.classList.add("intro-locked");

    const readyTimer = window.setTimeout(() => setPhase("ready"), reducedMotion ? 80 : 1280);
    return () => {
      window.clearTimeout(readyTimer);
      html.classList.remove("intro-locked");
      window.history.scrollRestoration = previousRestoration;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== "ready") {
      setShowExploreHint(false);
      return;
    }

    const hintTimer = window.setTimeout(() => setShowExploreHint(true), reducedMotion ? 500 : 2600);
    return () => window.clearTimeout(hintTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "charging") return;
    const releaseTimer = window.setTimeout(() => setPhase("releasing"), reducedMotion ? 180 : 1160);
    return () => window.clearTimeout(releaseTimer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "releasing") return;
    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 420 : 1720);
    return () => window.clearTimeout(completeTimer);
  }, [onComplete, phase, reducedMotion]);

  const enterSite = useCallback(() => {
    if (phase !== "ready") return;
    setShowExploreHint(false);
    setPhase("charging");
  }, [phase]);

  const isCharging = phase === "charging";
  const isReleasing = phase === "releasing";

  return (
    <div className="intro-screen" data-phase={phase} role="dialog" aria-modal="true" aria-label="Website introduction">
      <div className="intro-panel intro-panel-left" aria-hidden="true" />
      <div className="intro-panel intro-panel-right" aria-hidden="true" />
      <IntroParticles phase={phase} />

      <div className="intro-centre">
        <motion.button
          type="button"
          className="intro-logo"
          aria-label="Enter Joshua Pearman's website"
          disabled={phase !== "ready"}
          onClick={enterSite}
          animate={isCharging && !reducedMotion ? {
            x: [0, -7, 7, -6, 5, -4, 3, -2, 0],
            rotate: [0, -0.8, 0.8, -0.65, 0.55, -0.42, 0.3, -0.18, 0],
            scale: [1, 0.992, 0.978, 0.96, 0.944, 0.925]
          } : { x: 0, rotate: 0, scale: isReleasing ? 0.925 : 1 }}
          transition={isCharging && !reducedMotion ? { duration: 1.12, ease: "easeInOut" } : { duration: 0.16 }}
        >
        <motion.span
          className="intro-letter intro-letter-j"
          initial={reducedMotion ? { opacity: 0 } : { y: "-64vh", rotate: -7, opacity: 0 }}
          animate={isReleasing
            ? { x: "-72vw", y: -18, rotate: -20, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={isReleasing
            ? { duration: reducedMotion ? 0.24 : 0.82, delay: reducedMotion ? 0 : 0.05, ease: [0.45, 0, 0.9, 0.45] }
            : { type: "spring", stiffness: 118, damping: 13, mass: 0.92, delay: 0.08 }}
        >J</motion.span>
        <motion.span
          className="intro-letter intro-letter-p"
          initial={reducedMotion ? { opacity: 0 } : { y: "64vh", rotate: 7, opacity: 0 }}
          animate={isReleasing
            ? { x: "72vw", y: 18, rotate: 20, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={isReleasing
            ? { duration: reducedMotion ? 0.24 : 0.82, delay: reducedMotion ? 0 : 0.05, ease: [0.45, 0, 0.9, 0.45] }
            : { type: "spring", stiffness: 118, damping: 13, mass: 0.92, delay: 0.08 }}
        >P</motion.span>
        </motion.button>

        <motion.p
          className="intro-explore-hint"
          aria-hidden={!showExploreHint}
          initial={false}
          animate={{
            opacity: showExploreHint && phase === "ready" ? 1 : 0,
            y: showExploreHint && phase === "ready" ? 0 : 7
          }}
          transition={{
            opacity: { duration: showExploreHint ? 0.65 : 0.12, ease: "easeOut" },
            y: { duration: showExploreHint ? 0.65 : 0.12, ease: "easeOut" }
          }}
        >
          Tap to explore
        </motion.p>
      </div>
    </div>
  );
}
