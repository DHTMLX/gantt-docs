---
sidebar_label: constraint_types
title: constraint_types config
description: "包含所有可用的约束类型"
---

# constraint_types
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 包含所有可用的约束类型

@signature: constraint_types: \{ ASAP?: string; ALAP?: string; SNET?: string; SNLT?: string; FNET?: string; FNLT?: string; MSO?: string; MFO?: string; \}

### Example

~~~jsx

~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details


该对象包含以下内容:

- **ASAP** - (*string*) - 尽快开始 (As Soon As Possible)
- **ALAP** - (*string*) - 尽晚开始 (As Late As Possible)
- **SNET** - (*string*) - 不早于开始 (Start No Earlier Than)
- **SNLT** - (*string*) - 不晚于开始 (Start No Later Than)
- **FNET** - (*string*) - 不早于完成 (Finish No Earlier Than)
- **FNLT** - (*string*) - 不晚于完成 (Finish No Later Than)
- **MSO** - (*string*) - 必须在指定时间开始 (Must Start On)
- **MFO** - (*string*) - 必须在指定时间完成 (Must Finish On)

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

该配置有助于避免在代码中硬编码约束值:

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

