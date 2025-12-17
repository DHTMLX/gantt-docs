---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "Wird ausgelöst, kurz bevor der Benutzer beginnt, die Zeilenhöhe per Drag-and-Drop zu ändern."
---

# onBeforeRowResize

### Description

@short: Wird ausgelöst, kurz bevor der Benutzer beginnt, die Zeilenhöhe per Drag-and-Drop zu ändern.

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - Das Task-Objekt

### Returns
- ` param` - (boolean) - Gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Dieses Event kann blockiert werden. Wird *false* zurückgegeben, wird die Änderung der Zeilenhöhe verhindert.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- hinzugefügt in v7.1

