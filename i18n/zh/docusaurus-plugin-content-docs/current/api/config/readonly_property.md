---
sidebar_label: readonly_property
title: readonly_property config
description: "设置用于控制任务和链接只读状态的属性名称"
---

# readonly_property

### Description

@short: 设置用于控制任务和链接只读状态的属性名称

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

默认情况下，此选项设置为 "readonly"。

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [只读模式](guides/readonly-mode.md)

