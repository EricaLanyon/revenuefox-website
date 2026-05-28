# Revenue Fox & Co. — Visual Modernization (Claude Code handoff)

These are **visual-only** updates to the existing site. No layout, structure, copy, or
markup logic changes. Apply them to:

- `assets/css/styles.css` (almost everything)
- `assets/js/main.js` (two small additions: scroll-reveal + header-on-scroll)
- 2 inline styles in `services.html` / `about.html` (one optional color tweak)

Each section below gives the **selector to find** and the **final CSS**. Where a property
already exists in that rule, change its value; otherwise add the new lines.

---

## 1. Typography

**`h1` rule** (currently `font-size: clamp(40px, 6vw, 72px);` and inherits
`line-height: 1.2; font-weight: 700` from the shared `h1,h2,h3,h4` block):
```css
h1 {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-weight: 600;          /* down from 700 — Sora reads cleaner at 600 large */
  text-wrap: balance;
}
```

**`h2` rule:**
```css
h2 {
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.015em;
  text-wrap: balance;
}
```

**Base paragraph** — add to the existing `p { margin-bottom: 1em; }` rule:
```css
p { margin-bottom: 1em; text-wrap: pretty; }
```

**`.label`** (currently `font-size: 12px; font-weight: 700; letter-spacing: 0.12em;`):
```css
.label {
  font-size: 13px;
  font-weight: 600;          /* down from 700 */
  letter-spacing: 0.06em;    /* down from 0.12em — less dated */
  text-transform: uppercase;
  color: var(--bold-green);
  display: block;
}
```

**`.editorial-quote-text`** — retire the Georgia italic for airy Sora:
```css
.editorial-quote-text {
  font-family: var(--font-heading);   /* was Georgia, 'Times New Roman', serif */
  font-size: clamp(22px, 3vw, 42px);
  font-style: normal;                  /* was italic */
  font-weight: 400;
  letter-spacing: -0.015em;
  color: var(--midnight-ink);
  line-height: 1.25;                   /* was 1.4 */
  max-width: 860px;
  padding-left: 28px;
  border-left: 3px solid var(--fox-rust);
}
```

---

## 2. Spacing & whitespace

**`:root`** — open up the vertical rhythm:
```css
--section-pad-y: clamp(64px, 8vw, 112px);   /* was clamp(44px, 5.5vw, 68px) */
```

**`.hero-light`** — give the homepage hero more room (add to the existing rule):
```css
.hero-light { padding-block: clamp(120px, 14vw, 180px) clamp(96px, 11vw, 132px); }
```

**Grid gaps:**
```css
.symptom-grid          { gap: 22px; }   /* was 14px */
.services-preview-grid { gap: 32px; }   /* was 22px */
.offering-grid         { gap: 32px; }   /* was 24px */
.differentiators-grid  { gap: 24px; }   /* was 18px */
```

**Comfortable measure** for long body copy (add to these rules):
```css
.about-copy p           { max-width: 64ch; }
.who-its-for-inner > p  { max-width: 64ch; }
```

---

## 3. Colors & gradients (depth, not decoration)

**`.bg-midnight`** and **`.bg-green`** — subtle gradients replace flat fills:
```css
.bg-midnight { background: linear-gradient(160deg, #15294a 0%, #0c1b30 100%); }
.bg-green    { background: linear-gradient(160deg, #468a5b 0%, #356b43 100%); }
```

**Dark interior hero** — `services.html` and `about.html` set this **inline**:
`<section class="hero hero-sm" style="background-color: #0A182A;">`.
Either change that inline value, or (cleaner) **delete the inline style** and add this rule
to `styles.css`:
```css
.hero-sm { background: linear-gradient(160deg, #122742 0%, #0a182a 100%); }
```
(`contact.html`'s hero-sm has no inline bg, so the CSS rule will style it too.)

**`.btn-primary:hover`** — brighter, more energetic rust; reserve dark rust for press:
```css
.btn-primary:hover,
.btn-primary:focus-visible { background-color: #D8642F; border-color: #D8642F; }
.btn-primary:active        { background-color: var(--fox-rust-dark); border-color: var(--fox-rust-dark); }
```

**`.proof-stats` / `.proof-stat`** — remove the dated 1px divider grid:
```css
.proof-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;                 /* was 1px */
  background: transparent;   /* was var(--pale-stone) */
  border: none;              /* was var(--border) */
  margin-bottom: 24px;
}
.proof-stat {
  background-color: var(--white);
  padding: 36px 24px;
  text-align: center;
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 2px rgba(16,35,63,0.05), 0 10px 24px rgba(16,35,63,0.06);
}
```

---

## 4. Buttons

**`.btn`** base:
```css
.btn {
  /* ...existing... */
  border-radius: 10px;       /* was var(--radius-sm) / 4px */
  letter-spacing: 0.01em;
}
```

**`.btn-primary`** — drop the same-color border, add a tinted shadow:
```css
.btn-primary {
  background-color: var(--fox-rust);
  color: var(--white);
  border: 2px solid transparent;          /* was 2px solid var(--fox-rust) */
  box-shadow: 0 2px 10px rgba(200,90,46,0.28);
}
.btn-primary:hover,
.btn-primary:focus-visible { box-shadow: 0 6px 18px rgba(200,90,46,0.34); }
```

---

## 5. Hover & micro-animations

**`:root`** — upgrade the global easing:
```css
--ease: 220ms cubic-bezier(0.2, 0.8, 0.2, 1);   /* was 180ms ease */
```

**Card hover** (`.problem-card:hover`, `.service-preview-card:hover`) — deeper lift:
```css
.service-preview-card:hover,
.problem-card:hover {
  transform: translateY(-4px);   /* was -2px */
  box-shadow: 0 14px 32px rgba(16,35,63,0.12), 0 2px 8px rgba(16,35,63,0.06);
}
```

**Button press feel** — add:
```css
.btn:hover  { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
```

**Growing-underline text link** (`.services-flex-note a`) replaces instant color swap:
```css
.services-flex-note a {
  color: var(--midnight-ink);
  font-weight: 600;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1.5px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  padding-bottom: 1px;
  transition: background-size 220ms cubic-bezier(0.2,0.8,0.2,1), color 180ms ease;
}
.services-flex-note a:hover { color: var(--fox-rust); background-size: 100% 1.5px; }
```

**Scroll-reveal** — add this CSS, then the JS in section 7:
```css
.reveal { opacity: 0; transform: translateY(18px); }
.reveal.is-in {
  opacity: 1;
  transform: none;
  transition: opacity 0.6s cubic-bezier(0.2,0.8,0.2,1), transform 0.6s cubic-bezier(0.2,0.8,0.2,1);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

---

## 6. Small dated-detail fixes

**Borderless cards + richer shadow:**
```css
.service-preview-card,
.offering-card,
.problem-card,
.differentiator-card,
.engagement-card,
.symptom-card {
  border-color: transparent;
  box-shadow: 0 1px 2px rgba(16,35,63,0.05), 0 8px 24px rgba(16,35,63,0.07);
}
```

**Stat numbers don't jitter during count-up:**
```css
.proof-stat-value { font-variant-numeric: tabular-nums; }
```

**Cleaner focus ring** (`.btn:focus-visible`):
```css
.btn:focus-visible { outline: 2px solid var(--fox-rust); outline-offset: 2px; }  /* was 3px / 3px */
```

**Header gains a translucent blurred state on scroll** — add CSS, JS in section 7:
```css
.site-header.is-scrolled {
  background: rgba(13, 27, 48, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(8,16,30,0.28);
}
```

---

## 7. JavaScript — add to `assets/js/main.js`

Append these two IIFEs (they use the real site's **window scroll**):

```js
/* Scroll-reveal on section entry */
(function initScrollReveal() {
  if (!window.IntersectionObserver) return;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('main > section');
  if (prefersReduced) { targets.forEach(function (s) { s.classList.add('reveal', 'is-in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (s) { s.classList.add('reveal'); io.observe(s); });
}());

/* Translucent blurred header once scrolled */
(function initHeaderScroll() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function update() { header.classList.toggle('is-scrolled', window.scrollY > 12); }
  update();
  window.addEventListener('scroll', update, { passive: true });
}());
```

---

## Notes for the implementer
- These changes are additive/value-swaps; nothing alters HTML structure or copy.
- The hero photo, fox watermark, brand colors, and font choices are unchanged.
- If you want to gate the whole refresh behind one switch while testing, wrap the CSS
  changes under a `body.v2 { ... }` class and add `class="v2"` to `<body>` — but they're
  safe to ship directly.
- Test focus states with keyboard `Tab` and confirm `prefers-reduced-motion` disables the
  reveal animation.
