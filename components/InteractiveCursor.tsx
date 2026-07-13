"use client";

import { useEffect, useRef } from "react";

const maskSelector = [
  "[data-cursor-mask]",
  "[data-cursor-mask-shell]",
  ".site-header .identity-copy strong",
  ".site-header .identity-copy small",
  ".mobile-menu a > span:first-child",
  ".section-index",
  ".section-heading > p",
  ".project-meta h3",
  ".project-meta > p",
  ".service-card > span",
  ".service-card h3",
  ".service-card p",
  ".about-copy > p:not(.section-index)",
  ".recognition-list span",
  ".recognition-list strong",
  ".contact-card > div:first-child > p:last-child",
  ".contact-email span",
  ".contact-bottom span",
  ".contact-bottom a",
  ".footer p",
  ".footer > a"
].join(",");

const interactiveSelector = [
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "summary",
  ".project-card",
  ".service-card-button",
  ".recognition-toggle"
].join(",");

export default function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let activeTarget: HTMLElement | null = null;
    let activeWordmarkSvg: SVGSVGElement | null = null;
    let activeWordmarkCircle: SVGCircleElement | null = null;
    let targetResizeObserver: ResizeObserver | null = null;
    let frame = 0;
    let x = -120;
    let y = -120;
    let ringX = -120;
    let ringY = -120;
    let maskX = -500;
    let maskY = -500;
    let maskVelocityX = 0;
    let maskVelocityY = 0;
    let targetDocumentLeft = 0;
    let targetDocumentTop = 0;
    let targetWidth = 1;
    let targetHeight = 1;
    let targetMaskRadius = 148;
    let lastBoundsRefresh = 0;
    let cursorVisible = false;
    let pageVisible = !document.hidden;

    const syncWordmarkHighlight = () => {
      if (!activeWordmarkSvg || !activeWordmarkCircle || targetWidth <= 0 || targetHeight <= 0) return;
      const viewBox = activeWordmarkSvg.viewBox.baseVal;
      const scaleX = viewBox.width / targetWidth;
      const scaleY = viewBox.height / targetHeight;
      activeWordmarkCircle.setAttribute("cx", `${viewBox.x + maskX * scaleX}`);
      activeWordmarkCircle.setAttribute("cy", `${viewBox.y + maskY * scaleY}`);
      activeWordmarkCircle.setAttribute("r", `${targetMaskRadius * ((scaleX + scaleY) * 0.5)}`);
    };

    const refreshTargetBounds = () => {
      if (!activeTarget) return;
      const bounds = activeTarget.getBoundingClientRect();
      targetDocumentLeft = bounds.left + window.scrollX;
      targetDocumentTop = bounds.top + window.scrollY;
      targetWidth = Math.max(bounds.width, 1);
      targetHeight = Math.max(bounds.height, 1);
      const configuredRadius = Number.parseFloat(getComputedStyle(activeTarget).getPropertyValue("--cursor-mask-radius")) || 148;
      targetMaskRadius = Math.max(configuredRadius, Math.hypot(targetWidth, targetHeight) * 1.08);
      activeTarget.style.setProperty("--cursor-mask-radius", `${targetMaskRadius.toFixed(2)}px`);
      lastBoundsRefresh = performance.now();
      syncWordmarkHighlight();
    };

    const clearMaskTarget = () => {
      targetResizeObserver?.disconnect();
      targetResizeObserver = null;
      activeWordmarkSvg = null;
      activeWordmarkCircle = null;
      if (!activeTarget) return;
      activeTarget.classList.remove("cursor-mask-active");
      activeTarget = null;
      maskVelocityX = 0;
      maskVelocityY = 0;
    };

    const activateTarget = (nextTarget: HTMLElement | null) => {
      if (activeTarget === nextTarget) return;
      clearMaskTarget();
      activeTarget = nextTarget;
      if (!activeTarget) return;

      activeWordmarkSvg = activeTarget.querySelector<SVGSVGElement>(".landing-wordmark");
      activeWordmarkCircle = activeTarget.querySelector<SVGCircleElement>(".landing-wordmark-highlight-circle");
      refreshTargetBounds();
      maskX = x + window.scrollX - targetDocumentLeft;
      maskY = y + window.scrollY - targetDocumentTop;
      activeTarget.style.setProperty("--cursor-mask-x", `${maskX}px`);
      activeTarget.style.setProperty("--cursor-mask-y", `${maskY}px`);
      activeTarget.classList.add("cursor-mask-active");

      targetResizeObserver = new ResizeObserver(refreshTargetBounds);
      targetResizeObserver.observe(activeTarget);
    };

    const updateHoverState = (source: Element | null) => {
      const nextTarget = source?.closest<HTMLElement>(maskSelector) ?? null;
      const isInteractive = Boolean(source?.closest(interactiveSelector));
      ring.classList.toggle("is-active", isInteractive && !nextTarget);
      ring.classList.toggle("is-mask", Boolean(nextTarget));
      activateTarget(nextTarget);
    };

    const ensureFrame = () => {
      if (!frame && pageVisible && finePointer.matches) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;

      x = event.clientX;
      y = event.clientY;
      cursorVisible = true;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");

      const source = event.target instanceof Element ? event.target : null;
      updateHoverState(source);
      if (activeTarget && performance.now() - lastBoundsRefresh > 320) refreshTargetBounds();
      ensureFrame();
    };

    const onScroll = () => {
      if (!cursorVisible || !finePointer.matches) return;
      const source = document.elementFromPoint(x, y);
      updateHoverState(source);
      ensureFrame();
    };

    const onResize = () => {
      refreshTargetBounds();
      ensureFrame();
    };

    const onPointerLeave = () => {
      cursorVisible = false;
      clearMaskTarget();
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible", "is-active", "is-mask");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    function tick() {
      frame = 0;
      if (!pageVisible || !finePointer.matches || !cursorVisible) return;

      const follow = reducedMotion.matches ? 1 : 0.17;
      ringX += (x - ringX) * follow;
      ringY += (y - ringY) * follow;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      let maskStillMoving = false;
      if (activeTarget) {
        const targetX = x + window.scrollX - targetDocumentLeft;
        const targetY = y + window.scrollY - targetDocumentTop;

        if (reducedMotion.matches) {
          maskX = targetX;
          maskY = targetY;
        } else {
          maskVelocityX = (maskVelocityX + (targetX - maskX) * 0.067) * 0.72;
          maskVelocityY = (maskVelocityY + (targetY - maskY) * 0.067) * 0.72;
          maskX += maskVelocityX;
          maskY += maskVelocityY;
        }

        const remainingMaskDistance = Math.hypot(targetX - maskX, targetY - maskY);
        maskStillMoving = remainingMaskDistance > 0.12 || Math.hypot(maskVelocityX, maskVelocityY) > 0.06;
        activeTarget.style.setProperty("--cursor-mask-x", `${maskX.toFixed(2)}px`);
        activeTarget.style.setProperty("--cursor-mask-y", `${maskY.toFixed(2)}px`);
        syncWordmarkHighlight();
      }

      const ringStillMoving = Math.hypot(x - ringX, y - ringY) > 0.12;
      if (ringStillMoving || maskStillMoving) ensureFrame();
    }

    const setEnabled = () => {
      document.documentElement.classList.toggle("has-custom-cursor", finePointer.matches);
      if (!finePointer.matches) onPointerLeave();
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      } else if (cursorVisible) {
        ensureFrame();
      }
    };

    setEnabled();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    finePointer.addEventListener("change", setEnabled);
    reducedMotion.addEventListener("change", ensureFrame);

    return () => {
      clearMaskTarget();
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      finePointer.removeEventListener("change", setEnabled);
      reducedMotion.removeEventListener("change", ensureFrame);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
