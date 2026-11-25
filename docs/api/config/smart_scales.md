---
sidebar_label: smart_scales
title: smart_scales config
description: "specifies that only visible part of the time scale is rendered on the screen"
---

# smart_scales

### Description

@short: Specifies that only visible part of the time scale is rendered on the screen

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Default value:** true

### Details

added in version 4.1

Usage of this config significantly speeds up chart rendering if you have a very long time scale.

:::note
[Sticky scale labels](guides/configuring-time-scale.md#sticky-labels) require **smart_scales** to be enabled.

:::

### Related Guides
- [Performance: Ways to Improve](guides/performance.md#common-techniques)
- [Configuring the Time Scale: Sticky labels](guides/configuring-time-scale.md#sticky-labels)
