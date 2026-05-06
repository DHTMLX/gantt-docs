---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate 事件
description: "在用户更新任务之前触发"
---

# onBeforeTaskUpdate

### Description

@short: 在用户更新任务之前触发

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的 ID
- `new_task` - (required) *Task* - 任务的更新后对象

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // 在这里插入您的自定义逻辑 
});
~~~

### Details

在使用 **onBeforeTaskUpdate** 事件时，并不总是能够在任务完全更新之前获取任务对象。该事件在任务对象已更新但所有修改尚未应用之时触发。
要在修改应用之前获取任务对象，需要使用与任务修改直接相关的事件处理程序：

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

如果通过 API 进行修改，则在修改任务的代码执行之前，您可能会获得任务对象。请参阅下例，看看在以不同方式修改任务时（例如更改任务日期）会如何处理：

:::note
sample: [Updating a task ](https://snippet.dhtmlx.com/9xy8wr2a)
:::

经过比较，您会发现，在修改任务之前触发的事件返回的是旧的任务对象，而 **onBeforeTaskUpdate** 事件返回的是任务的新对象。

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)