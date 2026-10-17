# AGENTS.md — Lasyanga portfolio site

Single-page personal portfolio for Herminigildo Jr A. Quiano ("Lasyanga"): one hand-written
`index.html` (437 lines) styled with a vendored copy of W3.CSS plus a small `custom.css`, and a
little vanilla JS. There is no build system, package manager, test suite, or CI — the repo *is* the
deployed artifact. Live at https://lasyanga.github.io/Lasyanga/ (GitHub Pages, repo root).

## Layout

    index.html        the whole site: sidebar nav, home, about, experience, skills, personal
                      projects, contact
    css/custom.css    the only site-authored stylesheet: the disabled timeline rules, an anchor
                      offset media query, .exp-list, .skill-tag, .cta-row, .skip-link, a
                      desktop-only .w3-top rule, a #works card-image contain rule, and an
                      a[href^="mailto:"] wrap rule
    css/w3*.css       vendored W3.CSS — third-party, do not hand-edit
    js/custom.js      the only site-authored JS: w3_open / w3_close, plus a DOMContentLoaded
                      handler that auto-closes the sidebar on a nav tap below 993px and a
                      scrollspy that marks the in-view section with aria-current
    js/w3.js          vendored third-party (W3.JS) — do not hand-edit
    js/jquery-3.6.0.min.js    vendored, but no longer referenced — see Pitfalls
    img/              all images, referenced as relative img/<name>
    my-cv/            the CV, served at my-cv/Herminigildo-Quiano-CV.pdf and linked by the hero
                      "Download CV" button. The filename must stay exactly that, with no spaces —
                      re-exporting from Word with the original name silently 404s the link.
    sitemap.xml, robots.txt, googlebcd536885ba7d8f7.html    static SEO / search-console files, hand-maintained
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
  Adding a nav entry needs both halves. Label and anchor deliberately differ for the projects
  section: it reads "Personal Projects" but the id stays `#works` — the hero CTA and the
  scrollspy both target `#works`, so renaming the id means updating those too.
- The sidebar carries `w3-collapse`, which is what hides it below 993px. Removing or renaming that
  class makes the 250px sidebar permanently overlay the content on phones.
- Skills are `<span class="skill-tag">` chips grouped under an `<h4>` per category, laid out in two
  `w3-col l6 m6` halves. They replaced the old percentage bars; don't reintroduce self-assessed
  numbers, they misstate seniority to anyone who reads the CV.
- Icon-only links carry `aria-label` on the `<a>` and `aria-hidden="true"` on the `<i>`. Any link
  opening a new tab needs `rel="noopener noreferrer"`.
- The skip link is the first element inside `<body>`, ahead of the sidebar, and targets `#home`
  which carries `tabindex="-1"`. It must stay first in the DOM or it stops skipping the nav, and
  the target needs `tabindex="-1"` or activating it scrolls without moving focus.
- Project cards sit in a `w3-row-padding` grid: title in a `w3-display-topleft` div with
  `background-color:#004740`, image with `loading="lazy"` and `style="width: 100%; height: 200px;"`.
  Copy an existing card instead of inventing classes.
  **Set the column class to the card count.** The grid is `w3-col l4 m4` (3-up) because there
  are three cards; with the old `l3 m3` (4-up) a three-card row left a whole 237px column blank
  on the right. A fourth card means going back to `l3 m3`. Below 601px neither class applies and
  the cards stack full width, which is correct.
  The image box is 200px tall but its **width follows the grid column**, so the box aspect runs
  from about 0.87 to 1.4 depending on viewport — no single image aspect can match it, and
  `custom.css` therefore applies `object-fit: contain` to these images. Supply the screenshot at
  whatever aspect it naturally is; do not crop it to a fixed ratio, it will not help.
- Site styles go in `css/custom.css`, site behaviour in `js/custom.js`. Everything in `css/w3*.css`
  and `js/w3.js` is upstream vendor code. **Keep the site vanilla — the page loads no jQuery.**
- Commit messages are short, sentence case, descriptive, with no prefixes or trailers —
  "add lazy loading", "fix link", "Update README.md".
- Profile links are duplicated in `index.html` and `README.md` (portfolio URL, GitHub, Facebook);
  changing one means changing both.

## Pitfalls

(line numbers current as of this file's writing)

- `css/w3.css` is tracked but never linked; the page loads `w3pro.css`, `w3colors.css`, and
  `w3-theme-dark-grey.css`. Don't add a `w3.css` link or delete the file without checking first.
- The Education section is commented out in two places — its nav link (index.html:65-68) and its body
  (index.html:375-431). Re-enabling it needs both, and there is no live `#educ` target today.
- The hero and Contact each link GitHub and Facebook only. There is deliberately no LinkedIn —
  it was removed from both the site and the CV, and a link checker will not flag its absence.
- `.w3-top` is `position:fixed; width:100%`. `custom.css` pins it with `left:250px` and
  `width:calc(100% - 250px)` **inside a `@media (min-width:1200px)` block, and that scoping is
  load-bearing.** Below 1200px W3.CSS zeroes `.w3-main`'s inline `margin-left` with `!important`,
  but it does not override `left` — so an unscoped `left:250px` pushes the whole mobile header
  250px right, hiding the profile thumbnail and name and shifting the hamburger off the edge.
  The `w3-collapse` breakpoint and this one must stay in step.
- The email address, phone number, and role wording are duplicated between `index.html` and
  `my-cv/`. Changing the role target on one without the other leaves them contradicting each other.
- Images must stay under `img/` and be referenced relatively; absolute or `/`-rooted paths break on
  GitHub Pages project-site hosting.
- `robots.txt` is served at `/Lasyanga/robots.txt` but **crawlers never read it**. robots.txt is
  fetched from the origin root — `https://lasyanga.github.io/robots.txt` — not from a project
  subpath, and that root 404s today. The file only becomes operative on a custom domain, or if a
  `Lasyanga.github.io` user-site repo ever serves the root. Until then the path that works is
  submitting `sitemap.xml` in Google Search Console directly.
- `.gitignore` excludes only `.log` and `.vscode`. There is no ignore rule for build output because
  no build exists.
- `js/jquery-3.6.0.min.js` is still in the tree but **no script tag references it.** It existed
  solely to write the current year into the footer's `#year` span; the footer is gone. That is
  87KB of dead weight now. If a footer year is ever wanted back, use one line of vanilla JS
  rather than restoring the library — `custom.js` and `w3.js` are both jQuery-free.

## Deployment

GitHub Pages serves the site from the repo root — no workflow, no `gh-pages` branch (branches are
`main` and `new_feature`). **The Pages source branch is confirmed to be `main`**, so committing to
`new_feature` alone publishes nothing. Merge or commit to `main` to make a change live, and confirm
under Settings → Pages before assuming a push went out.
