---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "legt den rechten Offset der Tooltip-Position fest (falls positiv)"
---

# tooltip_offset_x

### Description

@short: Legt den rechten Offset der Tooltip-Position fest (bei positiver Zahl)

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Standardwert:** 10

### Details

:::note
Diese Option ist in der **Tooltip-Erweiterung** definiert, daher müssen Sie das [tooltip](guides/extensions-list.md#tooltip)-Plugin aktivieren. Lesen Sie die Details im Artikel [Tooltips für Gantt-Elemente](guides/tooltips.md).
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Tooltips für Gantt-Elemente](guides/tooltips.md)