---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected event
description: "在任务被选中之前触发"
---

# onBeforeTaskSelected

### Description

@short: 在任务被选中之前触发

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务的ID

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将阻止默认操作的发生。

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

