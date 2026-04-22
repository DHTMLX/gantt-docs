---
sidebar_label: calculateTaskLevel
title: calculateTaskLevel 메서드
description: "작업의 중첩 수준을 계산합니다"
---

# calculateTaskLevel

### Description

@short: 작업의 중첩 수준을 계산합니다

@signature: calculateTaskLevel: (task: Task) => number

### Parameters

- `task` - (required) *Task* - 작업의 객체

### Returns
- `level` - (number) - 트리 계층 구조에서의 작업 레벨(0부터 시작하는 번호 매김)

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //작업 수준에 따라 task 유형 할당
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