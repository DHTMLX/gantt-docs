---
sidebar_label: touch_feedback_duration
title: конфигурация touch_feedback_duration
description: "определяет длительность вибрационного отклика перед/после перетаскивания на сенсорных устройствах (в миллисекундах)"
---

# touch_feedback_duration

### Description

@short: Определяет длительность вибрационного отклика перед/после перетаскивания на сенсорных устройствах (в миллисекундах)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 1

### Details

added in version 4.1 

Примечание: данная конфигурация не будет иметь эффекта, если:

1. Поддержка сенсорного ввода отключена настройкой [touch](api/config/touch.md).
2. Браузер не поддерживает [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)