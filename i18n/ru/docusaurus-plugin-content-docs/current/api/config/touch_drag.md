---
sidebar_label: touch_drag
title: touch_drag config
description: "определяет временной период в миллисекундах, который используется для различения длинного касания от жеста прокрутки"
---

# touch_drag

### Description

@short: Определяет период времени в миллисекундах, который используется для различения длинного жеста касания от жеста прокрутки

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** 500

### Details

Обратите внимание: если параметр установить в *false*, пользователь не сможет перетаскивать задачи.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)