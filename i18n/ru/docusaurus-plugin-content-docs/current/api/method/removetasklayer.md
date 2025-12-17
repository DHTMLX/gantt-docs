---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "удаляет конкретный слой, связанный с задачей"
---

# removeTaskLayer
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Удаляет конкретный слой, связанный с задачей

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        DOM элемент, представляющий слой, который необходимо удалить

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
- [Пользовательские элементы в области временной шкалы](guides/baselines.md)

