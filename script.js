/*
  CONTENT GUIDE
  -------------
  1. Replace the project objects below with your real work.
  2. Edit service objects to match the work you want to attract.
  3. Replace placeholder copy, contact links and social links in index.html.
  4. For real project images, add an `image` field and update the card renderer.
*/

const projects = [
  {
    title: "Artist showreel",
    type: "Video production",
    category: "video",
    description: "A Selection of my strongest directing, Camera and editing work.",
    tags: ["Direction", "Camera", "Edit"],
    video: "assets/video/featured-reel.mp4",
    poster: "assets/images/featured-portrait.webp",
    gradient: "linear-gradient(145deg, #1d2f46 0%, #4657c4 45%, #b96eff 100%)",
    examples: [
      {
        title: "BVDLVD - KNOCK KNOCK",
        text: "Music video example.",
        url: "https://youtu.be/zpG-qxqRjKM?si=nDwrnhHmMFBI7nev"
      },
      {
        title: "BVDLVD - FORGET ME NOT",
        text: "Music video example.",
        url: "https://youtu.be/o-TUznwr8-0?si=aXdZCvLhwdYSEe5z"
      },
      {
        title: "BVDLVD - SHAMELESS",
        text: "Music video example.",
        url: "https://youtu.be/iFle5zvjvn0?si=9XUb0hqCZBo_rxMp"
      },
      {
        title: "HEN$HAW - MAD",
        text: "Music video example.",
        url: "https://youtu.be/Opy8g7hdI7k?si=UIMqh_LTATuCb0Pi"
      }
    ]
  },
  {
    title: "Live performance film",
    type: "Multicam production",
    category: "live",
    description: "A multicamera live performance edit covering synchronisation, camera selection, audio alignment and colour grading.",
    tags: ["Multicam", "Live audio", "Colour"],
    video: "assets/video/portfolio-multicam.mp4",
    poster: "assets/images/multicam-poster.webp",
    gradient: "linear-gradient(145deg, #29151f 0%, #a33965 46%, #ff9d6c 100%)",
    examples: [
      {
        title: "BVDLVD London Live Multicam",
        text: "A 1 Hour Live Multicam Set with 360 visuals and Live Audio",
        url: "https://youtu.be/cRYERtR_lSM"
      },
      {
        title: "Within Reach Live Multicam",
        text: "A 30 minute set for an up and coming band at the London Underworld",
        url: "https://www.youtube.com/watch?v=bwHCpbbzyo4"
      }
    ]
  },
  {
    title: "Release campaign",
    type: "Creative campaign",
    category: "campaign",
    description: "A vertical content showcase for release strategy, social assets and short-form campaign delivery.",
    tags: ["Vertical", "Social", "Delivery"],
    video: "assets/video/vertical-content-showcase.mp4",
    poster: "assets/images/vertical-content-poster.webp",
    gradient: "linear-gradient(145deg, #102b28 0%, #0c8f8f 48%, #8fffd1 100%)"
  },
  {
    title: "Studio session",
    type: "Audio production",
    category: "music",
    description: "Highlight recording, vocal production, mixing or session-engineering work.",
    tags: ["Recording", "Mixing", "Vocals"],
    video: "assets/video/studio-session.mp4",
    poster: "assets/images/studio-session-poster.webp",
    gradient: "linear-gradient(145deg, #2c1712 0%, #bb5837 45%, #ffca73 100%)"
  },
  {
    title: "Album world-building",
    type: "Music and art direction",
    category: "music",
    description: "A concept-building showcase for shaping an album, EP or single campaign into a complete visual world.",
    tags: ["Concept", "Artwork", "Identity"],
    video: "assets/video/concept-building-portfolio.mp4",
    poster: "assets/images/concept-building-poster.webp",
    gradient: "linear-gradient(145deg, #21173d 0%, #6e48e5 48%, #67c8ff 100%)",
    examples: [
      {
        title: "PRESENCE - Album Trailer",
        text: "Album trailer example.",
        url: "https://youtu.be/EFJi4UYHVas?si=K9LXb1ebH4pPqPQ4"
      },
      {
        title: "BVDLVD - DIRT",
        text: "Album-world visual example.",
        url: "https://youtu.be/Yd-vpVb5Cc8?si=7pgnWYvVUl15dF1K"
      },
      {
        title: "Album Lyric Visualisers",
        text: "Playlist of album lyric visualisers.",
        url: "https://www.youtube.com/playlist?list=PLYSVE43dOnyajCOxZmovGWY_pXuggjkyU"
      }
    ]
  },
  {
    title: "Tour production",
    type: "Live and technical",
    category: "live",
    description: "Explain your role across routing, stage systems, playback, visuals and delivery.",
    tags: ["Touring", "Playback", "Production"],
    gradient: "linear-gradient(145deg, #10202d 0%, #176e9b 45%, #8e7bff 100%)"
  }
];

const services = [
  {
    title: "Videography",
    description: "Concept development, camera operation, lighting and visual direction for artists and brands.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z"/><path d="m17 10 5-2v8l-5-2"/><path d="M7 7.5 8.5 5h4L14 7.5"/></svg>'
  },
  {
    title: "Editing and motion",
    description: "Multicam edits, colour, sound cleanup, motion graphics and platform-ready deliveries.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="m9 8 7 4-7 4Z"/></svg>'
  },
  {
    title: "Audio production",
    description: "Recording, vocal production, mix preparation, signal flow and practical studio support.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M8 7v10"/><path d="M4 10v4"/><path d="M16 6v12"/><path d="M20 9v6"/></svg>'
  },
  {
    title: "Live production",
    description: "Stage, playback, IEM, visual, multicam and event-production support from load-in to showtime.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 20V9h8v11"/><path d="M7 8h10"/></svg>'
  },
  {
    title: "Creative campaigns",
    description: "Visual systems and repeatable content plans built around releases, stories and audience attention.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg>'
  },
  {
    title: "Tour support",
    description: "Routing, schedules, technical preparation, crew coordination and on-the-road problem solving.",
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h18"/><path d="M5 17 8 7h8l3 10"/><path d="M8 7V4h8v3"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/></svg>'
  }
];

const projectGrid = document.querySelector("#project-grid");
const servicesGrid = document.querySelector("#services-grid");

function getProjectExamples(project) {
  return project.examples || [
    {
      title: "Example 01",
      text: "Placeholder for a watchable clip, embed, case-study note or before-and-after example."
    },
    {
      title: "Example 02",
      text: "Placeholder for a second entry if this project needs multiple videos or versions."
    },
    {
      title: "Example 03",
      text: "Placeholder for a third entry, useful for variants, campaign assets or alternate cuts."
    }
  ];
}

function renderProjects(filter = "all") {
  projectGrid.innerHTML = "";

  projects.forEach((project, index) => {
    const hidden = filter !== "all" && project.category !== filter;
    const article = document.createElement("article");
    const projectId = `project-examples-${index}`;
    const examples = getProjectExamples(project);

    article.className = "project-card glass-card reveal";
    article.hidden = hidden;
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-expanded", "false");
    article.setAttribute("aria-controls", projectId);
    article.style.setProperty("--project-gradient", project.gradient);
    article.style.setProperty("--delay", `${Math.min(index * 70, 280)}ms`);
    article.innerHTML = `
      <div class="project-visual" aria-hidden="true">
        ${project.video ? `
          <video
            class="project-video"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            poster="${project.poster || ""}"
          >
            <source src="${project.video}" type="video/mp4">
          </video>
        ` : ""}
      </div>
      <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="project-content">
        <span class="project-type">${project.type}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="project-examples" id="${projectId}" aria-hidden="true">
          <div class="project-examples-inner">
            <span class="examples-label">Examples</span>
            ${examples.map((example, exampleIndex) => {
              const exampleContent = `
                <span>${String(exampleIndex + 1).padStart(2, "0")}</span>
                <div>
                  <strong>${example.title}</strong>
                  <p>${example.text}</p>
                </div>
              `;

              return example.url
                ? `<a class="example-option" href="${example.url}" target="_blank" rel="noopener noreferrer">${exampleContent}</a>`
                : `<div class="example-option">${exampleContent}</div>`;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    function toggleProject() {
      const isExpanded = article.classList.toggle("is-expanded");
      const examplesPanel = article.querySelector(".project-examples");
      article.setAttribute("aria-expanded", String(isExpanded));
      if (examplesPanel) examplesPanel.setAttribute("aria-hidden", String(!isExpanded));
    }

    article.addEventListener("click", event => {
      if (event.target.closest("a, button")) return;
      toggleProject();
    });

    article.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggleProject();
    });

    projectGrid.appendChild(article);
  });

  observeReveals();
}

function renderServices() {
  servicesGrid.innerHTML = services.map((service, index) => `
    <article class="service-card glass-card">
      <span class="service-number">${String(index + 1).padStart(2, "0")}</span>
      <div class="service-icon">${service.icon}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `).join("");
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -45px" });

function observeReveals() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach(element => {
    if (element.dataset.delay) {
      element.style.setProperty("--delay", `${element.dataset.delay}ms`);
    }
    revealObserver.observe(element);
  });
}

renderProjects();
renderServices();
observeReveals();

const accoladesCard = document.querySelector(".accolades-card");
if (accoladesCard) {
  const accoladesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      accoladesCard.classList.add("is-shining");
      accoladesObserver.unobserve(accoladesCard);
    });
  }, { threshold: .45 });
  accoladesObserver.observe(accoladesCard);
}


document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  siteNav.classList.toggle("is-open", !open);
});
siteNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href="#top"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname + window.location.search);
  });
});

const pointerFine = window.matchMedia("(pointer: fine)").matches;
if (pointerFine) {
  document.body.classList.add("has-pointer");
  const cursorGlow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });

  document.querySelectorAll(".tilt-card").forEach(card => {
    let frame = 0;
    let nextRotateX = 0;
    let nextRotateY = 0;
    let nextScale = 1;

    function applyTilt() {
      card.style.setProperty("--tilt-x", `${nextRotateX}deg`);
      card.style.setProperty("--tilt-y", `${nextRotateY}deg`);
      card.style.setProperty("--tilt-scale", nextScale);
      frame = 0;
    }

    function queueTilt(rotateX, rotateY, scale) {
      nextRotateX = rotateX;
      nextRotateY = rotateY;
      nextScale = scale;
      if (!frame) frame = requestAnimationFrame(applyTilt);
    }

    card.addEventListener("pointerenter", () => {
      card.classList.add("is-tilting");
    });

    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      const maxTilt = 7;
      queueTilt(y * -maxTilt, x * maxTilt, 1.015);
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      queueTilt(0, 0, 1);
    });
  });
}

function animateStat(element) {
  const target = Number(element.dataset.count);
  const duration = 950;
  const start = performance.now();
  element.textContent = "0";

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateStat(entry.target);
    statObserver.unobserve(entry.target);
  });
}, { threshold: .7 });

document.querySelectorAll("[data-count]").forEach(stat => statObserver.observe(stat));

const spotifyStats = document.querySelector(".hero-stats");
if (spotifyStats) {
  spotifyStats.addEventListener("pointerenter", () => {
    spotifyStats.querySelectorAll("[data-count]").forEach(animateStat);
  });
}

function applyCursorRepel(selector, strength = 14) {
  if (!pointerFine) return;

  document.querySelectorAll(selector).forEach(element => {
    let bounds = null;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    function updatePosition() {
      element.style.setProperty("--repel-x", `${nextX}px`);
      element.style.setProperty("--repel-y", `${nextY}px`);
      frame = 0;
    }

    function queuePosition(x, y) {
      nextX = x;
      nextY = y;
      if (!frame) frame = requestAnimationFrame(updatePosition);
    }

    element.addEventListener("pointerenter", () => {
      bounds = element.getBoundingClientRect();
    });

    element.addEventListener("pointermove", event => {
      if (!bounds) bounds = element.getBoundingClientRect();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const offsetX = (centerX - event.clientX) / bounds.width;
      const offsetY = (centerY - event.clientY) / bounds.height;
      const x = Math.max(-strength, Math.min(strength, offsetX * strength * 2.2));
      const y = Math.max(-strength, Math.min(strength, offsetY * strength * 2.2));

      queuePosition(x, y);
    });

    element.addEventListener("pointerleave", () => {
      bounds = null;
      queuePosition(0, 0);
    });

    window.addEventListener("scroll", () => {
      bounds = null;
    }, { passive: true });
  });
}

applyCursorRepel(".magnetic-repel");

/*
  REACTIVE PARTICLE NETWORK
  -------------------------
  Adjust PARTICLE_DENSITY, LINK_DISTANCE and POINTER_RADIUS below to change
  how busy and reactive the background feels.
*/
const particleCanvas = document.querySelector("#particle-network");

if (particleCanvas) {
  const context = particleCanvas.getContext("2d", { alpha: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointer = window.matchMedia("(pointer: coarse)");

  const PARTICLE_DENSITY = 18000;
  const LINK_DISTANCE = 128;
  const POINTER_RADIUS = 145;
  const MAX_SPEED = 72;

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let particles = [];
  let animationFrame = 0;
  let previousTime = performance.now();

  const pointer = {
    x: -1000,
    y: -1000,
    active: false
  };

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createParticle() {
    const driftX = randomBetween(-10, 10);
    const driftY = randomBetween(-10, 10);

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: randomBetween(.8, 1.8),
      driftX,
      driftY,
      velocityX: driftX,
      velocityY: driftY,
      phase: Math.random() * Math.PI * 2
    };
  }

  function rebuildParticles() {
    const maximum = coarsePointer.matches ? 48 : 88;
    const minimum = coarsePointer.matches ? 24 : 32;
    const count = Math.max(minimum, Math.min(maximum, Math.round((width * height) / PARTICLE_DENSITY)));
    particles = Array.from({ length: count }, createParticle);
  }

  function resizeParticleCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.6);

    particleCanvas.width = Math.round(width * pixelRatio);
    particleCanvas.height = Math.round(height * pixelRatio);
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    rebuildParticles();
    drawParticleNetwork(performance.now(), 0);
  }

  function updateParticle(particle, delta, time) {
    const driftPulse = Math.sin(time * .00045 + particle.phase) * 1.6;
    particle.velocityX += (particle.driftX + driftPulse - particle.velocityX) * .012 * delta * 60;
    particle.velocityY += (particle.driftY - driftPulse - particle.velocityY) * .012 * delta * 60;

    if (pointer.active && !reduceMotion.matches) {
      const offsetX = particle.x - pointer.x;
      const offsetY = particle.y - pointer.y;
      const distanceSquared = offsetX * offsetX + offsetY * offsetY;

      if (distanceSquared > 0 && distanceSquared < POINTER_RADIUS * POINTER_RADIUS) {
        const distance = Math.sqrt(distanceSquared);
        const force = (1 - distance / POINTER_RADIUS) * 410;
        particle.velocityX += (offsetX / distance) * force * delta;
        particle.velocityY += (offsetY / distance) * force * delta;
      }
    }

    const speed = Math.hypot(particle.velocityX, particle.velocityY);
    if (speed > MAX_SPEED) {
      particle.velocityX = (particle.velocityX / speed) * MAX_SPEED;
      particle.velocityY = (particle.velocityY / speed) * MAX_SPEED;
    }

    particle.x += particle.velocityX * delta;
    particle.y += particle.velocityY * delta;

    if (particle.x < -8) {
      particle.x = -8;
      particle.velocityX = Math.abs(particle.velocityX);
      particle.driftX = Math.abs(particle.driftX);
    } else if (particle.x > width + 8) {
      particle.x = width + 8;
      particle.velocityX = -Math.abs(particle.velocityX);
      particle.driftX = -Math.abs(particle.driftX);
    }

    if (particle.y < -8) {
      particle.y = -8;
      particle.velocityY = Math.abs(particle.velocityY);
      particle.driftY = Math.abs(particle.driftY);
    } else if (particle.y > height + 8) {
      particle.y = height + 8;
      particle.velocityY = -Math.abs(particle.velocityY);
      particle.driftY = -Math.abs(particle.driftY);
    }
  }

  function drawParticleNetwork(time, delta) {
    context.clearRect(0, 0, width, height);

    if (!reduceMotion.matches) {
      particles.forEach(particle => updateParticle(particle, delta, time));
    }

    for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
      const first = particles[firstIndex];

      for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
        const second = particles[secondIndex];
        const offsetX = first.x - second.x;
        const offsetY = first.y - second.y;
        const distanceSquared = offsetX * offsetX + offsetY * offsetY;

        if (distanceSquared < LINK_DISTANCE * LINK_DISTANCE) {
          const distance = Math.sqrt(distanceSquared);
          const opacity = (1 - distance / LINK_DISTANCE) * .21;
          const gradient = context.createLinearGradient(first.x, first.y, second.x, second.y);
          gradient.addColorStop(0, `rgba(159, 178, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(117, 222, 255, ${opacity * .82})`);
          context.strokeStyle = gradient;
          context.lineWidth = .72;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }
    }

    particles.forEach(particle => {
      let proximity = 0;
      if (pointer.active) {
        proximity = Math.max(0, 1 - Math.hypot(particle.x - pointer.x, particle.y - pointer.y) / POINTER_RADIUS);
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius + proximity * 1.35, 0, Math.PI * 2);
      context.fillStyle = `rgba(224, 235, 255, ${.38 + proximity * .52})`;
      context.shadowBlur = 9 + proximity * 13;
      context.shadowColor = "rgba(130, 190, 255, .48)";
      context.fill();
      context.shadowBlur = 0;
    });
  }

  function animateParticles(time) {
    const delta = Math.min((time - previousTime) / 1000, .033);
    previousTime = time;
    drawParticleNetwork(time, delta);
    animationFrame = requestAnimationFrame(animateParticles);
  }

  function startParticles() {
    cancelAnimationFrame(animationFrame);
    previousTime = performance.now();

    if (reduceMotion.matches) {
      drawParticleNetwork(previousTime, 0);
      return;
    }

    animationFrame = requestAnimationFrame(animateParticles);
  }

  window.addEventListener("pointermove", event => {
    if (coarsePointer.matches) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });

  document.documentElement.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("blur", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resizeParticleCanvas, { passive: true });
  reduceMotion.addEventListener("change", startParticles);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      startParticles();
    }
  });

  resizeParticleCanvas();
  startParticles();
}

