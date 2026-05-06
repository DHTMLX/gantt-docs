---
sidebar_label: onRowResize
title: onRowResize событие
description: "срабатывает, когда пользователь перетаскивает границу строки для изменения высоты строки"
---

# onRowResize

### Description

@short: Срабатывает, когда пользователь перетаскивает границу строки для изменения высоты строки

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи
- `task` - (обязателен) *Task* - объект задачи
- `currentHeight` - (обязателен) *number* - текущая высота строки

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> is now <b>${currentHeight}px</b> height`
    });
});
~~~

### Related samples
- [Изменяемые строки в grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- добавлено в v7.1