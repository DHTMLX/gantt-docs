---
sidebar_label: branch_loading_property
title: branch_loading_property config
description: "specifies that the task has children that are not yet loaded from the backend"
---

# branch_loading_property

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies that the task has children that are not yet loaded from the backend

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

Can only be used together with the [branch_loading](api/config/branch_loading.md) config.

### Related API
- [branch_loading](api/config/branch_loading.md)

### Related Guides
- [Performance: Ways to Improve](guides/performance.md)
- [Dynamic Loading (on demand)](guides/dynamic-loading.md)

