"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { productionArchive, type ProductionArchiveItem } from "@/data/content";

const archiveEase = [0.2, 0.75, 0.2, 1] as const;
const ARCHIVE_BATCH_SIZE = 5;

function ArchivePlaceholder({ item, index, modal = false }: { item: ProductionArchiveItem; index: number; modal?: boolean }) {
  return (
    <span className={`archive-placeholder${modal ? " is-modal" : ""}`} aria-hidden="true">
      <span className="archive-placeholder-orbit archive-placeholder-orbit-a" />
      <span className="archive-placeholder-orbit archive-placeholder-orbit-b" />
      <span className="archive-placeholder-code">{String(index + 1).padStart(2, "0")}</span>
      <span className="archive-placeholder-copy">
        <strong>Media placeholder</strong>
        <small>{item.orientation === "portrait" ? "9:16 preview" : "16:9 preview"}</small>
      </span>
    </span>
  );
}

function ArchiveMedia({ item, index, activePreview = false, modal = false }: {
  item: ProductionArchiveItem;
  index: number;
  activePreview?: boolean;
  modal?: boolean;
}) {
  if (item.video && activePreview) {
    return (
      <video
        autoPlay
        muted={!modal}
        loop={!modal}
        controls={modal}
        playsInline
        preload={modal ? "metadata" : "none"}
        poster={item.poster}
      >
        <source src={item.video} type="video/mp4" />
      </video>
    );
  }

  if (item.poster) {
    return <Image src={item.poster} alt="" fill sizes={modal ? "(max-width: 800px) 94vw, 70vw" : "(max-width: 520px) 92vw, (max-width: 900px) 50vw, 34vw"} />;
  }

  return <ArchivePlaceholder item={item} index={index} modal={modal} />;
}

export default function ProductionArchive() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ProductionArchiveItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ARCHIVE_BATCH_SIZE);

  const visibleItems = productionArchive.slice(0, visibleCount);
  const remainingCount = Math.max(0, productionArchive.length - visibleCount);
  const hasMore = remainingCount > 0;

  const closeArchive = useCallback(() => setActiveItem(null), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) setPreviewId(null);
    }, { rootMargin: "120px", threshold: 0 });

    const onIdleChange = (event: Event) => {
      const idle = Boolean((event as CustomEvent<{ idle?: boolean }>).detail?.idle);
      if (idle) setPreviewId(null);
    };

    observer.observe(section);
    window.addEventListener("portfolio-idle-change", onIdleChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio-idle-change", onIdleChange);
    };
  }, []);

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setPreviewId(null);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 80);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeArchive();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeItem, closeArchive]);

  const handlePreviewStart = (event: ReactPointerEvent<HTMLButtonElement>, item: ProductionArchiveItem) => {
    if (event.pointerType !== "mouse" || !item.video || document.documentElement.classList.contains("is-site-idle")) return;
    setPreviewId(item.id);
  };

  return (
    <>
      <section className="production-archive section" id="production-archive" ref={sectionRef}>
        <div className="section-heading production-archive-heading">
          <div>
            <p className="section-index" data-cursor-mask>06 / Production archive</p>
            <h2 data-cursor-mask>Freelance delivery beyond the flagship case studies.</h2>
          </div>
          <p data-cursor-mask>A growing contact sheet for one-off production, filming, editing, live-capture and campaign commissions.</p>
        </div>

        <div className="production-archive-key" aria-label="Production archive categories">
          <span>Video production</span>
          <span>Live capture</span>
          <span>Campaign content</span>
          <span>Post-production</span>
        </div>

        <div className={`production-archive-reveal${hasMore ? " has-more" : ""}`}>
          <div className={`production-archive-grid${productionArchive.length <= 2 ? " is-compact" : ""}`}>
          {visibleItems.map((item, index) => {
            const isPreviewing = previewId === item.id;
            const style = {
              "--archive-index": index,
              "--archive-entry-y": `${index % 3 === 0 ? 42 : index % 3 === 1 ? -28 : 22}px`
            } as CSSProperties;

            return (
              <motion.button
                type="button"
                className={`archive-tile archive-${item.orientation} archive-${item.size}`}
                key={item.id}
                style={style}
                initial={shouldReduceMotion ? false : { opacity: 0, y: index % 3 === 1 ? -28 : 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.62, delay: shouldReduceMotion ? 0 : Math.min(index * 0.025, 0.25), ease: archiveEase }}
                onPointerEnter={(event) => handlePreviewStart(event, item)}
                onPointerLeave={() => setPreviewId((current) => current === item.id ? null : current)}
                onBlur={() => setPreviewId((current) => current === item.id ? null : current)}
                onClick={() => setActiveItem(item)}
                aria-label={`Open archive item ${index + 1}: ${item.title}`}
              >
                <span className="archive-tile-media">
                  <ArchiveMedia item={item} index={index} activePreview={isPreviewing} />
                </span>
                <span className="archive-tile-shade" aria-hidden="true" />
                <span className="archive-tile-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="archive-tile-copy">
                  {item.client ? <small>{item.client}</small> : null}
                  <strong data-cursor-mask>{item.title}</strong>
                  <span>{item.year ? `${item.category} · ${item.year}` : item.category}</span>
                </span>
                <span className="archive-tile-hover">
                  <small>{item.role ?? item.category}</small>
                  <span>View details ↗</span>
                </span>
              </motion.button>
            );
          })}
          </div>

          <AnimatePresence initial={false}>
            {hasMore ? (
              <motion.div
                className="production-archive-more"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <button
                  type="button"
                  className="production-archive-more-button"
                  onClick={() => setVisibleCount((current) => Math.min(current + ARCHIVE_BATCH_SIZE, productionArchive.length))}
                  aria-label={`Load ${Math.min(ARCHIVE_BATCH_SIZE, remainingCount)} more production archive items`}
                >
                  <span>Load more</span>
                  <small>{remainingCount} remaining</small>
                  <i aria-hidden="true">↓</i>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="archive-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) closeArchive();
            }}
          >
            <motion.article
              className={`archive-dialog archive-${activeItem.orientation}`}
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-labelledby="archive-dialog-title"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.34, ease: archiveEase }}
            >
              <button ref={closeRef} className="archive-dialog-close" type="button" onClick={closeArchive} aria-label="Close archive item">
                <span />
                <span />
              </button>
              <div className="archive-dialog-media">
                <ArchiveMedia item={activeItem} index={productionArchive.findIndex((item) => item.id === activeItem.id)} activePreview modal />
              </div>
              <div className="archive-dialog-content">
                <div className="archive-dialog-kicker">
                  <span>{activeItem.category}</span>
                  {activeItem.year ? <span>{activeItem.year}</span> : null}
                </div>
                <h2 id="archive-dialog-title">{activeItem.title}</h2>
                {activeItem.client ? <p className="archive-dialog-client">{activeItem.client}</p> : null}
                <dl>
                  {activeItem.role ? <div><dt>Role</dt><dd>{activeItem.role}</dd></div> : null}
                  <div><dt>Format</dt><dd>{activeItem.orientation === "portrait" ? "Portrait / vertical" : "Landscape / horizontal"}</dd></div>
                  {activeItem.note ? <div><dt>Delivery context</dt><dd>{activeItem.note}</dd></div> : null}
                </dl>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
