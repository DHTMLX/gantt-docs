---
sidebar_label: onTaskDrag
title: onTaskDrag event
description: "当用户拖动任务时触发"
---

# onTaskDrag

### Description

@short: 当用户拖动任务时触发

@signature: onTaskDrag: (id: string | number, mode: string, task: Task, original: Task, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `mode` - (required) *string* - 拖动模式（"resize"、"progress"、"move"、"ignore"）
- `task` - (required) *Task* - 当前（被拖动的）任务对象
- `original` - (required) *Task* - 原始（初始）任务对象
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    //这里可以写任何自定义逻辑
});
~~~

### Related samples
- [Drag parent task with its children](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)
- [Limit drag and drop dates](https://docs.dhtmlx.com/gantt/samples/08_api/02_constraints.html)

### Details

每当用户在时间轴区域拖动鼠标以移动、调整任务大小或更新任务进度时，都会触发此事件。拖动类型通过第二个参数 **mode** 指示。所有可能的拖动模式值可以在 [drag_mode](api/config/drag_mode.md) 文件中找到。

总结流程如下:

1. 用户开始拖动操作。
2. dhtmlxGantt 根据新位置重新计算任务日期。
3. dhtmlxGantt 触发 [onTaskDrag](api/event/ontaskdrag.md) 事件。
4. dhtmlxGantt 更新甘特图中任务的显示。

### Related API
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [drag_mode](api/config/drag_mode.md)

### Related Guides
- [在时间轴中拖动任务](guides/dnd.md)
- [操作指南](guides/how-to.md)

