---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "当用户按下鼠标按钮并开始拖动时立即触发，但在 dhtmlxGantt 开始拖放过程之前。"
---

# onBeforeTaskDrag

### Description

@short: 当用户按下鼠标按钮并开始拖动时立即触发，但在 dhtmlxGantt 开始拖放过程之前。

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务的 id
- `mode` - (required) *string* - 拖放模式（"resize"、"progress"、"move"、"ignore"）
- `e` - (required) *Event* - 原生事件对象

### Returns
- ` result` - (boolean) - 决定是否允许默认事件动作继续执行（<b>true</b>）或阻止其执行（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    // 在这里添加自定义逻辑
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

当任务在时间轴内被拖动时触发此事件。

返回 *false* 可阻止拖动操作，任务将重置回其原始位置。

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [在时间轴中拖动任务](guides/dnd.md)

