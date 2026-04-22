---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y Konfiguration
description: "setzt den oberen Offset der Tooltip-Position (falls positiv)"
---

# tooltip_offset_y

### Description

@short: Setzt den oberen Offset der Tooltip-Position (falls positiv)

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Standardwert:** 20

### Details

:::note
Diese Option ist in der **tooltip**-Erweiterung definiert, daher müssen Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren. Lesen Sie die Details im Artikel [Tooltips für Gantt-Elemente](guides/tooltips.md).
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips für Gantt-Elemente](guides/tooltips.md)