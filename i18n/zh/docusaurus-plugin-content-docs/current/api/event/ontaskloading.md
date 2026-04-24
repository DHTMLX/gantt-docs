---
sidebar_label: onTaskLoading
title: onTaskLoading 事件
description: "在从数据源加载任务时触发"
---

# onTaskLoading

### Description

@short: 当任务从数据源加载时触发。

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否将被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

- 该事件会对数据源中的每个任务触发。
- 该事件是可阻塞的。返回 *false*，该任务将不会被加载到 Gantt 图中。

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)