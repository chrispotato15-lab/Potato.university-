# Potato University Website

Production-ready static site for Potato University (entertainment-only, non-accredited content).

## Quick Start

1. Install dependencies:
   - `npm install`
2. Run locally:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Preview production build:
   - `npm run preview`

## Publish Options

### Vercel

- Import this repository into Vercel.
- Build command: `npm run build`
- Output directory: `dist`
- Deploy.

### Netlify

- Import this repository into Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml` is already included.

### GitHub Pages

Because the app uses hash routing (`#/...`), it works well on GitHub Pages.

1. Run `npm run build`
2. Upload contents of `dist/` to your Pages branch (or configure an action to publish `dist`)
3. Set your custom domain if needed

## Before Going Live

- Replace demo domain URLs in:
  - `index.html` (`canonical`)
  - `robots.txt`
  - `sitemap.xml`
- Confirm legal text and disclaimer wording with your final policy.
- Connect real services for:
  - payment gateway on donations
  - learner portal authentication

## Project Structure

- `index.html` - app shell
- `app.js` - routing and page logic
- `styles.css` - responsive styles
- `assets/revision-booklet.pdf` - downloadable revision booklet
