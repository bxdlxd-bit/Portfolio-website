export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  category: "Film" | "Live" | "Campaign" | "Audio" | "Direction";
  description: string;
  longDescription: string;
  video: string;
  poster: string;
  accent: string;
  year: string;
  roles: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "showreel",
    title: "Artist showreel",
    eyebrow: "Selected direction, camera and edit",
    category: "Film",
    description: "A concentrated reel of music-led visual work built around movement, atmosphere and performance.",
    longDescription: "A selection of directing, camera and editing work across music videos and artist-led visual projects. The approach prioritises pace, texture and performance while keeping every frame connected to the identity of the artist.",
    video: "/media/video/featured-reel.mp4",
    poster: "/media/images/featured-portrait.webp",
    accent: "#b89cff",
    year: "2026",
    roles: ["Direction", "Camera", "Edit", "Colour"],
    links: [
      { label: "Knock Knock", href: "https://youtu.be/zpG-qxqRjKM?si=nDwrnhHmMFBI7nev" },
      { label: "Forget Me Not", href: "https://youtu.be/o-TUznwr8-0?si=aXdZCvLhwdYSEe5z" },
      { label: "Shameless", href: "https://youtu.be/iFle5zvjvn0?si=9XUb0hqCZBo_rxMp" },
      { label: "HEN$HAW - MAD", href: "https://youtu.be/Opy8g7hdI7k?si=UIMqh_LTATuCb0Pi" }
    ]
  },
  {
    id: "multicam",
    title: "Live performance film",
    eyebrow: "Multicam production and post",
    category: "Live",
    description: "A live edit shaped from multiple cameras, aligned audio, colour and the energy of the room.",
    longDescription: "End-to-end live performance coverage including camera planning, capture, multicam synchronisation, edit decisions, audio alignment and colour. Built to feel immediate without losing the clarity needed for a full-length performance film.",
    video: "/media/video/portfolio-multicam.mp4",
    poster: "/media/images/multicam-poster.webp",
    accent: "#65d9ff",
    year: "2025",
    roles: ["Multicam", "Live audio", "Edit", "Grade"],
    links: [
      { label: "BVDLVD London set", href: "https://youtu.be/cRYERtR_lSM" },
      { label: "Within Reach live", href: "https://www.youtube.com/watch?v=bwHCpbbzyo4" }
    ]
  },
  {
    id: "campaign",
    title: "Release campaign",
    eyebrow: "Short-form system and social delivery",
    category: "Campaign",
    description: "A repeatable vertical content language designed to carry a release across multiple touchpoints.",
    longDescription: "A campaign system that turns one central visual idea into a useful set of short-form assets. The work covers concept planning, filming, edit variations, reframing and delivery for social-first use without making every asset feel identical.",
    video: "/media/video/vertical-content-showcase.mp4",
    poster: "/media/images/vertical-content-poster.webp",
    accent: "#8dffca",
    year: "2024",
    roles: ["Concept", "Vertical video", "Social", "Delivery"]
  },
  {
    id: "studio",
    title: "Studio session",
    eyebrow: "Recording, vocal production and mix support",
    category: "Audio",
    description: "Technical studio work that keeps the session moving and the performance at the centre.",
    longDescription: "Recording and vocal production support across session setup, routing, comping, tuning, cleanup and mix preparation. The priority is reliable signal flow, fast decisions and a comfortable environment for the artist.",
    video: "/media/video/studio-session.mp4",
    poster: "/media/images/studio-session-poster.webp",
    accent: "#ff9e80",
    year: "2025",
    roles: ["Recording", "Vocals", "Mix prep", "Signal flow"]
  },
  {
    id: "album-world",
    title: "Album world-building",
    eyebrow: "Music and visual direction",
    category: "Direction",
    description: "A complete visual world developed around the emotional logic of an album campaign.",
    longDescription: "Concept development across trailers, artwork, visualisers and campaign imagery. Rather than treating each asset as a separate deliverable, the work begins with a clear emotional and visual rule-set so the whole release feels connected.",
    video: "/media/video/concept-building-portfolio.mp4",
    poster: "/media/images/concept-building-poster.webp",
    accent: "#ff7aa8",
    year: "2026",
    roles: ["Creative direction", "Artwork", "Identity", "Edit"],
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
    title: "Videography",
    icon: "video-camera",
    copy: "Production",
    details: "Confident across the full production process, from initial storyboarding and location scouting through to filming and final execution. I have a strong technical understanding of Sony camera systems, exposure, recording formats, lighting output and the settings that shape an image. My on-set experience includes three-point cinematic lighting, gimbal operation, practical effects, call sheets and coordinated team productions. I can operate independently, contribute within an established crew or take responsibility for leading and overseeing the shoot."
  },
  {
    number: "02",
    title: "Editing + motion",
    icon: "scissors",
    copy: "Post",
    details: "My editing is built around a deep understanding of pacing, anticipation, timing, impact and visual recoil. I combine precise editorial decision-making with experience in 2D and 3D animation using After Effects, Blender and Cinema 4D. My capabilities include time remapping, keyframe interpolation, VFX, motion graphics, fluid and smoke simulation, transitions, post-production effects and colour grading. I also maintain organised project workflows, reliable file-management systems and carefully optimised exports for different platforms and delivery requirements."
  },
  {
    number: "03",
    title: "Audio production",
    icon: "headphones",
    copy: "Studio",
    details: "With more than eight years of experience as a recording artist and producer, I understand audio from both the technical and performance perspectives. I produce instrumentals in Ableton Live and FL Studio and have extensive experience recording, engineering, mixing and mastering music for commercial platforms. My knowledge includes vocal production, dialogue levelling, gain matching, sound design, acoustic treatment, monitoring, audio interfaces, microphone selection, signal routing and LUFS-based loudness delivery. As a vocalist, I also understand the practical demands of singing, rapping, screaming and aggressive vocal performance."
  },
  {
    number: "04",
    title: "Live production",
    icon: "microphone",
    copy: "Stage",
    details: "Experienced in building and operating reliable live-performance systems where preparation, communication and timing are essential. My work covers stage setup, cable routing, microphone systems, IEM configuration and mixing, playback rigs, screen visuals and coordination with lighting teams. I have worked across live shows and festival environments as a performer, DJ and production lead, giving me a practical understanding of both the technical operation and the pressure experienced by the artist on stage."
  },
  {
    number: "05",
    title: "Creative campaigns",
    icon: "cursor",
    copy: "Campaign",
    details: "I develop creative campaigns from the first idea through to release, promotion and performance analysis. This includes concept development, pitch decks, social-media strategy, advertising, content production, account management, analytics and fast-turnaround delivery. I have planned complete album and single rollouts while also managing music distribution, merchandise design, manufacturing, packaging, fulfilment and e-commerce systems. The result is a joined-up campaign in which the visuals, content, products and release strategy all support the same identity."
  },
  {
    number: "06",
    title: "Tour support",
    icon: "pencil",
    copy: "Touring",
    details: "With more than 40 days of touring experience, I understand the organisation and adaptability required to keep a show moving from one city to the next. My experience includes team management, venue and staff liaison, transport and accommodation booking, load-ins, stage setup, merchandise sales and payment handling. I am comfortable taking responsibility for schedules, logistics and practical problem-solving while supporting performers, crew members and venue teams throughout the production."
  },
  {
    number: "07",
    title: "Graphic design",
    icon: "image",
    copy: "Design",
    details: "I create visual assets that give artists, products and campaigns a clear and recognisable identity. My work includes logo design, cover artwork, banners, clothing graphics, product artwork and Spotify Canvas content. I approach each design with a strong understanding of composition, hierarchy and how individual assets need to function as part of a wider visual system across digital platforms, physical products and promotional materials."
  },
  {
    number: "08",
    title: "Photography",
    icon: "camera",
    copy: "Photo",
    details: "Experienced in both planned productions and fast-moving on-set environments, covering portraiture, landscapes, press photography and candid event imagery. I am comfortable directing posed photographs while also identifying natural moments as they happen. My experience includes digital and analogue photography, colour-space management, image finishing and the creation of 3D GIF-style imagery. I focus on producing photographs that feel intentional, atmospheric and consistent with the wider identity of the subject or campaign."
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
  { value: "100+", label: "freelance projects" },
  { value: "74M+", label: "catalogue streams" },
  { value: "30+", label: "days toured" },
  { value: "5", label: "albums released" },
  { value: "2", label: "artists managed" }
];
