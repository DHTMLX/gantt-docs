---
sidebar_label: onRowResize
title: onRowResize 事件
description: "当用户拖动行边框以调整行高时触发"
---

# onRowResize

### Description

@short: 当用户拖动行边框以调整行高时触发

@signature: onRowResize: (id: string | number, task: Task, currentHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `task` - (required) *Task* - 任务对象
- `currentHeight` - (required) *number* - 该行当前高度

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
- [网格中的可调整大小的行](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onBeforeRowResize](api/event/onbeforerowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- 已在 v7.1 中新增