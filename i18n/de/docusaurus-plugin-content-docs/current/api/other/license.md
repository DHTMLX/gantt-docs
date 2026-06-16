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

Diese Methode gibt einen kurzen Lizenznamen zurück, der für Diagnosezwecke verwendet werden kann. 

Mögliche Werte sind:

- "mit" - die kostenlose Community-Edition (v10 und später)
- "gpl" - die bisherige kostenlose Edition (v9.x und früher)
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- der Wert "mit" wurde in v10.0 hinzugefügt
- in v6.2.2 hinzugefügt
