---
sidebar_label: removeTaskLayer
title: removeTaskLayer method
description: "특정 작업과 연관된 레이어를 제거합니다"
---

# removeTaskLayer
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 작업과 연관된 레이어를 제거합니다

@signature: removeTaskLayer: (layerId: string | number) =\> void

### Parameters

- `layerId` - (required) *string | number* -        제거할 레이어를 나타내는 DOM 요소

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
- [타임라인 영역의 커스텀 요소](guides/baselines.md)

