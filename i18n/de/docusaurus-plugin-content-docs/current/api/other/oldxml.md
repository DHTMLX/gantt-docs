---
sidebar_label: oldxml
title: oldxml-Konfiguration
description: "definiert Serialisierung und Parsing im XML-Format von dhtmlxGantt 1.0"
---

# oldxml

### Description

@short: Definiert Serialisierung und Parsing im XML-Format von dhtmlxGantt 1.0

@signature: oldxml: any

### Example

~~~jsx
const obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

Das XML-Objekt enthält 2 Mitglieder:

- **parse()**-Methode – definiert, wie dhtmlxGantt Daten im XML-Format parst.
- **serialize()**-Methode – definiert, wie dhtmlxGantt Daten im XML-Format serialisiert.