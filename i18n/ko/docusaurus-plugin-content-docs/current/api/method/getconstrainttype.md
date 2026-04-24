---
sidebar_label: getConstraintType
title: getConstraintType 메서드
description: "작업에 적용된 제약 유형을 반환합니다"
---

# getConstraintType

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 작업에 적용된 제약 유형을 반환합니다

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - a task object

### Returns
- ` constraintType` - (string) - 제약 유형은 [constraint_types](api/config/constraint_types.md) 구성에서 정의된 값으로

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // 이 작업은 아마도 제약 날짜가 지정된 경우일 수 있습니다
}
~~~

### Details

반환 값은 비어 있지 않으면 작업의 **constraint_type** 값과 일치합니다.

만약 **constraint_type** 가 비어 있으면 반환 값은 현재 스케줄링 전략에 따라 달라집니다 - 프로젝트 끝에서의 스케줄링이 활성화되어 있으면 "asap" 또는 "alap" 중 하나일 수 있습니다.

허용된 모든 제약 유형은 **gantt.config.constraint_types** 구성에 정의되어 있습니다.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)