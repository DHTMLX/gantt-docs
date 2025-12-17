---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "当任务从数据源加载时触发。"
---

# onTaskLoading

### Description

@short: 当任务从数据源加载时触发。

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 正在加载的任务对象

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

- 该事件会在从数据源获取的每个任务上触发。
- 该事件可以被阻止。返回 *false* 将阻止任务被加载到甘特图中。

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

