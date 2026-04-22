---
sidebar_label: onAfterRowResize
title: onAfterRowResize 事件
description: "在行高调整完成后触发"
---

# onAfterRowResize

### Description

@short: 在行高调整完成后触发

@signature: onAfterRowResize: (id: string | number, task: Task, oldHeight: number, newHeight: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `task` - (required) *Task* - 任务对象
- `oldHeight` - (required) *number* - 该行的原始高度
- `newHeight` - (required) *number* - 该行的新高度

### Example

~~~jsx
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
    gantt.message(`<b>${item.text}</b> 的高度原为 <b>${oldHeight}px</b>。<br>
    <b>${item.text}</b> 现在的高度是 <b>${newHeight}px</b>`);
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
- 在 v7.1 中新增