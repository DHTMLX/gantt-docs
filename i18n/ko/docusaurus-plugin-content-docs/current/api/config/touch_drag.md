---
sidebar_label: touch_drag
title: touch_drag 설정
description: "긴 터치 제스처를 스크롤 제스처와 구분하는 데 사용되는 밀리초 단위의 시간 기간을 정의합니다."
---

# touch_drag

### Description

@short: 긴 터치 제스처를 스크롤 제스처와 구분하는 데 사용되는 밀리초 단위의 시간 기간을 정의합니다.

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

참고: 매개변수를 *false*로 설정하면 사용자가 작업을 드래그할 수 없게 됩니다.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)