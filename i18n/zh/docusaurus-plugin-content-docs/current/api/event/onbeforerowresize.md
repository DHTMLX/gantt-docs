---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "当用户开始通过拖拽调整行高之前触发"
---

# onBeforeRowResize

### Description

@short: 当用户开始通过拖拽调整行高之前触发

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` param` - (boolean) - 指示事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRowResize", function (task) {
    gantt.message(`开始调整 <b>${task.text}</b> 的大小`);
    return true;
});
~~~

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

此事件可以被阻止。返回 *false* 将阻止行高的更改。

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- 在 v7.1 中添加

