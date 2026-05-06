---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "показывает фоновую сетку в пустом таймлайне"
---

# timeline_placeholder

### Description

@short: Показывает фоновую сетку в пустом таймлайне

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

Фоновая сетка будет отображаться в таймлайне, если в Gantt не загружены задачи:

![Фоновая сетка](/img/background_grid_in_empty_timeline.png)

или если строки с задачами не занимают всю таймлайн:

![Фоновая сетка](/img/background_grid_in_timeline.png)

Чтобы выделить столбцы и клетки в фоновую сетку, используйте шаблон [`timeline_cell_class`](api/template/timeline_cell_class.md):

~~~js
gantt.templates.timeline_cell_class = function (task, date) (
    if (!gantt.isWorkTime(( date: date, task: task ))) (
        return "weekend";
    )
);
~~~

Для фоновых строк в шаблон будет добавлен временный объект задачи. Объект можно идентифицировать по его id:

~~~js
if(task.id === "timeline_placeholder_task")(
    ...
)
~~~

### Related API
- [`timeline_cell_class`](api/template/timeline_cell_class.md)

### Change log
- добавлено в v8.0