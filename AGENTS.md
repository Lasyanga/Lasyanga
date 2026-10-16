# AGENTS.md — Lasyanga portfolio site

Single-page personal portfolio for Herminigildo Jr A. Quiano ("Lasyanga"): one hand-written
`index.html` (473 lines) styled with a vendored copy of W3.CSS plus a small `custom.css`, and a few
lines of jQuery. There is no build system, package manager, test suite, or CI — the repo *is* the
deployed artifact. Live at https://lasyanga.github.io/Lasyanga/ (GitHub Pages, repo root).

## Layout

    index.html        the whole site: sidebar nav, home, about, experience, skills, projects,
                      contact, footer
    css/custom.css    the only site-authored stylesheet: the disabled timeline rules, an anchor
                      offset media query, .exp-list, .skill-tag, and an a[href^="mailto:"] wrap rule
    css/w3*.css       vendored W3.CSS — third-party, do not hand-edit
    js/custom.js      the only site-authored JS (w3_open / w3_close sidebar toggle)
    js/w3.js, js/jquery-3.6.0.min.js    vendored third-party — do not hand-edit
    img/              all images, referenced as relative img/<name>
    my-cv/            the CV, served at my-cv/Herminigildo-Quiano-CV.pdf and linked by the hero
                      "Download CV" button. The filename must stay exactly that, with no spaces —
                      re-exporting from Word with the original name silently 404s the link.
    sitemap.xml, googlebcd536885ba7d8f7.html    static SEO / search-console files, hand-maintained
    vid/, img/ezgif.com-gif-maker.gif    unreferenced leftovers (image-placeholder.jpg appears only
                                          inside the commented-out project slots)

## Preview & verify

Nothing to install, build, or run from the repo. Serve the root statically and check in a browser:

    python -m http.server 8000     # then open http://localhost:8000/

There is no test runner, linter, or formatter configured (no package.json, Makefile, .github/,
or .editorconfig). The check for a change is loading the page. `file://` works, but a local server
matches GitHub Pages' path handling more closely; the boxicons stylesheet comes from unpkg and needs
network access.

## Conventions

- `index.html` is tab-indented. Long elements break one attribute per line (the sidebar, the project
  cards); short ones stay inline (the top bar button, `w3-container` divs). Each content section is
  wrapped in `<!-- Name section -->` … `<!-- end Name section -->` comments, with inconsistent naming
  (`<!-- end Skills -->`, `<!-- end Contact section-->`). Match the local shape; don't reformat.
- Navigation is anchor-based: sidebar links point at `#home #about #experience #skills #works
  #contact`, targets are `<span id="about"></span>`-style anchors or the section div's own id.
  Adding a nav entry needs both halves.
- The sidebar carries `w3-collapse`, which is what hides it below 993px. Removing or renaming that
  class makes the 250px sidebar permanently overlay the content on phones.
- Skills are `<span class="skill-tag">` chips grouped under an `<h4>` per category, laid out in two
  `w3-col l6 m6` halves. They replaced the old percentage bars; don't reintroduce self-assessed
  numbers, they misstate seniority to anyone who reads the CV.
- Icon-only links carry `aria-label` on the `<a>` and `aria-hidden="true"` on the `<i>`. Any link
  opening a new tab needs `rel="noopener noreferrer"`.
- Project cards are a 4-up grid (`w3-col l3 m3 w3-margin-bottom`): title in a `w3-display-topleft`
  div with `background-color:#004740`, image with `loading="lazy"` and
  `style="width: 100%; height: 200px;"`. Copy an existing card instead of inventing classes.
- Site styles go in `css/custom.css`, site behaviour in `js/custom.js`. Everything in `css/w3*.css`
  and `js/w3.js` / `js/jquery-3.6.0.min.js` is upstream vendor code.
- Commit messages are short, sentence case, descriptive, with no prefixes or trailers —
  "add lazy loading", "fix link", "Update README.md".
- Profile links are duplicated in `index.html` and `README.md` (portfolio URL, GitHub, Facebook);
  changing one means changing both.

## Pitfalls

(line numbers current as of this file's writing)

- `css/w3.css` is tracked but never linked; the page loads `w3pro.css`, `w3colors.css`, and
  `w3-theme-dark-grey.css`. Don't add a `w3.css` link or delete the file without checking first.
- The Education section is commented out in two places — its nav link (index.html:62-65) and its body
  (index.html:362-418). Re-enabling it needs both, and there is no live `#educ` target today.
- `w3-opacit-off` (index.html:28) is still a misspelling of `w3-opacity-off`. It is inert but
  harmless: `w3-opacity-off` resolves to `opacity:1`, already the default, so fixing it changes
  nothing visually. Leave it alone unless the sidebar styling is being reworked anyway.
- The hero and Contact each link GitHub and Facebook only. There is deliberately no LinkedIn —
  it was removed from both the site and the CV, and a link checker will not flag its absence.
- `.w3-top` is `position:fixed; width:100%` with no `left`, so it falls back to its static position
  inside `.w3-main` (`margin-left:250px`) and renders 250px past the right edge at >=993px.
  `html{overflow-x:hidden}` hides the overflow, so this is cosmetic — but don't be surprised by it.
- The email address, phone number, and role wording are duplicated between `index.html` and
  `my-cv/`. Changing the role target on one without the other leaves them contradicting each other.
- Images must stay under `img/` and be referenced relatively; absolute or `/`-rooted paths break on
  GitHub Pages project-site hosting.
- `.gitignore` excludes only `.log` and `.vscode`. There is no ignore rule for build output because
  no build exists.

## Deployment

GitHub Pages serves the site from the repo root — no workflow, no `gh-pages` branch (branches are
`main` and `new_feature`). **The Pages source branch is confirmed to be `main`**, so committing to
`new_feature` alone publishes nothing. Merge or commit to `main` to make a change live, and confirm
under Settings → Pages before assuming a push went out.
