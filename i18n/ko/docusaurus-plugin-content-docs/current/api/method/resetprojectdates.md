---
sidebar_label: resetProjectDates
title: resetProjectDates 메서드
description: "자식 노드의 날짜에 따라 프로젝트 작업의 지속 기간을 재계산합니다."
---

# resetProjectDates

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 자식 노드의 날짜에 따라 프로젝트 작업의 지속 기간을 재계산합니다

@signature: resetProjectDates: (task: Task) => void

### Parameters

- `task` - (required) *Task* - 해당 태스크의 객체

### Example

~~~jsx
gantt.resetProjectDates(gantt.getTask(3));
~~~

### Details

이 메서드는 제공된 객체의 **start_date**, **end_date** 및 **duration** 속성을 수정합니다.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)