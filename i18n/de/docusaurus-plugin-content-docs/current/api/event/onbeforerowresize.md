---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "Wird ausgelöst, bevor der Benutzer beginnt, die Zeilenhöhe per Drag-and-Drop anzupassen"
---

# onBeforeRowResize

### Description

@short: Wird ausgelöst, bevor der Benutzer beginnt, die Zeilenhöhe per Drag-and-Drop anzupassen

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` param` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`Starte Größenänderung von <b>${task.text}</b>`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

Das Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass die Zeilenhöhe angepasst wird.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- in Version 7.1 hinzugefügt