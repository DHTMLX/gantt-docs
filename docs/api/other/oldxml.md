---
sidebar_label: oldxml
title: oldxml config
description: "specifies serialization and parsing in the XML format of dhtmlxGantt 1.0"
---

# oldxml

### Description

@short: Specifies serialization and parsing in the XML format of dhtmlxGantt 1.0

@signature: oldxml: any

### Example

~~~jsx
var obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... 
:::
~~~

### Details

The XML object contains 2 members:

- **parse()** method  - defines how dhtmlxGantt will parse data in the XML format.
- **serialize()** method - defines how dhtmlxGantt will serialize data into the XML format.
