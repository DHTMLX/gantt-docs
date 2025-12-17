---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "defines whether gantt will perform a deep copy of data objects passed into the gantt.parse() method"
---

# deepcopy_on_parse

### Description

@short: Defines whether gantt will perform a deep copy of data objects passed into the gantt.parse() method

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- If the property is set to *true*, the gantt will attempt to implement a deep copy of the data objects passed into the [gantt.parse](api/method/parse.md) method. As a result, the inner gantt data objects will be disconnected from the source data objects and no changes made to the gantt will affect the original data object.
- If the property is set to *false* (default), the gantt will reuse the data objects provided in the [gantt.parse](api/method/parse.md) method (a shallow copy). The objects will be connected and changes made to the gantt will be applied to the original data object.

### Change log
- added in v7.1

