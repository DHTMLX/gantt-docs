---
sidebar_label: locate
title: locate method
description: "根据给定的 HTML 事件检索任务的 id"
---

# locate

### Description

@short: 根据给定的 HTML 事件检索任务的 id

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (required) *Event* - 原生事件对象

### Returns
- ` id` - (string | number) - 任务的标识符

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

