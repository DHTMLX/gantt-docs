---
sidebar_label: static_background
title: static_background config
description: "generates a background image for the timeline area instead of rendering actual columns' and rows' lines"
---

# static_background
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Generates a background image for the timeline area instead of rendering actual columns' and rows' lines

@signature: static_background: boolean

### Example

~~~jsx
gantt.config.static_background = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

Since v6.2 this config renders PNG background AND any cells that have CSS class attached to them via the [timeline_cell_class](api/template/timeline_cell_class.md) template function.

If you need to revert to v6.1 behavior (that is to render just the background image), use the [static_background_cells](api/config/static_background_cells.md) config:

~~~js
gantt.config.static_background_cells = false;
~~~

### Related API
- [static_background_cells](api/config/static_background_cells.md)

### Related Guides
- [Performance: Ways to Improve](guides/performance.md)

