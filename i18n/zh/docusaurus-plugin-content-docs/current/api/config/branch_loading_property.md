---
sidebar_label: branch_loading_property
title: branch_loading_property config
description: "表示任务有尚未从后端加载的子任务"
---

# branch_loading_property
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 表示任务有尚未从后端加载的子任务

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**Default value:** "$has_child"

### Related samples
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details


此选项仅在与 [branch_loading](api/config/branch_loading.md) 配置结合使用时生效。

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [性能优化:提升方法](guides/performance.md)
- [动态加载（按需加载）](guides/dynamic-loading.md)

