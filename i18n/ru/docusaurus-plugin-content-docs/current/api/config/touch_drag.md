---
sidebar_label: touch_drag
title: touch_drag config
description: "устанавливает период времени в миллисекундах для разграничения долгого тача от жеста прокрутки"
---

# touch_drag

### Description

@short: Устанавливает период времени в миллисекундах для разграничения долгого тача от жеста прокрутки

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

Учтите, если этот параметр установлен в *false*, пользователи не смогут перетаскивать задачи.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

