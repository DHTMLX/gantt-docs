---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "当用户完成拖拽并释放鼠标按钮时触发"
---

# onAfterTaskDrag

### Description

@short: 当用户完成拖拽并释放鼠标按钮时触发

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务的ID
- `mode` - (required) *string* - 拖放模式（"resize"、"progress"、"move"、"ignore"）
- `e` - (required) *Event* - 原生事件对象

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    //这里写任何自定义逻辑
});
~~~

### Details

当任务在时间线区域内被拖拽完成时触发此事件。

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

