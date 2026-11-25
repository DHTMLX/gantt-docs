---
sidebar_label: serialize
title: serialize method
description: "serializes the data into JSON or XML format"
---

# serialize

### Description

@short: Serializes the data into JSON or XML format

@signature: serialize: (type?: string, options?: \{ order?: "display" | "canonical" \}) =\> any

### Parameters

- `type` -	(optional) *string*   - 	the format that the data will be serialized into. <br/> Possible values: 'json' (<i>default</i> ), 'xml'. 
- `options` - (optional) *object* - set `order` to `"display"` or `"canonical"` to choose the task order in JSON.

### Returns
- ` data` - (object) - a gantt data object

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Details

JSON normally follows the current display order. With the [wbs extension](guides/wbs-and-task-numbering.md) active, it follows the canonical hierarchy and sibling order by default. Pass `gantt.serialize("json", { order: "display" })` to serialize in display order in either case.

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Serializing Data into JSON and XML](guides/serialization.md)
- [Supported Data Formats](guides/supported-data-formats.md)

