---
sidebar_label: onBeforeRowResizeEnd
title: onBeforeRowResizeEnd event
description: "在行高度调整过程完成之前触发"
---

# onBeforeRowResizeEnd

### Description

@short: 在行高度调整过程完成之前触发

@signature: onBeforeRowResizeEnd: (id: number | string, task: Task, newHeight: number) =\> boolean;

### Parameters

- `id` - (required) *number|string* - 任务标识符
- `task` - (required) *Task* - 任务对象本身
- `newHeight` - (required) *number* - 更新后的行高度

### Returns
- ` result` - (boolean) - 指示是否继续执行默认事件操作（<b>true</b>）或停止（<b>false</b>）

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

