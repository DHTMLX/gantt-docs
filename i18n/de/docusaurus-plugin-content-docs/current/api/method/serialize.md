---
sidebar_label: serialize
title: serialize method
description: "Serialisiert die Daten in JSON- oder XML-Format"
---

# serialize

### Description

@short: Serializes the data into JSON or XML format

@signature: serialize: (type?: string) =\> any

### Parameters

- `type` - (optional) *string* - das Format, in das die Daten serialisiert werden. <br/> Mögliche Werte: 'json' (<i>Standard</i> ), 'xml'. 

### Returns
- ` data` - (object) - ein Gantt-Datenobjekt

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [Serializing Data into XML and JSON](guides/serialization.md)
- [Supported Data Formats](guides/supported-data-formats.md)