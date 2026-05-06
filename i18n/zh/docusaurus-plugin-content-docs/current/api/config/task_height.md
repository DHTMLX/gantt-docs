---
sidebar_label: task_height
title: task_height config
description: "设置时间线区域中任务条的高度"
---

# task_height

:::warning
该属性已被废弃。
:::

### Description

@short: 设置时间线区域中任务条的高度

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**默认值:** "full"

### Details

:::note
**task_height** 属性已被弃用。您可以改用 [bar_height](api/config/bar_height.md) 配置属性：
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- the **task_height** 属性在 v7.1 中已被弃用