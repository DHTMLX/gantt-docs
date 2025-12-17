---
sidebar_label: license
title: license config
description: "gibt den Lizenznamen von dhtmlxGantt zurück"
---

# license

### Description

@short: Gibt den Lizenznamen von dhtmlxGantt zurück

@signature: license: string

### Returns
- ` license` - (string) - der Name der Lizenz

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

Diese Methode liefert einen kurzen Lizenznamen, der für Diagnosezwecke nützlich ist.

Die möglichen Werte umfassen:

- "gpl"
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- hinzugefügt in v6.2.2
