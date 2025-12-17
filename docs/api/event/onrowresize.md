---
sidebar_label: onRowResize
title: onRowResize event
description: "fires when the user is dragging the border of the row to resize the row height"
---

# onRowResize

### Description

@short: Fires when the user is dragging the border of the row to resize the row height

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object
- `currentHeight` - (required) *number* - the current height of the row

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> is now <b>${currentHeight}px</b> height`
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
- added in v7.1

