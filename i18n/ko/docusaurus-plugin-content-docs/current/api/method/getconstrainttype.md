---
sidebar_label: getConstraintType
title: getConstraintType method
description: "작업에 적용된 제약 조건 유형을 반환합니다."
---

# getConstraintType

### Description

@short: 작업에 적용된 제약 조건 유형을 반환합니다.

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` constraintType` - (string) - [constraint_types](api/config/constraint_types.md) 설정에 지정된 제약 조건 유형

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // 이 작업은 지정된 제약 날짜가 있을 가능성이 높습니다.
}
~~~

### Details

:::note
pronote 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

반환된 값은 작업에 설정된 **constraint_type**에 해당합니다.

만약 **constraint_type**이 설정되어 있지 않으면, 반환 값은 현재 스케줄링 방식에 따라 결정됩니다 - 프로젝트 종료 시점부터 스케줄링이 활성화된 경우 "asap" 또는 "alap"이 될 수 있습니다.

모든 유효한 제약 조건 유형은 **gantt.config.constraint_types** 설정에서 확인할 수 있습니다.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

