---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "当timeline为空时显示背景grid"
---

# timeline_placeholder

### Description

@short: 当timeline为空时显示背景grid

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

当Gantt中没有加载任何任务时，timeline中会显示背景grid:

![background grid](/img/background_grid_in_empty_timeline.png)

如果包含任务的行没有覆盖整个timeline，也会显示背景grid:

![background grid](/img/background_grid_in_timeline.png)

为了突出显示背景grid中的列和单元格，可以使用 [timeline_cell_class](api/template/timeline_cell_class.md) 模板:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime({ date: date, task: task })) {
        return "weekend";
    }
};
~~~

对于背景行，会传入一个临时的task对象给模板。可以通过其id来识别该对象:

~~~js
if(task.id === "timeline_placeholder_task"){
    ...
}
~~~

### Related API
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Change log
- added in v8.0

