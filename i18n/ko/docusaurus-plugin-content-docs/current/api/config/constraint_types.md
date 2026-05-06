--- 
sidebar_label: constraint_types
title: constraint_types config
description: "모든 사용 가능한 제약 유형을 포함"
---

# constraint_types
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 가능한 모든 제약 유형 포함

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Related samples
- [프로젝트 시작 및 제약 조건으로 자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [프로젝트 종료 시점에서의 자동 스케줄링(역방향)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

The object definition:

- **ASAP** - (*string*) - 가능하면 가능한 한 빨리
- **ALAP** - (*string*) - 가능한 한 늦게
- **SNET** - (*string*) - 시작은 지정 시점보다 이르게 시작하지 않음
- **SNLT** - (*string*) - 시작은 지정 시점보다 늦지 않게
- **FNET** - (*string*) - 종료는 지정 시점보다 이르게 종료하지 않음
- **FNLT** - (*string*) - 종료는 지정 시점보다 늦지 않게
- **MSO** - (*string*) - 반드시 시작해야 하는 시점
- **MFO** - (*string*) - 반드시 종료해야 하는 시점

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

It is added in order to avoid hardcoding constraint values in code:

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

