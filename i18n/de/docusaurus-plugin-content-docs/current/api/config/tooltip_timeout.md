---
sidebar_label: tooltip_timeout
title: tooltip_timeout config
description: "Setzt den Timeout in Millisekunden, bevor der Tooltip für eine Aufgabe angezeigt wird"
---

# tooltip_timeout

### Description

@short: Legt den Timeout in Millisekunden fest, bevor der Tooltip für eine Aufgabe angezeigt wird

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Standardwert:** 30

### Details

:::note
Diese Option ist in der **tooltip**-Erweiterung definiert, daher müssen Sie das [tooltip]-Plugin aktivieren. Lesen Sie die Details im Artikel [Tooltips für Gantt-Elemente](guides/tooltips.md). 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Tooltips für Gantt-Elemente](guides/tooltips.md)