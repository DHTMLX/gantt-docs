---
sidebar_label: getConstraintType
title: getConstraintType method
description: "gibt den auf die Aufgabe angewendeten Constraint-Typ zurück"
---

# getConstraintType
:::info
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Gibt den auf die Aufgabe angewendeten Constraint-Typ zurück

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - ein Task-Objekt

### Returns
- ` constraintType` - (string) - der Constraint-Typ, wie in der [constraint_types](api/config/constraint_types.md) Konfiguration angegeben

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // diese Aufgabe hat wahrscheinlich ein festgelegtes Constraint-Datum
}
~~~

### Details

Der zurückgegebene Wert entspricht dem **constraint_type** der Aufgabe, sofern dieser gesetzt wurde.

Ist der **constraint_type** nicht gesetzt, basiert der Rückgabewert auf dem aktuellen Scheduling-Ansatz - entweder "asap" oder "alap", wenn das Scheduling vom Projektende aktiv ist.

Alle gültigen Constraint-Typen sind in der Konfiguration **gantt.config.constraint_types** zu finden.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

