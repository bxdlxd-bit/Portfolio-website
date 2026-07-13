# Joshua Pearman Portfolio - Next.js Redesign

A motion-led portfolio built with the Next.js App Router.

## Stack

- Next.js 16
- React 19
- TypeScript
- Motion for interface transitions, layout animation and accordions
- GSAP ScrollTrigger for scroll-linked animation and parallax
- Three.js for the ambient WebGL signal field
- Native HTML video for efficient local reel playback

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The deployment automatically uses Vercel's production URL for Open Graph metadata. For a custom domain, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final domain.

## Production checks

```bash
npm run typecheck
npm run build
npm start
```

## Content

Project, service and recognition content is kept in `data/content.ts`.

Media is stored in:

- `public/media/video`
- `public/media/images`
- `public/icons`
- `public/social-preview.jpg`

## Main design features

- Responsive glass navigation and strongly blurred mobile menu
- Autoplay reel and project media
- Continuous scroll-driven WebGL globe choreography
- Animated orbital dots and line motifs
- GSAP parallax, text reveals and diagonal title wipes
- Pivot interactions for the reel, proof strip and contact card
- Expandable capability and recognition cards
- Interactive diagonal particle rain behind project dialogs
- Two-column mobile capabilities grid
- Fine grain, clipped cursor highlights and reduced-motion support
- Favicon, canonical metadata and Discord/Open Graph preview image

## Deployment

The project is suitable for Vercel or any Node hosting provider that supports Next.js 16. Use `npm run build` as the build command. Vercel will automatically deploy commits pushed to the connected production branch.
