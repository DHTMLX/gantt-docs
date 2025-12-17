---
sidebar_label: tooltip_timeout
title: tooltip_timeout config
description: "Gibt die Verzögerung in Millisekunden an, bevor ein Tooltip für eine Aufgabe erscheint"
---

# tooltip_timeout

### Description

@short: Gibt die Verzögerung in Millisekunden an, bevor ein Tooltip für eine Aufgabe erscheint

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

:::note
 Diese Einstellung gehört zur **tooltip** Erweiterung, daher stellen Sie sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

