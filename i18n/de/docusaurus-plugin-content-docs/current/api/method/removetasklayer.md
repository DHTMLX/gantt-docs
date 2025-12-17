---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "entfernt eine spezifische Ebene, die mit einer Aufgabe verknüpft ist"
---

# removeTaskLayer
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Entfernt eine spezifische Ebene, die mit einer Aufgabe verknüpft ist

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        ein DOM-Element, das die zu entfernende Ebene repräsentiert

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
- ["Benutzerdefinierte Elemente im Timeline-Bereich"](guides/baselines.md)

