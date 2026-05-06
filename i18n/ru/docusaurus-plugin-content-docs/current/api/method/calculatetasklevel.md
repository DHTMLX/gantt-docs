---
sidebar_label: calculateTaskLevel
title: метод calculateTaskLevel
description: "вычисляет уровень вложенности задачи"
---

# calculateTaskLevel

### Description

@short: Вычисляет уровень вложенности задачи

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` level` - (number) - уровень задачи в древовидной иерархии (нумерация с нуля)

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