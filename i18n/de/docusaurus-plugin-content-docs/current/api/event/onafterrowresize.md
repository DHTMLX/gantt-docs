---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "Wird ausgelöst, nachdem die Zeilenhöhe geändert wurde"
---

# onAfterRowResize

### Description

@short: Wird ausgelöst, nachdem die Zeilenhöhe geändert wurde

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `task` - (required) *Task* - das Objekt des Elements
- `oldHeight` - (required) *number* - die vorherige Höhe der Zeile
- `newHeight` - (required) *number* - die aktualisierte Höhe der Zeile

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> hatte eine Höhe von <b>${oldHeight}px</b>.<br>
    <b>${item.text}</b> hat jetzt eine Höhe von <b>${newHeight}px</b>`);
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

