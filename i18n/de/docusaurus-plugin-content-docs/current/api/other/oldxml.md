---
sidebar_label: oldxml
title: oldxml config
description: "verwaltet die Serialisierung und das Parsen des XML-Formats in dhtmlxGantt 1.0"
---

# oldxml

### Description

@short: Verwaltet die Serialisierung und das Parsen des XML-Formats in dhtmlxGantt 1.0

@signature: oldxml: any

### Example

~~~jsx
var obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... 
:::
~~~

### Details

Das XML-Objekt enthält zwei zentrale Methoden:

- **parse()** - steuert, wie dhtmlxGantt Daten aus dem XML-Format einliest.
- **serialize()** - steuert, wie dhtmlxGantt Daten zurück in das XML-Format umwandelt.
