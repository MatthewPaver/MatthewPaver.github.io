# Matthew Paver portfolio design system

Updated 28 July 2026 after comparing the site with its earlier product shelf and
the portfolios of Paco Coursey, Lee Robinson, Rauno Freiberg and Sindre Sorhus.

## Direction

The site is a personal software portfolio, not a marketplace or a product
marketing page.

- Introduce Matthew by name and role.
- Let real screenshots carry the page.
- Describe each project in one literal sentence.
- Use links instead of repeated marketing buttons.
- Keep public demos, source, setup instructions and known limits easy to reach.

## Visual system

| Role | Value |
|---|---|
| Background | `#ebe8df` |
| Text | `#151714` |
| Muted text | `#62675f` |
| Border | `#cbc8bf` |
| Accent | `#b43a1d` |
| Serif | Newsreader Variable |
| Sans | Manrope Variable |
| Mono | DM Mono |
| Corner radius | 3–4px |
| Content width | 1320px |

Newsreader gives the site some of the character of the earlier shelf. Manrope
keeps controls and project descriptions plain. Orange is reserved for hover,
focus and small accents.

## Layout

1. Name, role and a short first-person introduction.
2. Three selected projects, led by one wide ProjectLens feature.
3. Five smaller projects in a two-row archive.
4. One short about paragraph.

Desktop gutters are 24px or wider. Mobile gutters are 11px per side at the
smallest supported width. Project images retain a 16:9 aspect ratio.

## Interaction

- Every interactive target is at least 44px high.
- Focus uses a 3px orange outline.
- Hover may change colour or scale an image by no more than 1.2%.
- No entrance effects, parallax, marquees or decorative motion.
- `prefers-reduced-motion` removes transitions.
- The page works without JavaScript.

## Copy

Use first person where Matthew is the subject. Name the input, action and output
of each tool. Prefer “made-up” or “sample” to vague claims about synthetic data.

Avoid:

- slogans;
- “evidence-led”, “flagship”, “ecosystem” and “journey”;
- numbered principles and process diagrams;
- “what you finish with” or “built for” formulas;
- claims that the interface is intelligent, seamless or transformative.

## Checks

- 375px, 768px, 1024px and 1440px layouts;
- 4.5:1 text contrast;
- sequential headings;
- visible keyboard focus;
- no horizontal overflow;
- no broken or stretched screenshots;
- private repositories absent from generated pages.
