"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A field of horizontal waveform lines — part oscilloscope, part stage haze.
 * Lines displace with layered sine motion and swell toward the pointer,
 * fading violet→tungsten with depth.
 */
export default function WaveField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08070c, 6.5, 15);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 40);
    camera.position.set(0, 2.7, 8.6);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- build lines -------------------------------------------------
    const ROWS = 34;
    const COLS = 130;
    const WIDTH = 20;
    const DEPTH = 12;

    const volt = new THREE.Color("#b89cff");
    const heat = new THREE.Color("#ff9e80");

    type Row = { line: THREE.Line; positions: Float32Array; z: number };
    const rows: Row[] = [];

    for (let r = 0; r < ROWS; r += 1) {
      const z = -DEPTH / 2 + (r / (ROWS - 1)) * DEPTH;
      const positions = new Float32Array(COLS * 3);
      const colors = new Float32Array(COLS * 3);
      const rowColor = volt.clone().lerp(heat, r / (ROWS - 1));

      for (let c = 0; c < COLS; c += 1) {
        const x = -WIDTH / 2 + (c / (COLS - 1)) * WIDTH;
        positions[c * 3] = x;
        positions[c * 3 + 1] = 0;
        positions[c * 3 + 2] = z;
        // brighten toward centre of each line
        const edge = 1 - Math.abs(c / (COLS - 1) - 0.5) * 1.4;
        colors[c * 3] = rowColor.r * edge;
        colors[c * 3 + 1] = rowColor.g * edge;
        colors[c * 3 + 2] = rowColor.b * edge;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.55
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      rows.push({ line, positions, z });
    }

    // --- pointer -----------------------------------------------------
    const pointer = { x: 0, z: 0, strength: 0 };
    const target = { x: 0, z: 0, strength: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      target.x = nx * WIDTH * 0.7;
      target.z = ny * DEPTH * 0.8;
      target.strength = 1;
    };
    const onPointerLeave = () => { target.strength = 0; };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave, { passive: true });

    // --- resize ------------------------------------------------------
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // --- animate -----------------------------------------------------
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(mount);

    const displace = (time: number) => {
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.z += (target.z - pointer.z) * 0.06;
      pointer.strength += (target.strength - pointer.strength) * 0.04;

      for (const row of rows) {
        const { positions, z } = row;
        for (let c = 0; c < COLS; c += 1) {
          const x = positions[c * 3];
          const wave =
            Math.sin(x * 0.55 + time * 0.9 + z * 0.6) * 0.32 +
            Math.sin(x * 1.3 - time * 0.55 + z * 1.4) * 0.16 +
            Math.sin(x * 0.18 + time * 0.3) * 0.42;

          const dx = x - pointer.x;
          const dz = z - pointer.z;
          const swell = Math.exp(-(dx * dx + dz * dz) * 0.18) * 1.5 * pointer.strength;

          positions[c * 3 + 1] = wave + swell;
        }
        (row.line.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      }
    };

    if (reduceMotion) {
      displace(2.4);
      renderer.render(scene, camera);
    } else {
      const start = performance.now();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        displace((performance.now() - start) / 1000);
        renderer.render(scene, camera);
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      rows.forEach((row) => {
        row.line.geometry.dispose();
        (row.line.material as THREE.Material).dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}
