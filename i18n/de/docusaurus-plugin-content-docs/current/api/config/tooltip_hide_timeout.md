---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout config
description: "Legt fest, wie lange die Tooltip in Millisekunden sichtbar bleiben, bevor sie verschwinden"
---

# tooltip_hide_timeout

### Description

@short: Legt fest, wie lange die Tooltip in Millisekunden sichtbar bleiben, bevor sie verschwinden

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
 Diese Option ist Teil der **tooltip** Erweiterung. Stelle daher sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Für weitere Details siehe den Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

