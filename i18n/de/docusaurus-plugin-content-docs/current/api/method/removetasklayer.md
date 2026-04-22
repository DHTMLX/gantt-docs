---
sidebar_label: removeTaskLayer
title: removeTaskLayer Methode
description: "entfernt die angegebene Layer, die mit einer Aufgabe zusammenhängt"
---

# removeTaskLayer

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Entfernt die angegebene Layer, die mit einer Aufgabe zusammenhängt

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (erforderlich) *string | number* -        ein DOM-Element, das im Layer angezeigt wird

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