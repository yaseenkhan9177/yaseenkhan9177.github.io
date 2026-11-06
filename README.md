# Muhammad Yaseen — Personal Portfolio

A responsive, static personal portfolio with a futuristic AI-inspired visual system. No build tools or package installation are required.

## Files

- `index.html` — main portfolio website
- `styles.css` — responsive layout, animations, visual styling, and light theme
- `script.js` — interactive behavior, project filters, overview modals, theme toggle, command palette, and particle canvas
- `resume.html` — printable résumé page; use **Print / Save as PDF** in the browser

## Preview locally

Open `index.html` in a modern browser. For a local web server, run this from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize before publishing

Open `script.js` and update the `PORTFOLIO_CONFIG` object near the top:

```js
const PORTFOLIO_CONFIG = {
  name: 'Muhammad Yaseen',
  email: 'your-professional-email@example.com',
  github: 'https://github.com/yaseenkhan9177',
  linkedin: 'https://www.linkedin.com/in/your-profile/',
  location: 'Swat, Pakistan'
};
```

Add your professional email and LinkedIn URL if you want to display them. The current site intentionally does not invent contact details. The contact CTA currently opens a draft in the visitor's email application; it does not submit data to a server.

Also review the project statuses, summaries, site links, skills, education wording, and résumé content before sharing the portfolio with recruiters. Update any link or status that has changed. The project descriptions are a starting point, not a substitute for your final review.

## Deploy to cPanel

1. Open cPanel and go to **File Manager**.
2. Open the document root for the domain/subdomain you want to use (often `public_html` for the main domain).
3. Upload the site files and extract them there. Ensure `index.html`, `styles.css`, `script.js`, and `resume.html` are at that document root, not nested in an extra folder.
4. Open the domain over HTTPS and test navigation, project links, theme toggle, filters, mobile menu, résumé print view, and contact behavior.

No database, PHP runtime, framework install, or build step is needed to serve this portfolio. Google Fonts are loaded from a CDN; system fallback fonts are used if the service is unavailable. The particle background is canvas-based and automatically turns off for reduced-motion preferences.
"# yaseenkhan9177.github.io" 
