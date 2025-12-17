---
sidebar_label: editable_property
title: editable_property config
description: "修改一个属性的名称，该属性控制在只读 Gantt 图中任务或链接是否可编辑"
---

# editable_property

### Description

@short: 修改一个属性的名称，该属性控制在只读 Gantt 图中任务或链接是否可编辑

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

默认情况下，此选项设置为 "editable"。

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [只读模式](guides/readonly-mode.md)

