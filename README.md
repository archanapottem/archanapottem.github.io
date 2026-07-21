# Archana Pottem — Portfolio Website

A modern, fully responsive personal/academic portfolio site built with plain HTML, CSS, and JavaScript (no build tools or frameworks required).

## Files

- `index.html` — page structure and content
- `style.css` — all styling (design tokens, layout, responsive rules)
- `script.js` — navigation, scroll effects, and the expandable workshop list

## Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `archana-portfolio`).
2. Upload `index.html`, `style.css`, and `script.js` to the root of the repository (or push them via git).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. After a minute, your site will be live at:
   `https://<your-username>.github.io/<repository-name>/`

### If you want it at `https://<your-username>.github.io/` directly
Name the repository `<your-username>.github.io` and it will be served from the root domain instead of a subpath.

## Customizing

- **Colors, fonts, spacing** — all defined as CSS custom properties at the top of `style.css` under `:root`.
- **Content** — edit the text directly in `index.html`; sections are clearly labeled with HTML comments (`<!-- ABOUT -->`, `<!-- PUBLICATIONS -->`, etc.).
- **Workshops list** — only the first 5 show by default; the rest are marked with class `hidden-item` and revealed via the "Show all workshops" button in `script.js`.
- **Contact details** — update the `mailto:` and `tel:` links in the Contact section.

## Notes

- No external JS dependencies — only Google Fonts are loaded from a CDN.
- Fully responsive from mobile (< 520px) up to large desktop screens.
- Respects `prefers-reduced-motion` for users who disable animations.
