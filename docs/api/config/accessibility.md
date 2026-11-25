---
sidebar_label: accessibility
title: accessibility config
description: "Controls ARIA output, announcements, contrast and non-colour cues"
---

# accessibility

### Description

@short: Controls ARIA output, announcements, grid semantics, contrast and non-colour cues

@signature: accessibility: object

### Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `aria` | boolean | `true` | Emit ARIA attributes. An explicit [wai_aria_attributes](api/config/wai_aria_attributes.md) value takes precedence. |
| `announcements` | boolean | `true` | Enable the live regions used by `gantt.ext.accessibility.announce()`. ARIA output must also be enabled. |
| `grid_semantics` | boolean | `true` | Include grid position information such as row and column counts and indices. |
| `colorblind_friendly` | boolean | `false` | Add patterns and boundaries to specific task and resource indicators. |
| `increase_contrast` | boolean | `false` | Increase text contrast in the default Terrace skin. |

### Example

~~~js
gantt.config.accessibility.increase_contrast = true;
gantt.config.accessibility.colorblind_friendly = true;
gantt.init("gantt_here");
~~~

### Details

Call `gantt.render()` after changing the visual options on an initialized chart. Use
`gantt.ext.accessibility.isEnabled()` to check the resolved ARIA setting.

### Related Guides

- [Accessibility](guides/accessibility.md)

### Change log

- Added in v10.1
