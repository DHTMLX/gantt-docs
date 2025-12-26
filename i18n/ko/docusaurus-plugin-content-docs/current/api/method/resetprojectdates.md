---
sidebar_label: resetProjectDates
title: resetProjectDates method
description: "하위 작업들의 날짜를 기준으로 프로젝트 작업의 기간을 재계산합니다"
---

# resetProjectDates
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 하위 작업들의 날짜를 기준으로 프로젝트 작업의 기간을 재계산합니다

@signature: resetProjectDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - 작업 객체

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

이 메서드는 지정된 작업 객체의 **start_date**, **end_date**, 그리고 **duration** 속성을 하위 작업들의 날짜를 기준으로 업데이트합니다.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)

