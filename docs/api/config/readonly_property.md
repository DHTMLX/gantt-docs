---
sidebar_label: readonly_property
title: readonly_property config
description: "changes the name of a property that affects the read-only behaviour of tasks/links"
---

# readonly_property

### Description

@short: Changes the name of a property that affects the read-only behaviour of tasks/links

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

The default value of the option is "readonly".

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md)

