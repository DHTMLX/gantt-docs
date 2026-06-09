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

- "mit" - the free Community edition (v10 and later)
- "gpl" - the legacy free edition (v9.x and earlier)
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- the "mit" value added in v10.0
- added in v6.2.2
