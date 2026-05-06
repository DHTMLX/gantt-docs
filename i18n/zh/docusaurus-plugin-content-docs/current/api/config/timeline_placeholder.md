---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "在空的时间线中显示背景网格"
---

# timeline_placeholder

### Description

@short: 在空的时间线中显示背景网格

@signature: timeline_placeholder: boolean

### Example

~~~jsx
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");
~~~

### Related samples
- [带占位网格和时间线的空甘特图](https://docs.dhtmlx.com/gantt/samples/08_api/23_empty_gantt_with_placeholder_views.html)

### Details

当 Gantt 中未加载任何任务时，背景网格将出现在时间线中：

![背景网格](/img/background_grid_in_empty_timeline.png)

或如果带有任务的行没有填满整个时间线：

![背景网格](/img/background_grid_in_timeline.png)

要在背景网格中突出显示列和单元格，请使用 [`timeline_cell_class`](api/template/timeline_cell_class.md) 模板：

~~~js
gantt.templates.timeline_cell_class = function (task, date) (
    if (!gantt.isWorkTime(( date: date, task: task ))) (
        return "weekend";
    )
);
~~~

对于背景行，模板中将添加一个临时任务对象。可以通过它的 id 进行标识：

~~~js
if(task.id === "timeline_placeholder_task")(
    ...
)
~~~

### Related API
- [`timeline_cell_class`](api/template/timeline_cell_class.md)

### Change log
- 在 v8.0 中新增