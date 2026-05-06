---
sidebar_label: deadlines
title: deadlines config
description: "控制任务的 deadline 元素显示开关"
---

# deadlines

### Description

@short: 启用或禁用任务截止日期元素的显示

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [显示截止日期](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

此配置用于启用或禁用任务截止日期元素的显示。若启用，Gantt 将检查 `task.deadline` 属性；若该属性包含有效日期，则在时间线中显示截止日期元素。

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- 在 v9.0 中新增