---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "计算任务的嵌套级别"
---

# calculateTaskLevel

### Description

@short: 计算任务的嵌套级别

@signature: calculateTaskLevel: (task: Task) => number

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` level` - (number) - 树层级中的任务等级（从零开始编号）

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //根据嵌套层级设置任务类型
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