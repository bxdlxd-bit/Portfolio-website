"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      duration: 1.08,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const syncLockState = () => {
      const introLocked = document.documentElement.classList.contains("intro-locked");
      const modalLocked = document.body.style.overflow === "hidden";
      if (introLocked || modalLocked) lenis.stop();
      else lenis.start();
    };

    const lockObserver = new MutationObserver(syncLockState);
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    syncLockState();
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      lockObserver.disconnect();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
