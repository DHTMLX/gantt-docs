---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay 事件
description: "在任务已加载到甘特图后，但在显示之前触发"
---

# onBeforeTaskDisplay

### Description

@short: 在任务已加载到甘特图后，但在显示之前触发

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) => boolean;

### Parameters

- `id` - (必填) *字符串 | 数字* - 任务 ID
- `task` - (必填) *Task* - 任务对象

### Returns
- ` result` - (布尔值) - 定义事件的默认操作是否会被触发（<b>true</b>）还是取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

### Details

该事件是可阻塞的。返回 false 将阻止任务被显示

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Filtering Tasks](guides/filtering.md)