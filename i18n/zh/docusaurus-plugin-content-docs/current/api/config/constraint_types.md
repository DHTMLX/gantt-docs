---
sidebar_label: constraint_types
title: constraint_types config
description: "包含所有可用的约束类型"
---

# constraint_types

:::info
 此功能仅在 PRO 版本中可用。 
:::

### Description

@short: 包含所有可用的约束类型

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

对象定义：

- **ASAP** - (*string*) - 尽快
- **ALAP** - (*string*) - 尽可能晚
- **SNET** - (*string*) - 开始不得早于
- **SNLT** - (*string*) - 开始不得晚于
- **FNET** - (*string*) - 结束不得早于
- **FNLT** - (*string*) - 结束不得晚于
- **MSO** - (*string*) - 必须在指定日期开始
- **MFO** - (*string*) - 必须在指定日期完成

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

它的添加是为了避免在代码中对约束值进行硬编码：

~~~js
gantt.addTaskLayer(function draw_deadline(task) {
    var constraintType = gantt.getConstraintType(task);
    var types = gantt.config.constraint_types;
    if (constraintType != types.ASAP && 
        constraintType != types.ALAP && task.constraint_date) {
        // 显示相关内容
    }
    return false;
});
~~~

### Related API
- [getConstraintType](api/method/getconstrainttype.md)
- [getConstraintLimitations](api/method/getconstraintlimitations.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

