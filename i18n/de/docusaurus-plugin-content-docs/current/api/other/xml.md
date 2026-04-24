---
sidebar_label: xml
title: XML-Konfiguration
description: "legt die XML-Serialisierung und das Parsen fest"
---

# xml

### Description

@short: Bestimmt die XML-Serialisierung und das Parsen

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

Das XML-Objekt enthält 2 Eigenschaften:

- **parse()**-Methode – Definiert, wie dhtmlxGantt Daten im XML-Format parst.
- **serialize()**-Methode – Definiert, wie dhtmlxGantt Daten ins XML-Format serialisiert.