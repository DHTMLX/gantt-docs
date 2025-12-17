---
sidebar_label: branch_loading
title: branch_loading config
description: "允许甘特图动态加载数据"
---

# branch_loading
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 允许甘特图动态加载数据

@signature: branch_loading: boolean

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
gantt.config.branch_loading = true;
gantt.init("gantt_here");

gantt.load("/data"); /*!*/
~~~

**Default value:** false

### Related samples
- [Loading subtasks on demand (branch loading)](https://docs.dhtmlx.com/gantt/samples/02_extensions/06_dynamic_loading.html)
- [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


### Related API
- [branch_loading_property](api/config/branch_loading_property.md)

### Related Guides
- [性能优化:提升方法](guides/performance.md)
- [动态加载（按需加载）](guides/dynamic-loading.md)

