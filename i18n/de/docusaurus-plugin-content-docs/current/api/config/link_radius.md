---
sidebar_label: link_radius
title: link_radius Konfiguration
description: "setzt den Radius für das Abrunden der Ecken von Link-Linien in der Timeline"
---

# link_radius

### Description

@short: Setzt den Radius für das Abrunden der Ecken von Link-Linien in der Timeline

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Standardwert:** 4

### Details

Die Eigenschaft definiert den Radius zum Abrunden der Ecken der Link-Linien in der Timeline. Ist der Wert kleiner oder gleich 1, ist das Abrunden deaktiviert. Falls die Länge eines Link-Segments nicht ausreicht, um den angegebenen Radius zu verwenden, wird das Abrunden für dieses Segment nicht angewendet.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- hinzugefügt in v9.0