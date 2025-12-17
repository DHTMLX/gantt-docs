---
sidebar_label: constraint_types
title: constraint_types config
description: "содержит все типы ограничений, которые вы можете использовать"
---

# constraint_types
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Содержит все типы ограничений, которые вы можете использовать

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Example

~~~jsx

~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Вот что включает этот объект:

- **ASAP** - (*string*) - As Soon As Possible (как можно скорее)
- **ALAP** - (*string*) - As Late As Possible (как можно позже)
- **SNET** - (*string*) - Start No Earlier Than (начать не раньше чем)
- **SNLT** - (*string*) - Start No Later Than (начать не позднее чем)
- **FNET** - (*string*) - Finish No Earlier Than (закончить не раньше чем)
- **FNLT** - (*string*) - Finish No Later Than (закончить не позднее чем)
- **MSO** - (*string*) - Must Start On (обязательно начать в)
- **MFO** - (*string*) - Must Finish On (обязательно закончить в)

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

Это включено для того, чтобы избежать жесткого кодирования значений ограничений прямо в вашем коде:

~~~js
gantt.addTaskLayer(function draw_deadline(task) {
    var constraintType = gantt.getConstraintType(task);
    var types = gantt.config.constraint_types;
    if (constraintType != types.ASAP && 
        constraintType != types.ALAP && task.constraint_date) {
        // отображаем что-то
    }
    return false;
});
~~~

### Related API
- [getConstraintType](api/method/getconstrainttype.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

