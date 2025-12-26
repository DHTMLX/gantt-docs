---
sidebar_label: getConstraintType
title: getConstraintType method
description: "возвращает тип ограничения, применённого к задаче"
---

# getConstraintType
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Возвращает тип ограничения, применённого к задаче

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` constraintType` - (string) - тип ограничения, как указано в конфигурации [constraint_types](api/config/constraint_types.md)

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

Возвращаемое значение соответствует **constraint_type** задачи, если оно было установлено.

Если **constraint_type** не задан, возвращаемое значение будет основано на текущем подходе к планированию - "asap" или "alap" при активном планировании от конца проекта.

Все допустимые типы ограничений можно найти в конфигурации **gantt.config.constraint_types**.

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

