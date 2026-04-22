---
sidebar_label: touch
title: touch config
description: "Aktiviert/Deaktiviert die Touch-Unterstützung für das Gantt-Diagramm"
---

# touch

### Description

@short: Aktiviert/deaktiviert die Touch-Unterstützung für das Gantt-Diagramm

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Als String kann der Parameter nur den Wert - **'force'** annehmen.

Es gibt drei mögliche Werte, die der Parameter annehmen kann:

- *true* - dhtmlxGantt versucht, das Touch-Gerät durch Analyse des User-Agent-Strings des Browsers zu erkennen und bei erkannter Touch-Unterstützung die Touch-Unterstützung zu aktivieren.
- *'force'* - aktiviert die persistente Touch-Unterstützung, egal welches Gerät verwendet wird.
- *false* - deaktiviert die Touch-Unterstützung.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)