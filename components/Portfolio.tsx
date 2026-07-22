"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveCursor from "./InteractiveCursor";
import SignalField from "./SignalField";
import WaveField from "./WaveField";
import ProjectDialog from "./ProjectDialog";
import CapabilityIcon from "./CapabilityIcon";
import IntroScreen from "./IntroScreen";
import LandingWordmark from "./LandingWordmark";
import LandingParticles from "./LandingParticles";
import GlobeOrbitSystem from "./GlobeOrbitSystem";
import ProductionArchive from "./ProductionArchive";
import { experienceHighlights, processStages, projects, proof, recognition, services, testimonials, type Project } from "@/data/content";

const ease = [0.2, 0.75, 0.2, 1] as const;

function parseCounterValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  return {
    target: Number(match?.[1] ?? 0),
    suffix: match?.[2] ?? ""
  };
}

function SwipeTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={className} data-title-swipe>
      <span className="title-swipe-base" data-cursor-mask>{children}</span>
      <span className="title-swipe-accent title-swipe-trail title-swipe-trail-3" aria-hidden="true">{children}</span>
      <span className="title-swipe-accent title-swipe-trail title-swipe-trail-2" aria-hidden="true">{children}</span>
      <span className="title-swipe-accent title-swipe-trail title-swipe-trail-1" aria-hidden="true">{children}</span>
      <span className="title-swipe-accent title-swipe-main" aria-hidden="true">{children}</span>
    </h2>
  );
}

function ContactFocusTitle() {
  const words = ["Bring", "the", "project", "into", "focus."];
  const renderWords = (masked: boolean) => words.map((word, index) => (
    <span
      className="contact-focus-word"
      data-contact-focus-word={index}
      data-cursor-mask={masked ? "" : undefined}
      key={`${word}-${index}`}
    >
      {word}
    </span>
  ));

  return (
    <h2 className="contact-focus-title">
      <span className="contact-focus-base">{renderWords(true)}</span>
    </h2>
  );
}

function StatCounter({ item }: { item: { value: string; label: string } }) {
  const counter = parseCounterValue(item.value);
  return (
    <div className="proof-stat">
      <strong data-counter-value={counter.target} data-counter-suffix={counter.suffix}>{item.value}</strong>
      <span>{item.label}</span>
    </div>
  );
}

function RecognitionMediaRotator({
  media,
  title
}: {
  media: { src: string; alt: string; fit?: "cover" | "contain" }[];
  title: string;
}) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      const next = (current + 1) % media.length;
      setDirection(next > current ? 1 : -1);
      return next;
    });
  }, [media.length]);

  useEffect(() => {
    if (media.length < 2 || paused || reducedMotion) return;
    const timer = window.setInterval(showNext, 3600);
    return () => window.clearInterval(timer);
  }, [media.length, paused, reducedMotion, showNext]);

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [media]);

  const activeMedia = media[activeIndex];

  return (
    <div
      className={`recognition-media-rotator${media.length > 1 ? " is-multiple" : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onClick={media.length > 1 ? showNext : undefined}
      role={media.length > 1 ? "button" : undefined}
      tabIndex={media.length > 1 ? 0 : undefined}
      aria-label={media.length > 1 ? `Show next ${title} image` : undefined}
      onKeyDown={(event) => {
        if (media.length > 1 && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.span
          className={`recognition-media-frame${activeMedia.fit === "contain" ? " is-contain" : ""}`}
          key={activeMedia.src}
          custom={direction}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 28, rotateY: direction * 8, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -24, rotateY: direction * -7, scale: 0.99 }}
          transition={{ duration: reducedMotion ? 0.12 : 0.34, ease }}
        >
          <Image
            src={activeMedia.src}
            alt={activeMedia.alt}
            fill
            sizes="(max-width: 720px) 220px, 240px"
          />
        </motion.span>
      </AnimatePresence>
      {media.length > 1 ? (
        <span className="recognition-media-dots" aria-hidden="true">
          {media.map((item, index) => (
            <i className={index === activeIndex ? "is-active" : ""} key={item.src} />
          ))}
        </span>
      ) : null}
    </div>
  );
}


const REEL_FRAME_ROTATIONS = [-2.6, 1.9, -1.35, 2.25, -1.7, 1.15, -0.7] as const;

const LANDING_ROLES = [
  "Creative production",
  "Video production",
  "Live events",
  "Branded content",
  "Production planning",
  "Crew coordination",
  "Campaign delivery",
  "Multicam",
  "Post-production",
  "Technical systems",
  "Audience development"
];

function LandingName({ reduceMotion }: { reduceMotion: boolean }) {
  const words = ["JOSHUA", "PEARMAN"];

  return (
    <h1 className="landing-title" aria-label="Joshua Pearman">
      {words.map((word, wordIndex) => (
        <span
          className={`landing-word-shell landing-word-shell-${wordIndex + 1}`}
          key={word}
          data-cursor-mask-shell
          aria-hidden="true"
        >
          <motion.span
            className={`landing-word-motion${wordIndex === 1 ? " landing-word-motion-outline" : ""}`}
            initial={reduceMotion ? false : wordIndex === 1
              ? { opacity: 0 }
              : { clipPath: "inset(100% 0 0 0)", opacity: 0 }}
            animate={wordIndex === 1
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0 0 0)", opacity: 1 }}
            transition={{
              duration: 1.02,
              delay: 0.18 + wordIndex * 0.22,
              ease
            }}
          >
            <LandingWordmark word={word as "JOSHUA" | "PEARMAN"} />
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const APPROACH_WORDS = "From brief to delivery, every stage is planned around the audience, the objective and the people making it happen.".split(" ");

const manifestoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } }
};

const manifestoWordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

function ApproachManifesto({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="manifesto section" aria-label="How I work">
      <div className="manifesto-body">
        <p className="section-index manifesto-index" data-cursor-mask>01 / How I work</p>
        <div className="manifesto-copy">
          <p className="manifesto-ghost" aria-hidden="true">
            {APPROACH_WORDS.map((word, index) => (
              <span className="manifesto-word" key={`ghost-${word}-${index}`}>{word}</span>
            ))}
          </p>
          <motion.p
            className="manifesto-line"
            variants={reduceMotion ? undefined : manifestoContainerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.58 }}
          >
            {APPROACH_WORDS.map((word, index) => (
              <motion.span
                className="manifesto-word"
                key={`${word}-${index}`}
                data-cursor-mask
                variants={reduceMotion ? undefined : manifestoWordVariants}
                transition={{ duration: 0.5, ease }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
        <p className="manifesto-support" data-cursor-mask>
          I take ownership of the practical route from the first conversation to the final handover, while keeping the creative objective visible at every stage.
        </p>
        <div className="process-grid">
          {processStages.map((stage) => (
            <article className="process-stage" key={stage.number}>
              <div className="process-stage-heading">
                <h3 data-cursor-mask>{stage.title}</h3>
                <span>{stage.number}</span>
              </div>
              <p>{stage.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="manifesto-marquee" aria-hidden="true">
        <div className="manifesto-marquee-track">
          {[...LANDING_ROLES, ...LANDING_ROLES].map((role, index) => (
            <span key={`manifesto-${role}-${index}`}>{role}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

type SocialIconName = "instagram" | "youtube" | "linkedin" | "spotify";

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="social-icon-fill" cx="17.5" cy="6.7" r="1" /></svg>;
  }
  if (name === "youtube") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.2c-.2-1.5-1.2-2.6-2.7-2.8C16.5 5.1 14.4 5 12 5s-4.5.1-6.3.4C4.2 5.6 3.2 6.7 3 8.2A25 25 0 0 0 2.8 12c0 1.4.1 2.7.3 3.8.2 1.5 1.2 2.6 2.7 2.8 1.8.3 3.9.4 6.3.4s4.5-.1 6.3-.4c1.5-.2 2.5-1.3 2.7-2.8.2-1.1.3-2.4.3-3.8s-.2-2.7-.4-3.8Z" /><path className="social-icon-fill" d="m10 9 5 3-5 3V9Z" /></svg>;
  }
  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3.2" height="11" rx=".8" /><circle className="social-icon-fill" cx="5.6" cy="5.6" r="1.9" /><path d="M10.2 9h3.1v1.5c1-1.2 2.2-1.8 3.8-1.8 2.8 0 4.4 1.8 4.4 5.4V20h-3.3v-5.3c0-1.9-.7-2.9-2.2-2.9-1.7 0-2.5 1.1-2.5 3.3V20h-3.3V9Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M7.2 9.5c3.4-1 7.6-.8 10.5.7M7.8 13c2.8-.8 6.3-.6 8.8.6M8.5 16.1c2.3-.6 4.9-.4 7 .5" /></svg>;
}

const FOOTER_SOCIALS: { name: SocialIconName; label: string; href: string }[] = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/bvdlvd/" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/@BVDLVD" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/bvdlvd/" },
  { name: "spotify", label: "Spotify", href: "https://open.spotify.com/artist/1BhfikyrtSTch1r9upYGlS" }
];

export default function Portfolio() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [compactViewport, setCompactViewport] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedRecognition, setExpandedRecognition] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.2 });
  const simplifyLandingMotion = Boolean(shouldReduceMotion || compactViewport);

  const heroTiltXInput = useMotionValue(0);
  const heroTiltYInput = useMotionValue(0);
  const heroTiltX = useSpring(heroTiltXInput, { stiffness: 180, damping: 22, mass: 0.35 });
  const heroTiltY = useSpring(heroTiltYInput, { stiffness: 180, damping: 22, mass: 0.35 });

  const proofTiltXInput = useMotionValue(0);
  const proofTiltYInput = useMotionValue(0);
  const proofTiltX = useSpring(proofTiltXInput, { stiffness: 170, damping: 21, mass: 0.42 });
  const proofTiltY = useSpring(proofTiltYInput, { stiffness: 170, damping: 21, mass: 0.42 });

  const contactTiltXInput = useMotionValue(0);
  const contactTiltYInput = useMotionValue(0);
  const contactTiltX = useSpring(contactTiltXInput, { stiffness: 170, damping: 21, mass: 0.45 });
  const contactTiltY = useSpring(contactTiltYInput, { stiffness: 170, damping: 21, mass: 0.45 });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 800px)");
    const sync = () => setCompactViewport(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const active = compactViewport && expandedService !== null;
    root.classList.toggle("mobile-service-open", active);
    return () => root.classList.remove("mobile-service-open");
  }, [compactViewport, expandedService]);

  useEffect(() => {
    if (!introComplete) return;
    const root = document.documentElement;
    let idle = false;
    let lastActivity = performance.now();

    const publish = (nextIdle: boolean) => {
      if (idle === nextIdle) return;
      idle = nextIdle;
      root.classList.toggle("is-site-idle", idle);
      window.dispatchEvent(new CustomEvent("portfolio-idle-change", { detail: { idle } }));
    };

    const markActivity = () => {
      lastActivity = performance.now();
      if (idle) publish(false);
    };

    const checkIdle = () => {
      if (document.hidden) {
        publish(true);
        return;
      }
      if (performance.now() - lastActivity >= 18000) publish(true);
    };

    const onVisibility = () => {
      if (document.hidden) publish(true);
      else markActivity();
    };

    const activityEvents: (keyof WindowEventMap)[] = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown", "scroll"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, markActivity, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);
    const interval = window.setInterval(checkIdle, 2000);
    markActivity();

    return () => {
      window.clearInterval(interval);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, markActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      root.classList.remove("is-site-idle");
      window.dispatchEvent(new CustomEvent("portfolio-idle-change", { detail: { idle: false } }));
    };
  }, [introComplete]);

  useEffect(() => {
    if (!introComplete) return;
    const mobile = window.matchMedia("(max-width: 520px)");
    if (!mobile.matches) return;
    const reel = rootRef.current?.querySelector<HTMLElement>(".landing-reel");
    if (!reel) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && entry.intersectionRatio >= 0.18) {
        reel.classList.add("is-mobile-reel-active");
        observer.disconnect();
      }
    }, { threshold: [0.18, 0.35] });

    observer.observe(reel);
    return () => {
      observer.disconnect();
      reel.classList.remove("is-mobile-reel-active");
    };
  }, [introComplete]);

  const closeProject = useCallback(() => setActiveProject(null), []);
  const completeIntro = useCallback(() => {
    document.documentElement.classList.remove("intro-locked");
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      root.classList.add("is-intro-ready");
      void root.offsetHeight;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
      secondFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [introComplete]);

  const pivotFeaturedReel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroTiltXInput.set(vertical * -9);
    heroTiltYInput.set(horizontal * 11);
  }, [heroTiltXInput, heroTiltYInput, shouldReduceMotion]);

  const resetFeaturedReelPivot = useCallback(() => {
    heroTiltXInput.set(0);
    heroTiltYInput.set(0);
  }, [heroTiltXInput, heroTiltYInput]);

  const pivotProof = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    proofTiltXInput.set(vertical * -3.6);
    proofTiltYInput.set(horizontal * 5);
  }, [proofTiltXInput, proofTiltYInput, shouldReduceMotion]);

  const resetProofPivot = useCallback(() => {
    proofTiltXInput.set(0);
    proofTiltYInput.set(0);
  }, [proofTiltXInput, proofTiltYInput]);

  const pivotContact = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    contactTiltXInput.set(vertical * -4.5);
    contactTiltYInput.set(horizontal * 5.5);
  }, [contactTiltXInput, contactTiltYInput, shouldReduceMotion]);

  const resetContactPivot = useCallback(() => {
    contactTiltXInput.set(0);
    contactTiltYInput.set(0);
  }, [contactTiltXInput, contactTiltYInput]);

  useEffect(() => {
    if (!introComplete || shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    let cleanupOrbitPointer = () => {};
    let cleanupOrbitMotion = () => {};
    let cleanupReelIdle = () => {};

    const context = gsap.context(() => {
      let projectCarouselScrollTrigger: ScrollTrigger | null = null;
      let carouselActiveIndex = 0;
      const aboutCard = document.querySelector<HTMLElement>(".about-card");
      const aboutMedia = document.querySelector<HTMLElement>(".about-image-media");
      if (aboutCard && aboutMedia && window.innerWidth > 800) {
        gsap.fromTo(aboutMedia, {
          y: () => -aboutCard.offsetHeight * 0.105
        }, {
          y: () => aboutCard.offsetHeight * 0.105,
          force3D: true,
          ease: "none",
          scrollTrigger: {
            trigger: aboutCard,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.72,
            invalidateOnRefresh: true
          }
        });
      }

      const landingHero = document.querySelector<HTMLElement>(".landing-hero");
      const landingHeroInner = document.querySelector<HTMLElement>(".landing-hero-inner");
      const landingWave = document.querySelector<HTMLElement>(".landing-hero .hero-canvas");
      if (landingHero && landingHeroInner) {
        gsap.to(landingHeroInner, {
          yPercent: -13,
          opacity: 0.16,
          ease: "none",
          scrollTrigger: { trigger: landingHero, start: "top top", end: "bottom top", scrub: 1 }
        });
        if (landingWave) {
          gsap.to(landingWave, {
            opacity: 0.08,
            ease: "none",
            scrollTrigger: { trigger: landingHero, start: "top top", end: "bottom top", scrub: 1 }
          });
        }
      }

      const reel = document.querySelector<HTMLElement>(".landing-reel");
      const reelPin = document.querySelector<HTMLElement>(".landing-reel-pin");
      const reelFrame = document.querySelector<HTMLElement>(".landing-reel-frame");
      const reelHeading = document.querySelector<HTMLElement>(".landing-reel-heading");
      const reelScroll = document.querySelector<HTMLElement>(".landing-reel-scroll");
      const reelOutlines = gsap.utils.toArray<HTMLElement>(".landing-reel-outline");
      const reelOutlineIdleShells = gsap.utils.toArray<HTMLElement>(".landing-reel-outline-idle");
      if (reel && reelPin && reelFrame && window.innerWidth > 520) {
        const mobileReel = window.innerWidth <= 520;
        const initialScale = mobileReel ? 1 : window.innerWidth <= 1050 ? 0.54 : 0.42;
        const finalReelWidth = () => mobileReel ? window.innerWidth * 0.9 : window.innerWidth * 0.8;
        const finalReelHeight = () => mobileReel ? finalReelWidth() * 9 / 16 : reelFrame.offsetHeight;
        const finalScale = () => mobileReel ? 1 : finalReelWidth() / reelFrame.offsetWidth;
        const initialHalfHeight = () => reelFrame.offsetHeight * initialScale * 0.5;
        const finalHalfHeight = () => mobileReel ? finalReelHeight() * 0.5 : reelFrame.offsetHeight * finalScale() * 0.5;

        const outlineBaseScale = () => initialScale + (mobileReel ? 0.06 : 0.08);
        const outlineScaleStep = () => window.innerWidth <= 520 ? 0.14 : window.innerWidth <= 800 ? 0.135 : 0.125;
        const outlineRotation = (element: HTMLElement) => Number.parseFloat(element.dataset.rotation ?? "0");

        let reelIdleActive = false;
        let reelIdleInView = false;
        let reelScrollProgress = 0;
        let reelIdleTweens: gsap.core.Tween[] = [];

        const stopReelIdle = (reset = true) => {
          if (!reelIdleActive && !reelIdleTweens.length) return;
          reelIdleActive = false;
          reelIdleTweens.forEach((tween) => tween.kill());
          reelIdleTweens = [];

          if (!reset) return;
          gsap.to(reelOutlineIdleShells, {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.32,
            ease: "power2.out",
            overwrite: true
          });
          gsap.to(reelOutlines, {
            filter: "drop-shadow(0 0 0 rgba(139,104,255,0))",
            boxShadow: "inset 0 0 42px rgba(139,104,255,.025), 0 0 34px rgba(139,104,255,.035)",
            duration: 0.32,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        const startReelIdle = () => {
          if (reelIdleActive || !reelOutlineIdleShells.length || document.documentElement.classList.contains("is-site-idle")) return;
          reelIdleActive = true;

          reelOutlineIdleShells.forEach((shell, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const horizontal = direction * (2.4 + index * 0.42);
            const vertical = ((index % 3) - 1) * (1.7 + index * 0.18);
            const rotation = direction * (0.08 + index * 0.022);

            gsap.set(shell, {
              x: horizontal * -0.42,
              y: vertical * -0.38,
              rotation: rotation * -0.5,
              scaleX: 1,
              scaleY: 1
            });

            reelIdleTweens.push(gsap.to(shell, {
              x: horizontal,
              y: vertical,
              rotation,
              scaleX: 1 + (index % 2 === 0 ? 0.008 : 0.003),
              scaleY: 1 + (index % 2 === 0 ? 0.003 : 0.008),
              duration: 2.9 + index * 0.28,
              delay: index * -0.31,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            }));

            const outline = reelOutlines[index];
            if (outline) {
              reelIdleTweens.push(gsap.to(outline, {
                filter: index % 2 === 0
                  ? "drop-shadow(0 0 13px rgba(139,104,255,.22))"
                  : "drop-shadow(0 0 11px rgba(116,216,255,.16))",
                boxShadow: index % 2 === 0
                  ? "inset 0 0 48px rgba(139,104,255,.055), 0 0 42px rgba(139,104,255,.105)"
                  : "inset 0 0 46px rgba(116,216,255,.035), 0 0 38px rgba(116,216,255,.075)",
                duration: 2.4 + index * 0.24,
                delay: index * -0.27,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              }));
            }
          });
        };

        const reelIdleObserver = new IntersectionObserver(([entry]) => {
          reelIdleInView = Boolean(entry?.isIntersecting);
          if (reelIdleInView && reelScrollProgress <= 0.012) startReelIdle();
          else stopReelIdle(reelIdleInView);
        }, {
          rootMargin: "15% 0px",
          threshold: [0, 0.01]
        });
        reelIdleObserver.observe(reel);

        const onReelIdleChange = (event: Event) => {
          const idle = Boolean((event as CustomEvent<{ idle?: boolean }>).detail?.idle);
          if (idle) stopReelIdle(false);
          else if (reelIdleInView && reelScrollProgress <= 0.012) startReelIdle();
        };
        window.addEventListener("portfolio-idle-change", onReelIdleChange);

        cleanupReelIdle = () => {
          reelIdleObserver.disconnect();
          window.removeEventListener("portfolio-idle-change", onReelIdleChange);
          stopReelIdle(false);
          gsap.set(reelOutlineIdleShells, { clearProps: "transform" });
          gsap.set(reelOutlines, { clearProps: "filter,boxShadow" });
        };

        const reelTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: reel,
            start: "top top",
            end: "+=150%",
            scrub: 0.65,
            pin: reelPin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              reelScrollProgress = self.progress;
              if (self.progress > 0.012) stopReelIdle();
              else if (reelIdleInView) startReelIdle();
            },
            onRefresh: (self) => {
              reelScrollProgress = self.progress;
              if (self.progress > 0.012) stopReelIdle();
              else if (reelIdleInView) startReelIdle();
            }
          }
        });

        if (reelOutlines.length) {
          reelTimeline.fromTo(reelOutlines, {
            scale: (index) => outlineBaseScale() + index * outlineScaleStep(),
            rotation: (_index, element) => outlineRotation(element as HTMLElement),
            xPercent: (index) => (index % 2 === 0 ? -1 : 1) * (index + 1) * 0.85,
            yPercent: (index) => (index % 3 === 0 ? -1 : 1) * (index + 1) * 0.36,
            autoAlpha: (index) => Math.max(0.18, 0.58 - index * 0.055)
          }, {
            scale: (index) => finalScale() * (1.08 + index * 0.18),
            rotation: (_index, element) => outlineRotation(element as HTMLElement) * 1.72,
            xPercent: (index) => (index % 2 === 0 ? -1 : 1) * (index + 1) * 1.7,
            yPercent: (index) => (index % 3 === 0 ? -1 : 1) * (index + 1) * 0.8,
            autoAlpha: 0,
            duration: 0.88,
            stagger: 0.012,
            ease: "power1.out"
          }, 0.06);
        }

        if (reelHeading) {
          reelTimeline.fromTo(reelHeading, {
            autoAlpha: 1,
            y: () => -(initialHalfHeight() + 58),
            scale: 0.96
          }, {
            autoAlpha: 1,
            y: () => -(initialHalfHeight() + 58),
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          }, 0.02);
        }

        if (reelScroll) {
          reelTimeline.fromTo(reelScroll, {
            autoAlpha: 1,
            y: () => mobileReel ? -window.innerHeight * 0.39 : initialHalfHeight() + 46,
            scale: 1
          }, {
            autoAlpha: 0,
            y: () => mobileReel ? -window.innerHeight * 0.39 : finalHalfHeight() + 54,
            scale: 0.96,
            duration: 0.58,
            ease: "power1.out"
          }, 0.3);
        }

        const reelFrameTarget: gsap.TweenVars = {
          scale: finalScale,
          borderRadius: 26,
          duration: 0.82,
          ease: "none"
        };
        if (mobileReel) {
          reelFrameTarget.width = finalReelWidth;
          reelFrameTarget.height = finalReelHeight;
        }
        reelTimeline.to(reelFrame, reelFrameTarget, 0.18);

        if (mobileReel && reelOutlines.length) {
          reelTimeline.to(reelOutlines, {
            width: finalReelWidth,
            height: finalReelHeight,
            duration: 0.82,
            ease: "none"
          }, 0.18);
        }

        if (reelHeading) {
          reelTimeline.to(reelHeading, {
            y: () => -(finalHalfHeight() + 64),
            scale: 1.04,
            autoAlpha: 0.52,
            duration: 0.82,
            ease: "none"
          }, 0.18);
        }

      }

      const projectCarousel = document.querySelector<HTMLElement>(".project-carousel");
      const projectCarouselPin = document.querySelector<HTMLElement>(".project-carousel-pin");
      const projectCarouselViewport = document.querySelector<HTMLElement>(".project-carousel-viewport");
      const projectCarouselTrack = document.querySelector<HTMLElement>(".project-carousel-track");
      const projectSlides = gsap.utils.toArray<HTMLElement>(".project-slide");
      const projectDots = gsap.utils.toArray<HTMLElement>(".project-carousel-dot");
      const projectCurrent = document.querySelector<HTMLElement>(".project-carousel-current");

      if (projectCarousel && projectCarouselPin && projectCarouselViewport && projectCarouselTrack && projectSlides.length > 1) {
        const mobileCarousel = window.innerWidth <= 800;
        let maximumTravel = 0;
        let slideTargets: number[] = [];
        let activeIndex = -1;

        const measureCarousel = () => {
          slideTargets = projectSlides.map((slide) => -(slide.offsetLeft + slide.offsetWidth / 2 - projectCarouselViewport.clientWidth / 2));
          const finalTarget = slideTargets[slideTargets.length - 1] ?? 0;
          maximumTravel = Math.max(0, -finalTarget);
        };

        const setActiveCarouselProject = (index: number) => {
          const safeIndex = Math.max(0, Math.min(projectSlides.length - 1, index));
          if (safeIndex === activeIndex) return;
          activeIndex = safeIndex;
          carouselActiveIndex = safeIndex;
          projectSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === safeIndex);
          });
          projectDots.forEach((dot, dotIndex) => {
            const isCurrent = dotIndex === safeIndex;
            dot.classList.toggle("is-active", isCurrent);
            if (isCurrent) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
          });
          if (projectCurrent) projectCurrent.textContent = String(safeIndex + 1).padStart(2, "0");
        };

        const renderMobileCarousel = (progressValue: number) => {
          const clamped = gsap.utils.clamp(0, 1, progressValue);
          const scaled = clamped * (projectSlides.length - 1);
          const lower = Math.floor(scaled);
          const upper = Math.min(projectSlides.length - 1, lower + 1);
          const local = scaled - lower;
          const from = slideTargets[lower] ?? 0;
          const to = slideTargets[upper] ?? from;
          gsap.set(projectCarouselTrack, { x: gsap.utils.interpolate(from, to, local) });
          setActiveCarouselProject(Math.round(scaled));
        };

        measureCarousel();
        setActiveCarouselProject(0);

        if (mobileCarousel) {
          const mobileTrigger = ScrollTrigger.create({
            trigger: projectCarouselPin,
            start: "top top",
            end: () => {
              const horizontalDistance = Math.abs((slideTargets[slideTargets.length - 1] ?? 0) - (slideTargets[0] ?? 0));
              return `+=${Math.max(window.innerHeight * (projectSlides.length - 1) * 0.68, horizontalDistance)}`;
            },
            pin: projectCarouselPin,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => { projectCarouselTrack.style.willChange = "transform"; },
            onEnterBack: () => { projectCarouselTrack.style.willChange = "transform"; },
            onLeave: () => {
              renderMobileCarousel(1);
              projectCarouselTrack.style.willChange = "auto";
            },
            onLeaveBack: () => { projectCarouselTrack.style.willChange = "auto"; },
            onRefresh: (self) => {
              measureCarousel();
              renderMobileCarousel(self.progress);
            },
            onUpdate: (self) => renderMobileCarousel(self.progress)
          });
          projectCarouselScrollTrigger = mobileTrigger;

        } else {
          const carouselTween = gsap.to(projectCarouselTrack, {
            x: () => -maximumTravel,
            ease: "none",
            scrollTrigger: {
              trigger: projectCarouselPin,
              start: "top 104px",
              end: () => `+=${Math.max(window.innerHeight * (projectSlides.length - 1) * 0.88, maximumTravel * 1.08)}`,
              pin: projectCarouselPin,
              pinSpacing: true,
              anticipatePin: 1,
              scrub: true,
              invalidateOnRefresh: true,
              onEnter: () => { projectCarouselTrack.style.willChange = "transform"; },
              onEnterBack: () => { projectCarouselTrack.style.willChange = "transform"; },
              onLeave: () => { projectCarouselTrack.style.willChange = "auto"; },
              onLeaveBack: () => { projectCarouselTrack.style.willChange = "auto"; },
              onRefresh: (self) => {
                measureCarousel();
                gsap.set(projectCarouselTrack, { x: -maximumTravel * self.progress });
              },
              onUpdate: (self) => {
                setActiveCarouselProject(Math.round(self.progress * (projectSlides.length - 1)));
              }
            }
          });
          projectCarouselScrollTrigger = carouselTween.scrollTrigger ?? null;
        }
      }

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          rotateX: 8,
          duration: 0.8,
          delay: Math.min(index * 0.05, 0.2),
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true }
        });
      });

      const counterElements = gsap.utils.toArray<HTMLElement>("[data-counter-value]");
      const proofStrip = document.querySelector<HTMLElement>(".proof-strip");
      const spotifyButton = document.querySelector<HTMLElement>(".proof-spotify");
      if (counterElements.length && proofStrip) {
        const counterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: proofStrip,
            start: "top 88%",
            once: true
          }
        });

        counterElements.forEach((element) => {
          const target = Number(element.dataset.counterValue ?? 0);
          const suffix = element.dataset.counterSuffix ?? "";
          const counter = { value: 0 };
          element.textContent = `0${suffix}`;

          counterTimeline.to(counter, {
            value: target,
            duration: 5.2,
            ease: "power2.out",
            onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
            onComplete: () => { element.textContent = `${target}${suffix}`; }
          }, 0);
        });

        const glowStart = 5.26;
        counterElements.forEach((element, index) => {
          const start = glowStart + index * 0.34;
          counterTimeline
            .to(element, {
              color: "#ffffff",
              textShadow: "0 0 9px rgba(255,255,255,.92), 0 0 30px rgba(164,139,255,.95), 0 0 52px rgba(88,207,255,.48)",
              scale: 1.055,
              duration: 0.2,
              ease: "power2.out"
            }, start)
            .to(element, {
              color: "#f5f4f0",
              textShadow: "0 0 0 rgba(0,0,0,0)",
              scale: 1,
              duration: 0.42,
              ease: "power2.inOut"
            }, start + 0.2);
        });

        if (spotifyButton) {
          const spotifyStart = glowStart + counterElements.length * 0.34 + 0.38;
          counterTimeline
            .to(spotifyButton, {
              borderColor: "rgba(190,176,255,.78)",
              backgroundColor: "rgba(151,125,255,.1)",
              boxShadow: "0 0 38px rgba(154,126,255,.38), 0 0 62px rgba(80,197,255,.16)",
              duration: 1.2,
              ease: "sine.inOut"
            }, spotifyStart)
            .to(spotifyButton, {
              borderColor: "rgba(185,170,255,.34)",
              backgroundColor: "rgba(255,255,255,.018)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 1.2,
              ease: "sine.inOut"
            }, spotifyStart + 1.2);
        }
      }

      const root = rootRef.current;
      gsap.utils.toArray<HTMLElement>("[data-title-swipe]").forEach((title) => {
        const accents = gsap.utils.toArray<HTMLElement>(".title-swipe-accent", title);
        if (!accents.length) return;

        const swipePositions = [
          { start: "-112% 50%", end: "122% 50%" },
          { start: "-126% 50%", end: "108% 50%" },
          { start: "-140% 50%", end: "94% 50%" },
          { start: "-154% 50%", end: "80% 50%" }
        ];

        accents.slice().reverse().forEach((accent, index) => {
          const position = swipePositions[index] ?? swipePositions[swipePositions.length - 1];
          gsap.fromTo(accent, {
            backgroundPosition: position.start
          }, {
            backgroundPosition: position.end,
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top 92%",
              end: "bottom 44%",
              scrub: 0.72 + index * 0.08
            }
          });
        });
      });

      const contactSection = document.querySelector<HTMLElement>("#contact");
      if (contactSection) {
        const focusTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contactSection,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.82
          }
        });

        for (let index = 0; index < 5; index += 1) {
          const words = gsap.utils.toArray<HTMLElement>(`[data-contact-focus-word="${index}"]`);
          gsap.set(words, { filter: "blur(16px)", opacity: 0.28, willChange: "filter, opacity" });
          focusTimeline.to(words, {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.36,
            ease: "none"
          }, index * 0.14);
        }
      }

      const signal = document.querySelector<HTMLElement>(".signal-field");
      const orbitSystem = document.querySelector<HTMLElement>(".globe-orbit-system");
      const orbitRings = gsap.utils.toArray<HTMLElement>(".globe-orbit-ring");
      const orbitFloats = gsap.utils.toArray<HTMLElement>(".globe-orbit-float");
      const orbitBodies = gsap.utils.toArray<HTMLElement>(".globe-orbit-body");
      if (signal && orbitSystem && orbitRings.length === 5 && orbitFloats.length === 5 && root) {
        const approach = document.querySelector<HTMLElement>(".manifesto");
        const proofSection = document.querySelector<HTMLElement>(".proof-section");
        const capabilities = document.querySelector<HTMLElement>("#capabilities");
        const about = document.querySelector<HTMLElement>("#about");
        const contact = document.querySelector<HTMLElement>("#contact");
        const interpolate = gsap.utils.interpolate;
        const smooth = gsap.parseEase("power2.inOut");
        const softOut = gsap.parseEase("power3.out");
        const progress = { value: 0 };
        let lastMode = "hidden";

        type OrbitFloatMotion = {
          duration: number;
          delay: number;
          fromX: number;
          fromY: number;
          toX: number;
          toY: number;
        };

        const detachedFloatMotions: OrbitFloatMotion[] = [
          { duration: 7.8, delay: 0, fromX: -18, fromY: -10, toX: 34, toY: 24 },
          { duration: 11.4, delay: -3.1, fromX: 24, fromY: -22, toX: -42, toY: 34 },
          { duration: 9.2, delay: -5.2, fromX: -34, fromY: 22, toX: 38, toY: -28 },
          { duration: 6.7, delay: -1.8, fromX: 12, fromY: 28, toX: -26, toY: -36 },
          { duration: 13.2, delay: -7.4, fromX: -28, fromY: -18, toX: 46, toY: 32 }
        ];

        const finalFloatMotions: OrbitFloatMotion[] = [
          { duration: 7.2, delay: 0, fromX: 18, fromY: -12, toX: -30, toY: 26 },
          { duration: 8.8, delay: -2.7, fromX: 28, fromY: 2, toX: -34, toY: 7 },
          { duration: 6.4, delay: -4.1, fromX: 0, fromY: 16, toX: 5, toY: -24 },
          { duration: 10.6, delay: -5.3, fromX: 24, fromY: 18, toX: -30, toY: -24 },
          { duration: 7.9, delay: -1.4, fromX: -14, fromY: -12, toX: 24, toY: 20 }
        ];

        let orbitMotionActive = false;
        let orbitMotionStart = 0;
        let orbitTickerTime = 0;
        let orbitFinalBlend = 0;
        let orbitIdlePausedAt: number | null = null;

        const orbitMotionPoint = (motion: OrbitFloatMotion, elapsed: number) => {
          const cycle = ((elapsed - motion.delay) % motion.duration + motion.duration) % motion.duration;
          const phase = cycle / motion.duration;
          const wave = (1 - Math.cos(phase * Math.PI * 2)) / 2;
          return {
            x: interpolate(motion.fromX, motion.toX, wave),
            y: interpolate(motion.fromY, motion.toY, wave)
          };
        };

        const updateOrbitMotion = (time: number) => {
          orbitTickerTime = time;
          if (!orbitMotionActive) return;
          const shouldPause = document.documentElement.classList.contains("is-site-idle")
            || document.documentElement.classList.contains("mobile-service-open")
            || document.hidden;
          if (shouldPause) {
            if (orbitIdlePausedAt === null) orbitIdlePausedAt = time;
            return;
          }
          if (orbitIdlePausedAt !== null) {
            orbitMotionStart += time - orbitIdlePausedAt;
            orbitIdlePausedAt = null;
          }
          const elapsed = Math.max(0, time - orbitMotionStart);
          orbitFloats.forEach((float, index) => {
            const detachedPoint = orbitMotionPoint(detachedFloatMotions[index], elapsed);
            const finalPoint = orbitMotionPoint(finalFloatMotions[index], elapsed);
            gsap.set(float, {
              x: interpolate(detachedPoint.x, finalPoint.x, orbitFinalBlend),
              y: interpolate(detachedPoint.y, finalPoint.y, orbitFinalBlend)
            });
          });
        };

        gsap.ticker.add(updateOrbitMotion);
        cleanupOrbitMotion = () => {
          gsap.ticker.remove(updateOrbitMotion);
          gsap.set(orbitFloats, { clearProps: "transform" });
        };

        type GlobeLayout = {
          width: number;
          height: number;
          viewportWidth: number;
          viewportHeight: number;
          maxScroll: number;
          approachStart: number;
          approachEnd: number;
          proofStart: number;
          carouselStart: number;
          carouselEnd: number;
          capabilitiesStart: number;
          detachedEnd: number;
          contactStart: number;
          pos3X: number;
          pos3Y: number;
          pos3Scale: number;
          finalX: number;
          finalY: number;
          finalScale: number;
        };

        let layout: GlobeLayout | null = null;

        const absoluteTop = (element: HTMLElement | null) => {
          if (!element) return 0;
          return element.getBoundingClientRect().top + window.scrollY;
        };

        const calculateGlobeLayout = () => {
          const width = signal.offsetWidth;
          const height = signal.offsetHeight;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const maxScroll = Math.max(ScrollTrigger.maxScroll(window), 1);
          const approachTop = absoluteTop(approach);
          const approachBottom = approachTop + (approach?.offsetHeight ?? viewportHeight);
          const proofTop = absoluteTop(proofSection);
          const capabilitiesTop = absoluteTop(capabilities);
          const aboutTop = absoluteTop(about);
          const contactTop = absoluteTop(contact);
          const carouselStart = projectCarouselScrollTrigger?.start ?? Math.max(proofTop + viewportHeight * 0.35, absoluteTop(projectCarouselPin));
          const carouselEnd = projectCarouselScrollTrigger?.end ?? carouselStart + viewportHeight * 3.6;

          layout = {
            width,
            height,
            viewportWidth,
            viewportHeight,
            maxScroll,
            approachStart: Math.max(0, approachTop - viewportHeight * 0.84),
            approachEnd: Math.max(approachTop + viewportHeight * 0.12, approachBottom - viewportHeight * 0.08),
            proofStart: Math.max(0, proofTop - viewportHeight * 0.88),
            carouselStart,
            carouselEnd,
            capabilitiesStart: Math.max(carouselEnd, capabilitiesTop - viewportHeight * 0.72),
            detachedEnd: Math.max(capabilitiesTop + viewportHeight * 0.38, aboutTop + (about?.offsetHeight ?? viewportHeight) * 0.42),
            contactStart: Math.max(aboutTop + viewportHeight * 0.55, contactTop - viewportHeight * 0.9),
            pos3X: (viewportWidth - width) / 2,
            pos3Y: (viewportHeight - height) / 2,
            pos3Scale: viewportWidth <= 800 ? 1.08 : 1.28,
            finalX: (viewportWidth - width) / 2,
            finalY: viewportHeight - height * (viewportWidth <= 800 ? 0.34 : 0.42),
            finalScale: viewportWidth <= 800 ? 2.05 : 2.65
          };
        };

        const setSignal = (
          x: number,
          y: number,
          scale: number,
          rotate: number,
          opacity: number,
          phase: string,
          carouselIndex = -1
        ) => {
          gsap.set(signal, { x, y, scale, rotate, autoAlpha: opacity });
          const activeValue = opacity > 0.018 ? "true" : "false";
          const carouselValue = String(carouselIndex);
          if (signal.dataset.active !== activeValue) signal.dataset.active = activeValue;
          if (signal.dataset.phase !== phase) signal.dataset.phase = phase;
          if (signal.dataset.carouselIndex !== carouselValue) signal.dataset.carouselIndex = carouselValue;
          const requestedRenderScale = phase === "final" ? Math.max(1, layout?.finalScale ?? scale) : 1;
          const renderScaleValue = requestedRenderScale.toFixed(2);
          if (signal.dataset.renderScale !== renderScaleValue) signal.dataset.renderScale = renderScaleValue;
        };

        const positionOrbitRing = (
          ring: HTMLElement,
          x: number,
          y: number,
          width: number,
          height: number,
          rotate: number
        ) => {
          gsap.set(ring, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            width,
            height,
            rotate
          });
        };

        const carouselRingTargets = (x: number, y: number, globeScale: number) => {
          if (!layout) return [];
          const centreX = x + layout.width / 2;
          const centreY = y + layout.height / 2;
          const globeDiameter = layout.width * globeScale * 0.96;
          const mobile = layout.viewportWidth <= 800;
          const ringLayouts = mobile
            ? [
                { offsetX: -0.018, offsetY: 0.018, width: 1.1, height: 0.54, rotate: -21 },
                { offsetX: 0.026, offsetY: -0.014, width: 1.23, height: 0.575, rotate: 8 },
                { offsetX: -0.03, offsetY: -0.032, width: 1.36, height: 0.61, rotate: -31 },
                { offsetX: 0.036, offsetY: 0.026, width: 1.49, height: 0.645, rotate: 23 },
                { offsetX: -0.012, offsetY: 0.046, width: 1.62, height: 0.68, rotate: -5 }
              ]
            : [
                { offsetX: -0.024, offsetY: 0.018, width: 1.12, height: 0.52, rotate: -22 },
                { offsetX: 0.03, offsetY: -0.022, width: 1.25, height: 0.555, rotate: 9 },
                { offsetX: -0.038, offsetY: -0.04, width: 1.38, height: 0.59, rotate: -34 },
                { offsetX: 0.046, offsetY: 0.03, width: 1.51, height: 0.625, rotate: 25 },
                { offsetX: -0.016, offsetY: 0.052, width: 1.64, height: 0.66, rotate: -6 }
              ];

          return ringLayouts.map((ring) => ({
            x: centreX + globeDiameter * ring.offsetX,
            y: centreY + globeDiameter * ring.offsetY,
            width: globeDiameter * ring.width,
            height: globeDiameter * ring.height,
            rotate: ring.rotate
          }));
        };

        const positionRingsAtGlobe = (x: number, y: number, globeScale: number) => {
          const targets = carouselRingTargets(x, y, globeScale);
          orbitRings.forEach((ring, index) => {
            const target = targets[index];
            if (!target) return;
            positionOrbitRing(ring, target.x, target.y, target.width, target.height, target.rotate);
          });
        };

        const detachedTargets = () => {
          if (!layout) return [];
          const vw = layout.viewportWidth;
          const vh = layout.viewportHeight;
          const mobile = vw <= 800;
          return mobile
            ? [
                { x: vw * 0.09, y: vh * 0.2, size: 44, rotate: -18 },
                { x: vw * 0.9, y: vh * 0.16, size: 164, rotate: 24 },
                { x: vw * 0.13, y: vh * 0.72, size: 112, rotate: 8 },
                { x: vw * 0.93, y: vh * 0.68, size: 34, rotate: -30 },
                { x: vw * 0.72, y: vh * 0.4, size: 224, rotate: 16 }
              ]
            : [
                { x: vw * 0.065, y: vh * 0.2, size: 58, rotate: -18 },
                { x: vw * 0.91, y: vh * 0.14, size: 286, rotate: 24 },
                { x: vw * 0.1, y: vh * 0.72, size: 166, rotate: 8 },
                { x: vw * 0.965, y: vh * 0.64, size: 44, rotate: -30 },
                { x: vw * 0.72, y: vh * 0.42, size: 360, rotate: 16 }
              ];
        };

        const moonTargets = () => {
          if (!layout) return [];
          const vw = layout.viewportWidth;
          const vh = layout.viewportHeight;
          if (vw <= 800) {
            return [
              { x: vw * 0.1, y: vh * 0.39, size: 34, rotate: -18 },
              { x: vw * 0.39, y: vh * 0.13, size: 52, rotate: -6 },
              { x: vw * 0.56, y: vh * 0.045, size: 24, rotate: 4 },
              { x: vw * 0.9, y: vh * 0.2, size: 78, rotate: 18 },
              { x: vw * 0.94, y: vh * 0.45, size: 30, rotate: 30 }
            ];
          }
          return [
            { x: vw * 0.065, y: vh * 0.39, size: 44, rotate: -18 },
            { x: vw * 0.39, y: vh * 0.105, size: 70, rotate: -6 },
            { x: vw * 0.55, y: vh * 0.03, size: 30, rotate: 4 },
            { x: vw * 0.94, y: vh * 0.19, size: 118, rotate: 18 },
            { x: vw * 0.97, y: vh * 0.43, size: 36, rotate: 30 }
          ];
        };

        const setMode = (mode: string) => {
          if (lastMode === mode) return;
          lastMode = mode;
          orbitSystem.dataset.mode = mode;
          const motionShouldRun = mode === "carousel" || mode === "detached" || mode === "final";
          if (motionShouldRun && !orbitMotionActive) {
            orbitMotionActive = true;
            orbitMotionStart = orbitTickerTime;
          } else if (!motionShouldRun && orbitMotionActive) {
            orbitMotionActive = false;
            orbitFinalBlend = 0;
            gsap.set(orbitFloats, { x: 0, y: 0 });
          }
          if (mode === "hidden" || mode === "approach" || mode === "travel") {
            orbitSystem.dataset.ringCount = "0";
          } else if (mode === "detached" || mode === "final") {
            orbitSystem.dataset.ringCount = "5";
          }
        };

        const renderGlobe = (pageProgress: number) => {
          if (!layout) calculateGlobeLayout();
          if (!layout) return;
          const y = pageProgress * layout.maxScroll;
          const visibleOpacity = layout.viewportWidth <= 800 ? 0.42 : 0.62;
          const mobileCarouselLite = layout.viewportWidth <= 720;
          orbitFinalBlend = 0;

          if (y < layout.approachStart) {
            setMode("hidden");
            setSignal(0, 0, 0.7, 0, 0, "hidden");
            return;
          }

          if (y <= layout.approachEnd) {
            const raw = gsap.utils.clamp(0, 1, (y - layout.approachStart) / Math.max(1, layout.approachEnd - layout.approachStart));
            const amount = smooth(raw);
            const approachScale = layout.viewportWidth <= 800 ? 2.28 : 2.88;
            const startX = -layout.width * 0.42;
            const startY = layout.viewportHeight * 0.5 - layout.height * 0.58;
            const endX = startX + layout.viewportWidth * (layout.viewportWidth <= 800 ? 0.12 : 0.09);
            const endY = startY + layout.viewportHeight * 0.035;
            const opacity = visibleOpacity * Math.min(1, raw / 0.08) * Math.min(1, (1 - raw) / 0.08);
            setMode("approach");
            setSignal(
              interpolate(startX, endX, amount),
              interpolate(startY, endY, amount),
              interpolate(approachScale * 0.96, approachScale, amount),
              interpolate(-8, 5, amount),
              opacity,
              "approach"
            );
            return;
          }

          if (y < layout.proofStart) {
            setMode("hidden");
            setSignal(0, 0, 0.7, 0, 0, "hidden");
            return;
          }

          if (y < layout.carouselStart) {
            if (mobileCarouselLite) {
              setMode("travel");
              setSignal(layout.pos3X, layout.pos3Y, 0.01, 0, 0, "travel");
              return;
            }
            const raw = gsap.utils.clamp(0, 1, (y - layout.proofStart) / Math.max(1, layout.carouselStart - layout.proofStart));
            const amount = smooth(raw);
            const startX = layout.viewportWidth * (layout.viewportWidth <= 800 ? 0.18 : 0.16) - layout.width / 2;
            const startY = layout.pos3Y + layout.viewportHeight * (layout.viewportWidth <= 800 ? 0.025 : 0.04);
            const opacity = visibleOpacity * Math.min(1, raw / 0.1);
            setMode("travel");
            setSignal(
              interpolate(startX, layout.pos3X, amount),
              interpolate(startY, layout.pos3Y, amount),
              interpolate(layout.pos3Scale * 0.9, layout.pos3Scale, softOut(raw)),
              interpolate(-5, 0, amount),
              opacity,
              "travel"
            );
            return;
          }

          if (y <= layout.carouselEnd) {
            if (mobileCarouselLite) {
              setMode("travel");
              setSignal(layout.pos3X, layout.pos3Y, 0.01, 0, 0, "travel");
              return;
            }
            setMode("carousel");
            setSignal(layout.pos3X, layout.pos3Y, layout.pos3Scale, 0, visibleOpacity, "carousel", carouselActiveIndex);
            positionRingsAtGlobe(layout.pos3X, layout.pos3Y, layout.pos3Scale);
            return;
          }

          if (y < layout.capabilitiesStart) {
            if (mobileCarouselLite) {
              setMode("travel");
              setSignal(layout.pos3X, layout.pos3Y, 0.01, 0, 0, "travel");
              return;
            }
            setMode("carousel");
            setSignal(layout.pos3X, layout.pos3Y, layout.pos3Scale, 0, visibleOpacity, "carousel", 4);
            positionRingsAtGlobe(layout.pos3X, layout.pos3Y, layout.pos3Scale);
            return;
          }

          if (y < layout.contactStart) {
            const raw = gsap.utils.clamp(0, 1, (y - layout.capabilitiesStart) / Math.max(1, layout.detachedEnd - layout.capabilitiesStart));
            const amount = smooth(raw);
            const targets = detachedTargets();
            setMode("detached");
            setSignal(
              layout.pos3X,
              layout.pos3Y,
              mobileCarouselLite ? 0.01 : Math.max(0.08, interpolate(layout.pos3Scale, 0.08, Math.min(1, raw / 0.64))),
              interpolate(0, 26, amount),
              mobileCarouselLite ? 0 : visibleOpacity * (1 - Math.min(1, raw / 0.58)),
              "detached"
            );

            const carouselTargets = carouselRingTargets(layout.pos3X, layout.pos3Y, layout.pos3Scale);
            orbitRings.forEach((ring, index) => {
              const from = carouselTargets[index];
              const target = targets[index];
              if (!from || !target) return;
              positionOrbitRing(
                ring,
                interpolate(from.x, target.x, amount),
                interpolate(from.y, target.y, amount),
                interpolate(from.width, target.size, amount),
                interpolate(from.height, target.size, amount),
                interpolate(from.rotate, target.rotate, amount)
              );
            });
            return;
          }

          const raw = gsap.utils.clamp(0, 1, (y - layout.contactStart) / Math.max(1, layout.maxScroll - layout.contactStart));
          const amount = smooth(raw);
          orbitFinalBlend = amount;
          const detached = detachedTargets();
          const moons = moonTargets();
          setMode("final");
          setSignal(
            layout.finalX,
            interpolate(layout.viewportHeight + layout.height * 0.32, layout.finalY, softOut(raw)),
            interpolate(0, layout.finalScale, softOut(raw)),
            interpolate(34, 0, amount),
            visibleOpacity * Math.min(1, raw / 0.36),
            "final"
          );

          orbitRings.forEach((ring, index) => {
            const from = detached[index];
            const to = moons[index];
            positionOrbitRing(
              ring,
              interpolate(from.x, to.x, amount),
              interpolate(from.y, to.y, amount),
              interpolate(from.size, to.size, amount),
              interpolate(from.size, to.size, amount),
              interpolate(from.rotate, to.rotate, amount)
            );
          });
        };

        const onOrbitPointer = (event: PointerEvent) => {
          if (orbitSystem.dataset.mode !== "detached" || event.pointerType === "touch") return;
          const nx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
          const ny = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
          orbitBodies.forEach((body, index) => {
            const strength = 5 + index * 2.2;
            body.style.setProperty("--orbit-react-x", `${(-nx * strength).toFixed(2)}px`);
            body.style.setProperty("--orbit-react-y", `${(-ny * strength).toFixed(2)}px`);
          });
        };

        const resetOrbitPointer = () => {
          orbitBodies.forEach((body) => {
            body.style.setProperty("--orbit-react-x", "0px");
            body.style.setProperty("--orbit-react-y", "0px");
          });
        };

        window.addEventListener("pointermove", onOrbitPointer, { passive: true });
        document.documentElement.addEventListener("mouseleave", resetOrbitPointer);
        cleanupOrbitPointer = () => {
          window.removeEventListener("pointermove", onOrbitPointer);
          document.documentElement.removeEventListener("mouseleave", resetOrbitPointer);
        };

        calculateGlobeLayout();
        renderGlobe(window.scrollY / Math.max(ScrollTrigger.maxScroll(window), 1));

        gsap.to(progress, {
          value: 1,
          ease: "none",
          onUpdate: () => renderGlobe(progress.value),
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
            onRefresh: () => {
              calculateGlobeLayout();
              renderGlobe(progress.value);
            }
          }
        });
      }

    }, rootRef);

    return () => {
      cleanupReelIdle();
      cleanupOrbitPointer();
      cleanupOrbitMotion();
      context.revert();
    };
  }, [introComplete, shouldReduceMotion]);

  useEffect(() => {
    const carouselViewport = rootRef.current?.querySelector<HTMLElement>(".project-carousel-viewport");
    const projectSlides = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".project-slide") ?? []);
    const landingVideo = rootRef.current?.querySelector<HTMLVideoElement>(".landing-reel video");
    const visibility = new Map<HTMLElement, number>();
    let siteIdle = document.documentElement.classList.contains("is-site-idle");
    let landingVisible = false;

    const safelyPlay = (video: HTMLVideoElement) => {
      if (siteIdle || !video.paused) return;
      void video.play().catch(() => undefined);
    };

    const pauseVideo = (video: HTMLVideoElement) => {
      if (!video.paused) video.pause();
    };

    const syncProjectPlayback = () => {
      const ranked = projectSlides
        .map((slide) => ({ slide, ratio: visibility.get(slide) ?? 0 }))
        .filter(({ ratio }) => ratio > 0.01)
        .sort((a, b) => b.ratio - a.ratio)
        .slice(0, 2)
        .map(({ slide }) => slide);

      projectSlides.forEach((slide) => {
        const video = slide.querySelector<HTMLVideoElement>("video");
        if (!video) return;
        if (!siteIdle && !activeProject && ranked.includes(slide)) safelyPlay(video);
        else pauseVideo(video);
      });
    };

    const projectObserver = carouselViewport
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => visibility.set(entry.target as HTMLElement, entry.intersectionRatio));
          syncProjectPlayback();
        }, {
          root: carouselViewport,
          rootMargin: "0px 12% 0px 12%",
          threshold: [0, 0.01, 0.15, 0.4, 0.7]
        })
      : null;

    projectSlides.forEach((slide) => projectObserver?.observe(slide));

    const landingObserver = landingVideo
      ? new IntersectionObserver(([entry]) => {
          landingVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.04);
          if (!entry || activeProject || siteIdle) {
            pauseVideo(landingVideo);
            return;
          }
          if (landingVisible) safelyPlay(landingVideo);
          else pauseVideo(landingVideo);
        }, { threshold: [0, 0.04, 0.2] })
      : null;

    const onIdleChange = (event: Event) => {
      siteIdle = Boolean((event as CustomEvent<{ idle?: boolean }>).detail?.idle);
      if (siteIdle) {
        projectSlides.forEach((slide) => {
          const video = slide.querySelector<HTMLVideoElement>("video");
          if (video) pauseVideo(video);
        });
        if (landingVideo) pauseVideo(landingVideo);
      } else {
        syncProjectPlayback();
        if (landingVideo && landingVisible && !activeProject) safelyPlay(landingVideo);
      }
    };

    window.addEventListener("portfolio-idle-change", onIdleChange);
    if (landingVideo) landingObserver?.observe(landingVideo);
    if (activeProject) {
      projectSlides.forEach((slide) => {
        const video = slide.querySelector<HTMLVideoElement>("video");
        if (video) pauseVideo(video);
      });
      if (landingVideo) pauseVideo(landingVideo);
    }

    return () => {
      projectObserver?.disconnect();
      landingObserver?.disconnect();
      window.removeEventListener("portfolio-idle-change", onIdleChange);
      projectSlides.forEach((slide) => {
        const video = slide.querySelector<HTMLVideoElement>("video");
        if (video) pauseVideo(video);
      });
      if (landingVideo) pauseVideo(landingVideo);
    };
  }, [activeProject]);

  return (
    <>
      {!introComplete ? <IntroScreen onComplete={completeIntro} /> : null}
      <main ref={rootRef} className="site-root" inert={!introComplete} aria-hidden={!introComplete}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} />
      <div className="noise" aria-hidden="true" />
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <SignalField />
      <GlobeOrbitSystem />
      <InteractiveCursor />

      <section className="landing-hero" id="top" aria-label="Introduction">
        <WaveField />
        <LandingParticles />
        <div className="landing-hero-shade" aria-hidden="true" />
        <div className="landing-hero-inner section">
          <motion.p
            className="landing-kicker"
            data-cursor-mask
            initial={simplifyLandingMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
          >
            Creative Producer - United Kingdom
          </motion.p>
          <LandingName reduceMotion={simplifyLandingMotion} />
          <motion.div
            className="landing-positioning"
            initial={simplifyLandingMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease }}
          >
            <strong data-cursor-mask>Creative Producer</strong>
            <span data-cursor-mask>Video production, live events and branded content</span>
          </motion.div>
          <div className="landing-sub">
            <motion.p
              className="landing-lede"
              data-cursor-mask
              initial={simplifyLandingMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease }}
            >
              I develop and deliver creative projects from concept to completion, combining production planning, filmmaking, post-production and live-event experience.
            </motion.p>
            <motion.div
              className="landing-actions"
              initial={simplifyLandingMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease }}
            >
              <a className="button button-primary" href="#work"><span data-cursor-mask>View selected work</span><span>↘</span></a>
              <a className="button button-quiet" href="#contact"><span data-cursor-mask>Discuss a project</span><span>↗</span></a>
              <a className="button button-quiet" href="/documents/joshua-pearman-creative-producer-cv.pdf" download="Joshua-Pearman-Creative-Producer-CV.pdf"><span data-cursor-mask>Download CV</span><span>↓</span></a>
            </motion.div>
          </div>
          <motion.div
            className="landing-credibility"
            initial={simplifyLandingMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            aria-label="Selected career statistics"
          >
            <span><strong>100+</strong> paid projects</span>
            <span><strong>74M+</strong> catalogue streams</span>
            <span><strong>Up to 15</strong> people coordinated</span>
            <span><strong>UK + EU</strong> touring</span>
          </motion.div>
        </div>
        <motion.div
          className="landing-marquee"
          aria-hidden="true"
          initial={simplifyLandingMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.92 }}
        >
          <div className="landing-marquee-track">
            {[...LANDING_ROLES, ...LANDING_ROLES].map((role, index) => <span key={`${role}-${index}`}>{role}</span>)}
          </div>
        </motion.div>
      </section>

      <ApproachManifesto reduceMotion={Boolean(shouldReduceMotion)} />

      <section className="landing-reel" id="reel" aria-label="Featured reel">
        <div className="landing-reel-pin">
          <div className="landing-reel-stage">
            <div className="landing-reel-radiance" aria-hidden="true">
              {REEL_FRAME_ROTATIONS.map((rotation, index) => (
                <span className="landing-reel-outline-idle" key={`reel-outline-${index}`}>
                  <i
                    className="landing-reel-outline"
                    data-rotation={rotation}
                    style={{
                      "--reel-outline-scale": `${0.5 + index * 0.125}`,
                      "--reel-outline-rotation": `${rotation}deg`,
                      "--reel-outline-opacity": `${Math.max(0.18, 0.58 - index * 0.055)}`
                    } as CSSProperties}
                  />
                </span>
              ))}
            </div>
            <div className="landing-reel-heading" aria-hidden="true">
              <strong data-cursor-mask>Creative Producer Reel</strong>
              <span data-cursor-mask>Video / Branded content / Live / Multicam / Post</span>
            </div>
            <div className="landing-reel-frame">
              <motion.div
                className="landing-reel-pivot"
                onPointerMove={pivotFeaturedReel}
                onPointerLeave={resetFeaturedReelPivot}
                style={{ rotateX: heroTiltX, rotateY: heroTiltY }}
              >
                <video muted loop playsInline preload="metadata" poster="/media/images/featured-portrait.webp">
                  <source src="/media/video/featured-reel.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>
            <div className="landing-reel-scroll" aria-hidden="true">
              <span className="landing-reel-scroll-copy landing-reel-scroll-copy-wheel">Scroll to open reel</span>
              <span className="landing-reel-scroll-copy landing-reel-scroll-copy-touch">Keep Swiping</span>
              <span className="landing-reel-scroll-track"><i /></span>
              <span className="landing-reel-scroll-arrow">↓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-section section" aria-label="Track record">
        <p className="proof-title" data-cursor-mask>Producer snapshot</p>
        <motion.div
          className="proof-strip glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease }}
          onPointerMove={pivotProof}
          onPointerLeave={resetProofPivot}
          style={{ rotateX: proofTiltX, rotateY: proofTiltY }}
        >
          {proof.map((item) => <StatCounter key={item.label} item={item} />)}
          <a className="proof-spotify" href="https://open.spotify.com/artist/1BhfikyrtSTch1r9upYGlS" target="_blank" rel="noreferrer"><span data-cursor-mask>Artist context</span><span>↗</span></a>
        </motion.div>
      </section>


      <section className="work section" id="work">
        <div className="project-carousel" aria-label="Selected projects carousel">
          <div className="project-carousel-pin">
            <div className="section-heading project-carousel-heading">
              <div><p className="section-index" data-cursor-mask>02 / Selected work</p><SwipeTitle>Producer-led projects from brief to delivery.</SwipeTitle></div>
              <p data-cursor-mask>Five flagship case studies showing creative direction, production planning, delivery scale, team coordination and technical ownership.</p>
            </div>
            <div className="project-carousel-viewport">
              <div className="project-carousel-track">
                {projects.map((project, index) => (
                  <div className="project-slide" key={project.id}>
                    <motion.button
                      type="button"
                      className="project-card"
                      aria-label={`${project.title}, project ${index + 1} of ${projects.length}`}
                      onClick={() => setActiveProject(project)}
                      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                      transition={{ duration: 0.32, ease }}
                      style={{ "--accent": project.accent } as CSSProperties}
                    >
                      <div className="project-media">
                        <video muted loop playsInline preload="none" poster={project.poster}>
                          <source src={project.video} type="video/mp4" />
                        </video>
                        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                        <span className="project-open">Open project ↗</span>
                      </div>
                      <div className="project-meta">
                        <div><span>{project.category} / {project.year}</span><h3>{project.title}</h3></div>
                        <p>{project.description}</p>
                        <div className="project-role-list project-role-summary">
                          <span>{project.roleLabel}</span>
                          <span>{project.scaleLabel}</span>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
            <div className="project-carousel-footer" aria-hidden="true">
              <div className="project-carousel-count"><span className="project-carousel-current">01</span><i />{String(projects.length).padStart(2, "0")}</div>
              <div className="project-carousel-dots">
                {projects.map((project, index) => <span className="project-carousel-dot" key={`${project.id}-dot`} data-index={index} />)}
              </div>
              <span className="project-carousel-hint">Scroll to advance</span>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="section-heading compact">
          <div><p className="section-index" data-cursor-mask>03 / Services</p><SwipeTitle>Production ownership from brief to delivery.</SwipeTitle></div>
        </div>
        <div className="services-grid">
          {Array.from({ length: Math.ceil(services.length / 2) }, (_, rowIndex) => {
            const rowServices = services.slice(rowIndex * 2, rowIndex * 2 + 2);
            const activeService = rowServices.find((service) => service.number === expandedService) ?? null;
            const activeServiceIndex = activeService ? rowServices.findIndex((service) => service.number === activeService.number) : -1;

            return (
              <div
                className={`service-row${activeServiceIndex >= 0 ? ` has-expanded expanded-${activeServiceIndex === 0 ? "left" : "right"}` : ""}`}
                key={`service-row-${rowIndex}`}
              >
                {rowServices.map((service) => {
                  const isExpanded = expandedService === service.number;
                  return (
                    <article className={`service-card glass${isExpanded ? " is-expanded" : ""}`} key={service.number}>
                      <button
                        type="button"
                        className="service-card-button"
                        aria-expanded={isExpanded}
                        aria-controls={`service-detail-${rowIndex}`}
                        onClick={() => setExpandedService((current) => current === service.number ? null : service.number)}
                      >
                        <div className="service-card-main">
                          <div className="service-symbol" aria-hidden="true">
                            <CapabilityIcon className="service-icon-main" name={service.icon} />
                            <span className="service-icon-plus"><i /><i /></span>
                          </div>
                          <div className="service-card-copy">
                            <div className="service-title-row">
                              <h3 data-cursor-mask>{service.title}</h3>
                              <span className="service-number" data-cursor-mask>{service.number}</span>
                            </div>
                            <p data-cursor-mask>{service.copy}</p>
                          </div>
                        </div>
                      </button>
                      <i className="service-card-connector" aria-hidden="true" />
                    </article>
                  );
                })}

                <AnimatePresence initial={false}>
                  {activeService ? (
                    <motion.div
                      className="service-drawer glass"
                      id={`service-detail-${rowIndex}`}
                      initial={compactViewport ? false : { height: 0, opacity: 0, y: -10 }}
                      animate={compactViewport ? { opacity: 1 } : { height: "auto", opacity: 1, y: 0 }}
                      exit={compactViewport ? { opacity: 0 } : { height: 0, opacity: 0, y: -10 }}
                      transition={compactViewport
                        ? { duration: 0.1, ease }
                        : { height: { duration: 0.52, ease }, opacity: { duration: 0.28 }, y: { duration: 0.42, ease } }}
                    >
                      <div className="service-drawer-inner">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.div
                            className="service-drawer-content"
                            key={activeService.number}
                            initial={compactViewport ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={compactViewport ? { opacity: 0 } : { opacity: 0, y: -8 }}
                            transition={{ duration: compactViewport ? 0.08 : 0.3, ease }}
                          >
                            <div className="service-drawer-heading">
                              <span>{activeService.number} / Experience note</span>
                            </div>
                            <p>{activeService.details}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="about section" id="about">
        <article className="about-card glass">
          <div className="about-image">
            <div className="about-image-media">
              <Image src="/media/images/profile-pic.webp" alt="Joshua Pearman" fill sizes="(max-width: 800px) 90vw, 40vw" />
            </div>
            <span className="image-label">Joshua Pearman / Creative Producer</span>
          </div>
          <div className="about-copy">
            <p className="section-index" data-cursor-mask>04 / About</p>
            <SwipeTitle>Creative ownership. Production discipline.</SwipeTitle>
            <p data-cursor-mask>I am a Creative Producer specialising in video production, live events and branded content. Since 2017, I have delivered more than 100 paid projects across music videos, commercial content, social campaigns, multicamera production, studio work and touring.</p>
            <p data-cursor-mask>My experience covers the full production process, from creative development and planning through filming, post-production and final delivery. I have coordinated teams of up to 15 people, managed touring logistics and budgets, and built technical systems for live performance.</p>
            <p data-cursor-mask>Recording and performing professionally as BVDLVD, with a 74M+ stream catalogue and experience across record labels, touring, campaign production and audience development. That gives me direct experience of both sides of the brief: creating the work and understanding how audiences, artists and campaigns operate.</p>
            <div className="about-tags"><span>Production planning</span><span>Crew coordination</span><span>Video production</span><span>Live systems</span><span>Post-production</span></div>
          </div>
        </article>
      </section>

      <section className="experience section" id="experience">
        <div className="section-heading experience-heading">
          <div>
            <p className="section-index" data-cursor-mask>05 / Experience</p>
            <SwipeTitle>Scale, leadership and commercial context.</SwipeTitle>
          </div>
          <p data-cursor-mask>Producer-level evidence should be fast to scan. This test layout separates ownership, scale and third-party validation from the visual portfolio.</p>
        </div>
        <div className="experience-grid">
          {experienceHighlights.map((item) => (
            <article className="experience-card glass" key={item.label}>
              <span>{item.label}</span>
              <strong data-cursor-mask>{item.value}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <article className="credentials-card glass" id="credentials">
          <div>
            <span>Application material</span>
            <h3 data-cursor-mask>Creative Producer CV</h3>
            <p>A one-page, role-targeted CV covering production ownership, leadership scale, case studies, capabilities, recognition, equipment and UK-wide availability.</p>
          </div>
          <div className="credentials-actions">
            <a href="/documents/joshua-pearman-creative-producer-cv.pdf" target="_blank" rel="noreferrer">View CV <span>↗</span></a>
            <a href="/documents/joshua-pearman-creative-producer-cv.pdf" download="Joshua-Pearman-Creative-Producer-CV.pdf">Download PDF <span>↓</span></a>
          </div>
        </article>
      </section>

      <ProductionArchive />

      <section className="references section" aria-label="References">
        <div className="testimonial-heading">
          <p className="section-index" data-cursor-mask>References</p>
          <h3 data-cursor-mask>Testimonials from Clients & Collaborators</h3>
        </div>
        <div className={`testimonial-grid${testimonials.length === 1 ? " is-single" : testimonials.length === 2 ? " is-pair" : ""}`}>
          {testimonials.map((testimonial) => (
            <article className="testimonial-card glass" key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <footer><strong>{testimonial.name}</strong><span>{testimonial.role}</span></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="recognition section">
        <p className="section-index" data-cursor-mask>07 / Recognition</p>
        <SwipeTitle className="recognition-title">Recognition, platforms and industry relationships.</SwipeTitle>
        <p className="recognition-intro" data-cursor-mask>Selected broadcast support, label relationships, client campaigns, festival experience, agency work and platform features across my creative career.</p>
        <div className="recognition-list">
          {recognition.map((item, index) => {
            const key = `${item.label}-${item.title}`;
            const isExpanded = expandedRecognition === key;
            return (
              <motion.article className={`recognition-item${isExpanded ? " is-expanded" : ""}`} key={key} layout>
                <button
                  type="button"
                  className="recognition-toggle"
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedRecognition((current) => current === key ? null : key)}
                >
                  <span data-cursor-mask>{item.label}</span>
                  <strong data-cursor-mask>{item.title}</strong>
                  <i aria-hidden="true"><span /><span /></i>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded ? (
                    <motion.div
                      className="recognition-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease }}
                    >
                      <div className="recognition-detail-layout">
                        <span className="recognition-detail-number">{String(index + 1).padStart(2, "0")}</span>
                        <div className="recognition-detail-copy">
                          {item.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          {item.source || item.links?.length ? (
                            <div className="recognition-links" aria-label={`${item.title} selected links`}>
                              {[...(item.source ? [item.source] : []), ...(item.links ?? [])].map((link) => (
                                <a
                                  className="recognition-source"
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-cursor="nav"
                                  key={`${link.label}-${link.href}`}
                                >
                                  <span>{link.label}</span>
                                  <span aria-hidden="true">↗</span>
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div
                          className={`recognition-media glass${item.media?.length ? " has-media" : ""}`}
                          data-count={item.media?.length ?? 0}
                        >
                          {item.media?.length ? (
                            <RecognitionMediaRotator media={item.media} title={item.title} />
                          ) : <span className="recognition-media-plus" aria-hidden="true"><i /><i /></span>}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="contact section" id="contact">
        <motion.div
          className="contact-card glass"
          onPointerMove={pivotContact}
          onPointerLeave={resetContactPivot}
          style={{ rotateX: contactTiltX, rotateY: contactTiltY }}
        >
          <div>
            <p className="section-index" data-cursor-mask>08 / Contact</p>
            <ContactFocusTitle />
            <p data-cursor-mask>Available for permanent, fixed-term, contract and freelance creative production opportunities across the United Kingdom, including London and Manchester, with remote and touring availability.</p>
          </div>
          <div className="contact-routes">
            <article>
              <span>Employment + contracts</span>
              <strong data-cursor-mask>Creative Producer roles</strong>
              <p>Permanent, fixed-term and contract opportunities across video, content, campaigns and live production.</p>
            </article>
            <article>
              <span>Freelance enquiries</span>
              <strong data-cursor-mask>Production projects</strong>
              <p>Video production, branded content, campaign delivery, multicam capture and live technical work.</p>
            </article>
          </div>
          <a className="contact-email" href="mailto:JoshuaPearmanMGMT@gmail.com"><span data-cursor-mask>JoshuaPearmanMGMT</span><span data-cursor-mask>@gmail.com ↗</span></a>
          <div className="contact-bottom">
            <span data-cursor-mask>United Kingdom - available nationwide, remotely and for touring</span>
            <div><a href="https://www.instagram.com/bvdlvd/" target="_blank" rel="noreferrer" data-cursor-mask>Instagram</a><a href="https://www.youtube.com/@BVDLVD" target="_blank" rel="noreferrer" data-cursor-mask>YouTube</a><a href="https://www.linkedin.com/in/bvdlvd/" target="_blank" rel="noreferrer" data-cursor-mask>LinkedIn</a></div>
          </div>
        </motion.div>
      </section>

      <footer className="footer section">
        <a className="identity" href="#top" data-cursor="nav"><span className="identity-mark identity-mark-image"><Image src="/icons/favicon-30.png" alt="" width={30} height={30} /></span><span className="identity-copy"><strong data-cursor-mask>Joshua Pearman</strong><small data-cursor-mask>Creative Producer</small></span></a>
        <div className="footer-meta">
          <p data-cursor-mask>© {new Date().getFullYear()} Joshua Pearman. Creative production from brief to delivery.</p>
          <div className="footer-socials" aria-label="Social links">
            {FOOTER_SOCIALS.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </div>
        <a className="footer-top-link" href="#top" data-cursor-mask>Back to top ↑</a>
        <span className="footer-version">JOSH PORTFOLIO v1.6.2 · Build 027</span>
      </footer>

      <ProjectDialog project={activeProject} onClose={closeProject} />
      </main>
    </>
  );
}
