export type ProjectCaseStudy = {
  brief: string;
  role: string;
  responsibilities: string[];
  scale: string[];
  outcome: string;
  credits: string;
  tools: string[];
};

export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  category: "Branded Content" | "Live Production" | "Video Production" | "Multicam" | "Creative Direction";
  description: string;
  longDescription: string;
  video: string;
  poster: string;
  accent: string;
  year: string;
  roles: string[];
  roleLabel: string;
  scaleLabel: string;
  caseStudy: ProjectCaseStudy;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "bagatune",
    title: "Fusion Without Formula",
    eyebrow: "BAGATUNE release campaign",
    category: "Branded Content",
    description: "A multi-artist social campaign developed from one central release identity into more than 60 platform-ready assets.",
    longDescription: "A producer-led campaign system created for M-Beat and Missing's BAGATUNE project. The work translated the Fusion Without Formula identity into repeatable social content while coordinating artists, production, filming, post-production and release delivery.",
    video: "/media/video/vertical-content-showcase.mp4",
    poster: "/media/images/vertical-content-poster.webp",
    accent: "#8dffca",
    year: "2024",
    roles: ["Creative production", "Campaign delivery", "Direction", "Post-production"],
    roleLabel: "Creative Producer / Director / Editor",
    scaleLabel: "3 months · £5,000 budget",
    caseStudy: {
      brief: "Build a coherent social-first campaign for a collaborative six-track project involving multiple artists, personalities and release moments.",
      role: "Creative Producer, Director, Camera Operator and Editor.",
      responsibilities: [
        "Developed the full treatment and content-package plan",
        "Planned a three-month production around multiple contributors and release dates",
        "Coordinated six featured artists and the required filming sessions",
        "Directed, filmed and edited platform-specific performance content",
        "Managed photography, interviews, end cards, Spotify Canvases and final delivery"
      ],
      scale: [
        "Campaign duration: 3 months",
        "Budget: £5,000",
        "6 featured artists",
        "5-10 social-ready performance reels per artist",
        "40+ press-ready portraits of the producers",
        "50+ press-ready portraits across featured artists"
      ],
      outcome: "Delivered the full treatment and content package, performance reels for all six artists, press-ready producer and featured-artist photography, content end cards, Spotify Canvases and a one-hour deep-dive interview on the story of M-Beat and Missing.",
      credits: "M-Beat & Missing - Clients; Ian McQuaid - Project hire / Interviewer; Alfie Cartwright - B-camera Operator / Overflow Editor.",
      tools: ["Lightroom", "Three-point lighting", "Gimbal", "Lenses", "Microphones"]
    }
  },
  {
    id: "tour-production",
    title: "UK + European Tour Production",
    eyebrow: "Tour management and technical delivery",
    category: "Live Production",
    description: "Planning, staffing and technical coordination for an eight-date UK and European run with a 13-person touring party.",
    longDescription: "A full touring operation covering routing, schedules, budgets, transport, accommodation, team coordination, guestlists, venue liaison, playback, wireless systems, load-ins, soundchecks and merchandise delivery.",
    video: "/media/video/studio-session.mp4",
    poster: "/media/images/studio-session-poster.webp",
    accent: "#ff9e80",
    year: "2022",
    roles: ["Tour management", "Live production", "Technical systems", "Crew coordination"],
    roleLabel: "Tour Manager / Live Production Lead",
    scaleLabel: "8 dates · 13-person touring party",
    caseStudy: {
      brief: "Deliver a reliable multi-date tour across the UK and Europe while balancing the audience experience, artist needs, technical systems and commercial constraints.",
      role: "Tour Manager, Production Lead and Performing Artist.",
      responsibilities: [
        "Managed a 13-person crew across the complete run",
        "Planned routing, vehicle hire, travel, schedules, accommodation and food",
        "Managed venue communication, guestlists, support acts and show-day timings",
        "Coordinated performance equipment, lighting desks, FOH workflows and point-of-sale",
        "Oversaw load-ins, soundchecks, merchandise, promotion and practical troubleshooting"
      ],
      scale: [
        "8 dates across 8 cities and 5 countries",
        "13-person crew",
        "£5,000 generated from ticket sales across 3 UK dates",
        "£3,000 allocated across European travel, accommodation, food, UK venue hire, fuel and performance equipment",
        "£5,000 merchandise investment returned £10,000 revenue",
        "Paris - Forum Club; Hamburg - Turmizimmer; Berlin - Machinenhaus; Warsaw - Mechanik; Prague - Bike Jesus; Birmingham - Sunflower Lounge; Manchester - Eagle Inn; London - Fox & Firkin"
      ],
      outcome: "Delivered three sold-out dates, collected verifiable audience ticket-sale analytics, ran online and in-person promotion through tour posters, social advertising and email marketing, developed a healthy team network eager to collaborate again, and worked alongside French production company Base Productions for the European dates.",
      credits: "Ian McQuaid - Artist Manager; Sunflower Lounge; Eagle Inn; Fox & Firkin; Base Productions - Niels & Naomie.",
      tools: ["Vehicle hire", "Lighting desks", "FOH", "Point-of-sale"]
    }
  },
  {
    id: "narrative-video",
    title: "Narrative Music Video",
    eyebrow: "External brief and audience delivery",
    category: "Video Production",
    description: "A narrative-led music video produced from creative interpretation through filming, post-production and platform release.",
    longDescription: "A case-study placeholder for the strongest narrative music video responding to an external artist brief. The final version should demonstrate concept development, planning, direction, technical execution and measurable audience impact.",
    video: "/media/video/featured-reel.mp4",
    poster: "/media/images/featured-portrait.webp",
    accent: "#b89cff",
    year: "[YEAR]",
    roles: ["Creative production", "Direction", "Camera", "Edit"],
    roleLabel: "Creative Producer / Director / Camera / Editor",
    scaleLabel: "[AUDIENCE RESULT] · [CREW SIZE]",
    caseStudy: {
      brief: "Translate an artist's track and release objective into a distinctive narrative film suitable for a major music platform.",
      role: "Creative Producer, Director, Camera Operator and Editor.",
      responsibilities: [
        "Interpreted the artist and release brief",
        "Developed the concept and visual treatment",
        "Planned locations, contributors and production requirements",
        "Directed and filmed the project",
        "Managed edit, colour and final platform delivery"
      ],
      scale: [
        "Crew size: [PLACEHOLDER]",
        "Locations: [PLACEHOLDER]",
        "Production timeline: [PLACEHOLDER]",
        "Budget range: [PLACEHOLDER]",
        "Distribution platform: [PLACEHOLDER]"
      ],
      outcome: "[PLACEHOLDER: project name, audience result, client response and release impact]",
      credits: "[PLACEHOLDER: artist, production collaborators and specialist crew]",
      tools: ["Sony cinema camera system", "Premiere Pro", "After Effects", "DaVinci Resolve"]
    },
    links: [
      { label: "Fizzler - Minimum Wage", href: "https://youtu.be/VAFgDe54ptE?si=4-obZrUrxoaZ69xB" },
      { label: "Knock Knock", href: "https://youtu.be/zpG-qxqRjKM?si=nDwrnhHmMFBI7nev" }
    ]
  },
  {
    id: "multicam",
    title: "Multicam Live Capture",
    eyebrow: "Live direction, capture and post",
    category: "Multicam",
    description: "A complete live-performance workflow covering camera planning, synchronisation, audio alignment, editorial structure and final delivery.",
    longDescription: "End-to-end live performance production designed to preserve the energy of the room while delivering the visual and sonic clarity expected from a finished multicam film.",
    video: "/media/video/portfolio-multicam.mp4",
    poster: "/media/images/multicam-poster.webp",
    accent: "#65d9ff",
    year: "2025",
    roles: ["Video production", "Multicam direction", "Live capture", "Post-production"],
    roleLabel: "Video Producer / Multicam Director / Editor",
    scaleLabel: "5 cameras · 10+ assets",
    caseStudy: {
      brief: "Capture live performances from multiple viewpoints and turn them into coherent audience-facing films with aligned sound, colour and pacing while travelling between tour dates.",
      role: "Video Producer, Multicam Director, Camera Operator and Editor.",
      responsibilities: [
        "Planned five-camera positions and coverage priorities",
        "Coordinated a three-person capture crew and performance requirements",
        "Managed media, synchronisation and proxy workflows while travelling",
        "Edited the performances and aligned live audio",
        "Completed next-day colour grading and platform-specific exports"
      ],
      scale: [
        "Camera count: 5",
        "Crew size: 3",
        "Performance length: 60 minutes + 30 minutes",
        "Turnaround: next day while travelling",
        "Delivery count: 10+ assets",
        "Delivery platforms: YouTube, Spotify, TikTok and Instagram"
      ],
      outcome: "Captured multiple one-hour sets across a tour and delivered dozens of highlighted vertical moments for social media, alongside colour-graded long-form performance assets for audience release.",
      credits: "Fox & Firkin - Venue; Alfie Cartwright - Handheld Camera Operator; Kristian Bennet - Lighting Technician; Alastair Wain - Drummer; Bailey Dopson - Guitarist; Alex Charles - Bassist.",
      tools: ["Five-camera workflow", "DaVinci Resolve", "Premiere Pro", "Live audio synchronisation", "Colour grading"]
    },
    links: [
      { label: "BVDLVD London set", href: "https://youtu.be/cRYERtR_lSM" },
      { label: "Within Reach live", href: "https://www.youtube.com/watch?v=bwHCpbbzyo4" }
    ]
  },
  {
    id: "presence-campaign",
    title: "PRESENCE Campaign World",
    eyebrow: "Album campaign and visual system",
    category: "Creative Direction",
    description: "A joined-up campaign world connecting a ten-track album, trailers, artwork, visualisers and audience-facing release content.",
    longDescription: "A complete visual and release system built around the emotional logic of the PRESENCE album. The project demonstrates how one creative rule-set can guide multiple formats without losing consistency.",
    video: "/media/video/concept-building-portfolio.mp4",
    poster: "/media/images/concept-building-poster.webp",
    accent: "#ff7aa8",
    year: "2026",
    roles: ["Campaign production", "Creative direction", "Visual identity", "Delivery"],
    roleLabel: "Campaign Producer / Creative Director / Editor",
    scaleLabel: "10 tracks · [DELIVERABLE COUNT] campaign assets",
    caseStudy: {
      brief: "Create a complete album campaign that could communicate a raw, varied ten-track project through one recognisable visual and emotional system.",
      role: "Campaign Producer, Creative Director, Artist and Editor.",
      responsibilities: [
        "Defined the campaign's visual and emotional rule-set",
        "Planned release phases and supporting content",
        "Produced trailers, artwork, visualisers and campaign imagery",
        "Managed post-production and platform-specific delivery",
        "Connected the campaign to live performance and audience communication"
      ],
      scale: [
        "10-track album",
        "Campaign duration: [PLACEHOLDER]",
        "Deliverable count: [PLACEHOLDER]",
        "Contributors: [PLACEHOLDER]",
        "Platforms: [PLACEHOLDER]"
      ],
      outcome: "[PLACEHOLDER: release performance, campaign outcome and audience response]",
      credits: "[PLACEHOLDER: photographers, filmmakers, designers and release partners]",
      tools: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Adobe design tools"]
    },
    links: [
      { label: "PRESENCE trailer", href: "https://youtu.be/EFJi4UYHVas?si=K9LXb1ebH4pPqPQ4" },
      { label: "DIRT visual", href: "https://youtu.be/Yd-vpVb5Cc8?si=7pgnWYvVUl15dF1K" },
      { label: "Lyric visualisers", href: "https://www.youtube.com/playlist?list=PLYSVE43dOnyajCOxZmovGWY_pXuggjkyU" }
    ]
  }
];

export type Service = {
  number: string;
  title: string;
  icon: "video-camera" | "camera" | "image" | "scissors" | "headphones" | "microphone" | "cursor" | "pencil";
  copy: string;
  details: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Creative production",
    icon: "cursor",
    copy: "Brief to delivery",
    details: "Concepts, treatments, schedules, budgets, production planning, crew coordination, stakeholder communication and final delivery. I can take ownership of the complete project while keeping the creative objective, practical constraints and audience result aligned. Supporting evidence and producer-level project examples will be added during the case-study pass."
  },
  {
    number: "02",
    title: "Video + branded content",
    icon: "video-camera",
    copy: "Campaigns and film",
    details: "Commercial video, music content, campaign films, interviews, social-first production, cinematography, photography and platform-specific assets. Direction, camera and editing remain visible here as delivery capabilities within a wider production role rather than separate job identities."
  },
  {
    number: "03",
    title: "Live + technical production",
    icon: "microphone",
    copy: "Events and touring",
    details: "Event planning, tour logistics, multicam capture, playback systems, wireless microphones, monitoring, venue liaison, FOH coordination, crew communication and show-day troubleshooting. This service should be supported by publishable tour scale, budget responsibility and collaborator feedback."
  },
  {
    number: "04",
    title: "Post-production + delivery",
    icon: "scissors",
    copy: "Finish and handover",
    details: "Editorial structure, colour, audio cleanup, motion graphics, versioning, captions, social reframing, review management, exports and organised handover. The emphasis is on reliable completion and platform-ready delivery, with software and equipment treated as supporting tools rather than the headline service."
  }
];

export const processStages = [
  { number: "01", title: "Discover", copy: "Clarify the objective, audience, platform, stakeholders, constraints and measure of success." },
  { number: "02", title: "Develop", copy: "Shape the concept, treatment, schedule, budget and practical production plan." },
  { number: "03", title: "Produce", copy: "Coordinate contributors, crew, locations, equipment, filming and live delivery." },
  { number: "04", title: "Post-produce", copy: "Manage edit, sound, colour, motion graphics, review rounds and approvals." },
  { number: "05", title: "Deliver", copy: "Prepare final masters, platform versions, campaign assets and an organised handover." }
];

export const experienceHighlights = [
  { label: "Professional practice", value: "Since 2017", copy: "100+ paid projects across production, post, campaigns, live work and artist development." },
  { label: "Leadership scale", value: "Up to 15 people", copy: "Crew and touring-party coordination across time-sensitive productions and live environments." },
  { label: "Commercial context", value: "Client + artist side", copy: "Direct experience of briefs, record labels, releases, audiences, budgets, touring and campaign delivery." }
];

export const testimonials = [
  {
    quote: "[PLACEHOLDER: a client testimonial covering organisation, communication and reliable delivery.]",
    name: "[CLIENT NAME]",
    role: "[ROLE / ORGANISATION]"
  },
  {
    quote: "[PLACEHOLDER: a collaborator testimonial covering leadership, judgement and problem-solving under pressure.]",
    name: "[COLLABORATOR NAME]",
    role: "[ROLE / PROJECT]"
  },
  {
    quote: "[PLACEHOLDER: a tour or venue testimonial covering preparation, technical reliability and teamwork.]",
    name: "[TOUR / VENUE CONTACT]",
    role: "[ROLE / ORGANISATION]"
  }
];

export type Recognition = {
  label: string;
  title: string;
  details: string[];
  source?: { label: string; href: string };
  media?: { src: string; alt: string; fit?: "cover" | "contain" }[];
};

export const recognition: Recognition[] = [
  {
    label: "National radio",
    title: "BBC Radio 1",
    details: [
      "My single “PRISON” was featured by BBC Radio 1 presenter Nels Hylton in May 2023, placing the release in front of a national audience. The accompanying music video also received television coverage, demonstrating the project’s ability to translate across both audio and visual platforms.",
      "My track “Inevitable” received two plays on BBC Radio 1, alongside support from BBC Radio Sheffield. The track was described on air as: “Fusion of metal and trap, it works - and I’m OBSESSED with this track!”",
      "“SLOZZA” was played on BBC Radio 1 Introducing Rock with Alyx Holcombe, who described it as: “Trap Metal goodness! Like being punched in the face - but in a good way.” The track also received further BBC Introducing support from Jess Izzatt.",
      "“NUMB” was featured on BBC Radio 1 Future Alternative with Nels Hylton. Additional tracks from the album PRESENCE have also received regional BBC support across BBC Radio Derby, BBC Radio Leicester, BBC Radio Lincolnshire and BBC Radio Nottingham."
    ],
    source: { label: "Source", href: "https://www.bbc.co.uk/programmes/m001lnv0" },
    media: [
      { src: "/media/recognition/bbc-future-alternative-numb.webp", alt: "BBC Radio 1 Future Alternative feature for BVDLVD track NUMB" },
      { src: "/media/recognition/bbc-future-alternative-prison.webp", alt: "BBC Radio 1 Future Alternative feature for BVDLVD track PRISON" }
    ]
  },
  {
    label: "Record label",
    title: "MOVES Recordings",
    details: [
      "I began working with MOVES Recordings as a videographer, producing visual content for artists across the label’s roster. This relationship developed into a successful career as a signed recording artist, leading to three increasingly valuable record agreements between 2019 and 2021.",
      "During this period, I created several EPs and the album LUNATIC, maintaining a consistent release schedule before and throughout the COVID-19 pandemic. Alongside writing and performing, I filmed music videos, edited advertising campaigns and managed production budgets and expenses. I progressed from an emerging signing into one of the label’s most prominent artists, alongside acts including Naira Marley and Skengdo & AM."
    ],
    media: [
      { src: "/media/recognition/moves-recordings.webp", alt: "MOVES Recordings logo", fit: "contain" }
    ]
  },
  {
    label: "Record label",
    title: "Earache Records",
    details: [
      "I signed a two-option record agreement with Earache Records, including advances of $70,000 and a potential further $120,000, to create and release the album ABSENCE. I took an active role in budgeting production, equipment and creative expenses, ensuring the project’s visual and musical ambitions remained achievable within the available resources.",
      "I developed a detailed conceptual art direction for the campaign, including a mobile London bus advertisement featuring a scannable QR code. The campaign also included several ambitious music videos using FPV drone cinematography, large-scale locations and the hire of a functioning prison. These productions required close collaboration with external crews, including production company XANIMA, while maintaining a consistent creative identity across the album."
    ],
    media: [
      { src: "/media/recognition/earache-records.webp", alt: "Earache Records logo", fit: "contain" }
    ]
  },
  {
    label: "Creative campaign",
    title: "BAGATUNE - M-Beat & Missing",
    details: [
      "Legendary producer M-Beat, known for General Levy’s “Incredible”, partnered with producer Missing to create the collaborative project BAGATUNE. I was hired to translate their creative vision into a tangible social-media campaign, while also contributing to the project as a featured artist on the track “No Halo”.",
      "The campaign was built around the ethos “Fusion Without Formula”, which needed to remain clearly represented across every piece of content. I filmed and delivered more than 60 assets for the release, working with and coordinating a wide range of artists and personalities, including Teezandos, PS Hitsquad, Deecien and Kwengface. The project required creative interpretation, artist management, adaptable production planning and consistent delivery across a complex collaborative campaign."
    ],
    media: [
      { src: "/media/recognition/bagatune-square.webp", alt: "M-Beat and Missing photographed for the BAGATUNE project" }
    ]
  },
  {
    label: "Live performance",
    title: "Festivals - BOOMTOWN & Kendal Calling",
    details: [
      "I have performed at established UK festivals including Boomtown Festival 2022, Kendal Calling 2022 and AltFest 2021. At AltFest, I was also hired to interview American rapper Smokepurpp live ahead of his performance. These appearances required confident communication, professional live-set preparation and the ability to operate effectively within large-scale, time-sensitive festival environments alongside artists, stage crews, engineers and production teams."
    ],
    media: [
      { src: "/media/recognition/boomtown-2022.webp", alt: "Boomtown Festival 2022 Earache Takeover lineup featuring BVDLVD" }
    ]
  },
  {
    label: "Live representation",
    title: "CAA & Primary Talent",
    details: [
      "I have completed contracted live work involving both CAA and Primary Talent, two internationally recognised booking agencies. This experience has included dozens of live shows, festival appearances, headline performances and touring dates, requiring consistent communication with agents, promoters, venues and production teams."
    ],
    media: [
      { src: "/media/recognition/caa.png", alt: "CAA logo", fit: "contain" },
      { src: "/media/recognition/primary-talent.png", alt: "Primary Talent logo", fit: "contain" }
    ]
  },
  {
    label: "Music video",
    title: "GRM Daily",
    details: [
      "I created the music video for Fizzler’s “Minimum Wage”, which was released through GRM Daily and has since surpassed one million views. I was responsible for translating the track into an engaging visual project suitable for one of the UK’s most influential urban-music platforms."
    ],
    source: { label: "Source", href: "https://youtu.be/VAFgDe54ptE?si=4-obZrUrxoaZ69xB" },
    media: [
      { src: "/media/recognition/grm-daily.png", alt: "GRM Daily logo", fit: "contain" }
    ]
  },
  {
    label: "International feature",
    title: "WorldStar HipHop",
    details: [
      "My track and accompanying music video “Forget Me Not” were featured by WorldStarHipHop, introducing the release to the platform’s international audience and expanding its visibility beyond the UK music market."
    ],
    media: [
      { src: "/media/recognition/worldstarhiphop.png", alt: "WorldStarHipHop logo", fit: "contain" }
    ]
  }
];

export const proof = [
  { value: "100+", label: "paid creative projects" },
  { value: "74M+", label: "catalogue streams" },
  { value: "15", label: "people coordinated" },
  { value: "60+", label: "assets in one campaign" },
  { value: "8", label: "date UK + EU managed run" }
];
