---
sidebar_label: license
title: license config
description: "returns the license name of dhtmlxGantt"
---

# license

### Description

@short: Returns the license name of dhtmlxGantt

@signature: license: string

### Returns
- ` license` - (string) - the name of the license

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

This method returns a short license name that can be used for diagnostics. 

Possible values are:

- "gpl"
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- added in v6.2.2
