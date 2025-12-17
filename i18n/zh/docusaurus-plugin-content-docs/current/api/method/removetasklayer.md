---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "移除与任务相关的特定图层"
---

# removeTaskLayer
:::info
 此功能仅包含在PRO版本中。
:::
### Description

@short: 移除与任务相关的特定图层

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        表示要移除图层的DOM元素

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
- [时间线区域中的自定义元素](guides/baselines.md)

