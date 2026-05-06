---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "срабатывает до завершения изменения высоты строки"
---

# onBeforeRowResizeEnd

### Description

@short: Срабатывает до завершения изменения высоты строки

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - идентификатор задачи
- `task` - (required) *Task* - объект задачи
- `newHeight` - (required) *number* - новая высота строки

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (true) или отменено (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> is now <b>${newHeight}px</b> height`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- added in v7.1