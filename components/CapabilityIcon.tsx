import type { SVGProps } from "react";

type IconName = "video-camera" | "camera" | "image" | "scissors" | "headphones" | "microphone" | "cursor" | "pencil";

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export default function CapabilityIcon({ name, ...props }: Props) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };


  if (name === "video-camera") {
    return (
      <svg {...common} {...props}>
        <rect x="4" y="8" width="17" height="16" rx="3" />
        <path d="m21 13 7-4v14l-7-4v-6Z" />
        <circle cx="10" cy="13" r="1.5" />
      </svg>
    );
  }

  if (name === "camera") {
    return (
      <svg {...common} {...props}>
        <path d="M5.5 10.5h5l2-3h7l2 3h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-21a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
        <circle cx="16" cy="18" r="5" />
      </svg>
    );
  }


  if (name === "image") {
    return (
      <svg {...common} {...props}>
        <rect x="4" y="5" width="24" height="22" rx="3" />
        <circle cx="11" cy="12" r="2.5" />
        <path d="m6.5 24 7-7 4.5 4.5 3-3 4.5 5.5" />
      </svg>
    );
  }

  if (name === "scissors") {
    return (
      <svg {...common} {...props}>
        <circle cx="8" cy="9" r="3.5" />
        <circle cx="8" cy="23" r="3.5" />
        <path d="m11 11 15 11M11 21l15-11M17.5 16 26 9.5" />
      </svg>
    );
  }

  if (name === "headphones") {
    return (
      <svg {...common} {...props}>
        <path d="M6 17v-2a10 10 0 0 1 20 0v2" />
        <path d="M6 17h3.5v9H8a2 2 0 0 1-2-2v-7ZM26 17h-3.5v9H24a2 2 0 0 0 2-2v-7Z" />
      </svg>
    );
  }

  if (name === "microphone") {
    return (
      <svg {...common} {...props}>
        <rect x="11" y="4" width="10" height="16" rx="5" />
        <path d="M7.5 15.5a8.5 8.5 0 0 0 17 0M16 24v4M11.5 28h9" />
      </svg>
    );
  }

  if (name === "cursor") {
    return (
      <svg {...common} {...props}>
        <path d="m7 4 18 12-8 2.3-3.4 7.7L7 4Z" />
        <path d="m17 18 5 7" />
      </svg>
    );
  }

  return (
    <svg {...common} {...props}>
      <path d="m6 24 1.5-6.5L21 4l7 7-13.5 13.5L8 26l-2-2Z" />
      <path d="m18.5 6.5 7 7M7.5 17.5l7 7" />
    </svg>
  );
}
