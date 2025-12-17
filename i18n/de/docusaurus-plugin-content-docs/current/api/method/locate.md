---
sidebar_label: locate
title: locate method
description: "rufen Sie die ID einer Aufgabe basierend auf dem übergebenen HTML-Event ab"
---

# locate

### Description

@short: Rufen Sie die ID einer Aufgabe basierend auf dem übergebenen HTML-Event ab

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (required) *Event* - das native Event-Objekt

### Returns
- ` id` - (string | number) - die Kennung der Aufgabe

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

