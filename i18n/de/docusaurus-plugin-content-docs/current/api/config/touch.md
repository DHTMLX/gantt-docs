---
sidebar_label: touch
title: touch config
description: "steuert, ob die Touch-Unterstützung für das Gantt-Diagramm aktiviert oder deaktiviert ist"
---

# touch

### Description

@short: Steuert, ob die Touch-Unterstützung für das Gantt-Diagramm aktiviert oder deaktiviert ist

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Wenn als String gesetzt, ist der einzige akzeptierte Wert **'force'**.

<br>

Für diesen Parameter gibt es drei mögliche Optionen:

- *true* - dhtmlxGantt versucht zu erkennen, ob das Gerät Touch unterstützt, indem es den User-Agent-String des Browsers überprüft. Wird ein Touch-Gerät erkannt, wird die Touch-Unterstützung aktiviert.
- *'force'* - die Touch-Unterstützung wird unabhängig vom verwendeten Gerät aktiviert.
- *false* - die Touch-Unterstützung wird vollständig deaktiviert.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

