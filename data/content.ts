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
  category: "Branded Content" | "Live Production" | "Video Production" | "Content Production" | "Multicam" | "Creative Direction";
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
    },
    links: [
      { label: "M-BEAT & Missing Interview", href: "https://youtu.be/83WlPLw-864" },
      { label: "Fusion Without Formula EP", href: "https://open.spotify.com/album/0klGGcpwM24w3lR7JjWVLW?si=Ys8n_uATT0y1w3_0xsztUw" },
      { label: "BAGATUNE Instagram", href: "https://www.instagram.com/bagatune/" }
    ]
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
    title: "PS HITSQUAD Content Run",
    eyebrow: "HOUSE ANXIETY album content series",
    category: "Content Production",
    description: "A repeat vertical-content commission combining performance reels and interviews for PS HITSQUAD's Life on License album campaign.",
    longDescription: "A recurring vertical series commissioned by HOUSE ANXIETY for PS HITSQUAD's album Life on License. Performance-led reels and interview content presented PS as a multidimensional artist, placing personality, humour and personal growth alongside the music.",
    video: "/media/video/ps-hitsquad-content-run.mp4",
    poster: "/media/images/ps-hitsquad-content-run.webp",
    accent: "#b89cff",
    year: "2026",
    roles: ["Content production", "Direction", "Social content", "Post-production"],
    roleLabel: "Creative Producer / Director / Camera / Editor",
    scaleLabel: "5+ shoots · 60+ deliverables · Repeat client",
    caseStudy: {
      brief: "Produce the maximum amount of high-quality vertical content within each filming day without visual repetition. The campaign supported the album release, humanised the artist beyond reductive perceptions of his background and maintained a consistent TikTok and Instagram Reels pipeline.",
      role: "Creative Producer, Director, Camera Operator and Editor.",
      responsibilities: [
        "Developed treatments, shot lists, production routes and efficient run-and-gun schedules",
        "Coordinated PS and four HOUSE ANXIETY team members, including interview preparation, printed questions and on-set responsibilities",
        "Directed performance and interview content across changing locations, lighting conditions and outfits",
        "Managed camera, lighting, travel and wardrobe coordination, including selected clothing",
        "Edited, colour graded, captioned and delivered every asset, adding motion graphics to improve interview retention"
      ],
      scale: [
        "5+ commissioned shoots across approximately four to five months",
        "15+ locations used to create a wider multi-day campaign feel",
        "60+ completed vertical deliverables",
        "One shoot delivered 12 performance reels and 12 interview reels",
        "One-person production crew, supported by PS and four label representatives",
        "Every content run delivered in under one week"
      ],
      outcome: "Posts generated approximately 5,000 to 60,000 views across TikTok and Instagram, with the strongest Reel exceeding 360,000 views. The initial commission developed into a trusted repeat-client relationship, with HOUSE ANXIETY returning for the speed, efficiency and consistent quality of delivery.",
      credits: "Artist: PS HITSQUAD; Commissioning label: HOUSE ANXIETY; Creative production, direction, camera and post-production: Joshua Pearman; Interview support and on-set coordination: HOUSE ANXIETY team.",
      tools: ["Sony FX30", "DaVinci Resolve", "After Effects", "Aputure MC / Neewer 120W"]
    },
    links: [
      { label: "PS Vertical Content 01", href: "https://www.tiktok.com/@pshsq15/video/7535399165623536919?is_from_webapp=1&sender_device=pc" },
      { label: "PS Vertical Content 02", href: "https://www.tiktok.com/@pshsq15/video/7594908135127600406?is_from_webapp=1&sender_device=pc&web_id=7640696877750502934" },
      { label: "PS Vertical Content 03", href: "https://www.tiktok.com/@pshsq15/video/7613559341160926486?is_from_webapp=1&sender_device=pc&web_id=7640696877750502934" },
      { label: "PS Vertical Content 04", href: "https://www.instagram.com/reel/DUTh_fRiirh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
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
    title: "PRESENCE Campaign World-Building",
    eyebrow: "Independent album campaign and visual system",
    category: "Creative Direction",
    description: "A self-directed world connecting a ten-track album, four-single rollout, physical products, digital storytelling and an eight-date tour.",
    longDescription: "A self-directed campaign world created for BVDLVD's ten-track album PRESENCE after becoming fully independent. Metal and indie-rock influences were unified through an intimate, handmade visual language, combining warm amber, muted neutrals and deep black with low-light grain, home-video intimacy and cinematic framing.",
    video: "/media/video/concept-building-portfolio.mp4",
    poster: "/media/images/concept-building-poster.webp",
    accent: "#ff7aa8",
    year: "2026",
    roles: ["Campaign production", "Creative direction", "Visual identity", "World-building"],
    roleLabel: "Campaign Producer / Creative Director / Artist / Editor",
    scaleLabel: "10 tracks · 4-single rollout · 8-date tour",
    caseStudy: {
      brief: "Create a complete visual and release system for an emotionally raw album developed across one of the darkest periods of the artist's life. The campaign prioritised honest, self-contained storytelling over conventional algorithm-led promotion, allowing each single to feel distinct while remaining part of one recognisable world.",
      role: "Campaign Producer, Creative Director, Artist and Editor.",
      responsibilities: [
        "Defined the visual, emotional and sonic direction across music, artwork, video, merchandise, social media and live presentation",
        "Built and managed the rollout in Milanote, coordinating deadlines, contributors, singles, album release, merchandise and touring",
        "Produced two music videos, ten lyric visualisers, an album trailer, two interviews, twelve reels, ten Spotify Canvases and campaign graphics",
        "Created or supervised artwork, colour, self-filming, social content, clothing graphics and complete CD and vinyl packaging",
        "Extended the narrative into an interactive Discord world with lore videos, roleplaying staff and a custom artificial intelligence called S.C.A.M.",
        "Oversaw final music production, mixing and mastering while coordinating the campaign team and eight-date UK and European tour"
      ],
      scale: [
        "Three years of development; public rollout began 19 November 2025",
        "10-track album, four monthly singles and album release on 18 February 2026",
        "2 music videos, 10 lyric visualisers, 12 reels, 1 trailer, 2 interviews and 10 Spotify Canvases",
        "40+ selected press photographs, 3 Discord lore videos and a custom interactive AI experience",
        "Clothing graphics, merchandise imagery and complete CD and vinyl artwork",
        "8-date UK and European supporting tour"
      ],
      outcome: "Generated more than 2,000 presaves and at least five BBC Radio 1 plays. Three tracked tour dates produced approximately £5,000 in ticket sales, while 200 CDs and 50 vinyl records sold out alongside strong clothing and merchandise sales. One cohesive identity connected the release, digital world, physical products and live presentation.",
      credits: "Joshua Pearman: Campaign production, creative direction, artist, editing, colour grading, artwork, merchandise design, social content, music production, final mixing and mastering, release planning, team coordination and tour production. Rian Conophy: Co-planning, DIRT cinematography and co-editing, plus tour stage visuals. Sara Irvine: SLOZZA cinematography. Mist: Development of the S.C.A.M. artificial intelligence used within the Discord world.",
      tools: ["After Effects", "DaVinci Resolve", "Ableton Live", "Photoshop"]
    },
    links: [
      { label: "Album", href: "https://open.spotify.com/album/0iEO3Ykg2eAbeRrY0b6QqZ?si=4qtuLCY6TRaBwE57DNmefQ" },
      { label: "SLOZZA Music Video", href: "https://youtu.be/kugt9UhyVVQ" },
      { label: "PRESENCE album trailer", href: "https://youtu.be/EFJi4UYHVas?si=K9LXb1ebH4pPqPQ4" },
      { label: "DIRT music video", href: "https://youtu.be/Yd-vpVb5Cc8?si=7pgnWYvVUl15dF1K" }
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
    quote: "Working with Josh / BVDLVD across projects from Aisle 13 in Croatia to My House has consistently been the right choice for us. He excels at self-management, organisation and leading teams to meet deadlines and briefs. Josh is a creative collaborator we will always come back to.",
    name: "Noah Da Silva",
    role: "XANIMA"
  }
];

export type Recognition = {
  label: string;
  title: string;
  details: string[];
  source?: { label: string; href: string };
  links?: { label: string; href: string }[];
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
    source: { label: "Radio 1 Page", href: "https://www.bbc.co.uk/programmes/m001lnv0" },
    links: [
      { label: "PRISON Music Video", href: "https://youtu.be/L8ePgZFLdys?si=HyYKiMKatYR6bKN2" },
      { label: "INEVITABLE Music Video", href: "https://youtu.be/VF2c7rBUX1E?si=vHTLwHbisbQuNcOI" },
      { label: "NUMB Music Video", href: "https://youtu.be/U31cATK9tgU?si=R9OkkK9Lrun2Nn4u" },
      { label: "SLOZZA Music Video", href: "https://youtu.be/kugt9UhyVVQ?si=Rq6Kb1eObD8jDBG0" }
    ],
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
    links: [
      { label: "LUNATIC Album", href: "https://open.spotify.com/album/22554MRTPWheW1fZZtnewr?si=xmtGKpvORteG6SLdTdCqsQ" }
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
    links: [
      { label: "ABSENCE Album", href: "https://open.spotify.com/album/7Aui4EMVMjhiuDLwUjRXAy?si=_2L5kAxtSxC7oA4MpM2_gw" },
      { label: "PRISON Music Video", href: "https://youtu.be/L8ePgZFLdys?si=HyYKiMKatYR6bKN2" },
      { label: "INEVITABLE Music Video", href: "https://youtu.be/VF2c7rBUX1E?si=vHTLwHbisbQuNcOI" },
      { label: "FORGET ME NOT Music Video", href: "https://youtu.be/o-TUznwr8-0?si=4ODm0Wazezx05b1P" }
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
    links: [
      { label: "M-BEAT & Missing Interview", href: "https://youtu.be/83WlPLw-864" },
      { label: "Fusion Without Formula EP", href: "https://open.spotify.com/album/0klGGcpwM24w3lR7JjWVLW?si=Ys8n_uATT0y1w3_0xsztUw" }
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
    links: [
      { label: "ALT-LDN Recap", href: "https://youtu.be/fv1mYecc-4c?si=MDz7jc4m1TcPZ3uB" }
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
    source: { label: "Fizzler - Minimum Wage", href: "https://youtu.be/VAFgDe54ptE?si=4-obZrUrxoaZ69xB" },
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
    links: [
      { label: "FORGET ME NOT Music Video", href: "https://youtu.be/o-TUznwr8-0?si=4ODm0Wazezx05b1P" }
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

export type ProductionArchiveItem = {
  id: string;
  title: string;
  client?: string;
  role?: string;
  category: "Video production" | "Live capture" | "Campaign content" | "Post-production";
  year?: string;
  orientation: "landscape" | "portrait";
  size: "standard" | "wide" | "feature";
  note?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
  poster?: string;
  video?: string;
};

export const productionArchive: ProductionArchiveItem[] = [
  {
    id: "archive-01",
    title: "Shameless VFX Reel",
    client: "BVDLVD",
    role: "VFX / Editor / Vocalist",
    category: "Post-production",
    orientation: "portrait",
    size: "standard",
    note: "Created a VFX-intensive reel, manipulating a London tower block to move and dance to BVDLVD’s song “Shameless.”",
    tags: ["VFX", "Edit", "After Effects", "Vocals"],
    link: "https://www.instagram.com/reel/DIyjwaRisnm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    linkLabel: "View on Instagram",
    poster: "/media/archive/shameless-vfx-reel.webp",
    video: "/media/archive/shameless-vfx-reel.mp4"
  },
  {
    id: "archive-02",
    title: "PS Performance Reel",
    client: "PS HITSQUAD",
    role: "Direction / Camera / Edit",
    category: "Campaign content",
    orientation: "portrait",
    size: "standard",
    note: "Built moody lighting during a 12-hour PS shoot using a portable power station and Aputure MC fixtures.",
    tags: ["Colour grade", "Three-point lighting", "Edit", "DaVinci Resolve", "Direction", "Camera Operator"],
    link: "https://www.instagram.com/reel/DTvfb4lCvhV/?utm_source=ig_web_copy_link",
    linkLabel: "View on Instagram",
    poster: "/media/archive/ps-performance-reel.webp",
    video: "/media/archive/ps-performance-reel.mp4"
  },
  {
    id: "archive-03",
    title: "M-Beat - Creating “Incredible”",
    client: "M-BEAT",
    role: "Creative oversight / Direction / Edit",
    category: "Video production",
    orientation: "portrait",
    size: "standard",
    note: "Teamed with Alfie Cartwright to create a multicamera interview with the producer behind General Levy’s “Incredible.”",
    tags: ["Creative oversight", "Direction", "Edit", "Interview", "Camera Operator"],
    link: "https://youtu.be/83WlPLw-864",
    linkLabel: "Watch full interview",
    poster: "/media/archive/mbeat-creating-incredible.webp",
    video: "/media/archive/mbeat-creating-incredible.mp4"
  }
];
