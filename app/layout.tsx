import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Joshua Pearman - Creative Producer",
  description: "Creative Producer specialising in video production, live events and branded content. Projects delivered from concept and planning through production, post and final delivery.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icons/favicon-30.png",
    apple: "/icons/apple-touch-icon-180.png"
  },
  openGraph: {
    title: "Joshua Pearman - Creative Producer",
    description: "Creative production across video, live events and branded content.",
    type: "website",
    siteName: "Joshua Pearman - Creative Producer",
    url: "/",
    images: [
      {
        url: "/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Joshua Pearman - Creative Producer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Pearman - Creative Producer",
    description: "Creative production across video, live events and branded content.",
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
