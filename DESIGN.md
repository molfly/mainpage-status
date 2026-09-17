# DESIGN.md

## Purpose

This file defines the design principles an AI coding or design agent should follow when creating websites and web applications.

The goal is not to prescribe every pixel. It is to capture design intent: the reasoning behind hierarchy, typography, spacing, color, composition, interaction, and component choices.

Use these rules as design judgment, not as a substitute for the project's existing design system, CSS, component library, or accessibility requirements.

---

## 1. Core Principles

### Intent before decoration
Every visual choice must have a reason. Do not add gradients, shadows, borders, illustrations, animations, or decorative elements merely to make a page feel "designed."

Ask:
- What should the user notice first?
- What action matters most?
- What information belongs together?
- What can be removed?
- Why is this element visually different from its neighbors?

### Clear hierarchy
A user should understand the structure of a page at a glance.

Use size, weight, spacing, alignment, and contrast to establish hierarchy. Do not rely on color alone.

There should normally be one dominant idea or action per viewport or major section.

### Restraint
Prefer fewer, stronger design decisions over many weak ones.

Avoid "AI slop": excessive gradients, floating cards, random rounded containers, decorative pills, unnecessary icons, oversized hero text, glowing effects, and visual noise without functional purpose.

### Consistency
Repeated concepts should look and behave consistently.

Do not invent a new visual treatment when an existing pattern already communicates the same role.

### Content drives layout
Design around real content rather than forcing content into a decorative composition.

Long text should remain readable. Tables should have enough width. Controls should not be compressed merely to preserve symmetry.

---

## 2. Layout

Use a deliberate grid and alignment system.

Prefer simple page structures:
- a clear content column;
- a content + sidebar layout when secondary information is genuinely useful;
- full-width regions only when the content benefits from them.

Align related elements to shared edges.

Avoid arbitrary offsets and "almost aligned" elements.

Use whitespace to express relationships:
- small gaps imply strong relationships;
- larger gaps separate groups;
- section spacing should be visibly larger than spacing inside a section.

Do not wrap every section in a card.

Containers should exist because they communicate grouping, hierarchy, interaction, or separation — not because empty space feels uncomfortable.

### Width
Set readable maximum widths for prose.

Allow data-heavy elements such as tables, timelines, dashboards, code blocks, diagrams, and galleries to use more horizontal space when useful.

Do not artificially constrain evidence or data tables. When a table is the primary content, let it use the available width.

---

## 3. Spacing

Use a consistent spacing scale rather than arbitrary values.

Prefer a small reusable scale based on roughly 4px or 8px increments.

Example:

`4, 8, 12, 16, 24, 32, 48, 64, 96`

Not every project must use these exact values, but spacing should feel systematic.

Use tighter spacing within components and larger spacing between conceptual groups.

Do not use excessive vertical whitespace simply to create a "premium" appearance.

---

## 4. Typography

Typography should establish hierarchy before decorative styling does.

Use a limited type system:
- one primary UI/body family;
- optionally one display or editorial family when the product identity genuinely benefits from it;
- one monospace family for code, identifiers, technical values, or terminal-like content.

Prefer readable sizes and line heights.

Body text should normally remain comfortable for sustained reading.

Avoid:
- too many font sizes;
- too many font weights;
- excessive uppercase;
- tiny low-contrast labels;
- giant headlines that consume the viewport without adding meaning.

Headings should describe the content that follows them, not merely decorate sections.

Use tabular numerals where aligned numerical data benefits from them.

---

## 5. Color

Color must have semantic purpose.

Define roles rather than scattering literal colors throughout the interface.

Typical roles include:
- background;
- surface;
- elevated surface;
- primary text;
- secondary text;
- subtle text;
- border;
- accent;
- accent hover;
- success;
- warning;
- danger;
- information.

Use one primary accent unless the product requires a richer semantic palette.

Neutral colors should do most of the structural work.

Reserve saturated colors for meaningful emphasis.

Never depend on color alone to communicate state.

Maintain sufficient contrast for text, controls, focus states, and important graphical elements.

---

## 6. Surfaces, Borders, and Shadows

Prefer hierarchy through spacing and typography before introducing boxes.

Use borders when they clarify boundaries.

Use shadows primarily when elevation has meaning: menus, dialogs, popovers, floating controls, or overlapping surfaces.

Avoid stacking borders, shadows, tinted backgrounds, and rounded corners on the same element without a clear reason.

Nested cards should be rare.

---

## 7. Corners

Use a small, consistent radius scale.

Do not automatically make every element heavily rounded.

Buttons, inputs, cards, dialogs, and tags may use different radii when their roles justify it, but the relationship should remain systematic.

Pill shapes should normally be reserved for tags, compact filters, statuses, segmented controls, or inherently pill-shaped actions.

---

## 8. Components

Before creating a new component, check whether the project already has one that serves the same purpose.

Components should encode repeated behavior and structure, not merely repeated decoration.

A component should have predictable:
- spacing;
- states;
- typography;
- alignment;
- interaction behavior.

Avoid one-off variants unless the content or interaction genuinely requires them.

---

## 9. Buttons and Actions

Establish clear action hierarchy.

A typical view should have:
- one primary action;
- secondary actions with less visual weight;
- tertiary actions represented quietly when appropriate.

Do not make every action a filled button.

Button labels should describe the action, preferably with verbs.

Avoid ambiguous labels such as "OK" when a more specific action is available.

Destructive actions must be visually and behaviorally distinct from normal primary actions.

---

## 10. Forms

Forms should be easy to scan vertically.

Labels should remain visible; placeholders are not substitutes for labels.

Group related fields.

Explain unusual requirements before validation fails.

Validation messages should:
- identify the problem;
- appear near the relevant field;
- explain how to fix it when possible.

Do not mark every field as required when nearly all fields are required. Mark exceptions instead when that is clearer.

Preserve user input after validation errors.

---

## 11. Navigation

Navigation should reflect the information architecture, not every possible destination.

Make the current location obvious.

Do not hide essential desktop navigation behind a menu purely for visual minimalism.

Use breadcrumbs when hierarchy is deep enough that they provide useful context.

Keep navigation labels concise and predictable.

---

## 12. Tables and Dense Data

Treat tables as first-class interfaces, not as oversized cards.

Use the available horizontal space when the table is important.

Align:
- text to the left;
- comparable numbers consistently, usually to the right;
- columns according to their data type.

Keep headers visible when useful for long tables.

Use subtle separators and restrained row treatments.

Do not add excessive padding that dramatically reduces information density.

Support sorting, filtering, searching, pagination, or virtualization only when the data volume justifies them.

Make empty, loading, and error states explicit.

---

## 13. Responsive Design

Responsive design is not simply shrinking the desktop layout.

At each breakpoint, preserve:
1. meaning;
2. hierarchy;
3. primary actions;
4. readability.

Reflow layouts rather than compressing them.

Allow horizontal scrolling for genuinely tabular data when transforming it into cards would destroy comparability.

Touch targets must remain comfortably usable.

Do not hide important functionality on mobile merely because space is limited.

---

## 14. States

Every interactive or data-driven component should account for relevant states:

- default;
- hover;
- focus;
- active;
- selected;
- disabled;
- loading;
- empty;
- success;
- warning;
- error.

Do not design only the ideal populated state.

Loading states should preserve layout stability where possible.

Empty states should explain what is missing and, when useful, what the user can do next.

Error states should provide recovery paths.

---

## 15. Accessibility

Accessibility is a design constraint, not a later cleanup step.

Use semantic HTML wherever possible.

Ensure:
- keyboard navigation works;
- focus is clearly visible;
- controls have accessible names;
- text has sufficient contrast;
- information is not conveyed by color alone;
- heading levels form a meaningful hierarchy;
- motion respects reduced-motion preferences;
- images have appropriate alternative text;
- form errors are understandable and programmatically associated where possible.

Prefer native controls unless a custom control provides necessary behavior that cannot reasonably be achieved otherwise.

---

## 16. Motion

Motion should explain change, preserve context, or provide useful feedback.

Keep transitions short and restrained.

Avoid animation that delays interaction.

Do not animate every element entering the viewport.

Avoid decorative motion in data-heavy or task-focused interfaces unless it serves a clear purpose.

Respect `prefers-reduced-motion`.

---

## 17. Icons and Imagery

Do not use icons when a short text label is clearer.

Use a consistent icon family.

Icons should communicate meaning, not fill empty space.

Avoid mixing illustration styles.

Images should support the content or brand rather than compensate for weak hierarchy.

Do not use generic stock imagery merely because a section appears visually empty.

---

## 18. Content

Interface copy is part of the design.

Prefer concise, concrete language.

Use terminology consistently.

Headings should communicate information rather than use vague marketing language.

Avoid unnecessary introductory copy before obvious interfaces.

Error messages should explain the problem in human terms.

Do not fabricate testimonials, customer logos, statistics, awards, user counts, or business claims to make a generated page look realistic.

---

## 19. Design Tokens

When implementing a new interface, prefer semantic tokens.

Example:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-border: ...;
  --color-accent: ...;
  --color-danger: ...;

  --space-1: ...;
  --space-2: ...;
  --space-3: ...;
  --space-4: ...;
  --space-5: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;

  --font-body: ...;
  --font-mono: ...;
}
```

Prefer semantic names such as `--color-text-muted` over names such as `--gray-500` when expressing component intent.

Do not create dozens of tokens before the interface demonstrates a need for them.

---

## 20. Agent Workflow

When creating or redesigning a page:

1. Inspect the existing project before writing UI code.
2. Reuse existing tokens, components, typography, and patterns where appropriate.
3. Identify the page's primary user goal.
4. Determine the visual hierarchy before adding decoration.
5. Build the simplest layout that communicates that hierarchy.
6. Test with realistic content, including long values and empty states.
7. Check desktop and mobile behavior.
8. Check keyboard interaction and focus states.
9. Remove decorative elements that do not improve comprehension, identity, or interaction.
10. Compare the result against this file and the project's established visual language.

If an existing product has a coherent design language, preserve it rather than replacing it with the generic preferences in this document.

---

## 21. Correction Rules

When feedback identifies a recurring design problem, convert the correction into a reusable and testable rule.

Good:
- "Primary data tables should use the full content width."
- "Only one filled primary button should appear in a form action row."
- "Section spacing must be greater than spacing between items inside the section."
- "Do not use cards for content that is already grouped by page structure."

Weak:
- "Make the table nicer."
- "Make it more modern."
- "Improve spacing."
- "Make the page feel premium."

Prefer rules whose effect can be observed and compared across multiple screens.

---

## 22. Anti-Patterns

Unless the project explicitly calls for them, avoid:

- excessive gradients;
- glassmorphism everywhere;
- glowing borders;
- arbitrary blobs;
- unnecessary floating cards;
- excessive border radii;
- pill-shaped everything;
- oversized marketing headlines;
- decorative dashboard charts with meaningless data;
- icons beside every label;
- unnecessary badges;
- nested cards;
- low-contrast gray-on-gray text;
- excessive centered text;
- excessive whitespace;
- animations without purpose;
- fake metrics or social proof;
- mobile layouts that merely squeeze desktop UI;
- generic SaaS landing-page composition applied to every product.

A clean interface is not an empty interface. A rich interface is not a cluttered interface.

---

## 23. Final Review

Before considering a page finished, ask:

- Is the primary purpose obvious within a few seconds?
- Is the most important action visually clear?
- Does the hierarchy work without relying on decoration?
- Are related things visibly grouped?
- Are unrelated things sufficiently separated?
- Is the typography readable?
- Is spacing systematic?
- Is color carrying meaning?
- Are tables and dense content given enough room?
- Are mobile and narrow layouts intentional?
- Are loading, empty, and error states handled?
- Can the interface be used with a keyboard?
- Is focus visible?
- Is anything present only because "websites usually have it"?
- Can any visual element be removed without losing meaning?
- Does the result feel like this product rather than a generic AI-generated website?

The objective is not to make every website look the same.

The objective is to make every design decision intentional, consistent, accessible, and explainable.

