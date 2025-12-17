---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration config
description: "определяет, как долго длится вибрационная обратная связь до или после действий drag and drop на touch-устройствах (измеряется в миллисекундах)"
---

# touch_feedback_duration

### Description

@short: Определяет, как долго длится вибрационная обратная связь до или после действий drag and drop на touch-устройствах (измеряется в миллисекундах)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Default value:** 1

### Details

введено в версии 4.1

Учтите, что эта настройка не будет работать, если:

1. Поддержка touch отключена с помощью опции конфигурации [touch](api/config/touch.md).
2. Браузер не поддерживает [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)

