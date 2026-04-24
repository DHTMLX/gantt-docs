---
sidebar_label: onBeforeRowResize
title: onBeforeRowResize event
description: "在用户开始通过拖拽调整行高之前触发"
---

# onBeforeRowResize

### Description

@short: 在用户开始通过拖拽调整行高之前触发

@signature: onBeforeRowResize: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` param` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

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

该事件是可阻塞的。返回 *false* 将阻止行高被调整。

### Related API
- [resize_rows](api/config/resize_rows.md)
- [onRowResize](api/event/onrowresize.md)
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md)
- [onAfterRowResize](api/event/onafterrowresize.md)

### Change log
- 新增于 v7.1