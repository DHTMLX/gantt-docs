---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "calculates the level of nesting of a task"
---

# calculateTaskLevel

### Description

@short: Calculates the level of nesting of a task

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - the task's object

### Returns
- ` level` - (number) - the level of a task in the tree hierarchy (zero-based numbering)

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //assign task type based on task level
 switch (level){
  case 0:
   task.type = types.project;
   break;
  case 1:
   task.type = types.subproject;
   break;
  default:
   task.type = types.task;
   break;
 }
 return true;
});
~~~

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateDuration](api/method/calculateduration.md)

