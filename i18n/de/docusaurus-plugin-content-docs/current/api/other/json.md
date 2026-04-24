---
sidebar_label: json
title: JSON-Konfiguration
description: "legt die JSON-Serialisierung und das Parsen fest"
---

# json

### Description

@short: Verwaltet JSON-Serialisierung und -Parsing

@signature: json: any

### Example

~~~jsx
const obj = gantt.json; // -> { parse(data){... }}
~~~

### Details

Das JSON-Objekt enthält das einzige Mitglied – die **parse()**-Methode, die festlegt, wie dhtmlxGantt Daten im JSON-Format parst.