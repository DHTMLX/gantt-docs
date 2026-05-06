---
sidebar_label: constraint_types
title: constraint_types конфигурация
description: "содержит все доступные типы ограничений"
---

# constraint_types

:::info
This functionality is available in the PRO edition only. 
::: 

### Description

@short: Содержит все доступные типы ограничений

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Related samples
- [Автоматическое планирование от начала проекта и ограничений](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Автоматическое планирование от конца проекта (обратно)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

The object definition:

- **ASAP** - (*string*) - Как можно скорее
- **ALAP** - (*string*) - Как можно позже
- **SNET** - (*string*) - Старт не ранее чем
- **SNLT** - (*string*) - Старт не позже чем
- **FNET** - (*string*) - Финиш не ранее чем
- **FNLT** - (*string*) - Финиш не позже чем
- **MSO** - (*string*) - Должен начинаться в
- **MFO** - (*string*) - Должен заканчиваться в

~~~js
gantt.config.constraint_types = {
 // As Soon As Possible
 ASAP: "asap",
 // As Late As Possible
 ALAP: "alap",
 // Start No Earlier Than
 SNET: "snet",
 // Start No Later Than
 SNLT: "snlt",
 // Finish No Earlier Than
 FNET: "fnet",
 // Finish No Later Than
 FNLT: "fnlt",
 // Must Start On
 MSO: "mso",
 // Must Finish On
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
        // display something
    }
    return false;
});
~~~

### Related API
- [getConstraintType](api/method/getconstrainttype.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)