---
sidebar_label: process_resource_assignments
title: process_resource_assignments config
description: "开启或关闭资源分配的解析功能"
---

# process_resource_assignments
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 开启或关闭资源分配的解析功能

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

当需要将资源分配到任务中的特定时间时，必须启用 **process_resource_assignments** 属性。
这是因为该属性负责将任务的 [gantt.config.resource_property](api/config/resource_property.md) 中的值解析为内部资源分配对象。

这样，您就可以通过 DataStore 对象操作资源分配，例如检索或更新分配对象。

如果您的需求只是将资源分配给任务，而不需要设置分配的具体时间或持续时间，可以通过此设置关闭分配解析:

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- v7.1 新增

