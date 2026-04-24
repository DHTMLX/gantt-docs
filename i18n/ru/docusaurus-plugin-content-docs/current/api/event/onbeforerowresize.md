---
sidebar_label: onBeforeRowResize
title: Событие onBeforeRowResize
description: "Срабатывает до того, как пользователь начнет изменять высоту строки перетаскиванием"
---

# onBeforeRowResize

### Description

@short: Срабатывает до того, как пользователь начнет изменять высоту строки перетаскиванием

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - объект Task

### Returns
- `param` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`Start resizing <b>${task.text}</b>`);
    return true;
});
~~~

### Related samples
- [Строки, изменяемые по высоте, в grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

Событие можно заблокировать. Возвращение значения <b>false</b> предотвратит изменение высоты строки.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- добавлено в версии 7.1