---
sidebar_label: xml
title: xml config
description: "specifies XML serialization and parsing"
---

# xml

### Description

@short: Specifies XML serialization and parsing

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

The XML object contains 2 members:

- **parse()** method  - defines how dhtmlxGantt will parse data in the XML format.
- **serialize()** method - defines how dhtmlxGantt will serialize data into the XML format.
