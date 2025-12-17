---
sidebar_label: constraint_types
title: constraint_types config
description: "사용할 수 있는 모든 제약 조건 유형을 보유합니다."
---

# constraint_types
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 사용할 수 있는 모든 제약 조건 유형을 보유합니다.

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Example

~~~jsx

~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details


객체에는 다음 항목들이 포함되어 있습니다:

- **ASAP** - (*string*) - 가능한 한 빨리 (As Soon As Possible)
- **ALAP** - (*string*) - 가능한 한 늦게 (As Late As Possible)
- **SNET** - (*string*) - 해당 날짜 이전에는 시작 불가 (Start No Earlier Than)
- **SNLT** - (*string*) - 해당 날짜 이후에는 시작 불가 (Start No Later Than)
- **FNET** - (*string*) - 해당 날짜 이전에는 종료 불가 (Finish No Earlier Than)
- **FNLT** - (*string*) - 해당 날짜 이후에는 종료 불가 (Finish No Later Than)
- **MSO** - (*string*) - 반드시 해당 날짜에 시작해야 함 (Must Start On)
- **MFO** - (*string*) - 반드시 해당 날짜에 종료해야 함 (Must Finish On)

~~~js
gantt.config.constraint_types = {
 // 가능한 한 빨리
 ASAP: "asap",
 // 가능한 한 늦게
 ALAP: "alap",
 // 해당 날짜 이전에는 시작 불가
 SNET: "snet",
 // 해당 날짜 이후에는 시작 불가
 SNLT: "snlt",
 // 해당 날짜 이전에는 종료 불가
 FNET: "fnet",
 // 해당 날짜 이후에는 종료 불가
 FNLT: "fnlt",
 // 반드시 해당 날짜에 시작해야 함
 MSO: "mso",
 // 반드시 해당 날짜에 종료해야 함
 MFO: "mfo"
};
~~~

이 값들은 제약 조건 값을 코드에 하드코딩하지 않도록 도와줍니다:

~~~js
gantt.addTaskLayer(function draw_deadline(task) {
    var constraintType = gantt.getConstraintType(task);
    var types = gantt.config.constraint_types;
    if (constraintType != types.ASAP && 
        constraintType != types.ALAP && task.constraint_date) {
        // 무언가를 표시합니다
    }
    return false;
});
~~~

### Related API
- [getConstraintType](api/method/getconstrainttype.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

