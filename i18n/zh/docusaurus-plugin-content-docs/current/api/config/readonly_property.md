---
sidebar_label: readonly_property
title: readonly_property 配置
description: "更改影响任务/链接只读行为的属性名称"
---

# readonly_property

### Description

@short: 更改影响任务/链接只读行为的属性名称

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

该选项的默认值为 "readonly"。

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [只读模式](guides/readonly-mode.md)