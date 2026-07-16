"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/content";
import DialogParticles from "./DialogParticles";

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 80);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <DialogParticles />
          <motion.article
            className="project-dialog"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
          >
            <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Close project">
              <span />
              <span />
            </button>
            <div className="dialog-media">
              <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
            <div className="dialog-content">
              <div className="dialog-kicker">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <h2 id="dialog-title">{project.title}</h2>
              <p>{project.longDescription}</p>
              <div className="dialog-project-summary">
                <span>{project.roleLabel}</span>
                <strong>{project.scaleLabel}</strong>
              </div>
              <div className="dialog-roles">
                {project.roles.map((role) => <span key={role}>{role}</span>)}
              </div>
              <div className="dialog-case-study">
                <section>
                  <span>Brief</span>
                  <p>{project.caseStudy.brief}</p>
                </section>
                <section>
                  <span>My role</span>
                  <p>{project.caseStudy.role}</p>
                </section>
                <section>
                  <span>Responsibilities</span>
                  <ul>{project.caseStudy.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section>
                  <span>Scale</span>
                  <ul>{project.caseStudy.scale.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="dialog-case-wide">
                  <span>Outcome</span>
                  <p>{project.caseStudy.outcome}</p>
                </section>
                <section className="dialog-case-wide">
                  <span>Credits</span>
                  <p>{project.caseStudy.credits}</p>
                </section>
                <section className="dialog-case-wide">
                  <span>Tools</span>
                  <div className="dialog-tools">{project.caseStudy.tools.map((tool) => <i key={tool}>{tool}</i>)}</div>
                </section>
              </div>
              {project.links?.length ? (
                <div className="dialog-links">
                  <p>Selected links</p>
                  {project.links.map((link, index) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {link.label}
                      <strong>↗</strong>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
