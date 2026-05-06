---
sidebar_label: editable_property
title: editable_property 配置
description: "更改在只读甘特图中影响任务/链接编辑能力的属性名称"
---

# editable_property

### Description

@short: 更改在只读甘特图中影响任务/链接编辑能力的属性名称

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

该选项的默认值为 "editable"。

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [只读模式](guides/readonly-mode.md#readonlymodefortheentiregantt)