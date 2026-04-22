---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "在用户选择任务之前触发"
---

# onBeforeTaskSelected

### Description

@short: 在用户选择任务之前触发

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务 ID

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否将被触发 (<b>true</b>) 或取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻止的。返回 *false* 以取消默认处理。

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)