---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd Ereignis
description: "Wird ausgelöst, bevor das Ändern der Zeilenhöhe abgeschlossen ist"
---

# onBeforeRowResizeEnd

### Description

@short: Wird ausgelöst, bevor das Ändern der Zeilenhöhe abgeschlossen ist

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - die Task-ID
- `task` - (required) *Task* - das Task-Objekt
- `newHeight` - (required) *number* - die neue Höhe der Zeile

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> hat jetzt eine Höhe von <b>${newHeight}px</b>`);
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
- hinzugefügt in v7.1