---
sidebar_label: getConstraintType
title: getConstraintType method
description: "返回应用于任务的约束类型"
---

# getConstraintType
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 返回应用于任务的约束类型

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` constraintType` - (string) - 约束类型，详见 [constraint_types](api/config/constraint_types.md) 配置

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // 该任务很可能有指定的约束日期
}
~~~

### Details


返回值对应于任务的 **constraint_type**，如果已设置。

如果未设置 **constraint_type**，则返回值将基于当前的调度方式--当从项目结束进行调度时，返回 "asap" 或 "alap"。

所有有效的约束类型可在 **gantt.config.constraint_types** 配置中找到。

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

