---
sidebar_label: process_resource_assignments
title: process_resource_assignments 配置
description: "启用/禁用资源分配的解析"
---

# process_resource_assignments

:::info
 此功能仅在 PRO 版本中可用。 
:::

### Description

@short: 启用/禁用资源分配的解析

@signature: process_resource_assignments: boolean

### Example

~~~jsx
gantt.config.process_resource_assignments = false;
~~~

**Default value:** true

### Related samples
- [将资源值分配到特定日期](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

当你为任务的特定时间分配资源时（见 [guides/resource-management.md#resourceassignmenttime]），该功能需要启用 **process_resource_assignments** 属性。  
这与该属性能够将任务的 [gantt.config.resource_property](api/config/resource_property.md) 的值解析为内部资源分配对象的能力有关。

因此，您可以通过 DataStore 对象来操作资源分配，例如获取所需的分配对象或对其进行更新。

但如果您仅需要为任务分配资源而不指定分配的时间或持续时间，则可以通过配置禁用对分配的解析：

~~~js
gantt.config.process_resource_assignments = false;
~~~

### Related Guides
- [资源管理](guides/resource-management.md)

### Change log
- 新增于 v7.1