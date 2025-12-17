---
sidebar_label: json
title: json config
description: "specifies JSON serialization and parsing"
---

# json

### Description

@short: Specifies JSON serialization and parsing

@signature: json: any

### Example

~~~jsx
var obj = gantt.json; // -> { parse(data){... 
:::
~~~

### Details

The JSON object contains the only member - the **parse()** method which defines how dhtmlxGantt will parse data in the JSON format.
