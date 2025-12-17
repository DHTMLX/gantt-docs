---
sidebar_label: onRowResize
title: onRowResize event
description: "当用户拖动行边界以更改其高度时触发"
---

# onRowResize

### Description

@short: 当用户拖动行边界以更改其高度时触发

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string|number* - 任务的ID
- `task` - (required) *Task* - 任务对象
- `currentHeight` - (required) *number* - 当前行的高度

### Example

~~~jsx
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
    gantt.message({
        expire: -1,
        text: `<b>${task.text}</b> 现在高度为 <b>${currentHeight}px</b>`
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
- 在v7.1版本中添加

