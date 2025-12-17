---
sidebar_label: touch
title: touch config
description: "управляет включением или отключением поддержки touch для диаграммы Ганта"
---

# touch

### Description

@short: Управляет включением или отключением поддержки touch для диаграммы Ганта

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Если задано строкой, единственное допустимое значение - **'force'**.

<br>

Для этого параметра доступны три варианта:

- *true* - dhtmlxGantt пытается определить, поддерживает ли устройство touch, проверяя user-agent браузера, и если обнаруживает устройство с поддержкой touch, включает поддержку touch.
- *'force'* - поддержка touch включена независимо от используемого устройства.
- *false* - полностью отключает поддержку touch.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

