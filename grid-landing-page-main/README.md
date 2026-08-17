# Frontend Mentor - Grid Landing Page

A responsive landing page for **Bridge Collective**, a fictional
education nonprofit.

The page is built around a strong CSS Grid layout: a large headline and
supporting copy sit alongside a 2×2 impact-stat grid, with a compact
navigation bar at the top and a footer strip at the bottom.

![Design preview for the Grid landing page](./preview.jpg)

## Overview

This project recreates the supplied desktop and mobile designs as
closely as possible using semantic HTML and CSS.

The visual direction is intentionally minimal:

-   Full-bleed blue background
-   White typography and icons
-   Thin blue dividers between grid areas
-   Large editorial-style headline
-   Four impact statistics arranged as a responsive grid
-   Compact navigation with an open-menu state
-   Simple footer containing copyright and charity information

There are no decorative photographs or illustrations, so layout,
typography, spacing, and alignment are the primary visual elements.

## Built with

-   Semantic HTML5
-   CSS3
-   CSS Grid
-   CSS custom properties for design tokens
-   Responsive media queries
-   Inter variable font
-   Vanilla JavaScript for the navigation menu

No framework or CSS library is required.

## Design system

The implementation follows the supplied design tokens from
`style-guide.md`.

### Colors

  Token         HEX
  ------------- -----------
  Neutral 950   `#000000`
  Neutral 0     `#FFFFFF`
  Blue 700      `#2854FE`
  Blue 600      `#325CFF`
  Blue 400      `#4784FF`
  Blue 200      `#C1CEFF`

### Typography

The design uses **Inter**.

  Preset          Weight               Size   Line height   Letter spacing
  --------------- ------------------ ------ ------------- ----------------
  Text Preset 1   Medium               60px          106%             -2px
  Text Preset 2   Medium               44px          106%             -2px
  Text Preset 3   Medium               36px          111%                0
  Text Preset 4   Medium               32px          160%             -2px
  Text Preset 5   Medium / Regular     17px          165%                0
  Text Preset 6   Medium / Regular     14px          142%                0

### Spacing

  Token           Value
  ------------- -------
  spacing-0         0px
  spacing-300      24px
  spacing-400      32px
  spacing-600      48px
  spacing-700      56px

## Page structure

The page is organized into four main areas:

``` text
Page
├── Header
│   ├── Brand
│   └── Menu toggle
│
├── Main
│   ├── Hero content
│   │   ├── Heading
│   │   └── Description
│   │
│   └── Impact stats
│       ├── Students reached
│       ├── Schools partnered
│       ├── Teachers trained
│       └── Graduation lift
│
└── Footer
    ├── Copyright
    └── Charity registration
```

## Responsive behavior

The layout is designed for the supplied viewport variations rather than
treating mobile as a scaled-down desktop version.

The primary desktop composition uses:

-   A horizontal header
-   A large content area split between the hero and statistics
-   A 2×2 statistics grid
-   A horizontal footer

At narrower viewport sizes, the layout rearranges so that content
remains readable without relying on horizontal scrolling.

The navigation menu can also be opened and closed at any screen size.

## Accessibility

The implementation aims to keep the page usable with keyboard and
assistive technologies.

Considerations include:

-   Semantic landmarks such as `header`, `main`, `section`, and `footer`
-   Appropriate heading hierarchy
-   Descriptive button labels
-   Visible focus states for interactive controls
-   Keyboard-accessible navigation
-   Respect for `prefers-reduced-motion` when animations are introduced
-   Sufficient contrast between the white content and blue background

## Project structure

``` text
grid-landing-page-main/
├── index.html
├── styles/
│   └── ...
├── assets/
│   └── ...
├── design/
│   └── ...
├── style-guide.md
├── preview.jpg
├── AGENTS.md
├── CLAUDE.md
├── README.md
└── README-template.md
```

## Development workflow

The implementation follows a design-first workflow:

1.  Inspect the supplied desktop and mobile designs.
2.  Identify the major layout regions and repeated components.
3.  Extract the provided colors, typography, and spacing into reusable
    CSS tokens.
4.  Build semantic HTML before adding detailed styling.
5.  Establish the main desktop grid.
6.  Add responsive layouts based on the supplied mobile designs.
7.  Implement the navigation interaction.
8.  Compare the rendered page against the reference designs.
9.  Refine spacing, typography, alignment, and responsive behavior.
10. Test keyboard interaction and different viewport sizes.

## Possible enhancements

The core challenge is intentionally simple, but the project can be
extended with:

-   Animated navigation transitions
-   Animated statistic counters
-   Focus trapping while the navigation menu is open
-   `prefers-reduced-motion` support for all transitions
-   Loading statistics from JSON
-   Progressive Web App functionality
-   Additional automated accessibility checks
-   Visual regression testing

## AI-assisted development

This repository includes `AGENTS.md` and `CLAUDE.md` for use with AI
coding assistants.

These files provide project-specific guidance intended to keep AI
assistance aligned with the challenge and encourage understanding of the
implementation rather than blindly generating code.

When using an AI assistant, the preferred workflow is to use it for:

-   Understanding the design
-   Breaking the page into layout problems
-   Reviewing implementation decisions
-   Debugging CSS
-   Explaining unfamiliar concepts
-   Checking accessibility and responsive behavior

The final implementation should still be understood and reviewed by the
developer.

## Frontend Mentor

This project is based on a Frontend Mentor coding challenge.

Frontend Mentor provides realistic frontend challenges for practicing
HTML, CSS, JavaScript, responsive design, and frontend development
workflows.

## Author

Built as a responsive frontend implementation of the supplied Bridge
Collective landing-page design.
