---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "计算任务在层级结构中的嵌套深度"
---

# calculateTaskLevel

### Description

@short: 计算任务在层级结构中的嵌套深度

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - 需要评估的任务对象

### Returns
- ` level` - (number) - 任务在树状结构中的深度级别，起始值为零

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

