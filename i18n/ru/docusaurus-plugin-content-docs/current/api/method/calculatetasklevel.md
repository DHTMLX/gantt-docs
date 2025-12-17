---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "определяет, насколько глубоко задача вложена в иерархию"
---

# calculateTaskLevel

### Description

@short: Определяет, насколько глубоко задача вложена в иерархию

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - объект задачи для оценки

### Returns
- ` level` - (number) - уровень глубины задачи в древовидной структуре, начиная с нуля

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //устанавливаем тип задачи в зависимости от уровня вложенности
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

