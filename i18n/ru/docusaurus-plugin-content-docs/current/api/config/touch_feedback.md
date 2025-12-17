---
sidebar_label: touch_feedback
title: touch_feedback config
description: "включает вибрационную отдачу до или после действий drag and drop на touch-устройствах"
---

# touch_feedback

### Description

@short: Включает вибрационную отдачу до или после действий drag and drop на touch-устройствах

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Имейте в виду, что эта настройка не будет работать, если:

1. Поддержка touch отключена через опцию [touch](api/config/touch.md).
2. Браузер не поддерживает [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

