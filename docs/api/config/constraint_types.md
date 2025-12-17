---
sidebar_label: constraint_types
title: constraint_types config
description: "contains all available constraint types"
---

# constraint_types

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Contains all available constraint types

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

The object definition:

- **ASAP** - (*string*) - As Soon As Possible
- **ALAP** - (*string*) - As Late As Possible
- **SNET** - (*string*) - Start No Earlier Than
- **SNLT** - (*string*) - Start No Later Than
- **FNET** - (*string*) - Finish No Earlier Than
- **FNLT** - (*string*) - Finish No Later Than
- **MSO** - (*string*) - Must Start On
- **MFO** - (*string*) - Must Finish On

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
- [Auto Scheduling](guides/auto-scheduling.md)

