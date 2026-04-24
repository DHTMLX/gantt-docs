---
sidebar_label: getConstraintType
title: getConstraintType method
description: "возвращает тип ограничения, применяемый к задаче"
---

# getConstraintType

:::info
 Эта функция доступна только в PRO-версии. 
:::

### Description

@short: Возвращает тип ограничения, применяемый к задаче

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` constraintType` - (string) - тип ограничения, как определено в конфигурации [constraint_types](api/config/constraint_types.md) конфигурации

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // у этой задачи, вероятно, задана дата ограничения
}
~~~

### Details

Возвращаемое значение будет соответствовать значению **constraint_type** задачи, если оно не пустое.

Если значение **constraint_type** пустое, возвращаемое значение будет зависеть от текущей стратегии планирования - либо "asap" или "alap", если включено планирование от конца проекта.

Все допустимые типы ограничений определены в конфигурации **gantt.config.constraint_types**.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)