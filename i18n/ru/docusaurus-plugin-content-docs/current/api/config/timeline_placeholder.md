---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "отображает фоновую grid, когда timeline пустой"
---

# timeline_placeholder

### Description

@short: Отображает фоновую grid, когда timeline пустой

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

Фоновая grid отображается в timeline, когда в Gantt не загружены задачи:

![background grid](/img/background_grid_in_empty_timeline.png)

Она также появляется, если строки с задачами не покрывают весь timeline:

![background grid](/img/background_grid_in_timeline.png)

Чтобы выделить колонки и ячейки в фоновой grid, используйте шаблон [timeline_cell_class](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime({ date: date, task: task })) {
        return "weekend";
    }
};
~~~

Для фоновых строк в шаблон передается временный объект задачи. Этот объект можно распознать по его id:

~~~js
if(task.id === "timeline_placeholder_task"){
    ...
}
~~~

### Related API
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Change log
- добавлено в v8.0

