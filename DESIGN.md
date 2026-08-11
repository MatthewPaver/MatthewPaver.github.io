---
name: Matthew Paver Portfolio
description: An editorial evidence catalogue for auditable software and AI engineering.
colors:
  burnt-orange: "#a83f24"
  burnt-orange-deep: "#742914"
  burnt-orange-soft: "#eed7cf"
  sea-green: "#165e58"
  focus-green: "#006d63"
  warm-canvas: "#f3efe6"
  paper: "#fbfaf6"
  paper-strong: "#ffffff"
  ink: "#1b1c19"
  muted-ink: "#5d5f58"
  rule: "#cfc8ba"
  rule-strong: "#8b877e"
  night-canvas: "#181a18"
  night-paper: "#20231f"
  night-ink: "#f1eee7"
typography:
  display:
    fontFamily: "Newsreader Local, Charter, Georgia, serif"
    fontSize: "clamp(3.4rem, 4.5vw, 4.3rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
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
rounded:
  control: "3px"
  node: "4px"
  surface: "5px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "28px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.burnt-orange-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "46px"
  evidence-card:
    backgroundColor: "{colors.warm-canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  contract-node:
    backgroundColor: "{colors.paper-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.node}"
    padding: "21px"
---

# Design System: Matthew Paver Portfolio

## Overview

**Creative North Star: "The Evidence Catalogue"**

The portfolio feels like a small, carefully edited software shop whose products can withstand inspection. It pairs an editorial reading experience with the precision of an engineering workbench: warm paper, dark ink, quiet rules, real interface captures and brief statements of purpose, evidence and limits.

The composition is confident but restrained. Personality comes from Matthew's work and decision philosophy rather than ornamental effects. Motion explains a change, check or hand-off, then settles; it never competes with the evidence.

**Key Characteristics:**

- Editorial hierarchy with dense, readable engineering evidence.
- One rare burnt-orange accent against warm paper and ink.
- Real product captures framed as working software, not generated artwork.
- Rectilinear, lightly softened surfaces with sparse structural borders.
- Honest boundaries and accountable human decisions beside every claim.

## Colors

The palette resembles annotated paper and workshop materials: warm neutrals carry the page, ink establishes authority, and the accent marks only consequential evidence or state.

### Primary

- **Burnt Orange:** Signals selected evidence, consequential labels and the active thread through a decision.
- **Deep Burnt Orange:** Provides high-contrast accent copy and the primary-button hover state.
- **Soft Burnt Orange:** Marks abstention and stop conditions without turning them into alarms.

### Secondary

- **Sea Green:** A restrained counterpoint for provenance and system status, never a competing brand color.
- **Focus Green:** Reserved for keyboard focus and accessible interaction feedback.

### Neutral

- **Warm Canvas:** The main page field.
- **Paper and Strong Paper:** Nested reading and card surfaces.
- **Ink and Muted Ink:** Primary and supporting copy.
- **Rule and Strong Rule:** Section structure, card boundaries and diagram paths.
- **Night Canvas, Night Paper and Night Ink:** The corresponding dark-mode foundation.

**The One Signal Rule.** Burnt orange identifies a meaningful state or piece of evidence; it is not decorative fill.

## Typography

**Display Font:** Newsreader Local (with Charter, Georgia and serif fallbacks)

**Body Font:** Manrope Local (with Avenir Next, Segoe UI, Helvetica, Arial and sans-serif fallbacks)

**Character:** Newsreader gives project claims an authored editorial voice. Manrope keeps evidence, navigation, controls and technical detail compact and operational.

### Hierarchy

- **Display:** Bold, tightly tracked and balanced; used for the two-line hero proposition only.
- **Headline:** Bold editorial headings for major sections, with short line lengths.
- **Title:** Editorial project and capability names, scaled to their shelf hierarchy.
- **Body:** Neutral sans-serif for explanations, generally held to roughly 48–66 characters per line.
- **Label:** Compact, high-weight sans-serif for audiences, states and diagram roles; sentence case is preferred over generic uppercase eyebrows.

**The Claim and Evidence Rule.** Serif type makes the claim; sans-serif type explains, qualifies and proves it.

## Layout

The core shell is capped at 1220px with 40px of viewport breathing room, reducing to 28px on small screens. The desktop hero is an asymmetric text-and-evidence split. The three flagship projects form one deliberately uneven shelf rather than a repeated equal-card grid, followed by thin capability routes and a compact supporting shelf.

Below 980px, project and supporting shelves become horizontal, touch-scrollable rails. Below 720px, each card occupies about 84vw so the next item remains visible as an invitation. The Decision Contract changes from a connected two-row enterprise diagram into one ordered vertical sequence. Controls remain at least 44px high, anchors account for the sticky header, and page-level horizontal overflow is prohibited.

Major sections use generous responsive vertical rhythm; evidence inside cards remains compact. The homepage curates; the searchable `/work/` route carries the full public catalogue.

**The Curated First Rule.** Three flagship applications must be understandable before the visitor is asked to browse the full catalogue.

## Elevation & Depth

The system is flat by default. Borders, tonal shifts and inset screenshot crops create most separation. A diffuse warm shadow is used only for the hero evidence window and the Decision Contract workbench; cards lift by no more than three pixels in response to hover.

**The Evidence Above Chrome Rule.** Depth may focus attention on a real interface or causal workflow, never on ornamental containers.

## Shapes

Surfaces are rectilinear with gently eased corners: 3px for controls, 4px for diagram nodes and 5px for substantial cards or workbenches. One-pixel rules remain visible and structural. Circles are limited to evidence markers and native status-like signals; large rounded pills and soft dashboard bubbles do not belong in this system.

## Components

### Buttons

- **Shape:** Compact rectangular controls with a 3px corner and a 46px minimum height.
- **Primary:** Ink surface, paper text and strong Manrope label weight.
- **Hover / Focus:** A two-pixel lift and deep accent fill on hover; a three-pixel solid focus outline with a three-pixel offset.
- **Ghost:** Transparent at rest, strong paper on hover, with the same border and geometry as the primary action.

### Chips

- **Style:** Scenario and filter controls use compact bordered rectangles rather than pills.
- **State:** Selection is explicit through `aria-pressed`, a filled surface and a clear foreground change.

### Cards / Containers

- **Corner Style:** 5px on project and supporting surfaces.
- **Background:** Canvas for flagship cards; paper for supporting items and nested evidence.
- **Shadow Strategy:** Flat at rest, with minimal responsive lift only where the whole card is actionable.
- **Border:** One-pixel rule or strong rule, used to express structure rather than decoration.
- **Internal Padding:** Typically 18–28px, with evidence rows separated by rules.

### Inputs / Fields

- **Style:** Paper surface, one-pixel rule, 3px corner and a touch-safe height.
- **Focus:** The shared solid focus-green outline; no glow.

### Navigation

The sticky navigation uses high-weight Manrope, generous hit areas and quiet muted links. The active in-page section is identified with ink text and a short burnt-orange underline. On small screens, secondary items may collapse, but Selected, All work and CV remain easy to reach.

### Evidence Story

The hero capture moves through change, deterministic check, source-linked finding and human decision once on entry. Manual stage selection remains available. The image crop and one marker move to reveal causality; there is no looping animation.

### Decision Contract

Six nodes make the engineering boundary explicit: source of truth, deterministic authority, permitted AI role, abstention condition, accountable human and retained record. A scenario change updates all six together and plays one directional signal. Re-selecting the current scenario remains settled.

## Do's and Don'ts

### Do:

- **Do** lead with a real application surface and a plain-language user problem.
- **Do** pair every reproduced result with its honest boundary.
- **Do** use the accent only for consequential evidence, selection or caution.
- **Do** preserve dark mode, visible keyboard focus, reduced motion and touch-safe controls.
- **Do** keep private work out of public catalogues and previews.

### Don't:

- **Don't** replace screenshots with generated product art or generic gradient thumbnails.
- **Don't** add vanity counters, floating blobs, perpetual motion, marquees or cursor spectacle.
- **Don't** repeat the same project proof across several homepage sections.
- **Don't** use rounded-pill components as a default visual language.
- **Don't** claim model or product impact that the linked evidence cannot reproduce.
