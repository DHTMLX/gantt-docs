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

When the property is set to *'false'*, it disables rendering of individial cells - renders just rows. It can be used to increase the performance, especially if you are displaying a big amount of tasks in the chart.
