---
sidebar_label: serialize
title: serialize method
description: "serializes the data into JSON or XML format"
---

# serialize

### Description

@short: Serializes the data into JSON or XML format

@signature: serialize: (type?: string) =\> any

### Parameters

- `type` -	(optional) *string*   - 	the format that the data will be serialized into. <br/> Possible values: 'json' (<i>default</i> ), 'xml'. 

### Returns
- ` data` - (object) - a gantt data object

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Serializing Data into XML and JSON](guides/serialization.md)
- [Supported Data Formats](guides/supported-data-formats.md)

