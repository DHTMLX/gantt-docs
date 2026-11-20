---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes config
description: "enables WAI-ARIA support to make the component recognizable for screen readers"
---

# wai_aria_attributes

### Description

@short: Enables WAI-ARIA support to make the component recognizable for screen readers

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**Default value:** undefined. ARIA output is enabled by default through
[`gantt.config.accessibility.aria`](api/config/accessibility.md).

### Details

An explicit `true` or `false` takes precedence over `gantt.config.accessibility.aria`. Use
`gantt.config.accessibility` for new configurations.

Added in version 4.1.

### Related Guides
- [Accessibility](guides/accessibility.md#wai-aria-attributes)
