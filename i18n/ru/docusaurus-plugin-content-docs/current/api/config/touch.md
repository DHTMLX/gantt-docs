---
sidebar_label: touch
title: touch config
description: "enables/disables the touch support for the Gantt chart"
---

# touch

### Description

@short: Включает/выключает поддержку касания в Gantt-чарте

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Как строка, параметр может принимать единственное значение - **'force'**.

Итак, параметр может принимать 3 возможных значения:

- *true* - dhtmlxGantt пытается определить сенсорное устройство, анализируя строку user-agent браузера, и, если обнаружено сенсорное устройство, включает поддержку касания.
- *'force'* - включает постоянную поддержку касания, независимо от типа используемого устройства.
- *false* - отключает поддержку касания.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)