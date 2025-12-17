---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "shows the background grid in the empty timeline"
---

# timeline_placeholder

### Description

@short: Shows the background grid in the empty timeline

@signature: timeline_placeholder: boolean

### Example

~~~jsx
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");
~~~

### Related samples
- [Empty Gantt with placeholder grid and timeline](https://docs.dhtmlx.com/gantt/samples/08_api/23_empty_gantt_with_placeholder_views.html)

### Details

The background grid will appear in the timeline if there are no tasks loaded into the Gantt:

![background grid](/img/background_grid_in_empty_timeline.png)

or if the rows with tasks don't fill the whole timeline:

![background grid](/img/background_grid_in_timeline.png)

To highlight columns and cells in the background grid, use the [`timeline_cell_class`](api/template/timeline_cell_class.md) template:

~~~js
gantt.templates.timeline_cell_class = function (task, date) (
    if (!gantt.isWorkTime(( date: date, task: task ))) (
        return "weekend";
    )
);
~~~

For background rows, a temporary task object will be added to the template. The object can be identified by its id:

~~~js
if(task.id === "timeline_placeholder_task")(
    ...
)
~~~

### Related API
- [`timeline_cell_class`](api/template/timeline_cell_class.md)

### Change log
- added in v8.0

