---
title: "Accessibility"
sidebar_label: "Accessibility"
description: "How DHTMLX Gantt meets WCAG 2.2 AA, Section 508 and EN 301 549 - keyboard operation, screen-reader support, high-contrast themes, and how to configure them."
---

# Accessibility

DHTMLX Gantt is built to be usable by everyone, including people who rely on keyboards, screen readers,
screen magnification, or high-contrast display modes. 

:::info Target conformance
DHTMLX Gantt is designed to meet **WCAG 2.2 Level AA**, **Section 508** of the U.S. Rehabilitation Act,
and **EN 301 549** (the technical baseline of the European Accessibility Act). Because WCAG 2.2 AA also
satisfies ADA and Section 508 expectations, a single conformance target covers the major regulatory
requirements.

A detailed, criterion-by-criterion **Accessibility Conformance Report (VPAT® 2.5)** is available:
[Accessibility Conformance Report](guides/accessibility-conformance-report.md).
:::

## At a glance

| Area | Support |
|---|---|
| Keyboard operation | Full: every primary action has a keyboard equivalent |
| WAI-ARIA semantics | Built-in (`grid` / `treegrid` model), enabled by default |
| Screen readers | Tested with NVDA, JAWS and VoiceOver |
| Visual accessibility | Dedicated high-contrast themes, an increase-contrast option, and non-colour cues |
| Text resize / zoom | Layout remains operable up to 400% zoom / text spacing overrides |
| Customization | Public API to change every screen-reader description and announce dynamic changes |
| Standards | WCAG 2.2 AA, Section 508, EN 301 549 |

Use this page to verify the component against your own accessibility checklist, and to learn how to
configure Gantt for an accessible deployment. To try it hands-on, see the live
[Accessibility sample](https://docs.dhtmlx.com/gantt/samples/01_initialization/22_accessibility.html).

## Scope

This guide covers the Gantt widget itself: the **data grid / tree**, the **timeline** with task bars and
dependency links, the **time-scale header**, the **resource panel**, and the
**lightbox** (task editor). Like any embeddable component, the accessibility of the final page also
depends on the host application (see [Host-page responsibilities](#hostpageresponsibilities)).

## Setting up an accessible Gantt {#recommendedconfiguration}

Gantt ships accessible by default (ARIA output is on), but a fully WCAG 2.2 AA-compliant deployment needs
two more things: keyboard navigation enabled, and an AA-contrast colour scheme selected. The recommended
configuration is:

~~~js
// 1. ARIA output is enabled by default - no action needed.
//    (You can be explicit: gantt.config.accessibility = { aria: true };)

// 2. Enable keyboard navigation
gantt.plugins({ keyboard_navigation: true });

gantt.config.accessibility = {
    aria: true,
    increase_contrast: true,     // AA contrast for the default light skin
    colorblind_friendly: true    // non-colour cues (patterns, outlines)
};

gantt.init("gantt_here");
~~~

The sections below describe each capability in detail.

## WAI-ARIA Attributes

DHTMLX Gantt provides WAI-ARIA support that implies the use of special attributes in the component's
markup. These additional attributes make the component recognizable to screen readers. You can find more
information in the [official specification](https://www.w3.org/WAI/standards-guidelines/aria/) of WAI-ARIA.

The component exposes itself to assistive technology as an interactive tree of rows mirrored by a timeline
of task bars. Semantics are applied per structural part of the widget, so each part is announced with the
correct role and state.

### Data grid / tree rows

| Element | Role / attribute | Purpose |
|---|---|---|
| Task grid | `role="treegrid"` with `aria-rowcount` / `aria-colcount` | The grid as a whole |
| `.gantt_row` | `role="row"` + `aria-label` | A task row, with a spoken summary (type, name, dates, duration, progress) |
| `.gantt_row` | `aria-level` | Depth of the task in the hierarchy |
| `.gantt_row` | `aria-expanded` | Open/closed state of a branch with children |
| `.gantt_row` | `aria-selected` | Selection state of the row |
| `.gantt_row` | `aria-posinset` / `aria-setsize` | Position of the row within its level |
| `.gantt_grid_head_cell` | `role="columnheader"` + `aria-label` | A grid column header and its name |

### Timeline and resource panel

| Element | Role / attribute | Purpose |
|---|---|---|
| `.gantt_task_line` | `role="img"` + `aria-label` | A task bar, exposed with a descriptive label |
| `.gantt_scale_cell` | `role="columnheader"` | A time-scale header cell |
| Resource cells | `role="grid"` / `row` / `gridcell` | Resource load exposed as text (for example, "John: 5 of 8 hours on 21 Apr"), not by bar height or colour |

### Lightbox (task editor)

The lightbox opens as a modal dialog (`role="dialog"`, `aria-modal="true"`). Focus is moved into the dialog
when it opens, kept inside it while it is open (focus trapping), and returned to the originating task when
it closes, so keyboard and screen-reader users never lose their place.

### Enabling / disabling ARIA output

ARIA output is controlled by a single master switch and is **on by default**:

~~~js
gantt.config.accessibility = {
    aria: true,           // master switch for all ARIA output
    announcements: true,  // enable the live region for dynamic messages
    grid_semantics: true  // verbose treegrid position info (row/column counts and indices)
};
~~~

All three flags default to `true`, so Gantt is fully accessible out of the box.

:::note
The legacy [wai_aria_attributes](api/config/wai_aria_attributes.md) config is still supported for backward
compatibility. If you set it explicitly, it wins over `accessibility.aria`; otherwise `accessibility.aria`
decides. You can check the resolved state at any time with `gantt.ext.accessibility.isEnabled()`.
:::

## Screen reader support

DHTMLX Gantt is tested against the most widely used assistive technologies:

| Screen reader | Browser | Platform |
|---|---|---|
| NVDA | Firefox, Chrome | Windows |
| JAWS | Chrome, Edge | Windows |
| VoiceOver | Safari | macOS |

By default, a screen reader reads a task as **type + name + dates + duration + progress**, for example
*"Task: Interior office, Start date: 3 Apr, End date: 11 Apr, Duration: 7, 60% complete"*. Milestones are
a single point in time, so they read short: *"Milestone: Release, Start date: 15 Apr"*. Hierarchy is
exposed through `aria-level` and `aria-expanded`, and selection through `aria-selected`, so the structure
and state of the project are conveyed without sighted use.

### Customizing what screen readers announce

The public `gantt.ext.accessibility` API lets you change every screen-reader description. Each label is a
function that receives an item and returns plain text (HTML is stripped and quotes are escaped
automatically); you override only what you want to change.

| Label | Receives | Describes |
|---|---|---|
| `labels.taskBar(task)` | the task | the bar on the timeline |
| `labels.taskRow(task)` | the task | the row in the grid |
| `labels.link(link)` | the link | a dependency arrow |
| `labels.timelineCell(date, scale)` | date + scale | a header cell of the time scale |
| `labels.resourceCell(resource, date, value)` | resource + cell | a cell in the resource panel |
| `labels.resourceRow(resource)` | the resource | a row in the resource grid |
| `labels.gridCell(column, textValue, task)` | column, cell text, task | a cell in the task grid |

~~~js
// Describe a task row for a medical schedule
gantt.ext.accessibility.labels.taskRow = (task) =>
    `Appointment: ${task.text}, ${task.duration} days, ${Math.round(task.progress * 100)}% complete`;

// A simpler bar description
gantt.ext.accessibility.labels.taskBar = (task) => task.text;
~~~

:::note
Label functions produce the text written into the HTML `aria-label` attribute during rendering. If you
replace a label **after** `gantt.init()`, call `gantt.render()` afterwards so the change reaches the screen
reader. If you set it **before** `gantt.init()`, no extra call is needed.
:::

### Announcing dynamic changes

For things that *happen* and have no permanent element to label - a drag result, a re-sort, a saved/failed
status - use `announce()`. It writes text into a visually-hidden ARIA live region that the screen reader
reads aloud:

~~~js
gantt.ext.accessibility.announce("Task moved to 21 Jul - 25 Jul");
gantt.ext.accessibility.announce("Saving failed", { assertive: true }); // interrupts current speech
~~~

By default the message is **polite** (the screen reader finishes its current sentence first);
`{ assertive: true }` interrupts and should be reserved for time-critical messages. Gantt already announces
two things for you out of the box: the **drag result** (move / resize / progress speaks the task's updated
row description) and the **sort direction** (clicking a grid column header speaks
*"&lt;column&gt;, sorted ascending/descending"*).

### Translatable screen-reader names

Static screen-reader names live in the locale, so they translate with the rest of the UI. Override them
like any other locale label:

~~~js
gantt.locale.labels.aria_grid = "Project tasks";
~~~

Keys include `aria_task_duration`, `aria_task_progress`, `aria_grid`, `aria_sort_ascending` /
`aria_sort_descending`, `aria_resource_load`, `aria_toggle_row`, and the `aria_link_*` link-type names.
All of them ship translated in every bundled locale.

## Keyboard Navigation

All Gantt interactions can be performed from the keyboard. Keyboard navigation is provided by a plugin that
you enable once, using the [gantt.plugins](api/method/plugins.md) method:

~~~js
gantt.plugins({ keyboard_navigation: true });

// optional: navigate individual grid cells instead of whole rows
gantt.config.keyboard_navigation_cells = true;
~~~

`Tab` places focus into the accessible views in turn (task grid → any custom layout cell → resource grid →
resource timeline → next element on the page); arrow keys, `Home` / `End` move within the focused view. A
selection of the built-in shortcuts:

| Keys | Action |
|---|---|
| `↑` / `↓` | Move to the previous / next task |
| `Page Up` / `Page Down` | Jump to the first / last task |
| `Space` | Select / deselect the task |
| `Ctrl` + `←` / `→` | Collapse / expand the branch |
| `Enter` | Open the lightbox (edit the task) |
| `Ctrl` + `Enter` | Add a task |
| `Delete` | Delete the task |

Editing task **dates and duration** without a mouse is done through the lightbox (open with `Enter`), which
provides fully keyboard-operable date and duration controls. Custom in-place shortcuts (for example, nudging
a selected bar along the timeline) can be added with `gantt.ext.keyboardNavigation.addShortcut(...)`.

The full shortcut reference, focus behaviour, scopes, and custom-shortcut API are described in the
[Keyboard Navigation](guides/keyboard-navigation.md) article.

## Low vision and colour

### High-Contrast Themes {#highcontrastthemes}

DHTMLX Gantt supports themes that use contrasting colours to make the interface more distinct and easier to
see. They are helpful for users with particular visual needs.

There are two dedicated high-contrast skins:

- contrast black skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_black.css"
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[High contrast theme - Black](https://docs.dhtmlx.com/gantt/samples/06_skins/07_high_contrast_black.html)

- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxgantt_contrast_white.css"
    type="text/css" media="screen" title="no title" charset="utf-8">
~~~

[High contrast theme - White](https://docs.dhtmlx.com/gantt/samples/06_skins/08_high_contrast_white.html)

The built-in **dark** theme also meets AA contrast out of the box. See the [Skins](guides/skins.md) guide
for how to switch themes.

### Increase contrast and colour-blind cues

If you keep the default light skin, two options make it accessible without changing the theme:

~~~js
gantt.config.accessibility = {
    increase_contrast: true,     // raises the default light skin to AA contrast
    colorblind_friendly: true    // adds non-colour cues
};
~~~

- **`increase_contrast`** (default off) raises the default (terrace) light skin to AA contrast.
- **`colorblind_friendly`** (default off) adds non-colour cues so meaning is never carried by colour alone:
  a line at the progress boundary, a hatch on project bars, an outline/shadow on critical tasks, and a
  hatch on over-allocated resource cells.

Both take effect on the next `gantt.render()`.

### Other low-vision support

- **Colour is never the only signal.** Status and hierarchy are conveyed through text labels and ARIA
  state, not colour alone (see `colorblind_friendly` above).
- **Zoom and reflow.** The grid/timeline layout remains operable when the page is zoomed up to 400%.
- **Text spacing.** Applying WCAG text-spacing overrides does not clip or overlap text in grid cells or on
  bars.
- **Visible focus.** The focused row, cell or bar shows a persistent 2px focus indicator; it stays visible
  under `forced-colors: active` (Windows High Contrast mode).

## Host-page responsibilities {#hostpageresponsibilities}

A few accessibility requirements live at the page level, not inside the component. To reach full WCAG 2.2 AA
on your page, make sure the host document:

- sets a document language, e.g. `<html lang="en">`;
- provides a page `<h1>` and wraps the Gantt in an appropriate landmark (e.g. `<main>`);
- gives the Gantt container an accessible name where multiple widgets share a page.

## Testing and methodology

Accessibility is validated continuously:

1. **Automated testing** with [axe-core](https://github.com/dequelabs/axe-core) across representative
   samples: basic init, high-contrast skins, the lightbox, keyboard navigation, and the resource panel.
2. **Manual testing**: keyboard-only walkthroughs of every scope, and screen-reader passes with NVDA,
   JAWS and VoiceOver.
3. **Conformance reporting**: results are published openly in the
   [Accessibility Conformance Report](guides/accessibility-conformance-report.md).

## Resources

- [Accessibility Conformance Report (VPAT 2.5)](guides/accessibility-conformance-report.md)
- [Accessibility sample (live)](https://docs.dhtmlx.com/gantt/samples/01_initialization/22_accessibility.html)
- [Keyboard Navigation](guides/keyboard-navigation.md)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices: Grid / Treegrid](https://www.w3.org/WAI/ARIA/apg/patterns/)
