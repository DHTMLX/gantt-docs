---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel method
description: "작업이 계층 구조 내에서 얼마나 깊게 중첩되어 있는지 계산합니다."
---

# calculateTaskLevel

### Description

@short: 작업이 계층 구조 내에서 얼마나 깊게 중첩되어 있는지 계산합니다.

@signature: calculateTaskLevel: (task: Task) =\> number

### Parameters

- `task` - (required) *Task* - 평가할 작업 객체

### Returns
- ` level` - (number) - 트리 구조에서 작업의 깊이 수준, 0부터 시작합니다.

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //작업의 중첩 수준에 따라 작업 유형 설정
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

