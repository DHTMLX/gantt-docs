---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "在用户按下鼠标按钮并开始拖动，但在 dhtmlxGantt 开始拖放操作之前触发"
---

# onBeforeTaskDrag

### Description

@short: 当用户按下鼠标按钮并开始拖动，但在 dhtmlxGantt 开始拖放操作之前触发

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `mode` - (required) *string* - 拖拽模式（"resize", "progress", "move", "ignore"）
- `e` - (required) *Event* - 一个原生事件对象

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

该事件在用户在时间线区域拖动任务时触发。

该事件是可阻塞的。返回 *false*，任务将回到初始位置。

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)