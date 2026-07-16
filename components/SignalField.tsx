"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function SignalField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      mount.dataset.webgl = "unavailable";
      return;
    }

    const basePixelRatio = Math.min(window.devicePixelRatio, 1.25);
    let currentPixelRatio = basePixelRatio;
    let currentRenderScale = Number(mount.dataset.renderScale ?? 1);
    renderer.setPixelRatio(currentPixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7;

    const spinGroup = new THREE.Group();
    const pulseGroup = new THREE.Group();
    const idleGroup = new THREE.Group();
    scene.add(spinGroup);
    spinGroup.add(pulseGroup);
    pulseGroup.add(idleGroup);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 3),
      new THREE.MeshBasicMaterial({ color: 0xa899ff, wireframe: true, transparent: true, opacity: 0.12 })
    );
    idleGroup.add(shell);

    const pointCount = 500;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i += 1) {
      const radius = 2.2 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xd8d2ff, size: 0.025, transparent: true, opacity: 0.5, sizeAttenuation: true })
    );
    idleGroup.add(particles);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let sceneActive = mount.dataset.active === "true";
    let pageVisible = !document.hidden;
    let siteIdle = document.documentElement.classList.contains("is-site-idle");
    let lastRenderAt = 0;
    let lastCarouselIndex = -1;
    let lastPhase = mount.dataset.phase ?? "hidden";
    let pendingRingCall: gsap.core.Tween | null = null;
    const frameInterval = 1000 / (window.innerWidth <= 800 ? 30 : 45);
    let lastResizePhase = mount.dataset.phase ?? "hidden";
    let lastResizeScale = mount.dataset.renderScale ?? "1";

    const orbitSystem = () => document.querySelector<HTMLElement>(".globe-orbit-system");

    const setRingCount = (count: number) => {
      const system = orbitSystem();
      if (system) system.dataset.ringCount = String(Math.max(0, Math.min(5, count)));
    };

    const animateCarouselStep = (nextIndex: number) => {
      const previous = lastCarouselIndex;
      const delta = previous < 0 ? 1 : nextIndex - previous;
      lastCarouselIndex = nextIndex;
      pendingRingCall?.kill();

      if (reduceMotion || delta === 0) {
        setRingCount(nextIndex + 1);
        return;
      }

      const direction = Math.sign(delta) || 1;
      const steps = Math.max(1, Math.abs(delta));
      gsap.killTweensOf(spinGroup.rotation);
      gsap.timeline()
        .to(spinGroup.rotation, {
          y: `+=${0.48 * steps * direction}`,
          x: `+=${0.075 * steps * direction}`,
          duration: 0.22 + (steps - 1) * 0.08,
          ease: "power3.in",
          overwrite: true
        })
        .to(spinGroup.rotation, {
          y: `+=${0.16 * steps * direction}`,
          x: `+=${0.018 * steps * direction}`,
          duration: 0.48 + (steps - 1) * 0.1,
          ease: "power3.out"
        });

      gsap.killTweensOf(pulseGroup.scale);
      gsap.timeline()
        .to(pulseGroup.scale, {
          x: 0.93,
          y: 0.93,
          z: 0.93,
          duration: 0.16,
          ease: "power2.in"
        })
        .to(pulseGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.44,
          ease: "back.out(1.75)"
        });

      pendingRingCall = gsap.delayedCall(0.34, () => setRingCount(nextIndex + 1));
    };

    const resize = () => {
      const cssWidth = Math.max(1, mount.offsetWidth);
      const cssHeight = Math.max(1, mount.offsetHeight);
      const phase = mount.dataset.phase ?? "hidden";
      const requestedScale = Math.max(1, Number(mount.dataset.renderScale ?? currentRenderScale));
      currentRenderScale = requestedScale;

      const requestedPixelRatio = phase === "final"
        ? window.devicePixelRatio * requestedScale
        : basePixelRatio;
      const maxDimensionRatio = 4096 / Math.max(cssWidth, cssHeight);
      const maxAreaRatio = Math.sqrt(14_500_000 / Math.max(cssWidth * cssHeight, 1));
      const targetPixelRatio = Math.max(1, Math.min(requestedPixelRatio, maxDimensionRatio, maxAreaRatio));

      if (Math.abs(targetPixelRatio - currentPixelRatio) > 0.01) {
        currentPixelRatio = targetPixelRatio;
        renderer.setPixelRatio(currentPixelRatio);
      }

      renderer.setSize(cssWidth, cssHeight, false);
      camera.aspect = cssWidth / cssHeight;
      camera.updateProjectionMatrix();
      if (sceneActive && pageVisible) renderer.render(scene, camera);
    };

    const onPointer = (event: PointerEvent) => {
      if (!sceneActive) return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const render = (now: number) => {
      frame = 0;
      if (!sceneActive || !pageVisible || siteIdle) return;

      if (!reduceMotion && now - lastRenderAt >= frameInterval) {
        lastRenderAt = now;
        idleGroup.rotation.y += 0.0024;
        idleGroup.rotation.x += 0.0008;
        idleGroup.rotation.y += (pointerX * 0.22 - idleGroup.rotation.y * 0.025) * 0.01;
        camera.position.y += (-pointerY * 0.55 - camera.position.y) * 0.025;
        renderer.render(scene, camera);
      } else if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!sceneActive || !pageVisible || siteIdle || frame) return;
      if (reduceMotion) {
        renderer.render(scene, camera);
        return;
      }
      frame = requestAnimationFrame(render);
    };

    const syncState = () => {
      sceneActive = mount.dataset.active === "true";
      const phase = mount.dataset.phase ?? "hidden";
      const renderScale = mount.dataset.renderScale ?? "1";
      const carouselIndex = Number(mount.dataset.carouselIndex ?? -1);

      if (phase !== lastResizePhase || renderScale !== lastResizeScale) {
        lastResizePhase = phase;
        lastResizeScale = renderScale;
        resize();
      }

      if (phase === "travel" && lastPhase === "carousel") {
        lastCarouselIndex = -1;
        setRingCount(0);
      }

      if (phase === "carousel" && Number.isFinite(carouselIndex) && carouselIndex >= 0 && carouselIndex !== lastCarouselIndex) {
        animateCarouselStep(carouselIndex);
      }

      lastPhase = phase;
      if (sceneActive && pageVisible) start();
      else stop();
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible && !siteIdle) start();
      else stop();
    };

    const onIdleChange = (event: Event) => {
      siteIdle = Boolean((event as CustomEvent<{ idle?: boolean }>).detail?.idle);
      if (siteIdle) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const activityObserver = new MutationObserver(syncState);
    activityObserver.observe(mount, {
      attributes: true,
      attributeFilter: ["data-active", "data-phase", "data-carousel-index", "data-render-scale"]
    });

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("portfolio-idle-change", onIdleChange);
    resize();
    syncState();

    return () => {
      stop();
      pendingRingCall?.kill();
      gsap.killTweensOf(spinGroup.rotation);
      gsap.killTweensOf(pulseGroup.scale);
      resizeObserver.disconnect();
      activityObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("portfolio-idle-change", onIdleChange);
      particlesGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="signal-field"
      ref={mountRef}
      data-active="false"
      data-phase="hidden"
      data-carousel-index="-1"
      data-render-scale="1"
      aria-hidden="true"
    />
  );
}
