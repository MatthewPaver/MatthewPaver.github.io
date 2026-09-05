---
name: Matthew Paver Portfolio
description: A media-led engineering portfolio with an editorial evidence catalogue.
colors:
  brand-navy: "#1c3762"
  brand-cyan: "#00adf1"
  brand-blue: "#006b95"
  brand-blue-deep: "#16456b"
  brand-blue-soft: "#dceff8"
  support-blue: "#245a7c"
  focus-blue: "#006b95"
  cool-canvas: "#f3f6fa"
  paper: "#ffffff"
  paper-strong: "#ffffff"
  ink: "#152b47"
  muted-ink: "#506278"
  rule: "#c7d3df"
  rule-strong: "#8194a8"
  night-canvas: "#0b1626"
  night-paper: "#102137"
  night-ink: "#f0f6fc"
  screening-surface: "#102a43"
  screening-ink: "#f7fbfe"
  screening-muted: "#bed0e1"
  screening-rule: "#44627c"
  screening-selected: "#5ed0ff"
  screening-focus: "#9edfff"
typography:
  display:
    fontFamily: "Newsreader Local, Charter, Georgia, serif"
    fontSize: "clamp(3.25rem, 6.7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader Local, Charter, Georgia, serif"
    fontSize: "clamp(2.15rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope Local, Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Manrope Local, Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 760
    lineHeight: 1.45
  landing-display:
    fontFamily: "Manrope Local, Avenir Next, sans-serif"
    fontSize: "clamp(2.5rem, 3.55vw, 3.6rem)"
    fontWeight: 760
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  landing-headline:
    fontFamily: "Manrope Local, Avenir Next, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  landing-title:
    fontFamily: "Manrope Local, Avenir Next, sans-serif"
    fontSize: "clamp(1.4rem, 2vw, 2rem)"
    fontWeight: 780
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  compact-case-title:
    fontFamily: "Manrope Local, Avenir Next, sans-serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.5rem)"
    fontWeight: 780
  landing-reading:
    fontSize: ".95rem"
    lineHeight: 1.65
  method-title:
    fontSize: "1.18rem"
    fontWeight: 700
    lineHeight: 1.4
  method-reading:
    fontSize: ".92rem"
    lineHeight: 1.7
  evidence-caption:
    fontSize: ".85rem"
    lineHeight: 1.7
  compact-mobile-tab:
    fontSize: ".82rem"
    fontWeight: 700
rounded:
  field: "7px"
  control: "7px"
  node: "4px"
  surface: "5px"
  landing-control: "7px"
  landing-node: "10px"
  landing-media: "14px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  media: "24px"
  lg: "28px"
  landing-gutter: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.brand-blue-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  evidence-card:
    backgroundColor: "{colors.cool-canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  contract-node:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.node}"
    padding: "21px"
  landing-button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.landing-control}"
    padding: "10px 16px"
    height: "46px"
  hero-button-primary:
    backgroundColor: "{colors.brand-cyan}"
    textColor: "{colors.brand-navy}"
    rounded: "{rounded.landing-control}"
    padding: "10px 16px"
    height: "46px"
  landing-button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.landing-control}"
    padding: "10px 16px"
    height: "46px"
  landing-brand-mark:
    backgroundColor: "{colors.brand-navy}"
    textColor: "{colors.paper-strong}"
    rounded: "{rounded.landing-control}"
    size: "34px"
  screening-room:
    backgroundColor: "{colors.screening-surface}"
    textColor: "{colors.screening-ink}"
    rounded: "{rounded.landing-media}"
  screening-tab:
    backgroundColor: "transparent"
    textColor: "{colors.screening-muted}"
    padding: "12px 8px"
    height: "48px"
  catalogue-search:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    height: "46px"
  catalogue-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  landing-contract-node:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.landing-node}"
    padding: "21px"
---

# Design System: Matthew Paver Portfolio

## Overview

**Creative North Star: "The Evidence Catalogue"**

The portfolio presents a carefully edited body of engineering work whose claims can withstand inspection. Navy and cyan establish the landing area; a cool-white catalogue, real interface captures and brief statements of purpose, evidence and limits support inspection.

The landing variant pairs a personal introduction and CV with the existing screening room, then offers three compact case tabs. One complete case is visible at a time; without enhancement all three remain readable. Manrope takes the display role here, while the catalogue and previews retain Newsreader's editorial hierarchy. Existing hero motion and user-initiated videos remain; a short case transition supports navigation.

The user requested colours from Projecting Success on 5 September 2026. Its live site supplied the navy/cyan relationship, not a licence to present this as that company's site or reuse its endorsements. The existing content, navigation, real media and personal identity are retained. `store/landing.css` owns the landing; `store/styles.css` remains the shared catalogue/preview foundation.

**Key Characteristics:**

- A media-led Manrope landing and a Newsreader-led editorial catalogue.
- Navy identity, cyan emphasis and accessible blue actions against cool neutral surfaces.
- Real product captures framed as working software, not generated artwork.
- Softened media frames on the landing; compact rectilinear catalogue controls and cards.
- Honest boundaries and accountable human decisions beside every claim.
- User-controlled playback, pausable background motion and static reduced-motion fallbacks.

## Colors

Reference: https://projectingsuccess.co.uk/, inspected 5 September 2026. Observed navy `#1c3762`, cyan `#00adf1` and action blue `#028bc1`. The portfolio uses darker `#006b95` for small text and links. The hero is one deliberate navy region in light mode; all subsequent reading sections stay light. Dark mode uses a coherent midnight-blue foundation. The media frame stays dark in either theme.

### Primary

- **Brand Navy:** Owns the landing area and MP mark. The mark stays white on navy in both themes.
- **Brand Cyan:** The primary hero action has dark navy text; pale cyan carries emphasis and active paths on navy.
- **Brand Blue / Deep Blue:** Readable links, control feedback and small accent copy on light surfaces.
- **Soft Blue:** Groups decision conditions; text labels carry their meaning, not colour alone.

### Secondary

- **Support Blue:** A tonal counterpart for provenance and system status.
- **Focus Blue:** Dark blue on light backgrounds; pale cyan on dark backgrounds.

### Neutral

- **Cool Canvas:** The main reading-page field.
- **Paper and Strong Paper:** Nested reading and card surfaces.
- **Ink and Muted Ink:** Primary and supporting copy.
- **Rule and Strong Rule:** Section structure, card boundaries and diagram paths.
- **Night Canvas, Night Paper and Night Ink:** The corresponding dark-mode foundation.
- **Screening Surface, Ink, Muted and Rule:** Fixed dark media chrome, readable captions and restrained dividers; these do not invert with the page theme.
- **Screening Selected and Focus:** Pale cyan selection and keyboard feedback inside the dark media frame.

**The One Signal Rule.** Cyan and blue identify meaningful actions and selections. Do not add competing accent families to portfolio chrome; colours inside real product captures belong to those products.

The shared accent becomes lighter in dark mode. The MP mark deliberately retains navy and white in both themes. Body text and action labels must pass 4.5:1 contrast; the reference company's brighter button colour is not copied with white text.

## Typography

**Landing Display Font:** Manrope Local (with Avenir Next and sans-serif fallbacks)

**Catalogue / Preview Display Font:** Newsreader Local (with Charter, Georgia and serif fallbacks)

**Body Font:** Manrope Local (with Avenir Next, Segoe UI, Helvetica, Arial and sans-serif fallbacks)

**Character:** The landing uses bold Manrope to make the personal introduction and project names direct and compact. Newsreader preserves the catalogue and preview pages' authored editorial voice. Shared body copy, navigation, controls and technical detail remain Manrope. Both font families are existing locally hosted assets; the landing preloads Manrope.

### Hierarchy

- **Landing Display:** Two-line Manrope hero with a pale-cyan second line on navy. The frontmatter records the desktop role; at 980px and below it uses `clamp(2.6rem, 6vw, 3.6rem)`, and at 640px and below `clamp(2rem, 7.7vw, 3rem)`.
- **Landing Headline / Title:** Manrope section and project headings, using the scoped frontmatter roles. Mobile project titles resolve to 1.65rem.
- **Display / Headline:** Newsreader defaults for the catalogue and preview family; the catalogue's route-specific heading and shared mobile rules may further constrain them.
- **Title:** Newsreader project and capability names outside the landing, scaled to their shelf hierarchy.
- **Body:** Neutral sans-serif for explanations, generally held to roughly 48–66 characters per line.
- **Label:** Compact, high-weight sans-serif for audiences, states and diagram roles; sentence case is preferred over generic uppercase eyebrows.

**The Claim and Evidence Rule.** In the catalogue and previews, serif type makes the claim and sans-serif type explains, qualifies and proves it. The media-led landing deliberately uses Manrope for both roles; preserve that scoped distinction.

## Layout

The catalogue and previews retain the core shell capped at 1220px with 40px total viewport breathing room, reducing to 28px on small screens. The landing instead caps its shell at 1320px with 64px total breathing room; at 640px and below this becomes 32px total.

The landing desktop hero keeps its .86fr / 1.32fr split. Selected work uses an underlined three-button tablist above one image-and-copy panel (1.15fr / 1fr, 28–64px gap). Below 760px the panel stacks image above copy. Full interface captures use contain sizing in a 1.3 desktop or 1.4 mobile frame. Tabs are at least 48px tall. The full catalogue stays a separate route with its existing filters, search and templates.

The Method uses an ordered list of six checks: three columns read left to right, followed by the second row. Below 720px it becomes one vertical sequence. Its landing introduction is a separate two-column heading-and-explanation layout that stacks below 980px. Each scenario links its input evidence and a concrete result, and identifies local-only extensions. Controls remain at least 44px high, anchors account for the sticky header, and page-level horizontal overflow is prohibited.

Major sections use generous responsive vertical rhythm; evidence inside cards remains compact. The homepage curates; the searchable `/work/` route carries the full public catalogue.

**The Curated First Rule.** The landing makes three selected applications understandable without requiring a visit to the full catalogue; the catalogue remains directly available for visitors who already know what they need.

## Elevation & Depth

The system is flat by default. Borders, tonal shifts and inset screenshot crops create most separation. The landing screening room has a diffuse shadow (`0 26px 64px rgb(16 42 67 / 19%)`), while the Decision Contract retains its blue-grey workbench shadow (`0 24px 52px rgb(19 49 77 / 12%)`). The video play control has a small local shadow. Landing project containers do not lift or cast hover shadows; only their image moves. Catalogue and preview surfaces retain their existing restrained border and screenshot-depth treatments.

**The Evidence Above Chrome Rule.** Depth may focus attention on a real interface or causal workflow, never on ornamental containers.

## Shapes

Catalogue and preview surfaces preserve compact geometry: 2px on catalogue search and filters, 3px on shared buttons, and 5px on cards and preview media. The shared diagram node base remains 4px. The landing is a scoped softer variant: 7px action buttons and MP mark, 14px media/workbench frames and 10px Decision Contract nodes. Its selected cards have no enclosing rounded container; only the media is framed.

One-pixel rules remain visible and structural. Circles are limited to evidence markers and native status-like signals; large rounded pills and soft dashboard bubbles do not belong in this system.

## Components

### Buttons

- **Shape:** Compact rectangular controls with a 46px minimum height; 3px corners in the shared catalogue/preview style and 7px in the landing variant.
- **Primary:** Ink surface, paper text and strong Manrope label weight.
- **Hover / Focus:** A two-pixel lift and deep accent fill on hover; a three-pixel solid focus outline with a three-pixel offset.
- **Ghost:** Transparent at rest, strong paper on hover, with the same border and geometry as the primary action.

### Chips

- **Style:** Scenario and catalogue filter controls use compact bordered rectangles rather than pills. Screening-room selectors are equal-width text buttons above the media, not bordered chips.
- **State:** Selection is explicit through `aria-pressed`, a filled surface and a clear foreground change.

### Cards / Containers

- **Catalogue / Preview:** Paper surfaces with 5px corners, one-pixel structural rules and compact copy padding (typically 18–28px). The retained shared evidence-card primitive uses canvas.
- **Catalogue First Use:** The `/work/` card presents the project name, browser/local/case-study requirement, plain-language use, one observable example and a practical boundary, then a direct first action and case link. Native `details` holds optional first steps without JavaScript. `store/work/catalogue.css` scopes the two-column desktop and one-column mobile layout. Real screenshots use `object-fit: contain` inside a 16:10 frame; the finished experiment uses the same card width. Sample data, historical exports and local-only extensions are labelled beside actions.
- **Catalogue Covers:** `store/work/covers.css` gives all seven projects a reserved 16:10 stage. Genuine screenshots remain unmodified, contained and at their natural aspect ratio; the frame does not invent browser chrome or crop away evidence. QuickSupply, Winchester and ProjectLens use separately layered, self-hosted stock photography for education, housing and construction context. The other four use quiet, app-derived solid colours so abstract tools are not obscured by unrelated photos. Full-size case images and landing captures are unchanged. `store/assets/photography/sources.json` records attribution and distinguishes stock context from client work, listings and dataset evidence. The visible credits accordion was removed at Matthew's request. The cover system adds no JavaScript, animation or dependency; it stays visible with scripts or photos unavailable.
- **Project Details:** `store/preview.css` owns a top-aligned, two-column hero with a 2.3–3.4rem Newsreader title. At 980px it stacks. Images retain their intrinsic proportions and expose a full-size link; video has its own 16:10 contained frame. Access and publication boundaries precede the case narrative. The story covers the problem, design choice, observed output and learning; implementation details remain optional. Generated and query routes share this presentation and the same `previews.json` content.
- **Landing Selected Work:** Borderless case copy paired with a 14px media frame. The enhanced wide view uses a single sticky stage; simple view keeps the inline cards. Each story moves from a plain-language question to the build and one thing to inspect. Evidence rows keep the reproduced result beside its boundary.
- **Landing Media:** Use real captures, never invented dashboard illustrations. Case panels use object-fit: contain and preserve complete screenshots. Keep the existing hero recording and its deliberate play action.

### Inputs / Fields

- **Style:** Catalogue search uses Strong Paper, a one-pixel strong rule, 2px corner, 10px 12px padding and a 46px minimum height.
- **Focus:** The shared solid focus-blue outline; no glow.

### Navigation

The sticky navigation uses high-weight Manrope, generous hit areas and quiet muted links. The active in-page section is identified with ink text and a short brand-blue underline. The landing shows All projects, Method, About and CV at every width, with compact spacing and 44px-high targets on phones. All projects is a direct `/work/` link, not a jump to the three selected homepage cases; the hero's Explore the work action still introduces those cases. The catalogue keeps Home, All work, Patterns and CV; on mobile the brand provides Home so Patterns remains available. Detail pages provide an explicit All work return that restores the visitor's catalogue selection. The landing and catalogue share the white-on-navy, 7px-radius MP mark in both themes. Buttons, search and catalogue selects share the 7px control radius.

Catalogue grouping is action-first: All, Try in browser, Run locally, Watch or read, and Reuse a pattern. Subject is secondary. At 640px and below, a native Explore selector replaces the five-button row and sits beside Subject; both desktop and mobile controls reflect the same state across resize. Search includes both the seven projects and three patterns. Mode, subject and search live in the URL and survive refresh, browser Back and the case return link. Clear filters and the Patterns navigation offer escape routes from empty combinations. With JavaScript unavailable, all items and their first steps remain visible.

On a JavaScript-enabled load, the hidden filter controls reserve their actual geometry until the catalogue module is ready, so revealing them does not move the project covers. The catalogue preloads its existing self-hosted display and body fonts.

### Project Screening Room

The landing hero now offers QuickSupply, ProjectLens and ML Lakehouse previews. QuickSupply is an actual recorded walkthrough; the other two are real still captures with case links. The selectors expose `aria-pressed` and support left/right arrow keys. A selection change pauses the video and reveals the new panel with a short 360ms transition; reselecting the active project does nothing.

Video uses `preload="none"`, a real poster and click-to-play enhancement. Native controls become available for playback; without JavaScript they are present from the start. The recording pauses when switched away, offscreen or in a hidden document, and never resumes automatically. A text walkthrough, download link, retry state and case-study fallback remain available. Playing video uses `object-fit: contain` so the recording is not cropped.

The former four-stage hero evidence story is no longer mounted on the landing. Its leftover shared CSS/JavaScript is not the current landing component or a system-wide interaction requirement.

### Landing Motion

The hero source-to-output signal runs a slow 18-second linear loop only when the hero is visible, the document is visible, reduced motion is not requested and the visitor has not paused it. The visible pause/resume control changes its pressed state and label. Without JavaScript the path stays still.

An IntersectionObserver reveals each target once: media enters with an 850ms clipped 18px movement, while section copy and capability links use a 600ms 14px movement. Content is visible by default; the effects do not gate access. Reduced motion skips these effects, disables transitions and cancels running page animations. User-initiated video remains available. Motion values and breakpoint extensions are recorded in `.impeccable/design.json`.

Selected work uses compact case tabs, owned by store/work-story.css and store/work-story.js. A user selection transitions the source panel with 240ms opacity and 8px movement. Reduced motion skips and cancels that animation. Tabs support ArrowLeft, ArrowRight, Home and End; their selected state matches the labelled tabpanel. Project anchor IDs and browser Back restore the matching case. The controls are built only during enhancement: failed JavaScript leaves all source content available, and print CSS shows every case. No sticky clones, scroll tracking or view-mode switch remain.

### How I Work

Three flat, separated rows pair a specific engineering choice with a short explanation and a direct link to case evidence. They cover source tracing in ProjectLens, explanation checks in the local PolicyLens extension and a simple forecast baseline in the local lakehouse extension. On desktop, headings and explanations use a .9fr / 1.1fr layout; below 760px each row stacks. The existing #contract anchor remains. There is no scenario switcher or animated diagram, and the text keeps public/local limitations explicit.

## Do's and Don'ts

### Do:

- **Do** lead with a real application surface and a plain-language user problem.
- **Do** pair every reproduced result with its honest boundary.
- **Do** use navy for identity and cyan/blue for meaningful actions, workflow and selection.
- **Do** preserve dark mode, visible keyboard focus, reduced motion and touch-safe controls.
- **Do** keep private work out of public catalogues and previews.
- **Do** preserve the Manrope landing and Newsreader catalogue/preview variants instead of applying either globally.
- **Do** keep video user-initiated and background motion pausable, with static and no-JavaScript fallbacks.

### Don't:

- **Don't** replace screenshots with generated product art or generic gradient thumbnails.
- **Don't** add vanity counters, floating blobs, unpausable loops, marquees or cursor spectacle.
- **Don't** repeat the same project proof across several homepage sections.
- **Don't** use rounded-pill components as a default visual language.
- **Don't** claim model or product impact that the linked evidence cannot reproduce.
