---
sidebar_label: constraint_types
title: constraint_types config
description: "beinhaltet alle Constraint-Typen, die Sie verwenden können"
---

# constraint_types
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Beinhaltet alle Constraint-Typen, die Sie verwenden können

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Example

~~~jsx

~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Das Objekt umfasst folgende Werte:

- **ASAP** - (*string*) - As Soon As Possible (so bald wie möglich)
- **ALAP** - (*string*) - As Late As Possible (so spät wie möglich)
- **SNET** - (*string*) - Start No Earlier Than (nicht früher starten als)
- **SNLT** - (*string*) - Start No Later Than (nicht später starten als)
- **FNET** - (*string*) - Finish No Earlier Than (nicht früher beenden als)
- **FNLT** - (*string*) - Finish No Later Than (nicht später beenden als)
- **MSO** - (*string*) - Must Start On (muss starten am)
- **MFO** - (*string*) - Must Finish On (muss beenden am)

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

Dieses Objekt hilft dabei, Constraint-Werte nicht direkt im Code fest zu verdrahten:

~~~js
gantt.addTaskLayer(function draw_deadline(task) {
    var constraintType = gantt.getConstraintType(task);
    var types = gantt.config.constraint_types;
    if (constraintType != types.ASAP && 
        constraintType != types.ALAP && task.constraint_date) {
        // etwas anzeigen
    }
    return false;
});
~~~

### Related API
- [getConstraintType](api/method/getconstrainttype.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

