---
sidebar_label: editable_property
title: editable_property config
description: "changes the name of a property that affects the editing ability of tasks/links in the read-only Gantt chart"
---

# editable_property

### Description

@short: Changes the name of a property that affects the editing ability of tasks/links in the read-only Gantt chart

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

The default value of the option is "editable".

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md#readonlymodefortheentiregantt)

