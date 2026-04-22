---
sidebar_label: branch_loading_property
title: branch_loading_property 配置
description: "指定任务具有尚未从后端加载的子项"
---

# branch_loading_property

:::info
此功能仅在 PRO 版本中可用。
:::

### Description

@short: 指定任务具有尚未从后端加载的子项

@signature: branch_loading_property: string

### Example

~~~jsx
gantt.config.branch_loading = true;
gantt.config.branch_loading_property = "hasChild";
gantt.init("gantt_here");
~~~

**默认值：** "$has_child"

### Related samples
- [按需加载子任务（branch loading）](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [性能优化技巧](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

### Details

只能与 [branch_loading](api/config/branch_loading.md) 配置一起使用。

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [性能：提升的方法](guides/performance.md)
- [动态加载（按需加载）](guides/dynamic-loading.md)