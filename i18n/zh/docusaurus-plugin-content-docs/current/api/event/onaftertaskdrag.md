---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag 事件
description: "在用户完成拖拽并松开鼠标按钮后触发"
---

# onAfterTaskDrag

### Description

@short: 在用户完成拖拽并松开鼠标按钮后触发

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务 ID
- `mode` - (required) *string* - 拖拽模式（"resize", "progress", "move", "ignore"）
- `e` - (required) *Event* - 本地原生事件对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    // 在这里插入您的自定义逻辑
});
~~~

### Details

当用户在时间线区域拖动任务时触发。

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)