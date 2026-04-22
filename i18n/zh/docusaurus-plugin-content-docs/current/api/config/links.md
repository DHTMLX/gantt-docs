---
sidebar_label: links
title: links config
description: "存储链接依赖类型"
---

# links

### Description

@short: 存储链接依赖的类型

@signature: links: \{ finish_to_start?: string | number; start_to_start?: string | number; finish_to_finish?: string | number; start_to_finish?: string | number; \}

### Example

~~~jsx
var type1 = gantt.config.links.finish_to_start;
~~~

**默认值：**\{ "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" \}

### Details

- **finish_to_start** - (*string | number*) - 目标任务在源任务结束之前不能开始（但它可能稍后开始）。
- **start_to_start** - (*string | number*) - 目标任务在源任务开始之前不能开始（但它可能稍后开始）。
- **finish_to_finish** - (*string | number*) - 目标任务不能在源任务结束之前结束（但它可能稍后结束）。
- **start_to_finish** - (*string | number*) - 目标任务在源任务开始之前不能结束（但它可能稍后结束）。

### Related Guides
- [数据加载](guides/loading.md#dataproperties)