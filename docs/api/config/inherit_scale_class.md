---
sidebar_label: inherit_scale_class
title: inherit_scale_class config
description: "specifies whether sub-scales shall use the scale_cell_class template by default"
---

# inherit_scale_class

### Description

@short: Specifies whether sub-scales shall use the scale_cell_class template by default

@signature: inherit_scale_class: boolean

### Example

~~~jsx
gantt.config.inherit_scale_class=true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Details

The option is added in the version 3.2. 
In the earlier versions, sub-scales always used the [scale_cell_class](api/template/scale_cell_class.md) template by default. Setting the option to 'true' will return the old behaviour.

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)

