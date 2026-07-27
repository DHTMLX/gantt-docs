---
title: "Accessibility Conformance Report (VPAT 2.5)"
sidebar_label: "Conformance Report (VPAT)"
description: "DHTMLX Gantt Accessibility Conformance Report, based on VPAT 2.5 - conformance with WCAG 2.2 AA, Section 508, and EN 301 549."
---

# Accessibility Conformance Report

This report documents how DHTMLX Gantt conforms to the major accessibility standards. It follows the **VPAT® 2.5 (International Edition)** structure, so you can map it directly against your own procurement or compliance checklist. For a task-oriented overview of the accessibility features and how to configure them, see the [Accessibility](guides/accessibility.md) guide.

**Name of Product/Version:** DHTMLX Gantt v10.1.0

**Report Date:** July 2026

**Product Description:** DHTMLX Gantt is an interactive JavaScript Gantt-chart component for building project-scheduling interfaces in a web browser. It renders a task grid (tree) alongside a timeline, supports task dependencies, a resource panel, inline editors, and a modal task editor (the "lightbox"). It is embedded by a host web application.

**Contact Information:** [info@dhtmlx.com](mailto:info@dhtmlx.com)

## Notes

- This report evaluates DHTMLX Gantt in its **recommended accessibility configuration**: the `keyboard_navigation` plugin **enabled**, ARIA output enabled (`gantt.config.accessibility.aria` / `wai_aria_attributes`, on by default), and an AA-conformant colour scheme selected - either the dedicated `contrast-black` / `contrast-white` themes, the built-in **dark** theme, or the default light skin with `gantt.config.accessibility.increase_contrast` enabled. Where a conformance level depends on this configuration, the Remarks say so. See the [Accessibility](guides/accessibility.md) guide for setup instructions.
- DHTMLX Gantt is **web content** rendered by a host application. Page-level responsibilities - the page title, `<html lang>`, skip/bypass mechanisms, and site-wide navigation - belong to the host application and are reported as *Not Applicable* with an explanation.
- In the WCAG tables, only the **Web** response is populated. The *Electronic Docs*, *Software*, *Closed*, and *Authoring Tool* rows are *Not Applicable*: the product is not standalone (non-web) software, closed functionality, an authoring tool, or a piece of electronic documentation.

**Evaluation Methods Used:** Testing was performed using a combination of automated testing (axe-core in a headless browser), manual code review of the component source (roles, ARIA attributes, keyboard handling and plugin behaviour), assistive-technology testing (manual passes with **NVDA + Firefox** and **JAWS + Chrome** on Windows), and browser overrides (colour-vision-deficiency emulation, `prefers-reduced-motion: reduce`, `forced-colors: active`, 200% / 400% zoom, and WCAG text-spacing overrides).

## Applicable standards / guidelines

| Standard / Guideline | Included in report |
|---|---|
| Web Content Accessibility Guidelines 2.0 | Level A (No) · Level AA (No) · Level AAA (No) |
| Web Content Accessibility Guidelines 2.1 | Level A (No) · Level AA (No) · Level AAA (No) |
| Web Content Accessibility Guidelines 2.2 | Level A (**Yes**) · Level AA (**Yes**) · Level AAA (No) |
| Revised Section 508 standards (published Jan 18, 2017; corrected Jan 22, 2018) | (**Yes**) |
| EN 301 549 - V3.1.1 (2019-11) and V3.2.1 (2021-03) | (**Yes**) |

*WCAG 2.0 and 2.1 are not reported separately. Criteria that WCAG marks "2.1 and 2.2" are answered because
they are part of WCAG 2.2 and are referenced by EN 301 549.*

## Terms

- **Supports:** The functionality of the product has at least one method that meets the criterion without
  known defects, or meets with equivalent facilitation.
- **Partially Supports:** Some functionality of the product does not meet the criterion.
- **Does Not Support:** The majority of product functionality does not meet the criterion.
- **Not Applicable:** The criterion is not relevant to the product.

## WCAG 2.x report

DHTMLX Gantt is web content, so only the **Web** response is populated below. "Requires the
`keyboard_navigation` plugin" and "requires ARIA output (on by default)" are configuration dependencies,
not defects.

### Table 1: Success Criteria, Level A

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| **1.1.1** Non-text Content | Supports | Task bars expose `role="img"` with a descriptive `aria-label` (type, name, dates, duration, progress). Grid action icons (add `+`, tree expand/collapse) are `role="button"` with accessible names; decorative icons are `aria-hidden`. Resource load is exposed as text ("X of Y hours"), not colour/height alone. Labels are customizable via `gantt.ext.accessibility.labels.*`. |
| **1.2.1** Audio-only and Video-only (Prerecorded) | Not Applicable | The product contains no audio or video content. |
| **1.2.2** Captions (Prerecorded) | Not Applicable | No prerecorded multimedia. |
| **1.2.3** Audio Description or Media Alternative (Prerecorded) | Not Applicable | No prerecorded multimedia. |
| **1.3.1** Info and Relationships | Supports | The grid uses `treegrid` → `row` → `gridcell`/`columnheader` roles. In row-focus mode the announced row exposes type, `aria-level`, `aria-expanded`, `aria-selected`, `aria-posinset`/`aria-setsize`, and row/column counts and indices; dependencies are surfaced as text in the Predecessors/Successors columns; timeline scale cells are `columnheader`. Requires ARIA output (on by default). |
| **1.3.2** Meaningful Sequence | Supports | DOM/reading order follows the visual order; focus order is logical (task grid → intermediate layout cells → resource grid → resource timeline). |
| **1.3.3** Sensory Characteristics | Supports | Instructions and labels do not rely solely on shape, size, or spatial location; interactive elements carry text or ARIA names. |
| **1.4.1** Use of Color | Supports | Non-colour cues are built into the product and enabled with `gantt.config.accessibility.colorblind_friendly` (default off): a line at the progress boundary, a hatch on project bars, an outline/shadow on critical tasks, and a hatch on over-allocated resource cells. Verified under protanopia / deuteranopia / tritanopia / achromatopsia. Meeting the criterion requires enabling the option - one supported method meets it. |
| **1.4.2** Audio Control | Not Applicable | The product produces no auto-playing audio. |
| **2.1.1** Keyboard | Supports | With the `keyboard_navigation` plugin enabled: the grid is focusable; arrows/Home/End move focus; Space selects; Enter opens the lightbox; Ctrl+←/→ expand/collapse; Ctrl+Enter creates and Delete removes a task. The resource panel and the lightbox resource-assignments grid are keyboard-operable. Bar move/resize/progress without dragging are available via the lightbox form and custom shortcuts (`gantt.ext.keyboardNavigation.addShortcut`); dependency links are created via the inline predecessors editor. Keyboard operation requires the `keyboard_navigation` plugin (by design; documented). |
| **2.1.2** No Keyboard Trap | Supports | Focus is never trapped unintentionally; the lightbox modal focus-trap is intentional and releases on Esc, returning focus to the grid. Requires the `keyboard_navigation` plugin for modal focus management. |
| **2.1.4** Character Key Shortcuts | Supports | Shortcuts use modifier keys (Ctrl/Cmd + key); there are no single-character key shortcuts requiring a disable/remap mechanism. |
| **2.2.1** Timing Adjustable | Supports | The product imposes no time limits on user interaction. |
| **2.2.2** Pause, Stop, Hide | Supports | No auto-updating, moving, blinking or scrolling content lasting more than 5 seconds. |
| **2.3.1** Three Flashes or Below Threshold | Supports | No content flashes more than three times per second. |
| **2.4.1** Bypass Blocks | Not Applicable | Applies to full web pages with repeated blocks. The Gantt is a single embedded component; skip links and landmark structure are the host application's responsibility. |
| **2.4.2** Page Titled | Not Applicable | The host application owns the page `<title>`. |
| **2.4.3** Focus Order | Supports | Focus order matches the logical/visual order; on lightbox close, focus returns to the originating grid row. Requires the `keyboard_navigation` plugin. |
| **2.4.4** Link Purpose (In Context) | Not Applicable | The UI contains no navigational hyperlinks. "Links" in a Gantt are task **dependencies** (data relationships), exposed as human-readable text in the Predecessors/Successors columns. |
| **2.5.1** Pointer Gestures | Supports | No multipoint or path-based gestures are required; drag operations use a single pointer and all have non-drag alternatives (see 2.5.7). |
| **2.5.2** Pointer Cancellation | Supports | Functions trigger on the up-event; a drag can be aborted (return to origin / Esc) before completion. |
| **2.5.3** Label in Name | Supports | Controls' accessible names include their visible label text; icon buttons (grid `+`, tree toggle) expose `role="button"` + `aria-label`. |
| **2.5.4** Motion Actuation | Not Applicable | No functionality is operated by device or user motion. |
| **3.1.1** Language of Page | Not Applicable | The host application owns `<html lang>`. (Bundled sample pages set `lang="en"` as good practice.) |
| **3.2.1** On Focus | Supports | Moving focus to a component does not trigger an unexpected change of context. |
| **3.2.2** On Input | Supports | Changing a form control's value does not automatically cause an unexpected change of context. |
| **3.2.6** Consistent Help (2.2 only) | Not Applicable | The widget provides no help mechanism; consistent placement of help is a host-application concern. |
| **3.3.1** Error Identification | Not Applicable | The product has no built-in error-indication design. The built-in date/time editors auto-correct out-of-range input by save time (`onLightboxSave`), so no invalid state is surfaced. If an integrator adds custom validation, identifying the field in error is the integrator's responsibility. |
| **3.3.2** Labels or Instructions | Supports | Lightbox sections are labelled ("Description", "Type", "Time period") and every form control exposes an accessible name. |
| **3.3.7** Redundant Entry (2.2 only) | Not Applicable | The widget has no multi-step process that re-requests previously entered information. |
| **4.1.1** Parsing | Supports | Per the September 2023 errata, this criterion is always supported for WCAG 2.0/2.1, EN 301 549 and Revised 508. It is obsolete/removed in WCAG 2.2. |
| **4.1.2** Name, Role, Value | Supports | Comprehensive roles/names/states: a named `treegrid` with counts/indices; rows carry type/level/expanded/selected; the lightbox is a named `role="dialog"` + `aria-modal="true"`; quick-info is a named non-modal dialog; resource cells use real grid semantics; all lightbox controls are named. Requires ARIA output (on by default). |

### Table 2: Success Criteria, Level AA

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| **1.2.4** Captions (Live) | Not Applicable | No live multimedia. |
| **1.2.5** Audio Description (Prerecorded) | Not Applicable | No prerecorded video. |
| **1.3.4** Orientation | Supports | Content is not restricted to a single display orientation. |
| **1.3.5** Identify Input Purpose | Not Applicable | The product's forms collect task/scheduling data, not the user's own personal information covered by the WCAG input-purpose list. |
| **1.4.3** Contrast (Minimum) | Supports | The dedicated `contrast-black` / `contrast-white` themes and the built-in **dark** theme meet it out of the box, and for the default (terrace) light skin `gantt.config.accessibility.increase_contrast` (default off) raises it to AA. Meeting the criterion requires selecting one of these themes or enabling `increase_contrast`. |
| **1.4.4** Resize Text | Supports | Text can be resized to 200% without loss of content or functionality; the grid and bars do not break. |
| **1.4.5** Images of Text | Supports | Text is rendered as real text, not images of text. |
| **1.4.10** Reflow | Supports | Content reflows/scrolls at 400% zoom. As a data grid + timeline, two-dimensional layout is intrinsic to the content, for which the criterion permits two-dimensional scrolling. |
| **1.4.11** Non-text Contrast | Supports | The focus indicator is a 2px inset ring in the theme primary colour (visible on default and contrast themes). Under `forced-colors: active`, bars retain their fill (`forced-color-adjust:none`) with a `CanvasText` border, and links/histogram recolour to `CanvasText`. |
| **1.4.12** Text Spacing | Supports | Applying WCAG text-spacing overrides does not clip text in grid cells or on bars. |
| **1.4.13** Content on Hover or Focus | Supports | Tooltips are hoverable, persistent, and dismissible with `Esc` without moving the pointer. |
| **2.4.5** Multiple Ways | Not Applicable | Applies to locating pages within a set of web pages; out of scope for a single embedded component (host-application concern). |
| **2.4.6** Headings and Labels | Supports | Column headers have descriptive accessible names; lightbox sections are labelled and every control within them exposes an accessible name. |
| **2.4.7** Focus Visible | Supports | A clear 2px focus ring is shown on focusable grid elements and controls. Grid focus requires the `keyboard_navigation` plugin. |
| **2.4.11** Focus Not Obscured (Minimum) (2.2 only) | Supports | A focused element is not hidden behind sticky headers, toolbars or scrollbars. |
| **2.5.7** Dragging Movements (2.2 only) | Supports | Every drag operation has a non-drag alternative: dates/duration via the lightbox form; move/resize/progress via keyboard shortcuts (`addShortcut`); dependency links via the inline predecessors editor. Move/resize/progress shortcuts require the `keyboard_navigation` plugin plus a small documented customization. |
| **2.5.8** Target Size (Minimum) (2.2 only) | Supports | Interactive targets meet ≥24×24 CSS px: tree toggle icon 24×35, column resizer hit-area 24×36, task resize handles 24×24 (visual unchanged; hit-area enlarged). |
| **3.1.2** Language of Parts | Not Applicable | The widget does not mix languages within its content; language is host-owned. |
| **3.2.3** Consistent Navigation | Not Applicable | Applies across a set of web pages; host-application concern. |
| **3.2.4** Consistent Identification | Supports | Components with the same function are identified consistently throughout the widget. |
| **3.3.3** Error Suggestion | Not Applicable | The product has no built-in error indication (see 3.3.1), so there is no detected input error for which to suggest a correction. Any custom validation added by an integrator would own the error-suggestion text. |
| **3.3.4** Error Prevention (Legal, Financial, Data) | Supports | Task deletion is reversible/guarded - a confirmation dialog is shown before deletion, and actions are undoable. |
| **3.3.8** Accessible Authentication (Minimum) (2.2 only) | Not Applicable | The product performs no authentication. |
| **4.1.3** Status Messages | Supports | A visually-hidden `aria-live` region announces dynamic changes without moving focus: drag/resize/progress results and sort-direction changes ("Sorted by <column>, ascending"). Requires ARIA output (on by default). |

## Revised Section 508 report

WCAG-mapped provisions are answered in the WCAG 2.x report above and referenced here. Chapter 4 (Hardware)
is Not Applicable - DHTMLX Gantt is a software component with no hardware or physical controls.

### Chapter 3: Functional Performance Criteria

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| 302.1 Without Vision | Supports | Operable with a screen reader (NVDA/JAWS) through the treegrid, text labels, live-region announcements and the keyboard model (requires the `keyboard_navigation` plugin). See WCAG 1.3.1, 4.1.2, 4.1.3. |
| 302.2 With Limited Vision | Supports | Zoom to 400%, text resize, text-spacing and forced-colors are supported. AA contrast is met by the built-in dark and contrast themes out of the box, and by the default skin with `accessibility.increase_contrast` enabled (see 1.4.3). |
| 302.3 Without Perception of Color | Supports | Non-colour cues are built in and enabled via `accessibility.colorblind_friendly`; verified under colour-blindness simulation (see 1.4.1). |
| 302.4 Without Hearing | Supports | No information is conveyed by sound. |
| 302.5 With Limited Hearing | Supports | No information is conveyed by sound. |
| 302.6 Without Speech | Supports | No speech input is required to operate the product. |
| 302.7 With Limited Manipulation | Supports | Fully keyboard-operable (requires the `keyboard_navigation` plugin); pointer targets meet ≥24×24 px; no path-based gestures. |
| 302.8 With Limited Reach and Strength | Supports | Operable by keyboard; no physical reach, force or timing requirements. |
| 302.9 With Limited Language, Cognitive, and Learning Abilities | Supports | Clear, consistent labels; reversible actions (undo, delete confirmation); customizable ARIA descriptions. |

### Chapter 5: Software

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| 501.1 Scope - Incorporation of WCAG 2.0 AA | See WCAG 2.x section | See the WCAG 2.x report above. |
| 502 Interoperability with Assistive Technology | Not Applicable | Applies to non-web (platform) software. DHTMLX Gantt is web content that exposes standard DOM/ARIA to the browser accessibility tree; interoperability is covered by the WCAG results (Clause 9 / 501.1). |
| 503 Applications | Not Applicable | Applies to non-web platform software; the product is web content. User-preference respect (`prefers-reduced-motion`, `forced-colors`) is nonetheless implemented. |
| 504.2 Content Creation or Editing | Not Applicable | DHTMLX Gantt is not an authoring tool for web content (it edits project/scheduling data, not accessibility-relevant web content). |

### Chapter 6: Support Documentation and Services

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| 602.2 Accessibility and Compatibility Features | Supports | The documentation describes the product's accessibility features: the [Accessibility](guides/accessibility.md) guide covers WAI-ARIA output, keyboard navigation and the high-contrast themes, together with the related API (`gantt.ext.accessibility`, `gantt.config.accessibility`). |
| 602.3 Electronic Support Documentation | Supports (see WCAG 2.x section) | The documentation site is delivered as web content and meets WCAG 2.2 AA (in-content links carry a non-colour underline, the active menu item a shape cue, and colour contrast meets AA). Verified with axe plus a manual screen-reader pass. |
| 602.4 Alternate Formats for Non-Electronic Support Documentation | Not Applicable | Documentation is delivered electronically only; there are no non-electronic (print) support documents. |
| 603.2 Information on Accessibility and Compatibility Features | Supports | The product's accessibility features are documented publicly (Accessibility guide) and can be provided by the support channel on request. |
| 603.3 Accommodation of Communication Needs | Supports | Support is provided over a text-based email channel; users interact through their own assistive technology. |

## EN 301 549 report

Clause 9 (Web) maps directly to the WCAG 2.x report above and is the substantive assessment for this web
product. Telephony, video, and hardware clauses (Clauses 6, 7, 8, 13) are Not Applicable.

### Clause 4: Functional Performance Statements

These mirror the Section 508 Chapter 3 results (same conclusions).

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| 4.2.1 Usage without vision | Supports | See 508 302.1 (screen-reader operable via treegrid, labels and live region; requires the `keyboard_navigation` plugin). |
| 4.2.2 Usage with limited vision | Supports | See 508 302.2 (AA contrast via the built-in dark/contrast themes or `accessibility.increase_contrast`; zoom/reflow supported). |
| 4.2.3 Usage without perception of colour | Supports | See 508 302.3 (built-in non-colour cues via `accessibility.colorblind_friendly`). |
| 4.2.4 Usage without hearing | Supports | No information conveyed by sound. |
| 4.2.5 Usage with limited hearing | Supports | No information conveyed by sound. |
| 4.2.6 Usage with no or limited vocal capability | Supports | No speech input required. |
| 4.2.7 Usage with limited manipulation or strength | Supports | Keyboard-operable; ≥24px targets; no gestures. |
| 4.2.8 Usage with limited reach | Supports | No physical reach requirements (software component). |
| 4.2.9 Minimize photosensitive seizure triggers | Supports | No flashing content (see 2.3.1). |
| 4.2.10 Usage with limited cognition, language or learning | Supports | Clear consistent labels; reversible actions. |
| 4.2.11 Privacy | Supports | Accessibility features use the same UI as everyone else; no separate, less-private mode. |

### Clause 5: Generic Requirements

**Mostly Not Applicable.** Clause 5 addresses closed functionality and hardware-style requirements. DHTMLX
Gantt is open web software that works with the platform/browser assistive technology, so the
closed-functionality sub-clauses, biometrics (5.3), operable parts (5.5), and locking/toggle-control status
(5.6) are Not Applicable. Where a generic requirement is met through normal AT support, it is covered by
Clause 9 (Web) / the WCAG results.

### Clause 9: Web

**See the WCAG 2.x section.** Clauses 9.1.1.1-9.4.1.3 map to the WCAG 2.2 Level A/AA results in Tables 1
and 2 above.

### Clause 11: Software

**Not Applicable (assessed under Clause 9).** DHTMLX Gantt is web content evaluated under Clause 9 (Web);
it is not non-web software. The WCAG-mapped software provisions (11.1.1.1-11.4.1.3) are covered by the WCAG
2.x results. 11.8.2 (Accessible content creation) is Not Applicable - the product is not an authoring tool.

### Clause 12: Documentation and Support Services

| Criteria | Conformance level | Remarks and explanations |
|---|---|---|
| 12.1.1 Accessibility and compatibility features | Supports | The [Accessibility](guides/accessibility.md) guide documents the product's a11y features (WAI-ARIA output, keyboard navigation, high-contrast themes) and the `gantt.ext.accessibility` API. |
| 12.1.2 Accessible documentation | Supports (see WCAG 2.x section) | The documentation site meets WCAG 2.2 AA; verified with axe plus a manual screen-reader pass (see 508 602.3). |
| 12.2.2 Information on accessibility and compatibility features | Supports | Accessibility features are documented publicly and can be surfaced by support on request. |
| 12.2.3 Effective communication | Supports | Support is provided over a text-based email channel; users interact through their own assistive technology. |
| 12.2.4 Accessible documentation | Supports (see WCAG 2.x section) | Same basis as 12.1.2 - the documentation site meets WCAG 2.2 AA. |

## Legal disclaimer

This report is provided for informational purposes only and describes the accessibility of the named
product version as of the report date. It is provided "as is", without warranty of any kind, and does not
constitute a contractual commitment or guarantee. Accessibility support may change in subsequent releases,
and results apply to the evaluated configuration. "VPAT" and "Voluntary Product Accessibility Template" are
registered service marks of the Information Technology Industry Council (ITI).
