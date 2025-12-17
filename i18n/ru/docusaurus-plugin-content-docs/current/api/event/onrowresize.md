---
sidebar_label: onRowResize
title: onRowResize event
description: "срабатывает, когда пользователь перетаскивает границу строки для изменения её высоты"
---

# onRowResize

### Description

@short: Срабатывает, когда пользователь перетаскивает границу строки для изменения её высоты

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи
- `currentHeight` - (required) *number* - текущая высота строки

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> теперь имеет высоту <b>${currentHeight}px</b>`
    });
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- добавлено в версии v7.1

