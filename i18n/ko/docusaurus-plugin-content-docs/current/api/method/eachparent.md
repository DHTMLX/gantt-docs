---
sidebar_label: eachParent
title: eachParent 메서드
description: "Gantt 차트에서 지정된 작업의 모든 상위 작업을 순회합니다"
---

# eachParent

### Description

@short: 지정된 작업의 모든 상위 작업을 Gantt 차트에서 순회합니다

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 상위 작업들을 순회할 함수. 파라미터로 작업 객체를 받습니다
- `startTask` - (required) *string | number* - 상위 작업을 순회하기 시작할 항목의 ID

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)