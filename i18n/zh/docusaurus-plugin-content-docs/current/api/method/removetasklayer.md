---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "移除与任务相关的指定图层"
---

# removeTaskLayer

:::info
此功能仅在 PRO 版中可用。
:::

### Description

@short: 移除与任务相关的指定图层

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* - 将在该图层中显示的 DOM 元素

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