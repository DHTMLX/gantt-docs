---
sidebar_label: deadlines
title: deadlines config
description: "控制任务的 deadline 元素显示开关"
---

# deadlines
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 控制任务的 deadline 元素显示开关

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

此设置用于控制是否显示任务的 deadline 元素。启用后，Gantt 会检查 `task.deadline` 属性，如果该属性包含有效日期，deadline 将显示在时间轴上。

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- v9.0 新增
