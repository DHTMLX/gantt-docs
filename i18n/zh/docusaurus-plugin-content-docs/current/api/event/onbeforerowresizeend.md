---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "在行高调整完成之前触发"
---

# onBeforeRowResizeEnd

### Description

@short: 在行高调整完成之前触发

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number | string* - 任务 ID
- `task` - (required) *Task* - 任务对象
- `newHeight` - (required) *number* - 行的新高度

### Returns
- `result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResizeEnd", function (id, task, newHeight) {
    gantt.message(`<b>${task.text}</b> 当前高度为 <b>${newHeight}px</b>`);
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
- 在 v7.1 版本引入

