---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "срабатывает после завершения изменения высоты строки"
---

# onAfterRowResize

### Description

@short: Срабатывает после завершения изменения высоты строки

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи
- `oldHeight` - (required) *number* - предыдущая высота строки
- `newHeight` - (required) *number* - новая высота строки

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> was <b>${oldHeight}px</b> height.<br>
    <b>${item.text}</b> is now <b>${newHeight}px</b> height`);
});
~~~

### Related samples
- [Изменяемые строки в grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)

### Change log
- добавлено в версии 7.1