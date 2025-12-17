---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "removes the specified layer related to a task"
---

# removeTaskLayer

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Removes the specified layer related to a task

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        a DOM element that will be displayed in the layer

### Example

~~~jsx
var layer_id = gantt.addTaskLayer(function draw_deadline(task) {
    if (task.deadline) {
        var el = document.createElement('div');
        el.className = 'deadline';
        var sizes = gantt.getTaskPosition(task, task.deadline);

        el.style.left = sizes.left + 'px';
        el.style.top = sizes.top + 'px';

        el.setAttribute('title', gantt.templates.task_date(task.deadline));
        return el;
    }
    return false;
});
//...
gantt.removeTaskLayer(layer_id);/*!*/
gantt.render();
~~~

### Related API
- [addTaskLayer](api/method/addtasklayer.md)

### Related Guides
- [Custom Elements in Timeline Area](guides/baselines.md)

