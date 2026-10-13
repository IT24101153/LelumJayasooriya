# Lelum Jayasooriya — Portfolio

Source for [lelumjayasooriya.com](https://lelumjayasooriya.com), a single-page portfolio built with React and Vite.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 8)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build the production site into `dist/`    |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Check the code with ESLint                |

## Environment variables

| Variable             | Purpose                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `VITE_WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) access key for the contact form. Without it, the form shows a "not connected yet" message instead of sending. |

Set the same variable in your hosting provider's build settings, because Vite reads it at build time.

## Editing content

Almost all text and data lives in two files, so most updates need no component changes:

- `src/data/siteContent.js` — projects, GitHub repositories, skills, navigation, and section copy
- `src/data/siteConfig.js` — name, page title, and contact details

Two things live elsewhere:

- **SEO tags** (description, Open Graph, Twitter card, JSON-LD) are written statically in `index.html` so link-preview crawlers can read them without running JavaScript. If you change your name, title, or contact details, update them there too.
- **Images** go in `public/uploads/images/`. Use WebP for screenshots. The share image is `og-image.jpg` (1200×630).

## Project structure

```
index.html            Static head: SEO tags, fonts
public/               Files copied as-is (404 page, robots.txt, sitemap, images)
src/
  App.jsx             Page switching and scroll handling
  components/         Reusable pieces (navbar, project grid, modal, contact form)
  sections/           Page sections and the two project pages
  hooks/              Loader, scroll-reveal, and navigation effects
  data/               Site content and config
  styles/global.css   All styles
```

## Routing

The project pages use hash routes (`/#/web-projects`, `/#/applications`), so the site works on any static host without rewrite rules.
