---
sidebar_label: locate
title: Locate-Methode
description: "Erhält die ID einer Aufgabe aus dem angegebenen HTML-Ereignis"
---

# locate

### Description

@short: Erhält die ID einer Aufgabe aus dem angegebenen HTML-Ereignis

@signature: locate: (e: Event) =\> string | number

### Parameters

- `e` - (erforderlich) *Event* - ein natives Event

### Returns
- ` id` - (string | number) - die ID der Aufgabe

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