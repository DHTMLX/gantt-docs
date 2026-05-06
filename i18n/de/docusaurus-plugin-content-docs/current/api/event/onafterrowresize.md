---
sidebar_label: onAfterRowResize
title: onAfterRowResize Ereignis
description: "Wird ausgelöst, nachdem die Zeilenhöhe angepasst wurde"
---

# onAfterRowResize

### Description

@short: Wird ausgelöst, nachdem die Zeilenhöhe abgeschlossen wurde

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID
- `task` - (erforderlich) *Task* - das Element-Objekt
- `oldHeight` - (erforderlich) *number* - die alte Höhe der Zeile
- `newHeight` - (erforderlich) *number* - die neue Höhe der Zeile

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> was <b>${oldHeight}px</b> height.<br>
    <b>${item.text}</b> is now <b>${newHeight}px</b> height`);
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
- hinzugefügt in v7.1