---
sidebar_label: onRowResize
title: onRowResize event
description: "Wird ausgelöst, wenn der Benutzer die Zeilengrenze zieht, um die Höhe zu ändern"
---

# onRowResize

### Description

@short: Wird ausgelöst, wenn der Benutzer die Zeilengrenze zieht, um die Höhe zu ändern

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `task` - (required) *Task* - das Aufgabenobjekt
- `currentHeight` - (required) *number* - die aktuelle Höhe der Zeile

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> ist jetzt <b>${currentHeight}px</b> hoch`
    });
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- hinzugefügt in v7.1

