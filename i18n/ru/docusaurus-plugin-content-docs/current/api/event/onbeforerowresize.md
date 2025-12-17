---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "срабатывает непосредственно перед тем, как пользователь начинает изменять высоту строки с помощью drag-and-drop"
---

# onBeforeRowResize

### Description

@short: Срабатывает непосредственно перед тем, как пользователь начинает изменять высоту строки с помощью drag-and-drop

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` param` - (boolean) - указывает, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`Начало изменения размера <b>${task.text}</b>`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

Это событие можно заблокировать. Возврат *false* остановит изменение высоты строки.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- добавлено в версии v7.1

