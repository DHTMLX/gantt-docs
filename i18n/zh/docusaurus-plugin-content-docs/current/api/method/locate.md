---
sidebar_label: locate
title: locate method
description: "从指定的 HTML 事件中获取任务的 ID"
---

# locate

### Description

@short: 从指定的 HTML 事件中获取任务的 ID

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (必填) *Event* - 原生事件

### Returns
- ` id` - (string | number) - 任务 ID

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