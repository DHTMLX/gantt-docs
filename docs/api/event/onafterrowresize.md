---
sidebar_label: onAfterRowResize
title: onAfterRowResize event
description: "fires after resizing of the row height is finished"
---

# onAfterRowResize

### Description

@short: Fires after resizing of the row height is finished

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the item object
- `oldHeight` - (required) *number* - the old height of the row
- `newHeight` - (required) *number* - the new height of the row

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
- added in v7.1

