---
sidebar_label: task_height
title: task_height config
description: "sets the height of task bars in the timeline area"
---

# task_height

:::warning
The property is deprecated.
:::

### Description

@short: Sets the height of task bars in the timeline area

### Example

~~~jsx
gantt.config.task_height = 30;
gantt.init("gantt_here");
~~~

**Default value:** "full"

### Details

:::note
The **task_height** property is deprecated. Instead of it, you can use the [bar_height](api/config/bar_height.md) configuration property: 
:::

~~~
gantt.config.bar_height = 30;
gantt.init("gantt_here");
~~~

### Change log
- the **task_height** property has been deprecated in v7.1

