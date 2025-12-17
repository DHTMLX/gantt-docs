---
sidebar_label: task_height
title: task_height config
description: "控制时间线区域中任务条的高度"
---

# task_height

### Description

@short: 控制时间线区域中任务条的高度

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
 **task_height** 属性已过时。您应使用 [bar_height](api/config/bar_height.md) 配置属性代替: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- **task_height** 属性在 v7.1 版本中被弃用。

