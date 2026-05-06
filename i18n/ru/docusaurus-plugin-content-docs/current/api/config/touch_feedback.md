---
sidebar_label: touch_feedback
title: touch_feedback конфигурация
description: "возвращает вибрационную обратную связь до/после перетаскивания на сенсорных устройствах"
---

# touch_feedback

### Description

@short: Возвращает вибрационную обратную связь до/после перетаскивания на сенсорных устройствах

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

Note, the config will have no effect if: 

1. Поддержка сенсорного ввода отключена конфигурационной опцией [touch](api/config/touch.md).
2. Браузер не поддерживает [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)