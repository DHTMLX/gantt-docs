---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "sets the minimum width (in pixels) that the Gantt chart can take in the horizontal 'autosize' mode"
---

# autosize_min_width

### Description

@short: Sets the minimum width (in pixels) that the Gantt chart can take in the horizontal 'autosize' mode

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Default value:** zero (0)

### Details

Horizontal 'autosize' mode is enabled by the [autosize](api/config/autosize.md) option.

### Related API
- [autosize](api/config/autosize.md)

