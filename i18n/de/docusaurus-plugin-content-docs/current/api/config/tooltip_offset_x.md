---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "Passt den horizontalen Versatz der Tooltip-Position nach rechts an, wenn ein positiver Wert eingestellt ist"
---

# tooltip_offset_x

### Description

@short: Passt den horizontalen Versatz der Tooltip-Position nach rechts an, wenn ein positiver Wert eingestellt ist

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Details

:::note
 Diese Option ist Teil der **tooltip**-Extension. Stellen Sie daher sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

