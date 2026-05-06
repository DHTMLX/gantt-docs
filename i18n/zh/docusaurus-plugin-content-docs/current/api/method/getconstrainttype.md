---
sidebar_label: getConstraintType
title: getConstraintType 方法
description: "返回应用于任务的约束类型"
---

# getConstraintType

:::info 
此功能仅在 PRO 版中提供。 
:::

### Description

@short: 若应用于任务的约束类型

@signature: getConstraintType: (task: Task) =\> string

### Parameters

- `task` - (必填) *Task* - 一个任务对象

### Returns
- ` constraintType` - (string) - 约束类型，如在 [constraint_types](api/config/constraint_types.md) 配置中定义

### Example

~~~jsx
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // 这个任务很可能是指定了约束日期
}
~~~

### Details

如果 **constraint_type** 的值非空，返回值将匹配该值。

如果 **constraint_type** 为空，返回值将取决于当前的调度策略——若启用了从项目末端进行调度，则返回值为 "asap" 或 "alap"。

所有允许的约束类型定义在 **gantt.config.constraint_types** 配置中。

### Related API
- [constraint_types](api/config/constraint_types.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)