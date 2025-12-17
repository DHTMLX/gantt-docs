---
sidebar_label: xml
title: xml config
description: "spezifiziert XML-Serialisierung und Parsing"
---

# xml

### Description

@short: Spezifiziert XML-Serialisierung und Parsing

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

Das XML-Objekt umfasst zwei Hauptmethoden:

- **parse()** Methode - steuert, wie dhtmlxGantt Daten im XML-Format liest und interpretiert.
- **serialize()** Methode - verwaltet, wie dhtmlxGantt Daten zurück in das XML-Format konvertiert.
