---
sidebar_label: show_task_cells
title: show_task_cells config
description: "enables/disables displaying column borders in the chart area"
---

# show_task_cells

### Description

@short: Enables/disables displaying column borders in the chart area

@signature: show_task_cells: boolean

### Example

~~~jsx
//hides column borders in the time scale
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

When the property is set to *'false'*, it disables rendering of individual cells - renders just rows.

The option is also used together with [static_background](api/config/static_background.md). In the static background mode, Gantt draws the timeline grid as a background image and renders only the cells that have a custom CSS class or content as cells. If *show_task_cells* is set to *'false'*, these cells are not rendered either.

### Related API
- [static_background](api/config/static_background.md)
- [static_background_cells](api/config/static_background_cells.md)
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Related Guides
- [Performance: Ways to Improve](guides/performance.md#working-with-a-large-date-range)
