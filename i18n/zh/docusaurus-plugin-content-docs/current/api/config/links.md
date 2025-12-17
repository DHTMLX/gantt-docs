---
sidebar_label: links
title: links config
description: "存储链接依赖类型"
---

# links

### Description

@short: 存储链接依赖类型

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**Default value:** \{
  "finish_to_start":"0",
  "start_to_start":"1",
  "finish_to_finish":"2",
  "start_to_finish":"3"
\}

### Details

- **finish_to_start** - (*string | number*) - 目标任务不能在源任务完成之前开始，但可以在之后的任何时间开始。
- **start_to_start** - (*string | number*) - 目标任务不能在源任务开始之前开始，但可以稍后开始。
- **finish_to_finish** - (*string | number*) - 目标任务不能在源任务完成之前完成，但可以稍后完成。
- **start_to_finish** - (*string | number*) - 目标任务不能在源任务开始之前完成，但可以稍后完成。

### Related Guides
- [数据加载](guides/loading.md#dataproperties)
