---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity config
description: "specifies the speed of scrolling the gantt by the mouse wheel"
---

# wheel_scroll_sensitivity

### Description

@short: Specifies the speed of scrolling the gantt by the mouse wheel

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// scroll at double-speed
gantt.config.wheel_scroll_sensitivity = 2;

// scroll at half-speed 
gantt.config.wheel_scroll_sensitivity = 0.5;

// or scroll at different speeds on different axes
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

**Default value:** undefined

### Details

The object configuration has these properties:

- **x** - (*number*) - the horizontal speed
- **y** - (*number*) - the vertical speed

### Change log
- added in v7.0.11
