---
sidebar_label: constraint_types
title: constraint_types config
description: "enthält alle verfügbaren Constraint-Typen"
---

# constraint_types

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Enthält alle verfügbaren Constraint-Typen

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Die Objektdefinition:

- **ASAP** - (*string*) - So früh wie möglich
- **ALAP** - (*string*) - So spät wie möglich
- **SNET** - (*string*) - Start nicht früher als
- **SNLT** - (*string*) - Start nicht später als
- **FNET** - (*string*) - Ende nicht früher als
- **FNLT** - (*string*) - Ende nicht später als
- **MSO** - (*string*) - Muss am Starttermin beginnen
- **MFO** - (*string*) - Muss am Endtermin enden

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

Es wird hinzugefügt, um das Hardcodieren von Constraint-Werten im Code zu vermeiden:

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
- [Auto Scheduling](guides/auto-scheduling.md)