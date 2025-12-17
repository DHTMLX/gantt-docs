---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "fires when a task is being loaded from the data source"
---

# onTaskLoading

### Description

@short: Fires when a task is being loaded from the data source

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - the object of a task

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    //any custom logic here
    return true;
});
~~~

### Details

- The event fires for each task in the data source.
- The event is blockable. Return *false* and the task won't be loaded into the Gantt chart.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

