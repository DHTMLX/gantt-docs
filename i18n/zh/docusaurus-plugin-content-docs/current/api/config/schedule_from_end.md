---
sidebar_label: schedule_from_end
title: schedule_from_end 配置
description: "启用向后排程"
---

# schedule_from_end
:::info
此功能仅在 PRO 版中可用。 
:::

:::warning
该属性在 v9.1 已被弃用，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_from_end) 的 `schedule_from_end` 属性。
:::
### Description

@short: 启用向后排程

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2025, 10, 1);
~~~

**默认值：** false

### Related samples
- [- [从项目结束进行自动排程（向后）](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)]

### Details

将此配置设为 `true` 将把自动排程切换到尽可能晚的模式。

此值仅在同时指定 [project_end](api/config/project_end.md) 时生效。

### Related API
- [project_end](api/config/project_end.md)
- [auto_scheduling](api/config/auto_scheduling.md)

### Related Guides
- [- [自动排程]](guides/auto-scheduling.md)

### Change log
- 该属性在 v9.1 已被弃用