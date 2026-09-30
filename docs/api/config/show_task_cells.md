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

### Related API

- [timeline_cell_class](api/template/timeline_cell_class.md)

