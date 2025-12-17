---
sidebar_label: branch_loading
title: branch_loading config
description: "enables dynamic loading in the Gantt chart"
---

# branch_loading

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Enables dynamic loading in the Gantt chart

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
- [Performance: Ways to Improve](guides/performance.md)
- [Dynamic Loading (on demand)](guides/dynamic-loading.md)

