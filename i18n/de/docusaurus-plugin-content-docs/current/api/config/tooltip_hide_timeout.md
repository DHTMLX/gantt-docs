---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout Konfiguration
description: "Legt die Länge der Zeit in Millisekunden fest, bevor der Tooltip ausgeblendet wird"
---

# tooltip_hide_timeout

### Description

@short: Legt die Länge der Zeit in Millisekunden fest, bevor der Tooltip ausgeblendet wird

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
Diese Option ist in der **tooltip**-Erweiterung definiert, daher müssen Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren. Lesen Sie die Details im [Tooltips für Gantt-Elemente](guides/tooltips.md) Artikel.
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Tooltips für Gantt-Elemente](guides/tooltips.md)