---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "срабатывает после изменения высоты строки"
---

# onAfterRowResize

### Description

@short: Срабатывает после изменения высоты строки

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `task` - (required) *Task* - объект задачи
- `oldHeight` - (required) *number* - предыдущая высота строки
- `newHeight` - (required) *number* - обновленная высота строки

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> была высотой <b>${oldHeight}px</b>.<br>
    <b>${item.text}</b> теперь имеет высоту <b>${newHeight}px</b>`);
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)

### Change log
- добавлено в версии v7.1

