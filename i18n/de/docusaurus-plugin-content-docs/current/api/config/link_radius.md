---
sidebar_label: link_radius
title: link_radius config
description: "steuert den Radius, der verwendet wird, um die Ecken der Link-Linien in der Timeline abzurunden"
---

# link_radius

### Description

@short: Steuert den Radius, der verwendet wird, um die Ecken der Link-Linien in der Timeline abzurunden

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Default value:** 4

### Details

Diese Eigenschaft legt fest, wie stark die Ecken der Link-Linien in der Timeline abgerundet werden. Bei einem Wert von 1 oder weniger ist die Abrundung deaktiviert. Wenn ein Link-Segment zu kurz ist, um den angegebenen Radius aufzunehmen, wird für dieses Segment keine Abrundung angewendet.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- hinzugefügt in v9.0

