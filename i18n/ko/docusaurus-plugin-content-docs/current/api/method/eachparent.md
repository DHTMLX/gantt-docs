---
sidebar_label: eachParent
title: eachParent method
description: "주어진 작업의 모든 상위 작업들을 간트 차트에서 반복 처리합니다."
---

# eachParent

### Description

@short: 주어진 작업의 모든 상위 작업들을 간트 차트에서 반복 처리합니다.

@signature: eachParent: (code: GanttCallback, startTask: string | number, master?: any) =\> void

### Parameters

- `code` - (required) *function* - 각 작업 객체를 처리하는 콜백 함수
- `startTask` - (required) *string | number* -            상위 작업들을 반복할 대상 작업의 ID
- `master` - (optional) *object* - 콜백 함수 내에서 'this'로 사용할 컨텍스트 객체

### Example

~~~jsx
gantt.eachParent(function(task){
    alert(task.text);
}, taskId);
~~~

### Related API
- [calculateTaskLevel](api/method/calculatetasklevel.md)

