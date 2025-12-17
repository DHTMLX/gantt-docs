---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "任务加载到甘特图中后，且显示之前触发"
---

# onBeforeTaskDisplay

### Description

@short: 任务加载到甘特图中后，且显示之前触发

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务ID
- `task` - (required) *Task* - 任务对象

### Returns
- ` result` - (boolean) - 控制事件的默认动作是否继续执行（<b>true</b>）或停止（<b>false</b>）

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

此事件可以被阻止。返回 false 将阻止任务出现在图表中。

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [任务过滤](guides/filtering.md)

