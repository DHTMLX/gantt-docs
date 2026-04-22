---
sidebar_label: branch_loading
title: branch_loading 配置
description: "在甘特图中启用动态加载"
---

# branch_loading

:::info
此功能仅在 PRO 版本中可用。
:::

### Description

@short: 在甘特图中启用动态加载

@signature: branch_loading: boolean

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;
gantt.init("gantt_here");

gantt.load("/data"); /*!*/
~~~

**默认值：** false

### Related samples
- [按需加载子任务（branch loading）](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [性能优化](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


### Related API
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [性能提升的途径](guides/performance.md)
- [动态加载（按需）](guides/dynamic-loading.md)