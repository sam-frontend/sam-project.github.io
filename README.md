# Sam Ugwu — Creative Developer Portfolio

A personal portfolio site built with TanStack Start, featuring an image gallery with optimized images, an about page, project showcase, and a contact page with social links.

## Tech Stack

### Frontend
- **Framework**: TanStack Start (React 19 + Vite)
- **Styling**: Tailwind CSS v4
- **Content**: Content Collections (Markdown-driven projects)
- **Image Optimization**: Netlify Image CDN (automatic WebP conversion, responsive sizing, edge caching)
- **Forms**: Netlify Forms
- **PWA**: Service Worker, Web App Manifest, Install Prompt
- **Deployment**: Netlify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **CORS**: Enabled for frontend communication

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero landing page with featured work list |
| `/about` | Bio, skills, experience timeline with optimized headshot |
| `/gallery` | Masonry image gallery — all images optimized via Netlify Image CDN |
| `/projects` | Project showcase with tags and links |
| `/contact` | Contact form (Netlify Forms) + social media links |

## Running Locally

### Frontend

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

For full Netlify feature support (Image CDN, Forms) during local development:

```bash
netlify dev
```

### Backend

The Express.js backend runs separately on `http://localhost:3001`.

```bash
cd backend
npm install
npm run dev
```

**Note**: The frontend's CORS policy is configured to accept requests from `http://localhost:3001`.

## Adding Content

**Projects** — add a Markdown file to `content/projects/`:
```markdown
---
title: "My Project"
description: "What it does."
tags: ["React", "TypeScript"]
github: "https://github.com/..."
liveUrl: "https://..."
---
```

**Gallery images** — edit `src/routes/gallery.tsx` and add entries to the `GALLERY_ITEMS` array. External images require the domain to be added to `netlify.toml` under `[images] remote_images`.
