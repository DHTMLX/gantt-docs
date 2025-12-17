---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "fires before the user starts to resize the row height by drag-and-drop"
---

# onBeforeRowResize

### Description

@short: Fires before the user starts to resize the row height by drag-and-drop

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` param` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`Start resizing <b>${task.text}</b>`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

The event is blockable. Returning *false* will prevent the row height from being resized.

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- added in v7.1

