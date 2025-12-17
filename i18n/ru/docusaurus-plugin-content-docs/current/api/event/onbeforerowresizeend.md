---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "срабатывает непосредственно перед завершением процесса изменения высоты строки"
---

# onBeforeRowResizeEnd

### Description

@short: Срабатывает непосредственно перед завершением процесса изменения высоты строки

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number|string* - идентификатор задачи
- `task` - (required) *Task* - объект задачи
- `newHeight` - (required) *number* - обновлённая высота строки

### Returns
- ` result` - (boolean) - указывает, должно ли выполняться действие по умолчанию (<b>true</b>) или быть остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> теперь высотой <b>${newHeight}px</b>`);
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
- введён в версии v7.1

