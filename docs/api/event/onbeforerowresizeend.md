---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "fires before resizing of the row height is completed"
---

# onBeforeRowResizeEnd

### Description

@short: Fires before resizing of the row height is completed

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - the task id
- `task` - (required) *Task* - the task object
- `newHeight` - (required) *number* - the new height of the row

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> is now <b>${newHeight}px</b> height`);
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
- added in v7.1

