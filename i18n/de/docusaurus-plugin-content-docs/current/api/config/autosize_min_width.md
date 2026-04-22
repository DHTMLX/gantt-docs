---
sidebar_label: autosize_min_width
title: autosize_min_width Konfiguration
description: "Legt die minimale Breite (in Pixeln) fest, die das Gantt-Diagramm im horizontalen 'autosize'-Modus erreichen kann"
---

# autosize_min_width

### Description

@short: Legt die minimale Breite (in Pixeln) fest, die das Gantt-Diagramm im horizontalen 'autosize'-Modus erreichen kann

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Standardwert:** Null (0)

### Details

Der horizontale 'autosize'-Modus wird durch die Option [autosize](api/config/autosize.md) aktiviert.

### Related API
- [autosize](api/config/autosize.md)