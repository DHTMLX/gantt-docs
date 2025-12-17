---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "definiert die minimale Breite (in Pixel), die das Gantt-Diagramm im horizontalen 'autosize'-Modus haben wird"
---

# autosize_min_width

### Description

@short: Definiert die minimale Breite (in Pixel), die das Gantt-Diagramm im horizontalen 'autosize'-Modus haben wird

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Default value:** null (0)

### Details

Der horizontale 'autosize'-Modus kann über die Option in [autosize](api/config/autosize.md) aktiviert werden.

### Related API
- [autosize](api/config/autosize.md)

