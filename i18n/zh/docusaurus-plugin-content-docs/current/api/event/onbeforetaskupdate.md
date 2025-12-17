---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "在用户更新任务之前触发"
---

# onBeforeTaskUpdate

### Description

@short: 在用户更新任务之前触发

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `new_task` - (required) *Task* - 更新后的任务对象

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // 可以在这里添加自定义逻辑
});
~~~

### Details

**onBeforeTaskUpdate** 事件在任务对象被更新后但所有更改尚未完全应用之前触发，因此不总是能访问到更新前的任务对象。

如果需要获取更改应用前的任务对象，可以考虑使用专门针对任务修改的事件处理程序:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [内联编辑器扩展](guides/inline-editors-ext.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

当通过 API 进行更改时，可以在修改代码执行前访问任务对象。下面的示例演示了多种更新任务的方法，例如更改任务日期:

:::note
Sample: [Updating a task](https://snippet.dhtmlx.com/9xy8wr2a) 
:::

通过比较这些事件，可以看到在任务修改之前触发的事件会提供旧的任务对象，而 **onBeforeTaskUpdate** 则提供更新后的任务对象。

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)

