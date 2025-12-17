---
sidebar_label: link_radius
title: link_radius config
description: "sets the radius for rounding corners of link lines in the timeline"
---

# link_radius

### Description

@short: Sets the radius for rounding corners of link lines in the timeline

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Default value:** 4

### Details

The property defines the radius for rounding the corners of link lines in the timeline. If the value is less than or equal to 1, rounding is disabled. If a link segment's length is not sufficient for the specified radius, rounding will not be applied to that segment.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- added in v9.0

