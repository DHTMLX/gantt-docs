---
sidebar_label: locate
title: locate method
description: "получает id задачи на основе переданного HTML события"
---

# locate

### Description

@short: Получает id задачи на основе переданного HTML события

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (required) *Event* - нативный объект события

### Returns
- ` id` - (string | number) - идентификатор задачи

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

