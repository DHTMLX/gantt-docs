---
sidebar_label: getConstraintType
title: getConstraintType Methode
description: "gibt den dem Task zugewiesenen Constraint-Typ zurück"
---

# getConstraintType

:::info 
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Gibt den dem Task zugewiesenen Constraint-Typ zurück

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (erforderlich) *Task* - ein Task-Objekt

### Returns
- `constraintType` - (string) - Constraint-Typ, wie in der [constraint_types](api/config/constraint_types.md) Konfiguration definiert.

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

Der Rückgabewert entspricht dem Wert von **constraint_type** des Tasks, sofern dieser nicht leer ist.

Wenn der **constraint_type** leer ist, hängt der Rückgabewert von der aktuellen Scheduling-Strategie ab – entweder "asap" oder "alap", falls die Planung vom Projektende aus aktiviert ist.

Alle zulässigen Constraint-Typen sind in der **gantt.config.constraint_types**-Konfiguration definiert.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)