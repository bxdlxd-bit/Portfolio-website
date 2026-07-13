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
import { projects, proof, recognition, services, type Project } from "@/data/content";

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


const LANDING_ROLES = [
  "Direction",
  "Camera",
  "Edit",
  "Colour",
  "Recording",
  "Vocal production",
  "Live systems",
  "Multicam",
  "Motion",
  "Campaign worlds",
  "Touring"
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

const APPROACH_WORDS = "The strongest work is not decoration. It is a complete atmosphere built around the artist, the audience and the moment.".split(" ");

const manifestoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085, delayChildren: 0.12 } }
};

const manifestoWordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

function ApproachManifesto({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="manifesto section" aria-label="Creative approach">
      <p className="section-index" data-cursor-mask>01 / Approach</p>
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
              transition={{ duration: 0.56, ease }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [expandedRecognition, setExpandedRecognition] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.2 });

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

  const closeProject = useCallback(() => setActiveProject(null), []);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

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
    if (!introComplete) return;
    const header = rootRef.current?.querySelector<HTMLElement>(".site-header");
    const landing = rootRef.current?.querySelector<HTMLElement>(".landing-hero");
    if (!header || !landing) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(header, { autoAlpha: 0, xPercent: -50, yPercent: -145 });

      const showHeader = (animate = true) => {
        gsap.to(header, {
          autoAlpha: 1,
          xPercent: -50,
          yPercent: 0,
          duration: animate && !shouldReduceMotion ? 0.72 : 0,
          overwrite: true,
          ease: "power3.out"
        });
      };

      const hideHeader = (animate = true) => {
        gsap.to(header, {
          autoAlpha: 0,
          xPercent: -50,
          yPercent: -145,
          duration: animate && !shouldReduceMotion ? 0.48 : 0,
          overwrite: true,
          ease: "power3.inOut"
        });
      };

      ScrollTrigger.create({
        trigger: landing,
        start: "bottom top",
        end: "max",
        onEnter: () => showHeader(),
        onLeaveBack: () => hideHeader(),
        onRefresh: (self) => {
          if (window.scrollY >= self.start) showHeader(false);
          else hideHeader(false);
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => context.revert();
  }, [introComplete, shouldReduceMotion]);

  useEffect(() => {
    if (!introComplete || shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    let cleanupOrbitPointer = () => {};

    const context = gsap.context(() => {
      let projectCarouselScrollTrigger: ScrollTrigger | null = null;
      let carouselActiveIndex = 0;
      const aboutCard = document.querySelector<HTMLElement>(".about-card");
      const aboutMedia = document.querySelector<HTMLElement>(".about-image-media");
      if (aboutCard && aboutMedia) {
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
      if (reel && reelPin && reelFrame) {
        const initialScale = window.innerWidth <= 520 ? 0.72 : window.innerWidth <= 1050 ? 0.54 : 0.42;
        const finalScale = () => (window.innerWidth * 0.8) / reelFrame.offsetWidth;
        const initialHalfHeight = () => reelFrame.offsetHeight * initialScale * 0.5;
        const finalHalfHeight = () => reelFrame.offsetHeight * finalScale() * 0.5;
        const headingGap = () => window.innerWidth <= 800 ? 76 : 86;

        const reelTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: reel,
            start: "top top",
            end: "+=150%",
            scrub: 0.65,
            pin: reelPin,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        if (reelHeading) {
          reelTimeline.fromTo(reelHeading, {
            autoAlpha: 0,
            y: 0,
            scale: 0.9
          }, {
            autoAlpha: 1,
            y: () => -(initialHalfHeight() + headingGap()),
            scale: 1,
            duration: 0.16,
            ease: "back.out(1.7)"
          }, 0.02);
        }

        if (reelScroll) {
          reelTimeline.fromTo(reelScroll, {
            autoAlpha: 0,
            y: 0,
            scale: 0.9
          }, {
            autoAlpha: 1,
            y: () => initialHalfHeight() + 42,
            scale: 1,
            duration: 0.16,
            ease: "back.out(1.7)"
          }, 0.11);
        }

        reelTimeline.to(reelFrame, {
          scale: finalScale,
          borderRadius: 26,
          duration: 0.82,
          ease: "none"
        }, 0.18);

        if (reelHeading) {
          reelTimeline.to(reelHeading, {
            y: () => -(finalHalfHeight() + headingGap()),
            duration: 0.82,
            ease: "none"
          }, 0.18);
        }

        if (reelScroll) {
          reelTimeline.to(reelScroll, {
            y: () => finalHalfHeight() + 42,
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
        let maximumTravel = 0;
        let activeIndex = -1;

        const measureCarousel = () => {
          const finalSlide = projectSlides[projectSlides.length - 1];
          maximumTravel = Math.max(
            0,
            finalSlide.offsetLeft - (projectCarouselViewport.clientWidth - finalSlide.offsetWidth) / 2
          );
        };

        const setActiveCarouselProject = (index: number) => {
          if (index === activeIndex) return;
          activeIndex = index;
          carouselActiveIndex = index;
          projectSlides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === index);
          });
          projectDots.forEach((dot, dotIndex) => {
            const isCurrent = dotIndex === index;
            dot.classList.toggle("is-active", isCurrent);
            if (isCurrent) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
          });
          if (projectCurrent) projectCurrent.textContent = String(index + 1).padStart(2, "0");
        };

        measureCarousel();
        setActiveCarouselProject(0);

        const carouselTween = gsap.to(projectCarouselTrack, {
          x: () => -maximumTravel,
          ease: "none",
          scrollTrigger: {
            trigger: projectCarouselPin,
            start: () => `top ${window.innerWidth <= 800 ? 82 : 104}px`,
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
              backgroundPosition: "100% 50%",
              boxShadow: "0 0 38px rgba(154,126,255,.48), 0 0 62px rgba(80,197,255,.22)",
              duration: 1.2,
              ease: "sine.inOut"
            }, spotifyStart)
            .to(spotifyButton, {
              backgroundPosition: "0% 50%",
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
      const orbitBodies = gsap.utils.toArray<HTMLElement>(".globe-orbit-body");
      if (signal && orbitSystem && orbitRings.length === 5 && root) {
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

        const quadratic = (start: number, control: number, end: number, amount: number) => {
          const inverse = 1 - amount;
          return inverse * inverse * start + 2 * inverse * amount * control + amount * amount * end;
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
          const active = opacity > 0.018;
          signal.dataset.active = active ? "true" : "false";
          signal.dataset.phase = phase;
          signal.dataset.carouselIndex = String(carouselIndex);
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

        const positionRingsAtGlobe = (x: number, y: number, globeScale: number) => {
          if (!layout) return;
          const centreX = x + layout.width / 2;
          const centreY = y + layout.height / 2;
          const globeDiameter = layout.width * globeScale * 0.96;
          orbitRings.forEach((ring, index) => {
            const spread = 1.12 + index * 0.13;
            positionOrbitRing(
              ring,
              centreX,
              centreY,
              globeDiameter * spread,
              globeDiameter * (0.52 + index * 0.035),
              -13
            );
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
            const raw = gsap.utils.clamp(0, 1, (y - layout.proofStart) / Math.max(1, layout.carouselStart - layout.proofStart));
            const amount = smooth(raw);
            const startX = -layout.width * 0.3;
            const startY = layout.viewportHeight * 0.28 - layout.height * 0.5;
            const controlX = layout.viewportWidth * 0.22 - layout.width * 0.45;
            const controlY = layout.viewportHeight * 0.22 - layout.height * 0.42;
            const opacity = visibleOpacity * Math.min(1, raw / 0.16);
            setMode("travel");
            setSignal(
              quadratic(startX, controlX, layout.pos3X, amount),
              quadratic(startY, controlY, layout.pos3Y, amount),
              interpolate(0.78, layout.pos3Scale, softOut(raw)),
              interpolate(-14, 0, amount),
              opacity,
              "travel"
            );
            return;
          }

          if (y <= layout.carouselEnd) {
            setMode("carousel");
            setSignal(layout.pos3X, layout.pos3Y, layout.pos3Scale, 0, visibleOpacity, "carousel", carouselActiveIndex);
            positionRingsAtGlobe(layout.pos3X, layout.pos3Y, layout.pos3Scale);
            return;
          }

          if (y < layout.capabilitiesStart) {
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
              interpolate(layout.pos3Scale, 0, Math.min(1, raw / 0.64)),
              interpolate(0, 26, amount),
              visibleOpacity * (1 - Math.min(1, raw / 0.58)),
              "detached"
            );

            const centreX = layout.pos3X + layout.width / 2;
            const centreY = layout.pos3Y + layout.height / 2;
            const globeDiameter = layout.width * layout.pos3Scale * 0.96;
            orbitRings.forEach((ring, index) => {
              const target = targets[index];
              const startWidth = globeDiameter * (1.12 + index * 0.13);
              const startHeight = globeDiameter * (0.52 + index * 0.035);
              positionOrbitRing(
                ring,
                interpolate(centreX, target.x, amount),
                interpolate(centreY, target.y, amount),
                interpolate(startWidth, target.size, amount),
                interpolate(startHeight, target.size, amount),
                interpolate(-13, target.rotate, amount)
              );
            });
            return;
          }

          const raw = gsap.utils.clamp(0, 1, (y - layout.contactStart) / Math.max(1, layout.maxScroll - layout.contactStart));
          const amount = smooth(raw);
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
      cleanupOrbitPointer();
      context.revert();
    };
  }, [introComplete, shouldReduceMotion]);

  useEffect(() => {
    const carouselViewport = rootRef.current?.querySelector<HTMLElement>(".project-carousel-viewport");
    const projectSlides = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".project-slide") ?? []);
    const landingVideo = rootRef.current?.querySelector<HTMLVideoElement>(".landing-reel video");
    const visibility = new Map<HTMLElement, number>();

    const safelyPlay = (video: HTMLVideoElement) => {
      if (!video.paused) return;
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
        if (!activeProject && ranked.includes(slide)) safelyPlay(video);
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
          if (!entry || activeProject) {
            pauseVideo(landingVideo);
            return;
          }
          if (entry.isIntersecting && entry.intersectionRatio > 0.04) safelyPlay(landingVideo);
          else pauseVideo(landingVideo);
        }, { threshold: [0, 0.04, 0.2] })
      : null;

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
      projectSlides.forEach((slide) => {
        const video = slide.querySelector<HTMLVideoElement>("video");
        if (video) pauseVideo(video);
      });
      if (landingVideo) pauseVideo(landingVideo);
    };
  }, [activeProject]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

      <header className="site-header glass">
        <a className="identity" href="#top" aria-label="Joshua Pearman, back to top" data-cursor="nav">
          <span className="identity-mark identity-mark-image"><Image src="/icons/favicon-30.png" alt="" width={30} height={30} priority /></span>
          <span className="identity-copy"><strong data-cursor-mask>Joshua Pearman</strong><small data-cursor-mask>Creative production</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work"><span data-cursor-mask>Work</span></a>
          <a href="#capabilities"><span data-cursor-mask>Capabilities</span></a>
          <a href="#about"><span data-cursor-mask>About</span></a>
          <a className="nav-pill" href="#contact"><span data-cursor-mask>Start a project</span></a>
        </nav>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Toggle menu" onClick={() => setMenuOpen((value) => !value)} data-cursor="nav">
          <span /><span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav className="mobile-menu glass" aria-label="Mobile navigation" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {[["Work", "#work"], ["Capabilities", "#capabilities"], ["About", "#about"], ["Contact", "#contact"]].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}><span data-cursor-mask>{label}</span><span>↘</span></a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <section className="landing-hero" id="top" aria-label="Introduction">
        <WaveField />
        <LandingParticles />
        <div className="landing-hero-shade" aria-hidden="true" />
        <div className="landing-hero-inner section">
          <motion.p
            className="landing-kicker"
            data-cursor-mask
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
          >
            Musician · Video editor · Live production - Lincolnshire, UK
          </motion.p>
          <LandingName reduceMotion={Boolean(shouldReduceMotion)} />
          <div className="landing-sub">
            <motion.p
              className="landing-lede"
              data-cursor-mask
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease }}
            >
              Artist-led creative production from first concept to final delivery. Also known as <em>BVDLVD</em> - direction, camera, edit, audio and live systems under one roof.
            </motion.p>
            <motion.div
              className="landing-actions"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease }}
            >
              <a className="button button-primary" href="#reel"><span data-cursor-mask>View featured reel</span><span>↘</span></a>
              <a className="button button-quiet" href="mailto:JoshuaPearmanMGMT@gmail.com"><span data-cursor-mask>Start a project</span><span>↗</span></a>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="landing-marquee"
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
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
            <div className="landing-reel-heading" aria-hidden="true">
              <strong data-cursor-mask>Featured reel</strong>
              <span data-cursor-mask>Direction / Camera / Edit / Sound</span>
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
            <div className="landing-reel-scroll" aria-hidden="true" data-cursor-mask>Keep scrolling</div>
          </div>
        </div>
      </section>

      <section className="proof-section section" aria-label="Track record">
        <p className="proof-title" data-cursor-mask>Quick Digest</p>
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
          <a className="proof-spotify" href="https://open.spotify.com/artist/1BhfikyrtSTch1r9upYGlS" target="_blank" rel="noreferrer"><span data-cursor-mask>Spotify profile</span><span>↗</span></a>
        </motion.div>
      </section>


      <section className="work section" id="work">
        <div className="project-carousel" aria-label="Selected projects carousel">
          <div className="project-carousel-pin">
            <div className="section-heading project-carousel-heading">
              <div><p className="section-index" data-cursor-mask>02 / Selected work</p><SwipeTitle>Projects that move between disciplines without losing their identity.</SwipeTitle></div>
              <p data-cursor-mask>Each piece combines practical production with a clear visual or sonic point of view. Select a project to watch and explore the role behind it.</p>
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
                        <div className="project-role-list">{project.roles.slice(0, 3).map((role) => <span key={role}>{role}</span>)}</div>
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
          <div><p className="section-index" data-cursor-mask>03 / Capabilities</p><SwipeTitle>One creative partner, multiple disciplines.</SwipeTitle></div>
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
                    </article>
                  );
                })}

                <AnimatePresence initial={false}>
                  {activeService ? (
                    <motion.div
                      className="service-drawer glass"
                      id={`service-detail-${rowIndex}`}
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ height: { duration: 0.52, ease }, opacity: { duration: 0.28 }, y: { duration: 0.42, ease } }}
                    >
                      <div className="service-drawer-inner">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.div
                            className="service-drawer-content"
                            key={activeService.number}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease }}
                          >
                            <div className="service-drawer-heading">
                              <span>{activeService.number} / Experience note</span>
                              <strong>{activeService.title}</strong>
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
            <span className="image-label">BVDLVD / Joshua Pearman</span>
          </div>
          <div className="about-copy">
            <p className="section-index" data-cursor-mask>04 / About</p>
            <SwipeTitle>Artist instincts. Production discipline.</SwipeTitle>
            <p data-cursor-mask>I’m Joshua Pearman, a UK-based creative working professionally as BVDLVD. Since 2018, I’ve built a career across music, film, live shows and artist development.</p>
            <p data-cursor-mask>That experience means I understand both sides of a project: the creative pressure to make something distinct, and the practical pressure to deliver it properly. I can move from concept and camera to post-production, audio, stage systems and tour logistics without losing sight of the core idea.</p>
            <div className="about-tags"><span>DaVinci Resolve</span><span>Premiere Pro</span><span>After Effects</span><span>Ableton Live</span><span>Live systems</span></div>
          </div>
        </article>
      </section>

      <section className="recognition section">
        <p className="section-index" data-cursor-mask>05 / Recognition</p>
        <SwipeTitle className="recognition-title">Selected recognition</SwipeTitle>
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
                          {item.source ? (
                            <a
                              className="recognition-source"
                              href={item.source.href}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="nav"
                            >
                              <span>{item.source.label}</span>
                              <span aria-hidden="true">↗</span>
                            </a>
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
            <p className="section-index" data-cursor-mask>06 / Contact</p>
            <ContactFocusTitle />
            <p data-cursor-mask>For videography, editing, audio, campaign work, live production and touring enquiries.</p>
          </div>
          <a className="contact-email" href="mailto:JoshuaPearmanMGMT@gmail.com"><span data-cursor-mask>JoshuaPearmanMGMT</span><span data-cursor-mask>@gmail.com ↗</span></a>
          <div className="contact-bottom">
            <span data-cursor-mask>Based in Lincolnshire - working across the UK and remotely</span>
            <div><a href="https://www.instagram.com/bvdlvd/" target="_blank" rel="noreferrer" data-cursor-mask>Instagram</a><a href="https://www.youtube.com/@BVDLVD" target="_blank" rel="noreferrer" data-cursor-mask>YouTube</a><a href="https://www.linkedin.com/in/bvdlvd/" target="_blank" rel="noreferrer" data-cursor-mask>LinkedIn</a></div>
          </div>
        </motion.div>
      </section>

      <footer className="footer section">
        <a className="identity" href="#top" data-cursor="nav"><span className="identity-mark identity-mark-image"><Image src="/icons/favicon-30.png" alt="" width={30} height={30} /></span><span className="identity-copy"><strong data-cursor-mask>Joshua Pearman</strong><small data-cursor-mask>Creative production</small></span></a>
        <div className="footer-meta">
          <p data-cursor-mask>© {new Date().getFullYear()} Joshua Pearman. Built for motion, sound and the stage.</p>
          <div className="footer-socials" aria-label="Social links">
            {FOOTER_SOCIALS.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label}>
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </div>
        <a className="footer-top-link" href="#top" data-cursor-mask>Back to top ↑</a>
        <span className="footer-version">JOSH PORTFOLIO v1.0.2 · Build 003</span>
      </footer>

      <ProjectDialog project={activeProject} onClose={closeProject} />
      </main>
    </>
  );
}
