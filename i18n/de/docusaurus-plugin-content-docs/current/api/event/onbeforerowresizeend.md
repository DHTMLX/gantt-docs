---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "Wird unmittelbar vor dem Abschluss des Prozesses zur Größenänderung der Zeilenhöhe ausgelöst"
---

# onBeforeRowResizeEnd

### Description

@short: Wird unmittelbar vor dem Abschluss des Prozesses zur Größenänderung der Zeilenhöhe ausgelöst

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - die Aufgaben-ID
- `task` - (required) *Task* - das Aufgabenobjekt selbst
- `newHeight` - (required) *number* - die aktualisierte Höhe der Zeile

### Returns
- ` result` - (boolean) - gibt an, ob die Standardaktion des Events ausgeführt werden soll (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> ist jetzt <b>${newHeight}px</b> hoch`);
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
- eingeführt in Version 7.1

