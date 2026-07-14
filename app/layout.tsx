import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Joshua Pearman - Film, Music and Live Production",
  description: "Creative direction, videography, editing, audio and live production by Joshua Pearman, professionally known as BVDLVD.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icons/favicon-30.png",
    apple: "/icons/apple-touch-icon-180.png"
  },
  openGraph: {
    title: "Joshua Pearman - Creative Production",
    description: "Film, music and live production with atmosphere.",
    type: "website",
    siteName: "Joshua Pearman Creative Production",
    url: "/",
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Joshua Pearman - film, music and live production"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Pearman - Creative Production",
    description: "Film, music and live production with atmosphere.",
    images: ["/social-preview.jpg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#07080d",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SmoothScroll />{children}</body>
    </html>
  );
}
