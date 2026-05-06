---
sidebar_label: onTaskDrag
title: onTaskDrag 事件
description: "在用户拖动任务时触发"
---

# onTaskDrag

### Description

@short: 当用户拖动一个任务时触发

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) => void;

### Parameters

- `id` - (required) *string | number* - 任务的 ID
- `mode` - (required) *string* - 拖拽模式（"resize", "progress", "move", "ignore"）
- `task` - (required) *Task* - 当前（正在拖动的）任务对象
- `original` - (required) *Task* - 原始（初始）任务对象
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    // 在这里插入您的自定义逻辑 
});
~~~

### Related samples
- [拖动父任务及其子任务](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [限制拖拽日期](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

The event:

- 当用户在时间线区域使用鼠标进行拖动时，每次移动、调整任务大小或更改任务进度时都会触发。
- 拖拽类型作为第二个参数传递 - **mode**。
- 拖拽类型的所有可用值存储在 [drag_mode](api/config/drag_mode.md) 属性中。

简要地说，整个过程按以下顺序发生：

1. 用户进行一次移动。
2. dhtmlxGantt 根据新位置重新计算任务的日期。
3. dhtmlxGantt 触发 [onTaskDrag](api/event/ontaskdrag.md) 事件。
4. dhtmlxGantt 在甘特图中重新渲染该任务。

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [在时间线内拖拽任务](guides/dnd.md#denying-dragging-tasks-out-of-specific-dates)
- [操作指南](guides/how-to.md#how-to-have-an-infinite-scroll-in-the-timeline)