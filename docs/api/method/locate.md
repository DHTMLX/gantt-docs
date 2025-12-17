---
sidebar_label: locate
title: locate method
description: "gets the id of a task from the specified HTML event"
---

# locate

### Description

@short: Gets the id of a task from the specified HTML event

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (required) *Event* - a native event

### Returns
- ` id` - (string | number) - the task id

### Example

~~~jsx
gantt.$container.addEventListener("mouseover", function(event){
    const taskId = gantt.locate(event);
    if(gantt.isTaskExists(taskId)){
       gantt.message({
         id:1,
         text:"Mouse over " + gantt.getTask(taskId).text});
    }
});
~~~

### Related API
- [task_attribute](api/config/task_attribute.md)

