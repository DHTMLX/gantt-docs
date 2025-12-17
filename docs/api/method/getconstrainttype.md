---
sidebar_label: getConstraintType
title: getConstraintType method
description: "returns the constraint type applied to the task"
---

# getConstraintType

:::info 
This functionality is available in the PRO edition only. 
:::

### Description

@short: Returns the constraint type applied to the task

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - a task object

### Returns
- ` constraintType` - (string) - constraint type as defined in [constraint_types](api/config/constraint_types.md) config

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // this task probably a constraint date specified
}
~~~

### Details

The return value will match the **constraint_type** value of the task if it's not empty.

If the **constraint_type** is empty, the return value will depend on the current scheduling strategy - either "asap" or "alap" if scheduling from the project end is enabled.

All allowed constraint types are defined in the **gantt.config.constraint_types** config.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

