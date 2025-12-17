---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y config
description: "Passt den vertikalen Versatz der Tooltip-Position an und verschiebt ihn nach unten, wenn der Wert positiv ist."
---

# tooltip_offset_y

### Description

@short: Passt den vertikalen Versatz der Tooltip-Position an und verschiebt ihn nach unten, wenn der Wert positiv ist.

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Default value:** 20

### Details

:::note
 Diese Option ist Teil der **tooltip**-Erweiterung. Stellen Sie daher sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

